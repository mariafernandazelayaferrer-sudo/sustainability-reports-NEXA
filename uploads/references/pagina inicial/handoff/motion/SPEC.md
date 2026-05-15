# NEXA · Motion Sketch · Handoff to Claude Code

> Specification para implementar la coreografía del HERO en `index.html`.
> Companion de `NEXA Motion Sketch v4.html` (referencia visual ejecutable).
>
> **Versión**: v1 — 2026-05-15
> **De**: Claude Design
> **Para**: Claude Code

---

## 0. North Star

El HERO del Relatório de Sustentabilidade 2025 es una pieza cinematográfica.
**No es decoración** — es la firma editorial del documento. Tres ideas, en orden:

1. **Las palabras se construyen ante el lector.** El título "RELATÓRIO DE SUSTENTABILIDADE" no aparece; se **arma** desde palitos dispersos.
2. **El X de NEXA es el corazón.** Una cruz segmentada grande, en el centro exacto del viewport, ancla la composición.
3. **El skyline respira.** Las barras del patrón A (`§5` BRAND_GUIDELINES) entran, se estabilizan en la composición fiel a la portada impresa, y reaccionan al cursor.

---

## 1. Layout final (estado settled, t ≥ 4s)

```
┌─────────────────────────────────────────────────────────────┐
│  · CONTACTE-NOS              x NEXA           ↓ PDF  PT EN  │  ← top nav
│                                                              │
│  RELATÓRIO DE              [ MODE SELECTOR ]    01 CONTEXTO │
│  SUSTENTABILIDADE                                02 IMPACTO │
│                                                  03 GOV.    │
│                            ╲                     04 PERSP.  │
│  2025                       ╲                               │
│                              ╳    ← big orange X (center)   │
│  "Good governance..."       ╱                               │
│   — Howard Marks           ╱                                │
│                                                              │
│                                              ░▒  ← bars      │
│                                            ░▒░▒              │
│                          ▼ SCROLL        ░▒░▒░▒    ↻ REPLAY │
└─────────────────────────────────────────────────────────────┘
```

**Composición espacial**:
- Título: `left: 4.5vw`, `top: 14vh`, max-width 60vw, 2 líneas
- "2025": `left: 5vw`, `top: 32vh`, naranja, Montserrat Light 300
- Quote: debajo de 2025, italic, ~14px
- Big X: `left: 50%`, `top: 50%`, translate(-50%, -50%), 26vw cuadrado
- Skyline: 16 bars, mitad derecha + bottom (ver `§4` para coords exactas)
- Chapter list: right edge, vertical center
- Scroll hint: bottom center
- Replay button: bottom right (solo dev/preview)

---

## 2. Paleta · color inversion (importante)

> **Cambio vs `BRAND_GUIDELINES.md §1`**: el hero del web invierte el contraste de las barras vs el fondo, para que coincida con la portada impresa del RS.

| Rol | Hex | Notas |
|---|---|---|
| **Background hero** | `#3D3D3B` | gris cálido medio, más claro que `--nx-ink` |
| **Skyline bars (default)** | `#1A1A18` | más oscuras que el bg (inversión vs editorial estándar) |
| **Skyline bars (touched)** | `#C85204` `--nx-orange` | naranja brand cuando el cursor entra al radio de proximidad |
| **Title (final)** | `#EDEAE3` `--nx-on-ink` | crema/cream |
| **Title (sticks scattered)** | `#EDEAE3` `--nx-on-ink` | mismo color que el final |
| **"2025"** | `#C85204` `--nx-orange` | brand orange |
| **X-icon center** | `#C85204` `--nx-orange` | brand orange |
| **Mid (captions, mono labels)** | `#9A9794` `--nx-mid` | metadata, eyebrows |

El resto de la página (secciones que vienen después del hero) **mantiene la paleta editorial** definida en `BRAND_GUIDELINES.md §1.2`. La inversión es **exclusiva del hero**.

---

## 3. Timeline · choreography

