'use strict';
/* =====================================================================
   Khalifa Business Manager — core (data, sync, money maths, PDF, WhatsApp)
   ===================================================================== */
const APP_VERSION = '1.0.0';
const DB_NAME = 'khalifa-bm';
const TABLES = ['Customers', 'Sales', 'Payments', 'Expenses', 'Transfers', 'AuditLog'];
const NUMERIC = new Set(['rev', 'serverUpdatedAt', 'subTotal', 'lineDiscount', 'billDiscount', 'gstPercent',
  'gstAmount', 'grandTotal', 'paidAtBill', 'amount', 'qty', 'rate', 'discount', 'costPrice', 'price']);
const MODES = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Credit'];
const BANK_MODES = new Set(['UPI', 'Card', 'Bank Transfer']);
const EXP_CATS = ['Stock purchase', 'Bottles & packing', 'Rent', 'Salary', 'Delivery', 'Marketing', 'Utilities', 'Other'];
const DEFAULT_USERS = [{ code: 'Y', name: 'Yaseen', active: 'TRUE' }, { code: 'H', name: 'Huzaifa', active: 'TRUE' }, { code: 'M', name: 'Mushtaq', active: 'TRUE' }];

/* ---------------- small utils ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const P = x => Math.round((Number(x) || 0) * 100);            // rupees → paise (integer maths everywhere)
const R = p => Math.round(p) / 100;                             // paise → rupees
const INR = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
const moneyP = p => (p < 0 ? '−' : '') + '₹' + INR.format(Math.abs(Math.round(p)) / 100);
const money = r => moneyP(P(r));
const nowISO = () => new Date().toISOString();
const clone = o => JSON.parse(JSON.stringify(o));
function uid() { return (S.me ? S.me.code : 'X') + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function dayKey(iso) { const d = new Date(iso); if (isNaN(d)) return ''; return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function todayKey() { return dayKey(new Date().toISOString()); }
function fmtDate(iso) { const d = new Date(iso); return isNaN(d) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
function fmtTime(iso) { const d = new Date(iso); return isNaN(d) ? '' : d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }).replace(/[\u202f\u00a0]/g, ' '); }
function fmtPhone(p) { p = String(p || ''); return p.length === 12 ? '+91 ' + p.slice(2, 7) + ' ' + p.slice(7) : p; }
// Accepts 10-digit Indian mobiles with or without +91 / 0. Returns '91XXXXXXXXXX' or ''.
function normPhone(v) {
  let d = String(v || '').replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? '91' + d : '';
}
const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/* ---------------- IndexedDB ---------------- */
const idb = {
  db: null, mem: { rec: new Map(), meta: new Map() }, ok: true,
  open() {
    return new Promise(res => {
      let req;
      try { req = indexedDB.open(DB_NAME, 1); } catch (e) { this.ok = false; return res(); }
      req.onupgradeneeded = () => { const d = req.result; d.createObjectStore('rec'); d.createObjectStore('meta'); };
      req.onsuccess = () => { this.db = req.result; res(); };
      req.onerror = () => { this.ok = false; res(); };
    });
  },
  tx(store, mode, fn) {
    if (!this.ok) return Promise.resolve(fn(null));
    return new Promise((res, rej) => {
      const t = this.db.transaction(store, mode), s = t.objectStore(store);
      let out; out = fn(s);
      t.oncomplete = () => res(out && out.result !== undefined && out instanceof IDBRequest ? out.result : out);
      t.onerror = () => rej(t.error); t.onabort = () => rej(t.error);
    });
  },
  async getAll(store) {
    if (!this.ok) return [...this.mem[store].entries()];
    return new Promise((res, rej) => {
      const t = this.db.transaction(store, 'readonly'), s = t.objectStore(store);
      const ks = s.getAllKeys(), vs = s.getAll();
      t.oncomplete = () => res(ks.result.map((k, i) => [k, vs.result[i]]));
      t.onerror = () => rej(t.error);
    });
  },
  putMany(store, pairs) {
    if (!pairs.length) return Promise.resolve();
    if (!this.ok) { pairs.forEach(([k, v]) => this.mem[store].set(k, v)); return Promise.resolve(); }
    return this.tx(store, 'readwrite', s => { pairs.forEach(([k, v]) => s.put(v, k)); });
  },
  put(store, k, v) { return this.putMany(store, [[k, v]]); },
  clear(store) { if (!this.ok) { this.mem[store].clear(); return Promise.resolve(); } return this.tx(store, 'readwrite', s => s.clear()); }
};

/* ---------------- state ---------------- */
const S = {
  me: null,                    // {code, name, pinHash, salt}
  url: '', key: '',
  t: Object.fromEntries(TABLES.map(t => [t, new Map()])),
  masters: { Users: [], Products: [], Settings: {} },
  outbox: new Set(),           // 'Table|id' keys waiting to be pushed
  cursor: 0, lastSync: 0, lastSeq: {},   // lastSeq: highest bill number used per user code on this phone
  sync: { state: 'idle', msg: '' }
};

