const fs = require('fs');
const path = require('path');
const stylesCssPath = path.join(__dirname, '../styles.css');

const raw = `1: /* ============================================================
2:    CLUB TOLOSANO — HOJA DE ESTILOS BASE
3:    Tarea 2: Custom Properties + Grid Layout (mobile-first)
4:    ============================================================ */
5: 
6: /* ---------- 1. DESIGN TOKENS ---------- */
7: :root {
8:   /* Colores */
9:   --color-primario: #38547B;
10:   --color-secundario: #273A5B;
11:   --color-oscuro: #0A1B2C;
12:   --color-acento: #014491;
13:   --color-claro: #D1D4E3;
14:   --color-gris: #D9D9D9;
15:   --gradiente-fondo: linear-gradient(85.32deg, #FFFFFF 3.79%, #2C71FF 108.7%);
16: 
17:   /* Tipografía */
18:   --font-titulos: 'Bebas Neue', sans-serif;
19:   --font-base: 'Beiruti', sans-serif;
20: 
21:   /* Escala de espaciado */
22:   --espacio-xs: 0.5rem;   /* 8px */
23:   --espacio-sm: 1rem;     /* 16px */
24:   --espacio-md: 2rem;     /* 32px */
25:   --espacio-lg: 4rem;     /* 64px */
26: }
27: 
28: /* ---------- 2. RESET BÁSICO ---------- */
29: *,
30: *::before,
31: *::after {
32:   box-sizing: border-box;
33:   margin: 0;
34:   padding: 0;
35: }
36: 
37: html {
38:   -webkit-text-size-adjust: 100%;
39:   scroll-behavior: smooth;
40: }
41: 
42: img {
43:   display: block;
44:   max-width: 100%;
45: }
46: 
47: ul {
48:   list-style: none;
49: }
50: 
51: a {
52:   color: inherit;
53:   text-decoration: none;
54: }
55: 
56: /* ---------- 3. TIPOGRAFÍA GLOBAL ---------- */
57: body {
58:   font-family: var(--font-base);
59:   color: var(--color-oscuro);
60:   line-height: 1.5;
61: }
62: 
63: h1, h2, h3, h4,
64: .header__nombre,
65: .footer__titulo,
66: .footer__nombre {
67:   font-family: var(--font-titulos);
68:   text-transform: uppercase;
69:   line-height: 1.1;
70: }
71: 
72: h1 {
73:   font-size: 3rem;
74: }
75: 
76: h2 {
77:   font-size: 2rem;
78: }
79: 
80: h3 {
81:   font-size: 1.25rem;
82:   text-transform: none;
83: }
84: 
85: /* ==============================================================
86:    4. LAYOUT MACRO — MOBILE FIRST (default: 1 columna, min 375px)
87:    ============================================================== */
88: 
89: /* ---------- Header ---------- */
90: .header {
91:   display: grid;
92:   grid-template-columns: 1fr;
93:   gap: var(--espacio-sm);
94:   padding: var(--espacio-sm);
95: }
96: 
97: .header__marca {
98:   display: flex;
99:   align-items: center;
100:   gap: var(--espacio-xs);
101: }
102: 
103: .header__logo {
104:   width: 48px;
105: }
106: 
107: .nav__lista {
108:   display: flex;
109:   flex-wrap: wrap;
110: }
111: 
112: .nav__item {
113:   padding: 0 var(--espacio-sm);
114: }
115: 
116: .nav__item:last-child {
117:   padding-right: 0;
118: }
119: 
120: /* ---------- Main: flujo general en 1 columna ---------- */
121: .main {
122:   display: grid;
123:   grid-template-columns: 1fr;
124:   gap: var(--espacio-lg);
125:   padding: 0 var(--espacio-sm);
126: }
127: 
128: /* ---------- Hero ---------- */
129: .hero {
130:   display: grid;
131:   grid-template-columns: 1fr;
132:   padding: var(--espacio-md) 0;
133: }
134: 
135: .hero__contenido {
136:   display: grid;
137:   gap: var(--espacio-sm);
138:   text-align: left;
139: }
140: 
141: /* ---------- Botones (base, sin color todavía) ---------- */
142: .boton {
143:   display: inline-block;
144:   width: fit-content;
145:   padding: var(--espacio-xs) var(--espacio-sm);
146:   font-family: var(--font-base);
147: }
148: 
149: /* ---------- Próximos encuentros ---------- */
150: .encuentros {
151:   display: grid;
152:   gap: var(--espacio-sm);
153: }
154: 
155: .encuentros__encabezado {
156:   display: flex;
157:   align-items: center;
158:   gap: var(--espacio-sm);
159: }
160: 
161: .encuentros__decoracion {
162:   flex-grow: 1;
163: }
164: 
165: .encuentros__contenedor {
166:   display: grid;
167:   grid-template-columns: 1fr;
168:   gap: var(--espacio-sm);
169: }
170: 
171: .tarjeta-evento {
172:   position: relative;
173:   min-height: 380px;
174: }
175: 
176: .tarjeta-evento__info {
177:   position: absolute;
178:   bottom: 0;
179:   left: 0;
180:   width: 100%;
181:   padding: var(--espacio-sm);
182: }
183: 
184: /* ---------- Mantenete al tanto (novedades) ---------- */
185: .novedades {
186:   display: grid;
187:   gap: var(--espacio-md);
188: }
189: 
190: .novedades__encabezado {
191:   display: grid;
192:   grid-template-columns: 1fr;
193:   gap: var(--espacio-sm);
194: }
195: 
196: .novedades__titulo-grupo {
197:   display: flex;
198:   align-items: center;
199:   gap: var(--espacio-sm);
200: }
201: 
202: /* El carrusel: cada ítem ocupa el ancho completo, siempre en 1 columna */
203: .novedades__carrusel {
204:   display: grid;
205:   grid-template-columns: 1fr;
206:   gap: var(--espacio-sm);
207: }
208: 
209: .tarjeta-noticia {
210:   container-type: inline-size;
211:   container-name: tarjeta-noticia;
212: }
213: 
214: .tarjeta-noticia__contenido {
215:   display: grid;
216:   gap: var(--espacio-xs);
217: }
218: 
219: /* ---------- Sponsors ---------- */
220: .sponsors {
221:   display: grid;
222:   gap: var(--espacio-md);
223:   padding: var(--espacio-lg) var(--espacio-sm);
224: }
225: 
226: .sponsors__cabecera {
227:   display: flex;
228:   flex-direction: column;
229:   gap: var(--espacio-xs);
230: }
231: 
232: .sponsors__lista {
233:   display: flex;
234:   flex-wrap: wrap;
235:   justify-content: center;
236:   align-items: center;
237:   gap: var(--espacio-lg);
238: }
239: 
240: /* ---------- Footer ---------- */
241: .footer {
242:   display: grid;
243:   grid-template-columns: 1fr;
244:   padding: 80px 0; /* medida estricta pedida por el diseño */
245: }
246: 
247: .footer__grid {
248:   display: grid;
249:   grid-template-columns: 1fr; /* mobile: 1 columna */
250:   gap: 80px; /* medida estricta pedida por el diseño */
251:   padding: 0 var(--espacio-sm);
252: }
253: 
254: .footer__columna {
255:   display: flex;
256:   flex-direction: column;
257:   gap: var(--espacio-xs);
258:   align-items: start;
259: }
260: 
261: .footer__marca {
262:   display: flex;
263:   align-items: center;
264:   gap: var(--espacio-xs);
265: }
266: 
267: .footer__lista,
268: .footer__redes {
269:   display: flex;
270:   flex-direction: column;
271:   gap: var(--espacio-xs);
272: }
273: 
274: .footer__redes {
275:   flex-direction: row;
276:   gap: var(--espacio-md);
277: }
278: 
279: .footer__bottom {
280:   grid-column: 1 / -1;
281:   border-top: 1px solid rgba(255, 255, 255, 0.1);
282:   padding-top: 2rem;
283:   margin-top: 2rem;
284:   padding-left: var(--espacio-sm);
285:   padding-right: var(--espacio-sm);
286:   text-align: center;
287: }
288: 
289: /* Tablet: 2 columnas */
290: @media (min-width: 768px) {
291:   .footer__grid {
292:     grid-template-columns: repeat(2, 1fr);
293:   }
294: }
295: 
296: /* ==============================================================
297:    5. DESKTOP (min-width: 1280px)
298:    ============================================================== */
299: @media (min-width: 1280px) {
300: 
301:   /* Header: logo a la izquierda, nav a la derecha */
302:   .header {
303:     grid-template-columns: auto 1fr;
304:     align-items: center;
305:     justify-content: space-between;
306:     padding: var(--espacio-sm) var(--espacio-lg);
307:   }
308: 
309:   .header__nav {
310:     justify-self: end;
311:   }
312: 
313:   /* Hero: texto contenido a la izquierda sobre la imagen */
314:   .hero__contenido {
315:     max-width: 50%;
316:   }
317: 
318:   .hero__titulo {
319:     font-size: 6rem;
320:   }
321: 
322:   .main {
323:     padding: 0 var(--espacio-lg);
324:   }
325: 
326:   /* Encabezados de sección: título y CTA/descripción en línea */
327:   .novedades__encabezado {
328:     grid-template-columns: auto 1fr;
329:     align-items: center;
330:     justify-content: space-between;
331:   }
332: 
333:   /* Sponsors: título y texto lado a lado en desktop */
334:   .sponsors__cabecera {
335:     flex-direction: row;
336:     align-items: center;
337:     gap: 2rem;
338:   }
339: 
340:   .encuentros__contenedor {
341:     grid-template-columns: repeat(3, 1fr);
342:   }
343: 
344:   /* Footer: 4 columnas (Marca, Mapa, Comunidad, Contacto) */
345:   .footer__grid {
346:     grid-template-columns: repeat(4, 1fr);
347:   }
348: 
349:   .footer__columna--contacto {
350:     text-align: right;
351:     align-items: end;
352:   }
353: }
354: 
355: /* ==============================================================
356:    6. LOOK & FEEL — Colores, fondos y microcomposición
357:    (No se modifica ninguna propiedad de Grid definida arriba)
358:    ============================================================== */
359: 
360: /* ---------- Elementos globales ---------- */
361: body {
362:   background-color: #FFFFFF;
363:   color: var(--color-oscuro);
364: }
365: 
366: .boton {
367:   border-radius: 4px;
368:   font-weight: 600;
369:   text-align: center;
370:   cursor: pointer;
371:   transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
372: }
373: 
374: .boton--primario {
375:   background-color: var(--color-acento);
376:   color: #FFFFFF;
377:   border: none;
378: }
379: 
380: .boton--primario:hover {
381:   background-color: var(--color-secundario);
382: }
383: 
384: .boton--secundario {
385:   background-color: transparent;
386:   color: var(--color-primario);
387:   border: 1px solid var(--color-primario);
388: }
389: 
390: .boton--secundario:hover {
391:   background-color: var(--color-primario);
392:   color: #FFFFFF;
393: }
394: 
395: /* ---------- Header ---------- */
396: .header {
397:   background-color: var(--color-oscuro);
398:   color: #FFFFFF;
399: }
400: 
401: .header__nombre {
402:   color: #FFFFFF;
403: }
404: 
405: .nav__item {
406:   border-right: 1px solid rgba(217, 217, 217, 0.4); /* var(--color-gris) semitransparente */
407: }
408: 
409: .nav__item:last-child {
410:   border-right: none;
411: }
412: 
413: .nav__link {
414:   font-family: var(--font-titulos);
415:   text-transform: uppercase;
416:   color: var(--color-claro);
417: }
418: 
419: .nav__link:hover {
420:   color: #FFFFFF;
421: }
422: 
423: .nav__link--activo {
424:   color: var(--color-acento);
425:   font-weight: 700;
426: }
427: 
428: /* ---------- Hero ---------- */
429: .hero {
430:   background-image: var(--gradiente-fondo), url('assets/portada.jpg');
431:   background-blend-mode: multiply;
432:   background-size: cover;
433:   background-position: center;
434: }
435: 
436: .hero__categoria {
437:   color: var(--color-claro);
438:   text-transform: uppercase;
439:   letter-spacing: 0.05em;
440:   font-size: 0.875rem;
441: }
442: 
443: .hero__titulo {
444:   font-size: 3.5rem;
445:   line-height: 0.95;
446: }
447: 
448: .hero__titulo--outline {
449:   color: transparent;
450:   -webkit-text-stroke: 1px #FFFFFF;
451: }
452: 
453: .hero__titulo--solid {
454:   color: #528FFF; /* azul vibrante, tono claro del --gradiente-fondo */
455: }
456: 
457: .hero__bajada {
458:   color: var(--color-claro);
459: }
460: 
461: .hero__cta {
462:   background-color: var(--color-acento);
463:   color: #FFFFFF;
464:   padding: var(--espacio-xs) var(--espacio-md);
465: }
466: 
467: /* ---------- Botón pastilla (reutilizable: Hero y Novedades) ---------- */
468: .boton--pastilla {
469:   border-radius: 999px;
470: }
471: 
472: /* ---------- Barra decorativa diagonal (reutilizable: encabezados de sección) ---------- */
473: .titulo-decoracion {
474:   height: 18px;
475:   background: linear-gradient(to right, #FFFFFF, var(--color-acento));
476:   clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%);
477: }
478: 
479: /* ---------- Tarjeta de noticia: slide destacado del carrusel ---------- */
480: .tarjeta-noticia {
481:   position: relative;
482:   min-height: 500px;
483:   border-radius: 6px;
484:   overflow: hidden;
485:   background-image:
486:     linear-gradient(to top right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 60%),
487:     url('https://placehold.co/1200x600/0A1B2C/0A1B2C');
488:   background-size: cover;
489:   background-position: center;
490: }
491: 
492: .tarjeta-noticia__contenido {
493:   position: absolute;
494:   bottom: 3rem;
495:   left: 2rem;
496:   max-width: 85%; /* mobile: ocupa más ancho para no recortar el texto */
497: }
498: 
499: .tarjeta-noticia__titulo {
500:   font-family: var(--font-titulos);
501:   text-transform: uppercase;
502:   color: #FFFFFF;
503:   font-size: 2rem;
504: }
505: 
506: .tarjeta-noticia__resumen {
507:   color: #FFFFFF;
508:   font-weight: 400;
509: }
510: 
511: .tarjeta-noticia__cta {
512:   width: fit-content;
513: }
514: 
515: /* Contenedor ancho: el texto puede acotarse como pide la maqueta de escritorio */
516: @container tarjeta-noticia (min-width: 600px) {
517:   .tarjeta-noticia__contenido {
518:     max-width: 60%;
519:   }
520: }
521: 
522: /* ---------- Controles del carrusel ---------- */
523: .carrusel__indicadores {
524:   position: absolute;
525:   bottom: 1.5rem;
526:   left: 50%;
527:   transform: translateX(-50%);
528:   display: flex;
529:   gap: 8px;
530: }
531: 
532: .carrusel__indicador {
533:   width: 10px;
534:   height: 10px;
535:   border-radius: 50%;
536:   border: 1px solid var(--color-acento);
537:   background-color: transparent;
538: }
539: 
540: .carrusel__indicador--activo {
541:   background-color: var(--color-acento);
542: }
543: 
544: .carrusel__flecha {
545:   position: absolute;
546:   bottom: 1.5rem;
547:   right: 2rem;
548:   width: 40px;
549:   height: 40px;
550:   border-radius: 50%;
551:   background-color: var(--color-acento);
552:   color: #FFFFFF;
553:   border: none;
554:   display: flex;
555:   align-items: center;
556:   justify-content: center;
557:   cursor: pointer;
558: }
559: 
560: .tarjeta-evento {
561:   border: 2px solid var(--color-acento);
562:   border-radius: 6px;
563:   overflow: hidden;
564:   background-image:
565:     linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 50%),
566:     url('https://placehold.co/600x800/0A1B2C/0A1B2C');
567:   background-size: cover;
568:   background-position: center;
569: }
570: 
571: .tarjeta-evento__categoria {
572:   color: var(--color-claro);
573:   font-size: 0.875rem;
574: }
575: 
576: .tarjeta-evento__titulo {
577:   font-family: var(--font-titulos);
578:   text-transform: uppercase;
579:   color: #FFFFFF;
580:   font-size: 1.75rem;
581: }
582: 
583: .tarjeta-evento__meta {
584:   display: flex;
585:   flex-direction: column;
586:   gap: var(--espacio-xs);
587:   margin-top: var(--espacio-xs);
588: }
589: 
590: .tarjeta-evento__meta-item {
591:   display: flex;
592:   align-items: center;
593:   gap: var(--espacio-xs);
594:   font-size: 0.75rem;
595:   color: #FFFFFF;
596: }
597: 
598: /* ---------- Sponsors ---------- */
599: .sponsors {
600:   background: linear-gradient(to bottom, var(--color-oscuro) 40%, rgba(0, 0, 0, 0.5)), url('assets/fondo-sponsors.jpg') bottom / cover no-repeat;
601: }
602: 
603: .sponsors__titulo {
604:   font-size: 3rem;
605:   font-weight: 700;
606:   color: transparent;
607:   -webkit-text-stroke: 1.5px #FFFFFF;
608: }
609: 
610: .sponsors__texto {
611:   max-width: 400px;
612:   font-size: 0.875rem;
613:   color: var(--color-claro);
614: }
615: 
616: .sponsors__logo {
617:   max-width: 120px;
618:   filter: grayscale(100%) brightness(0) invert(1);
619:   opacity: 0.7;
620:   transition: opacity 0.2s ease, filter 0.2s ease;
621: }
622: 
623: .sponsors__logo:hover {
624:   filter: none;
625:   opacity: 1;
626: }
627: 
628: /* ---------- Footer ---------- */
629: .footer {
630:   background-color: #0A2310; /* verde oscuro; no forma parte de la paleta de tokens */
631:   color: var(--color-claro);
632: }
633: 
634: .footer__nombre {
635:   color: #FFFFFF;
636:   font-size: 1.25rem;
637: }
638: 
639: .footer__titulo {
640:   color: #FFFFFF;
641:   font-size: 1rem;
642:   margin-bottom: var(--espacio-xs);
643: }
644: 
645: .footer__texto,
646: .footer__link {
647:   font-size: 0.875rem;
648:   opacity: 0.75;
649: }
650: 
651: .footer__link {
652:   text-decoration: none;
653:   color: var(--color-claro);
654: }
655: 
656: .footer__link:hover {
657:   opacity: 1;
658:   color: #FFFFFF;
659: }
660: 
661: .footer__link--icono {
662:   display: flex;
663:   align-items: center;
664:   gap: var(--espacio-xs);
665:   opacity: 1;
666: }
667: 
668: .footer__icono {
669:   flex-shrink: 0;
670: }
671: 
672: .footer__copyright {
673:   color: var(--color-claro);
674:   font-size: 0.875rem;
675:   opacity: 0.75;
676: }
677: 
678: /* ---------- Botón volver arriba ---------- */
679: .boton-subir {
680:   position: fixed;
681:   bottom: 2rem;
682:   right: 2rem;
683:   width: 40px;
684:   height: 40px;
685:   border-radius: 50%;
686:   background-color: var(--color-acento);
687:   display: flex;
688:   align-items: center;
689:   justify-content: center;
690:   color: #FFFFFF;
691:   text-decoration: none;
692: }
693: 
694: .icono-flecha-arriba {
695:   font-size: 1.1rem;
696:   line-height: 1;
697:   color: #FFFFFF;
698: }`;

