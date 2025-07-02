let preguntas = [];
let preguntaActual = 0;
let respuestasCorrectas = 0;
let retirado = false;

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
  retirado = false;
  ocultarElemento("resultadoFinal");
  mostrarElemento("game-area");
  cargarPregunta();
}

function cargarPregunta() {
  const pregunta = preguntas[preguntaActual];
  document.getElementById("questionText").textContent =
    `🌿 Pregunta ${preguntaActual + 1} / 6: ${pregunta.pregunta}`;

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
    feedback.textContent = "✅ ¡Correcto!";
    feedback.style.color = "green";
    aplicarAnimacion(feedback);
  } else {
    feedback.textContent = "❌ Incorrecto. Perdiste tus 30 TR.";
    feedback.style.color = "red";
    aplicarAnimacion(feedback);
    terminarJuego("perdiste");
    return;
  }

  if (preguntaActual === 2) {
    mostrarElemento("decision");
  } else {
    mostrarElemento("nextBtn");
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
    mensaje.textContent = "💰 ¡Te retiraste sabiamente y ganaste 40 TR!";
  } else if (respuestasCorrectas === 6) {
    mensaje.textContent = "🏆 ¡Perfecto! Completaste todo y ganaste 100 TR.";
  } else {
    mensaje.textContent = "😓 Juego terminado. No pudiste completar el desafío.";
  }

  aplicarAnimacion(mensaje);
}

function reiniciarJuego() {
  preguntas = mezclarPreguntas(preguntaSet).slice(0, 6);
  iniciarJuego();
}

// Utility
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

// Conexión wallet
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

let puntaje = 0;

function sumarTR(10) {
  puntaje += valor;
  document.getElementById("puntaje").innerText = puntaje;
}
