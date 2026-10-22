(function (global) {
  'use strict';

  const STORY_IMAGES = Array.from({ length: 17 }, (_, i) => ({
    id: `nf${i + 1}`,
    src: `uploads/nf${i + 1}.jpg`
  }));

  // The nine supplied core photographs have a fixed, intentional display order.
  const CORE_9 = Array.from({ length: 9 }, (_, i) => `uploads/${i + 91}.jpg`);

  // Preserve original upload names. This list is a manifest, not a chronology.
  const MEMORY_90 = [
    '1000000122.jpg', '1000000159.jpg', '1000005026.jpg', '1000005028.jpg',
    '1000009082.jpg', '1000009100.jpg', '1000014157.jpg', '1000014990.jpg',
    '1000014998.jpg', '1000015293.jpg', '1000016215.jpg', '1000016229.jpg',
    '1000016230.jpg', '1000016510.jpg', '1000016521.jpg', '1000016533.jpg',
    '1000017192.jpg', '1000017193.jpg', '1000017194.jpg', '1000017195.jpg',
    '1000017198.jpg', '1000017310.jpg', '1000017443.jpg', '1000018215.jpg',
    '1000018228.jpg', '1000018268.jpg', '1000018273.jpg', '1000018275.jpg',
    '1000018292.jpg', '1000018299.jpg', '1000018718.jpg', '1000018930.jpg',
    '1000018945.jpg', '1000019037.jpg', '1000019447.jpg', '1000019456.jpg',
    '1000019457.jpg', '1000019463.jpg', '1000019464.jpg', '1000019477.jpg',
    '1000019494.jpg', '1000019513.jpg', '1000019514.jpg', '1000019550.jpg',
    '1000019716.jpg', '1000019721.jpg', '1000019725.jpg', '1000019738.jpg',
    '1000019835.jpg', '1000019836.jpg', '1000019853.jpg', '1000019854.jpg',
    '1000019855.jpg', '1000019863.jpg', '1000020134.jpg', '1000020135.jpg',
    '1000020136.jpg', '1000020138.jpg', '1000020142.jpg', '1000020147.jpg',
    '1000020148.jpg', 'IMG_2123.jpg', 'IMG_2614.jpg', 'IMG_2677.jpg',
    'IMG_2857.jpg', 'IMG_3277.jpg', 'IMG_3280.jpg', 'IMG_3283.jpg',
    'IMG_3285.jpg', 'IMG_3533.jpg', 'IMG_3603.jpg', 'IMG_4118.jpg',
    'IMG_5567.jpg', 'IMG_5864.jpg', 'IMG_6024.jpg', 'IMG_6635.jpg',
    'IMG_6638.jpg', 'IMG_6640.jpg', 'IMG_6662.jpg', 'IMG_6666.jpg',
    'IMG_6797.jpg', 'IMG_7175.jpg', 'IMG_7176.jpg', 'IMG_7183.jpg',
    'MIN03474.jpg', 'MIN03892.jpg', 'MIN03936.jpg', 'MIN03966.jpg',
    'MIN04158.jpg', 'MIN042662.jpg'
  ];

  const ASSET_AUDIT = [
    ...STORY_IMAGES.map((item) => item.src),
    ...CORE_9,
    ...MEMORY_90.map((name) => `uploads/${name}`),
    'uploads/ltv.jpg', 'uploads/tata.jpg', 'uploads/qr.jpg', 'music.mp3'
  ];

  function auditAssets() {
    return Promise.all(ASSET_AUDIT.map((url) => new Promise((resolve) => {
      if (/\.mp3(?:$|\?)/i.test(url)) {
        const audio = new Audio();
        audio.preload = 'metadata';
        audio.addEventListener('loadedmetadata', () => resolve({ url, ok: true }), { once: true });
        audio.addEventListener('error', () => resolve({ url, ok: false }), { once: true });
        audio.src = url;
        audio.load();
        return;
      }
      const image = new Image();
      image.onload = () => resolve({ url, ok: true, width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => resolve({ url, ok: false });
      image.src = url;
    }))).then((results) => ({
      total: results.length,
      passed: results.filter((item) => item.ok).length,
      missing: results.filter((item) => !item.ok).map((item) => item.url),
      results
    }));
  }

  function loadImage(src, options = {}) {
    const image = new Image();
    if (options.srcset) image.srcset = options.srcset;
    if (options.sizes) image.sizes = options.sizes;
    image.decoding = 'async';
    if (options.fetchPriority) image.fetchPriority = options.fetchPriority;
    image.src = src;
    return image.decode().then(() => image).catch(() => new Promise((resolve, reject) => {
      if (image.complete && image.naturalWidth) return resolve(image);
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Unable to load image: ${src}`));
    }));
  }

  // Queue images in small batches so the core and visible story photos can be
  // ready first; each decoded image is handed back as soon as it is available.
  async function loadProgressively(sources, options = {}) {
    const concurrency = Math.max(1, options.concurrency || 3);
    let cursor = 0;
    const workers = Array.from({ length: Math.min(concurrency, sources.length) }, async () => {
      while (cursor < sources.length) {
        const index = cursor++;
        const entry = sources[index];
        const src = typeof entry === 'string' ? entry : entry.src;
        try {
          const image = await loadImage(src, options);
          if (options.onLoad) options.onLoad(image, entry, index);
        } catch (error) {
          if (options.onError) options.onError(error, entry, index);
        }
      }
    });
    await Promise.all(workers);
  }

  global.STORY_IMAGES = STORY_IMAGES;
  global.CORE_9 = CORE_9;
  global.MEMORY_90 = MEMORY_90;
  global.ASSET_AUDIT = ASSET_AUDIT;
  global.auditAssets = auditAssets;
  global.AssetLoading = { loadImage, loadProgressively };
})(window);
