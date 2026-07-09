/* ==========================================================================
   RF & Telecommunications Engineering Portfolio — stylesheet
   Design system: chaptered black/white marketing system. Black "chapters"
   (hero, footer) bracket a paper-white body; a single saturated accent
   (signal-cyan) carries all emphasis; 2px radius everywhere; hairline
   borders; corner-square marks every reusable card.
   ========================================================================== */

:root {
  --ink:            #0A0A0A;
  --body-txt:       #1A1A1A;
  --mute:           #6B6B6B;
  --ash:            #9A9A9A;

  --canvas:         #FFFFFF;
  --surface-soft:   #F5F5F5;
  --surface-dark:   #0A0A0A;
  --surface-elev:   #17191A;

  --hairline:       #D8D8D8;
  --hairline-strong:#4A4A4A;

  --on-dark:        #FFFFFF;
  --on-dark-mute:   rgba(255,255,255,0.68);

  --accent:         #2FC1D1;
  --accent-deep:    #157985;
  --on-accent:      #06181A;

  --line-accent:    #4A5A5E;

  --status-progress: var(--accent-deep);
  --status-planned:  var(--ash);

  --f-display: 'Inter', Arial, sans-serif;
  --f-body:    'Inter', Arial, sans-serif;
  --f-mono:    'JetBrains Mono', ui-monospace, monospace;

  --maxw: 1240px;
  --gutter: clamp(20px, 5vw, 48px);
  --radius: 2px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
}

body {
  margin: 0;
  background: var(--canvas);
  color: var(--body-txt);
  font-family: var(--f-body);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
a:hover { color: var(--accent-deep); }
a:focus-visible, button:focus-visible, [tabindex]:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
::selection { background: var(--accent); color: var(--on-accent); }

h1, h2, h3, h4 { font-family: var(--f-display); font-weight: 700; letter-spacing: 0; margin: 0; color: var(--ink); }
p { margin: 0 0 1em; color: var(--body-txt); }
p:last-child { margin-bottom: 0; }
.mono { font-family: var(--f-mono); }

.wrap { max-width: var(--maxw); margin: 0 auto; padding-left: var(--gutter); padding-right: var(--gutter); position: relative; z-index: 1; }

section { padding: clamp(48px, 7vw, 88px) 0; background: var(--canvas); }
section + section { border-top: 1px solid var(--hairline); }

.dark-chapter, .dark-chapter + section { border-top: none; }
.dark-chapter { background: var(--surface-dark); color: var(--on-dark); }
.dark-chapter p { color: var(--on-dark-mute); }
.dark-chapter h1, .dark-chapter h2, .dark-chapter h3, .dark-chapter h4 { color: var(--on-dark); }

.eyebrow {
  display: inline-flex; align-items: center; gap: 0.6em;
  font-family: var(--f-mono);
  font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--accent-deep);
  margin-bottom: 14px;
}
.dark-chapter .eyebrow { color: var(--accent); }
.eyebrow::before { content: ""; width: 6px; height: 6px; background: currentColor; }

.section-head { max-width: 640px; margin-bottom: 44px; }
.section-head h2 { font-size: clamp(1.6rem, 3vw, 2.1rem); line-height: 1.25; margin-bottom: 12px; }
.section-head p { font-size: 1rem; color: var(--mute); }

.corner-sq-host { position: relative; }
.corner-sq-host::before {
  content: ""; position: absolute; top: -1px; left: -1px;
  width: 10px; height: 10px; background: var(--accent); z-index: 2;
}

.nav { position: sticky; top: 0; z-index: 40; background: var(--surface-dark); border-bottom: 1px solid var(--hairline-strong); }
.nav .wrap { display: flex; align-items: center; justify-content: space-between; height: 60px; }
.nav-id { font-family: var(--f-mono); font-size: 0.85rem; color: var(--on-dark); letter-spacing: 0.02em; }
.nav-id b { color: var(--accent); font-weight: 700; }
.nav-links { display: flex; gap: 26px; font-family: var(--f-body); font-weight: 700; font-size: 0.85rem; }
.nav-links a { color: var(--on-dark-mute); }
.nav-links a:hover { color: var(--accent); }

.nav-toggle { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 32px; height: 32px; background: none; border: none; cursor: pointer; padding: 0; }
.nav-toggle span { display: block; width: 100%; height: 1.5px; background: var(--on-dark-mute); transition: transform 0.2s ease, opacity 0.2s ease; }
.nav-toggle[aria-expanded="true"] span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.nav-toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.nav-toggle[aria-expanded="true"] span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

