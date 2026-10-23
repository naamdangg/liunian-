/* Memory scenes: photographs, captions, line drawings and messages placed in the one world.
   Everything is a pure function of master progress (and the camera state of that frame),
   so scrolling backwards replays every scene in reverse. Call Memories.update(progress, cam). */
const Memories = (() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const SCENE = {};
  for (const s of STORY) SCENE[s.id] = s;

  /* ---- exact story copy not already in STORY_COPY (verbatim from STORY_CONTENT.md) ---- */
  const COPY = Object.freeze({
    ltvName: 'Trường THCS&THPT Lương Thế Vinh - Cơ Sở Cầu Giấy',
    together: 'Chúng ta đã cùng nhau trải qua rất nhiều chuyện nhỉ',
    meaning: ['trái tim', 'chữ trọn đời trọn kiếp', 'tình yêu', 'bao giờ phai'],
    photo45: 'Lần đầu cùng đi chơi với lớp dưới danh nghĩa “một cặp”',
    photo6: 'Lần đầu chụp ptb',
    photo7: 'Lần đầu chụp kỷ yếu',
    photo8: 'Lần đầu “chung chăn gối”?',
    photo9: ['Lần đầu', 'Lần đầu được doodle ảnh ptb', ':))))'],
    firsts: [
      'Thực ra thì tất cả mọi trải nghiệm yêu đương của cả 2 đều là những lần đầu vô cùng đáng nhớ nhỉ',
      'Vì bọn mình là tình đầu của nhau mà', 'cuộn chuột mỏi tay chưa', 'cùng tớ ôn lại thêm thật nhiều nữa nhé'
    ],
    photo10: 'Anni 2 năm', photo11: 'ANNI 4 NĂM', photo12: 'ANNI 5 NĂM',
    hardTimes: ['Ngoài những khoảnh khắc lãng mạn', 'Tớ với Bông còn cùng nhau trải qua những lúc khó khăn'],
    photo13: ['Này là hồi lớp 9 cãi nhau xong tí thì chia tay nè', 'xong lại cùng nhau vượt qua như mọi lần'],
    photo14: ['Này lại là đợt lớp 12 nè', 'Cũng suýt nữa thì để mất nhau', 'Nhưng mà vẫn thế, lại cùng nhau vượt qua', 'Trên đường về tớ vui quá nên chụp ảnh nè'],
    photo15: ['Bonus ảnh áo phao dzai Hàn Quốc nè:))', 'Tại cậu bảo đợt đó mặc áo này nhìn đẹp zai nên mới xuôi xuôi'],
    photo16: ['Cùng nhau đội mưa nữa', 'cũng tính là một kiểu vượt khó ha'],
    photo17: [
      'Kể cả là đến hiện tại', 'Bọn mình vẫn luôn tìm ra cách để vượt qua những khó khăn ha',
      'Dù có cách cả ngàn cây số', 'Tớ với Bông vẫn luôn tìm được cách để cả 2 trái tim trở nên đồng điệu'
    ],
    happy: ['Nhưng tất nhiên chủ yếu là', 'Tớ và cậu đều đã có những khoảng thời gian hạnh phúc nhất với nhau'],
    heroLines: ['Tớ yêu Bông', 'Tớ yêu Bông rất nhiều', 'Yêu Bông nhiều nhất thế giới', 'Tớ yêu cậu'],
    essay: [
      { p: 'Đẹp thật nhỉ, chuyện tình mình. Nói thật lòng với cậu là trong lúc làm món quà này, khi tớ xem lại toàn bộ những bức ảnh, những kỉ niệm trong máy, tớ có nhiều cảm xúc đến mức không biết phải diễn tả ra sao.' },
      { p: 'Nhìn lại cả một đoạn hành trình mà cậu đã đồng hành cùng tớ - ⅓ cuộc đời hiện tại của tớ - tớ lại cảm thấy biết bao cảm xúc hỗn độn, cảm thấy bản thân may mắn, cảm thấy biết ơn, cảm thấy hạnh phúc, cảm thấy bản thân mắc nợ cậu quá nhiều. Mặc dù tớ đã nói câu này nhiều lần lắm rồi, nhưng tớ vẫn muốn nói lại:' },
      { h: '“Tớ yêu Bông”' }, { h: '“Tớ yêu Bông rất nhiều”' }, { h: '“Yêu Bông nhiều nhất thế giới”' },
      { p: 'Tớ vẫn luôn và sẽ luôn biết ơn cậu rất nhiều vì đã xuất hiện trong cuộc đời của tớ, cùng tớ trưởng thành. Cậu đã luôn và sẽ luôn là lý do để tớ tiếp tục cố gắng.' },
      { p: 'Tớ biết rằng bản thân tớ sẽ làm được, và cũng biết rằng cả 2 chúng ta sẽ cùng nhau làm được. Tớ biết rằng tớ và cậu sẽ lại cùng nhau vượt qua tất cả những gì sẽ tới trong tương lai. Mặc dù còn chả biết đó là gì, nhưng tớ biết, chỉ cần có cậu ở bên, dù có là chuyện gì rồi cũng có thể vượt qua hết.' },
      { p: 'Ngày này 6 năm trước, chuyện tình của mình bắt đầu. Đến ngày hôm nay, cả tớ và Bông đã cùng nhau tiếp tục bước sang những giai đoạn mới. Đây là giai đoạn mà cả hai cùng nuôi dưỡng tương lai của bản thân và của chính đôi mình. Mặc dù có những lúc bất lực vì nỗi nhớ chợt đến mà không thể làm gì. Nhưng tớ vẫn tin rằng tất cả mọi thứ đều xứng đáng. Ngày này 6 năm trước, tớ tin chắc hai đứa trẻ ấy chắc chắn đều không thể ngờ được rằng 6 năm sau chúng lại đang sống trong một tương lai hạnh phúc đến thế.' },
      { p: 'Tớ chúc cho chúng ta có thể tiếp tục hạnh phúc, hạnh phúc đến mức tớ và Bông ở hiện tại nếu nhìn vào sẽ phản ứng như cách tớ và Bông của 2020 phản ứng với hiện tại này. Rồi lại chúc cho tớ và Bông của 60 năm sau, khi nhìn lại cả một cuộc đời mà một nửa thực sự là đối phương, sẽ mỉm cười từ tận đáy lòng bởi đã luôn nỗ lực, luôn hết mình vì hiện tại' },
      { p: 'Một lần nữa, Nam xin cảm ơn Bông, cảm ơn cậu vì đã giúp tớ trở thành phiên bản hiện tại của chính tớ. Nam xin lỗi Bông vì những lần đã làm cậu tổn thương trong quá khứ. Nam chắc chắn sẽ yêu cậu nhiều hơn, cũng xin được cậu yêu nhiều hơn, xin cho Bông luôn hạnh phúc, xin cho chúng mình sẽ được tiếp tục có nhau là người yêu, là tri kỉ, và xin cho đoạn duyên này sẽ không bao giờ đứt, xin cho tất cả những sự chân thành, tất cả những nỗ lực của cả 2 sẽ được bánh xe của số phận tác thành.' }
    ]
  });

  /* ---- math ---- */
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const seg = (v, a, b) => clamp01((v - a) / ((b - a) || 1e-6));
  const ease = (t) => { t = clamp01(t); return t * t * (3 - 2 * t); };
  const mix = (a, b, t) => a + (b - a) * t;
  const f = (n) => Math.round(n * 100) / 100;
  const at = (id, t) => SCENE[id].start + (SCENE[id].end - SCENE[id].start) * t;
  const lp = (id, p) => clamp01((p - SCENE[id].start) / (SCENE[id].end - SCENE[id].start));
  const inRange = (p, a, b) => p >= a && p <= b;
  // lily beats (story.js): black, thread fade-in, fall, hold, grow, bloom
  const LT = typeof LILY_TIMING !== 'undefined' ? LILY_TIMING : {
    overviewFadeEnd: .12, blackStart: .12, threadFadeStart: .22, threadFadeEnd: .30,
    fallStart: .30, fallEnd: .52, holdEnd: .58, heroGrowEnd: .78, bloomEnd: 1
  };

  /* ---- state ---- */
  let built = false, direct = false, bootTime = 0;
  let vw = 1, vh = 1, narrow = false;
  const els = {};
  const texts = [];
  const nodes = [];
  const pointCache = {};
  let morphTargets = [];
  let focusNow = 0;
  const last = { drawn: -1, presence: -1, tint: -1, tintColor: '', under: null, immersion: '', immOp: -1, scene: '', fall: 0, nodes: null };

  /* Camera centre (world px) the camera module will have at master progress p. */
  function camCenterAt(p) {
    if (typeof Camera === 'undefined' || !Camera.semanticAt) return { x: 3000, y: 2100 };
    if (Camera.centerAt) return Camera.centerAt(p);
    const s = Camera.semanticAt(p);
    const t = Camera.threadAt ? Camera.threadAt(p) : null;
    return t ? { x: mix(s.x, t.x, .76), y: mix(s.y, t.y, .76) } : { x: s.x, y: s.y };
  }
  function pointAtP(p) {
    const key = p.toFixed(5);
    if (pointCache[key]) return pointCache[key];
    const c = camCenterAt(p);
    if (typeof THREAD === 'undefined' || THREAD.ready) pointCache[key] = c;
    return c;
  }
  const pointFor = (id) => pointAtP((SCENE[id].start + SCENE[id].end) / 2);

  /* Screen-pixel offset from a world point → world point (undoes camera zoom and tilt). */
  function W(base, sx, sy, F) {
    return { x: base.x + (sx * F.cos + sy * F.sin) / F.z, y: base.y + (-sx * F.sin + sy * F.cos) / F.z };
  }
  /* HTML element at a world point, upright on screen, `sc` = on-screen scale. */
  function place(e, pt, sc, F, extra = '', rot = 0) {
    e.style.transform = `translate3d(${f(pt.x)}px,${f(pt.y)}px,0) rotate(${(rot - F.tilt).toFixed(4)}rad) scale(${(sc / F.z).toFixed(4)})${extra ? ' ' + extra : ''}`;
  }
  function show(e, o) {
    if (!(o > .002)) {
      if (e._shown !== false) { e.style.display = 'none'; e._shown = false; }
      return false;
    }
    if (e._shown !== true) { e.style.display = ''; e._shown = true; }
    const s = o >= .999 ? '1' : o.toFixed(3);
    if (e._op !== s) { e.style.opacity = s; e._op = s; }
    return true;
  }
  function setDraw(path, v) {
    const s = v >= .999 ? '1' : v.toFixed(3);
    if (path._draw !== s) { path.style.setProperty('--draw', s); path._draw = s; }
  }
  function blurOf(e, px) {
    const s = px > .08 ? `blur(${px.toFixed(2)}px)` : '';
    if (e._blur !== s) { e.style.filter = s; e._blur = s; }
  }

  /* ---- DOM helpers ---- */
  // Vietnamese marks render as precomposed (NFC) glyphs; the source copy itself is never changed
  const nfc = (text) => String(text).normalize('NFC');
  function el(tag, cls, parent, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = nfc(text);
    if (parent) parent.appendChild(e);
    return e;
  }
  function worldEl(e) {
    e.style.left = '0px';
    e.style.top = '0px';
    e.style.display = 'none';
    e._shown = false;
    return e;
  }
  function svg(tag, attrs, parent) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) e.setAttribute(k, v);
    if (parent) parent.appendChild(e);
    return e;
  }
  function drawPath(d, parent, extra = {}) {
    return svg('path', { d, pathLength: 1, class: 'draw-path', ...extra }, parent);
  }
  // Keep the three non-manifest story assets explicit. The photo nodes use nf1–nf17,
  // whose URLs come from the shared story manifest rather than guessed filenames.
  const STORY_SRC = new Map(STORY_IMAGES.map((image) => [image.id, image.src]));
  const FIXED_SRC = { tata: 'uploads/tata.jpg', qr: 'uploads/qr.jpg' };
  const src = (name) => STORY_SRC.get(name) || FIXED_SRC[name] || '';
  const hexRgb = (hex) => { const h = hex.replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };

  /* Long lines get a calmer size so nothing is ever clipped. */
  function sizeText(e, text) {
    const n = text.length;
    if (n > 200) { e.style.fontSize = 'clamp(1rem, .85rem + .7vw, 1.45rem)'; e.style.maxWidth = 'min(88vw, 60ch)'; e.style.lineHeight = '1.62'; }
    else if (n > 105) { e.style.fontSize = 'clamp(1.1rem, .9rem + 1vw, 1.9rem)'; e.style.maxWidth = 'min(88vw, 44ch)'; e.style.lineHeight = '1.45'; }
    else if (n > 58) { e.style.fontSize = 'clamp(1.2rem, .95rem + 1.5vw, 2.4rem)'; e.style.maxWidth = 'min(88vw, 36ch)'; }
  }

  /* ---- free-standing messages (thread ⇄ text) ---- */
  function addText(text, anchor, r, opts = {}) {
    const hero = COPY.heroLines.includes(text);
    const e = worldEl(el('p', 'neon-text' + (hero ? ' neon-text--hero' : '') + (opts.cls ? ' ' + opts.cls : ''), els.textLayer, text));
    e.style.width = 'max-content';
    if (!hero) sizeText(e, text);
    const t = { el: e, text, anchor, a: r.a, b: r.b, c: r.c, d: r.d, mode: opts.mode || 'thread', exit: opts.exit || null, oy: opts.oy || 0 };
    texts.push(t);
    return t;
  }
  /* Consecutive lines in [from, to]: each replaces the previous (old → gone → new). */
  function seqRanges(list, from, to) {
    const w = list.map((s) => 1 + s.length / 70);
    const sum = w.reduce((a, b) => a + b, 0);
    let acc = from;
    return w.map((wi) => {
      const span = (to - from) * wi / sum;
      const r = { a: acc, b: acc + span * .26, c: acc + span * .8, d: acc + span * .98 };
      acc += span;
      return r;
    });
  }
  function addSequence(list, anchor, from, to, modeFirst = 'thread', modeRest = 'fade') {
    seqRanges(list, from, to).forEach((r, i) => addText(list[i], anchor, r, { mode: i ? modeRest : modeFirst }));
  }

  function renderText(t, F) {
    const p = F.p;
    if (p < t.a || p > t.d) { show(t.el, 0); return; }
    const e = ease(seg(p, t.a, t.b)), u = seg(p, t.c, t.d);
    if (!show(t.el, e * (1 - u))) return;
    let extra = '', blur = 0, dx = 0, dy = 0;
    if (t.mode === 'twist') {
      const k = 1 - e;
      extra = `rotate(${f(-14 * k + 16 * u)}deg) skewX(${f(30 * k - 38 * u)}deg) scale(${f(.62 + .38 * e - .35 * u)}, ${f(.35 + .65 * e - .75 * u)})`;
      blur = 5 * k + 4 * u;
    } else if (t.mode === 'thread') {
      // letters condense out of a stretched strand, then unravel back into it
      extra = `scale(${f(1 + .5 * (1 - e) + .6 * u)}, ${f(.1 + .9 * e - .9 * u)})`;
      blur = 6 * (1 - e) + 5 * u;
      if (t.exit === 'right') dx = u * .45 * vw;
    } else {
      dy = (1 - e) * 14 - u * 12;
      blur = 3 * (1 - e) + 3 * u;
    }
    const base = pointFor(t.anchor);
    const pt = W({ x: mix(base.x, F.cam.x, .6), y: mix(base.y, F.cam.y, .6) }, dx, dy + t.oy * vh, F);
    place(t.el, pt, 1, F, extra);
    blurOf(t.el, blur);
    morphTargets.push({ text: t.text, el: t.el, form: e, release: u, mode: t.mode });
  }

  /* ---- photo memories along the road ---- */
  function seqCaps(list, s, e, opts = {}) {
    const slot = (e - s) / list.length;
    return list.map((t, i) => {
      const a = s + i * slot, last = i === list.length - 1;
      return { t, a, b: a + slot * .25, c: last ? null : a + slot * .8, d: last ? null : a + slot * .98, rise: opts.rise === i };
    });
  }
  const NODE_SPECS = [
    { scenes: ['photo2', 'photo3'], imgs: ['nf2', 'nf3'], shape: 'portrait', torn: true, stack: [.5, .78], exit: 'left', caps: [] },
    { scenes: ['photo4', 'photo5'], imgs: ['nf4', 'nf5'], shape: 'portrait', stack: [.5, .74], caps: [{ t: COPY.photo45, a: .26, b: .42 }] },
    { scenes: ['photo6'], imgs: ['nf6'], shape: 'long', pan: true, caps: [{ t: COPY.photo6, a: .3, b: .5 }] },
    { scenes: ['photo7'], imgs: ['nf7'], shape: 'portrait', caps: [{ t: COPY.photo7, a: .28, b: .46 }] },
    { scenes: ['photo8'], imgs: ['nf8'], shape: 'portrait', photoIn: [.5, .7], caps: [],
      neon: [{ t: COPY.photo8, a: 0, b: .18, c: .4, d: .5 }] },
    { scenes: ['photo9'], imgs: ['nf9'], shape: 'portrait', photoOut: [.28, .4], caps: [],
      neon: [{ t: COPY.photo9[0], a: .4, b: .47, c: .54, d: .59 }, { t: COPY.photo9[1], a: .6, b: .67, c: .75, d: .8 }, { t: COPY.photo9[2], a: .82, b: .9, c: null, d: null }] },
    { scenes: ['photo10'], imgs: ['nf10'], shape: 'landscape', side: 'below', caps: [{ t: COPY.photo10, a: .28, b: .46 }] },
    { scenes: ['photo11'], imgs: ['nf11'], shape: 'landscape', side: 'above', caps: [{ t: COPY.photo11, a: .28, b: .46 }] },
    { scenes: ['photo12'], imgs: ['nf12'], shape: 'landscape', side: 'below', caps: [{ t: COPY.photo12, a: .28, b: .46 }] },
    { scenes: ['photo13'], imgs: ['nf13'], shape: 'portrait', caps: seqCaps(COPY.photo13, .2, 1) },
    { scenes: ['photo14'], imgs: ['nf14'], shape: 'portrait', side: 'left', caps: seqCaps(COPY.photo14, .14, 1) },
    { scenes: ['photo15'], imgs: ['nf15'], shape: 'portrait', caps: seqCaps(COPY.photo15, .2, 1) },
    { scenes: ['photo16'], imgs: ['nf16'], shape: 'square', side: 'left',
      caps: [{ t: COPY.photo16[0], a: .2, b: .32, c: .48, d: .56 }, { t: COPY.photo16[1], a: .68, b: .8, c: null, d: null }] },
    { scenes: ['photo17'], imgs: ['nf17'], shape: 'landscape', side: 'below', caps: seqCaps(COPY.photo17, .12, 1, { rise: 2 }) }
  ];

  function photoSizes(shape) {
    if (narrow) {
      return { portrait: [.8 * vw, .5 * vh], landscape: [.88 * vw, .36 * vh], long: [.6 * vw, .56 * vh], square: [.8 * vw, .44 * vh] }[shape];
    }
    return { portrait: [.36 * vw, .64 * vh], landscape: [.54 * vw, .56 * vh], long: [.3 * vw, .82 * vh], square: [.42 * vw, .58 * vh] }[shape];
  }

  function buildNode(spec, i) {
    const root = worldEl(el('div', 'memory-node', els.memoryLayer));
    root.dataset.memory = spec.scenes.join('+');
    const ext = el('div', 'photo-blur-ext', root);
    const frames = spec.imgs.map((name, j) => {
      const fr = el('div', 'photo-frame' + (spec.torn ? ' photo-frame--torn' : ''), root);
      const img = el('img', 'photo-sharp', fr);
      img.alt = '';
      img.decoding = 'async';
      img.draggable = false;
      if (j > 0) { fr.style.position = 'absolute'; fr.style.left = '50%'; fr.style.top = '50%'; }
      return { fr, img, name };
    });
    const caps = spec.caps.map((c) => {
      const e = el('p', 'caption', root, c.t);
      e.style.width = 'max-content';
      e.style.display = 'none';
      e._shown = false;
      return { ...c, el: e };
    });
    const neon = (spec.neon || []).map((c) => {
      const e = el('p', 'neon-text', root, c.t);
      e.style.width = 'max-content';
      e.style.left = '50%';
      e.style.top = '50%';
      e.style.display = 'none';
      e._shown = false;
      return { ...c, el: e };
    });
    const s0 = SCENE[spec.scenes[0]].start, s1 = SCENE[spec.scenes[spec.scenes.length - 1]].end;
    return { ...spec, i, root, ext, frames, caps, neon, s0, s1, loaded: false, rot: ((i * 37) % 11 - 5) * .028 };
  }

  function layoutNode(n) {
    const [mw, mh] = photoSizes(n.shape);
    for (const fr of n.frames) { fr.img.style.maxWidth = `${f(mw)}px`; fr.img.style.maxHeight = `${f(mh)}px`; }
    n.sideNow = narrow && (n.side === 'right' || n.side === 'left' || !n.side) ? 'below' : (n.side || 'right');
    for (const c of n.caps) {
      const s = c.el.style;
      s.left = s.right = s.top = s.bottom = '';
      if (n.sideNow === 'right') { s.left = 'calc(100% + 28px)'; s.top = '50%'; s.translate = '0 -50%'; }
      else if (n.sideNow === 'left') { s.right = 'calc(100% + 28px)'; s.top = '50%'; s.translate = '0 -50%'; }
      else if (n.sideNow === 'above') { s.left = '50%'; s.bottom = 'calc(100% + 22px)'; s.translate = '-50% 0'; }
      else { s.left = '50%'; s.top = 'calc(100% + 22px)'; s.translate = '-50% 0'; }
    }
    const sideShift = { right: [-.1 * vw, 0], left: [.1 * vw, 0], above: [0, .07 * vh], below: [0, -.07 * vh] }[n.sideNow];
    n.offset = n.caps.length ? sideShift : [0, 0];
  }

  function loadNode(n) {
    if (n.loaded) return;
    n.loaded = true;
    n.frames.forEach((fr, j) => {
      fr.img.src = src(fr.name);
      if (j === 0) n.ext.style.backgroundImage = `url("${src(fr.name)}")`;
    });
  }

  const itemOp = (c, l) => seg(l, c.a, c.b) * (c.c == null ? 1 : 1 - seg(l, c.c, c.d));

  function renderNode(n, F) {
    const p = F.p, span = n.s1 - n.s0;
    const raw = (p - n.s0) / span, l = clamp01(raw);
    if (p > n.s0 - .06 && !n.loaded) loadNode(n);

    // the overview keeps none of these nodes: only nf1 + nf2 stay (renderOverviewPair)
    if (p >= SCENE.essay.start) { show(n.root, 0); return; }

    const a = ease(seg(raw, -.5, .12));
    let o = a, sx = n.offset[0] + (1 - a) * .45 * vw, sy = n.offset[1], sc = .78 + .22 * a;
    let capMul = 1;
    const motion = F.reduced ? .5 : 1;
    if (n.exit === 'left') {
      const ls = lp('sCurve', p), e2 = ease(seg(ls, 0, .4));
      sx -= e2 * .55 * vw * motion;
      sc *= 1 - .3 * e2;
      o *= 1 - seg(ls, .2, .48);
    } else {
      // older memories stay behind the travelling camera, then drop out of sight
      const d = Math.max(0, (p - n.s1) / .012);
      sx -= d * .42 * vw * motion;
      sy += d * .04 * vh;
      sc *= 1 - .22 * Math.min(d, 2) / 2;
      o *= 1 - seg(d, 1, 2.2);
      capMul = 1 - .35 * seg(d, 0, .5);
    }
    if (n.pan) sy += (.06 - .12 * l) * vh;
    if (!show(n.root, o)) return;
    place(n.root, W(pointAtP((n.s0 + n.s1) / 2), sx, sy, F), sc, F, '', n.rot * .25);

    let photoVis = 1;
    if (n.photoIn) photoVis = ease(seg(l, n.photoIn[0], n.photoIn[1]));
    if (n.photoOut) photoVis = 1 - seg(l, n.photoOut[0], n.photoOut[1]);
    const A = n.frames[0];
    A.fr.style.opacity = photoVis.toFixed(3);
    A.fr.style.transform = n.frames.length > 1 ? 'rotate(-2.5deg)' : '';
    if (n.frames[1]) {
      const B = n.frames[1], b = ease(seg(l, n.stack[0], n.stack[1]));
      B.fr.style.opacity = seg(l, n.stack[0], n.stack[0] + .08).toFixed(3);
      B.fr.style.transform = `translate(-50%, -50%) translate(${f(.035 * vw)}px, ${f(.03 * vh - (1 - b) * 90)}px) rotate(${f(10 - 7 * b)}deg) scale(${f(1.14 - .14 * b)})`;
    }
    n.ext.style.opacity = (.85 * photoVis).toFixed(3);
    for (const c of n.caps) {
      if (show(c.el, itemOp(c, l) * capMul) && c.rise) c.el.style.transform = `translateY(${f(-seg(l, c.c, c.d) * 46)}px)`;
    }
    for (const c of n.neon) {
      const u = c.c == null ? 0 : seg(l, c.c, c.d);
      if (show(c.el, itemOp(c, l))) blurOf(c.el, 3 * (1 - seg(l, c.a, c.b)) + 3 * u);
    }
    const focus = a * (n.exit === 'left' ? 1 - seg(lp('sCurve', p), 0, .3) : 1 - seg((p - n.s1) / .012, 0, .6)) * photoVis;
    if (focus > F.focus.v) { F.focus.v = focus; F.focus.src = n.frames[n.frames.length > 1 && l > n.stack[1] ? 1 : 0].img.getAttribute('src') || ''; }
  }

  /* ---- overview: the first two photographs, side by side left of the letter ---- */
  function buildOverviewPair() {
    const root = worldEl(el('div', 'memory-node', els.memoryLayer));
    root.dataset.memory = 'overview';
    const row = el('div', '', root);
    Object.assign(row.style, { display: 'flex', alignItems: 'center', gap: '2vw' });
    const frames = ['nf1', 'nf2'].map((name, j) => {
      const fr = el('div', 'photo-frame', row);
      fr.style.transform = `rotate(${j ? 2 : -2}deg)`;
      const img = el('img', 'photo-sharp', fr);
      img.alt = '';
      img.decoding = 'async';
      img.draggable = false;
      return { fr, img, name };
    });
    els.pair = { root, frames, loaded: false };
  }
  function sizeOverviewPair() {
    for (const { img } of els.pair.frames) {
      img.style.maxWidth = `${f((narrow ? .3 : .17) * vw)}px`;
      img.style.maxHeight = `${f((narrow ? .2 : .38) * vh)}px`;
    }
  }
  function renderOverviewPair(F) {
    const p = F.p, P = els.pair;
    if (!P.loaded && p > SCENE.essay.start - .03) { P.loaded = true; P.frames.forEach((fr) => { fr.img.src = src(fr.name); }); }
    // no head start: the pair shares the letter's and the collage's entrance window
    if (!show(P.root, overviewPresence(p))) return;
    place(P.root, W(F.cam, (narrow ? -.18 : -.3) * vw, (narrow ? .3 : -.02) * vh, F), 1, F);
  }

  /* ---- opening: ẢNH 1 behind glass, blur, black pull ---- */
  function buildOpening() {
    const g = worldEl(el('div', 'glass-memory', els.memoryLayer));
    const img = el('img', 'photo-sharp', g);
    img.alt = 'Ảnh 1';
    img.decoding = 'async';
    img.fetchPriority = 'high';
    el('div', 'glass-memory__pane', g);
    g.style.width = `${f(.5 * vw)}px`;
    img.addEventListener('load', () => { els.openingAR = img.naturalWidth / Math.max(1, img.naturalHeight); sizeOpening(); });
    img.src = src('nf1');
    els.glass = g;
    const iris = worldEl(el('div', '', els.memoryLayer));
    iris.style.position = 'absolute';
    iris.style.translate = '-50% -50%';
    els.iris = iris;
  }
  function sizeOpening() {
    const ar = els.openingAR || 1.4;
    els.glass.style.width = `${f(Math.min(.6 * vw, .62 * vh * ar))}px`;
    const side = 1.7 * Math.max(vw, vh);
    els.iris.style.width = els.iris.style.height = `${f(side)}px`;
  }
  function renderOpening(F) {
    const p = F.p;
    if (p > SCENE.blackPull.end + .002) { show(els.glass, 0); show(els.iris, 0); return; }
    const lo = lp('opening', p), lb = lp('blackPull', p);
    const intro = ease(clamp01((performance.now() - bootTime) / 1700));
    const o = intro * (1 - seg(lb, .45, .9));
    if (show(els.glass, o)) {
      const base = pointFor('opening');
      const zoom = (1 + .22 * ease(lo) + 1.7 * Math.pow(ease(lb), 1.4)) * (.94 + .06 * intro);
      place(els.glass, { x: mix(base.x, F.cam.x, .7), y: mix(base.y, F.cam.y, .7) }, zoom, F);
      els.glass.style.setProperty('--glass-blur', `${f(16 * ease(lo) + 10 * lb)}px`);
      els.glass.style.setProperty('--glass-bright', f(1 - .42 * lo - .5 * lb));
    }
    if (show(els.iris, lb > 0 ? 1 : 0)) {
      const r = 6 + 78 * ease(lb);
      els.iris.style.background = `radial-gradient(circle at 50% 50%, var(--bg) 0, var(--bg) ${f(r)}%, transparent ${f(r + 24)}%)`;
      place(els.iris, F.cam, 1, F);
    }
  }

  /* ---- Lương Thế Vinh: white neon line art reconstructed from uploads/ltv.jpg ---- */
  function cloud(cx, cy, r, n = 9) {
    let d = '';
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * .8;
      if (!i) { d = `M${f(x)} ${f(y)}`; continue; }
      const am = a - Math.PI / n;
      d += ` Q${f(cx + Math.cos(am) * r * 1.38)} ${f(cy + Math.sin(am) * r * 1.1)} ${f(x)} ${f(y)}`;
    }
    return `${d} M${cx} ${f(cy + r * .72)} L${cx} ${f(cy + r * 1.6)}`;
  }
  function buildLtv() {
    const host = document.getElementById('ltv-art');
    const g = svg('g', { class: 'line-art--white' }, host);
    g.style.display = 'none';
    g._shown = false;
    let win = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) {
      const u = (c + .5) / 12, x = 150 + u * 410, y = 215 - u * 115 + 22 + r * 30;
      if (x < 330 && r > 0) continue;
      win += `M${f(x)} ${f(y)} l14 -4 l0 12 l-14 4 Z `;
    }
    const D = [
      'M560 620 Q760 470 1000 372', 'M655 620 Q835 520 1000 452',              // the road
      'M10 432 Q120 522 262 470 L232 400 Q120 360 10 382',                       // yard
      'M60 170 L470 60 L560 100 L150 215 Z',                                     // main roof
      'M150 215 L150 330 L560 215 L560 100', 'M60 170 L60 285 L150 330',         // main faces
      'M195 200 L420 137 L420 105 L195 168 Z',                                   // name board
      win,
      'M170 300 L270 272 L320 292 L220 322 Z', 'M220 322 L220 410 L320 380 L320 292 M170 300 L170 385 L220 410', // small block
      'M232 352 l70 -20 M232 372 l70 -20 M232 392 l70 -20',
      'M430 330 L760 240 L900 300 L570 395 Z', 'M500 362 L830 270',              // hall roof + ridge
      'M570 395 L570 440 L900 345 L900 300 M430 330 L430 372 L570 440',          // hall faces
      cloud(110, 470, 40), cloud(250, 525, 46), cloud(395, 470, 34), cloud(520, 530, 52),
      cloud(705, 470, 40), cloud(960, 190, 34), cloud(625, 165, 30), cloud(40, 95, 34),
      'M300 612 L300 482 Q302 464 322 466 L338 470',                             // street lamp
      'M905 92 m-20 0 a20 20 0 1 0 40 0 a20 20 0 1 0 -40 0 M905 52 v-14 M945 92 h14 M933 64 l10 -10 M877 64 l-10 -10 M933 120 l10 10' // sun rays
    ];
    const paths = D.map((d, i) => {
      const e = drawPath(d, g);
      e._win = [.22 + .5 * i / D.length, .22 + .5 * i / D.length + .22];
      return e;
    });
    const labels = [
      ['LƯƠNG THẾ VINH', 307, 160, -15.6, 25],
      ['CÓ CHÍ THÌ NÊN', 262, 300, -16, 12],
      ['NHÀ ĂN', 842, 334, -16, 15]
    ].map(([t, x, y, r, s]) => {
      const e = svg('text', { x, y, transform: `rotate(${r} ${x} ${y})`, 'text-anchor': 'middle', 'font-size': s, 'letter-spacing': 2, class: 'line-art-text' }, g);
      e.style.fill = 'var(--line-white)';
      e.textContent = nfc(t);
      return e;
    });
    const pin = worldEl(el('span', 'location-pin', els.textLayer, '📍'));
    pin.style.transformOrigin = '50% 100%';
    pin.setAttribute('aria-hidden', 'true');
    const label = worldEl(el('p', 'neon-text neon-text--white', els.textLayer, COPY.ltvName));
    label.style.fontSize = 'clamp(1.05rem, .8rem + 1.1vw, 1.8rem)';
    label.style.width = 'max-content';
    label.style.maxWidth = 'min(86vw, 30ch)';
    els.ltv = { g, paths, labels, pin, label };
  }
  function renderLtv(F) {
    const p = F.p, L = els.ltv;
    const l = lp('ltv', p), lm = lp('ltvMessage', p);
    const vis = inRange(p, SCENE.ltv.start - .002, at('ltvMessage', .4));
    if (!vis) { show(L.g, 0); show(L.pin, 0); show(L.label, 0); return; }
    const zoomIn = ease(seg(lm, 0, .38)), fade = 1 - seg(lm, .12, .38);
    const grow = 1 + .9 * zoomIn;
    const artW = Math.min(.7 * vw, .5 * vh / .62), sArt = artW / 1000;
    const P = pointFor('ltv');
    const c = W(P, 0, .1 * vh * grow, F);
    if (show(L.g, fade)) {
      L.g.setAttribute('transform', `translate(${f(c.x)} ${f(c.y)}) rotate(${f(-F.tilt * 57.2958)}) scale(${(sArt * grow / F.z).toFixed(4)}) translate(-500 -310)`);
      L.g.style.strokeWidth = `${f(2.2 / sArt)}px`;
      for (const e of L.paths) setDraw(e, ease(seg(l, e._win[0], e._win[1])));
      const to = seg(l, .74, .9).toFixed(3);
      for (const t of L.labels) t.style.opacity = to;
    }
    const artTop = .1 * vh - artW * .31;
    const pe = ease(seg(l, 0, .16));
    if (show(L.label, seg(l, .1, .28) * fade)) place(L.label, W(P, 0, (artTop - .07 * vh) * grow, F), grow, F);
    if (show(L.pin, pe * fade)) place(L.pin, W(P, 0, (artTop - .13 * vh) * grow - (1 - pe) * 60, F), grow, F);
  }

  /* ---- Tata V BTS: local red, two bubbles one at a time ---- */
  function buildTata() {
    const root = worldEl(el('div', 'memory-node', els.memoryLayer));
    const img = el('img', 'photo-sharp', root);
    img.alt = 'Tata V BTS';
    img.decoding = 'async';
    img.style.borderRadius = '18px';
    img.addEventListener('load', () => { els.tataAR = img.naturalWidth / Math.max(1, img.naturalHeight); });
    const b1 = worldEl(el('p', 'speech-bubble', els.textLayer, STORY_COPY.tataFirst));
    const b2 = worldEl(el('p', 'speech-bubble', els.textLayer, STORY_COPY.tataSecond));
    for (const b of [b1, b2]) { b.style.transformOrigin = '50% 100%'; b.style.width = 'max-content'; }
    els.tata = { root, img, b1, b2, loaded: false };
  }
  function sizeTata() {
    const t = els.tata;
    t.img.style.maxHeight = `${f(.58 * vh)}px`;
    t.img.style.maxWidth = `${f((narrow ? .8 : .5) * vw)}px`;
  }
  function renderTata(F) {
    const p = F.p, T = els.tata, tint = els.tint;
    if (!T.loaded && p > SCENE.tata.start - .05) { T.loaded = true; T.img.src = src('tata'); }
    const inScene = inRange(p, SCENE.tata.start, SCENE.tata.end);
    const l = lp('tata', p);
    let tintOp = 0, under = false, red = 0, threadTint = 0;
    if (inScene) {
      red = seg(l, .08, .24);
      under = l >= .24;
      tintOp = under ? 1 - seg(l, .8, 1) : seg(l, 0, .14);
      threadTint = red * (1 - seg(l, .8, 1));
    }
    if (tint) {
      const so = tintOp.toFixed(3);
      if (tint._op !== so) { tint.style.opacity = so; tint._op = so; }
      if (last.under !== under) { tint.classList.toggle('is-under', under); last.under = under; }
      if (tintOp > 0) {
        const a = hexRgb(THEME.neonPink), b = hexRgb(typeof TATA_RED !== 'undefined' ? TATA_RED : THEME.mainCrimson);
        const col = `rgb(${a.map((v, i) => Math.round(mix(v, b[i], red))).join(',')})`;
        if (last.tintColor !== col) { tint.style.setProperty('--tata-red', col); last.tintColor = col; }
      } else if (last.tintColor) { tint.style.removeProperty('--tata-red'); last.tintColor = ''; }
    }
    if (typeof THREAD !== 'undefined' && THREAD.ready && Math.abs(last.tint - threadTint) > .001) { THREAD.setTint(threadTint); last.tint = threadTint; }

    const P = pointFor('tata');
    const o = inScene ? seg(l, .24, .36) * (1 - seg(l, .78, .9)) : 0;
    if (show(T.root, o)) place(T.root, W(P, 0, .06 * vh, F), 1.05 - .05 * seg(l, .24, .4), F);
    const ar = els.tataAR || .8;
    const hT = Math.min(.58 * vh, (narrow ? .8 : .5) * vw / ar);
    const tip = W(P, 0, .06 * vh - hT / 2 - 18, F);
    const bubble = (b, a0, a1, c0, c1) => {
      const e = inScene ? seg(l, a0, a1) * (1 - seg(l, c0, c1)) : 0;
      if (show(b, e)) place(b, tip, .86 + .14 * ease(seg(l, a0, a1)), F);
    };
    bubble(T.b1, .36, .42, .5, .54);
    bubble(T.b2, .56, .62, .72, .76);
  }

  /* ---- 24-10-2020: twist result, the fall, the climb back, 2 4 1 0 and its meaning ---- */
  const DATE_CHARS = '24-10-2020'.split('');
  const D_INIT = DATE_CHARS.map((_, i) => (i - 4.5) * .62);
  const KEEP = [0, 1, 3, 4], HY = [2, 5];
  const D_MID = { 0: -3, 1: -2, 3: -1, 4: 0, 6: 1.25, 7: 1.87, 8: 2.49, 9: 3.11 };
  const D_FIN = { 0: -1.65, 1: -.55, 3: .55, 4: 1.65 };
  function buildDate() {
    const box = worldEl(el('div', 'neon-text neon-text--date', els.textLayer));
    box.style.padding = '0';
    box.style.width = '0';
    box.style.height = '0';
    box.setAttribute('aria-label', STORY_COPY.date);
    const glyphs = DATE_CHARS.map((ch) => {
      const s = el('span', '', box, ch);
      s.style.position = 'absolute'; s.style.left = '0'; s.style.top = '0';
      s.setAttribute('aria-hidden', 'true');
      return s;
    });
    const rows = COPY.meaning.map((t) => {
      const s = el('span', '', box, t);
      s.style.position = 'absolute'; s.style.left = '0'; s.style.top = '0'; s.style.whiteSpace = 'nowrap';
      s.style.opacity = '0';
      return s;
    });
    els.date = { box, glyphs, rows, meas: null };
  }
  function measureMeaning() {
    const D = els.date;
    const px = parseFloat(getComputedStyle(D.box).fontSize) || 64;
    const widths = D.rows.map((r) => r.offsetWidth / px);
    if (!widths[1]) return null;
    const rowW = .6 + .2 + Math.max(...widths);
    return { px, colX: -rowW / 2 + .3, scale: Math.min(.55, .86 * vw / (rowW * px)) };
  }
  function renderDate(F) {
    const p = F.p, D = els.date;
    if (p < at('twist', .74) || p > SCENE.meaning2410.end) { show(D.box, 0); return; }
    const form = ease(seg(p, at('twist', .76), at('twist', .95)));
    let off = 0, sc = 1, o = form, extra = form < 1 ? `scale(${f(1 + .4 * (1 - form))}, ${f(.15 + .85 * form)})` : '', blur = 5 * (1 - form);
    if (p >= SCENE.drop.start) {
      const e = ease(lp('drop', p));
      off = -.38 * vh * e; sc = 1 - .45 * e; o = 1 - .5 * e;
    }
    const ld = lp('date2410', p);
    if (p >= SCENE.date2410.start) {
      const r = ease(seg(ld, 0, .35));
      off = mix(-.38 * vh, 0, r); sc = mix(.55, 1.2, r); o = mix(.5, 1, r);
    }
    let m = 0, lm = 0;
    if (p >= SCENE.meaning2410.start) {
      lm = lp('meaning2410', p);
      if (!D.meas && D.box._shown) D.meas = measureMeaning();
      const M = D.meas || { colX: -3, scale: .5 };
      m = ease(seg(lm, 0, .22));
      sc = mix(1.2, M.scale, m);
      const out = seg(lm, .82, 1);
      o = 1 - out;
      extra = `scale(${f(1 + .6 * out)}, ${f(1 - .94 * out)})`;
      blur = 4 * out;
    }
    if (!show(D.box, o)) return;
    place(D.box, W(F.cam, 0, off, F), sc, F, extra);
    blurOf(D.box, blur);
    const h = ease(seg(ld, .3, .55)), g = seg(ld, .55, .8), c = ease(seg(ld, .7, 1));
    const colX = D.meas ? D.meas.colX : -3;
    D.glyphs.forEach((s, i) => {
      let x = D_INIT[i], y = 0, op = 1;
      if (KEEP.includes(i)) {
        x = mix(mix(D_INIT[i], D_MID[i], h), D_FIN[i], c);
        const r = KEEP.indexOf(i);
        x = mix(x, colX, m);
        y = mix(0, (r - 1.5) * 1.3, m);
      } else if (HY.includes(i)) op = 1 - h;
      else { x = mix(D_INIT[i], D_MID[i], h); op = 1 - g; }
      s.style.transform = `translate(calc(${f(x)}em - 50%), calc(${f(y)}em - 50%))`;
      s.style.opacity = op.toFixed(3);
    });
    D.rows.forEach((s, r) => {
      const op = seg(lm, .22 + r * .13, .32 + r * .13);
      s.style.opacity = op.toFixed(3);
      s.style.transform = `translate(${f(colX + .55 + (1 - op) * .5)}em, calc(${f((r - 1.5) * 1.3)}em - 50%))`;
    });
    morphTargets.push({ text: STORY_COPY.date, el: D.box, form, release: seg(lm, .82, 1), mode: 'date' });
  }

  /* ---- the neon iPhone 6 chat memory ---- */
  function buildPhone() {
    const host = document.getElementById('phone-art');
    const g = svg('g', {}, host);
    g.style.display = 'none';
    g._shown = false;
    const P = (d, w0, w1) => { const e = drawPath(d, g); e._win = [w0, w1]; return e; };
    const paths = [
      P('M44 0 H248 Q292 0 292 44 V556 Q292 600 248 600 H44 Q0 600 0 556 V44 Q0 0 44 0 Z', 0, .28),
      P('M0 120 h-5 v32 h5 M292 140 h5 v46 h-5', .14, .26),
      P('M18 78 H274 V522 H18 Z', .12, .32),
      P('M116 40 H176 M84 40 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0', .2, .3),
      P('M122 561 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0', .22, .36),
      P('M18 132 H274 M40 98 l-10 8 l10 8', .3, .38),
      P('M112 172 H250 Q262 172 262 184 V226 Q262 238 250 238 H112 Q100 238 100 226 V184 Q100 172 112 172 Z M248 238 L266 252 L256 236', .42, .52),
      P('M40 268 H82 Q94 268 94 280 V294 Q94 306 82 306 H40 Q28 306 28 294 V280 Q28 268 40 268 Z M40 306 L24 318 L34 303', .62, .7),
      P('M32 500 H260', .3, .4)
    ];
    const T = (x, y, size, lines, w0, w1) => {
      const e = svg('text', { x, y, 'font-size': size, 'text-anchor': 'middle', class: 'line-art-text' }, g);
      lines.forEach((ln, i) => { const s = svg('tspan', { x, dy: i ? size * 1.35 : 0 }, e); s.textContent = nfc(ln); });
      e._win = [w0, w1];
      return e;
    };
    // the question is shown on two lines inside the bubble; its words are unchanged
    const q = STORY_COPY.chatQuestion, cut = q.indexOf(' ng ');
    const labels = [
      T(146, 112, 17, [STORY_COPY.recipient], .32, .42),
      T(181, 200, 15, cut > 0 ? [q.slice(0, cut), q.slice(cut + 1)] : [q], .5, .58),
      T(61, 293, 15, [STORY_COPY.chatReply], .68, .76)
    ];
    els.phone = { g, paths, labels };
  }
  function renderPhone(F) {
    const p = F.p, Ph = els.phone;
    if (!inRange(p, SCENE.chat.start - .001, at('chatMessage', .42))) { show(Ph.g, 0); return; }
    const l = lp('chat', p), rec = ease(seg(lp('chatMessage', p), 0, .4));
    if (!show(Ph.g, 1 - rec)) return;
    const s = .68 * vh / 600;
    const c = W(pointFor('chat'), 0, .04 * vh - rec * .08 * vh, F);
    Ph.g.setAttribute('transform', `translate(${f(c.x)} ${f(c.y)}) rotate(${f(-F.tilt * 57.2958)}) scale(${(s * (1 - .35 * rec) / F.z).toFixed(4)}) translate(-146 -300)`);
    Ph.g.style.strokeWidth = `${f(2.4 / s)}px`;
    for (const e of Ph.paths) setDraw(e, ease(seg(l, e._win[0], e._win[1])));
    for (const t of Ph.labels) t.style.opacity = seg(l, t._win[0], t._win[1]).toFixed(3);
  }

  /* ---- the essay: the one complete block of text ---- */
  function buildEssay() {
    const e = document.getElementById('essay');
    if (!e) return;
    e.textContent = '';
    const veil = el('div', 'essay__veil', e);
    for (const part of COPY.essay) {
      const sentenceWrap = (text, parent, tag = 'span') => {
        const block = el(tag, tag === 'p' ? '' : 'essay__paragraph', parent);
        const sentences = text.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [text];
        sentences.forEach((sentence) => el('span', 'essay__sentence', block, sentence));
      };
      if (part.p) sentenceWrap(part.p, e, 'p');
      else sentenceWrap(part.h, e, 'p');
    }
    // the signoff is a sibling, not a child: .essay's translate would make it the containing
    // block for the signoff's position: fixed and pin it inside the letter, not the viewport
    const sign = el('div', 'essay__signoff');
    sign.setAttribute('aria-hidden', 'true');
    String(STORY_COPY.signoff).split(/\n/).filter((line) => line.trim()).forEach((line) => el('span', 'essay__signoff-line', sign, line));
    const host = document.getElementById('cinematic-world');
    if (host && e.parentNode !== host) host.appendChild(e);
    (host || e.parentNode).appendChild(sign);
    els.essay = e;
    els.essaySentences = [...e.querySelectorAll('.essay__sentence')];
    els.essaySign = sign;
  }
  /* Shrink the letter 0.02rem at a time until every line fits inside its box (nothing clipped). */
  function fitEssay() {
    const E = els.essay;
    if (!E) return;
    E.style.fontSize = '';
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    let size = (parseFloat(getComputedStyle(E).fontSize) || 16) / rem;
    for (let i = 0; i < 400 && size > .5 && E.scrollHeight > E.clientHeight + 1; i++) {
      size -= .02;
      E.style.fontSize = `${size.toFixed(2)}rem`;
    }
  }
  function measureEssay() {
    if (!els.essay) return;
    fitEssay();
    els.essayW = els.essay.offsetWidth;
    els.essayH = els.essay.offsetHeight;
  }
  /* The Overview's one shared entrance: letter, signoff, nf1/nf2 and the 99 prints (collage99.js) all
     ease in over [essay start, essay .25], then leave together before the lily scene's black pause. */
  function overviewPresence(p) {
    if (p < SCENE.essay.start || p >= at('lily', LT.overviewFadeEnd)) return 0;
    return ease(seg(p, SCENE.essay.start, at('essay', .25))) * (1 - seg(lp('lily', p), 0, LT.overviewFadeEnd));
  }
  function renderEssay(F) {
    const E = els.essay, p = F.p;
    if (!E) return;
    const o = overviewPresence(p);
    const hidden = !(o > .002);
    if (E._hid !== hidden) { E.classList.toggle('is-hidden', hidden); E._hid = hidden; }
    // every sentence and the signature start together with the photographs; their CSS
    // transitions carry the fade, and the signature leaves with the rest of the Overview
    const on = !hidden && lp('lily', p) < .1;
    if (E._on !== on) { E._on = on; els.essaySentences.forEach((s) => s.classList.toggle('is-shown', on)); }
    if (els.essaySign._on !== on) { els.essaySign.classList.toggle('is-shown', on); els.essaySign._on = on; }
    if (hidden) return;
    E.style.opacity = o.toFixed(3);
  }

  /* ---- double lily, then a field of them ---- */
  /* A petal sits in its own group so one flower can go from the closed bud (all petals upright and
     narrow) to the open star (each at its own angle). Open angles are kept within ±180°. */
  const PETAL_CLOSED = { outer: .42, inner: .34 };
  const petalTf = (rot, k, t) => `rotate(${f(rot * t)}) scale(${f(mix(k, 1, t))} 1)`;
  function petal(L, W2, rot, kind, open) {
    const r = rot > 180 ? rot - 360 : rot, cls = `lily-${kind}`;
    return `<g class="mem-petal" data-rot="${r}" data-kind="${kind}" transform="${petalTf(r, PETAL_CLOSED[kind], open ? 1 : 0)}">` +
      `<path class="${cls}" d="M0 0 C${-W2} ${-L * .25} ${-W2 * .85} ${-L * .75} 0 ${-L} C${W2 * .85} ${-L * .75} ${W2} ${-L * .25} 0 0 Z M0 ${-L} q${W2 * .25} ${L * .05} ${W2 * .38} ${L * .13}"/>` +
      `<path class="${cls} lily-vein" d="M0 -8 Q${W2 * .12} ${-L * .5} 0 ${-L * .92}"/></g>`;
  }
  function flowerMarkup(open) {
    let out = '<path class="lily-stem" d="M300 800 C285 690 318 560 300 420 C296 380 300 350 300 330"/>' +
      '<path class="lily-leaf" d="M300 640 C250 610 220 560 210 520 C250 545 285 585 300 640 M302 700 C360 670 395 630 405 590 C360 610 320 650 302 700"/>';
    out += '<g transform="translate(300 300) scale(1 .82)"><g class="mem-petals">';
    for (let i = 0; i < 6; i++) out += petal(230, 62, i * 60, 'outer', open);
    for (let i = 0; i < 6; i++) out += petal(175, 48, 30 + i * 60, 'inner', open);
    out += `</g><g class="mem-stamens"${open ? '' : ' style="opacity:0"'}>`;
    for (let i = 0; i < 6; i++) {
      const a = (15 + i * 60) * Math.PI / 180, x = Math.cos(a) * 92, y = Math.sin(a) * 92;
      out += `<path class="lily-stamen" d="M0 0 Q${f(x * .4 + y * .2)} ${f(y * .4 - x * .2)} ${f(x)} ${f(y)} m-6 0 a6 4 0 1 0 12 0 a6 4 0 1 0 -12 0"/>`;
    }
    return out + '</g></g>';
  }
  function buildLily() {
    const host = document.getElementById('lily-art');
    const svgRoot = document.getElementById('thread-layer');
    const defs = svg('defs', {}, svgRoot);
    // the field's closed buds are the same flower with its petals folded, so each bud opens into its own bloom
    defs.innerHTML = `<g id="mem-lily-sym">${flowerMarkup(true)}</g>` +
      `<g id="mem-lily-bud" class="lily-bud">${flowerMarkup(false)}</g>` +
      '<linearGradient id="mem-haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--red-black);stop-opacity:0"/>' +
      '<stop offset=".55" style="stop-color:var(--red-black);stop-opacity:.75"/><stop offset="1" style="stop-color:var(--bg);stop-opacity:0"/></linearGradient>';
    defs.querySelectorAll('.mem-petals').forEach((g) => { g.style.fill = 'var(--neon)'; g.style.fillOpacity = '.1'; });
    const field = svg('g', {}, host);
    field.style.display = 'none';
    field._shown = false;
    // seeded, deterministic variation: depth, place, size, bloom order
    let seed = (typeof CONFIG !== 'undefined' ? CONFIG.seed : 24102020) >>> 0;
    const rnd = () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const items = [];
    while (items.length < 46) {
      const z = rnd(), x = (rnd() * 2 - 1) * 1.15, y = mix(-.04, .5, z) + (rnd() - .5) * .05;
      if (Math.abs(x) < .14 && z > .45) continue;
      items.push({ z, x, y, rot: (rnd() - .5) * 14, s: mix(.22, .95, z) * (.85 + rnd() * .3) });
    }
    items.sort((a, b) => a.z - b.z);
    const order = items.map((it, i) => [Math.hypot(it.x, it.y * 1.6), i]).sort((a, b) => a[0] - b[0]);
    order.forEach(([, i], rank) => { items[i].t = .02 + .96 * rank / items.length; items[i].bloom = .1 + rnd() * .35; });
    const haze = svg('rect', { fill: 'url(#mem-haze)' }, null);
    let hazeAdded = false;
    for (const it of items) {
      if (!hazeAdded && it.z > .5) { field.appendChild(haze); hazeAdded = true; }
      it.bud = svg('use', { href: '#mem-lily-bud' }, field);
      it.el = svg('use', { href: '#mem-lily-sym' }, field);
      it.el.style.opacity = '0';
      it.bud.style.opacity = '0';
    }
    if (!hazeAdded) field.appendChild(haze);
    // the one hero lily: grows closed from the ground, then opens petal by petal
    const hero = svg('g', {}, field);
    hero.innerHTML = flowerMarkup(false);
    hero.style.display = 'none';
    hero._shown = false;
    const heroPetals = hero.querySelector('.mem-petals');
    heroPetals.style.fill = 'var(--neon)';
    let io = 0, ii = 0;
    const petals = [...hero.querySelectorAll('.mem-petal')].map((g) => {
      const kind = g.dataset.kind, outer = kind === 'outer';
      // outer petals part first, inner ones follow, each a little after its neighbour
      const d = outer ? .04 * io++ : .2 + .035 * ii++;
      return { g, rot: Number(g.dataset.rot), k: PETAL_CLOSED[kind], win: [d, d + .62], tf: '' };
    });
    els.lily = { field, hero, heroPetals, petals, stamens: hero.querySelector('.mem-stamens'), items, haze };
  }
  function sizeLily() {
    const L = els.lily;
    const s = .62 * vh / 800;
    L.sMain = s;
    L.hero.style.strokeWidth = `${f(2.2 / s)}px`;
    for (const it of L.items) it.el.style.strokeWidth = it.bud.style.strokeWidth = `${f(2.2 / (s * it.s))}px`;
    L.haze.setAttribute('x', f(-1.3 * vw)); L.haze.setAttribute('y', f(-.22 * vh));
    L.haze.setAttribute('width', f(2.6 * vw)); L.haze.setAttribute('height', f(.5 * vh));
  }
  function renderLily(F) {
    const p = F.p, L = els.lily;
    if (!inRange(p, SCENE.lily.start - .002, at('qr', .5))) { show(L.field, 0); return; }
    const l = lp('lily', p), lf = clamp01((p - SCENE.lilyField.start) / Math.max(.001, SCENE.fireworks.end - SCENE.lilyField.start));
    const fade = (1 - .55 * lp('fireworks', p)) * (1 - .5 * lp('quiet', p)) * (1 - seg(lp('qr', p), 0, .45));
    if (!show(L.field, fade)) return;
    const zoom = 1 - .24 * ease(lf);
    const P = pointFor('lily');
    const base = W(P, 0, .36 * vh * zoom, F);
    L.field.setAttribute('transform', `translate(${f(base.x)} ${f(base.y)}) rotate(${f(-F.tilt * 57.2958)}) scale(${(zoom / F.z).toFixed(4)})`);
    const s = L.sMain;
    // hero: nothing until the thread has landed and held, then it rises closed from the ground
    // (stem scaleY 0 → 1 about the ground line), then blooms slowly through the end of the scene
    const after = p >= SCENE.lily.end;
    const grow = after ? 1 : ease(seg(l, LT.holdEnd, LT.heroGrowEnd));
    const opened = after ? 1 : seg(l, LT.heroGrowEnd, LT.bloomEnd);
    if (show(L.hero, after ? 1 : seg(l, LT.holdEnd, LT.holdEnd + .04))) {
      L.hero.setAttribute('transform', `scale(${s.toFixed(4)} ${(s * Math.max(.001, grow)).toFixed(4)}) translate(-300 -800)`);
      for (const pt of L.petals) {
        const tf = petalTf(pt.rot, pt.k, ease(seg(opened, pt.win[0], pt.win[1])));
        if (pt.tf !== tf) { pt.g.setAttribute('transform', tf); pt.tf = tf; }
      }
      L.heroPetals.style.fillOpacity = mix(.1, .16, ease(opened)).toFixed(3);
      L.stamens.style.opacity = ease(seg(opened, .55, 1)).toFixed(3);
    }
    const par = (F.cam.x - P.x) * F.z;
    for (const it of L.items) {
      const spawn = ease(seg(lf, it.t, it.t + .035));
      // late spawns get a shorter wait, so every bud has opened by the end of the fireworks
      const b0 = it.t + it.bloom * (1 - it.t);
      const bloom = ease(seg(lf, b0, Math.min(1, b0 + .08)));
      const o = spawn * mix(.28, .9, it.z);
      const so = o.toFixed(3) + '/' + bloom.toFixed(3);
      if (it._o !== so) { it.bud.style.opacity = (o * (1 - bloom)).toFixed(3); it.el.style.opacity = (o * bloom).toFixed(3); it._o = so; }
      if (o <= .002) continue;
      const x = it.x * vw + par * (it.z - .4) * .35, y = it.y * vh;
      const tf = `translate(${f(x)} ${f(y)}) rotate(${f(it.rot)}) scale(${(s * it.s * (.3 + .7 * bloom)).toFixed(4)}) translate(-300 -800)`;
      it.el.setAttribute('transform', tf); it.bud.setAttribute('transform', tf);
    }
    L.haze.style.opacity = (.7 * seg(lf, .1, .6)).toFixed(3);
  }

  /* ---- final QR: screen-space, never blurred, never scaled at rest ---- */
  function buildQr() {
    const host = document.getElementById('cinematic-world');
    const wrap = el('div', '', host);
    Object.assign(wrap.style, { position: 'absolute', inset: '0', display: 'none', alignItems: 'center', justifyContent: 'center', zIndex: '9', pointerEvents: 'none' });
    wrap._shown = false;
    const card = el('div', '', wrap);
    Object.assign(card.style, { position: 'relative', padding: '14px', borderRadius: '18px', background: 'var(--bg)', lineHeight: '0' });
    const frame = el('div', '', card);
    Object.assign(frame.style, { position: 'absolute', inset: '0', borderRadius: 'inherit', boxShadow: '0 0 0 1.5px var(--neon), 0 0 18px var(--neon-soft), 0 0 46px var(--neon-faint)', opacity: '0' });
    const img = el('img', '', card);
    img.alt = 'Mã QR bao lì xì';
    img.decoding = 'async';
    Object.assign(img.style, { position: 'relative', display: 'block', width: 'auto', height: 'auto', maxWidth: 'min(78vw, 560px)', maxHeight: '76vh', objectFit: 'contain', filter: 'none', borderRadius: '8px' });
    els.qr = { wrap, card, frame, img, loaded: false };
  }
  function renderQr(F) {
    const p = F.p, Q = els.qr;
    if (!Q.loaded && p > SCENE.fireworks.start) { Q.loaded = true; Q.img.src = src('qr'); }
    const l = lp('qr', p);
    const e = p < SCENE.qr.start ? 0 : ease(seg(l, .05, .5));
    if (!(e > .002)) { if (Q.wrap._shown) { Q.wrap.style.display = 'none'; Q.wrap._shown = false; } return; }
    if (!Q.wrap._shown) { Q.wrap.style.display = 'flex'; Q.wrap._shown = true; }
    Q.wrap.style.opacity = e >= .999 ? '1' : e.toFixed(3);
    Q.card.style.transform = e >= .999 ? 'none' : `translateY(${f((1 - e) * 24)}px) scale(${f(.96 + .04 * e)})`;
    Q.frame.style.opacity = seg(l, .3, .75).toFixed(3);
  }

  /* ---- the thread: emerges from the first message, yields to photographs ---- */
  function renderThread(F) {
    if (typeof THREAD === 'undefined' || !THREAD.ready) return;
    const p = F.p;
    const emerge = seg(p, at('openingMessage', .55), at('openingMessage', .9));
    const end = emerge > 0 ? THREAD.fractionAtProgress(Math.min(1, p + .01)) : 0;
    const l = lp('lily', p), inLily = p >= SCENE.lily.start;
    // gone for the whole Overview (quick fade at its start) and the black pause after it,
    // then it fades back in near the top of the screen
    const threadScene = !inLily ? 1 - seg(lp('essay', p), 0, .06) : ease(seg(l, LT.threadFadeStart, LT.threadFadeEnd));
    const presence = emerge * (1 - .5 * F.focus.v) * threadScene;
    if (Math.abs(end - last.drawn) > 1e-5) { THREAD.setDrawn(end); last.drawn = end; }
    if (Math.abs(presence - last.presence) > .002) { THREAD.setPresence(presence); last.presence = presence; }

    // the old checkpoint dots belong to the story before the Overview: off from the lily scene on,
    // back only when scrolled up before the letter; the head dot goes with them
    const nodesOn = inLily ? false : p < SCENE.essay.start ? true : last.nodes !== false;
    if (last.nodes !== nodesOn && THREAD.setNodesEnabled) { THREAD.setNodesEnabled(nodesOn); last.nodes = nodesOn; last.scene = ''; }
    // while they still exist they fade with the strand, so none float alone over the Overview letter
    const dots = document.getElementById('thread-nodes');
    const dotOp = nodesOn ? threadScene.toFixed(3) : '0';
    if (dots && dots._op !== dotOp) { dots.style.opacity = dotOp; dots._op = dotOp; }
    const head = document.getElementById('thread-head');
    if (head && head._hid !== inLily) { head.style.display = inLily ? 'none' : ''; head._hid = inLily; }

    // the strand falls from near the top of the screen to the lily's ground line, and stays there
    let fall = 0;
    if (inLily && THREAD.setFall) {
      const tip = THREAD.toScreen(THREAD.pointAt(end).x, THREAD.pointAt(end).y);
      const g = W(pointFor('lily'), 0, .36 * vh * (1 - .24 * ease(clamp01((p - SCENE.lilyField.start) / Math.max(.001, SCENE.fireworks.end - SCENE.lilyField.start)))), F);
      const ground = THREAD.toScreen(g.x, g.y).y - tip.y;
      fall = mix(-.35 * vh, ground, ease(seg(l, LT.fallStart, LT.fallEnd)));
    }
    if (THREAD.setFall && Math.abs(fall - last.fall) > .5) { THREAD.setFall(fall); last.fall = fall; }

    let id = '';
    for (const s of STORY) if (p >= s.start) id = s.id;
    if (id !== last.scene) { if (nodesOn) THREAD.setActiveNode(id); last.scene = id; }
  }

  function renderImmersion(F) {
    const bg = els.immersion;
    if (!bg) return;
    // from the lily scene on there is no backdrop at all: it is gone before the black pause
    const lilyOut = F.p < SCENE.lily.start ? 1 : 1 - seg(lp('lily', F.p), 0, LT.overviewFadeEnd);
    const o = .55 * F.focus.v * (F.p >= at('lily', LT.overviewFadeEnd) ? 0 : lilyOut);
    const url = o > .01 && F.focus.src ? F.focus.src : last.immersion;
    if (url !== last.immersion) { bg.style.backgroundImage = url ? `url("${url}")` : ''; last.immersion = url; }
    if (Math.abs(o - last.immOp) > .003) { bg.style.opacity = o.toFixed(3); last.immOp = o; }
  }

  /* ---- build ---- */
  function measureViewport() {
    vw = Math.max(1, window.innerWidth);
    vh = Math.max(1, window.innerHeight);
    narrow = vw < 760 || vw < vh * .8;
  }
  function init() {
    if (built || typeof document === 'undefined') return api;
    els.memoryLayer = document.getElementById('memory-layer');
    els.textLayer = document.getElementById('text-layer');
    if (!els.memoryLayer || !els.textLayer) return api;
    els.tint = document.getElementById('tata-tint');
    els.immersion = document.getElementById('immersion-bg');
    bootTime = performance.now();
    measureViewport();

    buildOpening();
    buildLtv();
    buildTata();
    buildPhone();
    buildLily();
    buildQr();
    buildEssay();
    buildOverviewPair();
    NODE_SPECS.forEach((s, i) => nodes.push(buildNode(s, i)));
    buildDate();

    // messages, in story order; each is formed by the thread and released back into it
    addText(STORY_COPY.opening, 'opening', { a: at('opening', .45), b: at('opening', .72), c: at('blackPull', .4), d: at('blackPull', .7) }, { mode: 'fade' });
    addText(STORY_COPY.openingMessage, 'openingMessage', { a: at('blackPull', .75), b: at('openingMessage', .3), c: at('openingMessage', .58), d: at('openingMessage', .9) });
    addText(STORY_COPY.ltvMessage, 'ltvMessage', { a: at('ltvMessage', .25), b: at('ltvMessage', .45), c: at('ltvMessage', .75), d: at('ltvMessage', .98) }, { exit: 'right' });
    addText(STORY_COPY.sCurve, 'sCurve', { a: at('sCurve', .55), b: at('sCurve', .75), c: at('sCurve', .92), d: at('tata', .08) });
    const tw = STORY_COPY.twist;
    addText(tw[0], 'twist', { a: at('twist', 0), b: at('twist', .08), c: at('twist', .2), d: at('twist', .27) }, { mode: 'twist' });
    addText(tw[1], 'twist', { a: at('twist', .27), b: at('twist', .36), c: at('twist', .45), d: at('twist', .52) }, { mode: 'twist' });
    addText(tw[2], 'twist', { a: at('twist', .52), b: at('twist', .6), c: at('twist', .68), d: at('twist', .77) }, { mode: 'twist' });
    addText(STORY_COPY.chatMessage, 'chatMessage', { a: at('chatMessage', .2), b: at('chatMessage', .42), c: at('chatMessage', .75), d: at('chatMessage', .98) });
    addText(COPY.together, 'togetherMessage', { a: at('togetherMessage', .05), b: at('togetherMessage', .3), c: at('togetherMessage', .7), d: at('togetherMessage', .96) });
    addSequence(COPY.firsts, 'firstsMessage', at('firstsMessage', .02), at('firstsMessage', 1));
    addSequence(COPY.hardTimes, 'hardTimes', at('hardTimes', .02), at('hardTimes', 1));
    addSequence(COPY.happy, 'happyMessage', at('happyMessage', .02), at('happyMessage', 1), 'thread', 'thread');
    addSequence(STORY_COPY.emotional, 'emotionalText', at('emotionalText', .02), at('emotionalText', 1));

    resize();
    window.addEventListener('resize', resize, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measureEssay(); els.date.meas = null; });
    // fallback driver: if main.js never calls update() directly, follow the timeline event
    window.addEventListener('timeline:progress', (ev) => { if (!direct && ev.detail) update(ev.detail.progress, null, true); });
    built = true;
    return api;
  }

  function resize() {
    measureViewport();
    sizeOpening();
    sizeTata();
    sizeLily();
    sizeOverviewPair();
    for (const n of nodes) layoutNode(n);
    measureEssay();
    if (els.date) els.date.meas = null;
  }

  /* ---- per frame ---- */
  function update(progress, cam, fromEvent) {
    if (!built) init();
    if (!built) return;
    if (!fromEvent) direct = true;
    const c = cam || (typeof Camera !== 'undefined' ? Camera.state : null) || { x: 3000, y: 2100, zoom: .3, tilt: 0 };
    const tilt = c.tilt || 0;
    const F = {
      p: clamp01(progress), cam: { x: c.x, y: c.y }, z: Math.max(.02, c.zoom || .3), tilt,
      cos: Math.cos(tilt), sin: Math.sin(tilt),
      reduced: typeof Camera !== 'undefined' && Camera.reducedMotion, focus: { v: 0, src: '' }
    };
    morphTargets = [];
    renderOpening(F);
    renderLtv(F);
    renderTata(F);
    renderPhone(F);
    for (const n of nodes) renderNode(n, F);
    renderOverviewPair(F);
    renderDate(F);
    for (const t of texts) renderText(t, F);
    renderEssay(F);
    renderLily(F);
    renderQr(F);
    focusNow = F.focus.v;
    renderThread(F);
    renderImmersion(F);
    clearForLily(F);
  }

  /* The black pause must be truly black: wipe any leftover particle pixels while the lily scene
     plays (nothing is drawn there before the fireworks) and make sure the Tata tint is down. */
  function clearForLily(F) {
    if (!inRange(F.p, SCENE.lily.start, SCENE.lilyField.start)) return;
    const cv = els.particles || (els.particles = document.getElementById('particle-canvas'));
    if (cv && cv.getContext) {
      const ctx = cv.getContext('2d');
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); ctx.restore();
    }
    if (els.tint && els.tint._op !== '0.000') { els.tint.style.opacity = '0.000'; els.tint._op = '0.000'; }
  }

  const api = {
    COPY, init, update, render: update, resize, pointFor, camCenterAt,
    get morphTargets() { return morphTargets; },
    get focus() { return focusNow; }
  };
  return api;
})();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => Memories.init());
  else Memories.init();
}
