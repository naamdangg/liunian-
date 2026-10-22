/* Application entry point: one progress value drives every reversible scene. */
(function () {
  'use strict';

  function boot() {
    if (window.__anniversaryBooted) return;
    window.__anniversaryBooted = true;

    const cameraEl = document.getElementById('camera');
    const worldEl = document.getElementById('world');
    const debug = new URLSearchParams(window.location.search).get('debug') === '1';
    const debugPanel = document.getElementById('debug-panel');
    const audio = document.getElementById('bgm');
    let audioUnlocked = false;

    if (typeof Camera !== 'undefined') Camera.init({ camera: cameraEl, world: worldEl });
    if (typeof Memories !== 'undefined') Memories.init();
    if (typeof Collage99 !== 'undefined') Collage99.init();
    if (typeof Particles !== 'undefined') Particles.init();

    function resize() {
      if (typeof Camera !== 'undefined') Camera.resize();
      if (typeof Memories !== 'undefined') Memories.resize();
      if (typeof Collage99 !== 'undefined') Collage99.resize();
      if (typeof Particles !== 'undefined') Particles.resize();
      render({ progress: typeof Timeline !== 'undefined' ? Timeline.progress : 0 });
    }

    function sceneAt(progress) {
      if (typeof STORY === 'undefined' || !STORY.length) return '—';
      let scene = STORY[0];
      for (const item of STORY) {
        if (progress >= item.start) scene = item;
        else break;
      }
      return scene.id;
    }

    function renderDebug(progress, cam) {
      if (!debug || !debugPanel) return;
      const images = Array.from(document.images);
      const loaded = images.filter((image) => image.complete && image.naturalWidth > 0).length;
      const failed = images.filter((image) => image.complete && image.naturalWidth === 0 && image.src).length;
      const threadLength = typeof THREAD !== 'undefined' && THREAD.length ? Math.round(THREAD.length) : 'n/a';
      debugPanel.innerHTML = [
        `progress: ${progress.toFixed(4)} / target ${(Timeline.target || 0).toFixed(4)}`,
        `scene: ${sceneAt(progress)}`,
        `camera: x ${cam ? cam.x.toFixed(1) : '—'}, y ${cam ? cam.y.toFixed(1) : '—'}, zoom ${cam ? cam.zoom.toFixed(3) : '—'}`,
        `thread length: ${threadLength}`,
        `images: ${loaded} loaded${failed ? `, ${failed} failed` : ''} (${images.length} in DOM)`,
        `audio: ${audio ? (audio.paused ? 'paused' : 'playing') : 'missing'}`,
        `asset audit: ${audit ? `${audit.passed}/${audit.total}${audit.missing.length ? ` — missing ${audit.missing.join(', ')}` : ''}` : 'running…'}`
      ].join('<br>');
    }

    function render(state) {
      const progress = Math.max(0, Math.min(1, Number(state && state.progress) || 0));
      const cam = typeof Camera !== 'undefined' ? Camera.update(progress) : null;
      if (typeof Memories !== 'undefined') Memories.update(progress, cam);
      if (typeof Collage99 !== 'undefined') Collage99.update(progress, cam);
      if (typeof Particles !== 'undefined') Particles.update(progress, cam);
      renderDebug(progress, cam);
    }

    function tryPlayAudio() {
      if (!audio || audioUnlocked) return;
      const result = audio.play();
      if (result && typeof result.catch === 'function') {
        result.then(() => { audioUnlocked = true; }).catch(() => {});
      } else audioUnlocked = true;
    }

    let audit = null;
    if (debug && debugPanel) {
      debugPanel.hidden = false;
      if (typeof auditAssets === 'function') auditAssets().then((result) => { audit = result; });
      Object.assign(debugPanel.style, {
        position: 'fixed', right: '12px', bottom: '12px', zIndex: '1000',
        maxWidth: 'min(92vw, 460px)', padding: '10px 12px',
        color: '#FFD6DF', background: 'rgba(5,5,5,.88)',
        border: '1px solid rgba(224,90,120,.45)', borderRadius: '4px',
        font: '12px/1.55 ui-monospace, SFMono-Regular, Consolas, monospace',
        pointerEvents: 'none'
      });
    }

    window.addEventListener('resize', resize, { passive: true });
    if (typeof Timeline !== 'undefined') {
      Timeline.subscribe(render);
      Timeline.start();
    } else render({ progress: 0 });

    // Autoplay is best effort; retry only on a real user gesture if blocked.
    tryPlayAudio();
    const unlockEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    const unlock = () => {
      tryPlayAudio();
      if (audioUnlocked) unlockEvents.forEach((type) => window.removeEventListener(type, unlock));
    };
    unlockEvents.forEach((type) => window.addEventListener(type, unlock, { passive: true }));
    window.addEventListener('scroll', unlock, { passive: true });
    window.addEventListener('load', () => {
      if (typeof AssetLoading !== 'undefined') {
        // The scene modules decode assets progressively as their timeline approaches.
        document.documentElement.dataset.assetManifest = String((window.ASSET_AUDIT || []).length);
      }
    }, { once: true });
    resize();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
