// firebase.js
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import app from './firebase-config.js';

const db = getFirestore(app);

// Crea un nuevo jugador si no existe
export async function registrarJugador(wallet) {
  const ref = doc(db, "jugadores", wallet);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      wallet,
      nombre: "",         // Podés agregar nombre después
      puntaje: 0,
      nivel: "Iniciado",
      medallas: [],
      girosRuleta: 0,
      ultimaConexion: Date.now()
    });
  }
}

// Obtiene datos del jugador
export async function obtenerJugador(wallet) {
  const ref = doc(db, "jugadores", wallet);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// Suma TR al jugador
export async function sumarTR(wallet, cantidad) {
  const ref = doc(db, "jugadores", wallet);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const actual = snap.data().puntaje || 0;
    await updateDoc(ref, {
      puntaje: actual + cantidad,
      ultimaConexion: Date.now()
    });
  }
}

// Actualiza el nivel del jugador
export async function actualizarNivel(wallet, nuevoNivel) {
  const ref = doc(db, "jugadores", wallet);
  await updateDoc(ref, { nivel: nuevoNivel });
}

// Agrega una medalla (sin repetir)
export async function guardarMedalla(wallet, medallaId) {
  const ref = doc(db, "jugadores", wallet);
  await updateDoc(ref, {
    medallas: arrayUnion(medallaId)
  });
}