// Remove line numbers
const cleanCss = raw.replace(/^\d+:\s/gm, '');

// Save to styles.css
fs.writeFileSync(stylesCssPath, cleanCss, 'utf8');

// Now run the layout update logic to reapply the .container and grid adjustments
let css = cleanCss;

// Add .container
css = css.replace(
  /\/\* ==============================================================\r?\n   4\. LAYOUT MACRO/g,
  `/* ==============================================================
   4. LAYOUT MACRO — MOBILE FIRST (default: 1 columna, min 375px)
   ============================================================== */

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--espacio-sm);
}

@media (min-width: 1280px) {
  .container {
    padding: 0 var(--espacio-lg);
  }
}

/*`
);

// Update .main
css = css.replace(
  /\.main \{\s*display: grid;\s*grid-template-columns: 1fr;\s*gap: var\(--espacio-lg\);\s*padding: 0 var\(--espacio-sm\);\s*\}/g,
  `.main {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: var(--espacio-lg);\n}`
);
css = css.replace(
  /\.main \{\s*padding: 0 var\(--espacio-lg\);\s*\}/g,
  `.main {\n    /* padding delegado a .container */\n  }`
);

// Update novedades__carrusel
css = css.replace(
  /\.novedades__carrusel \{\s*display: grid;\s*grid-template-columns: 1fr;\s*gap: var\(--espacio-sm\);\s*\}/g,
  `.novedades__carrusel {\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr;\n}`
);

