// @ts-nocheck
// DOM engine for the RentPhoenix OS showcase. Ported as-is from the approved interactive mock
// (string-built phone screens + event wiring), so it is left untyped on purpose.
// Everything is scoped to `root`; the returned function tears down timers and listeners.

export interface ShowcaseConfig { playUrl: string; webUrl: string; }

export function initRpShowcase(root: HTMLElement, cfg: ShowcaseConfig): () => void {
const timeouts = [], intervals = [];
let onResize = null;
const later = (fn, ms) => { const id = window.setTimeout(fn, ms); timeouts.push(id); return id; };

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,r=root)=>r.querySelector(s), $$=(s,r=root)=>[...r.querySelectorAll(s)];
const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const wait=ms=>new Promise(r=>later(r,RM?0:ms));
const PLAY=cfg.playUrl, WEB=cfg.webUrl;

/* ---------- OS detection ---------- */
const ua=navigator.userAgent;
const os=/android/i.test(ua)?'android':/iphone|ipad|ipod/i.test(ua)?'ios':/mac os x/i.test(ua)?'mac':/windows/i.test(ua)?'windows':'other';
const ctaText={android:'Get it on Google Play',ios:'Open web app',mac:'Open web app',windows:'Open web app',other:'Open web app'}[os];
$$('[data-primary-cta]').forEach(a=>{ a.textContent=ctaText; a.href=os==='android'?PLAY:WEB; });