async function loadAll() {
  await idb.open();
  const meta = Object.fromEntries(await idb.getAll('meta'));
  S.me = meta.profile || null;
  S.url = (meta.conn && meta.conn.url) || '';
  S.key = (meta.conn && meta.conn.key) || '';
  S.outbox = new Set(meta.outbox || []);
  S.cursor = Number(meta.cursor) || 0;
  S.lastSync = Number(meta.lastSync) || 0;
  S.lastSeq = meta.lastSeq && typeof meta.lastSeq === 'object' ? meta.lastSeq : {};
  if (meta.masters) applyMasters(meta.masters, false);
  for (const [k, v] of await idb.getAll('rec')) {
    const t = k.slice(0, k.indexOf('|'));
    if (S.t[t]) S.t[t].set(v.id, v);
  }
}
const saveMeta = (k, v) => idb.put('meta', k, v);
const saveOutbox = () => saveMeta('outbox', [...S.outbox]);
const putRecs = list => idb.putMany('rec', list.map(([t, r]) => [t + '|' + r.id, r]));

/* records: every change bumps rev, stamps who/when and goes to the outbox */
function stamp(row, isNew) {
  const now = nowISO();
  if (isNew) { row.createdAt = now; row.createdBy = S.me.name; row.deleted = false; row.rev = 0; }
  row.updatedAt = now; row.updatedBy = S.me.name; row.rev = (Number(row.rev) || 0) + 1;
  return row;
}
async function saveRecs(list) {           // list of [table, row, isNew]
  const pairs = list.map(([t, r, isNew]) => { stamp(r, isNew); S.t[t].set(r.id, r); S.outbox.add(t + '|' + r.id); return [t, r]; });
  await putRecs(pairs); await saveOutbox();
  scheduleSync();
}

function castRow(row) {
  const o = {};
  for (const k in row) {
    let v = row[k];
    if (NUMERIC.has(k)) v = v === '' || v == null ? 0 : Number(v);
    else if (k === 'deleted') v = v === true || String(v).toLowerCase() === 'true';
    else v = v == null ? '' : String(v);
    o[k] = v;
  }
  return o;
}
const isNewer = (a, b) => a.rev > b.rev || (a.rev === b.rev && String(a.updatedAt) >= String(b.updatedAt));

function applyMasters(m, persist = true) {
  if (!m) return;
  const yes = v => String(v).toUpperCase() !== 'FALSE' && v !== false && String(v) !== '0';
  if (m.Users) S.masters.Users = m.Users.filter(u => u.code && u.name).map(u => ({ code: String(u.code).trim().toUpperCase(), name: String(u.name).trim(), active: yes(u.active ?? 'TRUE') }));
  if (m.Products) S.masters.Products = m.Products.filter(p => p.name).map(p => ({
    name: String(p.name).trim(), size: String(p.size ?? '').trim(), type: String(p.type || '').trim(),
    price: Number(String(p.price).replace(/[^\d.]/g, '')) || 0,                 // "₹699" → 699
    costPrice: p.costPrice === '' || p.costPrice == null ? null : (Number(String(p.costPrice).replace(/[^\d.]/g, '')) || 0),
    active: yes(p.active ?? 'TRUE')
  }));
  if (m.Settings) {
    if (Array.isArray(m.Settings)) { const o = {}; m.Settings.forEach(r => { if (r.key) o[String(r.key).trim()] = String(r.value ?? ''); }); S.masters.Settings = o; }
    else S.masters.Settings = m.Settings;
  }
  if (persist) saveMeta('masters', S.masters);
}
const setting = (k, d = '') => (S.masters.Settings[k] ?? '') === '' ? d : S.masters.Settings[k];
const gstOn = () => String(setting('gstEnabled', 'FALSE')).toUpperCase() === 'TRUE';
const users = () => (S.masters.Users.length ? S.masters.Users : DEFAULT_USERS.map(u => ({ ...u, active: true }))).filter(u => u.active);
const userName = code => (users().find(u => u.code === code) || {}).name || code;

