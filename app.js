// ===================== STATE =====================
let currentLang = localStorage.getItem('vp_lang') || 'en';
let currentTheme = localStorage.getItem('vp_theme') || 'light';

// ===================== NAVIGATION =====================
function navigateTo(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target = document.getElementById('page-'+page);
  if(target){
    target.classList.add('active');
  } else {
    console.warn(`navigateTo: no section found for page "${page}" (expected id="page-${page}")`);
  }
  document.querySelectorAll('.nav-bottom a').forEach(a=>{
    a.classList.toggle('active', a.dataset.page === page);
  });
  window.scrollTo({top:0,behavior:'smooth'});
  document.getElementById('navMenu').classList.remove('show');
  if(page === 'admin') checkAdminAccess();
}

document.getElementById('navMenu').addEventListener('click', e=>{
  const link = e.target.closest('a[data-page]');
  if(!link) return;
  e.preventDefault();
  navigateTo(link.dataset.page);
});

document.getElementById('hamburger').addEventListener('click', ()=>{
  document.getElementById('navMenu').classList.toggle('show');
});

// ===================== LANGUAGE TOGGLE =====================
function applyLanguage(){
  document.querySelectorAll('[data-en]').forEach(el=>{
    const val = el.dataset[currentLang] || el.dataset.en;
    el.textContent = val;
  });
  document.querySelectorAll('[data-en-ph]').forEach(el=>{
    el.placeholder = el.dataset[currentLang+'-ph'] || el.dataset['en-ph'];
  });
  document.getElementById('htmlRoot').lang = currentLang;
  localStorage.setItem('vp_lang', currentLang);
}
document.getElementById('langToggle').addEventListener('click', ()=>{
  currentLang = currentLang === 'en' ? 'te' : 'en';
  applyLanguage();
  renderAll();
});

// ===================== THEME TOGGLE =====================
function applyTheme(){
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.getElementById('themeToggle').textContent = currentTheme === 'light' ? '🌙' : '☀️';
  localStorage.setItem('vp_theme', currentTheme);
}
document.getElementById('themeToggle').addEventListener('click', ()=>{
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme();
});

// ===================== TOAST =====================
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2800);
}

// ===================== RENDER HELPERS =====================
function L(item){ return currentLang==='te' ? (item.te||item.en) : item.en; }


function renderSimpleGrid(containerId, list){
  const el = document.getElementById(containerId);
  el.innerHTML = list.map(it=>{
    const title = L(it).replace(/'/g, "");
    const desc = it.desc ? `<p>${currentLang==='te' ? (it.descTe || it.desc) : it.desc}</p>` : '';
    const meta = it.num ? `<p class="meta">📞 ${it.num}</p>` : '';
    if(it.link){
      return `
      <a class="card" href="${it.link}" target="_blank" rel="noopener">
        <div class="icon">${it.icon}</div>
        <h3>${L(it)}</h3>
        ${desc}
        ${meta}
      </a>`;
    }
    return `
      <div class="card" onclick="showToast('${title} - more details coming soon')">
        <div class="icon">${it.icon}</div>
        <h3>${L(it)}</h3>
        ${desc}
        ${meta}
      </div>`;
  }).join('');
}

function renderQuickGrid(){
  document.getElementById('quickGrid').innerHTML = QUICK_ACCESS.map(q=>`
    <div class="qcard" onclick="navigateTo('${q.page}')">
      <span class="qicon">${q.icon}</span>${L(q)}
    </div>`).join('');
}

function renderUpdates(){
  document.getElementById('updatesList').innerHTML = UPDATES.map(u=>`
    <div class="update-item">
      <div class="date">${u.date}</div>
      <div>${L(u)}</div>
    </div>`).join('');
}

function renderSchemes(tab='central'){
  const list = SCHEMES[tab];
  document.getElementById('schemesGrid').innerHTML = list.map(s=>`
    <div class="card">
      <div class="icon">${s.icon}</div>
      <h3>${s.name}</h3>
      <p class="meta"><b>Eligibility:</b> ${s.eligibility}</p>
      <p class="meta"><b>Documents:</b> ${s.documents}</p>
      <p class="meta"><b>Benefits:</b> ${s.benefits}</p>
      <p class="meta"><b>Last Date:</b> ${s.lastDate}</p>
      <a class="apply-link" href="${s.link}" target="_blank" rel="noopener">Apply Now →</a>
    </div>`).join('');
}

function renderWeatherMarket(){
  document.getElementById('weatherMarket').innerHTML = WEATHER_MARKET.map(w=>`
    <div class="info-card"><b>${L(w)}</b><div style="margin-top:6px;font-size:1.1rem;color:var(--green-dark)">${w.value}</div></div>
  `).join('');
}

function renderAll(){
  renderQuickGrid();
  renderUpdates();
  renderSchemes(document.querySelector('.tabs .tab-btn.active')?.dataset.tab || 'central');
  renderSimpleGrid('landGrid', LAND_SERVICES);
  renderSimpleGrid('agriGrid', AGRI_SERVICES);
  renderWeatherMarket();
  renderSimpleGrid('jobsGrid', JOBS);
  renderSimpleGrid('businessGrid', BUSINESS);
  renderSimpleGrid('healthGrid', HEALTH);
  renderSimpleGrid('eduGrid', EDUCATION);
  renderSimpleGrid('transportGrid', TRANSPORT);
  renderSimpleGrid('villageServicesGrid', VILLAGE_SERVICES);
  renderSimpleGrid('marketGrid', MARKETPLACE);
  renderSimpleGrid('emergencyGrid', EMERGENCY);
  renderSimpleGrid('devGrid', DEVELOPMENT);
}

// Scheme tabs
document.querySelectorAll('.tabs .tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tabs .tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderSchemes(btn.dataset.tab);
  });
});