/* ---------- LENS (landlord / tenant) ---------- */
const FACT=f=>f.map(x=>`<div class="fact"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('');
const LENS={
 landlord:{h1:'One shared space for <span class="grad">landlord and tenant.</span>',
  lead:'Rent records, bills, repairs, documents, agreements and chat in one app. When one of you updates something, the other sees it on their phone straight away. No more screenshots lost in WhatsApp.',
  note:'Free for tenants · ₹599 per property per year for landlords · 30-day free trial',
  facts:[['Both of you see the same thing','One record per tenancy instead of two versions of the truth.'],['Rent goes straight to you','Tenants pay your UPI ID or in cash. RentPhoenix never holds money.'],['You stay in control','Nothing is marked paid or verified until you confirm it.'],['Works on weak networks','Your data is saved on the phone and syncs when you\'re back online.']]},
 tenant:{h1:'Your rented home, <span class="grad">organised in one app.</span>',
  lead:'See your rent status, keep every approved receipt, report repairs with a photo, and keep your agreement and documents on your phone. Your landlord sees the same thing, so there\'s nothing to argue about.',
  note:'Always free for tenants · Join through your landlord\'s invite link',
  facts:[['Proof of every payment','Receipts your landlord approves stay in your receipt vault.'],['Repairs on record','Report with a photo and follow it until it\'s resolved.'],['Your papers on your phone','Agreement and ID documents in one place.'],['Always free','Your landlord\'s plan covers you. You never pay.']]}
};
function setLens(k,anim){
  $$('[data-lens]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lens===k));
  root.classList.remove('lens-landlord','lens-tenant'); root.classList.add('lens-'+k);
  const L=LENS[k], els=$$('[data-lx]');
  const apply=()=>{ els.forEach(e=>{ const x=e.dataset.lx; e.innerHTML = x==='facts'?FACT(L.facts):L[x]; e.classList.remove('out'); }); };
  if(anim && !RM){ els.forEach(e=>e.classList.add('out')); later(apply,220); } else apply();
}
$$('[data-lens]').forEach(b=>b.addEventListener('click',()=>setLens(b.dataset.lens,true)));
if(location.hash==='#tenant') setLens('tenant',false);

/* ---------- BEFORE / AFTER ---------- */
const FLIPS=[
 ['"Bhai, rent bheja?" texts on the 5th of every month','The receipt lands on your phone. You approve it, and both of you see Paid.'],
 ['Scrolling through chats to find last month\'s UPI screenshot','Every receipt in one list, with the amount and date.'],
 ['The rent agreement is in an email from 2022','The agreement is in the app, for both of you, any time.'],
 ['"Who paid the light bill this time?"','Each bill has its photo, proof of payment and status.'],
 ['A repair request lost in a family WhatsApp group','Issues tracked from Open to Resolved, with photos.'],
 ['An argument about the deposit on moving day','Every deduction written down with a reason, before the refund.']
];
$('[data-flips]').innerHTML=FLIPS.map(f=>`<button type="button" class="flip" aria-pressed="false" data-flip><div class="fi"><div class="face front"><small>😩 The old way</small><p>${f[0]}</p><span class="hint">Tap to flip ↻</span></div><div class="face back"><small>✨ With RentPhoenix</small><p>${f[1]}</p><span class="hint">↻</span></div></div></button>`).join('');
const flipAllBtn=$('[data-flipall]');
const syncFlipBtn=()=>{ flipAllBtn.textContent=$$('[data-flip]').every(b=>b.classList.contains('on'))?'Flip all back':'Flip all cards'; };
$$('[data-flip]').forEach(b=>b.addEventListener('click',()=>{ const on=b.classList.toggle('on'); b.setAttribute('aria-pressed',on); syncFlipBtn(); }));
flipAllBtn.addEventListener('click',()=>{
  const all=$$('[data-flip]').every(b=>b.classList.contains('on'));
  $$('[data-flip]').forEach((b,i)=>later(()=>{ b.classList.toggle('on',!all); b.setAttribute('aria-pressed',!all); syncFlipBtn(); }, RM?0:i*90));
});

/* ---------- HERO sync loop ---------- */
const heroEvents=[
  {from:'t',pk:'Receipt ₹14,000',mine:['🧾','Receipt sent','₹14,000 · waiting for Rakesh','p-rev','Sent'],theirs:['🧾','Priya sent a receipt','₹14,000 · tap to approve','p-due','Review']},
  {from:'l',pk:'Approved',mine:['✅','You approved October rent','Shown as paid to Priya','p-ok','Done'],theirs:['✅','October rent approved','Saved in your receipt vault','p-ok','Paid']},
  {from:'t',pk:'New issue',mine:['🔧','You reported: tap leaking','Photo attached','p-rev','Open'],theirs:['🔧','Kitchen tap leaking','Reported by Priya · with photo','p-due','New']},
  {from:'l',pk:'Bill ₹2,400',mine:['⚡','Electricity bill added','Priya pays ₹2,400 · due 15 Oct','p-v','Sent'],theirs:['⚡','New electricity bill','Your share ₹2,400 · due 15 Oct','p-due','Due']},
  {from:'l',pk:'Message',mine:['💬','"Plumber comes Sat, 11am"','Message to Priya','p-v','Sent'],theirs:['💬','Rakesh: "Plumber comes Sat, 11am"','Chat · just now','p-v','New']}
];
const hf={l:$('[data-hf="l"]'),t:$('[data-hf="t"]')}, hs={l:$('[data-hs="l"]'),t:$('[data-hs="t"]')}, pk=$('[data-pk]');
const itemHTML=a=>`<div class="item"><span class="ic">${a[0]}</span><div><b>${a[1]}</b><small>${a[2]}</small></div><span class="pill ${a[3]}">${a[4]}</span></div>`;
function push(side,a){ hf[side].insertAdjacentHTML('afterbegin',itemHTML(a)); while(hf[side].children.length>3) hf[side].lastElementChild.remove(); }
let hi=0;
async function heroTick(){
  const e=heroEvents[hi%heroEvents.length]; hi++;
  const to=e.from==='l'?'t':'l';
  push(e.from,e.mine);
  hs[e.from].classList.add('busy'); hs[e.from].textContent='Syncing';
  pk.textContent=e.pk; pk.className='pk '+(e.from==='l'?'down':'up');
  await wait(900);
  hs[e.from].classList.remove('busy'); hs[e.from].textContent='Synced';
  push(to,e.theirs);
  pk.className='pk';
}
// seed so the first frame is complete
push('t',heroEvents[0].mine); push('l',heroEvents[0].theirs); hi=1;
// the loop only runs while the hero is on screen and the tab is visible
let heroTimer = 0;
const startHero = () => { if (!RM && !heroTimer) heroTimer = window.setInterval(heroTick, 3200); };
const stopHero = () => { if (heroTimer) { clearInterval(heroTimer); heroTimer = 0; } };

/* ---------- SIMULATOR ---------- */
const K=(cls,inner)=>`<div class="kard ${cls||''}">${inner}</div>`;
const R=(a,b)=>`<div class="row">${a}${b||''}</div>`;
const P=(cls,t)=>`<span class="pill ${cls}">${t}</span>`;
const W=t=>`<div class="wait">${t}</div>`;
const BTN='{{BTN}}';

const SCN=[
 {id:'rent',ic:'₹',name:'Rent payment',tab:'money',steps:[
  {actor:'t',btn:'Pay ₹14,000 with UPI',pk:null,
   cap:'<b>Priya taps Pay.</b> Her own UPI app opens with Rakesh\'s UPI ID and the amount already filled in. The money goes straight to Rakesh.',
   L:()=>K('hl',`<small>October · received</small><span class="big">₹0</span><small>of ₹14,000 from Flat 2B</small>`)+K('',R('<div><b>Priya · Flat 2B</b><br><small>Due 5 Oct</small></div>',P('p-due','Due'))),
   T:()=>K('hl',`<small>October rent</small><span class="big">₹14,000</span><small>Due 5 Oct · to Rakesh</small>`)+K('',`<small>Pay to</small><b>rakesh@okaxis</b><small>Google Pay · PhonePe · any UPI app</small>`)+BTN},
  {actor:'t',btn:'Send receipt to Rakesh',pk:'Receipt ₹14,000',
   cap:'<b>Paid. Now Priya sends proof.</b> She uploads the payment screenshot from her UPI app.',
   L:()=>K('hl',`<small>October · received</small><span class="big">₹0</span><small>of ₹14,000 from Flat 2B</small>`)+K('',R('<div><b>Priya · Flat 2B</b><br><small>Due 5 Oct</small></div>',P('p-due','Due'))),
   T:()=>K('',`<b>Upload receipt</b><div class="shot">UPI screenshot.png</div><div class="field"><span>Amount paid</span><div>₹14,000</div></div><div class="field"><span>Paid on</span><div>3 Oct 2026</div></div>`)+BTN},
  {actor:'l',btn:'Approve',btn2:'Reject',pk:'Approved ✓',rejPk:'Rejected',rej:'<b>Rakesh taps Reject.</b> Priya sees it straight away and can send a corrected receipt. For this demo, tap Approve.',
   cap:'<b>Rakesh gets the receipt on his phone instantly.</b> He checks it against his bank and approves it. Nothing counts as paid until he does.',
   L:()=>K('flash',`${R('<b>New receipt</b>',P('p-rev','Review'))}<small>Priya · Flat 2B · ₹14,000 · 3 Oct</small><div class="shot">UPI screenshot.png</div>`)+BTN,
   T:()=>K('',R('<div><b>October rent</b><br><small>Receipt sent 3 Oct</small></div>',P('p-rev','In review')))+W('Waiting for Rakesh to approve')},
  {done:true,
   cap:'<b>Done. Both phones now say Paid.</b> Priya\'s receipt is saved in her vault, which helps with HRA claims. Paid in cash instead? Rakesh can record cash, partial or advance himself.',
   L:()=>K('hl',`<small>October · received</small><span class="big">₹14,000</span><small>of ₹14,000 from Flat 2B</small>`)+K('flash',R('<div><b>Priya · Flat 2B</b><br><small>Paid 3 Oct · UPI</small></div>',P('p-ok','Paid'))),
   T:()=>K('hl flash',`<small>October rent</small><span class="big">Paid ✓</span><small>Approved by Rakesh</small>`)+K('',R('<div><b>Receipt vault</b><br><small>Oct · Sep · Aug</small></div>',P('p-ok','3 saved')))}
 ]},
 {id:'bill',ic:'⚡',name:'Utility bill',tab:'money',steps:[
  {actor:'l',btn:'Send bill to Priya',pk:'Bill ₹2,400',
   cap:'<b>Rakesh adds the electricity bill.</b> He can attach the bill photo and decide who pays: the tenant pays all of it, or they split it.',
   L:()=>K('',`<b>New utility bill</b><div class="field"><span>Bill type</span><div>⚡ Electricity · September</div></div><div class="field"><span>Total</span><div>₹2,400</div></div><div class="field"><span>Split</span><div>Tenant pays full bill</div></div>`)+BTN,
   T:()=>K('',`<b>My bills</b><small>Nothing due right now.</small>`)},
  {actor:'t',btn:'Submit payment proof',pk:'Proof sent',
   cap:'<b>The bill appears on Priya\'s phone with her share and due date.</b> She pays it and sends proof, either a screenshot or a transaction reference.',
   L:()=>K('',R('<div><b>Electricity · Sep</b><br><small>Tenant pays ₹2,400</small></div>',P('p-due','Awaiting'))),
   T:()=>K('flash',`${R('<b>⚡ Electricity · Sep</b>',P('p-due','Due 15 Oct'))}<small>Your share</small><span class="big" style="font-size:20px">₹2,400</span><small>View bill · Download</small>`)+`<div class="field"><span>Transaction reference</span><div>UPI 4021 7782 1190</div></div>`+BTN},
  {actor:'l',btn:'Verify paid',btn2:'Return',pk:'Verified ✓',rej:'<b>Returned with a note.</b> Priya sees exactly what to fix and sends the proof again. For this demo, tap Verify paid.',
   cap:'<b>Rakesh reviews the proof.</b> If something is wrong, he taps Return and adds a note, and Priya sees exactly what to fix.',
   L:()=>K('flash',`${R('<b>Proof submitted</b>',P('p-rev','Review'))}<small>Electricity · Sep · ₹2,400</small><small>Ref: UPI 4021 7782 1190</small>`)+BTN,
   T:()=>K('',R('<div><b>Electricity · Sep</b><br><small>Proof sent</small></div>',P('p-rev','Under review')))},
  {done:true,
   cap:'<b>The bill is settled on both sides.</b> Each bill keeps its photo and proof, so there are no arguments over who paid what.',
   L:()=>K('flash',R('<div><b>Electricity · Sep</b><br><small>Verified · ₹2,400</small></div>',P('p-ok','Paid'))),
   T:()=>K('flash',R('<div><b>Electricity · Sep</b><br><small>Verified by Rakesh</small></div>',P('p-ok','Paid')))}
 ]},
 {id:'issue',ic:'🔧',name:'Repair issue',tab:'issues',steps:[
  {actor:'t',btn:'Report issue',pk:'New issue',
   cap:'<b>Priya reports a problem with a photo</b> instead of a WhatsApp message that gets buried.',
   L:()=>K('',`<b>Issues</b><small>No open issues 🎉</small>`),
   T:()=>K('',`<b>Report an issue</b><div class="field"><span>What\'s wrong?</span><div>Kitchen tap leaking</div></div><div class="shot">photo.jpg</div>`)+BTN},
  {actor:'l',btn:'Mark in progress',pk:'In progress',
   cap:'<b>Rakesh sees it immediately, with the photo.</b> He marks it in progress so Priya knows it has been seen.',
   L:()=>K('flash',`${R('<b>Kitchen tap leaking</b>',P('p-bad','Open'))}<small>Flat 2B · Priya · just now</small><div class="shot">photo.jpg</div>`)+BTN,
   T:()=>K('',R('<div><b>Kitchen tap leaking</b><br><small>Reported just now</small></div>',P('p-bad','Open')))+W('Waiting for Rakesh')},
  {actor:'l',btn:'Mark resolved',pk:'Resolved ✓',
   cap:'<b>Priya can see it\'s being handled.</b> She also has Rakesh\'s plumber in her maintenance contacts, shared from his list.',
   L:()=>K('',R('<div><b>Kitchen tap leaking</b><br><small>Flat 2B</small></div>',P('p-rev','In progress')))+BTN,
   T:()=>K('flash',R('<div><b>Kitchen tap leaking</b><br><small>Rakesh is on it</small></div>',P('p-rev','In progress')))+K('',`<small>Maintenance contacts</small>${R('<b>🔧 Ramesh · Plumber</b>',P('p-v','Primary'))}`)},
  {done:true,
   cap:'<b>Resolved on both phones.</b> If the tap starts leaking again, Priya can reopen the same issue, so its history stays in one place.',
   L:()=>K('flash',R('<div><b>Kitchen tap leaking</b><br><small>Resolved today</small></div>',P('p-ok','Resolved'))),
   T:()=>K('flash',R('<div><b>Kitchen tap leaking</b><br><small>Resolved today</small></div>',P('p-ok','Resolved')))+`<small style="text-align:center;color:var(--muted)">Not fixed? Tap Reopen</small>`}
 ]},
 {id:'docs',ic:'🪪',name:'Documents',tab:'home',steps:[
  {actor:'t',btn:'Upload documents',pk:'2 documents',
   cap:'<b>Priya uploads her ID once</b> instead of sending photos over WhatsApp.',
   L:()=>K('',`<b>Document locker</b>${R('<small>Priya · Flat 2B</small>',P('p-due','Nothing yet'))}`),
   T:()=>K('',`<b>My documents</b>${R('<small>🪪 Aadhaar (masked)</small>',P('p-v','Added'))}${R('<small>💳 PAN card</small>',P('p-v','Added'))}`)+BTN},
  {actor:'l',btn:'Mark verified',pk:'Verified ✓',
   cap:'<b>The documents show up in Rakesh\'s locker.</b> He opens them, checks them himself, and marks them verified.',
   L:()=>K('flash',`${R('<b>Priya · Flat 2B</b>',P('p-rev','Review'))}<small>🪪 Aadhaar (masked) · 💳 PAN</small><small>Uploaded just now</small>`)+BTN,
   T:()=>K('',R('<div><b>My documents</b><br><small>2 uploaded</small></div>',P('p-rev','Pending review')))},
  {done:true,
   cap:'<b>Both of you see the documents as verified.</b> "Verified" means the landlord reviewed them. It is not a government KYC check.',
   L:()=>K('flash',R('<div><b>Priya · Flat 2B</b><br><small>2 documents</small></div>',P('p-ok','Verified'))),
   T:()=>K('flash',R('<div><b>My documents</b><br><small>Reviewed by Rakesh</small></div>',P('p-ok','Verified')))}
 ]},
 {id:'chat',ic:'💬',name:'Chat',tab:'chat',steps:[
  {actor:'t',btn:'Send',pk:'Message',
   cap:'<b>Chat lives next to the tenancy</b>, so messages don\'t get mixed up with family groups.',
   L:()=>`<div class="bub">Rent for October received, thanks!<small>2 Oct</small></div>`,
   T:()=>`<div class="bub">Rent for October received, thanks!<small>Rakesh · 2 Oct</small></div><div class="bub me">Can the plumber come on Saturday?<small>typing…</small></div>`+BTN},
  {actor:'l',btn:'Reply: "Yes, 11am"',pk:'Reply',
   cap:'<b>Rakesh gets it instantly.</b> With several tenants in one building, he can also message all of them in a group.',
   L:()=>`<div class="bub">Rent for October received, thanks!<small>2 Oct</small></div><div class="bub me flash">Can the plumber come on Saturday?<small>Priya · just now</small></div>`+BTN,
   T:()=>`<div class="bub">Rent for October received, thanks!<small>Rakesh · 2 Oct</small></div><div class="bub me">Can the plumber come on Saturday?<small>Sent</small></div>`},
  {done:true,
   cap:'<b>The conversation is the same on both phones</b> and stays with the property, even years later.',
   L:()=>`<div class="bub me">Can the plumber come on Saturday?<small>Priya</small></div><div class="bub">Yes, 11am works.<small>You · just now</small></div>`,
   T:()=>`<div class="bub me">Can the plumber come on Saturday?<small>You</small></div><div class="bub flash">Yes, 11am works.<small>Rakesh · just now</small></div>`}
 ]},
 {id:'invite',ic:'✉️',name:'Invite a tenant',tab:'home',steps:[
  {actor:'l',btn:'Send invite on WhatsApp',pk:'Invite link',
   cap:'<b>Moving a tenant in starts here.</b> Rakesh fills in the rent and lease dates once, then sends the invite through WhatsApp.',
   L:()=>K('',`<b>Invite tenant · Flat 2B</b><div class="field"><span>Tenant</span><div>Priya Sharma</div></div><div class="field"><span>Rent · Deposit</span><div>₹14,000 · ₹28,000</div></div><div class="field"><span>Lease</span><div>1 Oct 2026 – 30 Sep 2027</div></div>`)+BTN,
   T:()=>`<div class="bub wa">Hi Priya 👋 Rakesh has invited you to Flat 2B on RentPhoenix.<small>WhatsApp</small></div>`},
  {actor:'t',btn:'Accept invite',pk:'Accepted ✓',
   cap:'<b>Priya opens the link</b>, signs in with Google, and sees exactly what was agreed before she accepts.',
   L:()=>K('',R('<div><b>Flat 2B</b><br><small>Invite sent to Priya</small></div>',P('p-due','Pending'))),
   T:()=>K('',`<b>You\'re invited</b><small>Flat 2B · Mapusa</small>${R('<small>Monthly rent</small>','<b>₹14,000</b>')}${R('<small>Deposit</small>','<b>₹28,000</b>')}${R('<small>Lease</small>','<b>Oct 26 – Sep 27</b>')}`)+BTN},
  {done:true,
   cap:'<b>They\'re now connected.</b> From here on, rent, bills, issues, documents and chat for Flat 2B are shared between them.',
   L:()=>K('flash',R('<div><b>Flat 2B</b><br><small>Priya · since 1 Oct</small></div>',P('p-ok','Occupied'))),
   T:()=>K('hl flash',`<small>Welcome home</small><span class="big" style="font-size:19px">Flat 2B, Mapusa</span><small>Landlord: Rakesh</small>`)}
 ]},
 {id:'apply',ic:'🏠',name:'Apply & visit',tab:'home',steps:[
  {actor:'t',btn:'Apply · offer ₹17,000',pk:'Application',
   cap:'<b>Priya finds a 2BHK in Porvorim</b> listed at ₹18,000. She applies with her move-in date and her own offer.',
   L:()=>K('',`<b>Applications</b><small>No new applications</small>`)+K('',R('<div><b>2BHK · Porvorim</b><br><small>Listed at ₹18,000</small></div>',P('p-v','Listed'))),
   T:()=>`<div class="lst"><div class="lst-img">🏢</div><b>2BHK · Porvorim</b><small>Semi-furnished · 950 sq ft</small>${R('<b>₹18,000/mo</b>',P('p-ok','Available'))}</div><div class="field"><span>Move-in · Your offer</span><div>1 Nov · ₹17,000</div></div>`+BTN},
  {actor:'l',btn:'Counter ₹17,500',btn2:'Reject',pk:'Counter offer',rejPk:'Rejected',rej:'<b>Rejected, with a reason.</b> Priya sees why and can look at other homes. For this demo, try the counter offer.',
   cap:'<b>Rakesh sees the application.</b> He can accept it, reject it with a reason, or send a counter offer.',
   L:()=>K('flash',`${R('<b>Priya Sharma</b>',P('p-rev','New'))}<small>2BHK Porvorim · move-in 1 Nov · 11 months</small>${R('<small>Listed</small>','<b>₹18,000</b>')}${R('<small>Her offer</small>','<b>₹17,000</b>')}`)+BTN,
   T:()=>K('',R('<div><b>2BHK · Porvorim</b><br><small>Offer ₹17,000 sent</small></div>',P('p-rev','Under review')))},
  {actor:'t',btn:'Accept ₹17,500',pk:'Accepted',
   cap:'<b>Priya gets the counter offer</b> and accepts it. Both of them now see the same agreed rent.',
   L:()=>K('',R('<div><b>Priya Sharma</b><br><small>Counter ₹17,500 sent</small></div>',P('p-due','Waiting'))),
   T:()=>K('flash',`${R('<b>Counter offer</b>',P('p-due','New'))}<small>Rakesh · 2BHK Porvorim</small>${R('<small>Your offer</small>','<s>₹17,000</s>')}${R('<small>Counter offer</small>','<b>₹17,500</b>')}`)+BTN},
  {actor:'l',btn:'Propose visit times',pk:'3 time slots',
   cap:'<b>Rakesh proposes times for a site visit</b> instead of a long back-and-forth on calls.',
   L:()=>K('',`<b>Schedule a visit</b>${R('<small>Sat 8 Nov</small>','<b>11:00</b>')}${R('<small>Sat 8 Nov</small>','<b>16:00</b>')}${R('<small>Sun 9 Nov</small>','<b>10:00</b>')}`)+BTN,
   T:()=>K('',R('<div><b>2BHK · Porvorim</b><br><small>Agreed at ₹17,500</small></div>',P('p-ok','Accepted')))+W('Waiting for visit times')},
  {actor:'t',btn:'Pick Sat 11:00',pk:'Visit confirmed',
   cap:'<b>Priya picks the time that suits her.</b>',
   L:()=>K('',R('<div><b>Visit · Priya</b><br><small>3 times proposed</small></div>',P('p-due','Awaiting'))),
   T:()=>K('flash',`<b>Pick a visit time</b><div class="slot on">Sat 8 Nov · 11:00</div><div class="slot">Sat 8 Nov · 16:00</div><div class="slot">Sun 9 Nov · 10:00</div>`)+BTN},
  {done:true,
   cap:'<b>The visit is confirmed on both phones.</b> If it goes well, Rakesh invites Priya as his tenant and the rest of the tenancy carries on in the app.',
   L:()=>K('flash',R('<div><b>Visit · Priya</b><br><small>Sat 8 Nov · 11:00</small></div>',P('p-ok','Confirmed'))),
   T:()=>K('flash',R('<div><b>Site visit</b><br><small>Sat 8 Nov · 11:00</small></div>',P('p-ok','Confirmed')))}
 ]},
 {id:'moveout',ic:'📦',name:'Move-out',tab:'home',steps:[
  {actor:'l',btn:'Start move-out',pk:'Move-out date',
   cap:'<b>Priya is leaving.</b> Rakesh sets the move-out date, the reason and the notice period.',
   L:()=>K('',`<b>End tenancy · Flat 2B</b><div class="field"><span>Move-out date</span><div>30 Sep 2027</div></div><div class="field"><span>Reason</span><div>Tenant relocating</div></div><div class="field"><span>Notice period</span><div>30 days</div></div>`)+BTN,
   T:()=>K('hl',`<small>Flat 2B · Mapusa</small><span class="big" style="font-size:19px">Lease till 30 Sep 2027</span><small>Deposit held: ₹28,000</small>`)},
  {actor:'l',btn:'Save inspection',pk:'Inspection',
   cap:'<b>On moving day, Rakesh records the flat\'s condition.</b> Each deduction gets its own line and a reason.',
   L:()=>K('',`<b>Inspection</b>${R('<small>Wall repainting</small>','<b>₹2,000</b>')}${R('<small>Broken tap</small>','<b>₹500</b>')}${R('<small>Total deductions</small>','<b>₹2,500</b>')}`)+BTN,
   T:()=>K('flash',R('<div><b>Moving out</b><br><small>30 Sep 2027 · 30 days notice</small></div>',P('p-due','Move-out')))},
  {actor:'l',btn:'Close tenancy',pk:'Settlement',
   cap:'<b>Rakesh settles the deposit:</b> full, partial or no refund, or he marks it disputed. Priya sees every deduction and why.',
   L:()=>K('',`<b>Deposit settlement</b>${R('<small>Deposit held</small>','<b>₹28,000</b>')}${R('<small>Deductions</small>','<b>− ₹2,500</b>')}${R('<small>Refund due</small>','<b>₹25,500</b>')}<div class="field"><span>Status · Method</span><div>Partial refund · UPI</div></div>`)+BTN,
   T:()=>K('flash',`<b>Inspection deductions</b>${R('<small>Wall repainting</small>','<b>₹2,000</b>')}${R('<small>Broken tap</small>','<b>₹500</b>')}`)},
  {done:true,
   cap:'<b>The tenancy is closed with every record kept:</b> agreement, receipts, deductions and refund. No "I never agreed to that" on moving day.',
   L:()=>K('flash',R('<div><b>Flat 2B</b><br><small>Tenancy closed · 30 Sep</small></div>',P('p-v','Vacant'))),
   T:()=>K('hl flash',`<small>Deposit refund</small><span class="big">₹25,500</span><small>₹28,000 − ₹2,500 deductions · by UPI</small>`)+K('',R('<small>Records kept</small>',P('p-ok','Agreement · receipts')))}
 ]}
];

