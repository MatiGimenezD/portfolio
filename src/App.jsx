import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Lenis from "lenis";
import { GitHubCalendar } from "react-github-calendar";

// ─── DATA: PROJECTS ───────────────────────────────────────────────────────────
const mainProjects = [
  {
    name: "SimpleBuy",
    subtitle: "Plataforma para crear tiendas online",
    tag: "Back-End",
    category: "backend",
    status: { type: "live", label: "En Producción" },
    metrics: ["Multi-tienda", "Gestión de pedidos", "API RESTful"],
    problem: "Los comercios locales carecían de una forma ágil de vender en línea sin depender de plataformas costosas.",
    solution: "Plataforma web con backend ágil, catálogo automatizado y panel de administración.",
    architecture: "Node.js, Express, MySQL, HTML5/CSS3. Enfoque en mantenibilidad, escalabilidad de inventarios y bajo tiempo de respuesta.",
    images: ["/ReelSimpleBuy10.mp4"],
    description: "Proyecto Back-End orientado a facilitar la creación y gestión de tiendas online para negocios.",
    links: [{ label: "Sitio", url: "https://simplebuy.com.ar/home" }],
    displayUrl: "https://simplebuy.com.ar",
    imgClass: "bg-zinc-950",
  },
  {
    name: "Citax",
    subtitle: "Gestión de citas y automatización con IA",
    tag: "SaaS",
    category: "backend",
    status: { type: "live", label: "En Producción" },
    metrics: ["IA Agent WhatsApp", "Turnos 24/7", "Multi-usuario"],
    problem: "Pérdida de clientes en centros de salud y estética por falta de atención fuera de horario laboral.",
    solution: "SaaS multi-usuario con motor de reservas y agente de IA integrado a WhatsApp.",
    architecture: "Node.js, Express, MongoDB, IA Agents API. Lógica de negocio compleja, sincronización de turnos y mensajería en tiempo real.",
    images: [
      "/www.citax.com.ar_.webp",
      "/www.citax.com.ar_ (1).webp",
      "/citaxchatwsp.webp",
    ],
    description: "Demuestra lógica de negocio compleja, turnos, usuarios y foco en mantenibilidad y escalabilidad.",
    links: [{ label: "Sitio", url: "https://www.citax.com.ar/" }],
    displayUrl: "https://www.citax.com.ar",
    imgClass: "object-cover",
  },
  {
    name: "Club Judicial VM",
    subtitle: "Portal institucional y comunidad",
    tag: "Web",
    category: "web",
    status: { type: "live", label: "En Producción" },
    metrics: ["Gestión de Socios", "Reservas de instalaciones"],
    problem: "Falta de centralización para actividades y reservas institucionales para socios.",
    solution: "Portal institucional moderno con catálogo de actividades, noticias y sistema de contacto.",
    architecture: "JavaScript, HTML5, CSS3, integración de formularios. UX accesible para socios.",
    images: ["/clubjudicial1.webp", "/clubjudicial2.webp", "/clubjudicial3.webp"],
    description: "Sitio institucional con enfoque en contenido, reservas y experiencia para socios.",
    links: [{ label: "Sitio", url: "https://clubjudicialvm.com.ar/" }],
    displayUrl: "https://clubjudicialvm.com.ar",
    imgClass: "object-cover",
  },
  {
    name: "Ingeniería en Primera Persona",
    subtitle: "Charlas de profesionales para estudiantes",
    tag: "Evento",
    category: "web",
    status: { type: "open", label: "Evento" },
    metrics: ["+300 Asistentes", "Landing Eventos"],
    problem: "Desconexión entre estudiantes universitarios y profesionales de la industria laboral.",
    solution: "Landing page del evento para difusión, agenda de conferencistas e inscripciones.",
    architecture: "Diseño y estructura responsiva, optimización de recursos y despliegue rápido.",
    images: ["/ingprimerapersona1.webp", "/ingprimerapersona.webp"],
    description: "Organización y web para el evento de difusión profesional de la FICA-UNViMe.",
    links: [{ label: "Sitio", url: "https://ingprimerapersona.com.ar/" }],
    displayUrl: "https://ingprimerapersona.com.ar",
    imgClass: "object-cover",
  },
  {
    name: "Will it Rain? — NASA Space Apps",
    subtitle: "Predicción de lluvia con datos satelitales",
    tag: "Hackathon",
    category: "ia",
    status: { type: "open", label: "NASA Hackathon" },
    metrics: ["NASA GPM Data", "Geolocalización", "Scoring de Lluvia"],
    problem: "Falta de herramientas sencillas para entender la probabilidad de precipitación en tiempo real para sectores productivos.",
    solution: "Aplicación web que procesa datos meteorológicos y satelitales de la NASA para dar respuestas claras sobre el clima.",
    architecture: "Integración de datasets climáticos de la NASA, consumo de APIs meteorológicas, JavaScript, CSS.",
    images: ["/willitrain.webp", "/willitrain1.webp"],
    description: "Proyecto desarrollado para el NASA Space Apps Challenge utilizando datos de precipitación global.",
    links: [
      {
        label: "Proyecto",
        url: "https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/will-it-rain/",
      },
      { label: "Demo", url: "https://willitrain.com.ar" },
    ],
    displayUrl: "https://willitrain.com.ar",
    imgClass: "object-contain bg-zinc-950",
  },
];