// ===================== SEARCH =====================
function performSearch(){
  const q = document.getElementById('globalSearch').value.trim().toLowerCase();
  if(!q) return;
  const haystacks = [
    ...SCHEMES.central.map(s=>({n:s.name,page:'schemes'})),
    ...SCHEMES.state.map(s=>({n:s.name,page:'schemes'})),
    ...LAND_SERVICES.map(s=>({n:s.en,page:'land'})),
    ...AGRI_SERVICES.map(s=>({n:s.en,page:'agriculture'})),
    ...JOBS.map(s=>({n:s.en,page:'jobs'})),
    ...HEALTH.map(s=>({n:s.en,page:'health'})),
    ...EDUCATION.map(s=>({n:s.en,page:'education'})),
    ...VILLAGE_SERVICES.map(s=>({n:s.en,page:'villageservices'})),
  ];
  const match = haystacks.find(h=>h.n.toLowerCase().includes(q));
  if(match){
    navigateTo(match.page);
    showToast(`Found results for "${q}" in ${match.page}`);
  } else {
    showToast(`No results found for "${q}"`);
  }
}
document.getElementById('globalSearch').addEventListener('keydown', e=>{
  if(e.key==='Enter') performSearch();
});

// ===================== COMPLAINTS =====================
function getComplaints(){ return JSON.parse(localStorage.getItem('vp_complaints')||'[]'); }
function saveComplaints(list){ localStorage.setItem('vp_complaints', JSON.stringify(list)); }

document.getElementById('complaintForm').addEventListener('submit', e=>{
  e.preventDefault();
  const list = getComplaints();
  const id = 'CMP-' + (1000 + list.length + 1);
  list.push({
    id, name: compName.value, phone: compPhone.value,
    category: compCategory.value, desc: compDesc.value,
    status: 'Submitted', date: new Date().toLocaleDateString()
  });
  saveComplaints(list);
  showToast(`Complaint submitted! ID: ${id}`);
  e.target.reset();
  renderMyComplaints();
});

function trackComplaint(){
  const id = document.getElementById('trackId').value.trim();
  const list = getComplaints();
  const found = list.find(c=>c.id === id);
  document.getElementById('trackResult').innerHTML = found
    ? `<div class="update-item"><b>${found.id}</b> — ${found.category}<br>Status: <b>${found.status}</b><br>${found.date}</div>`
    : `<p class="meta">No complaint found with that ID.</p>`;
}