const tabsEl=$('[data-tabs]'), dotsEl=$('[data-dots]'), capEl=$('[data-cap]'), replay=$('[data-replay]');
const scr={l:$('[data-screen="l"]'),t:$('[data-screen="t"]')}, syncB={l:$('[data-sync="l"]'),t:$('[data-sync="t"]')}, phone={l:$('[data-phone="l"]'),t:$('[data-phone="t"]')};
const packet=$('[data-packet]'), cloud=$('[data-cloud]'), mtoast=$('[data-mtoast]');
let cur=SCN[0], step=0, busy=false, mobileSide='l', online=true, queued=null;
const isMobile=()=>matchMedia('(max-width:760px)').matches;

tabsEl.innerHTML=SCN.map((s,i)=>`<button type="button" role="tab" id="tab-${s.id}" aria-selected="${i===0}" data-scn="${i}"><span>${s.ic}</span>${s.name}</button>`).join('');
$$('[data-scn]').forEach(b=>b.addEventListener('click',()=>{ if(busy) return; $$('[data-scn]').forEach(x=>x.setAttribute('aria-selected',x===b)); cur=SCN[+b.dataset.scn]; step=0; queued=null; mtoast.classList.remove('on'); render(true); }));

function setMobile(side,flag){
  mobileSide=side;
  $$('[data-ms]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ms===side));
  $$('[data-side]').forEach(s=>s.classList.toggle('show',s.dataset.side===side));
  if(side) $(`[data-badge="${side}"]`).hidden=true;
}
$$('[data-ms]').forEach(b=>b.addEventListener('click',()=>setMobile(b.dataset.ms)));

function render(reset){
  const s=cur.steps[step];
  ['l','t'].forEach(side=>{
    let html=(side==='l'?s.L:s.T)();
    const btn = (!s.done && s.actor===side) ? (s.btn2?`<div class="acts"><button type="button" class="act sec2" data-act>${s.btn2}</button><button type="button" class="act" data-act>${s.btn}</button></div>`:`<button type="button" class="act" data-act>${s.btn}</button>`) : '';
    html=html.includes(BTN)?html.replace(BTN,btn):html+btn;
    scr[side].innerHTML=html;
    phone[side].classList.toggle('glow',!s.done && s.actor===side);
    $$('[data-tb]',phone[side]).forEach(t=>t.classList.toggle('on',t.dataset.tb===cur.tab));
  });
  $$('[data-act]').forEach(b=>b.addEventListener('click',()=>advance(b.textContent)));
  const total=cur.steps.length;
  dotsEl.innerHTML=cur.steps.map((_,i)=>`<i class="${i<=step?'on':''}"></i>`).join('');
  capEl.innerHTML=s.cap;
  replay.hidden=!s.done;
  if(reset && isMobile()) setMobile(cur.steps[0].actor);
  if(reset && !online){ syncB.t.className='sync off'; syncB.t.textContent='Offline'; }
}

/* offline: queue the action until Priya is back online */
function advance(label){
  if(busy) return;
  const s=cur.steps[step];
  if(!online && s.pk){
    queued=label;
    const btns=$$('[data-act]'); btns.forEach(b=>b.disabled=true); btns[btns.length-1].textContent='Waiting to sync…';
    if(s.actor==='t'){ syncB.t.className='sync off'; syncB.t.textContent='Saved · 1 waiting';
      capEl.innerHTML='<b>Priya has no signal.</b> What she did is saved on her phone and goes through the moment she\'s back online. Switch her internet back on.'; }
    else { capEl.innerHTML='<b>Rakesh\'s update is saved.</b> Priya is offline, so her phone gets it as soon as she reconnects. Switch her internet back on.'; }
    if(isMobile()){ mtoast.textContent='Saved · waiting for Priya\'s internet'; mtoast.classList.add('on'); }
    return;
  }
  doAdvance(label);
}
const netBtn=$('[data-net]');
function setNet(on){
  online=on; netBtn.setAttribute('aria-pressed',on);
  $('[data-net-l]').textContent="Priya's internet: "+(on?'On':'Off');
  $('[data-tsig]').textContent=on?'4G ▮▮▯':'No signal';
  if(!on){ syncB.t.className='sync off'; syncB.t.textContent='Offline'; return; }
  syncB.t.className='sync'; syncB.t.textContent='Synced';
  if(queued!==null){ const l=queued; queued=null; mtoast.classList.remove('on'); doAdvance(l); }
}
netBtn.addEventListener('click',()=>setNet(!online));

async function doAdvance(label){
  if(busy) return; busy=true;
  const s=cur.steps[step], from=s.actor, to=from==='l'?'t':'l';
  const rejected = s.btn2 && label===s.btn2;
  if(s.pk){
    syncB[from].className='sync busy'; syncB[from].textContent='Syncing';
    packet.textContent=rejected?(s.rejPk||'Returned'):s.pk;
    packet.className='packet '+(from==='l'?'go-r':'go-l');
    cloud.classList.remove('hot'); void cloud.offsetWidth; cloud.classList.add('hot');
    if(isMobile()){ mtoast.textContent=(rejected?(s.rejPk||'Returned'):s.pk)+' → sent to '+(to==='l'?'landlord':'tenant'); mtoast.classList.add('on'); }
    await wait(1000);
    packet.className='packet';
    syncB[from].className='sync'; syncB[from].textContent='Synced';
  } else {
    if(isMobile()){ mtoast.textContent='UPI app opens…'; mtoast.classList.add('on'); }
    await wait(700);
  }
  if(rejected){
    capEl.innerHTML=s.rej||'<b>Sent back.</b> For this demo, try the other button.';
    mtoast.classList.remove('on'); busy=false; return;
  }
  step=Math.min(step+1,cur.steps.length-1);
  render(false);
  if(isMobile()){
    const nx=cur.steps[step];
    const target = nx.done ? to : nx.actor;
    if(s.pk && target===mobileSide && to!==mobileSide) $(`[data-badge="${to}"]`).hidden=false;
    if(s.pk && target!==mobileSide){ $(`[data-badge="${target}"]`).hidden=false; await wait(500); setMobile(target); }
    else if(!s.pk && target!==mobileSide){ setMobile(target); }
    mtoast.classList.remove('on');
  }
  busy=false;
}
replay.addEventListener('click',()=>{ step=0; render(true); });
render(true);
onResize=()=>{ if(!isMobile()) $$('[data-side]').forEach(s=>s.classList.add('show')); else setMobile(mobileSide); };
window.addEventListener('resize',onResize);
if(!isMobile()) $$('[data-side]').forEach(s=>s.classList.add('show'));

/* ---------- SETUP WALKTHROUGH ---------- */
const SETUP=[
 {t:'Add your property',d:'Name, type, rent and deposit.',btn:'Add property',
  v:()=>K('',`<b>New property</b><div class="field"><span>Title</span><div>Flat 2B, Mapusa</div></div><div class="field"><span>Type · BHK</span><div>Apartment · 2 BHK</div></div><div class="field"><span>Rent · Deposit</span><div>₹14,000 · ₹28,000</div></div>`)},
 {t:'Invite your tenant',d:'Send a link on WhatsApp with the rent and lease dates.',btn:'Send invite on WhatsApp',
  v:()=>K('',R('<div><b>Flat 2B, Mapusa</b><br><small>Added just now</small></div>',P('p-v','Vacant')))+`<div class="bub wa">Hi Priya 👋 Rakesh has invited you to Flat 2B on RentPhoenix. Tap to view and accept.<small>WhatsApp</small></div>`},
 {t:'Your tenant accepts',d:'They sign in with Google and accept. You\'re connected.',btn:'Priya accepts',
  v:()=>K('',R('<div><b>Flat 2B</b><br><small>Invite sent to Priya</small></div>',P('p-due','Pending')))+W('Waiting for Priya to accept the invite')}
];
let sIdx=0;
function renderSetup(){
  $('[data-ssteps]').innerHTML=SETUP.map((x,i)=>`<button type="button" class="sstep ${i<sIdx?'done':''}" ${i===sIdx?'aria-current="step"':''} data-ss="${i}"><span class="num">${i<sIdx?'✓':i+1}</span><span><b>${x.t}</b><small>${x.d}</small></span></button>`).join('');
  $('[data-sprog]').style.width=(sIdx/SETUP.length*100)+'%';
  const box=$('[data-sprev]');
  if(sIdx<SETUP.length){ box.innerHTML=SETUP[sIdx].v()+`<button type="button" class="act" data-snext>${SETUP[sIdx].btn}</button>`; }
  else { box.innerHTML=K('hl',`<small>You're connected 🎉</small><span class="big" style="font-size:21px">Flat 2B · Priya</span><small>Rent records, bills, issues, documents and chat are now shared between you.</small>`)+K('',R('<div><b>Priya</b><br><small>Tenant since today</small></div>',P('p-ok','Connected')))+`<button type="button" class="act sec2" style="color:var(--violet)" data-snext>Start again</button>`; }
  $('[data-snext]').addEventListener('click',()=>{ sIdx = sIdx<SETUP.length ? sIdx+1 : 0; renderSetup(); });
  $$('[data-ss]').forEach(b=>b.addEventListener('click',()=>{ sIdx=+b.dataset.ss; renderSetup(); }));
}
renderSetup();

/* ---------- BILL SPLIT ---------- */
const BT=[['⚡','Electricity'],['💧','Water'],['🔥','Gas'],['📶','Internet']];
let bt=0, smode='split';
$('[data-btypes]').innerHTML=BT.map((b,i)=>`<button type="button" data-bt="${i}" aria-pressed="${i===0}">${b[0]} ${b[1]}</button>`).join('');
const bamt=$('#bamt'), bshare=$('#bshare');
function split(){
  const total=Math.max(0,Math.round(+bamt.value||0)), pct=smode==='full'?100:+bshare.value;
  const t=Math.round(total*pct/100), l=total-t;
  $('[data-bpct]').textContent=pct+'%';
  $('[data-shareblk]').hidden=smode==='full';
  $('[data-sbt]').style.width=pct+'%'; $('[data-sbl]').style.width=(100-pct)+'%';
  $('[data-btx]').textContent=inr(t); $('[data-blx]').textContent=inr(l);
  const b=BT[bt];
  $('[data-spscreen]').innerHTML=K('',`${R('<b>'+b[0]+' '+b[1]+' · Sep</b>',P('p-due','Due 15 Oct'))}<small>Total bill ${inr(total)}</small><small style="margin-top:4px">Your share</small><span class="big" style="font-size:26px">${inr(t)}</span><small>${l>0?'Landlord pays '+inr(l):'You pay the full bill'}</small>`)+K('',`<small>Bill photo attached · View · Download</small>`)+`<div class="act" style="text-align:center" aria-hidden="true">Submit payment proof</div>`;
}
$$('[data-bt]').forEach(b=>b.addEventListener('click',()=>{ bt=+b.dataset.bt; $$('[data-bt]').forEach(x=>x.setAttribute('aria-pressed',x===b)); split(); }));
$$('[data-sm]').forEach(b=>b.addEventListener('click',()=>{ smode=b.dataset.sm; $$('[data-sm]').forEach(x=>x.setAttribute('aria-pressed',x===b)); split(); }));
bamt.addEventListener('input',split); bshare.addEventListener('input',split); split();

/* ---------- PRIVACY ---------- */
const VIEWERS=[['🤝','Your landlord / tenant'],['🏘️','Other tenants'],['🕵️','Brokers & the public']];
const NO=['no',"Can't see",'No access.'];
const PRIV=[
 {ic:'₹',n:'Rent & payments',d:'Your rent amount, payment history and status.',v:[['yes','Can see','Only the landlord and tenant of this tenancy.'],['no',"Can't see",'Other tenants of the same landlord never see your payments.'],['no',"Can't see",'Never shown on listings or anywhere public.']]},
 {ic:'🧾',n:'Receipts',d:'Payment screenshots and receipts you upload.',v:[['yes','Can see','Your landlord sees them to approve or reject.'],NO,NO]},
 {ic:'🪪',n:'ID documents',d:'Aadhaar, PAN and other documents in the locker.',v:[['yes','Landlord only','Your landlord can open them to check and verify.'],NO,NO]},
 {ic:'💬',n:'Chat messages',d:'Direct messages and group chats.',v:[['yes','Can see','Direct messages stay between the two of you.'],['some','Group only','Only in a group chat your landlord added you both to.'],NO]},
 {ic:'📞',n:'Phone number',d:'The number on your profile.',v:[['yes','Can see','So you can reach each other.'],NO,['no',"Can't see","Listings never show the landlord's number, so brokers can't call you."]]},
 {ic:'🔧',n:'Bills & issues',d:'Utility bills, payment proof and repair requests.',v:[['yes','Can see','Shared between the landlord and tenant of that property.'],NO,NO]},
 {ic:'🏠',n:'Listing details',d:'Photos, rent, area and amenities of a vacant property.',v:[['yes','Can see','You manage the listing.'],['yes','Can see','Anyone browsing can see a listed property.'],['yes','Can see','Public, but without your phone number.']]}
];
$('[data-pitems]').innerHTML=PRIV.map((x,i)=>`<button type="button" class="pitem" role="tab" aria-selected="${i===0}" data-pi="${i}"><span>${x.ic}</span>${x.n}</button>`).join('');
function showPriv(i){
  $$('[data-pi]').forEach(b=>b.setAttribute('aria-selected',+b.dataset.pi===i));
  const x=PRIV[i];
  $('[data-pview]').innerHTML=`<h3>${x.ic} ${x.n}</h3><p>${x.d}</p><div class="viewers">${VIEWERS.map((w,j)=>`<div class="vw" style="animation-delay:${j*60}ms"><span class="ic">${w[0]}</span><b>${w[1]}</b><span class="pill ${x.v[j][0]}">${x.v[j][0]==='yes'?'✓ ':x.v[j][0]==='no'?'✕ ':'◐ '}${x.v[j][1]}</span><small>${x.v[j][2]}</small></div>`).join('')}</div><p class="mocknote">Mock: check every answer against the app's security rules before this goes live.</p>`;
}
$$('[data-pi]').forEach(b=>b.addEventListener('click',()=>showPriv(+b.dataset.pi)));
showPriv(0);

/* ---------- JOURNEY ---------- */
const STAGES=[
 {ic:'🔎',name:'Find',sub:'Listings & visits',title:'Find the right tenant, or the right home',desc:'Landlords list a vacant property. Tenants browse, apply and agree on rent, all inside the app.',feats:[
   ['🏠','Property listings',['L','List a property with photos, rent, BHK and furnishing'],['T','Search by area, budget, BHK and furnishing. Save favourites']],
   ['📝','Applications',['T','Apply with your move-in date, duration and offer'],['L','Accept, reject with a reason, or send a counter offer']],
   ['📅','Site visits',['L','Propose a few visit slots'],['T','Pick the slot that suits you. Both of you see it confirmed']]]},
 {ic:'🔑',name:'Move in',sub:'Invite & paperwork',title:'Move in with the paperwork sorted',desc:'Connect the tenant to the property once, and everything after that is shared.',feats:[
   ['✉️','WhatsApp invite',['L','Enter rent, deposit and lease dates, then send the link on WhatsApp'],['T','Open the link, check the terms, accept']],
   ['📄','Rental agreement',['L','Create a new one, scan your paper copy, or use a template'],['T','Keep your agreement on your phone']],
   ['🪪','Document locker',['T','Upload your ID once'],['L','Review the documents and mark them verified']]]},
 {ic:'🏡',name:'Living',sub:'Month to month',title:'Every month, without the back-and-forth',desc:'The everyday parts of renting, recorded once and seen by both of you.',feats:[
   ['₹','Rent records',['T','Pay by UPI, then send the receipt'],['L','Approve it, or record cash, partial or advance yourself']],
   ['⚡','Utility bills',['L','Add a bill, attach it, and choose who pays or how it\'s split'],['T','Send payment proof. See the landlord\'s note if it\'s returned']],
   ['🔧','Issues & repairs',['T','Report a problem with a photo. Reopen it if it comes back'],['L','Track it from Open to In progress to Resolved']],
   ['📇','Maintenance contacts',['L','Keep your own list of plumbers, electricians and other contacts'],['T','See the contacts your landlord shares for your property']],
   ['💬','Chat',['L','Message one tenant, or a group per property'],['T','Message your landlord without mixing it up with personal chats']],
   ['📊','Payment overview',['L','Received, pending, advance held and occupancy, per property'],['T','Your full payment history and receipt vault']]]},
 {ic:'📦',name:'Move out',sub:'Deposit & closing',title:'End a tenancy cleanly',desc:'A step-by-step move-out, so the deposit conversation is written down instead of argued about.',feats:[
   ['🗓️','Move-out details',['L','Set the move-out date, reason and notice period'],['T','See the agreed move-out date']],
   ['🔍','Inspection',['L','Record the property\'s condition and any deductions, item by item'],['T','See every deduction and the reason for it']],
   ['💰','Deposit settlement',['L','Choose full, partial or no refund, or mark it disputed'],['T','See the refund due and how it will be paid']],
   ['📜','Tenancy record',['T','A record of the stay, built from the payments that were recorded'],['L','Close the tenancy with every record kept'],'soon']]}
];
const stEl=$('[data-stages]'), prog=$('[data-prog]'), panel=$('[data-stagepanel]');
stEl.insertAdjacentHTML('beforeend',STAGES.map((s,i)=>`<button type="button" class="stage" role="tab" aria-selected="${i===2}" data-stage="${i}"><span class="n">${s.ic}</span><b>${s.name}</b><small>${s.sub}</small></button>`).join(''));
function showStage(i){
  $$('[data-stage]').forEach(b=>b.setAttribute('aria-selected',+b.dataset.stage===i));
  prog.style.width=(i/(STAGES.length-1)*75)+'%';
  const s=STAGES[i];
  panel.innerHTML=`<div class="panel-h"><div style="display:grid;gap:6px"><h3>${s.title}</h3><p>${s.desc}</p></div></div><div class="feats">${s.feats.map((f,j)=>`<div class="feat" style="animation-delay:${j*50}ms"><div class="feat-h"><span class="ic">${f[0]}</span><b>${f[1]}</b></div>${f[4]==='soon'?'<span class="soon-t">Coming soon</span>':''}<div class="lt"><div class="ln-${f[2][0]}"><em class="${f[2][0]}">${f[2][0]}</em><span>${f[2][1]}</span></div><div class="ln-${f[3][0]}"><em class="${f[3][0]}">${f[3][0]}</em><span>${f[3][1]}</span></div></div></div>`).join('')}</div>`;
}
$$('[data-stage]').forEach(b=>b.addEventListener('click',()=>showStage(+b.dataset.stage)));
showStage(2);

/* ---------- AGREEMENTS ---------- */
const MODES=[
 {ic:'✍️',name:'Create new',sub:'Fill a guided form and get a PDF',head:'Guided form → PDF',
  text:'Enter both parties, the property, rent, deposit, lock-in, notice period and escalation. Your state\'s details are included, and you can add your own clauses.',
  fields:[['Landlord','Rakesh Naik'],['Tenant','Priya Sharma'],['Rent · Deposit','₹14,000 · ₹28,000'],['Lock-in · Notice','6 months · 30 days'],['State','Goa']],scan:false},
 {ic:'📷',name:'Scan existing',sub:'Photo or PDF of your signed agreement',head:'Reading your agreement…',
  text:'Upload photos or a PDF of the agreement you already have. The app reads the text and pulls out the parties, rent, deposit, dates and clauses.',
  fields:[['Landlord','Rakesh Naik'],['Tenant','Priya Sharma'],['Monthly rent','₹14,000'],['Deposit','₹28,000'],['Period','01/10/2026 – 30/09/2027']],scan:true},
 {ic:'🎨',name:'Use a template',sub:'Pick a design, edit the clauses',head:'Template → PDF or Word',
  text:'Choose a template, switch clauses on or off, add your own, and download it as a PDF or an editable Word file.',
  fields:[['Template','Residential · Standard'],['Clauses','14 on · 3 suggested'],['Custom','"No pets on balcony"'],['Output','PDF + Word (.docx)'],['Saved','In the app, for both']],scan:false}
];
const modesEl=$('[data-modes]'), ext=$('[data-ext]'), doc=$('[data-doc]');
modesEl.innerHTML=MODES.map((m,i)=>`<button type="button" class="mode" role="tab" aria-selected="${i===1}" data-mode="${i}"><span class="ic">${m.ic}</span><span><b>${m.name}</b><small>${m.sub}</small></span></button>`).join('');
let agrTimer=[];
function showMode(i){
  agrTimer.forEach(clearTimeout); agrTimer=[];
  $$('[data-mode]').forEach(b=>b.setAttribute('aria-selected',+b.dataset.mode===i));
  const m=MODES[i];
  ext.innerHTML=`<h4>${m.head}</h4><p>${m.text}</p>${m.fields.map(f=>`<div class="xf"><span>${f[0]}</span><b>${f[1]}</b></div>`).join('')}<p class="note">✏️ You check and edit every field before anything is generated.</p>`;
  doc.classList.toggle('scanning',m.scan && !RM);
  const xs=$$('.xf',ext);
  xs.forEach((x,j)=>agrTimer.push(later(()=>x.classList.add('on'),RM?0:(m.scan?500:150)+j*(m.scan?450:120))));
  if(m.scan) agrTimer.push(later(()=>{doc.classList.remove('scanning'); $('h4',ext).textContent='Fields found ✓';}, RM?0:500+xs.length*450+200));
}
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>showMode(+b.dataset.mode)));
showMode(1);