@media (max-width: 720px) {
  .nav-toggle { display: flex; }
  .nav-links {
    display: flex; flex-direction: column;
    position: absolute; top: 60px; left: 0; right: 0;
    background: var(--surface-dark);
    border-bottom: 1px solid var(--hairline-strong);
    padding: 8px var(--gutter) 18px; gap: 4px;
    max-height: 0; overflow: hidden;
    transition: max-height 0.25s ease;
  }
  .nav-links.is-open { max-height: 320px; }
  .nav-links a { padding: 10px 0; border-bottom: 1px solid var(--hairline-strong); }
}

.btn {
  font-family: var(--f-body); font-weight: 700; font-size: 0.9rem;
  padding: 11px 22px; border-radius: var(--radius);
  border: 2px solid var(--hairline-strong);
  color: var(--on-dark);
  display: inline-flex; align-items: center; gap: 8px;
  transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;
}
.dark-chapter .btn { border-color: var(--on-dark); color: var(--on-dark); }
.dark-chapter .btn:hover { background: var(--on-dark); color: var(--ink); }
.btn-primary { background: var(--accent); color: var(--on-accent); border-color: var(--accent); }
.btn-primary:hover { background: var(--accent-deep); border-color: var(--accent-deep); color: var(--on-dark); }

.hero { padding-top: clamp(56px, 9vw, 104px); padding-bottom: clamp(48px,7vw,80px); overflow: hidden; position: relative; }
.hero .wrap { display: grid; gap: 28px; grid-template-columns: minmax(0,640px) 1fr; align-items: start; }
.hero-copy { grid-column: 1; }
@media (max-width: 980px) { .hero .wrap { grid-template-columns: 1fr; } }

.hero-eyebrow { font-family: var(--f-mono); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 18px; }
.hero h1 { font-size: clamp(2rem, 4.6vw, 3.2rem); line-height: 1.2; max-width: 16ch; color: var(--on-dark); }
.hero h1 em { font-style: normal; color: var(--accent); }
.hero-sub { font-size: clamp(1rem, 1.5vw, 1.15rem); max-width: 54ch; color: var(--on-dark-mute); margin: 20px 0 28px; }
.hero-cta { display: flex; gap: 14px; flex-wrap: wrap; }

.scope {
  margin-top: 20px;
  position: absolute; top: 0; right: 0; bottom: 0; width: 52vw;
  border-left: 1px solid var(--hairline-strong);
  overflow: hidden; display: flex; flex-direction: column;
}
@media (max-width: 980px) { .scope { position: relative; width: auto; border-left: none; border-top: 1px solid var(--hairline-strong); } }

