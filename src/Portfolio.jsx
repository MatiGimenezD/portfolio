import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Copy, Check, GithubLogo, LinkedinLogo, CaretRight, CaretDown } from "@phosphor-icons/react";
import { resolveAsset, hobbyProjects, certifications } from "./App.jsx";

const { div: MotionDiv, span: MotionSpan } = motion;

const EMAIL = "matiasgimenez452@gmail.com";
const GITHUB = "https://github.com/MatiGimenezD";
const LINKEDIN = "https://www.linkedin.com/in/matias-gimenez-1a7a172bb/";

// Apple-like easing: quick start, long gentle settle
const EASE = [0.16, 1, 0.3, 1];

// Lab experiments, each opened as an app window on the lab monitor (links come from the shared data)
const labLinks = (name) => hobbyProjects.find((p) => p.name === name)?.links ?? [];

const labApps = [
  {
    id: "dino",
    name: "El dinosaurio que aprende solo",
    kind: "Inteligencia artificial",
    appName: "Juego del Dino",
    windowTitle: "Juego del Dino — generación 0",
    icon: "🦖",
    color: "#f2f2f2",
    image: "/dino.webp",
    alt: "Simulación del juego del dinosaurio de Google con una red neuronal",
    description: "Una inteligencia artificial que aprende a jugar al dinosaurio de Google por prueba y error, mejorando generación tras generación.",
    links: labLinks("DinoGoogle RedNeuronal").map((l) => ({ ...l, label: "Ver el código" })),
  },
  {
    id: "snake",
    name: "Una serpiente que come puntos",
    kind: "Inteligencia artificial",
    appName: "Snake AI",
    windowTitle: "Snake AI",
    icon: "🐍",
    color: "#2f9e44",
    image: "/snake.webp",
    alt: "Juego de la serpiente controlado por una red neuronal",
    description: "El clásico juego de la serpiente, pero la que juega es una inteligencia artificial: busca el camino más corto hasta cada punto sin chocarse. Esta es una versión en vivo.",
    links: labLinks("Snake Game AI").map((l) => ({ ...l, label: "Ver el código" })),
  },
  {
    id: "diabot",
    name: "El bot que mide la inflación",
    kind: "Automatización",
    appName: "X",
    windowTitle: "DiaBot (@BotSupermercado) — X",
    icon: "𝕏",
    color: "#000000",
    image: "/diabot1.webp",
    alt: "Perfil del bot DiaBot en X",
    description: "Todos los días revisa los precios de un supermercado, compara con el día anterior y publica en X cuánto subieron.",
    links: labLinks("Bot Inflación Día a Día").map((l) => ({ ...l, label: "Ver la cuenta en X" })),
  },
  {
    id: "siu",
    name: "Tu promedio, al instante",
    kind: "Extensión para Chrome",
    appName: "Chrome",
    windowTitle: "SIU Guaraní — Historia académica",
    icon: "🎓",
    color: "#2563eb",
    image: "/siuguarani.webp",
    alt: "Extensión que muestra el promedio en el SIU Guaraní",
    description: "Una extensión que calcula el promedio de la carrera dentro del SIU Guaraní, algo que el sistema de la universidad no hace solo.",
    links: labLinks("SIU Guaraní - Extensión").map((l) => ({ ...l, label: l.label === "GitHub" ? "Ver el código" : "Instalar en Chrome" })),
  },
  {
    id: "muebles",
    name: "Muebles que se dibujan solos",
    kind: "Automatización en SketchUp",
    appName: "SketchUp",
    windowTitle: "SketchUp — Módulo 4 puertas",
    icon: "📐",
    color: "#c2410c",
    image: "/muebles-parametrizados.webp",
    alt: "Bajo mesada de 4 puertas con su panel de parámetros en SketchUp y un placard terminado",
    position: "object-center",
    description: "Cambiás una medida y el mueble se recalcula entero: piezas, herrajes y planos de corte, sin dibujar todo de nuevo.",
    links: [],
  },
];

