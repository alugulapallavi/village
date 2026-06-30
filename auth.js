// ===================== AUTH (Demo client-side; replace with real API calls to backend) =====================

function getUsers(){ return JSON.parse(localStorage.getItem('vp_users')||'[]'); }
function saveUsers(list){ localStorage.setItem('vp_users', JSON.stringify(list)); }
function getCurrentUser(){ return JSON.parse(localStorage.getItem('vp_currentUser')||'null'); }

const authModal = document.getElementById('authModal');
document.getElementById('loginBtn').addEventListener('click', ()=>{
  const user = getCurrentUser();
  if(user){
    // already logged in -> sign out
    localStorage.removeItem('vp_currentUser');
    updateAuthUI();
    showToast('Signed out successfully');
  } else {
    authModal.classList.add('show');
  }
});
document.getElementById('closeAuth').addEventListener('click', ()=> authModal.classList.remove('show'));
authModal.addEventListener('click', e=>{ if(e.target===authModal) authModal.classList.remove('show'); });

// Auth tabs
document.querySelectorAll('.auth-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f=>f.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.authtab+'Form').classList.add('active');
  });
});

// Login
document.getElementById('loginForm').addEventListener('submit', e=>{
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value;

  // Demo admin account
  if(email==='admin@village.gov.in' && pass==='admin123'){
    localStorage.setItem('vp_currentUser', JSON.stringify({name:'Admin', email, role:'admin'}));
    authModal.classList.remove('show');
    updateAuthUI();
    showToast('Welcome back, Admin!');
    return;
  }

  const users = getUsers();
  const found = users.find(u=>u.email===email && u.password===pass);
  if(found){
    localStorage.setItem('vp_currentUser', JSON.stringify({name:found.name, email:found.email, role:'user'}));
    authModal.classList.remove('show');
    updateAuthUI();
    showToast(`Welcome back, ${found.name}!`);
  } else {
    showToast('Invalid email or password.');
  }
});

// Register
document.getElementById('registerForm').addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const password = document.getElementById('regPassword').value;

  const users = getUsers();
  if(users.some(u=>u.email===email)){
    showToast('Account already exists. Please sign in.');
    return;
  }
  users.push({name,email,phone,password});
  saveUsers(users);
  localStorage.setItem('vp_currentUser', JSON.stringify({name,email,role:'user'}));
  authModal.classList.remove('show');
  updateAuthUI();
  showToast(`Account created. Welcome, ${name}!`);
});

function updateAuthUI(){
  const user = getCurrentUser();
  const loginBtn = document.getElementById('loginBtn');
  if(user){
    loginBtn.textContent = `${user.name.split(' ')[0]} (Sign Out)`;
  } else {
    loginBtn.dataset.en = 'Sign In';
    loginBtn.dataset.te = 'సైన్ ఇన్';
    loginBtn.textContent = currentLang==='te' ? 'సైన్ ఇన్' : 'Sign In';
  }
}
updateAuthUI();
