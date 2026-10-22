/* 99 memories: a physical stack of photographs spread across a table, in #collage-layer.
   CORE_9 (91–99) are picked up one at a time in order: blurred → fade in → scale up → focus →
   scale down → move back → slight rotation → placed. The camera then pulls back and MEMORY_90
   spread outward from that core in a stable seeded (mulberry32) order. Every state is a pure
   function of scroll progress, so it all reverses. Photos keep their original colours and
   aspect ratio: only width is set, height follows the image; filters are only temporary blur. */
const Collage99 = (() => {
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const seg = (v, a, b) => clamp01((v - a) / ((b - a) || 1e-6));
  const ease = (t) => { t = clamp01(t); return t * t * (3 - 2 * t); };
  const easeOut = (t) => 1 - Math.pow(1 - clamp01(t), 3);
  const mix = (a, b, t) => a + (b - a) * t;
  const f = (n) => Math.round(n * 100) / 100;

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Hand-composed core: overlapping, offset, rotated, never a grid. [x, y] in table units
     (fractions of S, the short layout side), rotation in degrees, relative size. */
  const CORE_SPOTS = [
    [-.03, -.02, -3.5, 1.12], [.25, -.15, 5, .96], [-.28, -.17, -7, 1], [.27, .14, 3, 1.04],
    [-.24, .17, 6.5, .94], [.02, -.29, -2, .9], [.04, .25, -5, .98], [.45, -.02, 8, .88], [-.47, .01, -4, .9]
  ];
  /* Collage-local timing (0–1 of the collage99 scene). */
  const CORE_FROM = .015, CORE_STEP = .053, CORE_LEN = .053;   // each core photo is placed before the next is picked up
  const PULL = [.51, .62];                                        // camera pulls back after photo 9 is placed
  const SPREAD = [.57, .95];                                     // the 90 arrive across this span
  const K_PLACE = 1, K_CORE = .66, K_END = .5;                   // table zoom (1 = placing scale)

  let built = false, direct = false;
  let layer = null, table = null, ext = null;
  let vw = 1, vh = 1, S = 1;
  const photos = [];
  let scenes = {};
  let loadedCore = false, loadedRest = false;

  const scene = (id) => scenes[id] || { start: 2, end: 3 };
  const lp = (id, p) => { const s = scene(id); return clamp01((p - s.start) / (s.end - s.start)); };

  /* ---------- build ---------- */
  function makePhoto(src, core, index) {
    const wrap = document.createElement('figure');
    wrap.className = 'collage-photo' + (core ? ' collage-photo--core' : '');
    wrap.style.margin = '0';
    wrap.style.display = 'none';
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    img.draggable = false;
    wrap.appendChild(img);
    return { el: wrap, img, src, core, index, ar: core ? 4 / 3 : 3 / 4, ready: false, _shown: false, _op: '', _blur: '', _z: '' };
  }

  function build() {
    const rand = mulberry32(((typeof CONFIG !== 'undefined' && CONFIG.seed) || 24102020) >>> 0);
    const core = typeof CORE_9 !== 'undefined' ? CORE_9 : [
      'uploads/91.jpg', 'uploads/92.jpg', 'uploads/93.jpg', 'uploads/94.jpg', 'uploads/95.jpg',
      'uploads/96.jpg', 'uploads/97.jpg', 'uploads/98.jpg', 'uploads/99.jpg'
    ];
    // MEMORY_90 is the exact filename manifest; prefix each filename with the upload directory.
    const rest = typeof MEMORY_90 !== 'undefined' ? MEMORY_90.map((name) => new URL(name, new URL('uploads/', document.baseURI)).href) : [];

    core.forEach((src, i) => {
      const P = makePhoto(src, true, i);
      const [x, y, rot, size] = CORE_SPOTS[i % CORE_SPOTS.length];
      P.tx = x + (rand() - .5) * .03; P.ty = y + (rand() - .5) * .03;
      P.rot = rot + (rand() - .5) * 2.4; P.size = size;
      P.win = [CORE_FROM + i * CORE_STEP, CORE_FROM + i * CORE_STEP + CORE_LEN];
      P.z = 300 + i;
      photos.push(P);
    });

    // Seeded shuffle: a stable display order, independent of file names.
    const order = rest.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    const n = order.length, golden = Math.PI * (3 - Math.sqrt(5));
    const span = SPREAD[1] - SPREAD[0], len = Math.min(.08, span * .25);
    order.forEach((srcIdx, j) => {
      const P = makePhoto(rest[srcIdx], false, j);
      // grows outward from the core: radius rises with arrival order, angle walks the golden angle
      const g = j / Math.max(1, n - 1);
      const r = .62 + Math.pow(g, .85) * .62 + (rand() - .5) * .1;
      const a = j * golden + (rand() - .5) * .7;
      P.tx = Math.cos(a) * r * 1.32; P.ty = Math.sin(a) * r * .82;
      P.rot = (rand() - .5) * 26;
      P.size = .5 + rand() * .2;
      const start = SPREAD[0] + g * (span - len);
      P.win = [start, start + len];
      P.z = 10 + Math.round(rand() * 200);   // a messy pile, always below the core nine
      P.origin = a;                           // the side of the table it is dealt from
      photos.push(P);
    });

    const frag = document.createDocumentFragment();
    // blurred, enlarged duplicate behind the photo in focus: fills the frame without stretching it
    ext = document.createElement('div');
    ext.className = 'photo-blur-ext';
    Object.assign(ext.style, { position: 'absolute', left: '0', top: '0', backgroundSize: 'cover', backgroundPosition: 'center', display: 'none', zIndex: '900', pointerEvents: 'none' });
    frag.appendChild(ext);
    for (const P of photos) frag.appendChild(P.el);
    table = document.createElement('div');
    table.className = 'collage-table';
    Object.assign(table.style, { position: 'absolute', left: '0', top: '0', width: '0', height: '0', transformOrigin: '0 0', display: 'none' });
    table.appendChild(frag);
    layer.appendChild(table);
  }

  /* ---------- loading: the core early, the 90 progressively as the scene nears ---------- */
  function attach(P, image) {
    P.img.src = image.src;
    P.ar = (image.naturalWidth || 4) / (image.naturalHeight || 3);
    P.ready = true;
    sizePhoto(P);
  }
  function loadSet(list) {
    const loader = typeof AssetLoading !== 'undefined' ? AssetLoading : null;
    if (loader && loader.loadProgressively) {
      loader.loadProgressively(list.map((P) => P.src), { concurrency: 3, onLoad: (image, _src, i) => attach(list[i], image) });
    } else {
      for (const P of list) { const im = new Image(); im.decoding = 'async'; im.onload = () => attach(P, im); im.src = P.src; }
    }
  }
  function ensureLoaded(p) {
    if (!loadedCore && p > scene('photo15').start) { loadedCore = true; loadSet(photos.filter((P) => P.core)); }
    if (!loadedRest && p > scene('happyMessage').start) { loadedRest = true; loadSet(photos.filter((P) => !P.core)); }
  }

  /* Equal visual area for every orientation; height follows the image (no crop, no stretch). */
  function sizePhoto(P) {
    const area = Math.pow((P.core ? .27 : .25) * S * P.size, 2);
    const w = Math.sqrt(area * P.ar);
    P.w = w; P.h = w / P.ar;
    const sw = `${f(w)}px`;
    if (P.el.style.width !== sw) P.el.style.width = sw;
    P.el.style.aspectRatio = P.ready ? '' : String(P.ar);
  }

  function resize() {
    vw = Math.max(1, window.innerWidth); vh = Math.max(1, window.innerHeight);
    S = Math.min(vw, vh * 1.55);
    for (const P of photos) sizePhoto(P);
  }

  /* ---------- per frame ---------- */
  function setShown(P, on) {
    if (P._shown === on) return;
    P.el.style.display = on ? '' : 'none';
    P._shown = on;
  }
  function style(P, x, y, scale, rot, op, blur, z) {
    P.el.style.transform = `translate3d(${f(x - P.w / 2)}px,${f(y - P.h / 2)}px,0) rotate(${f(rot)}deg) scale(${scale.toFixed(4)})`;
    const so = op >= .999 ? '1' : op.toFixed(3);
    if (P._op !== so) { P.el.style.opacity = so; P._op = so; }
    const sb = blur > .1 ? `blur(${blur.toFixed(2)}px)` : '';
    if (P._blur !== sb) { P.el.style.filter = sb; P._blur = sb; }
    const sz = String(z);
    if (P._z !== sz) { P.el.style.zIndex = sz; P._z = sz; }
  }

  function update(progress, cam, fromEvent) {
    if (!built) init();
    if (!built) return;
    if (!fromEvent) direct = true;
    const p = clamp01(progress);
    ensureLoaded(p);

    const cs = scene('collage99'), em = scene('emotionalText'), ov = scene('overview');
    const inCollage = p >= cs.start - .002 && p <= em.start + (em.end - em.start) * .12;
    const ovL = lp('overview', p);
    const inOverview = p > ov.start && p < ov.end;
    // while the table is out, it lies over the thread: the thread runs beneath the photographs
    const lift = inCollage ? '5' : '';
    if (layer._z !== lift) { layer.style.zIndex = lift; layer._z = lift; }
    if (!inCollage && !inOverview) {
      if (table._shown !== false) { table.style.display = 'none'; table._shown = false; }
      return;
    }
    if (table._shown !== true) { table.style.display = ''; table._shown = true; }

    const c = cam || (typeof Camera !== 'undefined' ? Camera.state : null) || { x: 3000, y: 2100, zoom: .3, tilt: 0 };
    const z = Math.max(.02, c.zoom || .3), tilt = c.tilt || 0;
    // the table lies at one place in the world, on the thread where the collage begins
    const T = typeof Memories !== 'undefined' && Memories.pointFor ? Memories.pointFor('collage99') : { x: c.x, y: c.y };
    const L = lp('collage99', p);

    let k, tableOp, worldScale;
    if (inOverview && !inCollage) {
      // a photo cluster on the journey map: fixed world size, so the overview zoom shrinks it
      k = K_END; worldScale = .25 / .3; tableOp = .85 * ease(seg(ovL, .05, .3)) * (1 - ease(seg(ovL, .8, 1)));
    } else {
      k = L < PULL[0] ? K_PLACE : L < SPREAD[0] + .02 ? mix(K_PLACE, K_CORE, ease(seg(L, PULL[0], PULL[1])))
        : mix(K_CORE, K_END, ease(seg(L, SPREAD[0], SPREAD[1] + .03)));
      worldScale = 1 / z;
      // after the collage, the photographs gradually leave and the frame goes black
      tableOp = 1 - ease(seg(p, em.start, em.start + (em.end - em.start) * .1));
    }
    table.style.transform = `translate3d(${f(T.x)}px,${f(T.y)}px,0) rotate(${(-tilt).toFixed(4)}rad) scale(${worldScale.toFixed(4)})`;
    const sto = tableOp >= .999 ? '1' : tableOp.toFixed(3);
    if (table._op !== sto) { table.style.opacity = sto; table._op = sto; }

    // the camera centre, in table px (screen px around T): where a photo is held for inspection
    // (table px → world is R(-tilt)·v / zoom, so world → table px is zoom · R(tilt)·d)
    const mapOnly = inOverview && !inCollage;
    const dx = c.x - T.x, dy = c.y - T.y, ct = Math.cos(tilt), st = Math.sin(tilt);
    const hx = mapOnly ? 0 : (dx * ct - dy * st) * z, hy = mapOnly ? 0 : (dx * st + dy * ct) * z;
    const stackX = hx, stackY = hy + vh * .42;   // the pile sits just below the frame

    let focus = null, focusAmt = 0;
    for (const P of photos) {
      const placedX = P.tx * S * k, placedY = P.ty * S * k, placedS = k;
      const t = mapOnly ? 1 : seg(L, P.win[0], P.win[1]);
      if (t <= 0 || (mapOnly && !P.ready)) { setShown(P, false); continue; }
      setShown(P, true);
      if (t >= 1) { style(P, placedX, placedY, placedS, P.rot, 1, 0, P.z); continue; }

      let x, y, s, rot, op, blur, zi = 1000 + P.index;
      if (P.core) {
        // pick up from the pile → inspect at almost full frame → put down on the table
        const fit = Math.min(vw * .78 / P.w, vh * .8 / P.h);
        const up = easeOut(seg(t, 0, .2)), grow = ease(seg(t, .12, .42)), down = ease(seg(t, .58, 1));
        const sx = mix(stackX, hx, up), sy = mix(stackY, hy, up);
        x = mix(sx, placedX, down); y = mix(sy, placedY, down);
        s = mix(mix(.32, fit, grow), placedS, down);
        // a little lift and drop as it is laid down ("moves backward" onto the table)
        s *= 1 - .06 * Math.sin(Math.PI * seg(t, .72, 1));
        rot = mix(mix(-6 + P.index * 1.3, 0, grow), P.rot, down);
        op = ease(seg(t, 0, .16));
        blur = 10 * (1 - ease(seg(t, 0, .3))) + 2.5 * Math.sin(Math.PI * seg(t, .62, .9));
        const amt = grow * (1 - down);
        if (amt > focusAmt) { focusAmt = amt; focus = { P, x, y, s }; }
      } else {
        // dealt from the table's edge: rises, a brief closer look, then laid in its place
        const inspect = 1.75;
        const ox = placedX + Math.cos(P.origin) * vw * .35, oy = placedY + Math.sin(P.origin) * vh * .35;
        const inT = easeOut(seg(t, 0, .35)), down = ease(seg(t, .45, 1));
        x = mix(mix(ox, placedX * .55, inT), placedX, down); y = mix(mix(oy, placedY * .55, inT), placedY, down);
        s = mix(mix(.5, inspect, inT) * k, placedS, down);
        rot = mix(P.rot * 1.8, P.rot, down);
        op = ease(seg(t, 0, .2));
        blur = 6 * (1 - ease(seg(t, 0, .35)));
        zi = 600 + P.index;   // above the pile while in the hand, below the photo in focus
      }
      style(P, x, y, s, rot, op, blur, zi);
    }

    // immersion behind the inspected core photo: its own blurred, enlarged copy (never stretched sharp)
    if (focus && focusAmt > .02) {
      if (ext._src !== focus.P.src) { ext.style.backgroundImage = `url("${focus.P.src}")`; ext._src = focus.P.src; }
      const W = vw * 1.25, H = vh * 1.25;
      ext.style.width = `${f(W)}px`; ext.style.height = `${f(H)}px`;
      ext.style.transform = `translate3d(${f(hx - W / 2)}px,${f(hy - H / 2)}px,0)`;
      ext.style.filter = 'blur(38px) brightness(.45)';
      ext.style.opacity = (.75 * focusAmt).toFixed(3);
      if (ext._shown !== true) { ext.style.display = ''; ext._shown = true; }
    } else if (ext._shown !== false) { ext.style.display = 'none'; ext._shown = false; }
  }

  function init() {
    if (built || typeof document === 'undefined') return api;
    layer = document.getElementById('collage-layer');
    if (!layer) return api;
    if (typeof STORY !== 'undefined') for (const s of STORY) scenes[s.id] = s;
    build();
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('timeline:progress', (ev) => { if (!direct && ev.detail) update(ev.detail.progress, null, true); });
    built = true;
    return api;
  }

  const api = {
    init, update, render: update, resize,
    get photos() { return photos.map((P) => ({ src: P.src, core: P.core, ready: P.ready })); },
    get count() { return photos.length; }
  };
  return api;
})();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => Collage99.init());
  else Collage99.init();
}