```
t=0ms       ┐ Page loads
            ├─ Bars start entering (current mode default: CASCADE)
            ├─ Title sticks created at random positions across viewport, opacity 0
            │
t=200ms     │ Top nav fades in
t=400-1600  │ Title sticks: each starts traveling to its letter position
            │   - 110 sticks total
            │   - per-stick random delay in [400, 1600] ms
            │   - transition: transform 1800ms cubic-bezier(0.65, 0, 0.2, 1)
t=1100ms    │ Last bar finishes entering (16 bars × 60ms stagger + 1100ms duration)
t=1600ms    │ Big X-icon starts growing (scale 0 → 1, rotate -12° → 0°, spring easing)
t=2200ms    │ Last title stick lands in position (1600 delay + ~1700 transit cusp)
t=2900ms    │ "2025" slides up + fades in (900ms)
t=3000ms    │ Crossfade: strokes fade out (900ms) ↔ clean Montserrat title fades in (900ms)
t=3100ms    │ X-icon entry finishes, switches to idle breathing loop (8s)
t=3400ms    │ Quote fades in (900ms)
t=3400ms+   │ Chapter list 01-04 staggered (100ms each)
t=3800ms    │ Scroll hint + replay button fade in
            │
t=4500ms+   ┴ Everything settled. Cursor interaction takes over.
```

**Total entry duration**: ~4.5s end-to-end.

---

## 4. Skyline bars · coords fieles a la portada

Las 16 barras tienen coordenadas fijas (% del viewport) que reproducen la cascada de la portada impresa pp. 1.

```js
const BARS = [
  // x%, y%, w% (of viewport width), rotation°
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
```

**Reglas**:
- `transform-origin: 50% 50%` (rotación en el centro de la barra)
- Height fijo 18px
- Border-radius 1px
- `background-color` transición 240ms para el flash naranja en hover

---

## 5. Motion vocabulary

### 5.1 Title sticks → clean type (signature motion)

**Concepto**: Cada letra de "RELATÓRIO DE SUSTENTABILIDADE" se descompone en sus líneas geométricas elementales (R = 5 strokes, E = 4, A = 3, etc., total 110 sticks). Los sticks **explotan** desde posiciones random del viewport y **convergen** a sus posiciones correctas para formar las letras. Una vez en posición, **crossfade** a tipografía Montserrat real, limpia.

```js
const LETTERS = {
  // each stroke = [x1, y1, x2, y2] in 0.7-wide × 1.0-tall box
  'R': [[0,0,0,1],[0,0,0.7,0],[0.7,0,0.7,0.5],[0,0.5,0.7,0.5],[0,0.5,0.7,1]],
  'E': [[0,0,0,1],[0,0,0.7,0],[0,0.5,0.6,0.5],[0,1,0.7,1]],
  // ... (ver NEXA Motion Sketch v4.html para set completo)
};
```

**Parámetros**:
- Stick height: **5px** (más fino que el stem de la letra final → los sticks "crecen" hacia la letra)
- Stick color: `--nx-on-ink`
- Stick `transform-origin: 0 50%`, `border-radius: 1.5px`
- Initial state per stick: random `translate(viewport)` + `rotate(±360°)` + `scale(0.4-1.2)` + `opacity 0`
- Transition: `transform 1800ms cubic-bezier(0.65, 0, 0.2, 1), opacity 1300ms ease`
- Per-stick delay: random in `[400, 1600]` ms
- After all settled (t=3000ms): `opacity → 0` (900ms) y simultaneously fade in `<h1>` Montserrat Regular 400

**Don't**: usar SVG path morphing. Usar 110 divs es más performante y permite el random scatter.

### 5.2 Skyline bars · entry modes (5 opciones)

El selector top-right permite ciclar entre 5 motion vocabularies para el entry de las barras. Para producción **usar `CASCADE` por defecto**; los otros 4 son para validación visual de MFZ.

| Mode | Initial state | Easing |
|---|---|---|
| **CASCADE** (default) | `translateX(60vw) scaleX(0.3)` | `cubic-bezier(0.7, 0, 0.2, 1)` |
| AVALANCHE | `translateY(-80vh) rotate(540°)` | easeOutCubic |
| CONSTRUCT | `scaleX(0)` from left edge | linear (drawing in) |
| BURST | `scale(0.05)` from center | spring (overshoot) |
| ORIGAMI | `scaleY(0.2)` + `rotate(-110°)` | easeOutCubic (hinge) |

Cada barra tiene `delay = index × 60ms`. Duración 1100ms. Total entry: ~2.1s para 16 bars.

### 5.3 Cursor proximity · spin + orange flash

**Después** del entry (`progress >= 1`), cada barra responde al cursor:

```js
const proximity = Math.max(0, 1 - distance / 110);   // 110px radius
if (proximity > 0.05) {
  bar.spinVel += proximity * 0.85;
  bar.classList.add('touched');                      // → orange via CSS transition
}
bar.spinVel *= 0.94;                                  // friction
bar.extraRot += bar.spinVel;
// Ease back to nearest 360° multiple cuando se aleja el cursor
```

