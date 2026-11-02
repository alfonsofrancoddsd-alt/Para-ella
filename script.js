// ====== Cámbialo a tu gusto ======
const NOMBRE = "mi amor";      // cómo le dices de cariño (sale en la portada)
const FIRMA  = "Siempre tuyo"; // cómo firmas al final de los mensajes

const FOTOS = [
  { src: "fotos/foto1.jpg", msg: "Como un girasol: donde llegas, todo se ilumina. Ese vestido amarillo se queda corto frente a tu luz, mi vida. 🌻" },
  { src: "fotos/foto2.jpg", msg: "Una flor en tu cabello y aun así la flor más linda eres tú. Tu belleza no necesita nada más que ser tú. 🌸" },
  { src: "fotos/foto3.jpg", msg: "Natural, tranquila y preciosa. Esa sencillez tuya es lo que más me enamora de ti. 💗" },
  { src: "fotos/foto4.jpg", msg: "Hasta en blanco y negro brillas con todos los colores. Tu belleza no se apaga con nada. ✨" },
  { src: "fotos/foto5.jpg", msg: "Esa mirada dulce y serena me desarma cada vez. Qué hermosa eres, de verdad, por dentro y por fuera. 🌹" },
  { src: "fotos/foto6.jpg", msg: "Con ese gesto tan tierno me robas una sonrisa siempre. Eres hermosa, y quiero que lo recuerdes todos los días. 💋" }
];

const MENSAJES = [
  { t: "No te rindas, mi amor", x: "Hay días en los que todo pesa más de la cuenta y parece que el camino no avanza. Ahí es cuando más quiero que recuerdes algo: cansarte no es fracasar. Descansa si lo necesitas, respira hondo, y luego vuelve a levantarte, porque tú no estás hecha para quedarte a medio camino." },
  { t: "Tu sueño sí vale la pena", x: "Ese sueño que llevas dentro no apareció por casualidad. Lo tienes porque eres capaz de alcanzarlo. Habrá gente que no lo entienda y días en los que dudes, pero tu sueño es tuyo, y nadie tiene derecho a hacerlo más pequeño de lo que es. Yo creo en él casi tanto como creo en ti." },
  { t: "Los pasos pequeños también cuentan", x: "No tienes que lograrlo todo hoy. Un paso pequeño, repetido todos los días, te lleva más lejos que mil planes que nunca empiezan. Si hoy solo pudiste dar un pasito, ya avanzaste. Estoy orgulloso de cada uno de ellos, aunque a veces tú no los veas." },
  { t: "Equivocarse no es fallar", x: "Los errores no te definen: te enseñan. Todas las personas que admiras tropezaron muchas veces antes de llegar a donde están. Si algo sale mal, aprende, sacúdete y sigue. Tu valor no depende de que todo salga perfecto, depende de que nunca dejes de intentarlo." },
  { t: "Eres más fuerte de lo que crees", x: "Mírate un momento: has pasado por cosas difíciles y aquí sigues, de pie, con tu sonrisa y tu forma tan bonita de ser. Esa fuerza no se ve a simple vista, pero yo la he visto. Cuando sientas que ya no puedes más, acuérdate de todo lo que ya superaste. Esa misma mujer es la que va a lograr lo que viene." },
  { t: "Siempre voy a apoyarte", x: "En lo bueno, en lo difícil y en lo que aún no sabemos, voy a estar a tu lado. Si te caes, te ayudo a levantarte. Si dudas, te recuerdo quién eres. Si lloras, te abrazo. Y cuando lo logres, voy a ser el primero en aplaudir más fuerte. No estás sola en esto, nunca." },
  { t: "No te compares con nadie", x: "Cada persona florece en su propio tiempo. Lo que otros ya lograron no le quita nada a lo tuyo, y tu ritmo no es más lento: es el tuyo. Tienes algo que nadie más tiene, y eso es justo lo que el mundo va a necesitar cuando llegues a donde quieres llegar." },
  { t: "Cuando todo parezca difícil", x: "Recuerda que las raíces crecen en silencio antes de que salga la flor. Quizá hoy no se note el avance, pero por dentro estás creciendo, aprendiendo y fortaleciéndote. Lo que hoy cuesta, mañana será la historia que cuentes con orgullo. Confía en el proceso y confía en ti." },
  { t: "Cree en ti como yo creo en ti", x: "A veces tú misma eres tu juez más duro. Pero si pudieras verte con mis ojos, verías a una mujer valiente, inteligente, hermosa y capaz de todo lo que se proponga. Habla contigo con el mismo cariño con el que yo te hablo. Mereces ese respeto y ese amor, empezando por el tuyo." },
  { t: "Sigue luchando, yo estoy aquí", x: "Pase lo que pase, no sueltes tus metas. Lucha por ellas con el corazón, con paciencia y con la certeza de que cada esfuerzo te acerca. Y si algún día te faltan las fuerzas, apóyate en mí: yo las tengo de sobra para los dos. Vamos a lograrlo, paso a paso, juntos." }
];

// ====== Lo que sigue ya funciona solo ======
const $ = id => document.getElementById(id);
const vistas = ["portada", "mFlores", "mMusica", "mFotos", "mMensajes"];
let abierto = false;