function renderMyComplaints(){
  const list = getComplaints();
  document.getElementById('myComplaints').innerHTML = list.slice(-5).reverse().map(c=>`
    <div class="update-item"><b>${c.id}</b> - ${c.category} <span class="meta">(${c.status})</span></div>
  `).join('') || '<p class="meta">No complaints yet.</p>';
}

// ===================== ADMIN =====================
function checkAdminAccess(){
  const user = JSON.parse(localStorage.getItem('vp_currentUser')||'null');
  const locked = document.getElementById('adminLocked');
  const dash = document.getElementById('adminDashboard');
  if(user && user.role === 'admin'){
    locked.style.display='none';
    dash.style.display='block';
    renderAdminDashboard();
  } else {
    locked.style.display='block';
    dash.style.display='none';
  }
}

function renderAdminDashboard(){
  const complaints = getComplaints();
  const users = JSON.parse(localStorage.getItem('vp_users')||'[]');
  document.getElementById('dashboardStats').innerHTML = `
    <div class="stat-card"><div class="num">${SCHEMES.central.length+SCHEMES.state.length}</div>Schemes</div>
    <div class="stat-card"><div class="num">${BUSINESS.length}</div>Businesses</div>
    <div class="stat-card"><div class="num">${complaints.length}</div>Complaints</div>
    <div class="stat-card"><div class="num">${users.length}</div>Registered Users</div>
  `;
  renderAdminTab('schemes');
}

function renderAdminTab(tab){
  const content = document.getElementById('adminContent');
  if(tab==='schemes'){
    content.innerHTML = `<h3>Add New Scheme</h3>
      <input id="adSchemeName" placeholder="Scheme Name">
      <input id="adSchemeBenefit" placeholder="Benefits">
      <button class="btn btn-primary" onclick="addScheme()">Add Scheme</button>
      <div id="adSchemeList" style="margin-top:14px"></div>`;
    document.getElementById('adSchemeList').innerHTML = SCHEMES.state.map(s=>`<div class="update-item">${s.name}</div>`).join('');
  } else if(tab==='announce'){
    content.innerHTML = `<h3>New Announcement</h3>
      <input id="adAnnounce" placeholder="Announcement text">
      <button class="btn btn-primary" onclick="addAnnouncement()">Publish</button>`;
  } else if(tab==='bus'){
    content.innerHTML = `<h3>Manage Businesses</h3>` + BUSINESS.map(b=>`<div class="update-item">${b.en}</div>`).join('');
  } else if(tab==='comp'){
    const list = getComplaints();
    content.innerHTML = `<h3>All Complaints</h3>` + (list.map(c=>`
      <div class="update-item">${c.id} - ${c.category} - ${c.status}
      <button class="btn btn-outline" style="margin-top:6px" onclick="resolveComplaint('${c.id}')">Mark Resolved</button></div>`).join('') || '<p class="meta">No complaints.</p>');
  } else if(tab==='users'){
    const users = JSON.parse(localStorage.getItem('vp_users')||'[]');
    content.innerHTML = `<h3>Registered Users</h3>` + (users.map(u=>`<div class="update-item">${u.name} — ${u.email}</div>`).join('') || '<p class="meta">No users yet.</p>');
  }
}
document.querySelectorAll('[data-admintab]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('[data-admintab]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderAdminTab(btn.dataset.admintab);
  });
});
function addScheme(){
  const name = document.getElementById('adSchemeName').value;
  if(!name) return;
  SCHEMES.state.push({name, icon:"📌", eligibility:"TBD", documents:"TBD", benefits:document.getElementById('adSchemeBenefit').value||"TBD", lastDate:"Ongoing", link:"#"});
  showToast('Scheme added!');
  renderAdminTab('schemes');
}
function addAnnouncement(){
  const text = document.getElementById('adAnnounce').value;
  if(!text) return;
  UPDATES.unshift({date:new Date().toLocaleDateString(), en:text, te:text});
  renderUpdates();
  showToast('Announcement published!');
}
function resolveComplaint(id){
  const list = getComplaints();
  const c = list.find(x=>x.id===id);
  if(c){ c.status='Resolved'; saveComplaints(list); renderAdminTab('comp'); renderAdminDashboard(); }
}

// ===================== INIT =====================
applyLanguage();
applyTheme();
renderAll();
renderMyComplaints();
navigateTo('home');
