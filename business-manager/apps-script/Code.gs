/**
 * Khalifa Business Manager — Google Sheets sync backend (Apps Script Web App)
 *
 * Row-level sync. Every record is one row, matched by `id`.
 *  - push : upsert rows by id under a script lock. A row is replaced only when the
 *           incoming version is newer (higher `rev`; equal `rev` → later `updatedAt`).
 *           Tables are never replaced as a whole.
 *  - pull : returns rows whose `serverUpdatedAt` is newer than the caller's cursor,
 *           plus the small master tabs (Users, Products, Settings) in full.
 * Every request must carry the secret key saved in Script Properties as SECRET_KEY.
 *
 * Setup: see SETUP.md (run setupSheet() once, set SECRET_KEY, deploy as Web App).
 */

var COMMON = ['id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'deleted', 'rev', 'serverUpdatedAt'];

var TABLES = {
  Customers: ['phone', 'name', 'notes'],
  Sales: ['billNo', 'userCode', 'billDate', 'customerId', 'customerName', 'customerPhone', 'itemsJson',
          'subTotal', 'lineDiscount', 'billDiscount', 'gstPercent', 'gstAmount', 'grandTotal',
          'paidAtBill', 'paymentMode', 'status', 'voidReason', 'sharedAt', 'sharedBy'],
  Payments: ['saleId', 'customerId', 'amount', 'mode', 'kind', 'receivedBy', 'date', 'status', 'note'],
  Expenses: ['date', 'category', 'amount', 'mode', 'paidBy', 'note', 'status'],
  Transfers: ['date', 'type', 'fromUser', 'toUser', 'amount', 'note', 'status'],
  AuditLog: ['at', 'user', 'tableName', 'recordId', 'action', 'reason', 'beforeJson', 'afterJson']
};

// Written by the server from each bill's itemsJson (for analysis in the Sheet). Never pulled.
var DERIVED = { SaleItems: ['saleId', 'billNo', 'lineNo', 'billDate', 'userCode', 'name', 'size', 'type',
                            'qty', 'rate', 'discount', 'amount', 'costPrice'] };

// Columns written as real numbers (so SUM / pivot work in the Sheet). Everything else is plain text.
var NUMERIC = { rev: 1, serverUpdatedAt: 1, subTotal: 1, lineDiscount: 1, billDiscount: 1, gstPercent: 1,
                gstAmount: 1, grandTotal: 1, paidAtBill: 1, amount: 1, qty: 1, rate: 1, discount: 1,
                costPrice: 1, lineNo: 1, price: 1 };

// Managed by hand in the Sheet. Sent to the app in full on every pull.
var MASTER = {
  Users: ['code', 'name', 'active'],
  Products: ['name', 'size', 'type', 'price', 'costPrice', 'active'],
  Settings: ['key', 'value']
};

/* ------------------------------------------------------------------ entry points */

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (!checkKey_(p.key)) return json_({ ok: false, error: 'BAD_KEY' });
  return json_({ ok: true, app: 'khalifa-business-manager', serverTime: Date.now() });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'BAD_JSON' });
  }
  if (!checkKey_(body.key)) return json_({ ok: false, error: 'BAD_KEY' });

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (err) {
    return json_({ ok: false, error: 'BUSY' });
  }
  try {
    if (body.action === 'ping') return json_({ ok: true, serverTime: Date.now(), masters: readMasters_() });
    if (body.action === 'push') return json_(push_(body));
    if (body.action === 'pull') return json_(pull_(body));
    return json_({ ok: false, error: 'UNKNOWN_ACTION' });
  } catch (err) {
    return json_({ ok: false, error: 'SERVER_ERROR', message: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------------------------------------------ push */

function push_(body) {
  var user = String(body.user || '');
  var records = body.records || [];
  var byTable = {};
  records.forEach(function (rec) {
    if (!rec || !TABLES[rec.t] || !rec.r || !rec.r.id) return;
    (byTable[rec.t] = byTable[rec.t] || []).push(rec.r);
  });

  var results = [];
  var audit = [];
  var acceptedSales = [];

  Object.keys(byTable).forEach(function (table) {
    var headers = COMMON.concat(TABLES[table]);
    var sh = ensureSheet_(table, headers);
    var data = readRows_(sh, headers);
    var index = {};
    data.rows.forEach(function (row, i) { index[row.id] = i; });
    var updates = [];   // [rowNumber, values]
    var appends = [];

    byTable[table].forEach(function (inc) {
      var i = index[inc.id];
      var cur = i === undefined ? null : data.rows[i];
      var verdict = compare_(inc, cur);
      if (verdict === 'accept' || verdict === 'accept-conflict') {
        var row = clone_(inc);
        row.serverUpdatedAt = nextStamp_();
        var values = toValues_(row, headers);
        if (cur) {
          updates.push([i + 2, values]);
          data.rows[i] = row;
        } else {
          appends.push(values);
          index[row.id] = data.rows.length;
          data.rows.push(row);
        }
        if (verdict === 'accept-conflict') audit.push(conflictRow_(table, cur, row, row, user));
        if (table === 'Sales') acceptedSales.push(row);
        results.push({ t: table, id: inc.id, status: 'ok', serverUpdatedAt: row.serverUpdatedAt });
      } else if (verdict === 'same') {
        results.push({ t: table, id: inc.id, status: 'ok', serverUpdatedAt: cur.serverUpdatedAt });
      } else {
        if (verdict === 'reject-conflict') audit.push(conflictRow_(table, cur, inc, cur, user));
        results.push({ t: table, id: inc.id, status: 'stale', server: cur });
      }
    });

    updates.forEach(function (u) { sh.getRange(u[0], 1, 1, headers.length).setValues([u[1]]); });
    appendValues_(sh, headers, appends);
  });

  if (audit.length) appendRecords_('AuditLog', audit);
  if (acceptedSales.length) writeSaleItems_(acceptedSales);
  return { ok: true, results: results, serverTime: Date.now() };
}

// accept / accept-conflict / same / reject / reject-conflict
function compare_(inc, cur) {
  if (!cur) return 'accept';
  var ir = Number(inc.rev) || 0, cr = Number(cur.rev) || 0;
  if (ir > cr) return 'accept';
  if (ir < cr) return 'reject';
  if (String(inc.updatedAt) === String(cur.updatedAt) && String(inc.updatedBy) === String(cur.updatedBy)) return 'same';
  // Same version number, different edits: two phones changed the same record.
  return String(inc.updatedAt) > String(cur.updatedAt) ? 'accept-conflict' : 'reject-conflict';
}

function conflictRow_(table, a, b, winner, user) {
  var now = new Date().toISOString();
  return {
    id: 'S' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    createdAt: now, updatedAt: now, createdBy: 'server', updatedBy: 'server', deleted: false, rev: 1,
    at: now, user: (a && a.updatedBy || '?') + ' vs ' + (b && b.updatedBy || '?'),
    tableName: table, recordId: (b && b.id) || (a && a.id),
    action: 'conflict',
    reason: 'Same record edited on two phones. Kept the later edit by ' + (winner && winner.updatedBy) +
            ' (pushed by ' + user + ').',
    beforeJson: JSON.stringify(a || {}), afterJson: JSON.stringify(b || {})
  };
}

function appendRecords_(table, rows) {
  var headers = COMMON.concat(TABLES[table]);
  var sh = ensureSheet_(table, headers);
  var values = rows.map(function (r) { r.serverUpdatedAt = nextStamp_(); return toValues_(r, headers); });
  appendValues_(sh, headers, values);
}

function writeSaleItems_(sales) {
  var headers = COMMON.concat(DERIVED.SaleItems);
  var sh = ensureSheet_('SaleItems', headers);
  var data = readRows_(sh, headers);
  var index = {};
  data.rows.forEach(function (row, i) { index[row.id] = i; });
  var updates = [], appends = [];
  sales.forEach(function (s) {
    var items = [];
    try { items = JSON.parse(s.itemsJson || '[]'); } catch (e) { items = []; }
    var gone = s.status === 'void' || String(s.deleted) === 'true';
    var wanted = {};
    items.forEach(function (it, n) {
      var id = s.id + '-' + (n + 1);
      wanted[id] = true;
      var row = {
        id: id, createdAt: s.createdAt, updatedAt: s.updatedAt, createdBy: s.createdBy, updatedBy: s.updatedBy,
        deleted: gone, rev: s.rev, serverUpdatedAt: nextStamp_(),
        saleId: s.id, billNo: s.billNo, lineNo: n + 1, billDate: s.billDate, userCode: s.userCode,
        name: it.name, size: it.size, type: it.type, qty: it.qty, rate: it.rate,
        discount: it.discount, amount: it.amount, costPrice: it.costPrice
      };
      var v = toValues_(row, headers);
      if (index[id] !== undefined) updates.push([index[id] + 2, v]); else { appends.push(v); index[id] = -1; }
    });
    // Lines removed by an edit stay in the Sheet but are marked deleted.
    data.rows.forEach(function (row, i) {
      if (row.saleId === s.id && !wanted[row.id] && String(row.deleted) !== 'true') {
        row.deleted = true; row.serverUpdatedAt = nextStamp_();
        updates.push([i + 2, toValues_(row, headers)]);
      }
    });
  });
  updates.forEach(function (u) { sh.getRange(u[0], 1, 1, headers.length).setValues([u[1]]); });
  appendValues_(sh, headers, appends);
}

/* ------------------------------------------------------------------ pull */

function pull_(body) {
  var since = Number(body.since) || 0;
  var out = {};
  var cursor = since;
  Object.keys(TABLES).forEach(function (table) {
    var headers = COMMON.concat(TABLES[table]);
    var sh = ensureSheet_(table, headers);
    var rows = readRows_(sh, headers).rows.filter(function (r) {
      var s = Number(r.serverUpdatedAt) || 0;
      if (s > cursor) cursor = s;
      return s > since;
    });
    if (rows.length) out[table] = rows;
  });
  return { ok: true, rows: out, cursor: cursor, masters: readMasters_(), serverTime: Date.now() };
}

function readMasters_() {
  var m = {};
  Object.keys(MASTER).forEach(function (t) {
    var sh = ensureSheet_(t, MASTER[t]);
    m[t] = readRows_(sh, MASTER[t]).rows;
  });
  return m;
}

/* ------------------------------------------------------------------ helpers */

function checkKey_(key) {
  var secret = PropertiesService.getScriptProperties().getProperty('SECRET_KEY');
  return !!secret && String(key || '') === String(secret);
}

// Strictly increasing server timestamp (ms), safe across requests because callers hold the lock.
function nextStamp_() {
  var props = PropertiesService.getScriptProperties();
  var last = Number(props.getProperty('LAST_STAMP')) || 0;
  var now = Date.now();
  var ts = now > last ? now : last + 1;
  props.setProperty('LAST_STAMP', String(ts));
  return ts;
}

function ensureSheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    sh.setFrozenRows(1);
    formatRows_(sh, headers, 2, Math.max(sh.getMaxRows() - 1, 1));
  }
  return sh;
}

// Text columns stay text (ids, phone numbers and ISO dates are never auto-converted);
// money and counters stay numbers.
function formatRows_(sh, headers, startRow, n) {
  headers.forEach(function (h, c) {
    sh.getRange(startRow, c + 1, n, 1).setNumberFormat(NUMERIC[h] ? '0.##' : '@');
  });
}

function appendValues_(sh, headers, values) {
  if (!values.length) return;
  var start = Math.max(sh.getLastRow(), 1) + 1;
  var need = start + values.length - 1 - sh.getMaxRows();
  if (need > 0) sh.insertRowsAfter(sh.getMaxRows(), need + 200);
  formatRows_(sh, headers, start, values.length);
  sh.getRange(start, 1, values.length, headers.length).setValues(values);
}

// Reads rows as objects keyed by the header row actually present in the sheet,
// so a manually re-ordered column never breaks the mapping.
function readRows_(sh, headers) {
  var lastRow = sh.getLastRow(), lastCol = sh.getLastColumn();
  if (lastRow < 1 || lastCol < 1) return { rows: [] };
  var values = sh.getRange(1, 1, lastRow, lastCol).getValues();
  var head = values[0].map(function (h) { return String(h).trim(); });
  var rows = [];
  for (var r = 1; r < values.length; r++) {
    var obj = {}, empty = true;
    for (var c = 0; c < head.length; c++) {
      if (!head[c]) continue;
      var v = values[r][c];
      if (v instanceof Date) v = v.toISOString();
      if (v !== '' && v !== null) empty = false;
      obj[head[c]] = v;
    }
    if (!empty) rows.push(obj);
  }
  return { rows: rows };
}

function toValues_(row, headers) {
  return headers.map(function (h) {
    var v = row[h];
    if (v === undefined || v === null || v === '') return '';
    if (NUMERIC[h]) { var n = Number(v); return isFinite(n) ? n : ''; }
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  });
}

function clone_(o) { return JSON.parse(JSON.stringify(o)); }

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ------------------------------------------------------------------ one-time setup */

/**
 * Run once from the Apps Script editor (Run ▶ setupSheet).
 * Creates every tab with headers, plain-text cells, and the starting Users + Settings rows.
 */
function setupSheet() {
  Object.keys(TABLES).forEach(function (t) { ensureSheet_(t, COMMON.concat(TABLES[t])); });
  ensureSheet_('SaleItems', COMMON.concat(DERIVED.SaleItems));
  Object.keys(MASTER).forEach(function (t) { ensureSheet_(t, MASTER[t]); });

  var users = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
  if (users.getLastRow() < 2) {
    users.getRange(2, 1, 3, 3).setValues([['Y', 'Yaseen', 'TRUE'], ['H', 'Huzaifa', 'TRUE'], ['M', 'Mushtaq', 'TRUE']]);
  }
  // Settings: adds only the keys that are missing, so running setupSheet again never overwrites your values
  var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Settings');
  var defaults = [
    ['shopName', 'Khalifa Attar & Perfumes'],
    ['address', ''],
    ['phone', '+91 98196 64949'],
    ['website', 'khalifaattarperfumes.com'],
    ['gstEnabled', 'FALSE'],
    ['gstin', ''],
    ['thankYou', 'Thank you for shopping with us!'],
    ['currency', '₹'],
    ['upiId', 'khalifaattarperfumes@okicici'],
    ['upiName', 'Khalifa Attar and Perfumes']
  ];
  var have = {};
  if (settings.getLastRow() >= 2) {
    settings.getRange(2, 1, settings.getLastRow() - 1, 1).getValues().forEach(function (r) { have[String(r[0]).trim()] = true; });
  }
  var missing = defaults.filter(function (d) { return !have[d[0]]; });
  if (missing.length) settings.getRange(settings.getLastRow() + 1, 1, missing.length, 2).setValues(missing);
}
