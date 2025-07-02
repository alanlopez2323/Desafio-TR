let preguntas = [];
let preguntaActual = 0;
let respuestasCorrectas = 0;
let puntaje = 0;
let retirado = false;

const TRporPregunta = [10, 10, 20, 20, 20, 20];

document.addEventListener("DOMContentLoaded", () => {
  preguntas = mezclarPreguntas(preguntaSet).slice(0, 6);
  iniciarJuego();
  document.getElementById("connectWallet").addEventListener("click", conectarWallet);
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document.getElementById("retirarseBtn").addEventListener("click", retirarse);
  document.getElementById("seguirBtn").addEventListener("click", seguir);
  document.getElementById("reiniciarBtn").addEventListener("click", reiniciarJuego);
});

function iniciarJuego() {
  preguntaActual = 0;
  respuestasCorrectas = 0;
  puntaje = 0;
  retirado = false;
  document.getElementById("puntaje").innerText = puntaje;
  ocultarElemento("resultadoFinal");
  mostrarElemento("game-area");
  cargarPregunta();
}

function cargarPregunta() {
  const pregunta = preguntas[preguntaActual];

  if (!pregunta) {
    terminarJuego("fin");
    return;
  }

  document.getElementById("questionText").textContent =
    `🌿 Pregunta ${preguntaActual + 1} / ${preguntas.length}: ${pregunta.pregunta}`;

  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";

  const feedback = document.getElementById("feedback");
  feedback.textContent = "";
  feedback.className = "";
  ocultarElemento("nextBtn");

  pregunta.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.className = "opcion";
    btn.onclick = () => validarRespuesta(btn, pregunta.correcta);
    optionsContainer.appendChild(btn);
  });
}

function validarRespuesta(btn, correcta) {
  const feedback = document.getElementById("feedback");
  const buttons = document.querySelectorAll("#optionsContainer button");
  buttons.forEach(b => b.disabled = true);

  if (btn.textContent === correcta) {
    respuestasCorrectas++;
    const TRGanados = TRporPregunta[preguntaActual];
    sumarTR(TRGanados);

    feedback.textContent = "✅ ¡Correcto!";
    feedback.style.color = "green";
    aplicarAnimacion(feedback);

    if (preguntaActual === 2) {
      document.getElementById("retirarseBtn").innerText = `Retirarse con ${puntaje} TR`;
      mostrarElemento("decision");
    } else {
      mostrarElemento("nextBtn");
    }
  } else {
    feedback.textContent = "❌ Incorrecto. Perdiste tus 30 TR.";
    feedback.style.color = "red";
    aplicarAnimacion(feedback);
    terminarJuego("perdiste");
  }
}

function nextQuestion() {
  ocultarElemento("decision");
  preguntaActual++;
  cargarPregunta();
}

function retirarse() {
  retirado = true;
  terminarJuego("retiro");
}

function seguir() {
  ocultarElemento("decision");
  preguntaActual++;
  cargarPregunta();
}

function terminarJuego(resultado) {
  ocultarElemento("game-area");
  mostrarElemento("resultadoFinal");
  const mensaje = document.getElementById("mensajeFinal");

  if (resultado === "retiro") {
    mensaje.textContent = `💼 Te retiraste sabiamente y ganaste ${puntaje} TR.`;
  } else if (resultado === "perdiste") {
    mensaje.textContent = "😓 Juego terminado. No pudiste completar el desafío.";
  } else if (puntaje >= 100) {
    mensaje.textContent = "🏆 ¡Perfecto! Completaste todo y ganaste 100 TR.";
  } else if (puntaje >= 60) {
    mensaje.textContent = `💪 ¡Bien hecho! Obtuviste ${puntaje} TR. ¡Vas por buen camino!`;
  } else {
    mensaje.textContent = `🌱 Sumaste ${puntaje} TR. ¡Seguí practicando, kp!`;
  }

  aplicarAnimacion(mensaje);
}

function reiniciarJuego() {
  preguntas = mezclarPreguntas(preguntaSet).slice(0, 6);
  iniciarJuego();
}

// 🎯 Función de puntaje
function sumarTR(valor) {
  puntaje += valor;
  document.getElementById("puntaje").innerText = puntaje;
  mostrarTRFlotante(valor);
  animarContadorTR();
}

// 💫 TR flotante
function mostrarTRFlotante(valor) {
  const tr = document.createElement("div");
  tr.innerText = `+${valor} TR`;
  tr.className = "tr-flotante";

  const ref = document.getElementById("contadorTR");
  const { top, left, width } = ref.getBoundingClientRect();
  tr.style.left = `${left + width / 2}px`;
  tr.style.top = `${top}px`;

  document.body.appendChild(tr);
  setTimeout(() => tr.remove(), 1000);
}

// ✨ Brillo en el contador al sumar TR
function animarContadorTR() {
  const contador = document.getElementById("contadorTR");
  contador.classList.add("pulse");
  setTimeout(() => contador.classList.remove("pulse"), 400);
}

// Utilidades
function mezclarPreguntas(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function aplicarAnimacion(elemento) {
  elemento.classList.remove("pulse");
  void elemento.offsetWidth;
  elemento.classList.add("pulse");
}

function mostrarElemento(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "block";
}

function ocultarElemento(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}

// 🔐 Wallet
async function conectarWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const wallet = accounts[0];
      document.getElementById("walletAddress").textContent =
        `💼 Wallet: ${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
    } catch (error) {
      alert("No se pudo conectar la wallet.");
    }
  } else {
    alert("Instalá Metamask para usar esta función.");
  }
}
