// Rosas rojas que se dibujan solas: primero el tallo, luego hojas y espinas,
// después cada pétalo se traza (se ve la estructura) y al final se rellena de rojo.
const Rosas = (() => {
  const r = (a, b) => a + Math.random() * (b - a);
  const f = n => +n.toFixed(1);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // pétalo en forma de concha: borde curvo arriba, base cóncava hacia el centro
  const concha = (w, h) =>
    `M${-w} 0C${f(-w * 1.15)} ${f(-h * 1.25)} ${f(w * 1.15)} ${f(-h * 1.25)} ${w} 0` +
    `C${f(w * .55)} ${f(h * .3)} ${f(-w * .55)} ${f(h * .3)} ${-w} 0Z`;

  const trazo = (t, d) => `--t:${f(t)}s;--d:${d}s`;

  function cabeza(t0){
    const N = [7, 6, 5, 4, 3], R = [34, 25, 17, 10, 4], W = [20, 17, 14, 11, 8], H = [26, 22, 18, 14, 11];
    const G = ["gP1", "gP1", "gP2", "gP2", "gP3"];
    let s = "";
    // cáliz verde por debajo de los pétalos
    for (let i = 0; i < 5; i++){
      s += `<path class="dib" pathLength="1" style="${trazo(t0 - .6 + i * .08, .6)}" fill="#2a8a4d" stroke="#15532c" stroke-width="1.2" stroke-linejoin="round" transform="rotate(${36 + i * 72})" d="M-7 -30Q-11 -52 0 -72Q11 -52 7 -30Z"/>`;
    }
    let k = 0;
    for (let j = 0; j < 5; j++){
      const off = r(0, 60);
      for (let i = 0; i < N[j]; i++){
        const ang = off + i * 360 / N[j] + j * (180 / N[j]), t = t0 + k * .1; k++;
        s += `<g transform="rotate(${f(ang)}) translate(0 ${-R[j]})">` +
          `<path class="dib" pathLength="1" style="${trazo(t, .8)}" fill="url(#${G[j]})" stroke="#4d0510" stroke-width="1.3" stroke-linejoin="round" d="${concha(W[j], H[j])}"/>` +
          `<path class="dib" pathLength="1" style="${trazo(t + .5, .6)}" fill="none" stroke="rgba(255,215,220,.55)" stroke-width="1.2" stroke-linecap="round" d="M${f(-W[j] * .55)} ${f(-H[j] * .35)}Q0 ${f(-H[j] * .95)} ${f(W[j] * .55)} ${f(-H[j] * .35)}"/>` +
          `</g>`;
      }
    }
    // espiral del centro del capullo
    let d = "";
    for (let a = 0; a <= Math.PI * 3.6; a += .25){
      const rr = 1 + a * 1.25, x = Math.cos(a) * rr, y = Math.sin(a) * rr;
      d += (a ? "L" : "M") + f(x) + " " + f(y);
    }
    s += `<path class="dib" pathLength="1" style="${trazo(t0 + k * .1 + .2, 1.2)}" fill="none" stroke="#3d040d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="${d}"/>`;
    return s;
  }

  // x,y = base del tallo · h = altura · sc = escala · t0 = retraso en segundos
  function rosa(x, y, h, sc, t0){
    const a = r(-40, 40) * sc, x2 = x + r(-30, 30) * sc, y2 = y - h;
    const c1 = [x + a, y - h * .35], c2 = [x - a, y - h * .7];
    const B = s => {
      const u = 1 - s;
      return [u * u * u * x + 3 * u * u * s * c1[0] + 3 * u * s * s * c2[0] + s * s * s * x2,
              u * u * u * y + 3 * u * u * s * c1[1] + 3 * u * s * s * c2[1] + s * s * s * y2];
    };
    const ang = s => { const p = B(s), q = B(s + .02); return Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI; };
    const T = 1.8; // segundos que tarda en crecer el tallo
    let s = `<g class="mece" style="transform-origin:${f(x)}px ${f(y)}px;animation-delay:${f(t0 + T + 3.5)}s">`;

    // tallo
    s += `<path class="dib" pathLength="1" style="${trazo(t0, T)}" fill="none" stroke="#2c8c4c" stroke-width="${f(4.5 * sc)}" stroke-linecap="round" d="M${f(x)} ${f(y)}C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(x2)} ${f(y2)}"/>`;

    // hojas
    [[.28, 1], [.55, -1]].forEach(([p, lado]) => {
      const b = B(p), L = 46 * sc, deg = ang(p) + lado * 55;
      s += `<g transform="translate(${f(b[0])} ${f(b[1])}) rotate(${f(deg)})">` +
        `<path class="dib" pathLength="1" style="${trazo(t0 + T * p + .2, 1)}" fill="url(#gHoja)" stroke="#17592f" stroke-width="1.2" stroke-linejoin="round" d="M0 0Q${f(L * .5)} ${f(-L * .38)} ${f(L)} 0Q${f(L * .5)} ${f(L * .38)} 0 0Z"/>` +
        `<path class="dib" pathLength="1" style="${trazo(t0 + T * p + 1, .6)}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1" stroke-linecap="round" d="M${f(L * .08)} 0L${f(L * .85)} 0"/>` +
        `</g>`;
    });

    // espinas
    [[.18, 1], [.4, -1], [.64, 1]].forEach(([p, lado]) => {
      const b = B(p), deg = ang(p) + lado * 75;
      s += `<path class="dib" pathLength="1" style="${trazo(t0 + T * p + .3, .5)}" fill="#1f6a3a" stroke="#15532c" stroke-width="1" stroke-linejoin="round" transform="translate(${f(b[0])} ${f(b[1])}) rotate(${f(deg)})" d="M0 -2.2L${f(8 * sc)} 0L0 2.2Z"/>`;
    });

    // flor
    s += `<g class="cabeza" transform="translate(${f(x2)} ${f(y2)}) scale(${f(sc)})">${cabeza(t0 + T - .2)}</g>`;
    return s + `</g>`;
  }

  return { rosa, r, clamp, f };
})();