// Projects shown as browser tabs on the hero notebook, in scroll order
const browserTabs = [
  {
    id: "simplebuy",
    name: "SimpleBuy",
    kind: "E-commerce para comercios locales",
    address: "simplebuy.com.ar/admin/productos",
    image: "/simplebuy-admin.webp",
    alt: "Panel de administración de SimpleBuy con la gestión de productos",
    color: "#f97316",
    stack: ["Node.js", "Express", "MySQL", "REST", "JWT"],
    url: "https://simplebuy.com.ar/home",
    cta: "Visitar simplebuy.com.ar",
  },
  {
    id: "citax",
    name: "Citax",
    kind: "Turnos inteligentes con IA",
    address: "citax.com.ar",
    image: "/citax-landing.webp",
    alt: "Landing de Citax con la agenda y el bot de WhatsApp",
    color: "#1e3a8a",
    stack: ["Node.js", "Express", "MongoDB", "WhatsApp API", "OpenAI"],
    url: "https://www.citax.com.ar/",
    cta: "Visitar citax.com.ar",
  },
  {
    id: "willitrain",
    name: "Will it Rain?",
    kind: "NASA Space Apps Challenge",
    address: "willitrain · nasa space apps",
    image: "/willitrain-app.webp",
    alt: "Interfaz de Will it Rain con la probabilidad de lluvia sobre un mapa satelital",
    color: "#3d8bff",
    stack: ["NASA GPM", "Geolocalización", "Node.js", "JavaScript"],
    url: "https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/will-it-rain/",
    cta: "Ver el proyecto en la NASA",
  },
  {
    id: "club",
    name: "Club Judicial VM",
    kind: "Portal institucional y reservas",
    address: "clubjudicialvm.com.ar/home",
    image: "/clubjudicial-home.webp",
    alt: "Inicio del portal del Club Judicial VM",
    color: "#b8932a",
    stack: ["JavaScript", "HTML / CSS", "Web Performance"],
    url: "https://clubjudicialvm.com.ar/",
    cta: "Visitar clubjudicialvm.com.ar",
  },
  {
    id: "ctmi",
    name: "CTMI S.A.S.",
    kind: "Sitio para cliente · Industrial",
    address: "ctmi.com.ar",
    image: "/ctmi-home.webp",
    alt: "Inicio del sitio de CTMI",
    color: "#ea580c",
    stack: ["React", "Vite", "Diseño a medida"],
    url: "https://www.ctmi.com.ar/",
    cta: "Visitar ctmi.com.ar",
  },
  {
    id: "consultora",
    name: "Puerta de Augusta",
    kind: "Sitio para cliente · Consultoría",
    address: "consultorapuertadeaugusta.com.ar",
    image: "/consultora-home.webp",
    alt: "Inicio del sitio de Consultora Puerta de Augusta",
    color: "#111827",
    stack: ["React", "Vite", "Diseño a medida"],
    url: "https://www.consultorapuertadeaugusta.com.ar/",
    cta: "Visitar el sitio",
  },
];

const nav = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#laboratorio", label: "Laboratorio" },
  { href: "#contacto", label: "Contacto" },
];

function FadeUp({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <MotionDiv
      className={className}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </MotionDiv>
  );
}


// Scroll to the step of a pinned sequence (progress window start..end split in n equal steps)
function jumpToStep(section, start, end, i, n) {
  if (!section) return;
  const top = section.getBoundingClientRect().top + window.scrollY;
  const range = section.offsetHeight - window.innerHeight;
  const progress = start + ((i + 0.5) / n) * (end - start);
  window.scrollTo({ top: top + progress * range, behavior: "smooth" });
}

function StepDots({ count, active, onSelect, label }) {
  return (
    <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`${label} ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-[7px] rounded-full cursor-pointer transition-all duration-300 ${i === active ? "w-6 bg-[var(--text-primary)]" : "w-[7px] bg-[var(--text-secondary)]/40 hover:bg-[var(--text-secondary)]"}`}
        />
      ))}
    </div>
  );
}