const hobbyProjects = [
  {
    name: "DinoGoogle RedNeuronal",
    subtitle: "Red neuronal evolucionada por algoritmos genéticos",
    tag: "IA / Genético",
    category: "ia",
    status: { type: "open", label: "Experimento IA" },
    metrics: ["Algoritmos Genéticos", "Red Neuronal FeedForward"],
    problem: "Entender de manera práctica la convergencia y entrenamiento de redes neuronales sin frameworks prehechos.",
    solution: "Recreación del juego de Google en Java con agentes controlados por redes neuronales evolucionadas por selección genética.",
    architecture: "Java, Algoritmos Genéticos (cruce, mutación, fitness), Red Neuronal personalizada.",
    images: ["/dino.webp", "/dinoCharacter.webp"],
    description:
      "Desarrollé desde cero una versión del clásico juego del dinosaurio de Google con redes neuronales evolutivas.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/matigimenezd/DinoGoogle-RedNeuronal",
      },
    ],
    displayUrl: "https://github.com/matigimenezd/DinoGoogle-RedNeuronal",
    imgClass: "object-contain bg-zinc-950",
  },
  {
    name: "Snake Game AI",
    subtitle: "Agente autónomo con red neuronal",
    tag: "IA",
    category: "ia",
    status: { type: "open", label: "Red Neuronal" },
    metrics: ["Red Neuronal Propia", "Entrenamiento Autónomo"],
    problem: "Explorar la toma de decisiones espaciales y evasión de obstáculos con redes neuronales simples.",
    solution: "Juego de la víbora en Java donde la serpiente aprende a buscar comida y esquivar colisiones.",
    architecture: "Java Swing, perceptrones multicapa y función de fitness personalizada.",
    images: ["/snake.webp"],
    description:
      "Implementación del clásico Snake en Java con agentes que aprenden a jugar de forma autónoma.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/matigimenezd/Snake-RedNeuronal",
      },
    ],
    displayUrl: "https://github.com/matigimenezd/Snake-RedNeuronal",
    imgClass: "object-contain bg-zinc-950",
  },
  {
    name: "Bot Inflación Día a Día",
    subtitle: "Scraping y publicación automática en X / Twitter",
    tag: "Scraping",
    category: "backend",
    status: { type: "live", label: "Bot Automático" },
    metrics: ["Scraping Diario", "Twitter API v2", "Cron Job"],
    problem: "Monitorear la variación real y diaria de precios en supermercados sin depender de índices oficiales atrasados.",
    solution: "Scraper automatizado que recopila precios de productos de consumo masivo y publica métricas diarias en Twitter.",
    architecture: "Python / Node.js, Web Scraping con Puppeteer/BeautifulSoup, integración Twitter API v2 y cron jobs.",
    images: ["/diabot1.webp", "/diabot.webp"],
    description:
      "Bot que realiza scraping diario sobre cadenas de supermercados para calcular la inflación acumulada.",
    links: [{ label: "X / Twitter", url: "https://x.com/BotSupermercado" }],
    displayUrl: "https://x.com/BotSupermercado",
    imgClass: "object-contain bg-zinc-950",
  },
  {
    name: "SIU Guaraní - Extensión",
    subtitle: "Cálculo automático de promedio en SIU Guaraní",
    tag: "Extensión",
    category: "backend",
    status: { type: "store", label: "Chrome Web Store" },
    metrics: ["+500 Usuarios", "DOM Injection", "Manifest V3"],
    problem: "El sistema universitario SIU Guaraní no calcula automáticamente el promedio con y sin aplazos de los estudiantes.",
    solution: "Extensión para Chrome que parsea la historia académica en tiempo real y calcula promedios y porcentajes de carrera.",
    architecture: "Chrome Extensions API (Manifest V3), JavaScript DOM parser.",
    images: ["/siuguarani.webp"],
    description:
      "Extensión para Chrome que calcula de forma automática el promedio con y sin aplazos dentro del SIU Guaraní.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/matigimenezd/SiuGuaraniPromedio",
      },
      {
        label: "Chrome Store",
        url: "https://chromewebstore.google.com/detail/mobhhadapaogikeffmlcicmfinnmheeh",
      },
    ],
    displayUrl: "chrome-extension://siu-guarani-promedio",
    imgClass: "object-contain bg-zinc-950",
  },
  {
    name: "Parametrización de Muebles en SketchUp",
    subtitle: "Diseño 3D & Modelado Paramétrico",
    tag: "Modelado 3D",
    category: "web",
    status: { type: "open", label: "Modelado Paramétrico" },
    metrics: ["SketchUp", "Modelado Paramétrico", "Componentes Dinámicos"],
    problem: "Diseño y parametrización técnica de mobiliario modular para fabricación y arquitectura.",
    solution: "Modelado paramétrico con componentes dinámicos en SketchUp para ajuste ágil de medidas, despieces y optimización de materiales.",
    architecture: "SketchUp, Componentes Dinámicos, Modelado Paramétrico y Documentación Técnica.",
    images: ["/muebles-parametrizados.webp"],
    description:
      "Desarrollo de modelado técnico y parametrización de mobiliario modular en SketchUp, optimizando despieces y dimensiones adaptables.",
    links: [],
    displayUrl: "https://sketchup-parametric.local",
    imgClass: "object-cover",
  },
];

