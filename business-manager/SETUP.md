# Khalifa Business Manager — Setup guide

Ye guide ek baar follow karni hai. Isme 3 hisse hain:
- **A, B, C:** Google Sheet + Apps Script (sirf Abu karega, laptop pe aasaan rahega)
- **D:** teeno phones pe app lagana
- **E:** WhatsApp test

---

## A) Google Sheet banana

1. Khalifa ke Google account se **sheets.google.com** kholo, phir **Blank** sheet banao.
2. Sheet ka naam rakho: **Khalifa Business Manager**.
3. Ye Sheet **kisi ke saath share mat karna.** Apps Script khud is Sheet mein likhega.

## B) Apps Script lagana

1. Sheet mein upar menu se **Extensions → Apps Script** kholo.
2. Wahan jo code pehle se likha hai, wo sab mita do. Repo ki `apps-script/Code.gs` file ka poora code copy karke paste karo, phir **Save (💾)** dabao.
3. Upar function wali list mein **`setupSheet`** chuno aur **Run ▶** dabao.
   - Google permission maangega: **Review permissions → apna account → Advanced → Go to project (unsafe) → Allow**.
   - Ye warning isliye aati hai kyunki script aapki apni hai aur Google ne use verify nahi kiya. Ye normal hai.
   - Iske baad Sheet mein ye tabs apne aap ban jayenge: Customers, Sales, SaleItems, Payments, Expenses, Transfers, AuditLog, Users, Products, Settings.
4. **Secret key set karo:**
   - Left side **⚙️ Project Settings** kholo, phir neeche **Script properties → Add script property**.
   - Property: `SECRET_KEY`
   - Value: koi lamba random password, kam se kam 20 characters. Example: `Khalifa-7xQ2-mP9v-2026-Rk4` (ye mat use karna, apna banao).
   - **Save script properties** dabao.
   - Ye key kahin likh ke rakho. Teeno phones mein yahi dalegi. **WhatsApp group ya screenshot mein mat bhejna.**
5. **Web App deploy karo:**
   - Upar right mein **Deploy → New deployment** dabao, phir ⚙️ se **Web app** chuno.
   - Description: `v1`
   - **Execute as: Me**
   - **Who has access: Anyone**
   - **Deploy** dabao, phir jo **Web app URL** mile (`/exec` pe khatam hota hai) use copy karke rakho.

> "Anyone" ka matlab ye nahi ki koi bhi aapka data dekh sakta hai. Har request mein secret key check hoti hai, galat key wali request reject ho jaati hai.

## C) Sheet mein apna data daalna

**Users tab:** Yaseen (Y), Huzaifa (H), Mushtaq (M) pehle se bane hain. Naya banda jodna ho to ek nayi row daalo: `code` (ek letter, jaise A), `name`, `active` = TRUE. Kisi ko hatana ho to `active` = FALSE kar do.

**Products tab (optional):** isko khaali bhi chhod sakte ho. Bill banate waqt koi bhi item haath se likh sakte ho (naam, size, price), aur ek baar bika item agle bill mein khud suggest hota hai. Fixed price list chahiye ho, ya Reports mein profit dekhna ho, tab har size ki ek row daalo.

| name | size | type | price | costPrice | active |
|---|---|---|---|---|---|
| Prince | 6ml | Attar | 399 | 160 | TRUE |
| Prince | 12ml | Attar | 699 | 280 | TRUE |
| Prince | 100ml | Perfume | 1799 | 720 | TRUE |

- `costPrice` daaloge tabhi Reports mein profit dikhega. Khaali chhod sakte ho.
- Koi product band karna ho to `active` = FALSE kar do.
- Price mein ₹ likh doge to bhi chalega, app usko hata deta hai.

**Settings tab:** `address` bharo. Baaki values (phone, website, thank-you line) check kar lo. GST registered ho to `gstEnabled` = TRUE aur `gstin` bharo. Registered nahi ho to FALSE hi rehne do.

Sheet mein kuch bhi badlo, phones pe app mein **Sync** dabate hi update aa jayega.

**Baaki tabs ko haath mat lagana** (Sales, Payments, Customers, Expenses, Transfers, AuditLog, SaleItems). Ye app likhta hai. Inme column ya row delete karoge to sync bigad sakta hai. Dekhna, filter lagana, pivot banana sab safe hai.

## D) Teeno phones pe app lagana

Har phone pe ye karna hai:

1. Phone pe app ka link kholo: `https://khalifa-attar-perfumes.github.io/Khalifa-Attar-Perfume/business-manager/`
   - Android pe **Chrome** mein kholo.
   - iPhone pe **Safari** mein kholo.
2. App ko Home Screen pe daalo:
   - **Android:** ⋮ menu → **Add to Home screen / Install app**
   - **iPhone:** Share button (⬆️) → **Add to Home Screen**
3. **Ab app hamesha Home Screen wale "Khalifa BM" icon se hi kholna.** iPhone pe ye zaroori hai, kyunki Safari tab mein chalaya to iPhone kuch din baad data mita sakta hai.
4. Pehli baar khulne pe internet on rakho, phir:
   - Web app URL paste karo
   - Secret key daalo
   - **Connect** dabao
5. Apna naam chuno (Yaseen / Huzaifa / Mushtaq).
6. 4-digit PIN set karo, aur dobara daal ke confirm karo.
7. Ho gaya. Ab app offline bhi chalega, aur internet aate hi khud sync karega.

**Ek user = ek phone.** Ek hi naam se do phones pe login mat karna, warna bill numbers aapas mein takra sakte hain.

**Naya phone ya app reinstall:** bas upar wale steps phir se karo. Saara data Sheet se wapas aa jayega, aur bill number wahin se aage chalega.

## E) WhatsApp bill test (har phone pe ek baar)

Apne hi number pe ek test bill banao aur ye check karo:

| Step | Android (Chrome app) | iPhone (Home Screen app) |
|---|---|---|
| 1. **Send on WhatsApp** dabao | Customer ki chat khulti hai, bina message ke | Same |
| 2. App mein wapas aao | "Send PDF + Message 📎" popup dikhta hai | Same |
| 3. Popup ka button dabao | Share list khulti hai, usme WhatsApp chuno | Same |
| 4. Chat chuno | Sabse upar wahi customer dikhta hai | Same |
| 5. Bhejo | PDF + message caption ke saath jaata hai | PDF jaata hai. Caption box mein **long-press → Paste** karo, message copy ho chuka hota hai |
| 6. App mein wapas aao | Bill pe **✓ Sent** dikhta hai | Same |

- Kuch WhatsApp versions mein Android pe bhi caption PDF ke saath nahi aata. Tab bhi long-press → Paste chalega, message hamesha copy hota hai.
- Agar phone share support nahi karta, to app PDF save karta hai aur message copy karta hai. Chat mein PDF attach karo, message paste karo, phir app mein **Mark as sent** dabao.

## Code.gs update karna ho tab

1. Apps Script mein naya code paste karo aur Save karo.
2. **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.

Isse URL wahi rehta hai, phones mein kuch badalna nahi padta.
