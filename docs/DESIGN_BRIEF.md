# NEXA — Sustainability Report Web Edition · Design Brief

> Documento de input para Claude Design (y referencia compartida MFZ ↔ implementación).
> Objetivo: la web del RS NEXA 2025 debe ser **icónica**, no funcional.
> Fecha: 2026-05-15.

---

## 1. Contexto

**Nexa SGOIC, S.A.** — sociedade gestora de organismos de investimento coletivo, regulada CMVM (Portugal). Fundada outubro 2024. Empresa hermana de Castro Group (NEXA gestiona los fondos donde Castro Group desarrolla los ativos). Reporta 1ª edição del Relatório de Sustentabilidade, fiscal year 2025.

**ESG Responsible**: Fernanda Zelaya (MFZ — autora de este brief y del reporte).

**Audiencia del web edition:**
- Inversores institucionales (LPs de los OIC)
- Reguladores (CMVM)
- Stakeholders + posibles colaboradores
- Internamente: equipo Castro Group + Nexa
- NO público general — esto es finance-grade, no marketing.

**Repo separado de Castro Group RS26.** No reutilizar el design system de RS26. NEXA tiene identidad propia y diferenciada.

---

## 2. Tagline y filosofía

> **"Connect, Invest, Build the future."**

Tres verbos. Tres movimientos. El reporte está estructurado en torno a esos verbos:
- **Connect** → vínculos: investidores ↔ ativos ↔ comunidades
- **Invest** → criterio de selección, governance, criterio ESG
- **Build** → desarrollo de portfolio, certificaciones, futuro

**Frase-firma alternativa** (en pg interior):
> *"Analisar com rigor. Gerir com propósito. Construir para durar."*

**Quote de cover**:
> *"Good governance and long term thinking are the foundations of sustainable investment."* — Howard Marks (Oaktree Capital)

Esto fija el tone: **finance-grade, sober, value-investor**. NO ESG-marketing-cliché. NO green-tinted everything.

**Closing thought** (pg 28):
> *"Para a Nexa, o investimento sustentável assenta em dois pilares: boa governação e visão de longo prazo."*

**Closing del reporte** (pg 35):
> *"A confiança é o resultado da ética, inovação, sustentabilidade, compromisso e excelência. Cinco valores que a Nexa assume, em cada decisão, todos os dias."*

---

## 3. Identidad visual extraída del PDF (38pp)

