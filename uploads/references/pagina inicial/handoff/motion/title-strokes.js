/* ============================================================
   NEXA Hero · title strokes module
   ------------------------------------------------------------
   "RELATÓRIO DE SUSTENTABILIDADE" is decomposed into ~110
   straight-line segments. Each segment starts at a random
   position/rotation across the viewport and travels to its
   correct letterform position. After all settled, the layer
   crossfades to a clean Montserrat <h1>.

   Public API:
     - buildTitle({ container, lines, onSettle })
         container: HTMLElement (position: relative or absolute)
         lines:     string[]   (e.g. ["RELATÓRIO DE", "SUSTENTABILIDADE"])
         onSettle:  () => void (called after all strokes have transitioned)
     - LETTERS  (the stroke dictionary, exported for extension)

   Notes:
     - Stroke geometry is NOT real Montserrat — it's a custom
       geometric stencil designed to match the brand's segmented X.
     - The clean type that fades in after assembly DOES use real
       Montserrat (font-weight: 400). This is intentional.
   ============================================================ */

export const LETTERS = {
  // [x1, y1, x2, y2] in a 0.7-wide × 1.0-tall normalized box
  R: [[0,0,0,1],[0,0,0.7,0],[0.7,0,0.7,0.5],[0,0.5,0.7,0.5],[0,0.5,0.7,1]],
  E: [[0,0,0,1],[0,0,0.7,0],[0,0.5,0.6,0.5],[0,1,0.7,1]],
  L: [[0,0,0,1],[0,1,0.7,1]],
  A: [[0,1,0.35,0],[0.35,0,0.7,1],[0.13,0.6,0.57,0.6]],
  T: [[0,0,0.7,0],[0.35,0,0.35,1]],
  "Ó":[[0,0,0.7,0],[0.7,0,0.7,1],[0.7,1,0,1],[0,1,0,0],[0.28,-0.22,0.5,-0.05]],
  O: [[0,0,0.7,0],[0.7,0,0.7,1],[0.7,1,0,1],[0,1,0,0]],
  I: [[0.35,0,0.35,1]],
  D: [[0,0,0,1],[0,0,0.5,0],[0.5,0,0.7,0.2],[0.7,0.2,0.7,0.8],[0.7,0.8,0.5,1],[0,1,0.5,1]],
  S: [[0.7,0,0,0],[0,0,0,0.5],[0,0.5,0.7,0.5],[0.7,0.5,0.7,1],[0.7,1,0,1]],
  U: [[0,0,0,0.8],[0,0.8,0.15,1],[0.15,1,0.55,1],[0.55,1,0.7,0.8],[0.7,0.8,0.7,0]],
  N: [[0,0,0,1],[0,0,0.7,1],[0.7,0,0.7,1]],
  B: [[0,0,0,1],[0,0,0.55,0],[0.55,0,0.7,0.15],[0.7,0.15,0.7,0.35],[0.7,0.35,0.55,0.5],[0,0.5,0.55,0.5],[0.55,0.5,0.7,0.65],[0.7,0.65,0.7,0.85],[0.7,0.85,0.55,1],[0,1,0.55,1]],
  " ":[],
};

const DEFAULTS = {
  strokeHeightPx: 5,          // <-- thinner than final stem; sticks "grow into" type
  transitionMs:   1800,
  delayMinMs:     400,
  delayMaxMs:     1200,
  settleAfterMs:  3000,       // when to fire onSettle (start of crossfade)
};

export function buildTitle({ container, lines, onSettle, opts = {} }) {
  const cfg = { ...DEFAULTS, ...opts };
  container.innerHTML = "";

  const W = window.innerWidth;
  const H = window.innerHeight;
  // U sized so the longest line (16 chars) takes ~48vw
  const longest = Math.max(...lines.map(l => l.length));
  const targetWidth = W * 0.48;
  const U = Math.min(86, Math.max(40, targetWidth / (longest * 0.85)));
  const advance = U * 0.78;
  const spaceW  = U * 0.45;
  const lineH   = U * 1.30;
  const startX  = Math.max(24, W * 0.045);
  const startY  = Math.max(24, H * 0.16);

  const strokes = [];

  lines.forEach((line, li) => {
    let cx = startX;
    const cy = startY + li * lineH;
    for (const ch of line) {
      const letter = LETTERS[ch];
      if (letter && letter.length) {
        for (const seg of letter) {
          const x1 = cx + seg[0] * U;
          const y1 = cy + seg[1] * U;
          const x2 = cx + seg[2] * U;
          const y2 = cy + seg[3] * U;
          const dx = x2 - x1, dy = y2 - y1;
          const len = Math.hypot(dx, dy);
          const ang = Math.atan2(dy, dx) * 180 / Math.PI;
          const initX = Math.random() * W;
          const initY = Math.random() * H;
          const initRot = (Math.random() - 0.5) * 720;
          const initScale = 0.4 + Math.random() * 0.8;
          const delay = cfg.delayMinMs + Math.random() * (cfg.delayMaxMs - cfg.delayMinMs);

          const el = document.createElement("div");
          el.className = "nx-stroke";
          el.style.cssText = `
            position: absolute; left: 0; top: 0;
            height: ${cfg.strokeHeightPx}px;
            width: ${len}px;
            background: var(--nx-on-ink);
            transform-origin: 0 50%;
            border-radius: 1.5px;
            will-change: transform, opacity;
            opacity: 0;
            transform: translate(${initX}px, ${initY}px) rotate(${initRot}deg) scale(${initScale});
            transition: transform ${cfg.transitionMs}ms cubic-bezier(0.65, 0, 0.2, 1), opacity 1300ms ease;
          `;
          container.appendChild(el);

          strokes.push({ el, x1, y1, ang, delay });
        }
        cx += advance;
      } else if (ch === " ") {
        cx += spaceW;
      }
    }
  });

  // Trigger assembly per stroke
  strokes.forEach(s => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        s.el.style.transform = `translate(${s.x1}px, ${s.y1}px) rotate(${s.ang}deg) scale(1)`;
        s.el.style.opacity = "1";
      }, s.delay);
    });
  });

  if (onSettle) setTimeout(onSettle, cfg.settleAfterMs);

  return { strokes, rebuild: () => buildTitle({ container, lines, onSettle, opts }) };
}