/* ---------------- money maths (all in paise) ---------------- */
function calcBill(lines, billDiscount, gstPercent) {
  let sub = 0, lineDisc = 0;
  const items = lines.map(l => {
    const qty = Math.max(0, Math.round(Number(l.qty) || 0));
    const gross = P(l.rate) * qty, d = Math.min(P(l.discount), gross);
    sub += gross; lineDisc += d;
    return { ...l, qty, amountP: gross - d };
  });
  const afterLine = sub - lineDisc;
  const billDisc = Math.min(Math.max(P(billDiscount), 0), afterLine);
  const taxable = afterLine - billDisc;
  const gst = gstPercent ? Math.round(taxable * Number(gstPercent) / 100) : 0;
  return { items, sub, lineDisc, billDisc, taxable, gst, grand: taxable + gst };
}
const liveSale = s => !s.deleted && s.status !== 'void';
const livePay = p => !p.deleted && p.status !== 'void';
const liveRow = r => !r.deleted && r.status !== 'void';
const salesList = () => [...S.t.Sales.values()].filter(liveSale);
const payList = () => [...S.t.Payments.values()].filter(livePay);
function saleItems(s) { try { return JSON.parse(s.itemsJson || '[]'); } catch (e) { return []; } }
function salePaidP(s) { return payList().filter(p => p.saleId === s.id).reduce((a, p) => a + P(p.amount), 0); }
function customerDueP(cid) {
  const billed = salesList().filter(s => s.customerId === cid).reduce((a, s) => a + P(s.grandTotal), 0);
  const paid = payList().filter(p => p.customerId === cid).reduce((a, p) => a + P(p.amount), 0);
  return billed - paid;
}
function customerStats(cid) {
  const bills = salesList().filter(s => s.customerId === cid).sort((a, b) => b.billDate.localeCompare(a.billDate));
  return { bills, spentP: bills.reduce((a, s) => a + P(s.grandTotal), 0), dueP: customerDueP(cid) };
}
function nextBillNo() {
  const code = S.me.code; let max = Number(S.lastSeq[code]) || 0;
  for (const s of S.t.Sales.values()) {
    if (s.userCode !== code) continue;
    const n = parseInt(String(s.billNo).split('-')[2], 10);
    if (n > max) max = n;
  }
  return { seq: max + 1, billNo: 'KH-' + code + '-' + String(max + 1).padStart(4, '0') };
}

