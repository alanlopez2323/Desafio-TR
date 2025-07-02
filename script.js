let preguntas = [];
let preguntaActual = 0;
let respuestasCorrectas = 0;
let retirado = false;

document.addEventListener("DOMContentLoaded", () => {
  preguntas = [...preguntaSet]; // Desde preguntas.js
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
  document.getElementById("questionText").textContent = pregunta.pregunta;

  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";
  document.getElementById("feedback").textContent = "";
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

  if (btn.textContent === correcta) {
    respuestasCorrectas++;
    feedback.textContent = "✅ ¡Correcto!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Incorrecto. Perdiste tus 30 TR.";
    feedback.style.color = "red";
    terminarJuego("perdiste");
    return;
  }

  const buttons = document.querySelectorAll("#optionsContainer button");
  buttons.forEach(b => b.disabled = true);

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
    mensaje.textContent = "💰 ¡Te retiraste sabiamente! Ganaste 40 TR.";
  } else if (respuestasCorrectas === 6) {
    mensaje.textContent = "🏆 ¡Felicidades! Contestaste todo perfecto y ganaste 100 TR.";
  } else {
    mensaje.textContent = "😓 Juego terminado. No pudiste completar el desafío.";
  }
}

function reiniciarJuego() {
  iniciarJuego();
}

// 👉 Simulación de wallet (próximamente integración real)
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
