// Música de fondo con el reproductor de YouTube (Iris · Goo Goo Dolls).
// Opcional: si pones un archivo "musica.mp3" en esta carpeta, se usa como respaldo si YouTube no carga.
const Musica = (() => {
  const VIDEO = "139ZqczxiHs";
  const el = id => document.getElementById(id);
  const mp3 = new Audio(); mp3.loop = true; mp3.volume = .7; mp3.preload = "none";
  let yt = null, listo = false, quiere = false, sonando = false, usaMp3 = false, mp3Ok = null, vol = 70, espera = null;
  const oyentes = [];
  const avisar = () => oyentes.forEach(fn => fn(sonando));
  const poner = v => { if (sonando !== v){ sonando = v; avisar(); } };
  const enFile = location.protocol === "file:";

  // ¿existe musica.mp3? (si no, se ignora en silencio)
  mp3.src = "musica.mp3";
  mp3.addEventListener("error", () => { mp3Ok = false; if (usaMp3) avisoFallo(); });
  mp3.addEventListener("canplay", () => { mp3Ok = true; });

  function avisoFallo(){ el("avisoMusica").hidden = false; }
  el("cerrarAviso").addEventListener("click", () => { el("avisoMusica").hidden = true; });

  function respaldo(){
    // YouTube no pudo: intenta con musica.mp3, y si no existe avisa
    usaMp3 = true;
    if (mp3Ok === false){ avisoFallo(); return; }
    if (quiere) mp3.play().then(() => poner(true)).catch(() => avisoFallo());
  }

  // Si tras pulsar play no empieza a sonar en unos segundos, avisa / usa el respaldo
  function vigilar(){
    clearTimeout(espera);
    espera = setTimeout(() => { if (quiere && !sonando && !usaMp3) respaldo(); }, 5000);
  }

  window.onYouTubeIframeAPIReady = () => {
    const vars = { playsinline: 1, rel: 0, loop: 1, playlist: VIDEO, modestbranding: 1, enablejsapi: 1 };
    if (!enFile) vars.origin = location.origin;
    yt = new YT.Player("ytPlayer", {
      width: "100%", height: "100%", videoId: VIDEO, playerVars: vars,
      events: {
        onReady(){ listo = true; yt.setVolume(vol); if (quiere){ yt.playVideo(); vigilar(); } },
        onStateChange(e){
          if (e.data === 1){ clearTimeout(espera); poner(true); }
          else if (e.data === 2 || e.data === 0) poner(false);
        },
        onError: respaldo
      }
    });
  };
  const s = document.createElement("script");
  s.src = "https://www.youtube.com/iframe_api"; s.onerror = respaldo;
  document.head.appendChild(s);

  function encender(){
    quiere = true;
    if (usaMp3){ mp3.play().then(() => poner(true)).catch(() => avisoFallo()); return; }
    if (listo){ yt.setVolume(vol); yt.playVideo(); }
    vigilar();
  }
  function pausar(){
    quiere = false; clearTimeout(espera);
    if (usaMp3){ mp3.pause(); poner(false); }
    else if (listo) yt.pauseVideo();
  }
  function volumen(v){ vol = v; mp3.volume = v / 100; if (listo) yt.setVolume(v); }

  return {
    encender, pausar, volumen,
    alternar(){ sonando ? pausar() : encender(); },
    get sonando(){ return sonando; },
    alCambiar(fn){ oyentes.push(fn); }
  };
})();