const additionalProjects = [
  {
    name: "Saber Raíz",
    tag: "E-commerce",
    images: ["/www.saberraiz.com.ar_.webp"],
    description:
      "Landing e-commerce de blends naturales con foco en producto y conversión.",
    url: "https://www.saberraiz.com.ar/",
    imgClass: "object-cover",
  },
  {
    name: "Consultora Puerta de Augusta",
    tag: "Corporativo",
    images: ["/www.consultorapuertadeaugusta.com.ar_.webp"],
    description:
      "Sitio corporativo para servicios de consultoría estratégica y mejora continua.",
    url: "https://www.consultorapuertadeaugusta.com.ar/",
    imgClass: "object-cover",
  },
  {
    name: "CTMI S.A.S. - Soporte Técnico Industrial",
    tag: "Industrial",
    images: ["/www.ctmi.com.ar_.webp", "/www.ctmi.com.ar_ (1).webp"],
    description:
      "Sitio web para CTMI S.A.S. (Villa Mercedes), empresa especializada en soporte técnico industrial, mantenimiento electromecánico, automatización y tableros eléctricos.",
    url: "https://www.ctmi.com.ar/",
    imgClass: "object-cover",
  },
];

// ─── DATA: CERTIFICATIONS ─────────────────────────────────────────────────────
const certifications = [
  {
    id: "google-cybersecurity",
    title: "Google Cybersecurity Professional Certificate (v.2)",
    issuer: "Google · Coursera",
    date: "Agosto 2026",
    badge: "/google-cybersecurity-badge.webp",
    pdfUrl: "/google-cybersecurity-certificate.pdf",
    credlyUrl: "https://www.credly.com/earner/earned/badge/d16ad120-9898-46f2-9d21-8d8f003ba6b0",
    description:
      "Certificación profesional otorgada por Google a través de Coursera y verificada en Credly. Acredita competencias en identificación de vulnerabilidades, respuesta ante incidentes, mitigación de riesgos de seguridad, análisis de paquetes de red y automatización de procesos de ciberseguridad con Python y Linux.",
    skills: [
      "Attacks & Exploits",
      "Career Development",
      "Introduction to Linux",
      "Security Fundamentals",
      "Python Automation",
      "SIEM & IDS/IPS",
      "Packet Analysis (Wireshark)",
      "Incident Response",
    ],
    verified: true,
  },
];

const navItems = [
  { label: "Sobre mí", id: "about" },
  { label: "Stack", id: "stack" },
  { label: "Certificaciones", id: "certifications" },
  { label: "Proyectos", id: "projects" },
  { label: "Hobby", id: "hobby" },
  { label: "Landings", id: "landings" },
  { label: "Contacto", id: "contact" },
];

const skillNodes = [
  {
    id: "react",
    label: "React",
    x: 30,
    y: 25,
    related: ["javascript", "node", "tailwind", "mui"],
    projects: ["SimpleBuy", "Citax", "Will it Rain"],
  },
  {
    id: "javascript",
    label: "JavaScript",
    x: 18,
    y: 48,
    related: ["react", "node", "express"],
    projects: ["SimpleBuy", "Citax", "Club Judicial VM"],
  },
  {
    id: "tailwind",
    label: "Tailwind",
    x: 42,
    y: 18,
    related: ["react", "javascript"],
    projects: ["Portfolio", "Citax"],
  },
  {
    id: "node",
    label: "Node.js",
    x: 52,
    y: 42,
    related: ["react", "javascript", "express", "mysql", "mongodb"],
    projects: ["SimpleBuy", "Citax", "Will it Rain"],
  },
  {
    id: "express",
    label: "Express",
    x: 38,
    y: 68,
    related: ["node", "javascript", "mysql", "mongodb"],
    projects: ["SimpleBuy", "Citax"],
  },
  {
    id: "mysql",
    label: "MySQL",
    x: 82,
    y: 45,
    related: ["node", "express"],
    projects: ["SimpleBuy"],
  },
  {
    id: "mongodb",
    label: "MongoDB",
    x: 72,
    y: 72,
    related: ["node", "express"],
    projects: ["Citax"],
  },
  {
    id: "mui",
    label: "Material UI",
    x: 45,
    y: 32,
    related: ["react"],
    projects: [],
  },
  {
    id: "python",
    label: "Python",
    x: 18,
    y: 78,
    related: ["ml", "javascript"],
    projects: ["Dino IA V2", "Snake Game AI", "Bot Twitter Inflación", "Google Cybersecurity"],
  },
  {
    id: "ml",
    label: "ML",
    x: 32,
    y: 84,
    related: ["python"],
    projects: ["Dino IA V2", "Snake Game AI"],
  },
];

