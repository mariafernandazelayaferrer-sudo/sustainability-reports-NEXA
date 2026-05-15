/* ============================================================
   NEXA Hero · skyline bars module
   ------------------------------------------------------------
   16 bars placed at fixed % positions faithful to the printed
   RS cover. Bars enter via one of 5 motion modes, then settle.
   Once settled, each bar responds to cursor proximity with:
     - rotation (spin on own center axis)
     - color flash (--nx-orange)
   When cursor leaves: spin damps, rotation snaps back to base.

   Public API:
     - mountBars({ container, mode })  -> { setMode, getBars, restart }
   ============================================================ */

// Faithful composition — matches the cover's cascade
export const BARS = [
  { x: 60, y: 12, w: 22, r: -26 },
  { x: 73, y: 19, w: 14, r: -26 },
  { x: 54, y: 22, w: 20, r: -26 },
  { x: 68, y: 28, w: 18, r: -26 },
  { x: 48, y: 34, w: 22, r: -25 },
  { x: 64, y: 40, w: 22, r: -25 },
  { x: 52, y: 46, w: 24, r: -25 },
  { x: 70, y: 52, w: 22, r: -24 },
  { x: 56, y: 58, w: 28, r: -23 },
  { x: 72, y: 62, w: 20, r: -23 },
  { x: 50, y: 68, w: 30, r: -22 },
  { x: 66, y: 74, w: 26, r: -22 },
  { x: 54, y: 80, w: 32, r: -20 },
  { x: 70, y: 86, w: 26, r: -18 },
  { x: 60, y: 92, w: 32, r: -18 },
  { x: 78, y: 96, w: 22, r: -16 },
];

const ENTRY_MS = 1100;
const SPIN_RADIUS_PX = 110;
const SPIN_ACCEL     = 0.85;
const SPIN_FRICTION  = 0.94;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutBack  = (t) => { const c = 1.7, c3 = c + 1; return 1 + c3*Math.pow(t-1,3) + c*Math.pow(t-1,2); };

// p in [0,1] → { tx, ty, rotDelta, scaleX, scaleY, opacity, origin }
export const MODES = {
  cascade:   (p, W, H) => ({ tx:(1-p)*(W*0.6), ty:0, rotDelta:0, scaleX:0.3+0.7*p, scaleY:1, opacity:p, origin:"50% 50%" }),
  avalanche: (p, W, H) => ({ tx:0, ty:-(1-p)*(H*0.8), rotDelta:(1-p)*540, scaleX:1, scaleY:1, opacity:Math.min(1,p*1.4), origin:"50% 50%" }),
  construct: (p)       => ({ tx:0, ty:0, rotDelta:0, scaleX:p, scaleY:1, opacity:p, origin:"0% 50%" }),
  burst:     (p)       => ({ tx:0, ty:0, rotDelta:(1-p)*90, scaleX:0.05+0.95*p, scaleY:0.05+0.95*p, opacity:p, origin:"50% 50%" }),
  origami:   (p)       => ({ tx:0, ty:0, rotDelta:(1-p)*-110, scaleX:1, scaleY:0.2+0.8*p, opacity:p, origin:"50% 50%" }),
};

export function mountBars({ container, mode = "cascade", cursor }) {
  let W = innerWidth, H = innerHeight;
  let currentMode = mode;
  let startTime = performance.now();

  const bars = BARS.map((base, i) => {
    const el = document.createElement("div");
    el.className = "nx-bar";
    el.style.cssText = `
      position: absolute;
      height: 18px;
      border-radius: 1px;
      transform-origin: 50% 50%;
      will-change: transform, opacity, background-color;
    `;
    container.appendChild(el);
    return { el, base, delay: i * 60, spinVel: 0, extraRot: 0, touched: false, centerX: 0, centerY: 0 };
  });

  function layout() {
    W = innerWidth; H = innerHeight;
    bars.forEach(b => {
      const px = (b.base.x/100) * W;
      const py = (b.base.y/100) * H;
      const pw = (b.base.w/100) * W;
      b.el.style.left  = px + "px";
      b.el.style.top   = py + "px";
      b.el.style.width = pw + "px";
      const rot = b.base.r * Math.PI / 180;
      b.centerX = px + (pw/2) * Math.cos(rot);
      b.centerY = py + (pw/2) * Math.sin(rot);
    });
  }
  layout();
  addEventListener("resize", layout);

  function tick(now) {
    const motion = MODES[currentMode];
    bars.forEach(b => {
      const elapsed = now - startTime - b.delay;
      const p = Math.max(0, Math.min(1, elapsed / ENTRY_MS));
      const eased = currentMode === "burst" ? easeOutBack(p) : easeOutCubic(p);
      const m = motion(eased, W, H);

      let cursorRot = 0;
      if (p >= 1 && cursor) {
        const cxAdj = b.centerX + (cursor.parallaxX || 0);
        const cyAdj = b.centerY + (cursor.parallaxY || 0);
        const dx = cursor.x - cxAdj, dy = cursor.y - cyAdj;
        const dist = Math.hypot(dx, dy);
        const proximity = Math.max(0, 1 - dist / SPIN_RADIUS_PX);

        if (proximity > 0.05) b.spinVel += proximity * SPIN_ACCEL;
        b.spinVel *= SPIN_FRICTION;
        b.extraRot += b.spinVel;

        if (Math.abs(b.spinVel) < 0.1 && proximity < 0.05) {
          const target = Math.round(b.extraRot / 360) * 360;
          b.extraRot += (target - b.extraRot) * 0.08;
        }
        cursorRot = b.extraRot;

        const shouldTouch = proximity > 0.05;
        if (shouldTouch && !b.touched) { b.touched = true;  b.el.classList.add("is-touched"); }
        else if (!shouldTouch && b.touched && Math.abs(b.spinVel) < 0.3) {
          b.touched = false; b.el.classList.remove("is-touched");
        }
      }

      const rot = b.base.r + m.rotDelta + cursorRot;
      b.el.style.opacity = m.opacity * 0.9;
      b.el.style.transform = `translate(${m.tx}px, ${m.ty}px) rotate(${rot}deg) scale(${m.scaleX}, ${m.scaleY})`;
      b.el.style.transformOrigin = m.origin;
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return {
    setMode: (m) => { if (MODES[m]) { currentMode = m; startTime = performance.now(); bars.forEach(b => { b.spinVel = 0; b.extraRot = 0; b.touched = false; b.el.classList.remove("is-touched"); }); } },
    getBars: () => bars,
    restart: () => { startTime = performance.now(); },
  };
}