.scope-head { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-bottom: 1px solid var(--hairline-strong); font-family: var(--f-mono); font-size: 0.7rem; font-weight: 700; color: var(--on-dark-mute); letter-spacing: 0.06em; text-transform: uppercase; }
.scope-head .live { color: var(--on-dark); display: inline-flex; align-items: center; gap: 6px; }
.scope-head .live::before { content: ""; width: 6px; height: 6px; background: var(--accent); }
.scope svg { display: block; width: 100%; height: auto; }
.scope-trace { fill: none; stroke: var(--accent); stroke-width: 1.6; }
.scope-fill { fill: url(#traceFill); opacity: 0.35; }
.scope-grid line { stroke: var(--hairline-strong); stroke-width: 1; opacity: 0.5; }
.scope-sweep { stroke: var(--on-dark); stroke-width: 1; opacity: 0.4; }
.scope-marker circle { fill: var(--surface-dark); stroke: var(--accent); stroke-width: 1.6; }
.scope-marker text { font-family: var(--f-mono); font-size: 10px; fill: var(--on-dark-mute); }
.scope-marker .freq { fill: var(--on-dark); font-weight: 700; }
.sweep-line { animation: sweep 7s linear infinite; }
@media (prefers-reduced-motion: reduce) { .sweep-line { animation: none; opacity: 0; } }
@keyframes sweep { 0% { transform: translateX(0); } 100% { transform: translateX(720px); } }

.about-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
.about-grid h2 { font-size: clamp(1.5rem, 2.6vw, 2rem); margin: 10px 0 14px; max-width: 20ch; }
.stat-strip { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--hairline); border: 1px solid var(--hairline); }
.stat { background: var(--canvas); padding: 20px; }
.stat .n { display: block; font-family: var(--f-mono); font-weight: 700; font-size: clamp(1.3rem, 2.4vw, 1.7rem); color: var(--accent-deep); line-height: 1; margin-bottom: 8px; }
.stat .l { font-size: 0.8rem; color: var(--mute); }
@media (max-width: 820px) { .about-grid { grid-template-columns: 1fr; } .stat-strip { grid-template-columns: repeat(2,1fr); } }

.ruler { display: flex; align-items: center; gap: 14px; margin: 18px 0 26px; }
.ruler-track { position: relative; flex: 1; height: 2px; background: var(--hairline); }
.ruler-track .band { position: absolute; top: -3px; width: 8px; height: 8px; background: var(--canvas); border: 2px solid var(--ash); transform: translateX(-50%); }
.ruler-track .band.here { border-color: var(--accent); background: var(--accent); }
.ruler-label { font-family: var(--f-mono); font-size: 0.72rem; color: var(--mute); white-space: nowrap; }
.ruler-label b { color: var(--accent-deep); font-weight: 700; }

.loop { background: var(--surface-soft); }
.loop-diagram { display: flex; align-items: stretch; gap: 0; margin-top: 40px; }
.loop-node { flex: 1; position: relative; padding: 0 18px; text-align: center; }
.loop-node .ring {
  width: 52px; height: 52px; margin: 0 auto 16px;
  border-radius: 50%; border: 2px solid var(--hairline-strong);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--f-mono); font-weight: 700; font-size: 0.72rem; color: var(--mute);
  background: var(--canvas);
}
.loop-node.is-live .ring { border-color: var(--accent); color: var(--accent-deep); }
.loop-node.is-done .ring { border-color: var(--accent-deep); color: var(--accent-deep); }
.loop-node h4 { font-size: 0.92rem; margin-bottom: 6px; }
.loop-node p { font-size: 0.78rem; color: var(--mute); max-width: 20ch; margin: 0 auto; }
.loop-node .tally { font-family: var(--f-mono); font-size: 0.68rem; color: var(--ash); margin-top: 8px; display: block; }
.loop-connector { flex: 0 0 auto; width: clamp(20px,4vw,56px); align-self: flex-start; margin-top: 26px; height: 1px; background: repeating-linear-gradient(90deg, var(--hairline-strong) 0 6px, transparent 6px 11px); }
@media (max-width: 900px) {
  .loop-diagram { flex-direction: column; }
  .loop-connector { width: 1px; height: 24px; align-self: center; margin: 0; background: repeating-linear-gradient(180deg, var(--hairline-strong) 0 6px, transparent 6px 11px); }
  .loop-node p { max-width: 32ch; }
}

.rack { border: 1px solid var(--hairline); background: var(--canvas); }
.rack-row { display: grid; grid-template-columns: 140px 1fr 180px; gap: 20px; padding: 14px 20px; border-bottom: 1px solid var(--hairline); align-items: baseline; font-size: 0.92rem; }
.rack-row:last-child { border-bottom: none; }
.rack-row .cat { font-family: var(--f-mono); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ash); }
.rack-row .item { color: var(--ink); }
.rack-row .item span { color: var(--mute); }
.rack-row .note { font-family: var(--f-mono); font-size: 0.76rem; color: var(--ash); text-align: right; }
@media (max-width: 720px) { .rack-row { grid-template-columns: 1fr; gap: 4px; } .rack-row .note { text-align: left; } }

.project { padding: 56px 0; }
.project + .project { border-top: 1px solid var(--hairline); }
.project-status { display: inline-flex; align-items: center; gap: 7px; font-family: var(--f-mono); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px 4px 8px; border: 1px solid var(--hairline-strong); color: var(--mute); margin-bottom: 18px; }
.project-status .dot { width: 7px; height: 7px; background: var(--status-planned); }
.project-status.is-progress .dot { background: var(--status-progress); }
.project-status.is-progress { color: var(--accent-deep); border-color: var(--accent-deep); }

.project h3 { font-size: clamp(1.35rem, 2.2vw, 1.7rem); line-height: 1.25; margin-bottom: 14px; max-width: 22ch; }
.project .lede { font-size: 1rem; color: var(--mute); max-width: 62ch; margin-bottom: 8px; }

.spec-list { display: grid; gap: 8px; margin-bottom: 24px; }
.spec-list div { display: grid; grid-template-columns: 130px 1fr; gap: 12px; font-size: 0.88rem; }
.spec-list dt { font-family: var(--f-mono); color: var(--ash); font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.04em; padding-top: 2px; font-weight: 700; }
.spec-list dd { margin: 0; color: var(--body-txt); }
.spec-list dd .mono { color: var(--accent-deep); font-weight: 700; }

