let preguntas = [];
let preguntaActual = 0;
let respuestasCorrectas = 0;
let retirado = false;

document.addEventListener("DOMContentLoaded", () => {
  preguntas = mezclarPreguntas(preguntaSet).slice(0, 6);
  iniciarJuego();
  document.getElementById("connectWallet").addEventListener("click", conectarWallet);
});

function iniciarJuego() {
  preguntaActual = 0;
  respuestasCorrectas = 0;
  retirado = false;
  document.getElementById("resultadoFinal").style.display = "none";
  document.getElementById("game-area").style.display = "block";
  cargarPregunta();
}

function cargarPregunta() {
  const pregunta = preguntas[preguntaActual];
  document.getElementById("questionText").textContent = `Pregunta ${preguntaActual + 1} / 6: ${pregunta.pregunta}`;

  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";
  const feedback = document.getElementById("feedback");
  feedback.textContent = "";
  feedback.className = ""; // Reiniciar clase de animación
  document.getElementById("nextBtn").style.display = "none";

  pregunta.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
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
    document.getElementById("decision").style.display = "block";
  } else {
    document.getElementById("nextBtn").style.display = "inline-block";
  }
}

function nextQuestion() {
  document.getElementById("decision").style.display = "none";
  preguntaActual++;
  cargarPregunta();
}

function retirarse() {
  retirado = true;
  terminarJuego("retiro");
}

function seguir() {
  document.getElementById("decision").style.display = "none";
  preguntaActual++;
  cargarPregunta();
}

function terminarJuego(resultado) {
  document.getElementById("game-area").style.display = "none";
  document.getElementById("resultadoFinal").style.display = "block";

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

// 🎲 Función para mezclar preguntas
function mezclarPreguntas(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// 🌀 Reinicia animación cada vez que hay texto nuevo
function aplicarAnimacion(elemento) {
  elemento.classList.remove("pulse");
  void elemento.offsetWidth; // Reiniciar
  elemento.classList.add("pulse");
}

// 🔗 Conexión básica de wallet con Metamask
async function conectarWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const wallet = accounts[0];
      document.getElementById("walletAddress").textContent = `💼 Wallet: ${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
    } catch (error) {
      alert("No se pudo conectar la wallet.");
    }
  } else {
    alert("Instalá Metamask para usar esta función.");
  }
}
