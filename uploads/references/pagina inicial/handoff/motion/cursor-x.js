/* ============================================================
   NEXA Hero · cursor companion + parallax
   ------------------------------------------------------------
   - A segmented X follows the pointer with damping
   - Hover targets get a "hot" state (40px instead of 26px)
   - Whole parallax layer drifts ±12px with the cursor
   - Exposes live { x, y, parallaxX, parallaxY } for other modules

   Public API:
     - mountCursor({ companion, parallaxEl, hotSelectors })
         companion:    <svg> element (segmented X)
         parallaxEl:   the layer to drift
         hotSelectors: CSS selectors that trigger .is-hot
         → returns the live `cursor` object
   ============================================================ */

export function mountCursor({ companion, parallaxEl, hotSelectors = [] }) {
  let W = innerWidth, H = innerHeight;
  addEventListener("resize", () => { W = innerWidth; H = innerHeight; });

  const cursor = {
    x: -9999, y: -9999,
    nx: 0, ny: 0,
    parallaxX: 0, parallaxY: 0,
  };

  let cxNow = -50, cyNow = -50;

  addEventListener("mousemove", (e) => {
    cursor.x = e.clientX; cursor.y = e.clientY;
    cursor.nx = e.clientX / W - 0.5;
    cursor.ny = e.clientY / H - 0.5;
    companion.classList.add("is-on");
  });
  addEventListener("mouseleave", () => {
    companion.classList.remove("is-on");
    cursor.x = -9999; cursor.y = -9999;
  });

  hotSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener("mouseenter", () => companion.classList.add("is-hot"));
      el.addEventListener("mouseleave", () => companion.classList.remove("is-hot"));
    });
  });

  function tick() {
    // parallax drift (spring 0.06)
    cursor.parallaxX += (cursor.nx * 12 - cursor.parallaxX) * 0.06;
    cursor.parallaxY += (cursor.ny * 12 - cursor.parallaxY) * 0.06;
    if (parallaxEl) {
      parallaxEl.style.transform = `translate3d(${cursor.parallaxX}px, ${cursor.parallaxY}px, 0)`;
    }
    // companion follow (damping 0.25)
    cxNow += (cursor.x - cxNow) * 0.25;
    cyNow += (cursor.y - cyNow) * 0.25;
    companion.style.left = cxNow + "px";
    companion.style.top  = cyNow + "px";
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return cursor;
}
