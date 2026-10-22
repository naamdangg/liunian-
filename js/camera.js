/* Semantic camera for the shared 6000 × 4200 world. Call Camera.update(progress) per frame. */
const Camera = (() => {
  const WORLD = { width: 6000, height: 4200 };
  const anchors = typeof CAMERA_ANCHORS !== 'undefined' ? CAMERA_ANCHORS : {};
  const scenes = typeof STORY !== 'undefined' ? STORY : [];
  const clamp01 = (n) => Math.max(0, Math.min(1, n));
  const mix = (a, b, t) => a + (b - a) * t;
  let cameraEl = null, worldEl = null, reduced = false, media = null;
  let viewport = { width: 1, height: 1, dpr: 1 };
  let state = { progress: 0, x: 0, y: 0, angle: 0, zoom: .2, tilt: 0, depth: 0, blur: 0 };

  function init(opts = {}) {
    if (typeof document === 'undefined') return api;
    cameraEl = opts.camera || document.getElementById('camera');
    worldEl = opts.world || document.getElementById('world');
    media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    reduced = !!(media && media.matches);
    if (media) {
      const onChange = (e) => { reduced = e.matches; };
      if (media.addEventListener) media.addEventListener('change', onChange);
      else if (media.addListener) media.addListener(onChange);
    }
    resize(); return api;
  }
  function resize() {
    if (typeof window !== 'undefined') viewport = { width: Math.max(1, window.innerWidth), height: Math.max(1, window.innerHeight), dpr: window.devicePixelRatio || 1 };
    return viewport;
  }
  function semanticAt(progress) {
    const p = clamp01(progress);
    if (!scenes.length) return { x: WORLD.width / 2, y: WORLD.height / 2, zoom: .2, depth: 0, blur: 0 };
    let i = 0;
    while (i < scenes.length - 2 && p > scenes[i + 1].start) i++;
    const a = scenes[i], b = scenes[i + 1] || a;
    const aPos = a.anchor || anchors[a.id] || [.5, .5], bPos = b.anchor || anchors[b.id] || aPos;
    const span = Math.max(.000001, b.start - a.start);
    const t = i === scenes.length - 1 ? 0 : clamp01((p - a.start) / span);
    const eased = t * t * (3 - 2 * t);
    const x = mix(aPos[0], bPos[0], eased) * WORLD.width;
    const y = mix(aPos[1], bPos[1], eased) * WORLD.height;
    // Tight focus along photographs and messages; the overview opens to reveal the route.
    // Zoom eases late in each scene so the essay → overview → lily → qr changes never jump.
    const zoomOf = (id) => id === 'overview' ? .125 : id === 'qr' ? .25 : .30;
    const zt = t <= .55 ? 0 : (t - .55) / .45;
    const zoom = mix(zoomOf(a.id), zoomOf(b.id), zt * zt * (3 - 2 * zt));
    return { x, y, zoom, depth: Math.sin(Math.PI * t) * .35, blur: 0 };
  }
  function threadAt(progress) {
    if (typeof THREAD === 'undefined' || !THREAD.pointAt || !THREAD.fractionAtProgress) return null;
    const frac = THREAD.fractionAtProgress(clamp01(progress));
    return { ...THREAD.pointAt(frac), fraction: frac };
  }
  function render() {
    if (!worldEl) return;
    const scale = state.zoom;
    const c = Math.cos(state.tilt), s = Math.sin(state.tilt);
    const rx = state.x * c - state.y * s;
    const ry = state.x * s + state.y * c;
    const tx = viewport.width / 2 - rx * scale;
    const ty = viewport.height / 2 - ry * scale;
    worldEl.style.transformOrigin = '0 0';
    worldEl.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,0) scale(${scale.toFixed(4)}) rotate(${state.tilt.toFixed(5)}rad)`;
    worldEl.style.setProperty('--camera-depth', state.depth.toFixed(3));
    worldEl.style.setProperty('--camera-blur', `${state.blur.toFixed(2)}px`);
    worldEl.style.setProperty('--camera-zoom', scale.toFixed(4));
    if (cameraEl) cameraEl.dataset.progress = state.progress.toFixed(5);
    if (typeof THREAD !== 'undefined' && THREAD.setWidthScale) THREAD.setWidthScale(1 / Math.max(.01, scale));
  }
  function update(progress) {
    const p = clamp01(progress);
    const semantic = semanticAt(p);
    const thread = threadAt(p);
    // Follow the thread's sampled centerline, with semantic anchors keeping the shot composed.
    const follow = thread ? .76 : 0;
    let x = mix(semantic.x, thread ? thread.x : semantic.x, follow);
    let y = mix(semantic.y, thread ? thread.y : semantic.y, follow);
    if (reduced) {
      // Keep the full story and orientation, while reducing spatial travel and scale swings.
      x = mix(WORLD.width / 2, x, .70); y = mix(WORLD.height / 2, y, .70);
    }
    const zoom = reduced ? mix(.235, semantic.zoom, .35) : semantic.zoom;
    // sin() keeps the tilt continuous when the thread turns back left (atan2 wraps at ±π).
    const tilt = thread ? Math.sin(thread.angle) * .12 : 0;
    state = { progress: p, x, y, angle: thread ? thread.angle : 0, zoom, tilt: reduced ? tilt * .4 : tilt,
      depth: reduced ? semantic.depth * .25 : semantic.depth, blur: semantic.blur || 0 };
    render();
    return Object.freeze({ ...state, threadFraction: thread ? thread.fraction : p });
  }
  const api = { init, resize, update, semanticAt, threadAt, get state() { return { ...state }; }, get reducedMotion() { return reduced; }, world: WORLD };
  return api;
})();