- Spin axis: `transform-origin: 50% 50%`
- Settle back: cuando `|spinVel| < 0.1` y cursor lejos, snap a múltiplo de 360° (~baseRotation)
- Color: `transition: background-color 240ms` para el flash naranja

### 5.4 Big X (center) · grow

```css
animation: xGrow 1500ms cubic-bezier(0.34, 1.56, 0.64, 1) 1600ms forwards;
@keyframes xGrow {
  0%   { transform: translate(-50%, -50%) scale(0)    rotate(-12deg); opacity: 0; }
  60%  { opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1)    rotate(0deg);   opacity: 1; }
}
```

Después: `xIdle` breathing 8s loop (scale 1 ↔ 1.03, rotate 0° ↔ 0.6°).

### 5.5 Cursor companion (mini X)

- Segmented X 26×26px sigue el cursor con damping 0.25
- `position: fixed`, `pointer-events: none`, `mix-blend-mode: screen`
- `.hot` state: 40×40px, opacity 1 (sobre botones, capítulos, replay)
- Body cursor: `cursor: none` (oculto el cursor del sistema)

### 5.6 Parallax drift

Todo el contenido (excepto cursor + cursor companion + top chrome) en un `.parallax` que tracking:

```js
const targetX = (mouseX / viewportW - 0.5) * 12;     // ±12px
parallaxOffsetX += (targetX - parallaxOffsetX) * 0.06;  // spring
```

---

## 6. Reduced motion · `prefers-reduced-motion`

**No** hagas global off. Per-feature:

- Title sticks: salto inmediato a posición final (skip explosion), después crossfade normal
- Bars entry: opacity 0→1 only, no translate
- Cursor companion: off
- Spin on bar touch: solo cambio de color, no rotación
- Parallax drift: off
- Big X grow: opacity 0→1, no scale/rotate
- Idle breathing X: stop

Ver `nx-tokens.css §MOTION` — durations ya van a 0ms con `prefers-reduced-motion`, completar el resto en JS.

---

## 7. Performance

- 110 strokes + 16 bars = 126 elementos animados simultáneos. Verificado 60fps en M1.
- Usar `will-change: transform, opacity` en `.ts` y `.bar`.
- `getBoundingClientRect` solo en `resize`; en frame loop usar centros pre-computados.
- Strokes son `<div>`, no SVG (más performante para este volumen).

---

## 8. Files to copy

```
sustainability-reports-NEXA/
├── components/hero/
│   ├── HeroMotion.tsx              ← componente principal
│   ├── titleStrokes.ts             ← LETTERS dict + buildTitle()
│   ├── skylineBars.ts              ← BARS coords + entry MODES
│   └── cursorCompanion.ts          ← parallax + cursor X
├── styles/hero.css                 ← keyframes + transitions
└── public/refs/
    └── NEXA-Motion-Sketch-v4.html  ← referencia visual (este sketch)
```

---

## 9. Open questions para MFZ

- [ ] ¿Mantener el cursor companion (mini X) en producción, o solo en desktop?
- [ ] ¿Title explosion solo en first load, o cada vez que el HERO entra en viewport?
- [ ] ¿"2025" tiene que ser tweakable (cambiar año cada edición), o hardcoded?
- [ ] ¿Las 5 entry modes quedan en producción como Easter egg, o solo `CASCADE`?
- [ ] ¿Speaker notes / accesibilidad — texto del HERO debe ser lector-de-pantalla compatible (ARIA labels para el title antes/después del crossfade)?

---

## 10. Sanity checklist before merge

- [ ] Title sticks llegan a posición final antes de crossfade (no quedan "fantasma" volando)
- [ ] Crossfade dura 900ms — ni snap brusco ni overlap demasiado largo
- [ ] Big X centrado exacto en viewport center, no offset
- [ ] Bars (default state) son MÁS OSCURAS que el bg, no más claras (color inversion)
- [ ] Bars en hover → naranja brand (`#C85204`), no naranja deep
- [ ] Cursor spin de las barras vuelve a la posición base cuando se aleja
- [ ] Parallax no excede ±12px (sin disorientar)
- [ ] En mobile (<768px): desactivar cursor companion + parallax, mantener title explosion + bars entry
- [ ] PT/EN: el title `RELATÓRIO DE SUSTENTABILIDADE` cambia a `2025 SUSTAINABILITY REPORT` — el LETTERS dict cubre las letras necesarias para EN también (Y no está en el dict; revisar)

---

*Documento vivo. Cualquier ajuste a la coreografía, versionar este file y `NEXA Motion Sketch v4.html` juntos.*

— Claude Design / NEXA · 2026-05-15
