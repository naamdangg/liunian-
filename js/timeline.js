/* Reversible normalized scroll timeline. Scroll is the input; inertia only softens it. */
const Timeline = (() => {
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, Number.isFinite(v) ? v : min));
  const lerp = (a, b, t) => a + (b - a) * t;
  const mapRange = (v, a, b, outA = 0, outB = 1) => lerp(outA, outB, clamp((v - a) / (b - a || 1)));
  const smoothstep = (a, b, v) => { const t = clamp((v - a) / (b - a || 1)); return t * t * (3 - 2 * t); };
  const easeInOut = (t) => { t = clamp(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  const localProgress = (master, start, end) => clamp((master - start) / (end - start || 1));
  let target = 0, current = 0, frame = 0, lastTime = 0, running = false, listeners = new Set();
  let driver = null, changeHandler = null, resizeHandler = null;

  function readScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    target = clamp((window.scrollY || window.pageYOffset || 0) / max);
  }
  function emit(time, delta) {
    const state = Object.freeze({ progress: current, target, time, delta, direction: Math.sign(target - current) });
    for (const listener of listeners) listener(state);
    window.dispatchEvent(new CustomEvent('timeline:progress', { detail: state }));
  }
  function tick(time) {
    if (!running) return;
    const dt = Math.min(64, lastTime ? time - lastTime : 16.67); lastTime = time;
    const configured = typeof CONFIG !== 'undefined' ? CONFIG.smoothing : .085;
    const alpha = 1 - Math.pow(1 - clamp(configured, .001, 1), dt / 16.67);
    current = Math.abs(target - current) < .00002 ? target : lerp(current, target, alpha);
    emit(time, dt);
    frame = requestAnimationFrame(tick);
  }
  function start() {
    if (running || typeof window === 'undefined') return api;
    running = true; driver = document.getElementById('scroll-driver');
    changeHandler = readScroll; resizeHandler = readScroll;
    window.addEventListener('scroll', changeHandler, { passive: true });
    window.addEventListener('resize', resizeHandler, { passive: true });
    readScroll(); current = target; lastTime = 0; frame = requestAnimationFrame(tick);
    return api;
  }
  function stop() {
    running = false; cancelAnimationFrame(frame);
    if (changeHandler) window.removeEventListener('scroll', changeHandler);
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    changeHandler = resizeHandler = null; return api;
  }
  function subscribe(fn) { if (typeof fn !== 'function') return () => {}; listeners.add(fn); return () => listeners.delete(fn); }
  function setProgress(value, immediate = false) { target = clamp(value); if (immediate) current = target; return current; }
  const api = { clamp, lerp, mapRange, smoothstep, easeInOut, localProgress, start, stop, subscribe, setProgress,
    get progress() { return current; }, get target() { return target; }, get running() { return running; } };
  return api;
})();

/* Convenience globals keep scene code terse and match the shared contract. */
const clamp = Timeline.clamp;
const lerp = Timeline.lerp;
const mapRange = Timeline.mapRange;
const smoothstep = Timeline.smoothstep;
const easeInOut = Timeline.easeInOut;
const localProgress = Timeline.localProgress;
