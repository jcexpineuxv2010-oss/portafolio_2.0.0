(() => {
  document.documentElement.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = s => document.querySelector(s);
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* ---------- Código con colores de VS Code (Dark+) ---------- */
  const POOL = '0123456789abcdef{}<>/;=()[]$_.λ';
  const CODE = 'const x=await fetch(api);if(err){throw new Error(0x1F)}for(let i=0;i<n;i++){arr.push(i*2)}function init(){return()=>{}}import{sft}from"./jc";git commit -m"ship";npm run build;<div class="app">0xFF 0xA3 SELECT * FROM dev;export default{id:0x7B,ok:true}';
  const codeCh = i => { const c = CODE[i % CODE.length]; return c === ' ' ? ';' : c; };
  const COL = (() => {
    const a = new Array(CODE.length).fill('#9cdcfe');
    const paint = (re, c, g = 0) => {
      let m;
      while ((m = re.exec(CODE))) {
        const s = m.index + (g ? m[0].indexOf(m[g]) : 0), l = g ? m[g].length : m[0].length;
        for (let k = s; k < s + l; k++) a[k] = c;
      }
    };
    paint(/[{}()\[\];=<>*+\-:.,]/g, '#d4d4d4');
    paint(/\b0x[0-9A-Fa-f]+\b|\b\d+\b/g, '#b5cea8');
    paint(/\b([A-Za-z_]\w*)\(/g, '#dcdcaa', 1);
    paint(/\b(const|let|function|return|import|from|export|default|new|git|npm|SELECT|FROM|true)\b/g, '#569cd6');
    paint(/\b(if|for|await|throw)\b/g, '#c586c0');
    paint(/"[^"]*"/g, '#ce9178');
    return a;
  })();

  /* ---------- Intro de arranque (estilo terminal) ---------- */
  const LINES = ['> init jc.sft.sys', '> montando /portafolio ....... [ OK ]', '> cargando módulos ......... [ OK ]', '> acceso concedido_'];
  function boot() {
    return new Promise(res => {
      const el = $('#boot'), log = $('#bootlog');
      let i = 0, done = false;
      try { if (sessionStorage.getItem('jc-boot')) i = 99; } catch (e) {}
      if (reduce) { el.remove(); return res(); }
      const finish = () => {
        if (done) return; done = true;
        try { sessionStorage.setItem('jc-boot', '1'); } catch (e) {}
        el.classList.add('off'); setTimeout(() => el.remove(), 700); res();
      };
      const step = () => {
        if (i < LINES.length) { log.textContent += LINES[i++] + '\n'; setTimeout(step, 380); }
        else setTimeout(finish, i === 99 ? 0 : 450);
      };
      el.addEventListener('click', () => { i = 99; finish(); });
      step();
    });
  }

  /* ---------- Logo formado con partículas de código ---------- */
  const cv = $('#c'), ctx = cv.getContext('2d');
  let W, H, cell, parts = [], bg = [], mouse = { x: -999, y: -999 }, t0 = 0, visible = true, shown = false, lastW = 0, lastH = 0;

  function build() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight; lastW = innerWidth; lastH = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cell = W < 600 ? 7 : 9;
    const cols = Math.floor(Math.min(W * 0.92, H * 0.62) / cell), rows = cols, k = 4;
    const o = document.createElement('canvas'); o.width = cols * k; o.height = rows * k;
    const g = o.getContext('2d'), N = o.width, c = N / 2;
    g.fillStyle = g.strokeStyle = '#fff';
    g.lineWidth = N * 0.03; g.beginPath(); g.arc(c, c, c - N * 0.02, 0, Math.PI * 2); g.stroke();
    g.font = `700 ${N * 0.21}px "Source Serif 4",Georgia,serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineWidth = N * 0.01; g.lineJoin = 'round';
    g.strokeText('jc.sft', c, c + N * 0.015); g.fillText('jc.sft', c, c + N * 0.015);
    const d = g.getImageData(0, 0, N, N).data;
    const ox = (W - cols * cell) / 2, oy = (H - rows * cell) / 2 - H * 0.1;
    parts = [];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      let a = 0;
      for (let y = 0; y < k; y++) for (let x = 0; x < k; x++) a += d[((j * k + y) * N + i * k + x) * 4 + 3];
      a /= 255 * k * k;
      if (a < .25) continue;
      const ring = Math.hypot(i - cols / 2, j - rows / 2) > cols * 0.4;
      const tx = ox + i * cell + cell / 2, ty = oy + j * cell + cell / 2, q = (j * 53 + i) % CODE.length;
      parts.push({
        tx, ty, x: reduce ? tx : rnd(0, W), y: reduce ? ty : rnd(-H * 0.3, H), vx: 0, vy: 0,
        ch: codeCh(q), cur: POOL[Math.floor(Math.random() * POOL.length)], col: COL[q], a, ring,
        delay: reduce ? 0 : rnd(0.4, 3.2), ph: Math.random() * 6.28
      });
    }
    bg = Array.from({ length: Math.floor(W * H / 7000) }, () => ({ x: rnd(0, W), y: rnd(0, H), s: rnd(.15, .5), ch: POOL[Math.floor(Math.random() * POOL.length)], a: rnd(.05, .16) }));
    t0 = performance.now(); shown = false;
  }

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) return;
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.font = `500 ${cell * 1.2}px "JetBrains Mono",ui-monospace,monospace`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#6a9955';
    for (const b of bg) {
      b.y -= b.s; if (b.y < -10) { b.y = H + 10; b.x = rnd(0, W); }
      ctx.globalAlpha = b.a; ctx.fillText(b.ch, b.x, b.y);
    }
    for (const p of parts) {
      if (t < p.delay) { p.y += Math.sin(t * 2 + p.ph) * .3 + .4; p.x += Math.cos(t * 1.5 + p.ph) * .3; }
      else {
        p.vx += (p.tx - p.x) * 0.014; p.vy += (p.ty - p.y) * 0.014;
        const mx = p.x - mouse.x, my = p.y - mouse.y, md = Math.hypot(mx, my);
        if (md < 70) { const f = (70 - md) / 70 * 2.2; p.vx += mx / md * f; p.vy += my / md * f; }
        p.vx *= .88; p.vy *= .88; p.x += p.vx; p.y += p.vy;
      }
      const near = Math.hypot(p.tx - p.x, p.ty - p.y) < cell * .6 && t > p.delay;
      if (near) {
        if (Math.random() < .004) { const q = Math.floor(Math.random() * CODE.length); p.ch = codeCh(q); p.col = COL[q]; }
      } else if (Math.random() < .08) p.cur = POOL[Math.floor(Math.random() * POOL.length)];
      ctx.fillStyle = p.col;
      ctx.globalAlpha = near ? (p.ring ? .45 + .3 * p.a : .88 + .12 * p.a) : .75;
      ctx.shadowBlur = near && !p.ring ? 9 : 0; ctx.shadowColor = p.col;
      ctx.fillText(near ? p.ch : p.cur, p.x, p.y);
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  }

  function typeRole() {
    const el = $('#type'), txt = el.textContent;
    if (reduce) return;
    el.textContent = ''; let i = 0;
    const n = () => { el.textContent = txt.slice(0, ++i); if (i < txt.length) setTimeout(n, 45); };
    setTimeout(n, 900);
  }

  cv.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  cv.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  cv.addEventListener('click', build);
  addEventListener('resize', () => { if (innerWidth !== lastW || Math.abs(innerHeight - lastH) > 120) build(); });
  new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe($('#inicio'));

  const fontReady = Promise.race([document.fonts.load('700 40px "Source Serif 4"'), new Promise(r => setTimeout(r, 1500))]);
  Promise.all([boot(), fontReady]).then(() => { build(); typeRole(); requestAnimationFrame(frame); });

  /* ---------- Aparición al hacer scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  /* ---------- Formulario de contacto ---------- */
  // Pega aquí la URL de tu API (Node.js + Express + Resend). Si queda vacío, se abre tu correo.
  const API_URL = '';
  const EMAIL = 'jc.espinozav.2010@gmail.com';
  $('#form').addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target, msg = $('#msg');
    if (!f.reportValidity()) return;
    const data = { nombre: f.nombre.value.trim(), correo: f.correo.value.trim(), mensaje: f.mensaje.value.trim() };
    if (!API_URL) {
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Contacto desde el portafolio: ' + data.nombre)}&body=${encodeURIComponent(data.mensaje + '\n\n— ' + data.nombre + ' (' + data.correo + ')')}`;
      msg.textContent = '> abriendo tu app de correo...'; return;
    }
    msg.textContent = '> enviando...';
    try {
      const r = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error(r.status);
      msg.textContent = '> mensaje enviado [ OK ]'; f.reset();
    } catch (err) { msg.textContent = '> error al enviar, intenta de nuevo o escríbeme por correo'; }
  });
})();