/* ---------------- bills ---------------- */
// form: {lines, phone, name, billDiscount, gstPercent, mode, paid}
function validateBill(f) {
  const e = [];
  const lines = f.lines.filter(l => l.name && Number(l.qty) > 0);
  if (!lines.length) e.push('Add at least one item');
  if (!normPhone(f.phone)) e.push('Enter the customer’s 10-digit WhatsApp number');
  if (!String(f.name || '').trim()) e.push('Enter the customer’s name');
  if (lines.some(l => !(Number(l.rate) >= 0))) e.push('Check the item prices');
  return e;
}
async function saveBill(f, editingId, reason) {
  const errs = validateBill(f); if (errs.length) throw new Error(errs[0]);
  const phone = normPhone(f.phone), cid = 'C' + phone, name = String(f.name).trim();
  const recs = [];
  const cust = S.t.Customers.get(cid);
  if (!cust) recs.push(['Customers', { id: cid, phone, name, notes: '' }, true]);
  else if (cust.name !== name || cust.deleted) recs.push(['Customers', Object.assign(clone(cust), { name, deleted: false }), false]);

  const lines = f.lines.filter(l => l.name && Number(l.qty) > 0);
  const gstP = gstOn() ? Number(f.gstPercent) || 0 : 0;
  const c = calcBill(lines, f.billDiscount, gstP);
  const items = c.items.map(l => ({ name: l.name, size: l.size || '', type: l.type || '', qty: l.qty, rate: R(P(l.rate)),
    discount: R(Math.min(P(l.discount), P(l.rate) * l.qty)), amount: R(l.amountP), costPrice: l.costPrice == null || l.costPrice === '' ? null : Number(l.costPrice) }));
  let paidP = f.mode === 'Credit' ? 0 : Math.min(Math.max(P(f.paid), 0), c.grand);
  const mode = paidP === 0 ? 'Credit' : f.mode;
  const fields = {
    customerId: cid, customerName: name, customerPhone: phone, itemsJson: JSON.stringify(items),
    subTotal: R(c.sub), lineDiscount: R(c.lineDisc), billDiscount: R(c.billDisc), gstPercent: gstP, gstAmount: R(c.gst),
    grandTotal: R(c.grand), paidAtBill: R(paidP), paymentMode: mode
  };
  let sale;
  if (editingId) {
    const old = S.t.Sales.get(editingId); if (!old) throw new Error('Bill not found');
    sale = Object.assign(clone(old), fields);
    recs.push(['Sales', sale, false]);
    const billPay = [...S.t.Payments.values()].find(p => p.saleId === sale.id && p.kind === 'bill' && !p.deleted);
    if (billPay) {
      const np = clone(billPay);
      if (paidP > 0) Object.assign(np, { amount: R(paidP), mode, customerId: cid, status: 'active' });
      else np.status = 'void';
      recs.push(['Payments', np, false]);
    } else if (paidP > 0) {
      recs.push(['Payments', { id: uid(), saleId: sale.id, customerId: cid, amount: R(paidP), mode, kind: 'bill', receivedBy: S.me.name, date: nowISO(), status: 'active', note: 'Added in bill edit' }, true]);
    }
    recs.push(['AuditLog', auditRow('Sales', sale.id, 'edit', reason, old, sale), true]);
  } else {
    const nb = nextBillNo();
    sale = Object.assign({ id: uid(), billNo: nb.billNo, userCode: S.me.code, billDate: nowISO(), status: 'active', voidReason: '', sharedAt: '', sharedBy: '' }, fields);
    recs.push(['Sales', sale, true]);
    if (paidP > 0) recs.push(['Payments', { id: uid(), saleId: sale.id, customerId: cid, amount: R(paidP), mode, kind: 'bill', receivedBy: S.me.name, date: sale.billDate, status: 'active', note: '' }, true]);
    S.lastSeq[S.me.code] = nb.seq; saveMeta('lastSeq', S.lastSeq);
  }
  await saveRecs(recs);
  return S.t.Sales.get(sale.id);
}
function auditRow(table, recordId, action, reason, before, after) {
  return { id: uid(), at: nowISO(), user: S.me.name, tableName: table, recordId, action, reason: reason || '',
    beforeJson: before ? JSON.stringify(before) : '', afterJson: after ? JSON.stringify(after) : '' };
}
async function voidBill(id, reason) {
  const old = S.t.Sales.get(id); if (!old) return;
  const s = Object.assign(clone(old), { status: 'void', voidReason: reason });
  const recs = [['Sales', s, false]];
  [...S.t.Payments.values()].filter(p => p.saleId === id && livePay(p)).forEach(p => recs.push(['Payments', Object.assign(clone(p), { status: 'void' }), false]));
  recs.push(['AuditLog', auditRow('Sales', id, 'void', reason, old, s), true]);
  await saveRecs(recs);
}
async function markShared(id) {
  const s = S.t.Sales.get(id); if (!s) return;
  await saveRecs([['Sales', Object.assign(clone(s), { sharedAt: nowISO(), sharedBy: S.me.name }), false]]);
}
async function receivePayment(cid, amount, mode, note) {
  const p = P(amount); if (!(p > 0)) throw new Error('Enter an amount');
  await saveRecs([['Payments', { id: uid(), saleId: '', customerId: cid, amount: R(p), mode, kind: 'due', receivedBy: S.me.name, date: nowISO(), status: 'active', note: note || '' }, true]]);
}
async function addExpense(e) {
  const p = P(e.amount); if (!(p > 0)) throw new Error('Enter an amount');
  await saveRecs([['Expenses', { id: uid(), date: e.date || nowISO(), category: e.category, amount: R(p), mode: e.mode, paidBy: e.paidBy || S.me.name, note: e.note || '', status: 'active' }, true]]);
}
async function addTransfer(t) {
  const p = P(t.amount); if (!(p > 0)) throw new Error('Enter an amount');
  if (t.type === 'handover' && (!t.fromUser || !t.toUser || t.fromUser === t.toUser)) throw new Error('Choose two different people');
  await saveRecs([['Transfers', { id: uid(), date: t.date || nowISO(), type: t.type, fromUser: t.fromUser || '', toUser: t.toUser || '', amount: R(p), note: t.note || '', status: 'active' }, true]]);
}
async function voidRow(table, id, reason) {
  const old = S.t[table].get(id); if (!old) return;
  const n = Object.assign(clone(old), { status: 'void' });
  await saveRecs([[table, n, false], ['AuditLog', auditRow(table, id, 'void', reason, old, n), true]]);
}

/* ---------------- cash & bank ---------------- */
function cashBook(untilISO) {
  const until = untilISO || '9999';
  const names = users().map(u => u.name);
  const cash = Object.fromEntries(names.map(n => [n, 0]));
  const add = (n, v) => { if (!(n in cash)) cash[n] = 0; cash[n] += v; };
  let bank = 0;
  payList().filter(p => p.date <= until).forEach(p => { if (p.mode === 'Cash') add(p.receivedBy, P(p.amount)); else if (BANK_MODES.has(p.mode)) bank += P(p.amount); });
  [...S.t.Expenses.values()].filter(liveRow).filter(e => e.date <= until).forEach(e => { if (e.mode === 'Cash') add(e.paidBy, -P(e.amount)); else bank -= P(e.amount); });
  [...S.t.Transfers.values()].filter(liveRow).filter(t => t.date <= until).forEach(t => {
    const a = P(t.amount);
    if (t.type === 'handover') { add(t.fromUser, -a); add(t.toUser, a); }
    else if (t.type === 'deposit') { add(t.fromUser, -a); bank += a; }
    else if (t.type === 'withdraw') { bank -= a; add(t.toUser, a); }
    else if (t.type === 'opening_cash') add(t.toUser, a);
    else if (t.type === 'opening_bank') bank += a;
  });
  const totalCash = Object.values(cash).reduce((a, b) => a + b, 0);
  return { cash, bank, totalCash };
}
function dayClose(day) {
  const end = new Date(day + 'T23:59:59.999').toISOString();
  const inDay = iso => dayKey(iso) === day;
  const book = cashBook(end);
  return users().map(u => {
    const n = u.name;
    const pays = payList().filter(p => p.receivedBy === n && inDay(p.date));
    const exps = [...S.t.Expenses.values()].filter(liveRow).filter(e => e.paidBy === n && inDay(e.date) && e.mode === 'Cash');
    const trs = [...S.t.Transfers.values()].filter(liveRow).filter(t => inDay(t.date));
    return {
      name: n,
      cashIn: pays.filter(p => p.mode === 'Cash').reduce((a, p) => a + P(p.amount), 0),
      bankIn: pays.filter(p => BANK_MODES.has(p.mode)).reduce((a, p) => a + P(p.amount), 0),
      expenses: exps.reduce((a, e) => a + P(e.amount), 0),
      handIn: trs.filter(t => t.type === 'handover' && t.toUser === n).reduce((a, t) => a + P(t.amount), 0),
      handOut: trs.filter(t => t.type === 'handover' && t.fromUser === n).reduce((a, t) => a + P(t.amount), 0),
      deposited: trs.filter(t => t.type === 'deposit' && t.fromUser === n).reduce((a, t) => a + P(t.amount), 0),
      closing: book.cash[n] || 0
    };
  });
}

