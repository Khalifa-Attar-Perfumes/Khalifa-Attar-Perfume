/* =====================================================================
   Khalifa Business Manager — screens
   ===================================================================== */
const SVG = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const IC = {
  home: SVG('<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
  bills: SVG('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>'),
  plus: SVG('<path d="M12 5v14M5 12h14"/>'),
  users: SVG('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.8c1.6.8 2.6 2.6 3 5.2"/>'),
  more: SVG('<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>'),
  back: SVG('<path d="M15 5l-7 7 7 7"/>'),
  search: SVG('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'),
  close: SVG('<path d="M6 6l12 12M18 6 6 18"/>'),
  chev: SVG('<path d="m6 15 6-6 6 6"/>'),
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.1-.7.2-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4M12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.8m8.4-18.3A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.3-1.7A11.9 11.9 0 0 0 24 12a11.8 11.8 0 0 0-3.6-8.5"/></svg>',
  download: SVG('<path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5"/><path d="M4 19h16"/>'),
  edit: SVG('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>'),
  qr: SVG('<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M14 14h2v2h-2zM18 14h2M14 18v2h2M18 18h2v2"/>'),
  ban: SVG('<circle cx="12" cy="12" r="8.5"/><path d="m6 6 12 12"/>'),
  chart: SVG('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  wallet: SVG('<path d="M3 7a2 2 0 0 1 2-2h13v4"/><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="16.5" cy="13.5" r="1.3"/>'),
  receipt: SVG('<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h5"/>'),
  box: SVG('<path d="M12 3 3.5 7.5v9L12 21l8.5-4.5v-9z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>'),
  sync: SVG('<path d="M20 11a8 8 0 0 0-14.3-4.6L4 8"/><path d="M4 4v4h4M4 13a8 8 0 0 0 14.3 4.6L20 16"/><path d="M20 20v-4h-4"/>'),
  gear: SVG('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  log: SVG('<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>'),
  lock: SVG('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  phone: SVG('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
  cash: SVG('<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9v.01M18 15v.01"/>')
};
const UCOL = ['#c9a25e', '#6f93b8', '#4f9c7f', '#b0708a', '#8f8a5c'];
const ucolor = code => UCOL[Math.max(0, users().findIndex(u => u.code === code)) % UCOL.length];

const V = { tab: 'home', stack: [], billsF: 'all', billsQ: '', custQ: '', rep: { kind: 'today', from: '', to: '', user: '' }, closeDay: '', setup: null, locked: false };
let NB = null, WA = null, PADS = {};

/* ---------------- helpers ---------------- */
function toast(msg) {
  $$('.toast').forEach(t => t.remove());
  const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2800);
}
function syncChip() {
  const st = S.sync.state, n = S.outbox.size;
  const map = { ok: ['ok', 'Synced'], busy: ['busy', 'Syncing…'], offline: ['', 'Offline' + (n ? ' · ' + n : '')], err: ['err', 'Sync error'], pending: ['pending', 'Pending ' + n], idle: [n ? 'pending' : 'ok', n ? 'Pending ' + n : 'Synced'] };
  const [cls, label] = map[st] || map.idle;
  return `<button class="chip-sync ${cls}" data-act="syncTap" title="${esc(S.sync.msg)}"><i></i>${esc(label)}</button>`;
}
function onSyncChange() { $$('.chip-sync').forEach(c => { c.outerHTML = syncChip(); }); }
function onDataChanged() {
  if (!S.me || V.locked || V.setup) return;
  renderBase();
  const top = V.stack[V.stack.length - 1];
  if (top && top.type === 'page' && !['newbill', 'saved'].includes(top.name) && !$('.sheet')) refreshPage(top);
}
function billTags(s) {
  const t = [];
  if (s.status === 'void') t.push('<span class="tag void">Void</span>');
  else {
    const dueP = P(s.grandTotal) - salePaidP(s);
    if (dueP > 0) t.push(`<span class="tag rose">Due ${moneyP(dueP)}</span>`);
    if (s.sharedAt) t.push('<span class="tag jade">✓ Sent</span>');
  }
  return t.join(' ');
}
function billRow(s) {
  return `<button class="row" data-act="openBill" data-id="${esc(s.id)}">
    <span class="ucode ${esc(s.userCode)}" title="${esc(userName(s.userCode))}">${esc(s.userCode)}</span>
    <span class="grow"><span class="t" style="display:block">${esc(s.customerName)}</span>
      <span class="s" style="display:block">${esc(s.billNo)} · ${fmtTime(s.billDate)} · ${esc(userName(s.userCode))}</span></span>
    <span style="text-align:right"><span class="amt money" style="display:block;${s.status === 'void' ? 'text-decoration:line-through;color:#999' : ''}">${money(s.grandTotal)}</span>${billTags(s)}</span>
  </button>`;
}
const header = (title, sub, back = true, extra = '') => `<header class="top"><div class="top-row">
  ${back ? `<button class="back" data-act="back" aria-label="Back">${IC.back}</button>` : ''}
  <div class="grow"><h1>${esc(title)}</h1>${sub ? `<div class="sub">${sub}</div>` : ''}</div>${extra}${syncChip()}</div></header>`;
const allSales = () => [...S.t.Sales.values()].filter(s => !s.deleted).sort((a, b) => b.billDate.localeCompare(a.billDate));

/* ---------------- navigation: pages and sheets live on the history stack (Android back works) ---------------- */
function openPage(name, arg) {
  const el = document.createElement('div'); el.className = 'page'; el.dataset.name = name;
  $('#pages').appendChild(el);
  const entry = { type: 'page', name, arg, el };
  V.stack.push(entry); history.pushState({ d: V.stack.length }, '');
  refreshPage(entry); el.scrollTop = 0;
}
function replacePage(name, arg) {
  const top = V.stack[V.stack.length - 1];
  if (!top || top.type !== 'page') return openPage(name, arg);
  top.name = name; top.arg = arg; top.el.dataset.name = name; refreshPage(top); top.el.scrollTop = 0;
}
function refreshPage(entry) {
  const st = entry.el.scrollTop;
  const fn = PAGES[entry.name]; entry.el.innerHTML = fn ? fn(entry.arg) : '';
  if (entry.name === 'newbill') nbAfterRender();
  if (entry.name === 'bill') fitInvoice(entry.el);
  entry.el.scrollTop = st;
}
function openSheet(html, mount) {
  const top = V.stack[V.stack.length - 1];
  const reuse = top && top.type === 'sheet';                     // one sheet at a time: replace, keep history in step
  $('#sheets').innerHTML = '';
  const scrim = document.createElement('div'); scrim.className = 'scrim'; scrim.dataset.act = 'back';
  const sh = document.createElement('div'); sh.className = 'sheet'; sh.setAttribute('role', 'dialog');
  sh.innerHTML = '<div class="grab"></div>' + html;
  $('#sheets').append(scrim, sh);
  if (reuse) { top.el = sh; top.onClose = null; }
  else { V.stack.push({ type: 'sheet', el: sh }); history.pushState({ d: V.stack.length }, ''); }
  if (mount) mount(sh);
  const f = sh.querySelector('[autofocus]'); if (f) setTimeout(() => f.focus(), 60);
  return sh;
}
function closeSheetDom() { $('#sheets').innerHTML = ''; V.stack = V.stack.filter(e => e.type !== 'sheet'); }
function popTop() {
  const top = V.stack.pop(); if (!top) return;
  if (top.type === 'sheet') { $('#sheets').innerHTML = ''; if (top.onClose) top.onClose(); }
  else { top.el.remove(); if (top.name === 'newbill' && NB && !NB.editingId) saveDraft(); }
}
// UI-initiated back closes the overlay right away; the matching popstate is then ignored.
function goBack() { if (!V.stack.length) return; popTop(); V.ignorePop = (V.ignorePop || 0) + 1; history.back(); }
window.addEventListener('popstate', () => { if (V.ignorePop > 0) { V.ignorePop--; return; } popTop(); });
function closeTopSheet() { const top = V.stack[V.stack.length - 1]; if (top && top.type === 'sheet') goBack(); }

/* ---------------- base (tabs) ---------------- */
function render() {
  const app = $('#app');
  if (V.setup || !S.me || !S.url) { if (!V.setup) V.setup = { step: 'connect' }; app.innerHTML = setupView(); $('#tabs').innerHTML = ''; return; }
  if (V.locked) { app.innerHTML = lockView(); $('#tabs').innerHTML = ''; return; }
  renderBase();
}
function renderBase() {
  const app = $('#app');
  const fn = { home: homeView, bills: billsView, customers: customersView, more: moreView }[V.tab];
  app.innerHTML = fn();
  $('#tabs').innerHTML = tabsHTML();
}
function tabsHTML() {
  const b = (t, label, icon) => `<button class="${V.tab === t ? 'on' : ''}" data-act="tab" data-tab="${t}" aria-label="${label}">${icon}<span>${label}</span></button>`;
  return `<nav class="tabs">${b('home', 'Home', IC.home)}${b('bills', 'Bills', IC.bills)}
    <button class="plus" data-act="newBill" aria-label="New bill"><span class="disc">${IC.plus}</span><span style="color:var(--brass-lt)">New bill</span></button>
    ${b('customers', 'Customers', IC.users)}${b('more', 'More', IC.more)}</nav>`;
}

function homeView() {
  const tk = todayKey(), sales = salesList();
  const today = sales.filter(s => dayKey(s.billDate) === tk);
  const totP = today.reduce((a, s) => a + P(s.grandTotal), 0);
  const per = users().map(u => ({ u, p: today.filter(s => s.userCode === u.code).reduce((a, s) => a + P(s.grandTotal), 0), n: today.filter(s => s.userCode === u.code).length }));
  const m0 = new Date(); const mk = m0.getFullYear() + '-' + String(m0.getMonth() + 1).padStart(2, '0');
  const monthP = sales.filter(s => dayKey(s.billDate).startsWith(mk)).reduce((a, s) => a + P(s.grandTotal), 0);
  const dues = duesList(), duesP = dues.reduce((a, d) => a + d.dueP, 0);
  const recent = allSales().slice(0, 8);
  const hr = new Date().getHours(); const greet = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
  return `<header class="top tall">
    <div class="top-row"><div class="avatar">${esc(S.me.code)}</div><div class="grow"><div class="sub">${greet}</div><h1>${esc(S.me.name)}</h1></div>${syncChip()}</div>
    <div class="today"><div class="lbl">Today’s sales</div><div class="num money">${moneyP(totP)}</div>
      <div class="meta">${today.length} bill${today.length === 1 ? '' : 's'}${today.length ? ' · average ' + moneyP(Math.round(totP / today.length / 100) * 100) : ' yet today'}</div></div>
    <div class="share"><div class="bar">${totP ? per.filter(x => x.p > 0).map(x => `<i style="width:${(x.p / totP * 100).toFixed(2)}%;background:${ucolor(x.u.code)}"></i>`).join('') : ''}</div>
      <div class="legend">${per.map(x => `<span><i class="dot" style="background:${ucolor(x.u.code)}"></i>${esc(x.u.name)} <b class="money">${moneyP(x.p)}</b></span>`).join('')}</div></div>
  </header>
  <main>
    <div class="kpis">
      <button class="kpi" data-act="page" data-p="reports"><div class="k">This month</div><div class="v money">${moneyP(monthP)}</div></button>
      <button class="kpi" data-act="page" data-p="dues"><div class="k">Pending dues · ${dues.length}</div><div class="v money ${duesP ? 'rose' : ''}">${moneyP(duesP)}</div></button>
    </div>
    <div class="h2">Recent bills <button class="link" data-act="tab" data-tab="bills">All bills</button></div>
    ${recent.length ? `<div class="list">${recent.map(billRow).join('')}</div>` : `<div class="list"><div class="empty"><b>No bills yet</b>Tap New bill to make the first one.</div></div>`}
  </main>`;
}

function billsView() {
  const q = V.billsQ.trim().toLowerCase(), f = V.billsF, tk = todayKey();
  let list = allSales();
  if (f === 'mine') list = list.filter(s => s.userCode === S.me.code);
  if (f === 'today') list = list.filter(s => dayKey(s.billDate) === tk);
  if (f === 'due') list = list.filter(s => liveSale(s) && P(s.grandTotal) - salePaidP(s) > 0);
  if (f === 'unsent') list = list.filter(s => liveSale(s) && !s.sharedAt);
  if (f === 'void') list = list.filter(s => s.status === 'void');
  if (q) { const qd = q.replace(/\D/g, ''); list = list.filter(s => s.customerName.toLowerCase().includes(q) || s.billNo.toLowerCase().includes(q) || (qd.length >= 3 && s.customerPhone.includes(qd))); }
  const groups = new Map(); list.slice(0, 300).forEach(s => { const k = dayKey(s.billDate); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(s); });
  const F = [['all', 'All'], ['mine', 'Mine'], ['today', 'Today'], ['due', 'With due'], ['unsent', 'Not sent'], ['void', 'Void']];
  return header('Bills', `${list.length} bill${list.length === 1 ? '' : 's'}`, false) + `<main>
    <div class="search">${IC.search}<input class="in" type="search" placeholder="Search name, number or bill no" value="${esc(V.billsQ)}" data-in="billsQ" aria-label="Search bills"></div>
    <div class="seg" style="margin-top:12px">${F.map(([k, l]) => `<button class="${f === k ? 'on' : ''}" data-act="billsF" data-f="${k}">${l}</button>`).join('')}</div>
    <div id="billsList">${groups.size ? [...groups].map(([d, arr]) => `<div class="h2">${d === tk ? 'Today' : fmtDate(d + 'T12:00:00')} <span style="margin-left:auto" class="money">${moneyP(arr.filter(liveSale).reduce((a, s) => a + P(s.grandTotal), 0))}</span></div><div class="list">${arr.map(billRow).join('')}</div>`).join('')
      : `<div class="list" style="margin-top:14px"><div class="empty"><b>No bills here</b>${q ? 'Try another name or number.' : 'Bills you make show up here.'}</div></div>`}</div>
  </main>`;
}

function customersView() {
  const q = V.custQ.trim().toLowerCase(), qd = q.replace(/\D/g, '');
  const sales = salesList();
  const spent = new Map(); sales.forEach(s => spent.set(s.customerId, (spent.get(s.customerId) || 0) + P(s.grandTotal)));
  let list = [...S.t.Customers.values()].filter(c => !c.deleted);
  if (q) list = list.filter(c => c.name.toLowerCase().includes(q) || (qd.length >= 3 && c.phone.includes(qd)));
  list = list.map(c => ({ c, spent: spent.get(c.id) || 0, due: customerDueP(c.id) })).sort((a, b) => b.due - a.due || b.spent - a.spent);
  return header('Customers', `${list.length} customer${list.length === 1 ? '' : 's'}`, false) + `<main>
    <div class="search">${IC.search}<input class="in" type="search" placeholder="Search name or WhatsApp number" value="${esc(V.custQ)}" data-in="custQ" aria-label="Search customers"></div>
    <div class="list" style="margin-top:14px">${list.slice(0, 300).map(x => `<button class="row" data-act="openCust" data-id="${esc(x.c.id)}">
      <span class="avatar" style="background:var(--brass-wash);color:var(--brass-dk);border:0">${esc((x.c.name || '?').trim().charAt(0).toUpperCase())}</span>
      <span class="grow"><span class="t" style="display:block">${esc(x.c.name)}</span><span class="s" style="display:block">${esc(fmtPhone(x.c.phone))}</span></span>
      <span style="text-align:right">${x.due > 0 ? `<span class="tag rose">Due ${moneyP(x.due)}</span>` : `<span class="amt money">${moneyP(x.spent)}</span>`}</span></button>`).join('')
      || `<div class="empty"><b>No customers yet</b>Customers are saved automatically when you make a bill.</div>`}</div>
  </main>`;
}

function moreView() {
  const t = (p, icon, title, sub) => `<button class="tile" data-act="page" data-p="${p}">${icon}<div><b>${title}</b><br><span>${sub}</span></div></button>`;
  const book = cashBook();
  return header('More', 'Signed in as ' + esc(S.me.name), false) + `<main>
    <div class="tiles">
      ${t('reports', IC.chart, 'Reports', 'Sales, profit, user-wise')}
      ${t('cash', IC.wallet, 'Cash & bank', 'Cash in hand ' + moneyP(book.totalCash))}
      ${t('expenses', IC.receipt, 'Expenses', 'Add and review')}
      ${t('dues', IC.users, 'Pending dues', duesList().length + ' customers')}
      ${S.masters.Products.length ? t('products', IC.box, 'Price list', S.masters.Products.length + ' from the Sheet') : ''}
      ${t('audit', IC.log, 'Activity log', 'Edits, voids, conflicts')}
      ${t('settings', IC.gear, 'Settings', 'PIN, Sheet, backup')}
      <button class="tile" data-act="lockNow">${IC.lock}<div><b>Lock app</b><br><span>PIN needed to open</span></div></button>
    </div>
    <p class="hint" style="text-align:center;margin-top:22px">Khalifa Business Manager v${APP_VERSION}</p>
  </main>`;
}

/* ---------------- pages ---------------- */
const PAGES = {};

/* ===== New bill — the live receipt ===== */
function newNB() { return { lines: [], phone: '', name: '', nameAuto: true, billDiscount: '', gstPercent: 0, mode: 'Cash', paid: '', paidTouched: false, it: newIt(), editingId: null }; }
function saveDraft() { try { if (NB && !NB.editingId && (NB.lines.length || NB.phone)) localStorage.setItem('kbm-draft', JSON.stringify(NB)); else localStorage.removeItem('kbm-draft'); } catch (e) { /* storage blocked */ } }
function loadDraft() { try { const d = JSON.parse(localStorage.getItem('kbm-draft') || 'null'); return d && d.lines ? d : null; } catch (e) { return null; } }
function clearDraft() { try { localStorage.removeItem('kbm-draft'); } catch (e) { /* ignore */ } }
function openNewBill() { NB = loadDraft() || newNB(); if (!NB.it || !CATS[NB.it.cat]) NB.it = newIt(); NB.editingId = null; openPage('newbill'); }
function openEditBill(id) {
  const s = S.t.Sales.get(id); if (!s) return;
  NB = newNB(); NB.editingId = id;
  NB.lines = saleItems(s).map(i => ({ name: i.name, size: i.size, type: CATS[i.type] ? i.type : 'Other', qty: i.qty, rate: i.rate, discount: i.discount || '', costPrice: i.costPrice }));
  NB.phone = s.customerPhone.slice(2); NB.name = s.customerName; NB.nameAuto = false;
  NB.billDiscount = s.billDiscount || ''; NB.gstPercent = s.gstPercent || 0;
  const paid = [...S.t.Payments.values()].find(p => p.saleId === id && p.kind === 'bill' && livePay(p));
  NB.mode = paid ? paid.mode : 'Credit'; NB.paid = paid ? paid.amount : 0; NB.paidTouched = true;
  openPage('newbill');
}
// No product list: every item is typed on the bill. Category decides the sizes.
const CATS = {
  Attar: { label: 'Attar', sizes: ['3ml', '6ml', '8ml', '10ml', '12ml', '15ml', '20ml', '22ml'], ph: 'e.g. Prince, Tazkirah, Musk' },
  Perfume: { label: 'Perfume', sizes: ['50ml', '100ml'], ph: 'e.g. Prince, Arabian Oud' },
  Bakhoor: { label: 'Bakhoor', sizes: [], ph: 'e.g. Bakhoor Malaki, Oud Chips' },
  Other: { label: 'Manual', sizes: [], ph: 'e.g. Gift box, Roll-on bottle' }
};
const newIt = cat => ({ cat: cat || 'Attar', name: '', size: '', price: '', qty: 1 });
// Items sold before (all phones) — suggested so the next bill is one tap.
function pastItems(cat) {
  const map = new Map();
  salesList().slice().sort((a, b) => a.billDate.localeCompare(b.billDate)).forEach(s => saleItems(s).forEach(i => {
    const t = i.type && CATS[i.type] ? i.type : 'Other';
    if (t !== cat) return;
    const k = i.name.trim().toLowerCase() + '|' + String(i.size || '').toLowerCase();
    const cur = map.get(k) || { name: i.name, size: i.size || '', price: i.rate, count: 0 };
    cur.price = i.rate; cur.count += i.qty; map.set(k, cur);
  }));
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
function sugHTML() {
  const it = NB.it, q = it.name.trim().toLowerCase();
  let list = pastItems(it.cat);
  if (q) list = list.filter(x => x.name.toLowerCase().includes(q) && !(x.name.toLowerCase() === q && x.size === it.size));
  NB.sugs = list.slice(0, 6);
  if (!NB.sugs.length) return '';
  return `<div class="hint" style="margin:8px 2px 6px">${q ? 'Sold before' : 'Quick pick — sold before'}</div><div class="sugs">${NB.sugs.map((x, i) =>
    `<button class="size" data-act="itPick" data-i="${i}">${esc(x.name)}${x.size ? ' · ' + esc(x.size) : ''} · ${money(x.price)}</button>`).join('')}</div>`;
}
function composerHTML() {
  const it = NB.it, c = CATS[it.cat];
  const other = it.cat === 'Attar' && it.size && !c.sizes.includes(it.size) ? it.size.replace(/ml$/i, '') : '';
  return `<div class="seg cats">${Object.keys(CATS).map(k => `<button class="${it.cat === k ? 'on' : ''}" data-act="itCat" data-c="${k}">${CATS[k].label}</button>`).join('')}</div>
    <label class="f" for="itName" style="margin-top:14px">${it.cat === 'Other' ? 'Item name' : CATS[it.cat].label + ' name'}</label>
    <input class="in" id="itName" data-in="itName" value="${esc(it.name)}" placeholder="${esc(c.ph)}" autocomplete="off" autocapitalize="words">
    <div id="itSug">${sugHTML()}</div>
    ${c.sizes.length ? `<label class="f" style="margin-top:12px">Size</label><div class="seg sizes-seg">${c.sizes.map(z => `<button class="${it.size === z ? 'on' : ''}" data-act="itSize" data-z="${z}">${z}</button>`).join('')}</div>` : ''}
    ${it.cat === 'Attar' ? `<div class="prefix" style="margin-top:8px"><input class="in" id="itOther" data-in="itOther" inputmode="numeric" placeholder="Other size (3–22)" value="${esc(other)}" style="padding-left:14px;padding-right:46px"><span style="left:auto;right:14px">ml</span></div>` : ''}
    ${it.cat === 'Other' ? `<input class="in" id="itFree" data-in="itFree" style="margin-top:10px" placeholder="Size / unit (optional)" value="${esc(it.size)}" autocomplete="off">` : ''}
    <div class="grid2" style="margin-top:12px">
      <div class="mini"><label for="itPrice">${it.cat === 'Bakhoor' ? 'Price ₹ (per piece)' : 'Price ₹'}</label><input id="itPrice" data-in="itPrice" inputmode="decimal" placeholder="0" value="${esc(it.price)}"></div>
      <div class="mini"><label>Quantity</label><div class="qty"><button data-act="itQty" data-d="-1" aria-label="Less">−</button><span id="itQty">${it.qty}</span><button data-act="itQty" data-d="1" aria-label="More">+</button></div></div>
    </div>
    <button class="btn brass" style="margin-top:12px" data-act="itAdd">${IC.plus} Add to bill</button>
    <div class="err" id="itErr"></div>`;
}
function renderComposer(focusName) {
  const box = $('#nbComposer'); if (!box) return;
  box.innerHTML = composerHTML();
  if (focusName) { const n = $('#itName'); n.focus(); }
}
function itAdd() {
  const it = NB.it, err = m => { const e = $('#itErr'); if (e) e.textContent = m; toast(m); };
  const name = it.name.trim().replace(/\s+/g, ' '), price = Number(String(it.price).replace(/[^\d.]/g, ''));
  if (!name) return err('Enter the item name');
  if ((it.cat === 'Attar' || it.cat === 'Perfume') && !it.size) return err('Choose a size');
  if (it.cat === 'Attar') { const ml = parseFloat(it.size); if (!(ml >= 3 && ml <= 22)) return err('Attar size must be between 3ml and 22ml'); }
  if (!(price > 0)) return err('Enter the price');
  const size = it.cat === 'Bakhoor' ? '' : it.size.trim();
  const ex = NB.lines.find(l => l.name.toLowerCase() === name.toLowerCase() && String(l.size).toLowerCase() === size.toLowerCase() && l.type === it.cat && Number(l.rate) === price);
  if (ex) ex.qty += it.qty; else NB.lines.push({ name, size, type: it.cat, qty: it.qty, rate: price, discount: '', costPrice: null });
  NB.it = newIt(it.cat);
  renderComposer(false); $('#nbLines').innerHTML = nbLinesHTML(); nbUpdate();
  toast(`${name}${size ? ' ' + size : ''} × ${ex ? ex.qty : NB.lines[NB.lines.length - 1].qty} added`);
}
function nbLinesHTML() {
  if (!NB.lines.length) return `<div class="line" style="text-align:center;color:var(--muted);border-style:dashed">No items yet — type an item above and tap “Add to bill”</div>`;
  return NB.lines.map((l, i) => `<div class="line">
    <div class="top-l"><div class="grow"><div class="nm">${esc(l.name)}</div><div class="sz">${esc([l.size, l.type === 'Other' ? '' : l.type].filter(Boolean).join(' · '))}${l.type === 'Bakhoor' ? ' · ' + l.qty + ' pc' : ''}</div></div>
      <b class="amt money" id="nbAmt${i}"></b>
      <button class="icon-btn" data-act="nbDel" data-i="${i}" aria-label="Remove ${esc(l.name)}" style="width:34px;height:34px">${IC.close}</button></div>
    <div class="ctrl">
      <div class="mini"><label>Qty</label><div class="qty"><button data-act="nbQty" data-i="${i}" data-d="-1" aria-label="Less">−</button><span id="nbQ${i}">${l.qty}</span><button data-act="nbQty" data-i="${i}" data-d="1" aria-label="More">+</button></div></div>
      <div class="mini"><label>Rate ₹</label><input inputmode="decimal" value="${esc(l.rate)}" data-in="nbRate" data-i="${i}"></div>
      <div class="mini"><label>Discount ₹</label><input inputmode="decimal" value="${esc(l.discount)}" placeholder="0" data-in="nbDisc" data-i="${i}"></div>
    </div></div>`).join('');
}
PAGES.newbill = () => {
  const preview = NB.editingId ? (S.t.Sales.get(NB.editingId) || {}).billNo : nextBillNo().billNo;
  const gst = gstOn();
  return header(NB.editingId ? 'Edit bill' : 'New bill', `${esc(preview)} · ${esc(S.me.name)}`) + `<main class="noTab">
    <label class="f" for="nbPhone">Customer WhatsApp number</label>
    <div class="prefix"><span>+91</span><input class="in big" id="nbPhone" type="tel" inputmode="numeric" maxlength="14" placeholder="10-digit number" autocomplete="off" value="${esc(NB.phone)}" data-in="nbPhone"></div>
    <input class="in" style="margin-top:10px" id="nbName" placeholder="Customer name" autocomplete="off" value="${esc(NB.name)}" data-in="nbName" aria-label="Customer name">
    <div id="nbFound" class="custbox"></div>

    <div class="h2">Items</div>
    <div class="card composer" id="nbComposer">${composerHTML()}</div>
    <div style="margin-top:14px" id="nbLines">${nbLinesHTML()}</div>

    <div class="h2">Discount${gst ? ' & GST' : ''}</div>
    <div class="grid2"><div class="mini"><label>Discount on bill ₹</label><input inputmode="decimal" placeholder="0" value="${esc(NB.billDiscount)}" data-in="nbBillDisc"></div>
      ${gst ? `<div class="mini"><label>GST %</label><div class="seg">${[0, 5, 12, 18].map(g => `<button class="${Number(NB.gstPercent) === g ? 'on' : ''}" data-act="nbGst" data-g="${g}" style="height:44px;padding:0 12px">${g}</button>`).join('')}</div></div>` : '<div></div>'}</div>

    <div class="h2">Payment</div>
    <div class="seg" id="nbModes">${MODES.map(m => `<button class="${NB.mode === m ? 'on' : ''}" data-act="nbMode" data-m="${m}">${m}</button>`).join('')}</div>
    <div class="mini" style="margin-top:12px"><label>Paid now ₹</label><input id="nbPaid" inputmode="decimal" value="${esc(NB.paid)}" data-in="nbPaid" ${NB.mode === 'Credit' ? 'disabled' : ''}></div>
    <div class="hint" id="nbPaidHint"></div>
    <div class="err" id="nbErr"></div>
  </main>
  <div class="slip" id="slip">
    <div class="handle"><button class="grow" style="text-align:left" data-act="slipToggle" aria-label="Show bill breakdown">
      <div class="count"><span id="slipCount"></span> <span class="chev" style="display:inline-block;width:14px;vertical-align:middle">${IC.chev}</span></div>
      <div class="total money" id="slipTotal"></div></button>
      <button class="btn brass" data-act="nbSave">${NB.editingId ? 'Save changes' : 'Save bill'}</button></div>
    <div class="detail" id="slipDetail"></div>
  </div>`;
};
function nbCalc() { return calcBill(NB.lines, NB.billDiscount, gstOn() ? NB.gstPercent : 0); }
function nbAfterRender() { nbLookup(false); nbUpdate(); }
function nbUpdate() {
  const c = nbCalc();
  c.items.forEach((l, i) => { const a = $('#nbAmt' + i); if (a) a.textContent = moneyP(l.amountP); const q = $('#nbQ' + i); if (q) q.textContent = l.qty; });
  if (!NB.paidTouched && NB.mode !== 'Credit') { NB.paid = R(c.grand); const pi = $('#nbPaid'); if (pi && document.activeElement !== pi) pi.value = NB.paid || ''; }
  const paidP = NB.mode === 'Credit' ? 0 : Math.min(Math.max(P(NB.paid), 0), c.grand), dueP = c.grand - paidP;
  const qty = c.items.reduce((a, l) => a + l.qty, 0);
  const sc = $('#slipCount'); if (sc) sc.textContent = `${qty} item${qty === 1 ? '' : 's'}`;
  const st = $('#slipTotal'); if (st) st.textContent = moneyP(c.grand);
  const sd = $('#slipDetail');
  if (sd) sd.innerHTML = `<div><span>Sub total</span><b class="money">${moneyP(c.sub)}</b></div>
    ${c.lineDisc + c.billDisc ? `<div><span>Discount</span><b class="money">−${moneyP(c.lineDisc + c.billDisc)}</b></div>` : ''}
    ${c.gst ? `<div><span>GST ${NB.gstPercent}%</span><b class="money">${moneyP(c.gst)}</b></div>` : ''}
    <div><span>Paid now (${esc(NB.mode)})</span><b class="money">${moneyP(paidP)}</b></div>
    ${dueP > 0 ? `<div class="due"><span>Due — goes to customer’s ledger</span><b class="money">${moneyP(dueP)}</b></div>` : ''}`;
  const h = $('#nbPaidHint');
  if (h) h.innerHTML = P(NB.paid) > c.grand && NB.mode !== 'Credit' ? `<span class="err">Paid is more than the total — only ${moneyP(c.grand)} will be recorded.</span>`
    : dueP > 0 ? `<b style="color:var(--rose)">${moneyP(dueP)}</b> will be added to ${esc(NB.name || 'the customer')}’s due.` : '';
  saveDraft();
}
function nbLookup(fillName = true) {
  const box = $('#nbFound'); if (!box) return;
  const ph = normPhone(NB.phone);
  if (!ph) { box.innerHTML = String(NB.phone).replace(/\D/g, '').length >= 10 ? '<div class="err">This doesn’t look like a 10-digit mobile number.</div>' : ''; return; }
  const c = S.t.Customers.get('C' + ph);
  if (c && !c.deleted) {
    if (fillName && (NB.nameAuto || !NB.name)) { NB.name = c.name; NB.nameAuto = true; const n = $('#nbName'); if (n) n.value = c.name; }
    const st = customerStats(c.id);
    box.innerHTML = `<div class="found">Returning customer · ${st.bills.length} bill${st.bills.length === 1 ? '' : 's'} · spent <b class="money">${moneyP(st.spentP)}</b>${st.dueP > 0 ? ` · <b style="color:var(--rose)">due ${moneyP(st.dueP)}</b>` : ''}</div>`;
  } else box.innerHTML = `<div class="found" style="background:var(--jade-wash)">New customer — saved with this bill.</div>`;
}
async function nbSave() {
  const errs = validateBill(NB);
  const er = $('#nbErr'); if (er) er.textContent = errs[0] || '';
  if (errs.length) { toast(errs[0]); return; }
  const doSave = async reason => {
    try {
      const sale = await saveBill(NB, NB.editingId, reason);
      clearDraft(); NB = null;
      const seal = document.createElement('div'); seal.className = 'seal'; seal.innerHTML = '<div class="wax">K</div>';
      document.body.appendChild(seal);
      await new Promise(r => setTimeout(r, matchMedia('(prefers-reduced-motion: reduce)').matches ? 150 : 700));
      seal.remove(); renderBase(); replacePage('saved', sale.id);
    } catch (e) { toast(e.message); if (er) er.textContent = e.message; }
  };
  if (NB.editingId) askReasonPin('Save changes to this bill', 'What changed and why?', reason => { closeTopSheet(); doSave(reason); });
  else doSave('');
}
PAGES.saved = id => {
  const s = S.t.Sales.get(id); if (!s) return '';
  const dueP = P(s.grandTotal) - salePaidP(s);
  return `<header class="top"><div class="top-row"><button class="back" data-act="back" aria-label="Close">${IC.close}</button><div class="grow"></div>${syncChip()}</div></header>
  <main class="saved">
    <div class="ok">K</div>
    <h2 style="margin:6px 0 2px">Bill saved</h2>
    <div class="bn">${esc(s.billNo)}</div>
    <div class="tot money">${money(s.grandTotal)}</div>
    <div class="hint" style="font-size:14px">${esc(s.customerName)} · ${esc(fmtPhone(s.customerPhone))}${dueP > 0 ? ` · <b style="color:var(--rose)">due ${moneyP(dueP)}</b>` : ''}</div>
    <div class="stack" style="margin-top:26px;text-align:left">
      <button class="btn wa big-share" data-act="wa" data-id="${esc(s.id)}">${IC.wa} Send on WhatsApp</button>
      ${canQr(s) ? `<button class="btn ghost" data-act="showQr" data-id="${esc(s.id)}">${IC.qr} Show UPI QR · ${moneyP(dueP)}</button>` : ''}
      <div class="grid2"><button class="btn ghost" data-act="openBill" data-id="${esc(s.id)}">View bill</button><button class="btn ghost" data-act="newBillFromSaved">${IC.plus} New bill</button></div>
    </div>
  </main>`;
};

/* ===== Bill detail ===== */
PAGES.bill = id => {
  const s = S.t.Sales.get(id); if (!s) return header('Bill', 'Not found');
  const live = s.status !== 'void';
  return header(s.billNo, `${fmtDate(s.billDate)} · ${fmtTime(s.billDate)} · ${esc(userName(s.userCode))}`) + `<main>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">${billTags(s) || '<span class="tag jade">Paid</span>'}
      ${s.sharedAt ? `<span class="tag">Sent by ${esc(s.sharedBy)} · ${fmtDate(s.sharedAt)} ${fmtTime(s.sharedAt)}</span>` : '<span class="tag brass">Not sent yet</span>'}</div>
    <div class="inv-wrap"><div class="inv-scale">${invoiceHTML(s)}</div></div>
    <div class="stack" style="margin-top:14px">
      ${live ? `<button class="btn wa big-share" data-act="wa" data-id="${esc(s.id)}">${IC.wa} ${s.sharedAt ? 'Send again on WhatsApp' : 'Send on WhatsApp'}</button>` : ''}
      ${canQr(s) ? `<button class="btn ghost" data-act="showQr" data-id="${esc(s.id)}">${IC.qr} Show UPI QR · ${moneyP(saleDueP(s))}</button>` : ''}
      <div class="grid2"><button class="btn ghost" data-act="pdf" data-id="${esc(s.id)}">${IC.download} PDF</button>
        <button class="btn ghost" data-act="openCust" data-id="${esc(s.customerId)}">${IC.users} Customer</button></div>
      ${live ? `<div class="grid2"><button class="btn ghost" data-act="editBill" data-id="${esc(s.id)}">${IC.edit} Edit</button>
        <button class="btn danger" data-act="voidBill" data-id="${esc(s.id)}">${IC.ban} Void</button></div>` : ''}
    </div>
  </main>`;
};
function fitInvoice(root) {
  const wrap = $('.inv-wrap', root), sc = $('.inv-scale', root); if (!wrap || !sc) return;
  requestAnimationFrame(() => {
    const k = Math.min(1, (wrap.clientWidth - 28) / 560);
    sc.style.transform = `scale(${k})`; sc.style.height = (sc.firstElementChild.offsetHeight * k) + 'px'; sc.style.width = 560 * k + 'px';
  });
}

/* ===== Customer ===== */
PAGES.customer = id => {
  const c = S.t.Customers.get(id); if (!c) return header('Customer', 'Not found');
  const st = customerStats(id);
  const pays = payList().filter(p => p.customerId === id).sort((a, b) => b.date.localeCompare(a.date));
  return header(c.name, esc(fmtPhone(c.phone))) + `<main>
    <div class="grid2">
      <a class="btn wa" href="https://wa.me/${esc(c.phone)}" target="_blank" rel="noopener">${IC.wa} Chat</a>
      <button class="btn brass" data-act="receive" data-id="${esc(id)}" ${st.dueP > 0 ? '' : 'disabled'}>Receive payment</button>
    </div>
    <div class="kpis" style="margin-top:12px;grid-template-columns:1fr 1fr 1fr">
      <div class="kpi"><div class="k">Spent</div><div class="v money" style="font-size:18px">${moneyP(st.spentP)}</div></div>
      <div class="kpi"><div class="k">Bills</div><div class="v" style="font-size:18px">${st.bills.length}</div></div>
      <div class="kpi"><div class="k">Due</div><div class="v money ${st.dueP > 0 ? 'rose' : ''}" style="font-size:18px">${moneyP(Math.max(0, st.dueP))}</div></div>
    </div>
    <div class="h2">Bills</div>
    <div class="list">${st.bills.map(s => `<button class="row" data-act="openBill" data-id="${esc(s.id)}">
      <span class="ucode ${esc(s.userCode)}">${esc(s.userCode)}</span>
      <span class="grow"><span class="t" style="display:block">${esc(saleItems(s).map(i => i.name + (i.size ? ' ' + i.size : '') + ' ×' + i.qty).join(', '))}</span>
        <span class="s" style="display:block">${esc(s.billNo)} · ${fmtDate(s.billDate)} · by ${esc(userName(s.userCode))}</span></span>
      <span style="text-align:right"><span class="amt money" style="display:block">${money(s.grandTotal)}</span>${billTags(s)}</span></button>`).join('') || '<div class="empty">No bills</div>'}</div>
    <div class="h2">Payments received</div>
    <div class="list">${pays.map(p => `<div class="row"><span class="grow"><span class="t" style="display:block">${esc(p.mode)} · ${p.kind === 'due' ? 'Due payment' : 'At bill ' + esc((S.t.Sales.get(p.saleId) || {}).billNo || '')}</span>
      <span class="s" style="display:block">${fmtDate(p.date)} ${fmtTime(p.date)} · received by ${esc(p.receivedBy)}</span></span><span class="amt money" style="color:var(--jade)">${money(p.amount)}</span></div>`).join('') || '<div class="empty">No payments yet</div>'}</div>
  </main>`;
};
function receiveSheet(cid) {
  const c = S.t.Customers.get(cid), due = customerDueP(cid);
  let mode = 'Cash';
  openSheet(`<h3>Receive payment</h3><p class="hint" style="margin-top:-8px">${esc(c.name)} · due <b style="color:var(--rose)">${moneyP(due)}</b></p>
    <div class="stack"><div class="prefix"><span>₹</span><input class="in big" id="rpAmt" inputmode="decimal" value="${R(due)}" autofocus aria-label="Amount"></div>
    <div class="seg" id="rpModes">${['Cash', 'UPI', 'Card', 'Bank Transfer'].map(m => `<button class="${m === mode ? 'on' : ''}" data-m="${m}">${m}</button>`).join('')}</div>
    <input class="in" id="rpNote" placeholder="Note (optional)">
    <button class="btn brass" id="rpSave">Save payment</button><div class="hint">Received by ${esc(S.me.name)}</div></div>`, sh => {
    $('#rpModes', sh).onclick = e => { const b = e.target.closest('button'); if (!b) return; mode = b.dataset.m; $$('#rpModes button', sh).forEach(x => x.classList.toggle('on', x === b)); };
    $('#rpSave', sh).onclick = async () => {
      try { await receivePayment(cid, $('#rpAmt', sh).value, mode, $('#rpNote', sh).value); closeTopSheet(); toast('Payment saved'); onDataChanged(); }
      catch (e) { toast(e.message); }
    };
  });
}

/* ===== Dues ===== */
PAGES.dues = () => {
  const d = duesList(), tot = d.reduce((a, x) => a + x.dueP, 0);
  return header('Pending dues', `${d.length} customers · ${moneyP(tot)}`) + `<main><div class="list">${d.map(x => `<button class="row" data-act="openCust" data-id="${esc(x.c.id)}">
    <span class="grow"><span class="t" style="display:block">${esc(x.c.name)}</span><span class="s" style="display:block">${esc(fmtPhone(x.c.phone))}</span></span>
    <span class="tag rose">${moneyP(x.dueP)}</span></button>`).join('') || '<div class="empty"><b>No pending dues</b>Everyone has paid in full.</div>'}</div></main>`;
};

/* ===== Reports ===== */
PAGES.reports = () => {
  const r0 = V.rep, range = rangeFor(r0.kind, r0.from, r0.to), r = report(range, r0.user);
  const K = [['today', 'Today'], ['week', 'This week'], ['month', 'This month'], ['custom', 'Custom']];
  const modeMax = Math.max(1, ...Object.values(r.modes));
  const bar = (label, v, max) => `<div class="b"><span>${esc(label)}</span><span class="track"><i style="width:${(v / max * 100).toFixed(1)}%"></i></span><b class="money">${moneyP(v)}</b></div>`;
  return header('Reports', `${fmtDate(range.from)} – ${fmtDate(range.to)}`) + `<main>
    <div class="seg">${K.map(([k, l]) => `<button class="${r0.kind === k ? 'on' : ''}" data-act="repKind" data-k="${k}">${l}</button>`).join('')}</div>
    ${r0.kind === 'custom' ? `<div class="grid2" style="margin-top:10px"><input class="in" type="date" value="${esc(r0.from)}" data-in="repFrom" aria-label="From"><input class="in" type="date" value="${esc(r0.to)}" data-in="repTo" aria-label="To"></div>` : ''}
    <div class="seg" style="margin-top:10px"><button class="${!r0.user ? 'on' : ''}" data-act="repUser" data-u="">All users</button>${users().map(u => `<button class="${r0.user === u.code ? 'on' : ''}" data-act="repUser" data-u="${u.code}">${esc(u.name)}</button>`).join('')}</div>
    <div class="kpis" style="margin-top:14px">
      <div class="kpi"><div class="k">Sales</div><div class="v money">${moneyP(r.total)}</div></div>
      <div class="kpi"><div class="k">Bills · average</div><div class="v">${r.count} <span style="font-size:14px;color:var(--muted)" class="money">· ${moneyP(r.avg)}</span></div></div>
      <div class="kpi" style="grid-column:1/-1"><div class="k">Profit</div>${r.count && r.costKnown ? `<div class="v money" style="color:${r.profit >= 0 ? 'var(--jade)' : 'var(--rose)'}">${moneyP(r.profit)}</div>` : `<div class="hint" style="margin:4px 0 0">Profit shows once items have a cost price in the Sheet’s Products tab.</div>`}</div>
    </div>
    <div class="h2">Money received by mode</div><div class="card bars">${Object.entries(r.modes).map(([m, v]) => bar(m, v, modeMax)).join('')}</div>
    <div class="h2">User-wise</div><div class="card scrollx"><table class="t"><thead><tr><th>User</th><th>Sales</th><th>Bills</th><th>Cash</th><th>UPI/Bank</th><th>Dues</th><th>Sent</th></tr></thead>
      <tbody>${r.perUser.map(u => `<tr><td><span class="dot" style="background:${ucolor(u.code)}"></span>${esc(u.name)}</td><td class="money">${moneyP(u.sales)}</td><td>${u.bills}</td><td class="money">${moneyP(u.cash)}</td><td class="money">${moneyP(u.bank)}</td><td class="money" style="color:var(--rose)">${moneyP(u.dues)}</td><td>${u.sent}/${u.bills}</td></tr>`).join('')}</tbody></table></div>
    <div class="h2">Top products</div><div class="list">${r.topProducts.map(p => `<div class="row"><span class="grow t">${esc(p.name)}</span><span class="s">×${p.qty}</span><span class="amt money">${moneyP(p.amt)}</span></div>`).join('') || '<div class="empty">No sales in this period</div>'}</div>
    <div class="h2">Top customers</div><div class="list">${r.topCustomers.map(c => `<div class="row"><span class="grow"><span class="t" style="display:block">${esc(c.name)}</span><span class="s">${c.bills} bill${c.bills === 1 ? '' : 's'}</span></span><span class="amt money">${moneyP(c.amt)}</span></div>`).join('') || '<div class="empty">No sales in this period</div>'}</div>
    <div class="h2">Pending dues <button class="link" data-act="page" data-p="dues">All</button></div><div class="list">${r.dues.slice(0, 5).map(d => `<button class="row" data-act="openCust" data-id="${esc(d.c.id)}"><span class="grow t">${esc(d.c.name)}</span><span class="tag rose">${moneyP(d.dueP)}</span></button>`).join('') || '<div class="empty">No pending dues</div>'}</div>
    <button class="btn ghost" style="margin-top:16px" data-act="csv">${IC.download} Export bills (CSV)</button>
  </main>`;
};

/* ===== Cash & bank ===== */
PAGES.cash = () => {
  const b = cashBook(), day = V.closeDay || todayKey(), dc = dayClose(day);
  const moves = [...[...S.t.Transfers.values()].map(t => ({ k: 'Transfers', r: t })), ...[...S.t.Expenses.values()].map(e => ({ k: 'Expenses', r: e }))]
    .filter(x => !x.r.deleted).sort((a, b2) => b2.r.date.localeCompare(a.r.date)).slice(0, 25);
  const T = { handover: 'Cash handover', deposit: 'Deposit to bank', withdraw: 'Withdraw from bank', opening_cash: 'Opening cash', opening_bank: 'Opening bank balance' };
  const desc = x => x.k === 'Expenses' ? `${esc(x.r.category)} · ${esc(x.r.mode)} · paid by ${esc(x.r.paidBy)}`
    : x.r.type === 'handover' ? `${esc(x.r.fromUser)} → ${esc(x.r.toUser)}` : x.r.type === 'deposit' ? `${esc(x.r.fromUser)} → bank` : x.r.type === 'withdraw' ? `bank → ${esc(x.r.toUser)}` : x.r.type === 'opening_cash' ? esc(x.r.toUser) : 'Bank';
  return header('Cash & bank', 'Live from every phone') + `<main>
    <div class="card" style="background:var(--oud);color:#f2e8d6">
      <div style="display:flex;justify-content:space-between;align-items:flex-end"><div><div class="sub" style="color:#bfae93;font-size:13px">Cash in hand</div><div class="serif money" style="font-size:40px;color:var(--brass-lt);line-height:1.1">${moneyP(b.totalCash)}</div></div>
        <div style="text-align:right"><div style="color:#bfae93;font-size:13px">Bank</div><div class="money" style="font-size:20px;font-weight:800">${moneyP(b.bank)}</div></div></div>
      <div style="margin-top:12px;border-top:1px solid #3d3026;padding-top:8px">${Object.entries(b.cash).map(([n, v]) => `<div style="display:flex;justify-content:space-between;padding:4px 0"><span>${esc(n)}</span><b class="money">${moneyP(v)}</b></div>`).join('')}</div>
    </div>
    <div class="grid2" style="margin-top:12px">
      <button class="btn ghost" data-act="exp">${IC.receipt} Expense</button><button class="btn ghost" data-act="tr" data-t="handover">Handover</button>
      <button class="btn ghost" data-act="tr" data-t="deposit">Deposit</button><button class="btn ghost" data-act="tr" data-t="withdraw">Withdraw</button>
    </div>
    <button class="btn ghost" style="margin-top:10px" data-act="tr" data-t="opening">Opening balance</button>
    <div class="h2">Day close <input type="date" class="in" style="width:auto;height:38px;margin-left:auto" value="${esc(day)}" data-in="closeDay" aria-label="Day"></div>
    <div class="card scrollx"><table class="t"><thead><tr><th>User</th><th>Cash in</th><th>UPI/Bank</th><th>Expenses</th><th>Handover ±</th><th>Deposited</th><th>Closing cash</th></tr></thead>
      <tbody>${dc.map(u => `<tr><td>${esc(u.name)}</td><td class="money">${moneyP(u.cashIn)}</td><td class="money">${moneyP(u.bankIn)}</td><td class="money">${moneyP(u.expenses)}</td><td class="money">${moneyP(u.handIn - u.handOut)}</td><td class="money">${moneyP(u.deposited)}</td><td class="money"><b>${moneyP(u.closing)}</b></td></tr>`).join('')}</tbody></table></div>
    <div class="h2">Recent movements</div>
    <div class="list">${moves.map(x => `<button class="row" data-act="move" data-k="${x.k}" data-id="${esc(x.r.id)}"><span class="grow"><span class="t" style="display:block">${x.k === 'Expenses' ? 'Expense' : T[x.r.type] || x.r.type} ${x.r.status === 'void' ? '<span class="tag void">Void</span>' : ''}</span>
      <span class="s" style="display:block">${desc(x)} · ${fmtDate(x.r.date)}</span></span><span class="amt money" style="color:${x.k === 'Expenses' ? 'var(--rose)' : 'var(--ink)'}">${money(x.r.amount)}</span></button>`).join('') || '<div class="empty">No movements yet</div>'}</div>
  </main>`;
};
function segPick(sh, id, cb) { const el = $('#' + id, sh); el.onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('button', el).forEach(x => x.classList.toggle('on', x === b)); cb(b.dataset.v); }; }
const segHTML = (id, opts, cur) => `<div class="seg" id="${id}">${opts.map(([v, l]) => `<button class="${v === cur ? 'on' : ''}" data-v="${esc(v)}">${esc(l)}</button>`).join('')}</div>`;
function expenseSheet() {
  const st = { category: EXP_CATS[0], mode: 'Cash', paidBy: S.me.name };
  openSheet(`<h3>Add expense</h3><div class="stack">
    <div class="prefix"><span>₹</span><input class="in big" id="exAmt" inputmode="decimal" placeholder="0" autofocus aria-label="Amount"></div>
    <label class="f">Category</label>${segHTML('exCat', EXP_CATS.map(c => [c, c]), st.category)}
    <label class="f">Paid from</label>${segHTML('exMode', [['Cash', 'Cash'], ['Bank', 'Bank / UPI']], st.mode)}
    <label class="f">Paid by</label>${segHTML('exBy', users().map(u => [u.name, u.name]), st.paidBy)}
    <input class="in" type="date" id="exDate" value="${todayKey()}" aria-label="Date">
    <input class="in" id="exNote" placeholder="Note (optional)">
    <button class="btn brass" id="exSave">Save expense</button></div>`, sh => {
    segPick(sh, 'exCat', v => st.category = v); segPick(sh, 'exMode', v => st.mode = v); segPick(sh, 'exBy', v => st.paidBy = v);
    $('#exSave', sh).onclick = async () => {
      try { await addExpense({ ...st, amount: $('#exAmt', sh).value, note: $('#exNote', sh).value, date: dateISO($('#exDate', sh).value) }); closeTopSheet(); toast('Expense saved'); onDataChanged(); }
      catch (e) { toast(e.message); }
    };
  });
}
function dateISO(day) { if (!day || day === todayKey()) return nowISO(); return new Date(day + 'T12:00:00').toISOString(); }
function transferSheet(kind) {
  const names = users().map(u => [u.name, u.name]);
  const st = { type: kind === 'opening' ? 'opening_cash' : kind, fromUser: S.me.name, toUser: (users().find(u => u.name !== S.me.name) || {}).name || S.me.name };
  if (kind === 'withdraw') st.toUser = S.me.name;
  const title = { handover: 'Cash handover', deposit: 'Deposit cash to bank', withdraw: 'Withdraw cash from bank', opening: 'Opening balance' }[kind];
  openSheet(`<h3>${title}</h3><div class="stack">
    ${kind === 'opening' ? `${segHTML('trType', [['opening_cash', 'Cash with a person'], ['opening_bank', 'Bank balance']], st.type)}` : ''}
    <div class="prefix"><span>₹</span><input class="in big" id="trAmt" inputmode="decimal" placeholder="0" autofocus aria-label="Amount"></div>
    ${kind === 'handover' || kind === 'deposit' ? `<label class="f">${kind === 'handover' ? 'From' : 'Cash given by'}</label>${segHTML('trFrom', names, st.fromUser)}` : ''}
    ${kind === 'handover' || kind === 'withdraw' || kind === 'opening' ? `<div id="trToBox"><label class="f">${kind === 'handover' ? 'To' : kind === 'withdraw' ? 'Cash taken by' : 'Person'}</label>${segHTML('trTo', names, kind === 'opening' ? S.me.name : st.toUser)}</div>` : ''}
    <input class="in" id="trNote" placeholder="Note (optional)">
    <button class="btn brass" id="trSave">Save</button></div>`, sh => {
    if (kind === 'opening') { st.toUser = S.me.name; segPick(sh, 'trType', v => { st.type = v; $('#trToBox', sh).classList.toggle('hide', v === 'opening_bank'); }); }
    if ($('#trFrom', sh)) segPick(sh, 'trFrom', v => st.fromUser = v);
    if ($('#trTo', sh)) segPick(sh, 'trTo', v => st.toUser = v);
    $('#trSave', sh).onclick = async () => {
      const t = { ...st, amount: $('#trAmt', sh).value, note: $('#trNote', sh).value };
      if (t.type === 'deposit') t.toUser = ''; if (t.type === 'withdraw' || t.type.startsWith('opening')) t.fromUser = ''; if (t.type === 'opening_bank') t.toUser = '';
      try { await addTransfer(t); closeTopSheet(); toast('Saved'); onDataChanged(); } catch (e) { toast(e.message); }
    };
  });
}
function moveSheet(table, id) {
  const r = S.t[table].get(id); if (!r) return;
  openSheet(`<h3>${table === 'Expenses' ? esc(r.category) : 'Cash movement'}</h3>
    <div class="card" style="box-shadow:none;background:var(--pearl)"><div style="font:600 30px var(--serif)" class="money">${money(r.amount)}</div>
    <div class="hint">${fmtDate(r.date)} · added by ${esc(r.createdBy)}${r.note ? ' · ' + esc(r.note) : ''}</div></div>
    ${r.status !== 'void' ? `<button class="btn danger" style="margin-top:14px" id="mvVoid">${IC.ban} Void this entry</button>` : '<p class="hint">This entry is void.</p>'}`, sh => {
    const b = $('#mvVoid', sh); if (b) b.onclick = () => askReasonPin('Void this entry', 'Why?', async reason => { await voidRow(table, id, reason); closeTopSheet(); toast('Entry voided'); onDataChanged(); });
  });
}

/* ===== Expenses ===== */
PAGES.expenses = () => {
  const list = [...S.t.Expenses.values()].filter(e => !e.deleted).sort((a, b) => b.date.localeCompare(a.date));
  const mk = todayKey().slice(0, 7), monthP = list.filter(e => e.status !== 'void' && dayKey(e.date).startsWith(mk)).reduce((a, e) => a + P(e.amount), 0);
  return header('Expenses', 'This month ' + moneyP(monthP)) + `<main>
    <button class="btn brass" data-act="exp">${IC.plus} Add expense</button>
    <div class="list" style="margin-top:14px">${list.slice(0, 200).map(e => `<button class="row" data-act="move" data-k="Expenses" data-id="${esc(e.id)}">
      <span class="grow"><span class="t" style="display:block">${esc(e.category)} ${e.status === 'void' ? '<span class="tag void">Void</span>' : ''}</span>
      <span class="s" style="display:block">${fmtDate(e.date)} · ${esc(e.mode)} · ${esc(e.paidBy)}${e.note ? ' · ' + esc(e.note) : ''}</span></span>
      <span class="amt money">${money(e.amount)}</span></button>`).join('') || '<div class="empty"><b>No expenses yet</b>Rent, bottles, delivery — add them here.</div>'}</div></main>`;
};

/* ===== Products (read-only, from the Sheet) ===== */
PAGES.products = () => {
  const g = new Map(); S.masters.Products.forEach(p => { if (!g.has(p.name)) g.set(p.name, []); g.get(p.name).push(p); });
  return header('Products', S.masters.Products.length + ' rows in the Sheet') + `<main>
    <p class="hint" style="margin-top:0">Optional. Items are typed on each bill. For a fixed price list, add rows in the Google Sheet’s Products tab, then tap Sync.</p>
    <button class="btn ghost sm" data-act="syncTap">${IC.sync} Sync now</button>
    <div class="list" style="margin-top:12px">${[...g].map(([n, arr]) => `<div class="row"><span class="grow"><span class="t" style="display:block">${esc(n)} ${arr.some(p => !p.active) ? '<span class="tag">Some sizes hidden</span>' : ''}</span>
      <span class="s" style="display:block">${arr.map(p => `${esc(p.size || '—')} ${money(p.price)}${p.costPrice != null ? ' (cost ' + money(p.costPrice) + ')' : ''}`).join(' · ')}</span></span>
      ${arr[0].type ? `<span class="tag">${esc(arr[0].type)}</span>` : ''}</div>`).join('') || '<div class="empty"><b>No fixed price list</b>Items are typed on each bill. For a price list, add name, size, type and price in the Sheet’s Products tab.</div>'}</div></main>`;
};

/* ===== Activity log ===== */
PAGES.audit = () => {
  const list = [...S.t.AuditLog.values()].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 200);
  const label = a => { const s = a.tableName === 'Sales' && S.t.Sales.get(a.recordId); return s ? s.billNo : a.tableName; };
  return header('Activity log', 'Who changed what') + `<main><div class="list">${list.map(a => `<button class="row" data-act="auditOpen" data-id="${esc(a.id)}">
    <span class="tag ${a.action === 'void' ? 'rose' : a.action === 'conflict' ? 'brass' : ''}">${esc(a.action)}</span>
    <span class="grow"><span class="t" style="display:block">${esc(label(a))} · ${esc(a.user)}</span><span class="s" style="display:block">${fmtDate(a.at)} ${fmtTime(a.at)}${a.reason ? ' · ' + esc(a.reason) : ''}</span></span></button>`).join('')
    || '<div class="empty"><b>Nothing yet</b>Bill edits, voids and sync conflicts are recorded here.</div>'}</div></main>`;
};
function auditSheet(id) {
  const a = S.t.AuditLog.get(id); if (!a) return;
  const sum = j => { try { const o = JSON.parse(j || '{}'); return o.billNo ? `${o.billNo} · ${o.customerName} · total ${money(o.grandTotal)} · paid ${money(o.paidAtBill)} · ${o.status}${o.updatedBy ? ' · edited by ' + o.updatedBy : ''}`
    : o.amount != null ? `${money(o.amount)} · ${o.status || ''}` : ''; } catch (e) { return ''; } };
  openSheet(`<h3 style="text-transform:capitalize">${esc(a.action)}</h3><div class="stack">
    <div class="hint" style="margin-top:-8px">${fmtDate(a.at)} ${fmtTime(a.at)} · ${esc(a.user)}</div>
    ${a.reason ? `<div class="card" style="box-shadow:none;background:var(--pearl)">${esc(a.reason)}</div>` : ''}
    <div><label class="f">Before</label><div class="card" style="box-shadow:none;background:var(--pearl);font-size:13.5px">${esc(sum(a.beforeJson)) || '—'}</div></div>
    <div><label class="f">After</label><div class="card" style="box-shadow:none;background:var(--pearl);font-size:13.5px">${esc(sum(a.afterJson)) || '—'}</div></div></div>`);
}

/* ===== Settings ===== */
PAGES.settings = () => {
  const mask = v => v ? v.slice(0, 34) + (v.length > 34 ? '…' : '') : 'Not set';
  return header('Settings', 'Khalifa Business Manager v' + APP_VERSION) + `<main>
    <div class="card"><div style="display:flex;gap:12px;align-items:center"><div class="avatar" style="background:var(--oud);border:0">${esc(S.me.code)}</div>
      <div class="grow"><b style="font-size:17px">${esc(S.me.name)}</b><div class="hint" style="margin:0">Bills numbered KH-${esc(S.me.code)}-0001…</div></div></div>
      <div class="grid2" style="margin-top:14px"><button class="btn ghost sm" data-act="changePin">Change PIN</button><button class="btn ghost sm" data-act="switchUser">Switch user</button></div></div>
    <div class="h2">Google Sheet</div>
    <div class="card stack"><div><label class="f">Apps Script URL</label><div style="word-break:break-all;font-size:13.5px">${esc(mask(S.url))}</div></div>
      <div><label class="f">Secret key</label><div style="font-size:13.5px">${S.key ? '•'.repeat(Math.min(12, S.key.length)) : 'Not set'}</div></div>
      <div class="grid2"><button class="btn ghost sm" data-act="editConn">Change</button><button class="btn ghost sm" data-act="testConn">Test connection</button></div></div>
    <div class="h2">Sync</div>
    <div class="card stack"><div style="display:flex;justify-content:space-between"><span>Status</span>${syncChip()}</div>
      ${S.sync.state === 'err' ? `<div class="err">${esc(S.sync.msg)}</div>` : ''}
      <div style="display:flex;justify-content:space-between"><span>Waiting to upload</span><b>${S.outbox.size}</b></div>
      <div style="display:flex;justify-content:space-between"><span>Last synced</span><b>${S.lastSync ? fmtDate(new Date(S.lastSync).toISOString()) + ' ' + fmtTime(new Date(S.lastSync).toISOString()) : 'Never'}</b></div>
      <div class="grid2"><button class="btn brass sm" data-act="syncTap">${IC.sync} Sync now</button><button class="btn ghost sm" data-act="resync">Download all again</button></div></div>
    <div class="h2">Backup</div>
    <div class="card stack"><p class="hint" style="margin:0">Everything is already saved in the Google Sheet. This file is an extra copy on this phone — keep it private, it contains customer numbers.</p>
      <button class="btn ghost sm" data-act="backup">${IC.download} Download backup (JSON)</button></div>
  </main>`;
};

/* ---------------- PIN pad, reason + PIN, lock ---------------- */
function padHTML(id, light) { return `<div class="dots" id="${id}Dots">${'<i></i>'.repeat(4)}</div><div class="pad ${light ? 'light' : ''}" id="${id}">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map(k => k === '' ? '<span></span>' : `<button data-k="${k}" aria-label="${k === '⌫' ? 'Delete' : k}">${k}</button>`).join('')}</div>`; }
function bindPad(root, id, onDone) {
  let val = ''; const dots = $('#' + id + 'Dots', root);
  const show = () => $$('i', dots).forEach((d, i) => d.classList.toggle('on', i < val.length));
  const api2 = { reset() { val = ''; show(); }, shake() { dots.classList.remove('shake'); void dots.offsetWidth; dots.classList.add('shake'); val = ''; show(); } };
  const press = k => { if (k === '⌫') val = val.slice(0, -1); else if (val.length < 4) val += k; show(); if (val.length === 4) { const v = val; setTimeout(() => onDone(v, api2), 80); } };
  $('#' + id, root).onclick = e => { const b = e.target.closest('button'); if (b) press(b.dataset.k); };
  PADS[id] = press;
  return api2;
}
document.addEventListener('keydown', e => {
  const pad = $('.pad'); if (!pad || !/^[0-9]$|^Backspace$/.test(e.key) || (document.activeElement && /INPUT|TEXTAREA/.test(document.activeElement.tagName))) return;
  const press = PADS[pad.id]; if (press) press(e.key === 'Backspace' ? '⌫' : e.key);
});
function askReasonPin(title, reasonLabel, cb) {
  openSheet(`<h3>${esc(title)}</h3><div class="stack">
    ${reasonLabel ? `<textarea class="in" id="rsn" placeholder="${esc(reasonLabel)}" autofocus aria-label="Reason"></textarea>` : ''}
    <label class="f" style="text-align:center">Enter your PIN</label></div>
    <div style="display:flex;flex-direction:column;align-items:center">${padHTML('rpPad', true)}</div><div class="err" id="rpErr" style="text-align:center"></div>`, sh => {
    bindPad(sh, 'rpPad', async (pin, pad) => {
      const reason = reasonLabel ? $('#rsn', sh).value.trim() : '';
      if (reasonLabel && reason.length < 3) { $('#rpErr', sh).textContent = 'Write a short reason first'; pad.shake(); return; }
      if (!(await checkPin(pin))) { $('#rpErr', sh).textContent = 'Wrong PIN'; pad.shake(); return; }
      cb(reason);
    });
  });
}
function lockView() {
  return `<div class="lock"><img src="icons/logo.png" alt="Khalifa Attar & Perfumes" style="width:140px;margin-bottom:10px">
    <div style="color:#bfae93">Enter PIN, ${esc(S.me.name)}</div>${padHTML('lockPad')}
    <p class="hint" style="color:#8f7e69;text-align:center;max-width:280px;margin-top:26px">Forgot the PIN? Clear this app’s data and set it up again — your records are safe in the Google Sheet.</p></div>`;
}
function afterLockRender() {
  bindPad(document, 'lockPad', async (pin, pad) => { if (await checkPin(pin)) { V.locked = false; render(); scheduleSync(200); } else pad.shake(); });
}

/* ---------------- first-time setup ---------------- */
function setupView() {
  const st = V.setup, step = st.step;
  const bars = ['connect', 'who', 'pin', 'pin2'].map((s, i, a) => `<i class="${a.indexOf(step) >= i || step === 'done' ? 'on' : ''}"></i>`).join('');
  if (step === 'connect') return `<div class="setup"><img class="logo" src="icons/logo.png" alt="Khalifa Attar & Perfumes">
    <div class="steps">${bars}</div>
    <h1>Business Manager</h1><p>Bills, customers and cash for the shop — one Google Sheet, every phone in sync.</p>
    <div class="panel stack">
      <div><label class="f" for="suUrl">Apps Script Web App URL</label><input class="in" id="suUrl" placeholder="https://script.google.com/macros/s/…/exec" value="${esc(st.url || S.url)}" autocomplete="off"></div>
      <div><label class="f" for="suKey">Secret key</label><input class="in" id="suKey" type="password" placeholder="The key saved in the Apps Script" value="${esc(st.key || S.key)}" autocomplete="off"></div>
      <button class="btn brass" data-act="suConnect">Connect to the Sheet</button>
      <div class="err" id="suErr">${esc(st.err || '')}</div>
      <p class="hint">Internet is needed once, now. After this the app also works offline.</p></div></div>`;
  if (step === 'who') return `<div class="setup"><div class="steps">${bars}</div><h1>Who is using this phone?</h1><p>Your bills will be numbered with your letter.</p>
    <div class="panel"><div class="who">${(st.users || users()).map(u => `<button class="${st.code === u.code ? 'on' : ''}" data-act="suWho" data-code="${esc(u.code)}" data-name="${esc(u.name)}">
      <span class="ucode ${esc(u.code)}" style="width:40px;height:40px;font-size:16px">${esc(u.code)}</span><span class="grow">${esc(u.name)}<div class="hint" style="margin:0;font-weight:500">Bills KH-${esc(u.code)}-0001</div></span></button>`).join('')}</div>
      <button class="btn brass" style="margin-top:14px" data-act="suWhoNext" ${st.code ? '' : 'disabled'}>Continue</button></div></div>`;
  if (step === 'pin' || step === 'pin2') return `<div class="setup" style="display:flex;flex-direction:column;align-items:center"><div class="steps" style="width:100%">${bars}</div>
    <h1 style="text-align:center">${step === 'pin' ? 'Set your 4-digit PIN' : 'Enter it once more'}</h1><p style="text-align:center">${esc(st.name)} · needed to open the app and to edit or void bills.</p>${padHTML('suPad')}<div class="err" id="suErr" style="color:#f0a3b4">${esc(st.err || '')}</div></div>`;
  return `<div class="setup"><h1>Getting your data…</h1><p id="suMsg">${esc(st.msg || 'Downloading bills and customers from the Sheet')}</p><div class="err" id="suErr">${esc(st.err || '')}</div>
    ${st.err ? '<button class="btn brass" data-act="suRetry">Try again</button>' : ''}</div>`;
}
function afterSetupRender() {
  const st = V.setup; if (!st) return;
  if (st.step === 'pin') bindPad(document, 'suPad', pin => { st.pin = pin; st.err = ''; st.step = 'pin2'; render(); afterRender(); });
  if (st.step === 'pin2') bindPad(document, 'suPad', async (pin, pad) => {
    if (pin !== st.pin) { st.err = 'PINs did not match — try again'; st.step = 'pin'; render(); afterRender(); return; }
    const salt = Math.random().toString(36).slice(2) + Date.now().toString(36);
    S.me = { code: st.code, name: st.name, salt, pinHash: await hashPin(pin, salt) };
    S.url = st.url; S.key = st.key;
    await saveMeta('profile', S.me); await saveMeta('conn', { url: S.url, key: S.key });
    st.step = 'done'; render(); firstPull();
  });
}
async function firstPull() {
  const st = V.setup;
  try {
    if (!navigator.onLine) throw new Error('No internet');
    await syncNow();
    if (S.sync.state === 'err' || S.sync.state === 'offline') throw new Error(S.sync.msg || 'Could not sync');
    V.setup = null; V.tab = 'home'; render(); afterRender(); toast('Welcome, ' + S.me.name);
  } catch (e) { st.err = e.message + ' — check internet and try again.'; render(); }
}

/* ---------------- WhatsApp: open chat first, then share PDF + caption ---------------- */
function openWaChat(phone) { const a = document.createElement('a'); a.href = 'https://wa.me/' + phone; a.target = '_blank'; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove(); }
/* STEP 0 — before sending: is the bill paid? Paid → no QR. Unpaid → UPI QR for the due amount goes in the PDF. */
function sendSheet(id) {
  const s = S.t.Sales.get(id); if (!s) return;
  const dueP = saleDueP(s), qrOk = canQr(s);
  let choice = dueP > 0 ? 'unpaid' : 'paid', mode = 'Cash';
  const html = `<h3>Send bill on WhatsApp</h3>
    <p class="hint" style="margin-top:-8px">${esc(s.billNo)} · ${esc(s.customerName)} · total <b class="money">${money(s.grandTotal)}</b></p>
    <div class="h2" style="margin-top:4px">Is this bill paid?</div>
    <div class="paychoice" id="scChoice">
      <button data-v="paid"><b>Paid</b><span>${dueP > 0 ? 'Customer has paid now' : 'Paid in full · ' + esc(salePayModes(s))}</span><i>No QR in the bill</i></button>
      <button data-v="unpaid"><b>Unpaid</b><span>${dueP > 0 ? 'Due ' + moneyP(dueP) : 'Nothing is due'}</span><i>UPI QR goes with the bill</i></button>
    </div>
    <div id="scMore"></div>
    <button class="btn wa big-share" id="scGo" style="margin-top:14px"></button>
    <button class="btn ghost sm hide" id="scPlain" style="margin:10px auto 0;display:block">Send without QR (keep it due)</button>`;
  openSheet(html, sh => {
    const draw = () => {
      $$('#scChoice button', sh).forEach(b => b.classList.toggle('on', b.dataset.v === choice));
      const more = $('#scMore', sh), go = $('#scGo', sh), plain = $('#scPlain', sh);
      go.disabled = false; plain.classList.add('hide');
      if (choice === 'paid' && dueP > 0) {
        more.innerHTML = `<div class="mini" style="margin-top:12px"><label>${moneyP(dueP)} received by</label></div>${segHTML('scMode', ['Cash', 'UPI', 'Card', 'Bank Transfer'].map(m => [m, m]), mode)}
          <div class="hint">This payment is saved to the bill (received by ${esc(S.me.name)}).</div>`;
        segPick(sh, 'scMode', v => { mode = v; });
        go.innerHTML = `${IC.wa} Save payment & send`;
      } else if (choice === 'paid') {
        more.innerHTML = ''; go.innerHTML = `${IC.wa} Send bill`;
      } else if (dueP > 0 && qrOk) {
        more.innerHTML = `<div class="qrnote"><img src="${qrDataURL(upiLink(s, dueP), 4)}" alt=""><div>A UPI QR for <b class="money">${moneyP(dueP)}</b> is added to the PDF.<br><span>Pays to ${esc(upiId())}</span></div></div>`;
        go.innerHTML = `${IC.wa} Send with UPI QR`; plain.classList.remove('hide');
      } else if (dueP > 0) {
        more.innerHTML = `<div class="err" style="margin-top:10px">No valid UPI ID — add <b>upiId</b> in the Sheet’s Settings tab, then Sync.</div>`;
        go.innerHTML = `${IC.wa} Send without QR`;
      } else {
        more.innerHTML = `<div class="hint" style="margin-top:10px">This bill is saved as <b>paid in full</b>. To ask for payment, edit the bill and set Payment to <b>Credit</b> (or lower “Paid now”), then send it.</div>
          <button class="btn ghost sm" id="scEdit" style="margin-top:8px">${IC.edit} Edit bill</button>`;
        $('#scEdit', sh).onclick = () => { goBack(); openEditBill(id); };
        go.innerHTML = 'Nothing due'; go.disabled = true;
      }
    };
    $('#scChoice', sh).onclick = e => { const b = e.target.closest('button'); if (!b) return; choice = b.dataset.v; draw(); };
    $('#scGo', sh).onclick = () => {
      if (choice === 'paid') startWhatsApp(id, dueP > 0 ? { payMode: mode } : {});
      else startWhatsApp(id, { qr: dueP > 0 && qrOk });
    };
    $('#scPlain', sh).onclick = () => startWhatsApp(id, {});
    draw();
  });
}
async function startWhatsApp(id, opts = {}) {
  let s = S.t.Sales.get(id); if (!s) return;
  openWaChat(s.customerPhone);                                   // STEP 1 — must happen inside the tap
  const w = WA = { id, name: s.customerName, caption: '', file: null, err: '', qr: false, dueP: 0 };
  waSheet();
  try {
    if (opts.payMode) { await receiveBillPayment(id, opts.payMode); s = S.t.Sales.get(id); toast('Payment saved'); }
    w.qr = !!opts.qr && canQr(s); w.dueP = saleDueP(s);
    w.caption = buildCaption(s, { qr: w.qr });
    const blob = await makePdf(s, { qr: w.qr }); w.file = new File([blob], pdfName(s), { type: 'application/pdf' }); w.size = blob.size;
  } catch (e) { w.err = 'Could not make the PDF: ' + e.message; }
  if (WA === w && $('#waBox')) waSheet(true);
}
function qrSheet(id) {
  const s = S.t.Sales.get(id); if (!canQr(s)) { toast('Nothing is due on this bill'); return; }
  const dueP = saleDueP(s); let mode = 'UPI';
  openSheet(`<div style="text-align:center"><h3 style="margin-bottom:2px">Scan to pay <span class="money">${moneyP(dueP)}</span></h3>
      <p class="hint" style="margin-top:0">${esc(s.billNo)} · ${esc(s.customerName)}</p>
      <div class="qrbig"><img src="${qrDataURL(upiLink(s, dueP), 10)}" alt="UPI QR code for ${esc(moneyP(dueP))}"></div>
      <div class="hint">UPI ID: <b>${esc(upiId())}</b><br>GPay · PhonePe · Paytm · any UPI app</div></div>
    <div class="mini" style="margin-top:14px"><label>Once the money arrives, received by</label></div>
    ${segHTML('qrMode', ['UPI', 'Cash', 'Card', 'Bank Transfer'].map(m => [m, m]), mode)}
    <button class="btn brass" id="qrPaid" style="margin-top:12px">Mark ${moneyP(dueP)} as received</button>`, sh => {
    segPick(sh, 'qrMode', v => { mode = v; });
    $('#qrPaid', sh).onclick = async () => {
      try { await receiveBillPayment(id, mode); closeTopSheet(); toast('Payment saved'); onDataChanged(); } catch (e) { toast(e.message); }
    };
  });
}
function waCanShareFiles() { try { return !!(WA && WA.file && navigator.canShare && navigator.canShare({ files: [WA.file] })); } catch (e) { return false; } }
function waSheet(update) {
  if (!WA) return;
  const ready = !!WA.file, can = ready && waCanShareFiles(), ios = isIOS();
  const html = `<div class="wa-step" id="waBox"><div class="num">2</div><h3>Send PDF + Message 📎</h3>
    <p class="hint" style="margin-top:0">${esc(WA.name)}’s WhatsApp chat is open. Now send the bill.</p>
    ${WA.qr ? `<div class="found" style="margin-bottom:10px">UPI QR for <b class="money">${moneyP(WA.dueP)}</b> is in the PDF</div>` : ''}
    ${WA.err ? `<div class="err">${esc(WA.err)}</div>` : ''}
    ${can || !ready ? `<button class="btn wa big-share" id="waShare" ${ready ? '' : 'disabled'}>${ready ? IC.wa + ' Send PDF + Message 📎' : 'Preparing PDF…'}</button>
      <div class="help">Choose <b>WhatsApp</b> → pick <b>${esc(WA.name)}</b> at the top of the chat list → Send.
      ${ios ? '<br><br>The message is copied — in the caption box, <b>long-press → Paste</b>.' : '<br><br>If the message doesn’t come with the PDF: <b>long-press → Paste</b> in the caption box (it is already copied).'}</div>`
    : `<button class="btn wa big-share" id="waFallback">${IC.download} Save PDF + copy message</button>
      <div class="help" id="waFbHelp">This phone can’t share files directly. The PDF will be saved and the message copied — in the customer’s chat, <b>attach the PDF and paste the message</b>.</div>`}
    <div class="grid2"><button class="btn ghost sm" id="waAgain">Open chat again</button><button class="btn ghost sm" id="waDone">${can ? 'Close' : 'Mark as sent ✓'}</button></div></div>`;
  const mount = sh => {
    const share = $('#waShare', sh);
    if (share) share.onclick = () => {
      const caption = WA.caption, file = WA.file, id = WA.id;
      try { navigator.clipboard && navigator.clipboard.writeText(caption).catch(() => {}); } catch (e) { /* ignore */ }
      // share() is called in the same tap (Safari needs that), files + caption together
      navigator.share({ files: [file], text: caption, title: file.name }).then(async () => {
        await markShared(id); WA = null; closeTopSheet(); toast('Bill sent ✓'); onDataChanged();
      }).catch(e => { if (e && e.name !== 'AbortError') toast('Share failed: ' + e.message); });
    };
    const fb = $('#waFallback', sh);
    if (fb) fb.onclick = () => {
      const url = URL.createObjectURL(WA.file); const a = document.createElement('a'); a.href = url; a.download = WA.file.name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      try { navigator.clipboard.writeText(WA.caption); } catch (e) { /* ignore */ }
      $('#waFbHelp', sh).innerHTML = '<b>PDF saved and message copied</b> — attach and paste in the customer’s chat, then tap “Mark as sent”.';
    };
    $('#waAgain', sh).onclick = () => WA && openWaChat(S.t.Sales.get(WA.id).customerPhone);
    $('#waDone', sh).onclick = async () => { const id = WA && WA.id; const mark = !can; WA = null; closeTopSheet(); if (mark && id) { await markShared(id); toast('Marked as sent ✓'); onDataChanged(); } };
  };
  const cur = $('#waBox');
  if (update && cur) { const sh = cur.closest('.sheet'); sh.innerHTML = '<div class="grab"></div>' + html; mount(sh); }
  else if (!cur) { const sh = openSheet(html, mount); V.stack[V.stack.length - 1].onClose = () => { WA = null; setTimeout(refreshTop, 0); }; return sh; }
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') { V.hiddenAt = Date.now(); return; }
  if (WA && !$('#waBox')) waSheet();                               // STEP 2 pops up when they come back
  if (S.me && !WA && V.hiddenAt && Date.now() - V.hiddenAt > 10 * 60 * 1000 && !V.setup) { V.locked = true; closeSheetDom(); render(); afterRender(); }
  if (S.me) scheduleSync(300);
});
async function downloadPdf(id) {
  const s = S.t.Sales.get(id); toast('Making PDF…');
  const blob = await makePdf(s, { qr: true });               // a bill with money due carries the UPI QR
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = pdfName(s); document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
function downloadText(name, text, type) {
  const url = URL.createObjectURL(new Blob([text], { type })); const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

/* ---------------- events ---------------- */
const ACT = {
  back: () => goBack(),
  tab: el => { V.tab = el.dataset.tab; renderBase(); window.scrollTo(0, 0); },
  page: el => openPage(el.dataset.p),
  newBill: () => openNewBill(),
  newBillFromSaved: () => { NB = newNB(); replacePage('newbill'); },
  openBill: el => { const top = V.stack[V.stack.length - 1]; if (top && top.name === 'saved') replacePage('bill', el.dataset.id); else openPage('bill', el.dataset.id); },
  openCust: el => openPage('customer', el.dataset.id),
  billsF: el => { V.billsF = el.dataset.f; renderBase(); },
  syncTap: () => { if (!navigator.onLine) toast('Offline — bills are saved on this phone and will upload when online'); else { toast('Syncing…'); syncNow().then(() => { if (S.sync.state === 'err') toast(S.sync.msg); }); } },
  wa: el => sendSheet(el.dataset.id),
  showQr: el => qrSheet(el.dataset.id),
  pdf: el => downloadPdf(el.dataset.id).catch(e => toast(e.message)),
  editBill: el => { const id = el.dataset.id; goBack(); openEditBill(id); },
  voidBill: el => askReasonPin('Void this bill', 'Why is it being voided?', async reason => { await voidBill(el.dataset.id, reason); closeTopSheet(); toast('Bill voided'); onDataChanged(); }),
  receive: el => receiveSheet(el.dataset.id),
  exp: () => expenseSheet(),
  tr: el => transferSheet(el.dataset.t),
  move: el => moveSheet(el.dataset.k, el.dataset.id),
  auditOpen: el => auditSheet(el.dataset.id),
  repKind: el => { V.rep.kind = el.dataset.k; if (el.dataset.k === 'custom' && !V.rep.from) { V.rep.from = todayKey().slice(0, 8) + '01'; V.rep.to = todayKey(); } refreshTop(); },
  repUser: el => { V.rep.user = el.dataset.u; refreshTop(); },
  csv: () => { const r = report(rangeFor(V.rep.kind, V.rep.from, V.rep.to), V.rep.user); downloadText(`khalifa-bills-${todayKey()}.csv`, billsCSV(r.sales), 'text/csv;charset=utf-8'); },
  lockNow: () => { V.locked = true; render(); afterRender(); },
  // new bill
  itCat: el => { NB.it = Object.assign(newIt(el.dataset.c), { name: NB.it.name, price: NB.it.price, qty: NB.it.qty }); renderComposer(false); },
  itSize: el => { NB.it.size = el.dataset.z; $$('.sizes-seg button').forEach(b => b.classList.toggle('on', b === el)); const o = $('#itOther'); if (o) o.value = ''; },
  itQty: el => { NB.it.qty = Math.max(1, NB.it.qty + Number(el.dataset.d)); $('#itQty').textContent = NB.it.qty; },
  itPick: el => { const x = NB.sugs[+el.dataset.i]; if (!x) return; Object.assign(NB.it, { name: x.name, size: x.size, price: x.price }); renderComposer(false); const pr = $('#itPrice'); if (pr) pr.focus(); },
  itAdd: () => itAdd(),
  nbDel: el => { NB.lines.splice(+el.dataset.i, 1); $('#nbLines').innerHTML = nbLinesHTML(); nbUpdate(); },
  nbQty: el => { const l = NB.lines[+el.dataset.i]; l.qty = Math.max(1, (Number(l.qty) || 1) + Number(el.dataset.d)); nbUpdate(); },
  nbMode: el => { NB.mode = el.dataset.m; $$('#nbModes button').forEach(b => b.classList.toggle('on', b === el)); const pi = $('#nbPaid');
    if (NB.mode === 'Credit') { NB.paid = 0; pi.value = 0; pi.disabled = true; } else { pi.disabled = false; if (!P(NB.paid)) { NB.paidTouched = false; } } nbUpdate(); },
  nbGst: el => { NB.gstPercent = Number(el.dataset.g); $$('[data-act="nbGst"]').forEach(b => b.classList.toggle('on', b === el)); nbUpdate(); },
  nbSave: () => nbSave(),
  slipToggle: () => $('#slip').classList.toggle('open'),
  // settings
  changePin: () => askReasonPin('Current PIN', '', () => newPinSheet()),
  switchUser: () => askReasonPin('Switch user', '', async () => {
    closeTopSheet(); while (V.stack.length) goBack();
    V.setup = { step: 'who', url: S.url, key: S.key, users: users() }; await saveMeta('profile', null); S.me = null; render(); afterRender();
  }),
  editConn: () => askReasonPin('Change Sheet connection', '', () => connSheet()),
  testConn: async () => { try { await api('ping'); toast('Connected to the Sheet ✓'); } catch (e) { toast(e.message); } },
  resync: async () => { S.cursor = 0; await saveMeta('cursor', 0); toast('Downloading everything again…'); await syncNow(); toast(S.sync.state === 'err' ? S.sync.msg : 'Done'); },
  backup: () => {
    const data = { app: 'khalifa-business-manager', version: APP_VERSION, exportedAt: nowISO(), by: S.me.name, tables: Object.fromEntries(TABLES.map(t => [t, [...S.t[t].values()]])) };
    downloadText(`khalifa-backup-${todayKey()}.json`, JSON.stringify(data), 'application/json');
  },
  // setup
  suConnect: async () => {
    const st = V.setup; st.url = $('#suUrl').value.trim(); st.key = $('#suKey').value.trim(); st.err = '';
    if (!/^https:\/\/script\.google(usercontent)?\.com\//.test(st.url) && !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(st.url)) { st.err = 'Paste the Web App URL that ends with /exec'; render(); return; }
    if (!st.key) { st.err = 'Enter the secret key'; render(); return; }
    $('#suErr').textContent = 'Connecting…';
    try { const j = await api('ping', {}, st.url, st.key); applyMasters(j.masters); st.users = users(); st.step = 'who'; render(); }
    catch (e) { st.err = e.message; render(); }
  },
  suWho: el => { V.setup.code = el.dataset.code; V.setup.name = el.dataset.name; render(); },
  suWhoNext: () => { V.setup.step = 'pin'; render(); afterRender(); },
  suRetry: () => { V.setup.err = ''; render(); firstPull(); }
};
function refreshTop() { const top = V.stack[V.stack.length - 1]; if (top && top.type === 'page') refreshPage(top); }
function newPinSheet() {
  let first = null;
  openSheet(`<h3 id="npT">New PIN</h3><div style="display:flex;flex-direction:column;align-items:center">${padHTML('npPad', true)}</div><div class="err" id="npErr" style="text-align:center"></div>`, sh => {
    bindPad(sh, 'npPad', async (pin, pad) => {
      if (!first) { first = pin; $('#npT', sh).textContent = 'Enter it once more'; pad.reset(); return; }
      if (pin !== first) { first = null; $('#npT', sh).textContent = 'New PIN'; $('#npErr', sh).textContent = 'PINs did not match'; pad.shake(); return; }
      S.me.pinHash = await hashPin(pin, S.me.salt); await saveMeta('profile', S.me); closeTopSheet(); toast('PIN changed');
    });
  });
}
function connSheet() {
  openSheet(`<h3>Google Sheet connection</h3><div class="stack"><input class="in" id="cnUrl" value="${esc(S.url)}" placeholder="Apps Script /exec URL" aria-label="URL">
    <input class="in" id="cnKey" type="password" value="${esc(S.key)}" placeholder="Secret key" aria-label="Secret key"><button class="btn brass" id="cnSave">Test & save</button><div class="err" id="cnErr"></div></div>`, sh => {
    $('#cnSave', sh).onclick = async () => {
      const url = $('#cnUrl', sh).value.trim(), key = $('#cnKey', sh).value.trim();
      try { await api('ping', {}, url, key); S.url = url; S.key = key; await saveMeta('conn', { url, key }); closeTopSheet(); toast('Saved ✓'); scheduleSync(100); }
      catch (e) { $('#cnErr', sh).textContent = e.message; }
    };
  });
}
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const fn = ACT[el.dataset.act]; if (!fn) return;
  e.preventDefault(); fn(el, e);
});
document.addEventListener('input', e => {
  const el = e.target; const k = el.dataset && el.dataset.in; if (!k) return;
  const v = el.value;
  switch (k) {
    case 'billsQ': V.billsQ = v; { const pos = el.selectionStart; renderBase(); const n = $('[data-in="billsQ"]'); n.focus(); try { n.setSelectionRange(pos, pos); } catch (er) { /* ignore */ } } break;
    case 'custQ': V.custQ = v; { const pos = el.selectionStart; renderBase(); const n = $('[data-in="custQ"]'); n.focus(); try { n.setSelectionRange(pos, pos); } catch (er) { /* ignore */ } } break;
    case 'nbPhone': NB.phone = v; nbLookup(true); nbUpdate(); break;
    case 'nbName': NB.name = v; NB.nameAuto = false; nbUpdate(); break;
    case 'itName': NB.it.name = v; $('#itSug').innerHTML = sugHTML(); break;
    case 'itPrice': NB.it.price = v; break;
    case 'itFree': NB.it.size = v; break;
    case 'itOther': { const d = v.replace(/[^\d.]/g, ''); NB.it.size = d ? d + 'ml' : ''; $$('.sizes-seg button').forEach(b => b.classList.remove('on')); } break;
    case 'nbRate': NB.lines[+el.dataset.i].rate = v; nbUpdate(); break;
    case 'nbDisc': NB.lines[+el.dataset.i].discount = v; nbUpdate(); break;
    case 'nbBillDisc': NB.billDiscount = v; nbUpdate(); break;
    case 'nbPaid': NB.paid = v; NB.paidTouched = true; nbUpdate(); break;
    case 'repFrom': V.rep.from = v; refreshTop(); break;
    case 'repTo': V.rep.to = v; refreshTop(); break;
    case 'closeDay': V.closeDay = v; refreshTop(); break;
  }
});
function afterRender() { if (V.locked) afterLockRender(); else if (V.setup) afterSetupRender(); }

/* ---------------- boot ---------------- */
async function boot() {
  await loadAll();
  if (S.me && S.url) V.locked = true;
  render(); afterRender();
  window.addEventListener('online', () => scheduleSync(200));
  window.addEventListener('offline', () => setSync('offline'));
  setInterval(() => { if (S.me && !V.locked && navigator.onLine) syncNow(); }, 120000);
  if (!navigator.onLine) setSync('offline');
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
}
window.KBM = { S, V, saveBill, syncNow, report, cashBook, dayClose, customerDueP, buildCaption, makePdf, invoiceHTML, calcBill, nextBillNo, receivePayment, addExpense, addTransfer, voidBill, markShared, receiveBillPayment, saleDueP, canQr, upiLink };
boot();
