# NEXA Hero · Motion Handoff Package

Carpeta self-contained con todo lo que Claude Code necesita para portar el HERO del Relatório de Sustentabilidade 2025 al repo `sustainability-reports-NEXA/`.

---

## Inventario

| Archivo | Qué es | Uso |
|---|---|---|
| **`SPEC.md`** | Spec completa: timeline, paleta, easings, layout, reduced-motion, sanity checklist | **Leer primero** |
| **`Hero.reference.html`** | El sketch ejecutable, todo en un archivo (CSS + JS inline) | Abrir en navegador para ver la animación viva — referencia visual oficial |
| **`nx-tokens.css`** | Tokens base del design system NEXA (colores, type, motion, spacing) | Copiar tal cual al repo. Ya existe — solo confirmar que esté actualizado a v0.2 |
| **`hero-overrides.css`** | Color inversion del hero (delta sobre nx-tokens) | Importar **después** de `nx-tokens.css` |
| **`title-strokes.js`** | Módulo ES6: explosión + ensamblado del título + crossfade a Montserrat | `import { buildTitle, LETTERS } from "./title-strokes.js"` |
| **`skyline-bars.js`** | Módulo ES6: 16 bars + 5 entry modes + cursor spin | `import { mountBars, BARS, MODES } from "./skyline-bars.js"` |
| **`cursor-x.js`** | Módulo ES6: cursor companion + parallax drift | `import { mountCursor } from "./cursor-x.js"` |

---

## Quickstart (5 min)

1. Abrir **`Hero.reference.html`** en el navegador. Ver la animación 3-4 veces. Esto es el ground truth.
2. Leer **`SPEC.md`** §1 (layout) y §3 (timeline) — 4 min.
3. Copiar los 3 módulos JS y el `hero-overrides.css` al repo:
   ```
   sustainability-reports-NEXA/
   └── src/hero/
       ├── title-strokes.js
       ├── skyline-bars.js
       ├── cursor-x.js
       └── hero-overrides.css
   ```
4. En `index.html` (o componente Hero):
   ```html
   <link rel="stylesheet" href="/nx-tokens.css">
   <link rel="stylesheet" href="/src/hero/hero-overrides.css">

   <section class="nx-hero">
     <div class="nx-parallax" id="parallax">
       <div class="nx-skyline" id="skyline"></div>
       <div class="nx-title-layer" id="titleLayer"></div>
       <h1 class="nx-title-final" id="titleFinal" hidden>
         RELATÓRIO DE<span>SUSTENTABILIDADE</span>
       </h1>
       <svg class="nx-center-x" viewBox="0 0 100 100">...</svg>
     </div>
     <svg class="nx-cursor" id="cursor" viewBox="0 0 100 100">...</svg>
   </section>

   <script type="module">
     import { buildTitle } from "/src/hero/title-strokes.js";
     import { mountBars } from "/src/hero/skyline-bars.js";
     import { mountCursor } from "/src/hero/cursor-x.js";

     const cursor = mountCursor({
       companion:    document.getElementById("cursor"),
       parallaxEl:   document.getElementById("parallax"),
       hotSelectors: [".nx-mode-btn", ".nx-chapter", ".nx-pdf"],
     });

     const bars = mountBars({
       container: document.getElementById("skyline"),
       mode: "cascade",
       cursor,
     });

     buildTitle({
       container: document.getElementById("titleLayer"),
       lines: ["RELATÓRIO DE", "SUSTENTABILIDADE"],
       onSettle: () => {
         document.getElementById("titleLayer").classList.add("is-faded");
         document.getElementById("titleFinal").hidden = false;
         document.getElementById("titleFinal").classList.add("is-shown");
       },
     });
   </script>
   ```
5. Validar contra el sanity checklist en **`SPEC.md` §10**.

---

## Decisiones aún pendientes para MFZ

Ver **`SPEC.md` §9** — 5 questions:
1. Cursor companion solo en desktop?
2. Title explosion en first-load only, o on-scroll-enter?
3. "2025" tweakable o hardcoded?
4. Las 5 entry modes en producción, o solo `cascade`?
5. ARIA labels para el title antes/después del crossfade?

---

## Contact

Cualquier ajuste a la coreografía: versionar `Hero.reference.html` + `SPEC.md` juntos. No editar los módulos JS sin sincronizar la referencia visual.

— Claude Design · 2026-05-15