/* ---------------- reports ---------------- */
function rangeFor(kind, from, to) {
  const d = new Date(); const s = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  let a = s, b = new Date(s.getTime() + 86400000 - 1);
  if (kind === 'week') { const wd = (s.getDay() + 6) % 7; a = new Date(s.getTime() - wd * 86400000); }
  if (kind === 'month') a = new Date(s.getFullYear(), s.getMonth(), 1);
  if (kind === 'custom' && from && to) { a = new Date(from + 'T00:00:00'); b = new Date(to + 'T23:59:59.999'); }
  return { from: a.toISOString(), to: b.toISOString() };
}
function report(range, userCode) {
  const inR = iso => iso >= range.from && iso <= range.to;
  const uName = userCode ? userName(userCode) : null;
  const sales = salesList().filter(s => inR(s.billDate) && (!userCode || s.userCode === userCode));
  const pays = payList().filter(p => inR(p.date) && (!uName || p.receivedBy === uName));
  let total = 0, profit = 0, costKnown = true;
  const prods = new Map(), custs = new Map();
  sales.forEach(s => {
    total += P(s.grandTotal);
    const items = saleItems(s);
    let itemsP = 0, costP = 0;
    items.forEach(it => {
      itemsP += P(it.amount);
      if (it.costPrice == null || it.costPrice === '') costKnown = false; else costP += P(it.costPrice) * it.qty;
      const k = it.name + (it.size ? ' · ' + it.size : '');
      const cur = prods.get(k) || { name: k, qty: 0, amt: 0 }; cur.qty += it.qty; cur.amt += P(it.amount); prods.set(k, cur);
    });
    profit += itemsP - P(s.billDiscount) - costP;
    const c = custs.get(s.customerId) || { name: s.customerName, phone: s.customerPhone, amt: 0, bills: 0 };
    c.amt += P(s.grandTotal); c.bills++; custs.set(s.customerId, c);
  });
  const modes = Object.fromEntries(MODES.filter(m => m !== 'Credit').map(m => [m, 0]));
  pays.forEach(p => { modes[p.mode] = (modes[p.mode] || 0) + P(p.amount); });
  const perUser = users().map(u => {
    const us = salesList().filter(s => inR(s.billDate) && s.userCode === u.code);
    const up = payList().filter(p => inR(p.date) && p.receivedBy === u.name);
    return {
      code: u.code, name: u.name,
      sales: us.reduce((a, s) => a + P(s.grandTotal), 0), bills: us.length,
      cash: up.filter(p => p.mode === 'Cash').reduce((a, p) => a + P(p.amount), 0),
      bank: up.filter(p => BANK_MODES.has(p.mode)).reduce((a, p) => a + P(p.amount), 0),
      dues: us.reduce((a, s) => a + Math.max(0, P(s.grandTotal) - P(s.paidAtBill)), 0),
      sent: us.filter(s => s.sharedAt).length
    };
  });
  return {
    sales, total, count: sales.length, avg: sales.length ? Math.round(total / sales.length / 100) * 100 : 0,
    profit, costKnown, modes,
    topProducts: [...prods.values()].sort((a, b) => b.amt - a.amt).slice(0, 8),
    topCustomers: [...custs.values()].sort((a, b) => b.amt - a.amt).slice(0, 8),
    perUser, dues: duesList()
  };
}
function duesList() {
  return [...S.t.Customers.values()].filter(c => !c.deleted).map(c => ({ c, dueP: customerDueP(c.id) }))
    .filter(x => x.dueP > 0).sort((a, b) => b.dueP - a.dueP);
}
function billsCSV(sales) {
  const q = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  const head = ['Bill no', 'Date', 'Time', 'Billed by', 'Customer', 'WhatsApp', 'Items', 'Sub total', 'Discount', 'GST', 'Total', 'Paid at bill', 'Due at bill', 'Payment mode', 'Status', 'Sent on WhatsApp'];
  const rows = sales.slice().sort((a, b) => a.billDate.localeCompare(b.billDate)).map(s => [
    s.billNo, dayKey(s.billDate), fmtTime(s.billDate), userName(s.userCode), s.customerName, s.customerPhone,
    saleItems(s).map(i => `${i.name} ${i.size} x${i.qty}`).join('; '), s.subTotal, R(P(s.lineDiscount) + P(s.billDiscount)), s.gstAmount,
    s.grandTotal, s.paidAtBill, R(P(s.grandTotal) - P(s.paidAtBill)), s.paymentMode, s.status, s.sharedAt ? 'Yes' : 'No']);
  return '﻿' + [head, ...rows].map(r => r.map(q).join(',')).join('\r\n');
}