/* ─── Snake that eats dots: tiny autoplayer on a canvas (BFS to the nearest dot, falls back to chasing its tail) ─── */
const SNAKE_COLS = 28;
const SNAKE_ROWS = 16;
const SNAKE_CELL = 24;
const SNAKE_STEP_MS = 120;
const SNAKE_MAX_LEN = 12;
const SNAKE_DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function SnakeGame({ playing }) {
  const canvasRef = useRef(null);
  const game = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const key = (x, y) => y * SNAKE_COLS + x;
    const inside = (x, y) => x >= 0 && y >= 0 && x < SNAKE_COLS && y < SNAKE_ROWS;

    const spawnDots = (g) => {
      while (g.dots.length < 5) {
        const x = Math.floor(Math.random() * SNAKE_COLS);
        const y = Math.floor(Math.random() * SNAKE_ROWS);
        if (!g.body.some((c) => c.x === x && c.y === y) && !g.dots.some((c) => c.x === x && c.y === y)) g.dots.push({ x, y });
      }
    };
    const reset = () => {
      const g = {
        body: [{ x: 6, y: 8 }, { x: 5, y: 8 }, { x: 4, y: 8 }],
        prev: [{ x: 6, y: 8 }, { x: 5, y: 8 }, { x: 4, y: 8 }],
        dots: [],
        grow: 0,
        acc: 0,
        last: 0,
      };
      spawnDots(g);
      return g;
    };
    if (!game.current) game.current = reset();

    // First step of the shortest path to any cell in `goals`, avoiding the body
    const bfs = (g, goals) => {
      const blocked = new Set(g.body.slice(0, -1).map((c) => key(c.x, c.y)));
      const target = new Set(goals.map((c) => key(c.x, c.y)));
      const head = g.body[0];
      const first = new Map([[key(head.x, head.y), null]]);
      const queue = [head];
      for (let qi = 0; qi < queue.length; qi++) {
        const c = queue[qi];
        for (const [dx, dy] of SNAKE_DIRS) {
          const nx = c.x + dx;
          const ny = c.y + dy;
          const k = key(nx, ny);
          if (!inside(nx, ny) || blocked.has(k) || first.has(k)) continue;
          first.set(k, first.get(key(c.x, c.y)) || { x: nx, y: ny });
          if (target.has(k)) return first.get(k);
          queue.push({ x: nx, y: ny });
        }
      }
      return null;
    };

    const step = () => {
      const g = game.current;
      let next = bfs(g, g.dots) || bfs(g, [g.body[g.body.length - 1]]);
      if (!next) {
        game.current = reset();
        return;
      }
      g.prev = g.body;
      const body = [next, ...g.body];
      const eaten = g.dots.findIndex((d) => d.x === next.x && d.y === next.y);
      if (eaten >= 0) {
        g.dots.splice(eaten, 1);
        if (body.length < SNAKE_MAX_LEN) g.grow += 1;
        spawnDots(g);
      }
      if (g.grow > 0) g.grow -= 1;
      else body.pop();
      g.body = body;
    };

    const draw = (t) => {
      const g = game.current;
      const S = SNAKE_CELL;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0d1014";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // faint dot grid
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      for (let y = 0; y < SNAKE_ROWS; y++)
        for (let x = 0; x < SNAKE_COLS; x++) {
          ctx.beginPath();
          ctx.arc((x + 0.5) * S, (y + 0.5) * S, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      // dots to eat, gently pulsing
      const pulse = 1 + 0.12 * Math.sin(performance.now() / 260);
      for (const d of g.dots) {
        ctx.fillStyle = "rgba(255,196,87,0.18)";
        ctx.beginPath();
        ctx.arc((d.x + 0.5) * S, (d.y + 0.5) * S, S * 0.34 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffc457";
        ctx.beginPath();
        ctx.arc((d.x + 0.5) * S, (d.y + 0.5) * S, S * 0.17, 0, Math.PI * 2);
        ctx.fill();
      }
      // snake as one smooth rounded line, interpolated between steps
      const pts = g.body.map((c, k) => {
        const o = g.prev[Math.min(k, g.prev.length - 1)];
        return { x: (o.x + (c.x - o.x) * t + 0.5) * S, y: (o.y + (c.y - o.y) * t + 0.5) * S };
      });
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[pts.length - 1].x, pts[pts.length - 1].y);
      grad.addColorStop(0, "#5eead4");
      grad.addColorStop(1, "#10b981");
      ctx.strokeStyle = grad;
      ctx.lineWidth = S * 0.62;
      ctx.beginPath();
      pts.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.stroke();
      // eyes
      const h = pts[0];
      const dir = { x: g.body[0].x - g.body[1].x, y: g.body[0].y - g.body[1].y };
      ctx.fillStyle = "#0d1014";
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.arc(h.x + dir.x * S * 0.12 - dir.y * side * S * 0.15, h.y + dir.y * S * 0.12 + dir.x * side * S * 0.15, S * 0.065, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw(1);
    if (!playing) return undefined;

    let raf;
    const loop = (now) => {
      const g = game.current;
      if (!g.last) g.last = now;
      g.acc += now - g.last;
      g.last = now;
      if (g.acc > SNAKE_STEP_MS * 4) g.acc = 0;
      while (game.current.acc >= SNAKE_STEP_MS) {
        game.current.acc -= SNAKE_STEP_MS;
        step();
      }
      draw(game.current.acc / SNAKE_STEP_MS);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      if (game.current) game.current.last = 0;
    };
  }, [playing]);

  return (
    <canvas
      ref={canvasRef}
      width={SNAKE_COLS * SNAKE_CELL}
      height={SNAKE_ROWS * SNAKE_CELL}
      role="img"
      aria-label="Una serpiente minimalista que se mueve sola comiendo puntos"
      className="block w-full h-[92%] object-cover"
    />
  );
}


/* ─── Boot: preload what the first screen shows, drive the #boot bar in index.html, then fade it out ─── */
const HERO_ASSETS = [...browserTabs.map((t) => t.image), "/simplebuy-galponcito.webp"];
const LAB_ASSETS = [...labApps.filter((a) => a.id !== "snake").map((a) => a.image), "/diabot.webp"];
const BOOT_MIN_MS = 1500;
const BOOT_MAX_MS = 6000;

const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => (img.decode ? img.decode().catch(() => {}).then(resolve) : resolve());
    img.src = resolveAsset(src);
  });

function useBoot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const boot = document.getElementById("boot");
    const bar = boot?.querySelector(".boot-bar");
    const pct = boot?.querySelector(".boot-pct");
    const root = document.documentElement;
    const start = performance.now();
    let done = false;
    let raf;
    let loaded = 0;
    let shown = 0;
    const tasks = [...HERO_ASSETS.map(preloadImage), document.fonts?.ready ?? Promise.resolve()];
    tasks.forEach((t) => t.then(() => (loaded += 1)));
    root.style.overflow = "hidden";

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      if (pct) pct.textContent = "100%";
      root.style.overflow = "";
      boot?.classList.add("done");
      setTimeout(() => boot?.remove(), 800);
      setReady(true);
      // Warm the lab images while the visitor is still on the hero
      const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 300));
      idle(() => LAB_ASSETS.forEach(preloadImage));
    };

    // Progress = real loading, capped by time so cached loads still play the intro. The bar only gets a new target
    // a few times per second and its CSS transition (GPU) does the smoothing; the % text is written only when it changes.
    let goal = 0;
    let lastPct = -1;
    const update = () => {
      goal = Math.min(loaded / tasks.length, (performance.now() - start) / BOOT_MIN_MS);
      if (bar) bar.style.transform = `scaleX(${0.04 + 0.96 * goal})`;
      if (goal >= 1) {
        clearInterval(timer);
        setTimeout(finish, 650);
      }
    };
    const timer = setInterval(update, 200);
    tasks.forEach((t) => t.then(update));

    const tick = () => {
      shown += (goal - shown) * 0.08;
      const value = Math.round(shown * 100);
      if (value !== lastPct && pct) pct.textContent = `${(lastPct = value)}%`;
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const fallback = setTimeout(finish, BOOT_MAX_MS);
    return () => {
      done = true;
      cancelAnimationFrame(raf);
      clearInterval(timer);
      clearTimeout(fallback);
    };
  }, []);

  return ready;
}

