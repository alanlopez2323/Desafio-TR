// ==== Navegación ====
const views = document.querySelectorAll('.view');
const backBtn = document.getElementById('backBtn');
const viewTitle = document.getElementById('viewTitle');
const menuItems = document.querySelectorAll('.menu-list li');
const hamburger = document.getElementById('hamburger');
const menuList = document.querySelector('.menu-list');

function hideAll() {
  views.forEach(v => v.classList.remove('active'));
}

function showView(id, title) {
  hideAll();
  document.getElementById(id).classList.add('active');
  viewTitle.textContent = title || 'Desafío TR';
  backBtn.style.display = id === 'view-home' ? 'none' : 'inline';
  if (window.innerWidth < 768) menuList.classList.remove('open');
}

menuItems.forEach(li => {
  li.addEventListener('click', () => {
    const v = li.getAttribute('data-view');
    showView(v, li.textContent);
  });
});

backBtn.addEventListener('click', () => showView('view-home', 'Menú Principal'));
hamburger.addEventListener('click', () => menuList.classList.toggle('open'));
showView('view-home', 'Menú Principal');


// ==== Modo oscuro ====
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});


// ==== Conexión Wallet (simulada) ====
const connectBtn = document.getElementById('connectWallet');
connectBtn.addEventListener('click', () => {
  const connected = !connectBtn.classList.toggle('connected');
  connectBtn.textContent = connected ? 'Conectar Wallet' : 'Desconectar';
  if (!connected) alert('Wallet conectada con éxito!');
});


// ==== Ruleta TR ====
const ruletaEl = document.getElementById('ruleta');
const spinBtn = document.getElementById('spinBtn');

spinBtn.addEventListener('click', () => {
  const premios = [5, 10, 20, 50, 0, 100];
  const premio = premios[Math.floor(Math.random() * premios.length)];
  ruletaEl.classList.add('spin');
  setTimeout(() => {
    ruletaEl.classList.remove('spin');
    alert(`¡Ganaste ${premio} TR!`);
    const actual = parseInt(document.getElementById('puntaje').textContent, 10);
    document.getElementById('puntaje').textContent = actual + premio;
  }, 4000);
});