const skillEdges = skillNodes.flatMap((node) =>
  node.related.filter((t) => node.id < t).map((t) => [node.id, t]),
);

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useTypingEffect(words, speed = 80, deleteSpeed = 45, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout;
    if (!isDeleting && displayed === word) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayed((prev) =>
            isDeleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1),
          );
        },
        isDeleting ? deleteSpeed : speed,
      );
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIdx, words, speed, deleteSpeed, pause]);
  return displayed;
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sectionEls = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const close = () => setMobileOpen(false);
      window.addEventListener("scroll", close);
      return () => window.removeEventListener("scroll", close);
    }
  }, [mobileOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <nav
      className={`nav-root ${scrolled ? "scrolled" : ""} ${mobileOpen ? "mobile-open" : ""}`}
    >
      <div
        className="nav-container"
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 100,
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="nav-logo"
        >
          MG.
        </button>

        {/* Desktop Links */}
        <div
          className="nav-links-desktop"
          style={{ display: "flex", alignItems: "center", gap: 24 }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollTo(item.id);
                setMobileOpen(false);
              }}
              className={`nav-link ${active === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="mailto:matiasgimenez452@gmail.com"
            className="btn-primary"
            style={{ padding: "8px 18px", fontSize: 12, marginLeft: 6 }}
          >
            Contacto
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${mobileOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`nav-mobile-overlay ${mobileOpen ? "active" : ""}`}>
        <div className="nav-mobile-links">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                scrollTo(item.id);
                setMobileOpen(false);
              }}
              className={`nav-mobile-link ${active === item.id ? "active" : ""}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <span className="nav-mobile-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </button>
          ))}
          <div className="nav-mobile-footer">
            <a
              href="mailto:matiasgimenez452@gmail.com"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Contactame
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── SKILL SYNERGY ────────────────────────────────────────────────────────────
function SkillSynergyNetwork() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const activeId = hoveredId || selectedId;
  const activeSkill = skillNodes.find((s) => s.id === activeId);

  return (
    <div
      className="reveal reveal-delay-1"
      style={{
        borderRadius: 16,
        border: "1px solid var(--border)",
        padding: "20px 24px",
        background: "var(--cream-alt)",
      }}
    >
      <p style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 16 }}>
        Pasá el cursor por una habilidad para ver su sinergia. Hacé click para
        ver proyectos relacionados.
      </p>
      <div
        style={{
          position: "relative",
          height: 320,
          width: "100%",
          overflow: "hidden",
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--cream)",
        }}
        onMouseLeave={() => setHoveredId(null)}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {skillEdges.map(([a, b]) => {
            const from = skillNodes.find((s) => s.id === a);
            const to = skillNodes.find((s) => s.id === b);
            if (!from || !to) return null;
            const isEdgeActive = activeId && (a === activeId || b === activeId);
            return (
              <line
                key={`${a}-${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={isEdgeActive ? "synergy-line" : ""}
                stroke={isEdgeActive ? "var(--sage)" : "var(--border-dark)"}
                strokeWidth={isEdgeActive ? "0.25" : "0.12"}
                opacity={activeId && !isEdgeActive ? 0.2 : 1}
              />
            );
          })}
        </svg>
        {skillNodes.map((skill) => {
          const isActive = activeId === skill.id;
          const isConnected = activeId
            ? isActive || skill.related.includes(activeId)
            : false;
          return (
            <button
              key={skill.id}
              type="button"
              onMouseEnter={() => setHoveredId(skill.id)}
              onClick={() =>
                setSelectedId((c) => (c === skill.id ? null : skill.id))
              }
              className={`skill-node ${isActive ? "skill-node-active" : ""} ${isConnected ? "skill-node-connected" : ""}`}
              style={{
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                opacity: activeId && !isConnected ? 0.35 : 1,
              }}
            >
              {skill.label}
            </button>
          );
        })}
      </div>
      {selectedId && activeSkill && (
        <div
          style={{
            marginTop: 16,
            padding: "14px 18px",
            border: "1px solid var(--sage-light)",
            borderRadius: 10,
            background: "var(--sage-pale)",
          }}
        >
          <p
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--sage)",
              marginBottom: 8,
            }}
          >
            {activeSkill.label} en proyectos
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {activeSkill.projects.map((p) => (
              <li
                key={p}
                style={{
                  fontSize: 13,
                  color: "var(--ink-mid)",
                  padding: "2px 0",
                }}
              >
                — {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── IMAGE SLIDER ─────────────────────────────────────────────────────────────
function ProjectImageSlider({ images, onOpenGallery }) {
  const [idx, setIdx] = useState(0);
  const isVideo = images[0]?.endsWith(".mp4");
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setIdx(0);
  }, [images]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isVideo || images.length <= 1 || !inView) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % images.length), 3400);
    return () => clearInterval(t);
  }, [images, isVideo, inView]);

  const resolve = (p) => {
    if (p.startsWith("http")) return p;
    const clean = p.startsWith("/public/")
      ? p.slice(8)
      : p.startsWith("public/")
        ? p.slice(7)
        : p.startsWith("/")
          ? p.slice(1)
          : p;
    return import.meta.env.BASE_URL + encodeURI(clean);
  };

  return (
    <div
      ref={containerRef}
      className="project-img-wrap"
      style={{
        position: "relative",
        height: 220,
        overflow: "hidden",
        background: "var(--cream-alt)",
        cursor: "pointer",
      }}
      onClick={() => onOpenGallery(images)}
    >
      {isVideo ? (
        <video
          src={resolve(images[0])}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="img-zoom"
        />
      ) : (
        <img
          src={resolve(images[idx])}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="img-zoom"
        />
      )}
      {images.length > 1 && !isVideo && (
        <>
          <button
            type="button"
            className="slider-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((p) => (p - 1 + images.length) % images.length);
            }}
          >
            {"<"}
          </button>
          <button
            type="button"
            className="slider-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((p) => (p + 1) % images.length);
            }}
          >
            {">"}
          </button>
        </>
      )}
      {images.length > 1 && !isVideo && (
        <div className="slider-dots">
          {images.map((_, i) => (
            <div
              key={i}
              className={`slider-dot ${i === idx ? "active" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── LANDING CARD ─────────────────────────────────────────────────────────────
function LandingCard({ project, onOpenMedia }) {
  return (
    <article className="landing-card">
      <div className="landing-card-media">
        <ProjectImageSlider
          images={project.images}
          onOpenGallery={onOpenMedia}
        />
      </div>
      <div className="landing-card-body">
        <div className="landing-card-header">
          <h3 className="landing-card-name">{project.name}</h3>
          <span className="tag-pill">{project.tag}</span>
        </div>
        <p className="landing-card-desc">{project.description}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
          style={{ fontSize: 12, alignSelf: "flex-start" }}
          onClick={(e) => e.stopPropagation()}
        >
          Ver sitio{" "}
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>
    </article>
  );
}

// ─── PEEKING BOT ──────────────────────────────────────────────────────────────
function PeekingBot() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const shouldBeVisible =
            scrollPosition > 800 &&
            scrollPosition + windowHeight < documentHeight - 600;
          setIsVisible((prev) => (prev !== shouldBeVisible ? shouldBeVisible : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resolve = (p) => {
    if (p.startsWith("http")) return p;
    const clean = p.startsWith("/public/")
      ? p.slice(8)
      : p.startsWith("public/")
        ? p.slice(7)
        : p.startsWith("/")
          ? p.slice(1)
          : p;
    return import.meta.env.BASE_URL + clean;
  };

  return (
    <div
      style={{
        position: "fixed",
        right: isVisible ? "-100px" : "-250px",
        bottom: "15%",
        transform: `rotate(${isVisible ? "-12deg" : "0deg"})`,
        transformOrigin: "bottom right",
        transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: -1,
        pointerEvents: "none",
        width: "180px",
        filter: "drop-shadow(-8px 12px 24px rgba(0,0,0,0.12))",
      }}
    >
      <img
        src={resolve("/botdia.webp")}
        alt="Bot asomándose"
        loading="lazy"
        decoding="async"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}

// ─── LIVE CLOCK ───────────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");
  return (
    <span className="hero-clock">
      {hh}
      <span className="hero-clock-colon">:</span>
      {mm}
      <span className="hero-clock-colon">:</span>
      {ss}
    </span>
  );
}

// ─── HERO BOOT ────────────────────────────────────────────────────────────────
function HeroBoot() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-boot">
      <div className="hero-center">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="hero-avail-badge">
            <span className="hero-avail-dot" />
            <span>Disponible para proyectos</span>
          </div>
          <LiveClock />
        </div>

        <h1 className="hero-name-min">
          <span className="hero-nm-first">Matías</span>
          <span className="hero-nm-last">Giménez</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "var(--ink-muted)",
            maxWidth: 580,
            textAlign: "center",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Desarrollador <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Backend</strong> & Analista en Sistemas. Especializado en arquitectura de software, APIs y soluciones escalables con IA.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
          <button
            onClick={() => scrollTo("projects")}
            className="hero-story-btn"
          >
            Ver Proyectos
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo("certifications")}
            className="hero-link-pill"
            style={{ padding: "10px 18px", fontSize: 12 }}
          >
            🛡️ Certificaciones
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ num, label }) {
  return (
    <div
      className="reveal"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 40,
      }}
    >
      <span className="section-label">
        {num} — {label}
      </span>
      <div className="section-rule" />
    </div>
  );
}

// ─── GITHUB CALENDAR RESPONSIVE ──────────────────────────────────────────────
function GitHubCalendarResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmall(window.innerWidth <= 420);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const blockSize = isSmall ? 8 : isMobile ? 10 : 12;
  const blockMargin = isSmall ? 2 : isMobile ? 3 : 4;
  const fontSize = isSmall ? 11 : isMobile ? 12 : 14;

  return (
    <div style={{ color: "var(--ink)", width: "100%" }}>
      <GitHubCalendar
        username="MatiGimenezD"
        colorScheme="dark"
        blockSize={blockSize}
        blockMargin={blockMargin}
        fontSize={fontSize}
        theme={{
          dark: ["#161513", "#23332a", "#345543", "#4d7a60", "#88b09d"],
        }}
      />
    </div>
  );
}

// ─── MEDIA MODAL ──────────────────────────────────────────────────────────────
function MediaModal({ mediaModal, setMediaModal }) {
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    setModalIndex(0);
  }, [mediaModal]);

  if (!mediaModal || !mediaModal.length) return null;

  const resolve = (p) => {
    if (p.startsWith("http")) return p;
    const clean = p.startsWith("/public/")
      ? p.slice(8)
      : p.startsWith("public/")
        ? p.slice(7)
        : p.startsWith("/")
          ? p.slice(1)
          : p;
    return import.meta.env.BASE_URL + encodeURI(clean);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={() => setMediaModal(null)}
    >
      <button
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: 28,
          cursor: "pointer",
          zIndex: 10000,
        }}
        onClick={() => setMediaModal(null)}
      >
        ×
      </button>

      {mediaModal.length > 1 && (
        <>
          <button
            style={{
              position: "absolute",
              left: 24,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              fontSize: 24,
              cursor: "pointer",
              padding: "16px 20px",
              borderRadius: "50%",
              zIndex: 10000,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setModalIndex(
                (p) => (p - 1 + mediaModal.length) % mediaModal.length,
              );
            }}
          >
            ‹
          </button>
          <button
            style={{
              position: "absolute",
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              fontSize: 24,
              cursor: "pointer",
              padding: "16px 20px",
              borderRadius: "50%",
              zIndex: 10000,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setModalIndex((p) => (p + 1) % mediaModal.length);
            }}
          >
            ›
          </button>
        </>
      )}
      <div
        style={{
          maxWidth: 1200,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {mediaModal[modalIndex].endsWith(".mp4") ? (
          <video
            key={mediaModal[modalIndex]}
            src={resolve(mediaModal[modalIndex])}
            controls
            autoPlay
            style={{
              maxHeight: "85vh",
              width: "auto",
              maxWidth: 650,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        ) : (
          <img
            key={mediaModal[modalIndex]}
            src={resolve(mediaModal[modalIndex])}
            alt=""
            style={{
              maxHeight: "85vh",
              width: "auto",
              maxWidth: "100%",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.1)",
              objectFit: "contain",
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── BROWSER MOCKUP & STATUS BADGES ──────────────────────────────────────────
function BrowserMockup({ urlDisplay = "https://app.demo", children }) {
  return (
    <div className="browser-mockup">
      <div className="browser-header">
        <div className="browser-dots">
          <div className="browser-dot red" />
          <div className="browser-dot yellow" />
          <div className="browser-dot green" />
        </div>
        <div className="browser-address-bar">
          <svg className="browser-address-lock" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          <span>{urlDisplay}</span>
        </div>
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

function StatusBadge({ type, label }) {
  const classNames = {
    live: "status-badge status-live",
    store: "status-badge status-store",
    open: "status-badge status-open",
  };
  return (
    <span className={classNames[type] || "status-badge status-live"}>
      <span className="status-dot" />
      {label}
    </span>
  );
}

function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="case-study-overlay" onClick={onClose}>
      <div className="case-study-card" onClick={(e) => e.stopPropagation()}>
        <div className="case-study-header">
          <div>
            <span className="tag-pill sage">{project.tag}</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, margin: "8px 0 4px", fontWeight: 600 }}>
              {project.name}
            </h2>
            <p style={{ fontSize: 13, color: "var(--ink-muted)", margin: 0 }}>{project.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {project.status && (
          <div style={{ marginBottom: 16 }}>
            <StatusBadge type={project.status.type} label={project.status.label} />
          </div>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {project.metrics.map((m, i) => (
              <span key={i} className="metric-pill">
                ⚡ {m}
              </span>
            ))}
          </div>
        )}

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginBottom: 16 }}>
          <p className="case-study-section-title">El Desafío</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-mid)" }}>{project.problem || project.description}</p>
        </div>

        {project.solution && (
          <div style={{ marginBottom: 16 }}>
            <p className="case-study-section-title">La Solución</p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-mid)" }}>{project.solution}</p>
          </div>
        )}

        {project.architecture && (
          <div style={{ marginBottom: 20, background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 10, border: "1px solid var(--border)" }}>
            <p className="case-study-section-title">Arquitectura & Stack</p>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>{project.architecture}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          {project.links && project.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 12, padding: "10px 18px" }}>
              {link.label}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          ))}
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 12, padding: "10px 18px" }}>
              Ver Sitio Live
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT GRID ──────────────────────────────────────────────────
function ProjectGrid({ projects, onOpenMedia, showFilters = true }) {
  const [filter, setFilter] = useState("all");
  const [detailProject, setDetailProject] = useState(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <>
      {showFilters && (
        <div className="project-filter-bar">
          {[
            { id: "all", label: "Todos" },
            { id: "backend", label: "Backend & SaaS" },
            { id: "ia", label: "IA & Scraping" },
            { id: "web", label: "Web & Landings" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`project-filter-tab ${filter === tab.id ? "active" : ""}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="proj-grid">
        {filteredProjects.map((p, i) => (
          <article
            key={p.name}
            className="proj-card reveal"
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            <div className="proj-card-media">
              <BrowserMockup urlDisplay={p.displayUrl || `https://${p.name.toLowerCase().replace(/\s+/g, '')}.com`}>
                <ProjectImageSlider
                  images={p.images}
                  onOpenGallery={onOpenMedia}
                />
              </BrowserMockup>
            </div>
            <div className="proj-card-body">
              <div className="proj-card-header" style={{ alignItems: "center" }}>
                <span className="tag-pill sage">{p.tag}</span>
                {p.status && <StatusBadge type={p.status.type} label={p.status.label} />}
              </div>
              <h3 className="proj-card-name" style={{ marginTop: 8 }}>{p.name}</h3>
              <p className="proj-card-sub">{p.subtitle}</p>

              {p.metrics && p.metrics.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "10px 0 14px" }}>
                  {p.metrics.map((m, idx) => (
                    <span key={idx} className="metric-pill">
                      ⚡ {m}
                    </span>
                  ))}
                </div>
              )}

              <p className="proj-card-desc">{p.description}</p>

              <div className="proj-card-links" style={{ gap: 8 }}>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ fontSize: 11, padding: "6px 14px" }}
                  onClick={() => setDetailProject(p)}
                >
                  Detalle Técnico
                </button>
                {p.links && p.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                    style={{ fontSize: 11, padding: "6px 12px" }}
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {detailProject && (
        <ProjectDetailModal
          project={detailProject}
          onClose={() => setDetailProject(null)}
        />
      )}
    </>
  );
}

// ─── CERTIFICATIONS SECTION ───────────────────────────────────────────────────
function CertificationsSection({ onOpenPdf }) {
  const resolve = (p) => {
    if (p.startsWith("http")) return p;
    const clean = p.startsWith("/public/")
      ? p.slice(8)
      : p.startsWith("public/")
        ? p.slice(7)
        : p.startsWith("/")
          ? p.slice(1)
          : p;
    return import.meta.env.BASE_URL + encodeURI(clean);
  };

  return (
    <section
      id="certifications"
      style={{ maxWidth: 960, margin: "0 auto", padding: "72px 32px" }}
    >
      <SectionHeader num="03" label="Certificaciones" />
      <p
        className="reveal"
        style={{
          fontSize: 13,
          color: "var(--ink-muted)",
          marginBottom: 28,
          marginTop: -24,
        }}
      >
        Credenciales y certificaciones profesionales verificadas.
      </p>

      <div className="certifications-grid">
        {certifications.map((cert, i) => (
          <article
            key={cert.id}
            className="cert-card reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="cert-badge-wrapper">
              <img
                src={resolve(cert.badge)}
                alt={cert.title}
                className="cert-badge-img"
              />
              <div className="cert-badge-glow" />
            </div>

            <div className="cert-content">
              <div className="cert-header-meta">
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="tag-pill sage">Certificación Profesional</span>
                  {cert.verified && (
                    <span className="cert-verified-pill">
                      <span className="status-dot" style={{ background: "#4ade80" }} />
                      Credencial Verificada
                    </span>
                  )}
                </div>
                <span className="cert-date">{cert.date}</span>
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">Emitido por <strong>{cert.issuer}</strong></p>

              <p className="cert-description">{cert.description}</p>

              <div className="cert-skills-wrap">
                {cert.skills.map((skill) => (
                  <span key={skill} className="tech-pill">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="cert-actions">
                <a
                  href={cert.credlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ fontSize: 12, padding: "9px 18px" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Verificar en Credly
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenPdf(cert)}
                  className="btn-ghost"
                  style={{ fontSize: 12, padding: "9px 16px" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Ver Certificado PDF
                </button>

                <a
                  href={resolve(cert.pdfUrl)}
                  download="GoogleCybersecurityProfessionalCertificate_MatiasGimenez.pdf"
                  className="btn-ghost"
                  style={{ fontSize: 12, padding: "9px 14px" }}
                  title="Descargar PDF"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Descargar
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── CERTIFICATE PDF MODAL ────────────────────────────────────────────────────
function CertificatePdfModal({ cert, onClose }) {
  if (!cert) return null;
  const resolve = (p) => {
    if (p.startsWith("http")) return p;
    const clean = p.startsWith("/public/")
      ? p.slice(8)
      : p.startsWith("public/")
        ? p.slice(7)
        : p.startsWith("/")
          ? p.slice(1)
          : p;
    return import.meta.env.BASE_URL + encodeURI(clean);
  };
  const pdfResolved = resolve(cert.pdfUrl);

  return (
    <div className="case-study-overlay" onClick={onClose}>
      <div
        className="case-study-card"
        style={{
          width: "min(94vw, 860px)",
          height: "88vh",
          display: "flex",
          flexDirection: "column",
          padding: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="case-study-header" style={{ marginBottom: 14 }}>
          <div>
            <span className="tag-pill sage">Certificación Oficial</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                margin: "6px 0 2px",
                fontWeight: 600,
              }}
            >
              {cert.title}
            </h2>
            <p style={{ fontSize: 12, color: "var(--ink-muted)", margin: 0 }}>
              {cert.issuer} · {cert.date}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "#1a1918",
            position: "relative",
          }}
        >
          <iframe
            src={`${pdfResolved}#toolbar=1&navpanes=0`}
            title={cert.title}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 14,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <a
            href={cert.credlyUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ fontSize: 11, padding: "8px 16px" }}
          >
            Verificar en Credly
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a
            href={pdfResolved}
            download="GoogleCybersecurityProfessionalCertificate_MatiasGimenez.pdf"
            className="btn-ghost"
            style={{ fontSize: 11, padding: "8px 16px" }}
          >
            Descargar Archivo PDF
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const [mediaModal, setMediaModal] = useState(null);
  const [pdfModalCert, setPdfModalCert] = useState(null);
  const active = useActiveSection();
  useScrollReveal();
  useSmoothScroll();

  const handleOpenMedia = (arr) => setMediaModal(arr);

  const S = { maxWidth: 960, margin: "0 auto", padding: "0 32px" };
  const divider = { borderTop: "1px solid var(--border)", margin: 0 };

  return (
    <>
      <Navbar active={active} />

      <main style={{ minHeight: "100vh" }}>
        {/* HERO */}
        <HeroBoot />

        <hr style={divider} />

        {/* 01: ABOUT */}
        <section
          id="about"
          style={{ ...S, paddingTop: 72, paddingBottom: 72 }}
        >
          <SectionHeader num="01" label="Sobre mí" />
          <div className="about-grid">
            <div className="reveal">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 600,
                  color: "var(--ink)",
                  lineHeight: 1.2,
                  marginBottom: 24,
                }}
              >
                Construyo software
                <br />
                <em style={{ color: "var(--sage)" }}>que escala.</em>
              </h2>
              {[
                { label: "Rol", value: "Backend Developer" },
                {
                  label: "Formación",
                  value: "Ing. en Sistemas (avanzado)",
                },
                { label: "Ubicación", value: "San Luis, Argentina" },
                { label: "Idiomas", value: "Español, Inglés B2" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                      width: 80,
                      flexShrink: 0,
                      paddingTop: 2,
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ fontSize: 14, color: "var(--ink-mid)" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="reveal reveal-delay-1">
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "var(--ink-mid)",
                  marginBottom: 16,
                }}
              >
                Soy Analista en Sistemas orientado al desarrollo{" "}
                <strong style={{ color: "var(--ink)" }}>Backend</strong> con
                fuerte interés en arquitectura de software, ciberseguridad, IA aplicada e
                infraestructura cloud.
              </p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "var(--ink-muted)",
                  marginBottom: 24,
                }}
              >
                Trabajo con mentalidad de producto: priorizo calidad
                técnica, seguridad, resultados medibles y soluciones que realmente
                funcionan en producción.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "Node.js",
                  "Express",
                  "Python",
                  "MySQL",
                  "MongoDB",
                  "REST APIs",
                  "Cybersecurity",
                  "Material UI",
                  "Prisma",
                ].map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className="reveal reveal-delay-2 github-calendar-wrap"
            style={{ marginTop: 56 }}
          >
            <GitHubCalendarResponsive />
          </div>
        </section>

        <hr style={divider} />

        {/* 02: STACK */}
        <section
          id="stack"
          style={{ ...S, paddingTop: 72, paddingBottom: 72 }}
        >
          <SectionHeader num="02" label="Stack Tecnológico" />
          <SkillSynergyNetwork />
        </section>

        <hr style={divider} />

        {/* 03: CERTIFICATIONS */}
        <CertificationsSection onOpenPdf={(cert) => setPdfModalCert(cert)} />

        <hr style={divider} />

        {/* 04: PROJECTS */}
        <section
          id="projects"
          style={{ ...S, paddingTop: 72, paddingBottom: 72 }}
        >
          <SectionHeader num="04" label="Proyectos" />
          <p
            className="reveal"
            style={{
              fontSize: 13,
              color: "var(--ink-muted)",
              marginBottom: 24,
              marginTop: -24,
            }}
          >
            Proyectos con impacto real y usuarios activos.
          </p>
          <ProjectGrid
            projects={mainProjects}
            onOpenMedia={handleOpenMedia}
          />
        </section>

        <hr style={divider} />

        {/* 05: HOBBY */}
        <section
          id="hobby"
          style={{ ...S, paddingTop: 72, paddingBottom: 72 }}
        >
          <SectionHeader num="05" label="Proyectos Hobby" />
          <p
            className="reveal"
            style={{
              fontSize: 13,
              color: "var(--ink-muted)",
              marginBottom: 24,
              marginTop: -24,
            }}
          >
            Automatización, web scraping, modelado e Inteligencia Artificial aplicada.
          </p>
          <ProjectGrid
            projects={hobbyProjects}
            onOpenMedia={handleOpenMedia}
          />
        </section>

        <hr style={divider} />

        {/* 06: LANDINGS */}
        <section
          id="landings"
          style={{ ...S, paddingTop: 72, paddingBottom: 72 }}
        >
          <SectionHeader num="06" label="Landing Pages" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginTop: 8,
            }}
          >
            {additionalProjects.map((p, i) => (
              <div key={p.name} className={`reveal reveal-delay-${i}`}>
                <LandingCard project={p} onOpenMedia={handleOpenMedia} />
              </div>
            ))}
          </div>
        </section>

        <hr style={divider} />

        {/* 07: CONTACT */}
        <section
          id="contact"
          style={{ ...S, paddingTop: 72, paddingBottom: 72 }}
        >
          <SectionHeader num="07" label="Contacto" />
          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem,5vw,3.5rem)",
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.05,
                  marginBottom: 20,
                }}
              >
                Trabajemos
                <br />
                <em style={{ color: "var(--sage)" }}>juntos.</em>
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--ink-muted)",
                  lineHeight: 1.7,
                  maxWidth: 360,
                }}
              >
                Disponible para proyectos freelance, posiciones full-time o
                simplemente para charlar sobre tecnología.
              </p>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <a
                href="mailto:matiasgimenez452@gmail.com"
                className="btn-primary"
                style={{ justifyContent: "center", padding: "14px 24px" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                matiasgimenez452@gmail.com
              </a>
              <div style={{ display: "flex", gap: 12 }}>
                <a
                  href="https://www.linkedin.com/in/matias-gimenez-1a7a172bb/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/MatiGimenezD"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 13,
              color: "var(--ink-muted)",
            }}
          >
            Matías Giménez · 2025
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { l: "GitHub", h: "https://github.com/MatiGimenezD" },
              {
                l: "LinkedIn",
                h: "https://www.linkedin.com/in/matias-gimenez-1a7a172bb/",
              },
              { l: "Email", h: "mailto:matiasgimenez452@gmail.com" },
            ].map((a) => (
              <a
                key={a.l}
                href={a.h}
                target={a.h.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="footer-link"
              >
                {a.l}
              </a>
            ))}
          </div>
        </footer>
      </main>

      <MediaModal mediaModal={mediaModal} setMediaModal={setMediaModal} />
      <CertificatePdfModal
        cert={pdfModalCert}
        onClose={() => setPdfModalCert(null)}
      />
      <PeekingBot />
    </>
  );
}

export default App;
