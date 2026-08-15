import { animate, stagger, scrambleText } from 'animejs';
import { gsap } from 'gsap';

const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Section headings decode in from scrambled characters as they scroll into
// view — the same "characters resolving into meaning" idea as the ASCII
// portrait's flip reveal, but via animejs's own text-scramble utility.
if (!prefersReduced) {
  const headingObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animate(e.target, {
        innerHTML: scrambleText({ chars: 'uppercase', revealRate: 45 }),
        duration: 900,
        ease: 'outQuad',
      });
      headingObserver.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.sec-head h2').forEach(h => headingObserver.observe(h));
}

function fillBars(root) {
  const bars = root.querySelectorAll('.bar');
  if (!bars.length) return; // most .reveal sections have none — avoid an empty-target call
  if (prefersReduced) {
    bars.forEach(b => { b.style.width = b.dataset.w + '%'; });
    return;
  }
  animate(bars, {
    width: (el) => el.dataset.w + '%',
    ease: 'outExpo',
    duration: 900,
    delay: stagger(70),
  });
}

// Flagship stat tiles count up from 0 to their real value on reveal.
// The static text already in the HTML is the correct final value, so
// under reduced motion we just leave it alone rather than animate.
function countUpMetrics(root) {
  const els = root.querySelectorAll('.countup');
  if (!els.length || prefersReduced) return;
  els.forEach(el => {
    const to = parseFloat(el.dataset.to);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const sign = to < 0 ? '−' : ''; // proper minus glyph, matches the rest of the page
    const target = Math.abs(to);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = sign + obj.v.toFixed(decimals) + suffix; },
    });
  });
}

// Animate carbon bars + section reveals on scroll
const reveals = new Set(document.querySelectorAll('.reveal'));

function show(el) {
  el.classList.add('in');
  fillBars(el);
  countUpMetrics(el);
  reveals.delete(el);
  io.unobserve(el);
}

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) show(e.target); });
}, { threshold: 0.05 });

reveals.forEach(el => io.observe(el));

// Safety net: anything at or above the viewport must never stay hidden,
// even if the observer misses it during a fast scroll or reload mid-page.
function sweep() {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight) show(el);
  });
}
addEventListener('scroll', sweep, { passive: true });
sweep();

// One-shot hero entrance on page load.
const heroEls = document.querySelectorAll('.hero-in');
if (prefersReduced) {
  heroEls.forEach(el => { el.style.opacity = 1; });
} else {
  animate(heroEls, {
    opacity: [0, 1],
    translateY: [16, 0],
    ease: 'outQuad',
    duration: 700,
    delay: stagger(90, { start: 100 }),
  });
}