/* ---------------- sync (row level, never whole-table) ---------------- */
let syncTimer = null, syncing = false, syncAgain = false;
function scheduleSync(ms = 1200) { clearTimeout(syncTimer); syncTimer = setTimeout(() => syncNow(), ms); }
async function api(action, payload, url, key) {
  url = url || S.url; key = key || S.key;
  if (!url) throw new Error('Apps Script URL not set');
  const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 45000);
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(Object.assign({ action, key, user: S.me ? S.me.name : '' }, payload || {})), redirect: 'follow', signal: ctl.signal });
    let j; try { j = await res.json(); } catch (e) { throw new Error('Sheet did not answer correctly — check the Apps Script URL'); }
    if (!j.ok) throw new Error(j.error === 'BAD_KEY' ? 'Secret key does not match the Sheet' : (j.message || j.error || 'Sheet error'));
    return j;
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('Sheet took too long to answer');
    if (e instanceof TypeError) throw new Error('Could not reach the Sheet — check internet');
    throw e;
  } finally { clearTimeout(tm); }
}
function setSync(state, msg) { S.sync = { state, msg: msg || '' }; if (typeof onSyncChange === 'function') onSyncChange(); }
async function syncNow() {
  if (!S.url || !S.me) return;
  if (syncing) { syncAgain = true; return; }
  if (!navigator.onLine) { setSync('offline'); return; }
  syncing = true; setSync('busy');
  let changed = false, staleCount = 0;
  try {
    // 1) push the outbox in batches
    let keys = [...S.outbox];
    while (keys.length) {
      const batch = keys.splice(0, 150);
      const sent = new Map(), records = [];
      batch.forEach(k => {
        const [t, id] = [k.slice(0, k.indexOf('|')), k.slice(k.indexOf('|') + 1)];
        const r = S.t[t] && S.t[t].get(id);
        if (!r) { S.outbox.delete(k); return; }
        sent.set(k, r.rev + '@' + r.updatedAt); records.push({ t, r });
      });
      if (!records.length) continue;
      const j = await api('push', { records });
      const writes = [];
      for (const res of j.results) {
        const k = res.t + '|' + res.id, local = S.t[res.t].get(res.id);
        const unchanged = local && (local.rev + '@' + local.updatedAt) === sent.get(k);
        if (res.status === 'ok') {
          if (local) { local.serverUpdatedAt = res.serverUpdatedAt; writes.push([res.t, local]); }
          if (unchanged) S.outbox.delete(k);
        } else if (res.status === 'stale' && res.server) {
          staleCount++; changed = true;
          const srv = castRow(res.server); S.t[res.t].set(srv.id, srv); writes.push([res.t, srv]); S.outbox.delete(k);
        }
      }
      await putRecs(writes); await saveOutbox();
    }
    // 2) pull everything newer than our cursor (server clock, so phone clocks don't matter)
    const j = await api('pull', { since: S.cursor });
    const writes = [];
    for (const t of Object.keys(j.rows || {})) {
      if (!S.t[t]) continue;
      for (const raw of j.rows[t]) {
        const r = castRow(raw), k = t + '|' + r.id;
        if (S.outbox.has(k)) continue;                       // our newer local edit goes up next round
        const cur = S.t[t].get(r.id);
        if (!cur || isNewer(r, cur)) { S.t[t].set(r.id, r); writes.push([t, r]); changed = true; }
      }
    }
    await putRecs(writes);
    applyMasters(j.masters);
    S.cursor = Number(j.cursor) || S.cursor; await saveMeta('cursor', S.cursor);
    S.lastSync = Date.now(); await saveMeta('lastSync', S.lastSync);
    setSync(S.outbox.size ? 'pending' : 'ok');
    if (staleCount && typeof toast === 'function') toast(staleCount === 1 ? 'A record was changed on another phone — updated here' : staleCount + ' records were changed on other phones — updated here');
  } catch (e) {
    setSync('err', e.message);
  } finally {
    syncing = false;
    if (changed && typeof onDataChanged === 'function') onDataChanged();
    if (syncAgain) { syncAgain = false; scheduleSync(300); }
  }
}