/* ─── Hero devices: a notebook whose lid opens with scroll, and a phone in front ─── */
function Notebook({ lid, screenOff, closed, children, className = "" }) {
  return (
    // Eye level with the hinge: at -90° the lid is edge-on (fully closed, no gap) and it always opens upwards
    <div className={className} style={{ perspective: "3200px", perspectiveOrigin: "50% 100%" }}>
      <MotionDiv
        style={{ rotateX: lid, transformOrigin: "50% 100%" }}
        className="relative z-10 rounded-t-[2.2%_3.8%] bg-[#0d0d0e] p-[1.6%] pb-[2.4%] ring-1 ring-white/20"
      >
        <span className="absolute top-[0.55%] left-1/2 -translate-x-1/2 w-[0.6%] aspect-square rounded-full bg-[#2b2b2e]" />
        <div className="relative overflow-hidden rounded-[0.4%] aspect-[1669/945] bg-white">
          {children}
          {/* Screen stays dark until the lid is almost open */}
          <MotionDiv style={{ opacity: screenOff }} className="absolute inset-0 bg-[#0d0d0e] z-40" />
        </div>
      </MotionDiv>
      {/* Closed state: the lid's aluminium edge resting on the base, with the screen's light leaking through the seam */}
      <MotionDiv style={{ opacity: closed }} className="relative z-20 h-0 pointer-events-none" aria-hidden="true">
        <span className="notebook-closed-lid" />
        <span className="notebook-glow" />
      </MotionDiv>
      {/* Aluminium base, wider than the lid, with the opening notch */}
      <div className="relative z-0 -mx-[7%] h-[clamp(7px,1.3vw,16px)] rounded-b-[50%_100%] bg-gradient-to-b from-[#e3e3e6] via-[#b9b9bd] to-[#7d7d82] shadow-[0_30px_50px_-18px_rgba(0,0,0,0.55)]">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[14%] h-[45%] rounded-b-[8px] bg-[#9c9ca1]" />
      </div>
    </div>
  );
}

/* Browser window on the notebook screen: one tab per project, a cursor that clicks the active one */
function BrowserScreen({ active, onSelect }) {
  const n = browserTabs.length;
  const tab = browserTabs[active];
  return (
    <div className="absolute inset-0 flex flex-col text-[clamp(6px,0.78vw,11px)] leading-none select-none">
      {/* Tab strip */}
      <div className="relative flex items-end gap-[0.4%] bg-[#dfe1e5] pt-[0.9%] px-[0.8%]">
        <div className="flex items-center gap-[0.45em] pr-[1.2%] pb-[0.9%] self-center">
          <span className="w-[0.85em] h-[0.85em] rounded-full bg-[#ff5f57]" />
          <span className="w-[0.85em] h-[0.85em] rounded-full bg-[#febc2e]" />
          <span className="w-[0.85em] h-[0.85em] rounded-full bg-[#28c840]" />
        </div>
        <div className="relative flex flex-1 min-w-0 gap-[0.4%]">
          {browserTabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Ver ${t.name}`}
              onClick={() => onSelect?.(i)}
              className={`flex-1 min-w-0 flex items-center gap-[0.5em] px-[0.8em] py-[0.75em] rounded-t-[0.7em] transition-colors duration-300 cursor-pointer text-left ${
                i === active ? "bg-white text-[#1f1f1f]" : "text-[#5f6368] hover:bg-white/50"
              }`}
            >
              <span
                className="shrink-0 w-[1.3em] h-[1.3em] rounded-[0.3em] grid place-items-center text-white font-bold text-[0.8em]"
                style={{ background: t.color }}
              >
                {t.name[0]}
              </span>
              <span className="truncate font-medium hidden sm:inline">{t.name}</span>
            </button>
          ))}
          {/* Cursor travels to the active tab and taps it */}
          <MotionDiv
            className="absolute top-[55%] z-30 pointer-events-none"
            animate={{ left: `${((active + 0.62) / n) * 100}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
          >
            <MotionSpan
              key={active}
              className="absolute -left-[0.9em] -top-[0.9em] w-[1.8em] h-[1.8em] rounded-full bg-[#2997ff]/40"
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            />
            <svg viewBox="0 0 16 22" className="relative w-[1.6em] h-[2.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              <path d="M1 1 L1 17 L5 13 L8 20 L11 19 L8 12 L14 12 Z" fill="#111" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </MotionDiv>
        </div>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-[1em] bg-white px-[1.2%] py-[0.6%] border-b border-[#e5e5e5]">
        <span className="text-[#9aa0a6] tracking-[0.3em]">‹ ›</span>
        <div className="flex-1 flex items-center gap-[0.6em] rounded-full bg-[#f1f3f4] px-[1em] py-[0.55em] text-[#3c4043] min-w-0">
          <svg viewBox="0 0 12 14" className="w-[0.8em] h-[0.95em] shrink-0" fill="#5f6368">
            <path d="M3 6V4a3 3 0 0 1 6 0v2h1v8H2V6h1zm1.5 0h3V4a1.5 1.5 0 0 0-3 0v2z" />
          </svg>
          <span className="truncate">{tab.address}</span>
        </div>
      </div>

      {/* Page */}
      <div className="relative flex-1 overflow-hidden bg-white">
        {browserTabs.map((t, i) => (
          <img
            key={t.id}
            src={resolveAsset(t.image)}
            alt={t.alt}
            loading="eager"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover object-top transition-[opacity,transform] duration-500 ease-out ${
              i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.015]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PhoneFrame({ src, alt, style, className = "" }) {
  return (
    <MotionDiv
      style={style}
      className={`rounded-[16%/7.6%] p-[0.7%] bg-gradient-to-br from-[#d9d9de] via-[#8a8a8f] to-[#cfcfd4] shadow-[0_40px_60px_-24px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="rounded-[15.4%/7.3%] bg-black p-[2.2%]">
        <div className="relative aspect-[923/2000] overflow-hidden rounded-[12.5%/5.8%]">
          <img src={resolveAsset(src)} alt={alt} loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
          <span className="absolute top-[1.4%] left-1/2 -translate-x-1/2 w-[30%] h-[2.4%] rounded-full bg-black" />
        </div>
      </div>
    </MotionDiv>
  );
}

/* ─── Hero: name first; scrolling opens the notebook, then each scroll step switches the browser tab ─── */
const TABS_START = 0.2;
const TABS_END = 0.97;

function Hero({ ready }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Spring smooths the raw scroll so the sequence feels fluid instead of tied to the wheel
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.6 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const step = Math.floor(((v - TABS_START) / (TABS_END - TABS_START)) * browserTabs.length);
    const next = Math.min(browserTabs.length - 1, Math.max(0, step));
    setActive((prev) => (prev === next ? prev : next));
  });

  // Opening fits in the first fifth: title leaves, notebook rises and opens, phone docks, caption lands
  const titleOpacity = useTransform(p, [0, 0.08], [1, 0]);
  const titlePointer = useTransform(p, (v) => (v < 0.04 ? "auto" : "none"));
  const titleY = useTransform(p, [0, 0.1], [0, -90]);
  const stageY = useTransform(p, [0, 0.14], ["20vh", "0vh"]);
  const stageScale = useTransform(p, [0, 0.14], [0.84, 1]);
  const lid = useTransform(p, [0.01, 0.11], [-90, 0]);
  // The closed lid (aluminium edge + light in the seam) hands over to the real lid as soon as it starts rotating
  const closed = useTransform(p, [0.008, 0.03], [1, 0]);
  const screenOff = useTransform(p, [0.06, 0.1], [1, 0]);
  const phoneX = useTransform(p, [0.11, 0.18], ["60%", "0%"]);
  const phoneOpacity = useTransform(p, [0.11, 0.15], [0, 1]);
  const captionOpacity = useTransform(p, [0.14, 0.2], [0, 1]);
  const captionY = useTransform(p, [0.14, 0.2], [30, 0]);

  const tab = browserTabs[active];
  const select = (i) => jumpToStep(ref.current, TABS_START, TABS_END, i, browserTabs.length);


  const fadeIn = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1.2, delay, ease: EASE },
  });

  const title = (
    <>
      <MotionDiv {...fadeIn(0)}>
        <p className="kicker">Desarrollador de software</p>
        <h1 className="headline-xl mt-3">Matías Giménez.</h1>
      </MotionDiv>
      <MotionDiv {...fadeIn(0.15)}>
        <p className="intro mt-5 max-w-[620px] mx-auto">APIs, agentes con IA y productos reales. Desde Villa Mercedes, San Luis.</p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <a href="#proyectos" className="btn-pill">
            Ver proyectos
          </a>
          <a href="#contacto" className="apple-link text-[17px]">
            Contactar
            <CaretRight size={14} weight="bold" />
          </a>
        </div>
      </MotionDiv>
    </>
  );

  const devices = (style) => (
    <MotionDiv style={style} className="relative w-[min(88vw,980px,calc((100dvh-330px)*1.75))] origin-top">
      <Notebook lid={reduce ? 0 : lid} screenOff={reduce ? 0 : screenOff} closed={reduce ? 0 : closed} className="w-[84%] mx-auto">
        <BrowserScreen active={active} onSelect={reduce ? undefined : select} />
      </Notebook>
      {/* The phone belongs to SimpleBuy: it docks over the notebook's right edge on that tab (absolute, so the notebook stays centred) */}
      <MotionDiv
        className="absolute right-0 bottom-0 w-[19%]"
        animate={{ opacity: active === 0 ? 1 : 0, x: active === 0 ? "0%" : "40%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <PhoneFrame
          src="/simplebuy-galponcito.webp"
          alt="Tienda de El Galponcito en SimpleBuy"
          style={reduce ? undefined : { x: phoneX, opacity: phoneOpacity }}
        />
      </MotionDiv>
    </MotionDiv>
  );

  const caption = (
    <AnimatePresence mode="wait" initial={false}>
      <MotionDiv
        key={tab.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <p className="kicker">{tab.kind}</p>
        <h2 className="headline mt-1">{/[?!]$/.test(tab.name) ? tab.name : `${tab.name}.`}</h2>
        <p className="mt-2 text-[14px] text-[var(--text-secondary)]">{tab.stack.join(" · ")}</p>
        <div className="mt-5">
          <a href={tab.url} target="_blank" rel="noreferrer" className="btn-pill">
            {tab.cta}
          </a>
        </div>
      </MotionDiv>
    </AnimatePresence>
  );

  const dots = !reduce && <StepDots count={browserTabs.length} active={active} onSelect={select} label="Proyecto" />;

  if (reduce) {
    return (
      <section id="proyectos" className="pt-28 pb-16 px-5 text-center scroll-mt-12">
        {title}
        <div className="mt-20 flex justify-center">{devices()}</div>
        <div className="mt-12">{caption}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[250vh]">
      {/* Lands just after the lid opens, on the first tab (scroll range is 60% of the section height) */}
      <span id="proyectos" className="absolute top-[14%]" aria-hidden="true" />
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <MotionDiv style={{ opacity: titleOpacity, y: titleY, pointerEvents: titlePointer }} className="absolute inset-x-0 top-[15vh] z-10 text-center px-5">
          {title}
        </MotionDiv>

        <div className="absolute inset-x-0 top-[12vh] flex justify-center px-5">{devices({ y: stageY, scale: stageScale })}</div>

        <MotionDiv style={{ opacity: titleOpacity }} className="absolute inset-x-0 bottom-[5vh] flex flex-col items-center gap-2 pointer-events-none" aria-hidden="true">
          <span className="text-[12px] tracking-[0.2em] uppercase text-[var(--text-secondary)]">Deslizá para abrir</span>
          <span className="scroll-cue" />
        </MotionDiv>

        <MotionDiv style={{ opacity: captionOpacity, y: captionY }} className="absolute inset-x-0 bottom-[24vh] sm:bottom-[5vh] text-center px-5">
          {caption}
          {dots}
        </MotionDiv>
      </div>
    </section>
  );
}

/* ─── Lab: a desktop monitor where each scroll step opens the next experiment as an app window ─── */
const DESK_START = 0.16;
const DESK_END = 0.97;

function Monitor({ children, className = "" }) {
  return (
    <div className={className}>
      <div className="relative rounded-[1.8%/2.9%] bg-[#0d0d0e] p-[1.3%] ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
        <div className="relative overflow-hidden rounded-[0.7%/1.1%] aspect-[16/10]">{children}</div>
      </div>
      {/* Aluminium stand: tapered neck and a thin foot */}
      <div
        className="mx-auto w-[15%] h-[clamp(26px,5.5vw,64px)] bg-gradient-to-r from-[#8e8e93] via-[#d9d9de] to-[#8e8e93]"
        style={{ clipPath: "polygon(12% 0, 88% 0, 100% 100%, 0 100%)" }}
      />
      <div className="mx-auto w-[30%] h-[clamp(5px,0.8vw,9px)] rounded-b-[6px] rounded-t-[2px] bg-gradient-to-b from-[#e3e3e6] to-[#8e8e93] shadow-[0_20px_30px_-12px_rgba(0,0,0,0.6)]" />
    </div>
  );
}

function Desktop({ active, onSelect }) {
  const n = labApps.length;
  const app = labApps[active];
  return (
    <div className="absolute inset-0 text-[clamp(6px,0.75vw,11px)] leading-none select-none text-white">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,#2b5a8c_0%,transparent_55%),radial-gradient(ellipse_at_85%_90%,#c46a3a_0%,transparent_50%),linear-gradient(160deg,#0f1b2d,#1b2f4a_55%,#3a2b33)]" />

      {/* Menu bar shows the app in front, like macOS */}
      <div className="absolute inset-x-0 top-0 h-[4%] flex items-center justify-between px-[1.6%] bg-black/30 backdrop-blur-md">
        <div className="flex items-center gap-[1.6em]">
          <span className="font-bold">{app.appName}</span>
          <span className="opacity-80 hidden sm:inline">Archivo</span>
          <span className="opacity-80 hidden sm:inline">Edición</span>
          <span className="opacity-80 hidden sm:inline">Ver</span>
        </div>
        <span className="opacity-90">Laboratorio · Matías</span>
      </div>

      {/* Windows cascade open one by one; earlier ones stay behind */}
      {labApps.map((a, i) => (
        <MotionDiv
          key={a.id}
          className="absolute w-[62%] h-[64%] rounded-[1.1%/1.8%] overflow-hidden bg-white shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-black/20 origin-bottom"
          style={{ left: `${6 + i * 6.5}%`, top: `${8 + i * 4.2}%`, zIndex: i + 1 }}
          initial={false}
          animate={i <= active ? { opacity: 1, scale: 1, y: "0%" } : { opacity: 0, scale: 0.86, y: "8%" }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        >
          <div className="relative h-[8%] flex items-center px-[2%] bg-[#ececec] text-[#3a3a3c] border-b border-black/10">
            <div className="flex gap-[0.45em]">
              <span className="w-[0.85em] h-[0.85em] rounded-full bg-[#ff5f57]" />
              <span className="w-[0.85em] h-[0.85em] rounded-full bg-[#febc2e]" />
              <span className="w-[0.85em] h-[0.85em] rounded-full bg-[#28c840]" />
            </div>
            <span className="absolute inset-x-0 text-center font-medium truncate px-[14%]">{a.windowTitle}</span>
          </div>
          {a.id === "snake" ? (
            <SnakeGame playing={i === active && !!onSelect} />
          ) : a.id === "diabot" ? (
            <div className="w-full h-[92%] bg-black flex items-center justify-center gap-[2%] px-[2%]">
              {["/diabot1.webp", "/diabot.webp"].map((src, k) => (
                <img key={src} src={resolveAsset(src)} alt={k ? "Publicaciones diarias del bot con la inflación del día" : a.alt} loading="lazy" decoding="async" className="min-w-0 w-[49%] max-h-[94%] object-contain rounded-[0.8em]" />
              ))}
            </div>
          ) : (
            <img
              src={resolveAsset(a.image)}
              alt={a.alt}
              loading="lazy"
              decoding="async"
              className={`block w-full h-[92%] object-cover ${a.position || "object-top"}`}
            />
          )}
          {/* Windows behind the front one dim slightly */}
          <div className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none ${i < active ? "opacity-25" : "opacity-0"}`} />
        </MotionDiv>
      ))}

      {/* Dock with a cursor that clicks the next app */}
      <div className="absolute bottom-[2.5%] left-1/2 -translate-x-1/2 z-20">
        <div className="relative flex items-end gap-[0.9em] px-[1em] py-[0.7em] rounded-[1.3em] bg-white/20 backdrop-blur-xl ring-1 ring-white/25">
          {labApps.map((a, i) => (
            <button
              key={a.id}
              type="button"
              aria-label={`Abrir ${a.appName}`}
              onClick={() => onSelect?.(i)}
              className="relative flex flex-col items-center cursor-pointer"
            >
              <MotionSpan
                key={i === active ? `${a.id}-on` : a.id}
                className="w-[3.4em] h-[3.4em] rounded-[0.9em] grid place-items-center font-bold text-[1.25em] shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
                style={{ background: a.color }}
                initial={false}
                animate={i === active ? { y: ["0%", "-35%", "0%"] } : { y: "0%" }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {a.icon}
              </MotionSpan>
              <span className={`absolute -bottom-[0.55em] w-[0.35em] h-[0.35em] rounded-full bg-white transition-opacity ${i <= active ? "opacity-90" : "opacity-0"}`} />
            </button>
          ))}
          <MotionDiv
            className="absolute top-[45%] z-30 pointer-events-none"
            animate={{ left: `${((active + 0.62) / n) * 100}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
          >
            <MotionSpan
              key={active}
              className="absolute -left-[1em] -top-[1em] w-[2em] h-[2em] rounded-full bg-white/50"
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <svg viewBox="0 0 16 22" className="relative w-[1.8em] h-[2.5em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              <path d="M1 1 L1 17 L5 13 L8 20 L11 19 L8 12 L14 12 Z" fill="#111" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}

function LabDesk() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.6 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const step = Math.floor(((v - DESK_START) / (DESK_END - DESK_START)) * labApps.length);
    const next = Math.min(labApps.length - 1, Math.max(0, step));
    setActive((prev) => (prev === next ? prev : next));
  });

  const titleOpacity = useTransform(p, [0, 0.1], [1, 0]);
  const titleY = useTransform(p, [0, 0.12], [0, -80]);
  const stageY = useTransform(p, [0, 0.14], ["46vh", "0vh"]);
  const stageScale = useTransform(p, [0, 0.14], [0.86, 1]);
  const captionOpacity = useTransform(p, [0.1, 0.16], [0, 1]);

  const app = labApps[active];
  const select = (i) => jumpToStep(ref.current, DESK_START, DESK_END, i, labApps.length);

  const title = (
    <>
      <p className="kicker">Laboratorio</p>
      <h2 className="headline mt-2">Experimentos para aprender.</h2>
      <p className="intro mt-5 max-w-[600px] mx-auto">Proyectos personales donde pruebo ideas nuevas, desde inteligencia artificial hasta herramientas que me ahorran trabajo.</p>
    </>
  );

  const caption = (
    <AnimatePresence mode="wait" initial={false}>
      <MotionDiv
        key={app.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <p className="kicker">{app.kind}</p>
        <h3 className="headline-sm mt-1">{app.name}</h3>
        <p className="mt-3 text-[17px] text-[var(--text-secondary)] max-w-[560px] mx-auto text-pretty">{app.description}</p>
        {app.links.length > 0 && (
          <div className="mt-4 flex items-center justify-center gap-x-7 gap-y-2 flex-wrap text-[17px]">
            {app.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="apple-link">
                {l.label}
                <CaretRight size={14} weight="bold" />
              </a>
            ))}
          </div>
        )}
      </MotionDiv>
    </AnimatePresence>
  );

  const monitor = (style) => (
    <MotionDiv style={style} className="w-[min(88vw,900px,calc((100dvh-360px)*1.45))] origin-top">
      <Monitor>
        <Desktop active={reduce ? labApps.length - 1 : active} onSelect={reduce ? undefined : select} />
      </Monitor>
    </MotionDiv>
  );

  if (reduce) {
    return (
      <section id="laboratorio" className="py-28 px-5 text-center scroll-mt-12">
        {title}
        <div className="mt-16 flex justify-center">{monitor()}</div>
        <ul className="mt-14 max-w-[640px] mx-auto space-y-8 text-left">
          {labApps.map((a) => (
            <li key={a.id}>
              <p className="kicker">{a.kind}</p>
              <h3 className="text-[24px] font-semibold mt-1">{a.name}</h3>
              <p className="mt-2 text-[17px] text-[var(--text-secondary)]">{a.description}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id="laboratorio" ref={ref} className="relative h-[230vh] scroll-mt-12">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <MotionDiv style={{ opacity: titleOpacity, y: titleY }} className="absolute inset-x-0 top-[13vh] text-center px-5">
          {title}
        </MotionDiv>

        <div className="absolute inset-x-0 top-[9vh] flex justify-center px-5">{monitor({ y: stageY, scale: stageScale })}</div>

        <MotionDiv style={{ opacity: captionOpacity }} className="absolute inset-x-0 bottom-[22vh] sm:bottom-[4vh] text-center px-5">
          {caption}
          <StepDots count={labApps.length} active={active} onSelect={select} label="Experimento" />
        </MotionDiv>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [copied, setCopied] = useState(false);
  const ready = useBoot();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // clipboard unavailable
    }
  };

  const cert = certifications[0];

  return (
    <div className="min-h-[100dvh] bg-[var(--bg)] text-[var(--text-primary)]">
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>

      {/* ─── GLOBAL NAV ───────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 h-12 bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-[1.8] border-b border-[var(--border)]">
        <div className="max-w-[1024px] mx-auto px-5 h-full flex items-center justify-between text-[12px]">
          <a href="#main-content" className="text-[14px] font-semibold tracking-tight hover:opacity-70 transition-opacity">
            Matías Giménez
          </a>
          <nav aria-label="Navegación principal" className="flex items-center gap-5 sm:gap-9 text-[var(--nav-text)]">
            {nav.map((n, i) => (
              <a key={n.href} href={n.href} className={`hover:text-[var(--text-primary)] transition-colors ${i === 1 ? "hidden sm:inline" : ""}`}>
                {n.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {theme === "dark" ? "Claro" : "Oscuro"}
            </button>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <Hero ready={ready} />

        <LabDesk />

        {/* ─── CONTACT ──────────────────────────────────────────────────────── */}
        <section id="contacto" className="py-24 sm:py-32 px-5 text-center scroll-mt-12">
          <FadeUp>
            <h2 className="headline-xl">Hablemos.</h2>
            <p className="intro mt-6 max-w-[560px] mx-auto">
              ¿Tenés un proyecto, una integración con IA o un proceso para resolver? Escribime. Respondo en el día.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <a href={`mailto:${EMAIL}`} className="btn-pill">
                Enviar un email
              </a>
              <button type="button" onClick={copyEmail} className="btn-pill-ghost cursor-pointer">
                {copied ? <Check size={16} weight="bold" /> : <Copy size={16} />}
                {copied ? "Copiado" : "Copiar email"}
              </button>
            </div>
            <div className="mt-10 flex items-center justify-center gap-8 text-[17px]">
              <a href={GITHUB} target="_blank" rel="noreferrer" className="apple-link">
                <GithubLogo size={18} /> GitHub
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="apple-link">
                <LinkedinLogo size={18} /> LinkedIn
              </a>
            </div>
            <a
              href={cert.credlyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-14 inline-flex items-center gap-3 rounded-full bg-[var(--surface)] pl-2 pr-5 py-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <img src={resolveAsset(cert.badge)} alt="" loading="lazy" decoding="async" className="w-9 h-9 object-contain" />
              <span>
                {cert.title} · <span className="text-[var(--accent)]">Verificar</span>
              </span>
            </a>
          </FadeUp>
        </section>
      </main>

      {/* ─── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[var(--surface)] text-[12px] text-[var(--text-secondary)]">
        <div className="max-w-[1024px] mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--border)]">
          <span>Copyright © {new Date().getFullYear()} Matías Giménez. Villa Mercedes, San Luis, Argentina.</span>
          <a href="#main-content" className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors">
            Volver arriba <CaretDown size={12} className="rotate-180" />
          </a>
        </div>
      </footer>
    </div>
  );
}