### Paleta
Aproximaciones (chequear pixel exacto):
- **`--nx-ink`** dark warm grey `#2D2D2C` — background dominante de chapter covers y filosofía pages
- **`--nx-orange`** rust/brulé orange `#E36420` o similar — ÚNICO acento. NO usar verdes ESG, NO usar naranjas Castro (#FB7622 que es más vivo).
- **`--nx-bone`** cream warm `#EDEAE3` o `#E8E5DD` — background dominante de páginas data/contenido
- **`--nx-paper`** white-cream `#F5F2EB` — background secundario, cards
- **`--nx-mid-grey`** `#9A9794` — type secundario, hairlines

**Es duotono.** No hay flag de 5 colores. La paleta entera es: dark + orange + neutrales tibios. Ese constraint es signature.

### Logo
**Wordmark "N≡X∧"** — solo type, sin pictograma. Construcción:
- N gris (`--nx-ink`)
- Las dos barras horizontales que forman la "E" (≡)
- **X en naranja `--nx-orange`** — la única letra coloreada. Es el "punto de conexión" (Connect).
- A invertida (∧)

**Variantes vistas:**
- Sobre dark (cover): N gris claro / X naranja
- Sobre light (interior): N dark / X naranja
- Solo "X" como ornamento (en chapter philosophy pages, top-left, sutil)

### Tipografía
Del PDF (creator: Adobe InDesign 20.2):
- **Display**: sans light/regular, geométrica. Posiblemente **Inter Display Light**, **Manrope**, o **Söhne**. Para la web → **Inter** (300/400) en hero, **Inter Display** opcional si MFZ quiere look más editorial.
- **Body**: sans regular, 14-16px equivalente. Inter 400.
- **Frase-firma (filosofía pages)**: **bold italic**, parece serif moderna (Recoleta) o sans con cursiva fuerte. Considerar **Cormorant Garamond Italic Bold** o **Inter italic 700** como decisión web.
- **Numerales display** (198M€ tipo): sans light/regular muy largo en tamaño. Inter 300 a 80-140px.
- **Section nav (footer)**: sans tracking ligero, all-caps en algunos casos, mixed case en otros. Hairline pequeño.

**Regla crítica heredada de RS26**: NO self-hostear fuentes comerciales. Google Fonts (Inter + opcional Cormorant Garamond) o open-source. Si Claude Design pide Söhne o ABC Diatype, necesitamos confirmar licencia o sustituto open.

### Composiciones distintivas

#### A. Cover (pg 1)
- Background dark `--nx-ink`
- Título "RELATÓRIO DE SUSTENTABILIDADE" all-caps light grey, top-left
- "2025" en orange, top-right
- Quote Howard Marks centrada en cuerpo
- Logo "N≡X∧" centrado-izquierda, escala media
- Composición bottom: planks/wood-beams abstractos en grey-on-dark (sutil textura) — sugiere construcción/foundations

#### B. Page 3 (tagline)
- Background bone/cream
- **Foto fotográfica:** chain link de acero industrial. El eslabón central está reemplazado por un **eslabón de fibra naranja brulé tejida** — orgánico vs metálico. Metáfora: el "connect" humano dentro de la cadena financiera. **Es una imagen icónica.**
- "Connect, Invest" top-left, sans light dark
- "Build the future." bottom-right, sans light dark
- Footer linear nav

#### C. Page 4 ("O universo Nexa")
- Mapa de Portugal en silueta vibrante orange con icon-thumbnails de ativos como pin-cards
- Bone background
- Stats laterales: **dark grey vertical pills** con números enormes (198M€, 10, 8, 3, 18) en blanco
- LEED Gold card aparte, white card, logo + caption

#### D. Páginas-filosofía (8, 23, 28, 35)
Dark warm grey backgrounds. Frase bold-italic anclada a una esquina. **Pattern geométrico ornamental** distinto en cada una:
- **Pg 8**: barras verticales tipo skyline brutalist (densidad variable, una "ciudad de barras")
- **Pg 23**: dashes/sticks dispersos en rotaciones aleatorias — efecto "viento" / partículas
- **Pg 28**: grid riguroso de dashes diagonales, espaciado matemático — efecto "wheat field" / tejido
- **Pg 35**: (similar a 23, más sutil)

**Idea web:** cada filosofía page tendría su propia animación. El pattern no es decoración, es un **lenguaje** que evoluciona página a página.

#### E. Chapter covers (pg 30: capítulo 03)
- **Full-bleed orange `--nx-orange`** — la única página totalmente naranja del reporte
- **Wallpaper sutil**: el símbolo "X" repetido como pattern (más oscuro orange-on-orange)
- **Numeral gigante "03"** en transparente / outline, esquina derecha
- Título capítulo en dark sobre orange
- Resumen ejecutivo de la sección en columna izquierda

#### F. Data viz pages (18, 19, 20, 21, 22, 24)
- Bone backgrounds
- Donut + bar charts MONO con accent orange — **NO usar paletas multicolor**. Es: dark + orange + grey-tones. Cada chart respeta esa restricción.
- KPI principal de la página va en **pill vertical orange con white type** (ej: "17,2%" en pg 18 — % de energía renovable)
- Hairline dividers horizontales generosos entre secciones
- Numerales destacados en sans regular 32-48px

#### G. Materiality matrix (pg 14)
- Scatter plot orange-dots-on-bone con códigos visibles (E1.1, S2.3, G1.2)
- **Tags modulares** bottom-right de la página: "E1. E2. E3. E4. E5." en texto enorme dark · "S1. S2. S3. S4." en pill orange · etc. Es un **léxico visual** que la web podría usar de forma interactiva.

#### H. Portfolio (pg 9, 10)
- Lista de ativos en formato **mini-cards con thumbnail + meta**: nombre / tipo / m² / cidade / proprietário / status
- 1 hairline divider entre items
- Página densa, ordenada como tabla con respiraciones

#### I. People (pg 11)
- Board: 4 retratos en grid 2×2 con fondo de estudio uniforme, todas las fotos crop idéntico (busto + hombros, ojos a misma altura)
- Organograma simple izquierda con nodes y arrows
- Nombres + roles bajo cada foto

#### J. Final page (pg 37)
- Background dark
- "efeito surpresa" — texto chico, esquina. **Intriga sin resolución**. Es el cierre del reporte. ¿En web esto podría ser un easter egg / teaser para el próximo reporte? **Claude Design idea this**.

### Footer navigation (todas las páginas interiores)
- Linear strip al fondo de cada página
- "NEXA logo · Índice · 01 Nexa · 02 Situação Atual · 03 Connect, Invest & Build the future · Análise de Dupla Materialidade · pg_num"
- Sección actual se highlightea: ya sea **orange filled pill** (si está en 01) o **black filled pill** (si está en 04 Materialidade)
- Estética: divisores verticales hairline entre items

---

## 4. Contenido a representar en web

JSON pre-procesado en `/data/`. 16 archivos cubren todo. Estructura:
- `metadata.json` — sections + meta
- `company.json` — quién es Nexa, valores, KPIs
- `board-message.json` — mensaje conselho
- `funds.json` — 3 fondos (Icon SIC, Fuse Valley FII, Castro Capital SIC)
- `assets.json` — 18 ativos
- `people.json` — Board + departamentos
- `materiality.json` — análisis dupla materialidade
- `esg-targets.json` — metas y métricas ESG
- `environmental.json` — energía, agua, residuos, mobilidad, GEE Scope 1/2/3
- `social.json` — colaboradores, salarios, formación
- `governance.json` — compliance, riesgo
- `economic.json` — EBITDA, valor económico
- `future-perspectives.json` — plan climático 2025-2030
- `final-considerations.json` — considerações finais (MFZ)
- `glossary.json` — términos
- `index.json` — índice de archivos

**Estructura del reporte (4 capítulos):**
1. **01 Nexa** — Mensagem Board / Missão Visão Valores / Fundos / Ativos / Pessoas
2. **02 Situação Atual** — Environmental / Social / Governance / Economic
3. **03 Connect, Invest & Build the future** — Perspetivas Futuras / Considerações Finais
4. **04 Análise de Dupla Materialidade**

**KPIs hero:**
- 198 M€ AUM
- 18 ativos imobiliários
- 10 colaboradores
- 8 cidades en Portugal
- 3 OIC sob gestão
- 1ª certificação LEED Gold® (La Movida)
- Frota: 66,7% eléctrica
- 17,2% energía renovável integrada
- 0,0 TonCO₂e Scope 2 operação (energia verde GdO)

---

## 5. Qué hacer "icónico" — ideas seed para Claude Design

> Estas NO son requisitos. Son seeds. Claude Design debe sentir libertad de reinterpretar.

1. **El "X" naranja como elemento interactivo**: cursor, hover state, scroll progress, anchor link target. El X es la marca — debería ser táctil.
2. **Chain link animado del hero**: ¿se podría reinterpretar la metáfora del eslabón en SVG animado o WebGL? El frame inicial enseña la cadena entera metálica, luego un eslabón se transforma en fibra naranja tejida — es el "punto de conexión humana".
3. **Filosofía pages como "respiraciones"**: cada vez que el scroll alcanza una de las 4 frases-filosofía (pg 8, 23, 28, 35 del PDF), la página entra a un modo dark + el ornamental pattern de esa página específica se genera procedural (canvas o CSS). El pattern responde al cursor — los dashes se rotan / desplazan sutil con el mouse. **Cada filosofía = una identidad visual distinta dentro del mismo lenguaje**.
4. **Chapter covers como "transitions"**: entre capítulos, full-bleed orange con el numeral gigante + X-wallpaper. Pequeño momento de pausa narrativa que demarca el capítulo siguiente. Podría ser un overlay scroll-triggered, no una página separada.
5. **Mapa interactivo de Portugal**: 18 ativos como pins clickeables sobre silueta orange. Hover → mini-card con thumbnail + meta. Click → modal con full info. La distribución geográfica es signature de NEXA — pedís un mapa estático estaría desaprovechado.
6. **Materiality scatter plot interactivo**: los códigos E1-E5, S1-S4, G1-G3 son **tags clickeables**. Click en tag → highlight de los dots correspondientes. Es un sistema de filtros sobre la matriz. **Esto convierte la página 14 en herramienta, no infografía**.
7. **Stats en pills verticales**: el lenguaje del PDF de "número grande en pill orange" se puede animar con count-up al scroll. Los pills laterales del hero ("Universo Nexa") son la signature visual.
8. **Tipografía editorial fuerte**: las frases-filosofía bold-italic merecen tratamiento serio en web. Considerar **Cormorant Garamond Italic 700** o **Inter Italic 700** a 48-72px, ancla en grid asimétrico.
9. **"efeito surpresa"** (pg 37): proponer un easter-egg al final del scroll. Algo lúdico — un parallax que descubre el próximo año teaser, una animación sutil del X que se completa, audio click, lo que sea. **MFZ pondría una guiñada al final**.
10. **No usar emojis ni ícones de stock**. La iconografía debe ser custom o ausente. Hairlines, X marks, geometric primitives. Restricción dura.

---

## 6. Constraints técnicos heredados de RS26 (lecciones duras)

- **Single-file HTML/CSS/JS, sin framework**. Sin build step.
- **Fuentes**: Google Fonts only en repo público. NO self-host comercial.
- **GitHub Pages** desde `main` branch, source `/`. Repo debe ser público (free plan).
- **iOS Low Power Mode** activa `prefers-reduced-motion: reduce` → frena TODAS las animaciones. NO usar `prefers-reduced-motion` como switch general. Reservar SOLO para custom cursor (accesibilidad real).
- **Mobile**: chequear <380px (iPhone SE / Galaxy S). Hero translateX magnitudes deben ser pequeñas. Chapter bands compactos.
- **Photos**: revisar `object-position` por foto.
- **NO charts library externa**. Usar SVG inline o canvas. Bundle 0.
- **Print partner identity PDF** debe quedar en `pdfs/` privado o explicitar que es público.

Detalles en `[[reference-sustainability-report-stack]]` (memoria personal de MFZ).

---

## 7. Lo que NO replicar de RS26

- **No flag de 5 colores** — NEXA es duotono.
- **No warm putty background** — NEXA es bone/cream + dark grey.
- **No quote-orbits o names-orbits con anillos rotando** — eso es lenguaje de Castro Group. NEXA es más quieto, más arquitectónico.
- **No "isotype social" de personitas** — NEXA tiene 10 colaboradores, no 57. Lenguaje diferente.
- **No pausa.html standalone con sphere grid** — NEXA tiene sus propias "pausas" (filosofía pages) integradas inline en el flow.
- **No portfolio macro-numbers con círculos** — NEXA usa pills verticales para stats. Idioma distinto.

---

## 8. Lo que SÍ replicar técnicamente

- File structure (index.html, projects.html opcional, .gitignore con fuentes)
- Workflow: print partner first → web second
- BRAND_GUIDELINES.md con decisiones numeradas
- Mobile-first checks (lecciones de RS26 §6)
- Tokens CSS en `:root` con prefix `--nx-*`

---

## 9. Próximos pasos

1. **Claude Design** propone dirección creativa con sketches/mockups (puede ser sobre este brief o totalmente nueva).
2. **MFZ** revisa, combina, decide.
3. **Esta sesión** convierte la dirección final en:
   - `BRAND_GUIDELINES.md` (decisiones numeradas)
   - `colors_and_type.css` (tokens)
   - `index.html` (build)
   - Deploy a GitHub Pages
4. **Print partner** valida la versión digital es consistente con el print.

---

## Anexos

- `/uploads/references/pdf_pages/` — 18 páginas clave renderizadas como PNG @ 120 dpi
- `/pdfs/RS_NEXA_2025.pdf` — PDF original (38 pp, 2.6 MB)
- `/data/*.json` — contenido completo pre-procesado