// ---------- ASCII split-flap portrait ----------
// Reads real pixel brightness off the source photo and maps it to a
// density ramp, so the reconstructed grid actually matches the image
// instead of hand-placed characters.
(function () {
  // Dark -> light, background -> subject. A long, finely-graded ramp gives
  // far smoother tonal steps than a short one, at no extra runtime cost —
  // it only affects which character gets picked, not how many tiles exist.
  const RAMP = ' .`^",:;Il!i><~+_-?][}{1)(|ftjrxnuvczXYUJCLQOZmwqpdbkhao*#MW&8%B@$';
  const CYCLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  const FLIP_STEPS = 1;        // one flip through a random char, then settle
  const CELL_ASPECT = 1.18;    // must match .flap's height:width ratio in CSS
  const ROW_STEP_MS = 34;      // time between one printed layer (row) and the next
  const INTRA_ROW_STEP_MS = 2; // nozzle sweep speed across a layer, left -> right
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const section = document.getElementById('portrait');
  const grid = document.getElementById('asciiGrid');
  const img = document.getElementById('portraitSource');
  if (!section || !grid || !img) return;

  function colsForWidth() {
    const w = innerWidth;
    if (w <= 560) return 22;
    if (w <= 900) return 34;
    return 48;
  }

  let tiles = [];      // flat list of { el, char }
  let cols = 0, rows = 0;
  let animating = false;
  let hasPlayedOnce = false;

  function sampleImage(sourceEl) {
    cols = colsForWidth();
    const aspect = sourceEl.naturalHeight / sourceEl.naturalWidth || 1.25;
    // Each tile is 1.18x taller than wide (see .flap height in CSS), so
    // dividing by that ratio is what keeps the grid's overall proportions
    // matching the source photo instead of squashing it vertically.
    rows = Math.max(1, Math.round((cols * aspect) / CELL_ASPECT));

    // Supersample: draw at SS x the target grid, then hand-average each
    // SS-by-SS block into one cell. A single drawImage straight down to
    // cols x rows leans on the browser's own downscale filter, which
    // varies by engine and can alias away thin detail (hair strands,
    // edges); box-averaging ourselves is deterministic and truer to the
    // source photo.
    const SS = 5;
    const canvas = document.createElement('canvas');
    canvas.width = cols * SS;
    canvas.height = rows * SS;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sourceEl, 0, 0, canvas.width, canvas.height);
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const raw = new Array(cols * rows);       // luminance 0..1
    const rgb = new Array(cols * rows);        // [r,g,b] averaged, 0..255
    let min = 1, max = 0;
    for (let ry = 0; ry < rows; ry++) {
      for (let rx = 0; rx < cols; rx++) {
        let sumR = 0, sumG = 0, sumB = 0;
        for (let sy = 0; sy < SS; sy++) {
          for (let sx = 0; sx < SS; sx++) {
            const px = (rx * SS + sx), py = (ry * SS + sy);
            const idx = (py * canvas.width + px) * 4;
            sumR += data[idx]; sumG += data[idx + 1]; sumB += data[idx + 2];
          }
        }
        const n = SS * SS;
        const r = sumR / n, g = sumG / n, b = sumB / n;
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const i = ry * cols + rx;
        raw[i] = brightness;
        rgb[i] = [r, g, b];
        if (brightness < min) min = brightness;
        if (brightness > max) max = brightness;
      }
    }

    // Contrast-stretch to the image's own min/max so the full character
    // ramp gets used regardless of whether the source is a flat, narrow
    // brightness range (e.g. a near-black background that isn't pure #000).
    const range = Math.max(max - min, 0.05);
    const chars = new Array(cols * rows);
    const colors = new Array(cols * rows);
    for (let i = 0; i < raw.length; i++) {
      const stretched = Math.min(1, Math.max(0, (raw[i] - min) / range));
      const idx = Math.min(RAMP.length - 1, Math.floor(stretched * RAMP.length));
      chars[i] = RAMP[idx];

      // Scale the cell's real color by the same stretch applied to its
      // brightness, so hue stays true to the photo while intensity tracks
      // the contrast enhancement (dim background pixels dim further,
      // lit subject pixels stay vivid rather than looking washed out).
      const [r, g, b] = rgb[i];
      const ratio = Math.min(4, stretched / Math.max(raw[i], 0.02));
      const cr = Math.min(255, Math.round(r * ratio));
      const cg = Math.min(255, Math.round(g * ratio));
      const cb = Math.min(255, Math.round(b * ratio));
      colors[i] = `rgb(${cr},${cg},${cb})`;
    }
    return { chars, colors };
  }

  function buildGrid(sample) {
    const { chars, colors } = sample;
    grid.style.setProperty('--cols', cols);
    const cellPx = Math.min(11, Math.max(6, Math.floor(480 / cols)));
    grid.style.setProperty('--cell', cellPx + 'px');
    grid.innerHTML = '';
    tiles = new Array(cols * rows);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < chars.length; i++) {
      const span = document.createElement('span');
      span.className = 'flap';
      span.textContent = chars[i];
      span.style.setProperty('--tc', colors[i]);
      frag.appendChild(span);
      tiles[i] = { el: span, char: chars[i], color: colors[i] };
    }
    grid.appendChild(frag);
  }

  // Resolves on the transform transitionend, or a timeout backstop —
  // so a tile can never get stuck mid-flip if a paint is skipped
  // (backgrounded tab, dropped frame, etc).
  function waitTurn(el) {
    return new Promise(resolve => {
      let done = false;
      const finish = () => { if (done) return; done = true; resolve(); };
      el.addEventListener('transitionend', finish, { once: true });
      setTimeout(finish, 200);
    });
  }

  async function flipTile(tile, delay) {
    await new Promise(r => setTimeout(r, delay));
    for (let step = 0; step < FLIP_STEPS; step++) {
      tile.el.classList.add('rot');
      await waitTurn(tile.el);
      const isFinal = step === FLIP_STEPS - 1;
      tile.el.textContent = isFinal ? tile.char : CYCLE_CHARS[(Math.random() * CYCLE_CHARS.length) | 0];
      tile.el.classList.remove('rot');
      await waitTurn(tile.el);
    }
  }

  // Bottom-up, layer by layer, like an FDM print head raster-scanning each
  // row before the build plate "moves" to the next one — alternating sweep
  // direction per layer (boustrophedon) the way a real printer paths it.
  function playWave() {
    if (animating || reducedMotion || !tiles.length) return;
    animating = true;
    tiles.forEach((tile, i) => {
      const row = Math.floor(i / cols), col = i % cols;
      const layer = rows - 1 - row;           // 0 = bottom row, prints first
      const sweepCol = layer % 2 === 0 ? col : (cols - 1 - col);
      flipTile(tile, layer * ROW_STEP_MS + sweepCol * INTRA_ROW_STEP_MS);
    });
    const worst = rows * ROW_STEP_MS + cols * INTRA_ROW_STEP_MS + FLIP_STEPS * 2 * 200 + 200;
    setTimeout(() => { animating = false; }, worst);
  }

  let activeSource = null;

  function init(sourceEl) {
    activeSource = sourceEl;
    buildGrid(sampleImage(sourceEl));
    if (reducedMotion) return; // static, already-resolved grid is enough
    grid.addEventListener('mouseenter', playWave);
    grid.addEventListener('click', playWave); // touch fallback
    const once = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !hasPlayedOnce) {
          hasPlayedOnce = true;
          playWave();
          once.disconnect();
        }
      });
    }, { threshold: 0.4 });
    once.observe(section);
  }

  function placeholderSource() {
    // Simple procedural silhouette so the component works before a real photo is wired in.
    const c = document.createElement('canvas');
    c.width = 200; c.height = 250;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 200, 250);
    const grad = ctx.createRadialGradient(100, 95, 10, 100, 95, 70);
    grad.addColorStop(0, '#ddd'); grad.addColorStop(1, '#000');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(100, 95, 55, 0, Math.PI * 2); ctx.fill();
    const grad2 = ctx.createRadialGradient(100, 230, 20, 100, 230, 110);
    grad2.addColorStop(0, '#bbb'); grad2.addColorStop(1, '#000');
    ctx.fillStyle = grad2;
    ctx.beginPath(); ctx.ellipse(100, 250, 90, 90, 0, Math.PI, 0); ctx.fill();
    const ph = new Image();
    ph.onload = () => init(ph);
    ph.src = c.toDataURL();
  }

  let resizeTimer;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newCols = colsForWidth();
      if (newCols !== cols && activeSource) buildGrid(sampleImage(activeSource));
    }, 200);
  });

  if (img.complete) {
    // Settled already (cache hit or a load/error that fired before we attached
    // listeners) — naturalWidth tells us which outcome it was.
    if (img.naturalWidth) init(img); else placeholderSource();
  } else {
    img.addEventListener('load', () => init(img));
    img.addEventListener('error', placeholderSource);
  }
})();
