/* The one master thread: a single SVG path in world coordinates (1 unit = 1 world px).
   Every scene, the camera, the nodes and the particle morphs sample this same path. */
const THREAD = (() => {
  const WORLD = Object.freeze({ width: 6000, height: 4200 });
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const SAMPLE_COUNT = 3000;
  const AMPLITUDE = WORLD.height * 0.08;
  // A long, gentle wavelength: at the usual camera zoom (~.3) one period spans about half the
  // screen, so the thread reads as a calm wave rather than a tight zigzag.
  const WAVELENGTH = WORLD.width * 0.36;
  // Head + fading tail ≈ half a viewport at the usual zoom: the afterimage dies out on screen.
  const TRAIL = WORLD.width * 0.6;

  /* Semantic anchors retain their story order while the geometry stays a smooth wave. */
  const ROUTE = Object.freeze([
    'opening', 'blackPull', 'openingMessage', 'ltv', 'ltvMessage', 'photo2', 'photo3', 'sCurve', 'tata',
    'twist', 'drop', 'chat', 'chatMessage', 'date2410', 'meaning2410', 'togetherMessage', 'highway',
    'photo4', 'photo5', 'photo6', 'photo7', 'photo8', 'photo9', 'firstsMessage', 'photo10', 'photo11',
    'photo12', 'hardTimes', 'photo13', 'photo14', 'photo15', 'photo16', 'photo17', 'happyMessage',
    'collage99', 'emotionalText', 'essay', 'overview', 'lily', 'lilyField', 'fireworks', 'quiet', 'qr'
  ]);

  const anchors = typeof CAMERA_ANCHORS !== 'undefined' ? CAMERA_ANCHORS : {};
  const scenes = typeof STORY !== 'undefined' ? STORY : [];
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const f = (n) => Math.round(n * 10) / 10;

  const state = {
    ready: false, svg: null, path: null, strand: null, head: null, nodesGroup: null,
    length: 0, xs: null, ys: null, anchorLength: {}, knots: [], nodes: {}, trailGroup: null, trails: [],
    drawnStart: 0, drawnEnd: 1, tint: 0, fallPx: 0, nodesEnabled: true
  };

  const waveY = (x) => WORLD.height * 0.5 + AMPLITUDE * Math.sin(2 * Math.PI * x / WAVELENGTH);

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

    const coords = [];
    for (let i = 0; i <= SAMPLE_COUNT; i++) {
      const x = WORLD.width * i / SAMPLE_COUNT;
      coords.push({ x, y: waveY(x) });
    }
    const d = `M${f(coords[0].x)} ${f(coords[0].y)} ` + coords.slice(1).map((p) => `L${f(p.x)} ${f(p.y)}`).join(' ');
    path.setAttribute('d', d);

    // one strand group: halo + glow + core all share the master path's geometry
    const strand = makeEl('g', { class: 'thread-strand' }, svg, path);
    makeEl('path', { class: 'thread-halo', d }, strand);
    makeEl('path', { class: 'thread-glow', d }, strand);
    strand.appendChild(path);
    path.classList.add('thread-core');
    state.strand = strand;

    state.length = path.getTotalLength();
    const cumulative = new Float64Array(SAMPLE_COUNT + 1);
    for (let i = 1; i <= SAMPLE_COUNT; i++) {
      const dx = coords[i].x - coords[i - 1].x, dy = coords[i].y - coords[i - 1].y;
      cumulative[i] = cumulative[i - 1] + Math.hypot(dx, dy);
    }
    const total = cumulative[SAMPLE_COUNT];
    for (const id of ROUTE) {
      const n = anchors[id];
      if (n) state.anchorLength[id] = cumulative[Math.round(clamp01(n[0]) * SAMPLE_COUNT)] / total * state.length;
    }
    state.trailGroup = makeEl('g', { class: 'thread-trails' }, svg, strand.nextSibling);
    for (let i = 0; i < 6; i++) state.trails.push(makeEl('path', { class: 'thread-trail', d }, state.trailGroup));
    state.xs = new Float32Array(SAMPLE_COUNT + 1);
    state.ys = new Float32Array(SAMPLE_COUNT + 1);
    for (let i = 0; i <= SAMPLE_COUNT; i++) {
      const p = path.getPointAtLength((i / SAMPLE_COUNT) * state.length);
      state.xs[i] = p.x;
      state.ys[i] = p.y;
    }

    // memory nodes where scenes sit on the thread
    state.nodesGroup = makeEl('g', { id: 'thread-nodes', class: 'thread-nodes' }, svg, strand.nextSibling);
    if (!state.nodesEnabled) {
      state.nodesGroup.classList.add('is-disabled');
      state.nodesGroup.style.display = 'none';
    }
    for (const scene of scenes) {
      if (!(scene.id in state.anchorLength)) continue;
      const p = pointAt(anchorFraction(scene.id));
      state.nodes[scene.id] = makeEl('circle', {
        class: 'thread-node', cx: f(p.x), cy: f(p.y), r: 7, 'data-scene': scene.id
      }, state.nodesGroup);
    }
    state.head = makeEl('circle', { id: 'thread-head', class: 'thread-head', r: 6, cx: 0, cy: 0 }, strand);
    if (state.fallPx) setFall(state.fallPx);

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
    const x = n ? n[0] * WORLD.width : 0;
    return { x, y: waveY(x) };
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
    state.drawnStart = Math.max(0, state.drawnEnd - TRAIL / Math.max(1, state.length));
    if (!state.ready) return;
    const L = state.length;
    const a = state.drawnStart * L, b = state.drawnEnd * L;
    const headStart = Math.max(a, b - TRAIL / 6);
    const dash = `0 ${f(headStart)} ${f(Math.max(0, b - headStart))} ${f(L + 1)}`;
    for (const el of state.strand.querySelectorAll('path')) el.style.strokeDasharray = dash;
    state.trails.forEach((el, i) => {
      const span = (b - a) / 6;
      const near = b - i * span;
      const far = Math.max(a, b - (i + 1) * span);
      el.style.strokeDasharray = `0 ${f(far)} ${f(Math.max(0, near - far))} ${f(L + 1)}`;
    });
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
    const value = String(clamp01(opacity));
    if (state.strand) state.strand.style.opacity = value;
    if (state.trailGroup) state.trailGroup.style.opacity = value;
  }

  /* Translate the strand and its afterimages together in screen pixels. */
  function setFall(dyPx) {
    state.fallPx = Number.isFinite(Number(dyPx)) ? Number(dyPx) : 0;
    const matrix = state.svg && state.svg.getScreenCTM();
    const scale = matrix ? Math.hypot(matrix.b, matrix.d) : 1;
    const dy = state.fallPx / Math.max(0.001, scale);
    const transform = `translate(0 ${f(dy)})`;
    if (state.strand) state.strand.setAttribute('transform', transform);
    if (state.trailGroup) state.trailGroup.setAttribute('transform', transform);
  }

  function setNodesEnabled(on) {
    state.nodesEnabled = !!on;
    if (state.nodesGroup) {
      state.nodesGroup.classList.toggle('is-disabled', !state.nodesEnabled);
      state.nodesGroup.style.display = state.nodesEnabled ? '' : 'none';
    }
    if (!state.nodesEnabled) {
      for (const el of Object.values(state.nodes)) el.classList.remove('is-active');
    }
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
    if (!state.nodesEnabled) return;
    for (const [sceneId, el] of Object.entries(state.nodes)) el.classList.toggle('is-active', sceneId === id);
  }

  const api = {
    WORLD, ROUTE, init, pointAt, pointAtLength, exactPointAtLength, anchorFraction, anchorPoint,
    fractionAtProgress, sample, screenSample, toScreen, setDrawn, setPresence, setFall, setNodesEnabled, setWidthScale,
    setTint, color, setActiveNode,
    get length() { return state.length; },
    get path() { return state.path; },
    get ready() { return state.ready; },
    get drawn() { return { start: state.drawnStart, end: state.drawnEnd }; }
  };
  return api;
})();

THREAD.init();