// Update tarjeta-noticia
css = css.replace(
  /\.tarjeta-noticia__contenido \{\s*position: absolute;\s*bottom: 3rem;\s*left: 2rem;\s*max-width: 85%; \/\* mobile: ocupa más ancho para no recortar el texto \*\/\s*\}/g,
  `.tarjeta-noticia__container {\n  display: flex;\n  align-items: flex-end;\n  height: 100%;\n  padding-bottom: 3rem;\n}\n\n.tarjeta-noticia__contenido {\n  position: relative;\n  max-width: 85%;\n}`
);

// Update controles
css = css.replace(
  /\.carrusel__indicadores \{\s*position: absolute;\s*bottom: 1\.5rem;\s*left: 50%;\s*transform: translateX\(-50%\);\s*display: flex;\s*gap: 8px;\s*\}/g,
  `.carrusel__controles-wrapper {\n  position: absolute;\n  bottom: 1.5rem;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 100%;\n  height: 40px;\n  pointer-events: none;\n}\n\n.carrusel__indicadores {\n  position: absolute;\n  bottom: 15px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  gap: 8px;\n  pointer-events: auto;\n}`
);

css = css.replace(
  /\.carrusel__flecha \{\s*position: absolute;\s*bottom: 1\.5rem;\s*right: 2rem;\s*width: 40px;\s*height: 40px;\s*border-radius: 50%;\s*background-color: var\(--color-acento\);\s*color: #FFFFFF;\s*border: none;\s*display: flex;\s*align-items: center;\s*justify-content: center;\s*cursor: pointer;\s*\}/g,
  `.carrusel__flecha {\n  position: absolute;\n  bottom: 0;\n  right: var(--espacio-sm);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: var(--color-acento);\n  color: #FFFFFF;\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  pointer-events: auto;\n}\n\n@media (min-width: 1280px) {\n  .carrusel__flecha {\n    right: var(--espacio-lg);\n  }\n}`
);

// New changes based on latest feedback
// 1. body background and color
css = css.replace(
  /body \{\s*background-color: #FFFFFF;\s*color: var\(--color-oscuro\);\s*\}/g,
  `body {\n  background-color: #000000;\n  color: #FFFFFF;\n}`
);

// 2. hero min-height 100vh
css = css.replace(
  /\.hero \{\s*display: grid;\s*grid-template-columns: 1fr;\s*padding: var\(--espacio-md\) 0;\s*\}/g,
  `.hero {\n  display: flex;\n  align-items: center;\n  min-height: 100vh;\n  padding: var(--espacio-md) 0;\n}`
);

fs.writeFileSync(stylesCssPath, css, 'utf8');

console.log('Restore and update complete.');