$("titulo").textContent = "Para ti, " + NOMBRE;
document.title = "Para ti, " + NOMBRE;

// estrellas y pétalos de fondo
const cielo = $("cielo");
for (let i = 0; i < 70; i++){
  const e = document.createElement("span"); e.className = "estrella";
  e.style.left = Math.random() * 100 + "%"; e.style.top = Math.random() * 100 + "%";
  const z = 1 + Math.random() * 2.2; e.style.width = e.style.height = z + "px";
  e.style.animationDelay = -Math.random() * 6 + "s"; e.style.animationDuration = 3 + Math.random() * 4 + "s";
  cielo.appendChild(e);
}
const petalos = $("petalos");
for (let i = 0; i < 18; i++){
  const p = document.createElement("span"); p.className = "petalo";
  p.style.left = Math.random() * 100 + "vw"; p.style.setProperty("--s", 10 + Math.random() * 16 + "px");
  p.style.animationDuration = 10 + Math.random() * 12 + "s"; p.style.animationDelay = -Math.random() * 22 + "s";
  petalos.appendChild(p);
}

// rosa grande de la portada
(() => {
  const svg = $("rosaPortada");
  svg.innerHTML = Rosas.rosa(150, 334, 232, 1.5, .3);
})();

// navegación
function ir(id){
  vistas.forEach(v => { $(v).hidden = v !== id; });
  if (id === "mFlores") Jardin.mostrar(); else Jardin.ocultar();
  if (id === "portada" && abierto) mostrarModulos(false);
  scrollTo(0, 0);
}
document.querySelectorAll("[data-ir]").forEach(b => b.addEventListener("click", () => ir(b.dataset.ir)));

function mostrarModulos(animar){
  $("modulos").hidden = false; $("bAbrir").hidden = true;
  $("subtitulo").textContent = "Elige qué quieres abrir primero.";
  $("modulos").classList.toggle("entra", animar);
}
$("bAbrir").addEventListener("click", () => {
  abierto = true; Musica.encender(); mostrarModulos(true);
  $("reproductor").classList.remove("oculto");
});

// ---- módulo 2: música ----
function pintarMusica(on){
  $("bPlay").textContent = on ? "⏸ Pausar" : "▶ Reproducir";
  $("rPlay").textContent = on ? "⏸" : "▶";
  $("disco").classList.toggle("gira", on);
}
Musica.alCambiar(pintarMusica);
$("bPlay").addEventListener("click", () => Musica.alternar());
$("rPlay").addEventListener("click", () => Musica.alternar());
$("vol").addEventListener("input", e => Musica.volumen(+e.target.value));
function verVideo(forzar){
  const r = $("reproductor"), abre = forzar ?? !r.classList.contains("abierto");
  r.classList.toggle("abierto", abre); $("rVer").textContent = abre ? "▾" : "▴";
  $("bVideo").textContent = abre ? "Ocultar el video" : "Ver el video";
}
$("bVideo").addEventListener("click", () => verVideo());
$("rVer").addEventListener("click", () => verVideo());

// ---- módulo 3: fotos ----
let fi = 0, tocando = null;
FOTOS.forEach((_, i) => {
  const p = document.createElement("span"); p.className = "punto"; $("puntos").appendChild(p);
});
function mostrarFoto(n, dir = 0){
  fi = (n + FOTOS.length) % FOTOS.length;
  const marco = $("marco"), msg = $("msgFoto");
  marco.classList.remove("entra-izq", "entra-der"); void marco.offsetWidth;
  if (dir) marco.classList.add(dir > 0 ? "entra-der" : "entra-izq");
  $("foto").src = FOTOS[fi].src; msg.textContent = FOTOS[fi].msg;
  msg.style.animation = "none"; void msg.offsetWidth; msg.style.animation = "";
  [...$("puntos").children].forEach((p, i) => p.classList.toggle("on", i === fi));
}
$("bPrev").addEventListener("click", () => mostrarFoto(fi - 1, -1));
$("bNext").addEventListener("click", () => mostrarFoto(fi + 1, 1));
$("marco").addEventListener("pointerdown", e => { tocando = e.clientX; });
addEventListener("pointerup", e => {
  if (tocando === null) return;
  const d = e.clientX - tocando; tocando = null;
  if (Math.abs(d) > 50) mostrarFoto(fi + (d < 0 ? 1 : -1), d < 0 ? 1 : -1);
});
addEventListener("keydown", e => {
  if ($("mFotos").hidden) return;
  if (e.key === "ArrowRight") mostrarFoto(fi + 1, 1);
  if (e.key === "ArrowLeft") mostrarFoto(fi - 1, -1);
});
mostrarFoto(0);

// ---- módulo 4: mensajes ----
const lista = $("listaMensajes");
MENSAJES.forEach((m, i) => {
  const c = document.createElement("article"); c.className = "msg";
  c.innerHTML = `<span class="num">${i + 1}</span><h3></h3><p></p>`;
  c.querySelector("h3").textContent = m.t; c.querySelector("p").textContent = m.x;
  lista.appendChild(c);
});
$("firma").innerHTML = `Con todo mi amor,<br><span>${FIRMA} 💗</span>`;
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("visto"); obs.unobserve(e.target); } }), { threshold: .15 });
lista.querySelectorAll(".msg").forEach(c => obs.observe(c));