.project-links { display: flex; gap: 18px; font-family: var(--f-body); font-weight: 700; font-size: 0.85rem; flex-wrap: wrap; margin-top: 20px; }
.project-links a { color: var(--accent-deep); border-bottom: 2px solid transparent; }
.project-links a:hover { border-color: var(--accent-deep); }

.tr-cad { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; align-items: center; }
@media (max-width: 900px) { .tr-cad { grid-template-columns: 1fr; } }

.media-card { border: 1px solid var(--hairline); overflow: hidden; background: var(--canvas); }
.media-card img { display: block; width: 100%; height: auto; }
.media-card figcaption { padding: 9px 14px; font-family: var(--f-mono); font-size: 0.72rem; color: var(--ash); border-top: 1px solid var(--hairline); display: flex; justify-content: space-between; gap: 10px; }
.media-card figcaption .tag { color: var(--accent-deep); font-weight: 700; }
.media-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 900px) { .media-grid-2 { grid-template-columns: 1fr; } }

.finding { margin-top: 20px; border-left: 3px solid var(--accent); padding: 10px 14px; background: var(--surface-soft); font-size: 0.86rem; color: var(--mute); max-width: 70ch; }
.finding b { color: var(--accent-deep); font-family: var(--f-mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px; }

.trackviz { border: 1px solid var(--hairline); background: var(--canvas); padding: 18px; }
.trackviz svg { width: 100%; height: auto; display: block; }
.track-path { fill: none; stroke: var(--hairline-strong); stroke-width: 1; stroke-dasharray: 3 4; }
.track-sat { offset-path: path("M20,120 C 70,10 210,10 260,120"); animation: fly 5s ease-in-out infinite; }
@keyframes fly { 0% { offset-distance: 0%; } 50% { offset-distance: 100%; } 100% { offset-distance: 0%; } }
.track-beam-group { transform-origin: 140px 132px; animation: aim 5s ease-in-out infinite; }
@keyframes aim { 0% { transform: rotate(-52deg); } 50% { transform: rotate(52deg); } 100% { transform: rotate(-52deg); } }
@media (prefers-reduced-motion: reduce) { .track-sat, .track-beam-group { animation: none; } }
.trackviz-foot { display: flex; justify-content: space-between; font-family: var(--f-mono); font-size: 0.7rem; color: var(--ash); margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--hairline); }
.trackviz-foot b { color: var(--ink); font-weight: 700; }

.smith-wrap { border: 1px solid var(--hairline); background: var(--canvas); padding: 20px; display: grid; grid-template-columns: auto 1fr; gap: 24px; align-items: center; }
.smith-wrap svg { width: 220px; height: 220px; display: block; }
.smith-grid circle, .smith-grid path { fill: none; stroke: var(--hairline); stroke-width: 0.75; }
.smith-axis { stroke: var(--hairline-strong); stroke-width: 1; }
.smith-pt circle { stroke-width: 2; fill: var(--canvas); }
.smith-pt text { font-family: var(--f-mono); font-size: 8.5px; fill: var(--mute); font-weight: 700; }
.smith-legend { display: grid; gap: 10px; font-family: var(--f-mono); font-size: 0.8rem; }
.smith-legend .row { display: flex; align-items: baseline; gap: 10px; }
.smith-legend .sw { width: 9px; height: 9px; flex: none; }
.smith-legend .lbl { color: var(--ink); font-weight: 700; min-width: 66px; }
.smith-legend .val { color: var(--mute); }
.smith-cap { font-family: var(--f-mono); font-size: 0.72rem; color: var(--ash); margin-top: 14px; grid-column: 1 / -1; }
@media (max-width: 640px) { .smith-wrap { grid-template-columns: 1fr; justify-items: center; } }

.vna-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 32px; }
.vna-card { border: 1px solid var(--hairline); background: var(--canvas); overflow: hidden; }
.vna-screen { background: var(--surface-soft); }
.vna-screen img { display: block; width: 100%; height: auto; }
.vna-readout { padding: 14px 16px; font-family: var(--f-mono); }
.vna-readout .name { font-size: 0.92rem; color: var(--ink); margin-bottom: 10px; font-family: var(--f-body); font-weight: 700; }
.vna-readout dl { display: grid; grid-template-columns: 1fr auto; gap: 4px 10px; font-size: 0.78rem; }
.vna-readout dt { color: var(--ash); }
.vna-readout dd { margin: 0; color: var(--accent-deep); text-align: right; font-weight: 700; }
.vna-flag { margin-top: 10px; font-size: 0.74rem; color: var(--mute); border-top: 1px solid var(--hairline); padding-top: 8px; }
@media (max-width: 900px) { .vna-grid { grid-template-columns: 1fr; } }

