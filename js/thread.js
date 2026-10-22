/* The one master thread: a single SVG path in world coordinates (1 unit = 1 world px).
   Every scene, the camera, the nodes and the particle morphs sample this same path. */
const THREAD = (() => {
  const WORLD = Object.freeze({ width: 6000, height: 4200 });
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const SAMPLE_COUNT = 3000;

  /* Route in normalized world coordinates. Strings are CAMERA_ANCHORS ids (memory nodes);
     arrays are shaping points that bend the road between them. The route is deliberately
     nonlinear: a loop around the school pin, a hidden S, a knot for the twist, a vertical
     fall, a climb back to the date, a curl, a diagonal highway entry and a sinuous road. */
  const ROUTE = Object.freeze([
    'opening', [0.05, 0.50], 'blackPull', [0.105, 0.455], 'openingMessage', [0.16, 0.445],
    'ltv',
    // loop around the 📍 pin
    [0.212, 0.372], [0.226, 0.325], [0.21, 0.285], [0.19, 0.305], [0.193, 0.35], [0.207, 0.42],
    'ltvMessage', [0.25, 0.6], 'photo2', 'photo3',
    // exits right, then returns from the right into the S
    [0.33, 0.575], [0.365, 0.56],
    // S-curve, traced bottom-left to top-right around the sCurve anchor
    [0.325, 0.505], [0.347, 0.525], [0.37, 0.48], 'sCurve', [0.328, 0.37], [0.348, 0.33], [0.372, 0.345],
    'tata',
    // the knot that twists and unravels the words
    [0.425, 0.42], [0.44, 0.49], [0.465, 0.51], [0.47, 0.56], [0.45, 0.58], [0.432, 0.55], 'twist', [0.472, 0.53],
    // the fall
    [0.48, 0.6], 'drop', [0.505, 0.72], 'chat', 'chatMessage', 'date2410', 'meaning2410',
    // a small curl before the thread lays itself down as a road
    [0.635, 0.585], [0.655, 0.56], [0.645, 0.52], [0.632, 0.56], 'togetherMessage',
    'highway', 'photo4', 'photo5', 'photo6', 'photo7', 'photo8', 'photo9', 'firstsMessage',
    'photo10', 'photo11', 'photo12', 'hardTimes', 'photo13', 'photo14', 'photo15', 'photo16', 'photo17',
    'happyMessage', 'collage99', [0.938, 0.53], [0.95, 0.47], [0.935, 0.42], 'emotionalText',
    'essay', 'overview', [0.98, 0.445], 'lily', 'lilyField', 'fireworks', 'quiet', 'qr'
  ]);

  const anchors = typeof CAMERA_ANCHORS !== 'undefined' ? CAMERA_ANCHORS : {};
  const scenes = typeof STORY !== 'undefined' ? STORY : [];
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

  const state = {
    ready: false, svg: null, path: null, strand: null, head: null, nodesGroup: null,
    length: 0, xs: null, ys: null, anchorLength: {}, knots: [], nodes: {},
    drawnStart: 0, drawnEnd: 1, tint: 0
  };

  function routePoints() {
    const pts = [];
    for (const entry of ROUTE) {
      const id = typeof entry === 'string' ? entry : null;
      const n = id ? anchors[id] : entry;
      if (!n) continue;
      pts.push({ x: n[0] * WORLD.width, y: n[1] * WORLD.height, id });
    }
    return pts;
  }

  /* Centripetal Catmull-Rom (alpha 0.5) through every point, emitted as cubic Béziers:
     smooth, no cusps, and loops appear only where the route is drawn as a loop. */
  function bezierSegments(pts) {
    const segs = [];
    const dist = (a, b) => Math.sqrt(Math.hypot(b.x - a.x, b.y - a.y)) || 1e-4;
    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i], p2 = pts[i + 1];
      const p0 = pts[i - 1] || { x: 2 * p1.x - p2.x, y: 2 * p1.y - p2.y };
      const p3 = pts[i + 2] || { x: 2 * p2.x - p1.x, y: 2 * p2.y - p1.y };
      const d1 = dist(p0, p1), d2 = dist(p1, p2), d3 = dist(p2, p3);
      const c1 = {}, c2 = {};
      for (const k of ['x', 'y']) {
        c1[k] = (d1 * d1 * p2[k] - d2 * d2 * p0[k] + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1[k]) / (3 * d1 * (d1 + d2));
        c2[k] = (d3 * d3 * p1[k] - d2 * d2 * p3[k] + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2[k]) / (3 * d3 * (d3 + d2));
      }
      segs.push({ from: p1, c1, c2, to: p2 });
    }
    return segs;
  }

  const f = (n) => Math.round(n * 10) / 10;
  const segD = (s) => `C${f(s.c1.x)} ${f(s.c1.y)} ${f(s.c2.x)} ${f(s.c2.y)} ${f(s.to.x)} ${f(s.to.y)}`;

  function makeEl(tag, attrs, parent, before) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    if (parent) parent.insertBefore(el, before || null);
    return el;
  }

  function init() {
    if (state.ready || typeof document === 'undefined') return api;
    const svg = document.getElementById('thread-layer');
    const path = document.getElementById('thread-path');
    if (!svg || !path) return api;
    state.svg = svg;
    state.path = path;
    svg.setAttribute('viewBox', `0 0 ${WORLD.width} ${WORLD.height}`);
    if (typeof TATA_RED !== 'undefined') document.documentElement.style.setProperty('--tata-red', TATA_RED);

    const pts = routePoints();
    if (pts.length > 3) {
      const segs = bezierSegments(pts);
      const d = `M${f(pts[0].x)} ${f(pts[0].y)} ` + segs.map(segD).join(' ');
      path.setAttribute('d', d);

      // exact arc length at every anchor, measured segment by segment on a scratch path
      const scratch = makeEl('path', { d: '' }, svg);
      let acc = 0;
      if (pts[0].id) state.anchorLength[pts[0].id] = 0;
      segs.forEach((s) => {
        scratch.setAttribute('d', `M${f(s.from.x)} ${f(s.from.y)} ${segD(s)}`);
        acc += scratch.getTotalLength();
        if (s.to.id) state.anchorLength[s.to.id] = acc;
      });
      scratch.remove();
    }

    // one strand group: halo + glow + core all share the master path's geometry
    const strand = makeEl('g', { class: 'thread-strand' }, svg, path);
    const d = path.getAttribute('d');
    makeEl('path', { class: 'thread-halo', d }, strand);
    makeEl('path', { class: 'thread-glow', d }, strand);
    strand.appendChild(path);
    path.classList.add('thread-core');
    state.strand = strand;

    state.length = path.getTotalLength();
    // normalise anchor lengths to the browser's own measure of the full path
    const measured = Object.values(state.anchorLength);
    const scale = measured.length ? state.length / Math.max(...measured, 1) : 1;
    for (const id of Object.keys(state.anchorLength)) state.anchorLength[id] *= scale;

    state.xs = new Float32Array(SAMPLE_COUNT + 1);
    state.ys = new Float32Array(SAMPLE_COUNT + 1);
    for (let i = 0; i <= SAMPLE_COUNT; i++) {
      const p = path.getPointAtLength((i / SAMPLE_COUNT) * state.length);
      state.xs[i] = p.x;
      state.ys[i] = p.y;
    }

    // memory nodes where scenes sit on the thread
    state.nodesGroup = makeEl('g', { id: 'thread-nodes', class: 'thread-nodes' }, svg, strand.nextSibling);
    for (const scene of scenes) {
      if (!(scene.id in state.anchorLength)) continue;
      const p = pointAt(anchorFraction(scene.id));
      state.nodes[scene.id] = makeEl('circle', {
        class: 'thread-node', cx: f(p.x), cy: f(p.y), r: 7, 'data-scene': scene.id
      }, state.nodesGroup);
    }
    state.head = makeEl('circle', { id: 'thread-head', class: 'thread-head', r: 6, cx: 0, cy: 0 }, strand);

    // progress knots: each scene reaches its anchor at the middle of its time span
    state.knots = [{ p: 0, t: 0 }];
    for (const scene of scenes) {
      if (!(scene.id in state.anchorLength)) continue;
      const t = anchorFraction(scene.id);
      const p = (scene.start + scene.end) / 2;
      const last = state.knots[state.knots.length - 1];
      if (p > last.p) state.knots.push({ p, t: Math.max(t, last.t) });
    }
    state.knots.push({ p: 1, t: 1 });

    state.ready = true;
    setDrawn(state.drawnEnd, state.drawnStart);
    return api;
  }

  /* ---- sampling ---- */
  function pointAt(frac) {
    if (!state.xs) return { x: 0, y: 0, angle: 0 };
    const pos = clamp01(frac) * SAMPLE_COUNT;
    const i = Math.min(SAMPLE_COUNT - 1, Math.floor(pos));
    const u = pos - i;
    const x = state.xs[i] + (state.xs[i + 1] - state.xs[i]) * u;
    const y = state.ys[i] + (state.ys[i + 1] - state.ys[i]) * u;
    const a = Math.max(0, i - 2), b = Math.min(SAMPLE_COUNT, i + 3);
    const angle = Math.atan2(state.ys[b] - state.ys[a], state.xs[b] - state.xs[a]);
    return { x, y, angle };
  }

  const pointAtLength = (len) => pointAt(state.length ? len / state.length : 0);

  /* Exact browser sample, for one-off precise queries (camera/anchors use the cached LUT). */
  function exactPointAtLength(len) {
    if (!state.path) return { x: 0, y: 0 };
    const p = state.path.getPointAtLength(Math.max(0, Math.min(state.length, len)));
    return { x: p.x, y: p.y };
  }

  function anchorFraction(id) {
    const len = state.anchorLength[id];
    return state.length && len !== undefined ? clamp01(len / state.length) : 0;
  }

  function anchorPoint(id) {
    const n = anchors[id];
    return n ? { x: n[0] * WORLD.width, y: n[1] * WORLD.height } : { x: 0, y: 0 };
  }

  /* Master progress (0–1) → fraction along the thread. Eased between knots so the camera
     settles on each memory but never stops dead between them. Fully deterministic. */
  function fractionAtProgress(progress) {
    const p = clamp01(progress);
    const k = state.knots;
    if (k.length < 2) return p;
    let i = 0;
    while (i < k.length - 2 && p > k[i + 1].p) i++;
    const a = k[i], b = k[i + 1];
    const u = b.p > a.p ? (p - a.p) / (b.p - a.p) : 1;
    const eased = u * u * (3 - 2 * u);
    return a.t + (b.t - a.t) * (u * 0.4 + eased * 0.6);
  }

  /* Evenly spaced points between two fractions, for text ⇄ thread particle morphs. */
  function sample(count, from = 0, to = 1) {
    const out = [];
    const n = Math.max(1, count | 0);
    for (let i = 0; i < n; i++) out.push(pointAt(from + (to - from) * (n === 1 ? 0 : i / (n - 1))));
    return out;
  }

  /* World → screen pixels, through every CSS transform the camera applies. */
  function toScreen(x, y) {
    const m = state.svg && state.svg.getScreenCTM();
    if (!m) return { x, y };
    return { x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f };
  }

  const screenSample = (count, from, to) => sample(count, from, to).map((p) => ({ ...toScreen(p.x, p.y), angle: p.angle }));

  /* ---- drawing state ---- */
  /* Visible stretch of thread, as fractions. setDrawn(0.4) draws the first 40%;
     setDrawn(0.6, 0.45) shows only the stretch between them (a travelling segment). */
  function setDrawn(end, start = 0) {
    state.drawnEnd = clamp01(end);
    state.drawnStart = Math.min(clamp01(start), state.drawnEnd);
    if (!state.ready) return;
    const L = state.length;
    const a = state.drawnStart * L, b = state.drawnEnd * L;
    const dash = `0 ${f(a)} ${f(Math.max(0, b - a))} ${f(L + 1)}`;
    for (const el of state.strand.querySelectorAll('path')) el.style.strokeDasharray = dash;
    const showHead = b - a > 1 && state.drawnEnd < 0.9995;
    state.head.style.opacity = showHead ? '' : '0';
    if (showHead) {
      const p = pointAt(state.drawnEnd);
      state.head.setAttribute('cx', f(p.x));
      state.head.setAttribute('cy', f(p.y));
    }
  }

  /* Overall presence (0–1): photos may take priority, but the thread never ceases to exist. */
  function setPresence(opacity) {
    if (state.strand) state.strand.style.opacity = String(clamp01(opacity));
  }

  /* Keeps the stroke readable at any camera zoom: pass 1 / cameraScale (clamped by caller). */
  function setWidthScale(scale) {
    if (state.svg) state.svg.style.setProperty('--thread-scale', String(Math.max(0.05, scale)));
  }

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }

  /* Local Tata colour only: 0 = THEME.neonPink, 1 = TATA_RED. 0 removes the override,
     so the global thread colour is restored exactly. */
  function setTint(amount) {
    state.tint = clamp01(amount);
    if (!state.svg) return;
    if (state.tint < 0.002 || typeof TATA_RED === 'undefined') {
      state.svg.style.removeProperty('--thread-color');
      return;
    }
    state.svg.style.setProperty('--thread-color', color());
  }

  /* Current thread colour as rgb(), for particles that must match the thread. */
  function color() {
    const base = hexToRgb(THEME.neonPink);
    if (!state.tint || typeof TATA_RED === 'undefined') return `rgb(${base.join(',')})`;
    const red = hexToRgb(TATA_RED);
    return `rgb(${base.map((c, i) => Math.round(c + (red[i] - c) * state.tint)).join(',')})`;
  }

  function setActiveNode(id) {
    for (const [sceneId, el] of Object.entries(state.nodes)) el.classList.toggle('is-active', sceneId === id);
  }

  const api = {
    WORLD, ROUTE, init, pointAt, pointAtLength, exactPointAtLength, anchorFraction, anchorPoint,
    fractionAtProgress, sample, screenSample, toScreen, setDrawn, setPresence, setWidthScale,
    setTint, color, setActiveNode,
    get length() { return state.length; },
    get path() { return state.path; },
    get ready() { return state.ready; },
    get drawn() { return { start: state.drawnStart, end: state.drawnEnd }; }
  };
  return api;
})();

THREAD.init();
