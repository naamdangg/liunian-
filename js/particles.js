/* Particle morphs and fireworks on canvas#particle-canvas (screen space).
   Every particle position is a pure function of scroll progress and its index, so the
   whole system reverses exactly when the viewer scrolls back (no simulation state).
   - thread ⇄ text: the visible strand of #thread-path breaks into dots that assemble the
     letters of each message from Memories.morphTargets, then unravel back into the strand.
   - twist: text A twists into one shared knot, and the same knot unravels into text B.
   - date: the last knot reorganises into 24-10-2020; 2 4 1 0 and its meaning converge back.
   - fireworks: ordinary bursts first, then bursts whose sparks organise into "yêu Bông" and hearts.
   Colours come from THREAD.color() / THEME only, so changing THEME.neonPink retints everything. */
const Particles = (() => {
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const seg = (v, a, b) => clamp01((v - a) / ((b - a) || 1e-6));
  const ease = (t) => { t = clamp01(t); return t * t * (3 - 2 * t); };
  const easeOut = (t) => 1 - Math.pow(1 - clamp01(t), 3);
  const mix = (a, b, t) => a + (b - a) * t;
  /* Stable per-particle noise in [0, 1). */
  const hash = (i, salt) => { const s = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453; return s - Math.floor(s); };

  const MAX_MORPH = 720;
  const FIREWORK_TEXT = 'yêu Bông';

  let canvas = null, ctx = null, dpr = 1, vw = 1, vh = 1;
  let built = false, direct = false, dirty = false, frameNo = 0;
  const clouds = new Map();           // text|font|width → glyph offsets around the centre
  const sprites = new Map();          // colour → glow sprite
  const dateCache = { pts: null, at: -99 };
  let scenes = {};

  /* ---------- helpers ---------- */
  function scene(id) { return scenes[id] || { start: 2, end: 3 }; }
  const lp = (id, p) => { const s = scene(id); return clamp01((p - s.start) / (s.end - s.start)); };

  function hexRgb(hex) { const h = hex.replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); }
  function parseRgb(str) {
    if (str[0] === '#') return hexRgb(str);
    const m = str.match(/\d+(\.\d+)?/g);
    return m ? m.slice(0, 3).map(Number) : hexRgb(THEME.neonPink);
  }
  function threadRgb() {
    return parseRgb(typeof THREAD !== 'undefined' && THREAD.color ? THREAD.color() : THEME.neonPink);
  }
  const rgbKey = (c) => c.map((v) => Math.round(v)).join(',');
  const mixRgb = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

  /* Soft neon dot: a white-hot core fading into the thread colour. */
  function sprite(rgb) {
    const key = rgbKey(rgb);
    let s = sprites.get(key);
    if (s) return s;
    s = document.createElement('canvas');
    s.width = s.height = 32;
    const g = s.getContext('2d');
    const hi = hexRgb(THEME.softHighlight);
    const core = rgbKey(mixRgb(rgb, hi, .55));
    const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, `rgba(${core},1)`);
    grad.addColorStop(.18, `rgba(${key},.95)`);
    grad.addColorStop(.45, `rgba(${key},.32)`);
    grad.addColorStop(1, `rgba(${key},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, 32, 32);
    if (sprites.size > 24) sprites.clear();
    sprites.set(key, s);
    return s;
  }
  function dot(spr, x, y, size, alpha) {
    if (alpha <= .01 || x < -20 || y < -20 || x > vw + 20 || y > vh + 20) return;
    ctx.globalAlpha = alpha > 1 ? 1 : alpha;
    ctx.drawImage(spr, x - size / 2, y - size / 2, size, size);
  }

  /* ---------- glyph sampling ---------- */
  /* Rasterises exact text (wrapped like the DOM element, or with explicit lines) and returns
     pixel offsets from the text centre. The text itself is never altered. */
  function sampleText(text, font, fontPx, lineH, maxW, align, forcedLines) {
    const key = `${text}|${font}|${Math.round(maxW)}|${align}`;
    if (clouds.has(key)) return clouds.get(key);
    const c = document.createElement('canvas');
    const g = c.getContext('2d', { willReadFrequently: true });
    g.font = font;
    let lines = forcedLines;
    if (!lines) {
      lines = [];
      for (const para of text.split('\n')) {
        let line = '';
        for (const word of para.split(/\s+/)) {
          const test = line ? `${line} ${word}` : word;
          if (line && g.measureText(test).width > maxW + 1) { lines.push(line); line = word; } else line = test;
        }
        lines.push(line);
      }
    }
    const widths = lines.map((l) => g.measureText(l).width);
    const w = Math.ceil(Math.max(...widths, 1) + fontPx), h = Math.ceil(lines.length * lineH + fontPx * .6);
    c.width = Math.max(2, w); c.height = Math.max(2, h);
    g.font = font;
    g.textBaseline = 'middle';
    g.fillStyle = '#fff';
    const textW = Math.max(...widths, 1);
    lines.forEach((l, i) => {
      const x = align === 'left' ? (w - textW) / 2 : align === 'right' ? (w + textW) / 2 - widths[i] : (w - widths[i]) / 2;
      g.fillText(l, x, fontPx * .3 + (i + .5) * lineH);
    });
    const data = g.getImageData(0, 0, c.width, c.height).data;
    const step = Math.max(2, Math.round(fontPx / 9));
    const pts = [];
    for (let y = 0; y < c.height; y += step) {
      for (let x = 0; x < c.width; x += step) {
        if (data[(y * c.width + x) * 4 + 3] > 120) pts.push(x - c.width / 2, y - c.height / 2);
      }
    }
    const cloud = { pts, n: pts.length / 2, w: c.width, h: c.height };
    if (clouds.size > 80) clouds.clear();
    clouds.set(key, cloud);
    return cloud;
  }

  function fontOf(el) {
    const cs = getComputedStyle(el);
    const px = parseFloat(cs.fontSize) || 24;
    const lh = parseFloat(cs.lineHeight) || px * 1.3;
    return { cs, px, lh, font: `${cs.fontStyle} ${cs.fontWeight} ${px}px ${cs.fontFamily}` };
  }
  function cloudForEl(text, el) {
    const F = fontOf(el);
    const pad = (parseFloat(F.cs.paddingLeft) || 0) + (parseFloat(F.cs.paddingRight) || 0);
    const maxW = Math.max(F.px * 2, (el.clientWidth || el.offsetWidth || vw * .8) - pad);
    return sampleText(text, F.font, F.px, F.lh, maxW, F.cs.textAlign === 'left' || F.cs.textAlign === 'right' ? F.cs.textAlign : 'center');
  }

  /* Up to MAX_MORPH evenly spread glyph points, offset to the element's screen centre. */
  function glyphTargets(cloud, cx, cy, scale = 1) {
    const n = Math.min(MAX_MORPH, cloud.n), out = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) {
      const k = Math.floor(i * cloud.n / n) * 2;
      out[i * 2] = cx + cloud.pts[k] * scale;
      out[i * 2 + 1] = cy + cloud.pts[k + 1] * scale;
    }
    return out;
  }

  /* For the date/meaning box: sample each visible text span at its own on-screen rect. */
  function leafTargets(box) {
    const leaves = [...box.querySelectorAll('*')].filter((e) => !e.children.length && e.textContent.trim());
    const all = [];
    for (const e of leaves) {
      const op = parseFloat(e.style.opacity || '1');
      if (op < .35) continue;
      const r = e.getBoundingClientRect();
      if (r.width < 1) continue;
      const F = fontOf(e);
      const cloud = sampleText(e.textContent, F.font, F.px, F.lh, 1e5, 'center');
      const s = r.width / Math.max(1, cloud.w - F.px);
      for (let k = 0; k < cloud.pts.length; k += 2) all.push(r.left + r.width / 2 + cloud.pts[k] * s, r.top + r.height / 2 + cloud.pts[k + 1] * s);
    }
    const n = Math.min(MAX_MORPH, all.length / 2), out = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) { const k = Math.floor(i * (all.length / 2) / n) * 2; out[i * 2] = all[k]; out[i * 2 + 1] = all[k + 1]; }
    return out;
  }

  /* ---------- the thread as a particle source ---------- */
  let strand = null;  // { pts: [{x,y}], n } screen polyline of the visible strand
  function buildStrand(cam, from, to) {
    if (typeof THREAD === 'undefined' || !THREAD.ready || !THREAD.screenSample) return null;
    const pts = THREAD.screenSample(72, clamp01(from), clamp01(to));
    return { pts, n: pts.length };
  }
  /* Point at s ∈ [0,1] along the strand, with a tiny perpendicular offset for thickness. */
  function strandPoint(S, s, off) {
    if (!S || S.n < 2) return { x: vw / 2 + (s - .5) * vw * .8, y: vh / 2 + off };
    const f = clamp01(s) * (S.n - 1), i = Math.min(S.n - 2, Math.floor(f)), t = f - i;
    const a = S.pts[i], b = S.pts[i + 1];
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
    return { x: a.x + dx * t - dy / len * off, y: a.y + dy * t + dx / len * off };
  }

  /* The shared knot (a trefoil) that twist transitions pass through. */
  function knotPoint(i, n, cx, cy, R, spin) {
    const th = (i / n) * Math.PI * 2;
    const x = (Math.sin(th) + 2 * Math.sin(2 * th)) / 3, y = (Math.cos(th) - 2 * Math.cos(2 * th)) / 3;
    const c = Math.cos(spin), s = Math.sin(spin);
    const wob = 1 + .06 * Math.sin(th * 7 + spin * 3);
    return { x: cx + (x * c - y * s) * R * wob, y: cy + (x * s + y * c) * R * wob };
  }
  function twistOffset(x, y, cx, cy, amt) {
    const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy);
    const a = amt * (.5 + d / 140);
    const c = Math.cos(a), s = Math.sin(a), k = 1 - .35 * Math.abs(Math.sin(amt));
    return { x: cx + (dx * c - dy * s) * k, y: cy + (dx * s + dy * c) * k };
  }

  /* ---------- one morph ---------- */
  function drawMorph(T, cam) {
    const form = clamp01(T.form), release = clamp01(T.release);
    const forming = form < .999, releasing = release > .001;
    if (!forming && !releasing) return;
    if (form < .001 && !releasing) return;
    const el = T.el;
    if (!el || !el.isConnected) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;

    let tgt;
    if (T.mode === 'date' && releasing) {
      // "2 4 1 0" and its four lines, captured just before they began to converge
      if (!dateCache.pts) dateCache.pts = leafTargets(el);
      tgt = dateCache.pts;
    } else tgt = glyphTargets(cloudForEl(T.text, el), cx, cy);
    const n = tgt.length / 2;
    if (!n) return;
    const rgb = threadRgb();
    const spr = sprite(rgb), sprHot = sprite(mixRgb(rgb, hexRgb(THEME.softHighlight), .5));
    const R = Math.min(Math.max(60, r.width * .22), 170);
    const twistFirst = typeof STORY_COPY !== 'undefined' && T.text === STORY_COPY.twist[0];
    const knotIn = (T.mode === 'twist' && !twistFirst) || T.mode === 'date';
    const knotOut = T.mode === 'twist';
    const size = 7;

    for (let i = 0; i < n; i++) {
      const gx = tgt[i * 2], gy = tgt[i * 2 + 1];
      const h1 = hash(i, 1), h2 = hash(i, 2), h3 = hash(i, 3);
      let x = gx, y = gy, a = 0;
      if (releasing) {
        const t = ease(seg(release, h1 * .35, h1 * .35 + .65));
        if (knotOut) {
          const tw = twistOffset(gx, gy, cx, cy, release * 2.6);
          const k = knotPoint(i, n, cx, cy, R, 2.2 * release);
          const m = ease(seg(release, .25, 1));
          x = mix(tw.x, k.x, m); y = mix(tw.y, k.y, m);
        } else {
          const s = strandPoint(strand && strand.ahead, h2, (h3 - .5) * 3);
          const bend = Math.sin(t * Math.PI) * (h3 - .5) * 90;
          x = mix(gx, s.x, t) + bend; y = mix(gy, s.y, t) - bend * .4;
        }
        // a knot stays lit: the next phrase is woven from it
        a = seg(release, 0, .08) * (knotOut ? 1 : 1 - seg(release, .86, 1));
      } else {
        const t = ease(seg(form, h1 * .35, h1 * .35 + .65));
        if (knotIn) {
          const k = knotPoint(i, n, cx, cy, R, 2.2 + 1.6 * form);
          const tw = twistOffset(gx, gy, cx, cy, -(1 - form) * 2.6);
          const m = ease(seg(form, 0, .75));
          x = mix(k.x, tw.x, m); y = mix(k.y, tw.y, m);
          // the knot is the previous phrase's material: already fully lit when this phrase begins
          a = 1 - seg(form, .8, 1);
        } else {
          const s = strandPoint(strand && strand.behind, h2, (h3 - .5) * 3);
          const bend = Math.sin(t * Math.PI) * (h3 - .5) * 90;
          x = mix(s.x, gx, t) + bend; y = mix(s.y, gy, t) - bend * .4;
          a = seg(form, 0, .1) * (1 - seg(form, .8, 1));
        }
      }
      dot(h2 > .82 ? sprHot : spr, x, y, size * (.75 + h3 * .5), a * .9);
    }
    dirty = true;
  }

  /* ---------- fireworks ---------- */
  const PALETTE = () => [THEME.neonPink, THEME.softHighlight, THEME.mainCrimson, THEME.neonPink, THEME.softHighlight].map(hexRgb);
  let shells = null;
  function heartPoints() {
    const pts = [];
    for (const k of [1, .62, .3]) {
      const m = Math.round(70 * k) + 12;
      for (let i = 0; i < m; i++) {
        const t = (i / m) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        pts.push(x / 17 * k, (y + 2) / 17 * k);
      }
    }
    return pts;
  }
  function buildShells() {
    const seed = (typeof CONFIG !== 'undefined' && CONFIG.seed) || 24102020;
    const r = (i, s) => hash(i + seed % 997, s);
    const plan = ['n', 'n', 'n', 'n', 'n', 'n', 'n', 'heart', 'n', 'text', 'n', 'heart', 'n', 'heart', 'heart', 'text'];
    shells = plan.map((kind, k) => {
      const big = k === plan.length - 1;
      return {
        kind, big,
        t0: big ? .78 : .02 + k * .05 + r(k, 4) * .02,
        dur: big ? .62 : kind === 'n' ? .26 : .36,
        x: big ? .5 : kind === 'text' ? .5 + (r(k, 5) - .5) * .2 : .14 + r(k, 5) * .72,
        y: big ? .36 : .2 + r(k, 6) * .24,
        rad: kind === 'n' ? .16 + r(k, 7) * .1 : .22,
        color: k % 5, count: kind === 'n' ? 90 + Math.round(r(k, 8) * 50) : 0
      };
    });
  }
  function textShape() {
    const px = Math.round(Math.min(vw * .13, vh * .2, 150));
    const cloud = sampleText(FIREWORK_TEXT, `600 ${px}px ${getComputedStyle(document.documentElement).getPropertyValue('--font') || 'sans-serif'}`, px, px * 1.2, 1e5, 'center');
    const n = Math.min(520, cloud.n), out = [];
    for (let i = 0; i < n; i++) { const k = Math.floor(i * cloud.n / n) * 2; out.push(cloud.pts[k], cloud.pts[k + 1]); }
    return { pts: out, unit: 1 };
  }
  let heart = null, fwText = null, fwTextW = 0;

  function drawFireworks(p) {
    const fw = scene('fireworks'), qt = scene('quiet');
    if (p < fw.start || p > qt.end) return;
    if (!shells) buildShells();
    if (!heart) heart = heartPoints();
    if (!fwText || fwTextW !== vw) { fwText = textShape(); fwTextW = vw; }
    const L = (p - fw.start) / (fw.end - fw.start);       // > 1 inside the quiet scene
    const calm = 1 - seg(p, qt.start, mix(qt.start, qt.end, .55));  // quiet: embers settle, then nothing
    const pal = PALETTE();
    const base = Math.min(vw, vh);
    ctx.globalCompositeOperation = 'lighter';
    for (let k = 0; k < shells.length; k++) {
      const S = shells[k];
      const tau = (L - S.t0) / S.dur;
      if (tau <= 0 || tau >= 1) continue;
      const rgb = pal[S.color], spr = sprite(rgb), sprHot = sprite(mixRgb(rgb, [255, 255, 255], .6));
      const ax = S.x * vw, ay = S.y * vh;
      const rise = .2;
      if (tau < rise) {
        const t = easeOut(tau / rise);
        for (let j = 0; j < 7; j++) {
          const tj = Math.max(0, t - j * .035);
          dot(j ? spr : sprHot, ax + Math.sin(tj * 5 + k) * 6, mix(vh + 20, ay, tj), 9 - j, (1 - j / 7) * calm);
        }
        continue;
      }
      const b = (tau - rise) / (1 - rise);
      if (S.kind === 'n') {
        const R = S.rad * base;
        for (let i = 0; i < S.count; i++) {
          const ang = (i / S.count) * Math.PI * 2 + hash(i, k) * .3;
          const sp = .55 + hash(i, k + 9) * .45;
          for (let tr = 0; tr < 3; tr++) {
            const bb = Math.max(0, b - tr * .025);
            const d = R * sp * easeOut(bb * 1.6);
            const x = ax + Math.cos(ang) * d, y = ay + Math.sin(ang) * d + bb * bb * R * .55;
            dot(tr ? spr : sprHot, x, y, (tr ? 6 : 8) * (1 - bb * .5), Math.pow(1 - bb, 1.3) * (1 - tr * .35) * calm);
          }
        }
        continue;
      }
      // shaped burst: explode, then the sparks organise into the shape, hold, and drift down
      const shape = S.kind === 'text' ? fwText.pts : heart;
      const scale = S.kind === 'text' ? (S.big ? 1 : .62) : base * (S.big ? .26 : .13 + hash(k, 3) * .05);
      const n = shape.length / 2;
      const burst = easeOut(seg(b, 0, .28)), org = ease(seg(b, .22, .55)), fall = seg(b, .82, 1);
      const R = base * .2;
      for (let i = 0; i < n; i++) {
        const ang = hash(i, k + 2) * Math.PI * 2, sp = .3 + hash(i, k + 5) * .7;
        const ex = ax + Math.cos(ang) * R * sp * burst, ey = ay + Math.sin(ang) * R * sp * burst + burst * R * .08;
        const sx = ax + shape[i * 2] * scale, sy = ay + shape[i * 2 + 1] * scale;
        const shimmer = .82 + .18 * Math.sin(i * 1.7 + b * 40);
        const x = mix(ex, sx, org), y = mix(ey, sy, org) + fall * fall * R * .5 * (.6 + hash(i, 9) * .8);
        const a = seg(b, 0, .04) * (1 - fall) * (org > .9 ? shimmer : 1) * calm;
        dot(hash(i, k) > .7 ? sprHot : spr, x, y, 7.5, a);
      }
    }
    ctx.globalCompositeOperation = 'source-over';
    dirty = true;
  }

  /* ---------- frame ---------- */
  function resize() {
    if (!canvas) return;
    vw = Math.max(1, window.innerWidth); vh = Math.max(1, window.innerHeight);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(vw * dpr); canvas.height = Math.round(vh * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    clouds.clear();
    dateCache.pts = null;
    fwText = null;
    dirty = true;
  }

  function update(progress, cam, fromEvent) {
    if (!built) init();
    if (!built) return;
    if (!fromEvent) direct = true;
    frameNo++;
    const p = clamp01(progress);
    const c = cam || (typeof Camera !== 'undefined' ? Camera.state : null) || { zoom: .3 };
    if (dirty) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); dirty = false; }

    const targets = (typeof Memories !== 'undefined' && Memories.morphTargets) || [];
    const active = targets.filter((t) => t.mode !== 'fade' && ((t.form > .001 && t.form < .999) || t.release > .001));
    // while the date rests, keep a fresh snapshot of its visible glyphs for the convergence
    for (const t of targets) {
      if (t.mode === 'date' && t.form > .999 && t.release < .001 && frameNo - dateCache.at > 10) {
        dateCache.pts = leafTargets(t.el); dateCache.at = frameNo;
      }
    }
    if (active.length) {
      // the strand on screen right now: the part already travelled, and the part ahead
      const frac = c.threadFraction != null ? c.threadFraction : (typeof THREAD !== 'undefined' && THREAD.fractionAtProgress ? THREAD.fractionAtProgress(p) : p);
      const len = typeof THREAD !== 'undefined' && THREAD.length ? THREAD.length : 20000;
      const w = Math.min(.2, Math.max(.01, (vw / Math.max(.02, c.zoom || .3)) / len * .55));
      strand = { behind: buildStrand(c, frac - w, frac + w * .15), ahead: buildStrand(c, frac - w * .2, frac + w) };
      ctx.globalCompositeOperation = 'lighter';
      for (const t of active) drawMorph(t, c);
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.globalAlpha = 1;
    drawFireworks(p);
    ctx.globalAlpha = 1;
  }

  function init() {
    if (built || typeof document === 'undefined') return api;
    canvas = document.getElementById('particle-canvas');
    if (!canvas || !canvas.getContext) return api;
    ctx = canvas.getContext('2d');
    if (typeof STORY !== 'undefined') for (const s of STORY) scenes[s.id] = s;
    resize();
    window.addEventListener('resize', resize, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { clouds.clear(); fwText = null; });
    // fallback driver, after Memories has published this frame's morph targets
    window.addEventListener('timeline:progress', (ev) => { if (!direct && ev.detail) update(ev.detail.progress, null, true); });
    built = true;
    return api;
  }

  const api = { init, update, render: update, resize, sampleText };
  return api;
})();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => Particles.init());
  else Particles.init();
}
