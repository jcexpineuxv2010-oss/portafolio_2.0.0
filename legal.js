(() => {
  document.documentElement.classList.add("js");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s) => document.querySelector(s);
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* ---------- Código con colores de VS Code (Dark+) ---------- */
  const POOL = "0123456789abcdef{}<>/;=()[]$_.λ";
  const CODE =
    'const x=await fetch(api);if(err){throw new Error(0x1F)}for(let i=0;i<n;i++){arr.push(i*2)}function init(){return()=>{}}import{sft}from"./jc";git commit -m"ship";npm run build;<div class="app">0xFF 0xA3 SELECT * FROM dev;export default{id:0x7B,ok:true}';
  const codeCh = (i) => {
    const c = CODE[i % CODE.length];
    return c === " " ? ";" : c;
  };
  const COL = (() => {
    const a = new Array(CODE.length).fill("#9cdcfe");
    const paint = (re, c, g = 0) => {
      let m;
      while ((m = re.exec(CODE))) {
        const s = m.index + (g ? m[0].indexOf(m[g]) : 0),
          l = g ? m[g].length : m[0].length;
        for (let k = s; k < s + l; k++) a[k] = c;
      }
    };
    paint(/[{}()\[\];=<>*+\-:.,]/g, "#d4d4d4");
    paint(/\b0x[0-9A-Fa-f]+\b|\b\d+\b/g, "#b5cea8");
    paint(/\b([A-Za-z_]\w*)\(/g, "#dcdcaa", 1);
    paint(
      /\b(const|let|function|return|import|from|export|default|new|git|npm|SELECT|FROM|true)\b/g,
      "#569cd6",
    );
    paint(/\b(if|for|await|throw)\b/g, "#c586c0");
    paint(/"[^"]*"/g, "#ce9178");
    return a;
  })();

  /* ---------- Progreso, botón subir y aparición ---------- */
  const bar = $('#progress'), topBtn = $('#top');
  addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
    topBtn.classList.toggle('on', scrollY > innerHeight * .6);
  }, { passive: true });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .05 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  /* ---------- Lluvia de código en toda la web (colores de VS Code) ---------- */
  const rc = $("#rain"),
    rx = rc.getContext("2d");
  let RW,
    RH,
    drops = [];
  function rainSize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    RW = innerWidth;
    RH = innerHeight;
    rc.width = RW * dpr;
    rc.height = RH * dpr;
    rx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function rainInit() {
    rainSize();
    const n = Math.min(170, Math.floor((RW * RH) / 6500));
    drops = Array.from({ length: n }, () => ({
      x: rnd(0, RW),
      y: rnd(0, RH),
      s: reduce ? 0 : rnd(0.2, 0.7),
      sz: rnd(10, 17),
      a: rnd(0.1, 0.32),
      q: Math.floor(Math.random() * CODE.length),
      ph: rnd(0, 6.28),
    }));
  }
  function rainDraw(now) {
    rx.clearRect(0, 0, RW, RH);
    rx.textAlign = "center";
    rx.textBaseline = "middle";
    for (const d of drops) {
      d.y += d.s;
      d.x += Math.sin(now / 1500 + d.ph) * (reduce ? 0 : 0.12);
      if (d.y > RH + 14) {
        d.y = -14;
        d.x = rnd(0, RW);
      }
      if (!reduce && Math.random() < 0.006)
        d.q = Math.floor(Math.random() * CODE.length);
      rx.font = `500 ${d.sz}px "JetBrains Mono",ui-monospace,monospace`;
      rx.fillStyle = COL[d.q];
      rx.globalAlpha = d.a;
      rx.fillText(codeCh(d.q), d.x, d.y);
    }
    rx.globalAlpha = 1;
  }
  function rainLoop(now) {
    requestAnimationFrame(rainLoop);
    if (!document.hidden) rainDraw(now);
  }
  rainInit();
  if (reduce) rainDraw(0);
  else requestAnimationFrame(rainLoop);
  let rw = innerWidth;
  addEventListener("resize", () => {
    if (Math.abs(innerWidth - rw) > 80) {
      rw = innerWidth;
      rainInit();
    } else rainSize();
  });
  /* ---------- Estado de pestaña: conexión perdida / restablecida ---------- */
  const tituloOriginal = document.title;
  let toastTimer = null;

  function mostrarToastReconexion() {
    let toast = $("#toast-reconexion");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-reconexion";
      toast.setAttribute("role", "status");
      toast.innerHTML =
        '<span class="toast-cmd">// CONEXIÓN RESTABLECIDA</span>' +
        '<span class="toast-sub">Bienvenido/a de vuelta a la casa.</span>';
      document.body.appendChild(toast);
    }

    toast.classList.remove("show");
    void toast.offsetWidth; // reinicia animación si vuelve rápido
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.title = "// conexión perdida_";
    } else {
      document.title = tituloOriginal;
      mostrarToastReconexion();
    }
  });
})();