/* ---------- DASHBOARD ---------- */
const PROPS={
 all:{n:'All',rec:41000,pen:8000,adv:6000,occ:'3 of 4',rows:[['PS','Priya · Flat 2B','Paid 3 Oct','p-ok','Paid'],['RN','Rohan · 1BHK Porvorim','₹4,000 of ₹12,000','p-due','Partial'],['AD','Anita · Shop 4','Paid + ₹6,000 advance','p-rev','Advance']]},
 '2b':{n:'Flat 2B',rec:14000,pen:0,adv:0,occ:'1 of 1',rows:[['PS','Priya · Flat 2B','Paid 3 Oct · UPI','p-ok','Paid']]},
 por:{n:'Porvorim',rec:4000,pen:8000,adv:0,occ:'1 of 2',rows:[['RN','Rohan · 1BHK','₹4,000 of ₹12,000','p-due','Partial'],['—','2BHK · vacant','Listed for rent','p-v','Listed']]},
 shop:{n:'Shop 4',rec:23000,pen:0,adv:6000,occ:'1 of 1',rows:[['AD','Anita · Shop 4','Advance covers Nov','p-rev','Advance']]}
};
const propsEl=$('[data-props]');
propsEl.innerHTML=Object.entries(PROPS).map(([k,v],i)=>`<button type="button" data-pr="${k}" aria-pressed="${i===0}">${v.n}</button>`).join('');
function countTo(el,to){
  if(RM){el.textContent=inr(to);return;}
  const from=+(el.dataset.v||0), t0=performance.now();
  el.dataset.v=to;
  (function f(t){const p=Math.min(1,(t-t0)/500), e=1-Math.pow(1-p,3); el.textContent=inr(from+(to-from)*e); if(p<1) requestAnimationFrame(f);})(t0);
}
function showProp(k){
  $$('[data-pr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pr===k));
  const p=PROPS[k];
  countTo($('[data-k="rec"]'),p.rec); countTo($('[data-k="pen"]'),p.pen); countTo($('[data-k="adv"]'),p.adv);
  $('[data-k="occ"]').textContent=p.occ;
  const pct=Math.round(p.rec/Math.max(1,p.rec+p.pen)*100);
  $('[data-k="pct"]').textContent=pct+'%'; $('[data-meter]').style.width=pct+'%';
  $('[data-tlist]').innerHTML=p.rows.map(r=>`<div class="trow"><span class="av">${r[0]}</span><div><b style="font-size:14px">${r[1]}</b><small>${r[2]}</small></div><span class="pill ${r[3]}">${r[4]}</span></div>`).join('');
}
$$('[data-pr]').forEach(b=>b.addEventListener('click',()=>showProp(b.dataset.pr)));
showProp('all');


$$('[data-goto]').forEach(b=>b.addEventListener('click',()=>{ const t=root.querySelector('#'+b.dataset.goto); if(t) t.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'}); }));

/* ---------- pause work that is off screen ---------- */
const heroSec = root.querySelector('.hero');
const io = new IntersectionObserver(entries => entries.forEach(e => {
  e.target.classList.toggle('is-off', !e.isIntersecting);
  if (e.target === heroSec) { if (e.isIntersecting && !document.hidden) startHero(); else stopHero(); }
}), { rootMargin: '120px 0px' });
root.querySelectorAll('.hero,.band,.sec').forEach(el => io.observe(el));
const onVisibility = () => { if (document.hidden) stopHero(); else if (!heroSec.classList.contains('is-off')) startHero(); };
document.addEventListener('visibilitychange', onVisibility);
if (!document.hidden) startHero(); // the observer stops it again if the hero starts off screen

return () => {
  io.disconnect(); stopHero();
  document.removeEventListener('visibilitychange', onVisibility);
  timeouts.forEach(clearTimeout); intervals.forEach(clearInterval);
  if (onResize) window.removeEventListener('resize', onResize);
};
}