/* ---------------- PIN ---------------- */
async function hashPin(pin, salt) {
  const data = new TextEncoder().encode(salt + ':' + pin + ':khalifa-bm');
  if (window.crypto && crypto.subtle) {
    const h = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
  let h = 2166136261; for (const b of data) { h ^= b; h = Math.imul(h, 16777619) >>> 0; } return 'f' + h.toString(16);
}
async function checkPin(pin) { return !!S.me && (await hashPin(pin, S.me.salt)) === S.me.pinHash; }

/* ---------------- invoice, caption, PDF ---------------- */
function invoiceHTML(s) {
  const items = saleItems(s);
  const paidP = salePaidP(s), dueP = Math.max(0, P(s.grandTotal) - paidP);
  const disc = P(s.lineDiscount) + P(s.billDiscount);
  const shop = setting('shopName', 'Khalifa Attar & Perfumes');
  const addr = setting('address'), phone = setting('phone', '+91 98196 64949'), web = setting('website', 'khalifaattarperfumes.com');
  const gstin = setting('gstin');
  const modeTxt = s.paymentMode === 'Credit' && paidP === 0 ? 'Credit' : s.paymentMode;
  return `<div class="inv" style="width:560px;background:#fff;color:#211a15;font-family:Manrope,Arial,sans-serif;padding:34px 34px 26px;box-sizing:border-box;font-feature-settings:normal;font-variant-numeric:normal;letter-spacing:0">
  <div style="display:flex;align-items:center;gap:16px;border-bottom:2px solid #b8924f;padding-bottom:16px">
    <img src="icons/logo.png" alt="" style="width:118px;height:auto;display:block">
    <div style="flex:1;text-align:right;font-size:12px;line-height:1.55;color:#5d5249">
      <div style="font:600 21px Cormorant,Georgia,serif;color:#211a15">${esc(shop)}</div>
      ${addr ? `<div>${esc(addr)}</div>` : ''}<div>${esc(phone)}</div><div>${esc(web)}</div>
      ${gstOn() && gstin ? `<div>GSTIN: ${esc(gstin)}</div>` : ''}
    </div>
  </div>
  ${s.status === 'void' ? `<div style="margin-top:12px;padding:8px;border:2px solid #9e2f4a;color:#9e2f4a;font-weight:800;text-align:center;letter-spacing:.08em">VOID — ${esc(s.voidReason || '')}</div>` : ''}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;margin:16px 0 14px;font-size:12.5px">
    <div><span style="color:#8a7d70">Bill no</span><br><b style="font-size:15px">${esc(s.billNo)}</b></div>
    <div style="text-align:right"><span style="color:#8a7d70">Date</span><br><b>${fmtDate(s.billDate)}, ${fmtTime(s.billDate)}</b></div>
    <div><span style="color:#8a7d70">Customer</span><br><b>${esc(s.customerName)}</b></div>
    <div style="text-align:right"><span style="color:#8a7d70">WhatsApp</span><br><b>${esc(fmtPhone(s.customerPhone))}</b></div>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:13px">
    <thead><tr style="background:#f4ead6;color:#5d4a2a">
      <th style="text-align:left;padding:8px 8px">Item</th><th style="padding:8px 4px;text-align:center">Qty</th>
      <th style="padding:8px 4px;text-align:right">Rate</th><th style="padding:8px 8px;text-align:right">Amount</th></tr></thead>
    <tbody>${items.map(i => `<tr>
      <td style="padding:9px 8px;border-bottom:1px solid #eee6d8"><b>${esc(i.name)}</b>${(() => { const sub = [i.size || (i.type === 'Bakhoor' ? 'Bakhoor' : ''), i.discount ? 'disc ' + money(i.discount) : ''].filter(Boolean).join(' · '); return sub ? `<div style="color:#8a7d70;font-size:11.5px">${esc(sub)}</div>` : ''; })()}</td>
      <td style="padding:9px 4px;text-align:center;border-bottom:1px solid #eee6d8">${i.qty}</td>
      <td style="padding:9px 4px;text-align:right;border-bottom:1px solid #eee6d8">${money(i.rate)}</td>
      <td style="padding:9px 8px;text-align:right;border-bottom:1px solid #eee6d8;font-weight:700">${money(i.amount)}</td></tr>`).join('')}</tbody>
  </table>
  <div style="margin-left:auto;width:62%;margin-top:12px;font-size:13px;line-height:1.9">
    <div style="display:flex;justify-content:space-between"><span>Sub total</span><b>${money(s.subTotal)}</b></div>
    ${disc ? `<div style="display:flex;justify-content:space-between"><span>Discount</span><b>−${moneyP(disc)}</b></div>` : ''}
    ${P(s.gstAmount) ? `<div style="display:flex;justify-content:space-between"><span>GST ${s.gstPercent}%</span><b>${money(s.gstAmount)}</b></div>` : ''}
    <div style="display:flex;justify-content:space-between;border-top:2px solid #211a15;margin-top:4px;padding-top:6px;font-size:17px"><span><b>Total</b></span><b>${money(s.grandTotal)}</b></div>
    <div style="display:flex;justify-content:space-between;color:#2e7d62"><span>Paid</span><b>${moneyP(paidP)}</b></div>
    ${dueP ? `<div style="display:flex;justify-content:space-between;color:#9e2f4a"><span>Due</span><b>${moneyP(dueP)}</b></div>` : ''}
    <div style="display:flex;justify-content:space-between;color:#5d5249"><span>Payment mode</span><b>${esc(modeTxt)}</b></div>
  </div>
  <div style="margin-top:18px;padding-top:12px;border-top:1px dashed #cdbf9f;display:flex;justify-content:space-between;align-items:flex-end;font-size:12px;color:#5d5249">
    <div>Billed by: <b style="color:#211a15">${esc(userName(s.userCode))}</b></div>
    <div style="font:italic 600 16px Cormorant,Georgia,serif;color:#94733a">${esc(setting('thankYou', 'Thank you for shopping with us!'))}</div>
  </div>
</div>`;
}
function buildCaption(s) {
  const items = saleItems(s);
  const paidP = salePaidP(s), dueP = Math.max(0, P(s.grandTotal) - paidP);
  const disc = P(s.lineDiscount) + P(s.billDiscount);
  const head = [`*${setting('shopName', 'Khalifa Attar & Perfumes')}*`, `Bill: ${s.billNo} | ${fmtDate(s.billDate)}`, `Customer: ${s.customerName}`, ''];
  const tail = [];
  if (disc) tail.push(`Discount: −${moneyP(disc)}`);
  if (P(s.gstAmount)) tail.push(`GST ${s.gstPercent}%: ${money(s.gstAmount)}`);
  tail.push(`*Total: ${money(s.grandTotal)}*`);
  tail.push(paidP ? `Paid: ${moneyP(paidP)} (${s.paymentMode === 'Credit' ? 'later' : s.paymentMode})` : 'Paid: ₹0 (Credit)');
  if (dueP) tail.push(`Due: ${moneyP(dueP)}`);
  tail.push(`Billed by: ${userName(s.userCode)}`, '', setting('thankYou', 'Thank you for shopping with us!') + ' 🌹', setting('website', 'khalifaattarperfumes.com'));
  const itemLine = i => `${i.name}${i.size ? ' ' + i.size : ''}${i.type === 'Bakhoor' && !/bakh/i.test(i.name) ? ' (Bakhoor)' : ''} × ${i.qty} = ${money(i.amount)}`;
  const build = n => head.concat(items.slice(0, n).map(itemLine),
    n < items.length ? [`+${items.length - n} more item(s) — see the PDF`] : [], [''], tail).join('\n');
  let n = items.length, text = build(n);
  while (text.length > 980 && n > 1) { n--; text = build(n); }   // keep the caption under ~1000 characters
  return text;
}
function pdfName(s) { return `${s.billNo}_${String(s.customerName).replace(/[^\w]+/g, '_').replace(/^_|_$/g, '') || 'Customer'}.pdf`; }
async function makePdf(s) {
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-10000px;top:0;z-index:-1';
  host.innerHTML = invoiceHTML(s);
  document.body.appendChild(host);
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await Promise.all($$('img', host).map(img => img.complete ? 0 : new Promise(r => { img.onload = img.onerror = r; })));
    const el = host.firstElementChild;
    let scale = 2, q = 0.82, blob;
    for (let attempt = 0; attempt < 3; attempt++) {
      const canvas = await html2canvas(el, { scale, backgroundColor: '#ffffff', useCORS: true, logging: false });
      const w = 148, h = Math.max(148, w * canvas.height / canvas.width);
      const doc = new jspdf.jsPDF({ unit: 'mm', format: [w, h], orientation: h >= w ? 'portrait' : 'landscape', compress: true });
      doc.addImage(canvas.toDataURL('image/jpeg', q), 'JPEG', 0, 0, w, w * canvas.height / canvas.width);
      doc.setProperties({ title: s.billNo, subject: 'Bill ' + s.billNo, author: setting('shopName', 'Khalifa Attar & Perfumes') });
      blob = doc.output('blob');
      if (blob.size < 480 * 1024) break;
      scale -= 0.4; q -= 0.12;
    }
    return blob;
  } finally { host.remove(); }
}