// ---------- Jardín (módulo 1) ----------
const Jardin = (() => {
  if (typeof document === "undefined") return {};
  const svg = document.getElementById("jardin");
  const { r, clamp, f } = Rosas;
  let W = 0, H = 0, capa = null, activo = false;

  const suelo = x => H * .86 - Math.sin(x / W * Math.PI * 1.2 + .6) * H * .03;

  function medir(){
    W = svg.clientWidth || innerWidth; H = svg.clientHeight || innerHeight;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  }
  function colina(off, c1, c2, fase, id){
    let d = `M0 ${H}`;
    for (let x = 0; x <= W + 12; x += 12) d += `L${x} ${f(suelo(x) + fase * H * .02 - off)}`;
    return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><path d="${d}L${W} ${H}Z" fill="url(#${id})"/>`;
  }
  function fondo(){
    let s = colina(H * .05, "#1b4a2c", "#0b2014", -1, "gc1") + colina(0, "#14391f", "#07140b", 0, "gc2");
    let hierba = "";
    for (let i = 0; i < 140; i++){
      const x = Math.random() * W, y = suelo(x) + 4, h = 10 + Math.random() * 20;
      hierba += `M${f(x)} ${f(y)}q${f(r(-4, 4))} ${f(-h * .6)} ${f(r(-8, 8))} ${f(-h)}`;
    }
    s += `<path d="${hierba}" fill="none" stroke="#2f8a4f" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
    return s;
  }
  function plantar(x, retraso){
    const sc = clamp(Math.min(W, H) / 620, .6, 1.25) * r(.88, 1.12);
    const h = Math.min(H * r(.3, .48), suelo(x) - 95 * sc);
    capa.insertAdjacentHTML("beforeend", Rosas.rosa(x, suelo(x) + 4, h, sc, retraso));
  }
  function reiniciar(){
    medir();
    svg.innerHTML = `<g>${fondo()}</g><g id="capaRosas"></g>`;
    capa = svg.querySelector("#capaRosas");
    [.14, .3, .5, .7, .86].forEach((p, i) => plantar(W * p, .2 + i * 1.3));
  }

  svg.addEventListener("pointerdown", e => {
    if (!capa || capa.children.length >= 14) return;
    const b = svg.getBoundingClientRect();
    plantar(clamp(e.clientX - b.left, W * .04, W * .96), .05);
  });
  addEventListener("resize", () => { if (activo) reiniciar(); });

  return {
    mostrar(){ activo = true; reiniciar(); },
    ocultar(){ activo = false; },
    reiniciar
  };
})();

if (typeof module !== "undefined") module.exports = Rosas;