.pipeline { margin: 36px 0 8px; }
.pipeline svg { width: 100%; height: auto; }
.pipe-line { fill: none; stroke: var(--hairline-strong); stroke-width: 1.5; stroke-dasharray: 5 5; }
.pipe-pulse { fill: var(--accent); }
.pipe-node rect { fill: var(--canvas); stroke: var(--hairline-strong); }
.pipe-node text { font-family: var(--f-mono); fill: var(--mute); font-size: 10.5px; font-weight: 700; }
.pipe-node .sub { fill: var(--ash); font-size: 9px; font-weight: 400; }
.motion-path { offset-path: path("M18,60 L 692,60"); }
.pulse-anim { animation: pulse-travel 3.2s linear infinite; }
@keyframes pulse-travel { 0% { offset-distance: 0%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .pulse-anim { animation: none; opacity: 0; } }

.mesh { margin-top: 32px; border: 1px solid var(--hairline); background: var(--canvas); padding: 20px; }
.mesh svg { width: 100%; height: auto; }
.mesh-link { stroke: var(--hairline-strong); stroke-width: 1.3; stroke-dasharray: 4 4; }
.mesh-node circle { fill: var(--canvas); stroke: var(--accent-deep); stroke-width: 1.5; }
.mesh-node.gateway circle { stroke: var(--ink); }
.mesh-node text { font-family: var(--f-mono); font-size: 9.5px; fill: var(--mute); font-weight: 700; }
.mesh-callout { font-family: var(--f-mono); font-size: 9px; fill: var(--mute); }
.mesh-callout-line { stroke: var(--ash); stroke-width: 1; }

.filmstrip { overflow-x: auto; margin: 0 calc(var(--gutter) * -1); padding: 6px var(--gutter) 20px; scrollbar-width: thin; }
.filmstrip-track { display: flex; gap: 16px; width: max-content; }
.film-card { width: 240px; flex: none; border: 1px solid var(--hairline); background: var(--canvas); overflow: hidden; }
.film-card img { width: 100%; height: 160px; object-fit: contain; background: var(--surface-soft); display: block; }
.film-card .cap { padding: 10px 12px; font-family: var(--f-mono); font-size: 0.7rem; color: var(--ash); display: flex; justify-content: space-between; gap: 8px; border-top: 1px solid var(--hairline); }
.film-card .cap b { color: var(--ink); font-weight: 700; }

.reveal-img { clip-path: inset(0 0 100% 0); transition: clip-path 0.6s cubic-bezier(.2,.8,.2,1); }
.reveal-img.is-visible { clip-path: inset(0 0 0% 0); }
@media (prefers-reduced-motion: reduce) { .reveal-img { clip-path: none; } }

.media-card, .vna-card, .film-card { transition: border-color 0.15s ease; }
.media-card:hover, .vna-card:hover, .film-card:hover { border-color: var(--accent-deep); }

.bench { background: var(--surface-soft); }
.bench-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--hairline); border: 1px solid var(--hairline); }
.bench-card { background: var(--canvas); padding: 24px 22px; }
.bench-card .src { font-family: var(--f-mono); font-size: 0.68rem; font-weight: 700; color: var(--accent-deep); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; display: block; }
.bench-card p { font-size: 0.9rem; color: var(--mute); }
.bench-card p:first-of-type { color: var(--ink); }
@media (max-width: 900px) { .bench-grid { grid-template-columns: 1fr; } }

.signoff { text-align: center; padding: 40px 0; }
.signoff-wave { width: 100%; max-width: 500px; height: 50px; }
.signoff-wave path { fill: none; stroke: var(--accent-deep); stroke-width: 1.5; }
.signoff-label { display: block; margin-top: 6px; font-size: 0.74rem; color: var(--ash); letter-spacing: 0.06em; font-family: var(--f-mono); }

.contact-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 28px; }
footer { padding: 28px 0; font-family: var(--f-mono); font-size: 0.76rem; color: var(--on-dark-mute); border-top: 1px solid var(--hairline-strong); }
footer .wrap { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; }

.reveal { opacity: 0; transform: translateY(12px); transition: opacity 0.4s ease, transform 0.4s ease; }
.reveal.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }
