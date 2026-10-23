/* Shared visual, timing and deterministic-scene settings. */
const THEME = Object.freeze({
  background: '#050505',
  darkRedBlack: '#16090D',
  deepMutedRed: '#632533',
  mainCrimson: '#A83F5A',
  neonPink: '#E05A78',
  softHighlight: '#FFD6DF'
});
/* Local to the Tata passage; never used as the persistent thread color. */
const TATA_RED = '#A51D2D';

const CONFIG = Object.freeze({
  scrollLength: 7600,
  smoothing: 0.085,
  seed: 24102020,
  timing: Object.freeze({
    inertia: 0.085,
    transition: 0.18,
    photoFocus: 0.34,
    tataColor: 0.26,
    reducedMotion: 0.42
  }),
  cssTokens: Object.freeze({
    '--bg': THEME.background,
    '--red-black': THEME.darkRedBlack,
    '--muted-red': THEME.deepMutedRed,
    '--crimson': THEME.mainCrimson,
    '--neon': THEME.neonPink,
    '--highlight': THEME.softHighlight,
    '--neon-glow': `0 0 5px ${THEME.neonPink}, 0 0 15px ${THEME.neonPink}, 0 0 35px ${THEME.neonPink}73`,
    '--font': 'Inter, "SF Pro Display", "Helvetica Neue", "Segoe UI", Arial, sans-serif',
    '--text-max': 'min(88vw, 34ch)',
    '--letter-left': '46vw',
    '--letter-max': 'min(48vw, 60ch)',
    '--letter-size': 'clamp(.72rem, .58rem + .34vw, .95rem)',
    '--letter-line': '1.55',
    '--signoff-top-gap': '9rem',
    '--letter-veil': 'rgba(5,5,5,.5)',
    '--signature-size': 'clamp(1.5rem, 1rem + 1.6vw, 2.7rem)',
    '--font-letter': '"Noto Serif", "Times New Roman", "Segoe UI", serif',
    '--font-signature': '"Dancing Script", "Noto Serif", "Times New Roman", cursive',
    /* The Overview letter width; narrow screens override it on .essay. */
    '--essay-max': 'var(--letter-max)'
  })
});

if (typeof document !== 'undefined') {
  for (const [name, value] of Object.entries(CONFIG.cssTokens)) {
    document.documentElement.style.setProperty(name, value);
  }
  document.documentElement.style.setProperty('--scroll-length', String(CONFIG.scrollLength));
}
