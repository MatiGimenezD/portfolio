import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Lenis from "lenis";
import { GitHubCalendar } from "react-github-calendar";

// ─── ASSET PATH RESOLVER ───────────────────────────────────────────────────────
export const resolveAsset = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const clean = path.replace(/^\/?(portfolio\/|public\/)?/, "");
  return import.meta.env.BASE_URL + encodeURI(clean);
};

// ─── DATA: PROJECTS ───────────────────────────────────────────────────────────
export const mainProjects = [
  {
    id: "simplebuy",
    name: "SimpleBuy",
    subtitle: "Plataforma e-commerce para comercios locales",
    tag: "Backend & Web",
    category: "backend",
    status: { type: "live", label: "En Producción" },
    metrics: ["Multi-tienda", "Gestión de Pedidos", "API RESTful"],
    problem: "Los comercios locales carecían de un canal de ventas ágil y accesible, dependiendo de plataformas con altas comisiones o sistemas lentos.",
    solution: "Arquitectura web con backend desacoplado, catálogo autogestionable, procesamiento ágil de órdenes y panel de administración.",
    architecture: "Node.js, Express, MySQL, HTML5/CSS3. Diseño modular enfocado en bajo tiempo de respuesta, normalización de datos y escalabilidad de inventarios.",
    images: ["/ReelSimpleBuy10.mp4"],
    description: "Plataforma de comercio electrónico con backend robusto orientado a facilitar la creación y gestión integral de tiendas en línea.",
    links: [{ label: "Sitio Live", url: "https://simplebuy.com.ar/home" }],
    displayUrl: "https://simplebuy.com.ar",
    skills: ["Node.js", "Express", "MySQL", "REST APIs"],
  },
  {
    id: "citax",
    name: "Citax",
    subtitle: "Gestión de turnos inteligente & agente WhatsApp con IA",
    tag: "SaaS & IA",
    category: "backend",
    status: { type: "live", label: "En Producción" },
    metrics: ["Agente IA WhatsApp", "Turnos 24/7", "Multi-tenant"],
    problem: "Pérdida continua de clientes en centros profesionales y de salud por falta de atención inmediata en horarios no comerciales.",
    solution: "SaaS multi-usuario con motor de reservas sincronizado en tiempo real y agente de IA conectado a la API de WhatsApp para agendamiento autónomo.",
    architecture: "Node.js, Express, MongoDB, integración con APIs de IA y mensajería en tiempo real. Gestión de concurrencia y validación de turnos.",
    images: [
      "/www.citax.com.ar_.webp",
      "/www.citax.com.ar_ (1).webp",
      "/citaxchatwsp.webp",
    ],
    description: "SaaS con lógica de negocio avanzada: turnos concurrentes, agenda multi-sucursal y atención automatizada mediante agentes conversacionales.",
    links: [{ label: "Sitio Live", url: "https://www.citax.com.ar/" }],
    displayUrl: "https://www.citax.com.ar",
    skills: ["Node.js", "Express", "MongoDB", "IA Agents (WhatsApp)"],
  },
  {
    id: "club-judicial",
    name: "Club Judicial VM",
    subtitle: "Portal institucional & sistema de socios",
    tag: "Portal Web",
    category: "web",
    status: { type: "live", label: "En Producción" },
    metrics: ["Gestión Institucional", "Reservas de Predio"],
    problem: "Dispersión de información y trámites lentos para la reserva de instalaciones y consulta de beneficios por parte de socios.",
    solution: "Portal institucional centralizado con catálogo dinámico de actividades, reserva de espacios y vías de contacto directo.",
    architecture: "JavaScript, HTML5, CSS3, integración de formularios seguros y optimización para visualización en dispositivos móviles.",
    images: ["/clubjudicial1.webp", "/clubjudicial2.webp", "/clubjudicial3.webp"],
    description: "Sitio institucional y de gestión comunitaria para el Club Judicial de Villa Mercedes, con foco en accesibilidad y experiencia de usuario.",
    links: [{ label: "Sitio Live", url: "https://clubjudicialvm.com.ar/" }],
    displayUrl: "https://clubjudicialvm.com.ar",
    skills: ["JavaScript", "HTML/CSS", "Web Performance"],
  },
  {
    id: "ing-primera-persona",
    name: "Ingeniería en Primera Persona",
    subtitle: "Plataforma de conferencias profesionales (FICA-UNViMe)",
    tag: "Evento Académico",
    category: "web",
    status: { type: "open", label: "Evento Oficial" },
    metrics: ["+300 Asistentes", "Landing de Alta Concurrencia"],
    problem: "Necesidad de un canal unificado para la inscripción, difusión del cronograma de disertantes y acreditación de estudiantes.",
    solution: "Landing page institucional de carga ultra-rápida con agenda interactiva de expositores y sistema de registro.",
    architecture: "Desarrollo frontend responsivo sin sobrecarga de dependencias, optimización de assets estáticos y despliegue rápido.",
    images: ["/ingprimerapersona1.webp", "/ingprimerapersona.webp"],
    description: "Organización y plataforma web para el ciclo de conferencias profesionales de la Facultad de Ingeniería y Ciencias Agropecuarias (UNViMe).",
    links: [{ label: "Sitio Live", url: "https://ingprimerapersona.com.ar/" }],
    displayUrl: "https://ingprimerapersona.com.ar",
    skills: ["JavaScript", "Web Performance", "Git & CI/CD"],
  },
  {
    id: "will-it-rain",
    name: "Will it Rain? : NASA Space Apps",
    subtitle: "Análisis y predicción de lluvia con telemetría satelital NASA",
    tag: "Hackathon & Datos",
    category: "ia",
    status: { type: "open", label: "NASA Hackathon" },
    metrics: ["NASA GPM Telemetry", "Geolocalización", "Scoring Climático"],
    problem: "Dificultad de usuarios y productores agrícolas para interpretar datos satelitales complejos sobre precipitaciones inminentes.",
    solution: "Aplicación que procesa datasets del satélite GPM (Global Precipitation Measurement) de la NASA y traduce la información en pronósticos claros.",
    architecture: "Consumo y normalización de APIs satelitales NASA, cálculo de scoring de precipitación, geolocalización de coordenadas del usuario.",
    images: ["/willitrain.webp", "/willitrain1.webp"],
    description: "Proyecto galardonado en el NASA Space Apps Challenge para la interpretación intuitiva de métricas satelitales globales.",
    links: [
      { label: "Proyecto NASA", url: "https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/will-it-rain/" },
      { label: "Demo Live", url: "https://willitrain.com.ar" },
    ],
    displayUrl: "https://willitrain.com.ar",
    skills: ["JavaScript", "APIs & Data", "Node.js"],
  },
];

export const hobbyProjects = [
  {
    name: "DinoGoogle RedNeuronal",
    subtitle: "Red neuronal evolucionada por algoritmos genéticos desde cero",
    tag: "IA & Genética",
    category: "ia",
    status: { type: "open", label: "Experimento IA" },
    metrics: ["Algoritmos Genéticos", "Red FeedForward Propia"],
    problem: "Comprender la convergencia, pesos sinápticos y selección natural de agentes autónomos sin utilizar librerías de IA prefabricadas.",
    solution: "Motor en Java donde poblaciones de dinosaurios evolucionan generación a generación mediante cruce cromosómico, mutación y función fitness.",
    architecture: "Java, estructura de tensores propia, cálculo matricial para propagación hacia adelante y bucle de simulación a 60fps.",
    images: ["/dino.webp", "/dinoCharacter.webp"],
    description: "Implementación matemática completa de una red neuronal feedforward entrenada mediante algoritmos genéticos en Java puro.",
    links: [{ label: "Código en GitHub", url: "https://github.com/matigimenezd/DinoGoogle-RedNeuronal" }],
    displayUrl: "github.com/matigimenezd/DinoGoogle-RedNeuronal",
    skills: ["Java", "Algoritmos Genéticos", "Redes Neuronales"],
  },
  {
    name: "Snake Game AI",
    subtitle: "Agente autónomo con perceptrón multicapa en Java",
    tag: "IA Autónoma",
    category: "ia",
    status: { type: "open", label: "Red Neuronal" },
    metrics: ["Perceptrón Multicapa", "Navegación Espacial"],
    problem: "Modelado de toma de decisiones espaciales en tiempo real evitando auto-colisiones y esquivando paredes en rejilla bidimensional.",
    solution: "Agente autónomo guiado por inputs sensoriales de distancia que optimiza su recorrido hacia el objetivo minimizando riesgo.",
    architecture: "Java Swing, arquitectura sensorial vectorial de 8 direcciones y optimización de funciones de recompensa.",
    images: ["/snake.webp"],
    description: "Simulador del clásico juego de la serpiente entrenado para resolver estados complejos de espacio reducido.",
    links: [{ label: "Código en GitHub", url: "https://github.com/matigimenezd/Snake-RedNeuronal" }],
    displayUrl: "github.com/matigimenezd/Snake-RedNeuronal",
    skills: ["Java", "Redes Neuronales"],
  },
  {
    name: "Bot Inflación Día a Día",
    subtitle: "Scraping automatizado de precios & bot en X / Twitter",
    tag: "Scraping & Bots",
    category: "backend",
    status: { type: "live", label: "Bot Autónomo" },
    metrics: ["Scraping Diario", "Twitter API v2", "Cron Job"],
    problem: "Medir la variación real y de alta frecuencia de precios en supermercados argentinos sin esperar reportes mensuales desactualizados.",
    solution: "Worker programado que extrae miles de SKUs de cadenas de supermercados, calcula la inflación acumulada y publica gráficos diarios en Twitter/X.",
    architecture: "Python / Node.js, Web Scraping headless, procesamiento de series temporales, integración OAuth con API v2 de Twitter y cron workers.",
    images: ["/diabot1.webp", "/diabot.webp"],
    description: "Bot automatizado que recolecta precios diarios de la canasta básica y publica métricas de inflación de forma autónoma.",
    links: [{ label: "Cuenta en X", url: "https://x.com/BotSupermercado" }],
    displayUrl: "x.com/BotSupermercado",
    skills: ["Python", "Node.js", "Web Scraping", "Cron Workers"],
  },
  {
    name: "SIU Guaraní - Extensión",
    subtitle: "Cálculo en tiempo real de promedios académicos para estudiantes",
    tag: "Extensión Web",
    category: "backend",
    status: { type: "store", label: "Chrome Store" },
    metrics: ["+500 Usuarios", "DOM Injection", "Manifest V3"],
    problem: "El sistema universitario SIU Guaraní no calcula automáticamente el promedio general ni discrimina aplazos, forzando cálculos manuales tediosos.",
    solution: "Extensión de navegador que parsea el árbol de materias de la historia académica en tiempo real, proyectando promedios y porcentajes de carrera.",
    architecture: "Chrome Extensions API (Manifest V3), parser DOM síncrono, cálculo estadístico de correlatividades y almacenamiento local seguro.",
    images: ["/siuguarani.webp"],
    description: "Extensión activa en la Chrome Web Store utilizada por más de 500 universitarios de todo el país para calcular sus métricas académicas.",
    links: [
      { label: "Chrome Web Store", url: "https://chromewebstore.google.com/detail/mobhhadapaogikeffmlcicmfinnmheeh" },
      { label: "GitHub", url: "https://github.com/matigimenezd/SiuGuaraniPromedio" },
    ],
    displayUrl: "chrome.google.com/webstore",
    skills: ["JavaScript", "Chrome Extensions", "DOM Parsing"],
  },
  {
    name: "Parametrización 3D en SketchUp",
    subtitle: "Modelado técnico paramétrico & optimización de despieces",
    tag: "Modelado CAD",
    category: "web",
    status: { type: "open", label: "Modelado Técnico" },
    metrics: ["Componentes Dinámicos", "Optimización de Despiece"],
    problem: "Planos tradicionales de carpintería y arquitectura que no se adaptan automáticamente a cambios de medidas de clientes.",
    solution: "Modelado de piezas con fórmulas paramétricas que recalculan espesores, herrajes y planos de corte en tiempo real.",
    architecture: "SketchUp Dynamic Components, funciones de restricción dimensional y generación de documentación técnica de fabricación.",
    images: ["/muebles-parametrizados.webp"],
    description: "Desarrollo técnico de sistemas de mobiliario paramétrico donde cada pieza recalcula sus despieces ante cambios de escala.",
    links: [],
    displayUrl: "sketchup.com",
    skills: ["Modelado 3D", "Sistemas Paramétricos"],
  },
];

export const additionalProjects = [
  {
    name: "CTMI S.A.S.",
    subtitle: "Soporte Técnico Industrial & Automatización",
    tag: "Industrial",
    images: ["/ctmi-home.webp", "/www.ctmi.com.ar_.webp", "/www.ctmi.com.ar_ (1).webp"],
    description: "Portal corporativo para empresa de servicios electromecánicos industriales, montaje de tableros eléctricos y soporte técnico de planta en Villa Mercedes.",
    url: "https://www.ctmi.com.ar/",
  },
  {
    name: "Consultora Puerta de Augusta",
    subtitle: "Consultoría Estratégica & Mejora Continua",
    tag: "Corporativo",
    images: ["/consultora-home.webp", "/www.consultorapuertadeaugusta.com.ar_.webp"],
    description: "Sitio web corporativo enfocado en la presentación de servicios de asesoramiento empresarial, optimización de procesos y diagnóstico organizacional.",
    url: "https://www.consultorapuertadeaugusta.com.ar/",
  },
];

// ─── DATA: CERTIFICATIONS ─────────────────────────────────────────────────────
export const certifications = [
  {
    id: "google-cybersecurity",
    title: "Google Cybersecurity Professional Certificate (v.2)",
    issuer: "Google · Coursera",
    date: "Agosto 2026",
    badge: "/google-cybersecurity-badge.webp",
    pdfUrl: "/google-cybersecurity-certificate.pdf",
    credlyUrl: "https://www.credly.com/earner/earned/badge/d16ad120-9898-46f2-9d21-8d8f003ba6b0",
    description: "Certificación profesional oficial otorgada por Google a través de Coursera y verificada en Credly. Acredita competencias técnicas en detección de vulnerabilidades, respuesta ante incidentes, mitigación de riesgos de red, análisis forense de paquetes con Wireshark y automatización de procesos de ciberseguridad con Python y entornos Linux.",
    skills: [
      "Threat Detection & Exploits",
      "Linux Command Line & Admin",
      "Security Fundamentals",
      "Python Automation for Security",
      "SIEM & IDS/IPS Systems",
      "Packet Analysis (Wireshark)",
      "Incident Response Frameworks",
      "Network Architecture & Hardening",
    ],
    verified: true,
  },
];

// ─── DATA: STACK CAPABILITIES ─────────────────────────────────────────────────
const stackCapabilities = [
  {
    domain: "Backend & Arquitectura",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
        <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
      </svg>
    ),
    description: "Diseño de APIs RESTful, microservicios, autenticación segura y procesamiento asíncrono de tareas.",
    technologies: ["Node.js", "Express", "Python", "REST APIs", "JWT & Auth", "Cron Workers"],
    projectMap: {
      "Node.js": ["SimpleBuy", "Citax", "Will it Rain", "Bot Inflación"],
      "Express": ["SimpleBuy", "Citax"],
      "Python": ["Bot Inflación", "Google Cybersecurity", "NASA Telemetry"],
      "REST APIs": ["SimpleBuy", "Citax", "Will it Rain"],
      "JWT & Auth": ["SimpleBuy", "Citax"],
      "Cron Workers": ["Bot Inflación", "Citax"],
    },
  },
  {
    domain: "Bases de Datos & Datos",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    description: "Modelado relacional y NoSQL, integridad referencial, índices de alto rendimiento y pipelines de agregación.",
    technologies: ["MySQL", "MongoDB", "Data Modeling", "Transacciones", "Query Optimization"],
    projectMap: {
      "MySQL": ["SimpleBuy"],
      "MongoDB": ["Citax"],
      "Data Modeling": ["SimpleBuy", "Citax"],
      "Transacciones": ["SimpleBuy"],
      "Query Optimization": ["SimpleBuy", "Citax"],
    },
  },
  {
    domain: "Ciberseguridad & Sistemas",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    description: "Análisis de tráfico de red, hardening de servidores Linux, mitigación de vulnerabilidades y buenas prácticas OWASP.",
    technologies: ["Linux CLI", "Wireshark", "SIEM & IDS", "Threat Detection", "Incident Response"],
    projectMap: {
      "Linux CLI": ["Google Cybersecurity", "Bot Inflación"],
      "Wireshark": ["Google Cybersecurity"],
      "SIEM & IDS": ["Google Cybersecurity"],
      "Threat Detection": ["Google Cybersecurity"],
      "Incident Response": ["Google Cybersecurity"],
    },
  },
  {
    domain: "Automatización & Web",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    description: "Extracción web programática, extensiones de navegador y agentes conversacionales autónomos con IA.",
    technologies: ["Puppeteer", "Web Scraping", "IA Agents (WhatsApp)", "JavaScript ESNext", "Git & CI/CD"],
    projectMap: {
      "Puppeteer": ["Bot Inflación"],
      "Web Scraping": ["Bot Inflación", "SIU Guaraní"],
      "IA Agents (WhatsApp)": ["Citax"],
      "JavaScript ESNext": ["SimpleBuy", "Club Judicial VM", "SIU Guaraní"],
      "Git & CI/CD": ["SimpleBuy", "Citax", "NASA Hackathon"],
    },
  },
];

const navItems = [
  { label: "Sobre mí", id: "about" },
  { label: "Laboratorio", id: "lab" },
  { label: "Stack", id: "stack" },
  { label: "Certificaciones", id: "certifications" },
  { label: "Proyectos", id: "projects" },
  { label: "Hobby", id: "hobby" },
  { label: "Landings", id: "landings" },
  { label: "Contacto", id: "contact" },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
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
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
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
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

// ─── MUSIC EQUALIZER MICRO-WIDGET ───────────────────────────────────────────
function MusicEqualizer() {
  return (
    <div className="music-equalizer" title="Armonía & Ritmo de Sistemas">
      <span className="eq-bar" />
      <span className="eq-bar" />
      <span className="eq-bar" />
      <span className="eq-bar" />
      <span className="eq-bar" />
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

  const timeStr = time.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return <span className="hero-clock font-mono">{timeStr}</span>;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="nav-brand"
            aria-label="Inicio"
          >
            <span className="nav-brand-logo">MG.</span>
            <span className="nav-brand-badge font-mono">Backend Dev</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link ${active === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center" }}>
            <a href="mailto:matiasgimenez452@gmail.com" className="nav-cta">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Contacto</span>
            </a>

            {/* Mobile Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menú"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-overlay ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-nav-links">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`mobile-nav-link ${active === item.id ? "active" : ""}`}
            >
              <span>{item.label}</span>
              <span className="font-mono" style={{ fontSize: 12, color: "var(--text-faint)" }}>
                0{i + 1}
              </span>
            </button>
          ))}
          <a
            href="mailto:matiasgimenez452@gmail.com"
            className="btn-primary"
            style={{ marginTop: 24, justifyContent: "center" }}
          >
            Enviar Mensaje
          </a>
        </div>
      </div>
    </>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ num, label }) {
  return (
    <div className="section-header reveal">
      <span className="section-num">{num} //</span>
      <h2 className="section-title">{label}</h2>
      <div className="section-divider" />
    </div>
  );
}

// ─── MEDIA SLIDER ─────────────────────────────────────────────────────────────
function ProjectImageSlider({ images, onOpenGallery }) {
  const [idx, setIdx] = useState(0);
  const isVideo = images[0]?.endsWith(".mp4");

  useEffect(() => {
    setIdx(0);
  }, [images]);

  const handleNext = (e) => {
    e.stopPropagation();
    setIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="project-media-wrap"
      onClick={() => onOpenGallery && onOpenGallery(images)}
      title="Click para ampliar"
    >
      {isVideo ? (
        <video
          src={resolveAsset(images[0])}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className="project-media-el"
        />
      ) : (
        <img
          src={resolveAsset(images[idx])}
          alt="Vista previa del proyecto"
          loading="lazy"
          decoding="async"
          className="project-media-el"
        />
      )}

      {images.length > 1 && !isVideo && (
        <>
          <div className="project-media-controls">
            <button
              type="button"
              className="media-arrow"
              onClick={handlePrev}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="media-arrow"
              onClick={handleNext}
              aria-label="Siguiente imagen"
            >
              ›
            </button>
          </div>
          <div className="media-dots">
            {images.map((_, i) => (
              <div
                key={i}
                className={`media-dot ${i === idx ? "active" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── KNIGHT PATHFINDER (CHESS BFS) ───────────────────────────────────────────
function KnightPathCalculator() {
  const [start, setStart] = useState({ x: 3, y: 4 }); // d4
  const [target, setTarget] = useState({ x: 6, y: 1 }); // g7

  const path = useMemo(() => {
    if (start.x === target.x && start.y === target.y) return [start];
    const moves = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1],
    ];
    const queue = [[start]];
    const visited = new Set([`${start.x},${start.y}`]);

    while (queue.length > 0) {
      const currentPath = queue.shift();
      const curr = currentPath[currentPath.length - 1];

      for (const [dx, dy] of moves) {
        const nx = curr.x + dx;
        const ny = curr.y + dy;

        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
          const key = `${nx},${ny}`;
          if (!visited.has(key)) {
            visited.add(key);
            const nextPath = [...currentPath, { x: nx, y: ny }];
            if (nx === target.x && ny === target.y) {
              return nextPath;
            }
            queue.push(nextPath);
          }
        }
      }
    }
    return [start];
  }, [start, target]);

  const toAlgebraic = (pos) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
    return `${files[pos.x]}${ranks[pos.y]}`;
  };

  const pathStepIndex = (x, y) => {
    return path.findIndex((p) => p.x === x && p.y === y);
  };

  return (
    <div className="chess-interactive-wrap">
      <div className="chess-board-outer">
        <div className="chess-coords-x">
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="chess-coords-y">
            {["8", "7", "6", "5", "4", "3", "2", "1"].map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
          <div className="chess-board-grid">
            {Array.from({ length: 8 }).map((_, y) =>
              Array.from({ length: 8 }).map((_, x) => {
                const isLight = (x + y) % 2 === 0;
                const isStart = start.x === x && start.y === y;
                const isTarget = target.x === x && target.y === y;
                const step = pathStepIndex(x, y);
                const isPath = step > 0 && !isTarget;

                return (
                  <div
                    key={`${x}-${y}`}
                    className={`chess-tile ${isLight ? "tile-light" : "tile-dark"} ${
                      isStart ? "tile-start" : isTarget ? "tile-target" : isPath ? "tile-path" : ""
                    }`}
                    onClick={() => {
                      if (isStart) return;
                      setTarget({ x, y });
                    }}
                    title={`Casilla ${toAlgebraic({ x, y })}`}
                  >
                    {isStart && <span style={{ color: "#4ade80" }}>♞</span>}
                    {isTarget && !isStart && <span style={{ color: "#38bdf8", fontSize: 18 }}>✕</span>}
                    {step > 0 && <span className="chess-step-badge">{step}</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span className="tech-tag">Algoritmo BFS en Grafo Discreto</span>
          <span className="status-pill live">
            <span className="status-dot" /> {path.length - 1} {path.length - 1 === 1 ? "Salto" : "Saltos"}
          </span>
        </div>

        <h4 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
          Pathfinding del Caballo (Knight's Path)
        </h4>
        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 16 }}>
          Hacé click en cualquier casilla del tablero para calcular la secuencia óptima de movimientos que debe realizar el caballo mediante búsqueda en anchura (BFS).
        </p>

        <div style={{ background: "var(--bg-surface-elevated)", padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", marginBottom: 16 }}>
          <span className="font-mono" style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
            Secuencia Táctica:
          </span>
          <span className="font-mono" style={{ fontSize: 13, color: "var(--accent-emerald-light)" }}>
            {path.map((p, i) => (
              <span key={i}>
                {i === 0 ? `♞ ${toAlgebraic(p)}` : ` → ${toAlgebraic(p)}`}
              </span>
            ))}
          </span>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn-ghost"
            style={{ fontSize: 11 }}
            onClick={() => { setStart({ x: 1, y: 7 }); setTarget({ x: 5, y: 2 }); }}
          >
            b1 → f6 (Desarrollo)
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ fontSize: 11 }}
            onClick={() => { setStart({ x: 3, y: 4 }); setTarget({ x: 7, y: 0 }); }}
          >
            d4 → h8 (Rincón)
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ fontSize: 11 }}
            onClick={() => { setStart({ x: 0, y: 7 }); setTarget({ x: 7, y: 7 }); }}
          >
            a1 → h1 (Flanco a Flanco)
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── HARMONIC OSCILLOSCOPE (MUSIC & ACOUSTICS) ────────────────────────────────
function HarmonicOscilloscope() {
  const canvasRef = useRef(null);
  const [waveMode, setWaveMode] = useState("harmonics");
  const [freq, setFreq] = useState(2.5);

  useEffect(() => {
    let animId;
    let phase = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const render = () => {
      phase += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = waveMode === "sine" ? "#10b981" : waveMode === "harmonics" ? "#38bdf8" : "#c084fc";
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 10;

      for (let x = 0; x < w; x++) {
        const theta = (x / w) * Math.PI * 2 * freq + phase;
        let y = 0;
        if (waveMode === "sine") {
          y = Math.sin(theta);
        } else if (waveMode === "harmonics") {
          y = Math.sin(theta) + 0.45 * Math.sin(theta * 2) + 0.25 * Math.sin(theta * 3);
        } else {
          y = 0.7 * Math.sin(theta) + 0.3 * Math.sin(theta * 3) + 0.2 * Math.sin(theta * 5);
        }

        const py = h / 2 - y * 45;
        if (x === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [waveMode, freq]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <div>
          <span className="tech-tag" style={{ marginRight: 8 }}>Procesamiento de Señales & Síntesis</span>
          <span className="font-mono" style={{ fontSize: 11, color: "var(--accent-sky)" }}>
            BPM ~120 · Oscilador en Vivo
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { id: "sine", label: "Senoide Pura" },
            { id: "harmonics", label: "Armónicos Pares" },
            { id: "synth", label: "Timbre Complejo" },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              className={`filter-tab ${waveMode === m.id ? "active" : ""}`}
              style={{ fontSize: 10.5, padding: "4px 10px" }}
              onClick={() => setWaveMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} width={800} height={180} className="osc-canvas" />

      <div className="osc-controls-row">
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 220 }}>
          <span className="font-mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>Frecuencia:</span>
          <input
            type="range"
            min="1"
            max="6"
            step="0.1"
            value={freq}
            onChange={(e) => setFreq(parseFloat(e.target.value))}
            style={{ accentColor: "var(--accent-sky)", flex: 1 }}
          />
          <span className="font-mono" style={{ fontSize: 11, color: "var(--text-secondary)", width: 50 }}>
            {(freq * 110).toFixed(0)} Hz
          </span>
        </div>

        <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: 0, maxWidth: 460 }}>
          La precisión temporal del audio digital comparte los mismos fundamentos que el backend: sincronización de eventos asíncronos, gestión de buffers sin bloqueo y armonía arquitectónica.
        </p>
      </div>
    </div>
  );
}

// ─── A* PATHFINDER (PROBLEM SOLVING) ──────────────────────────────────────────
function AStarPathfinder() {
  const rows = 8;
  const cols = 16;
  const start = useMemo(() => ({ r: 1, c: 1 }), []);
  const target = useMemo(() => ({ r: 6, c: 14 }), []);

  const [walls, setWalls] = useState(() => {
    const s = new Set();
    [
      [1, 5], [2, 5], [3, 5], [4, 5],
      [3, 9], [4, 9], [5, 9], [6, 9],
      [4, 10], [4, 11],
    ].forEach(([r, c]) => s.add(`${r},${c}`));
    return s;
  });

  const [result, setResult] = useState({ path: [], visited: [] });

  const solveAStar = useCallback(() => {
    const h = (r, c) => Math.abs(r - target.r) + Math.abs(c - target.c);
    const openSet = [{ r: start.r, c: start.c, g: 0, f: h(start.r, start.c), parent: null }];
    const closedSet = new Set();
    const visitedOrder = [];

    let foundNode = null;

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();
      const currentKey = `${current.r},${current.c}`;

      if (current.r === target.r && current.c === target.c) {
        foundNode = current;
        break;
      }

      closedSet.add(currentKey);
      visitedOrder.push({ r: current.r, c: current.c });

      const neighbors = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
      ];

      for (const [dr, dc] of neighbors) {
        const nr = current.r + dr;
        const nc = current.c + dc;
        const nKey = `${nr},${nc}`;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !walls.has(nKey) && !closedSet.has(nKey)) {
          const tentativeG = current.g + 1;
          const existing = openSet.find((node) => node.r === nr && node.c === nc);

          if (!existing) {
            openSet.push({
              r: nr,
              c: nc,
              g: tentativeG,
              f: tentativeG + h(nr, nc),
              parent: current,
            });
          } else if (tentativeG < existing.g) {
            existing.g = tentativeG;
            existing.f = tentativeG + h(nr, nc);
            existing.parent = current;
          }
        }
      }
    }

    const path = [];
    let curr = foundNode;
    while (curr) {
      path.unshift({ r: curr.r, c: curr.c });
      curr = curr.parent;
    }

    setResult({ path, visited: visitedOrder });
  }, [walls, start.r, start.c, target.r, target.c]);

  useEffect(() => {
    solveAStar();
  }, [solveAStar]);

  const toggleWall = (r, c) => {
    if ((r === start.r && c === start.c) || (r === target.r && c === target.c)) return;
    setWalls((prev) => {
      const next = new Set(prev);
      const key = `${r},${c}`;
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const isPath = (r, c) => result.path.some((p) => p.r === r && p.c === c);
  const isVisited = (r, c) => result.visited.some((v) => v.r === r && v.c === c);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <div>
          <span className="tech-tag" style={{ marginRight: 8 }}>Búsqueda Heurística A* (A-Star)</span>
          <span className="font-mono" style={{ fontSize: 11, color: "var(--accent-purple)" }}>
            Nodos Explorados: {result.visited.length} · Longitud Óptima: {result.path.length}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            className="btn-primary"
            style={{ fontSize: 11, padding: "5px 12px" }}
            onClick={solveAStar}
          >
            Recalcular Ruta
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ fontSize: 11, padding: "5px 10px" }}
            onClick={() => setWalls(new Set())}
          >
            Limpiar Muros
          </button>
        </div>
      </div>

      <div
        className="path-grid-canvas"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const key = `${r},${c}`;
            const isS = r === start.r && c === start.c;
            const isT = r === target.r && c === target.c;
            const isW = walls.has(key);
            const inPath = isPath(r, c) && !isS && !isT;
            const inVisited = isVisited(r, c) && !isS && !isT && !inPath;

            return (
              <div
                key={key}
                className={`path-cell ${
                  isS ? "cell-start" : isT ? "cell-target" : isW ? "cell-wall" : inPath ? "cell-optimal" : inVisited ? "cell-visited" : ""
                }`}
                onClick={() => toggleWall(r, c)}
                title={isS ? "Inicio (S)" : isT ? "Destino (T)" : isW ? "Obstáculo" : `Casilla (${r},${c})`}
              >
                {isS ? "S" : isT ? "T" : ""}
              </div>
            );
          })
        )}
      </div>

      <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 10 }}>
        💡 Podés hacer click en cualquier celda para agregar o quitar obstáculos en tiempo real y observar cómo A* recalcula la trayectoria esquivando bloqueos.
      </p>
    </div>
  );
}

// ─── THINKING LAB SANDBOX WRAPPER ─────────────────────────────────────────────
function ThinkingLabSandbox() {
  const [tab, setTab] = useState("chess");

  return (
    <div className="lab-card reveal">
      <div className="lab-nav">
        <button
          type="button"
          className={`lab-nav-btn ${tab === "chess" ? "active" : ""}`}
          onClick={() => setTab("chess")}
        >
          <span style={{ fontSize: 14 }}>♞</span>
          <span>Ajedrez: Táctica & Pathfinding</span>
        </button>
        <button
          type="button"
          className={`lab-nav-btn ${tab === "music" ? "active" : ""}`}
          onClick={() => setTab("music")}
        >
          <span style={{ fontSize: 14 }}>♫</span>
          <span>Música: Síntesis & Frecuencias</span>
        </button>
        <button
          type="button"
          className={`lab-nav-btn ${tab === "astar" ? "active" : ""}`}
          onClick={() => setTab("astar")}
        >
          <span style={{ fontSize: 14 }}>⚡</span>
          <span>Algoritmos: Búsqueda A*</span>
        </button>
      </div>

      <div className="lab-content">
        {tab === "chess" && <KnightPathCalculator />}
        {tab === "music" && <HarmonicOscilloscope />}
        {tab === "astar" && <AStarPathfinder />}
      </div>
    </div>
  );
}

// ─── PHILOSOPHY CARDS (CHESS · MUSIC · ALGORITHMS) ───────────────────────────
function PhilosophyCards() {
  return (
    <div className="philosophy-grid reveal reveal-delay-2">
      <div className="philosophy-card chess">
        <div className="philosophy-header">
          <div className="philosophy-icon">♞</div>
          <div>
            <h4 className="philosophy-title">Ajedrez & Táctica</h4>
            <span className="philosophy-tag">Árboles de Decisión</span>
          </div>
        </div>
        <p className="philosophy-body">
          El ajedrez me enseñó a no ejecutar el primer movimiento aparente, sino a calcular variantes en profundidad (Minimax), evaluar trade-offs estructurales y prever fallas en sistemas antes de que ocurran en producción.
        </p>
        <span className="philosophy-quote">"Planificar a 3 jugadas vista antes de escribir una línea de código."</span>
      </div>

      <div className="philosophy-card music">
        <div className="philosophy-header">
          <div className="philosophy-icon">♫</div>
          <div>
            <h4 className="philosophy-title">Música & Acústica</h4>
            <span className="philosophy-tag">Ritmo & Concurrencia</span>
          </div>
        </div>
        <p className="philosophy-body">
          La producción musical y el tratamiento de señales comparten la misma disciplina que el backend: sincronización milimétrica, control de latencia en buffers, composición modular y balance de frecuencias.
        </p>
        <span className="philosophy-quote">"Un backend robusto funciona como una orquesta sinfónica bien sincronizada."</span>
      </div>

      <div className="philosophy-card logic">
        <div className="philosophy-header">
          <div className="philosophy-icon">⚡</div>
          <div>
            <h4 className="philosophy-title">Resolución de Problemas</h4>
            <span className="philosophy-tag">Pensamiento Algorítmico</span>
          </div>
        </div>
        <p className="philosophy-body">
          Modelar problemas como grafos discretos. Descomponer sistemas complejos en estados atómicos, encontrar el camino óptimo y minimizar la complejidad espacial y temporal (Big O).
        </p>
        <span className="philosophy-quote">"Deconstruir problemas grandes en piezas fundamentales e invariantes."</span>
      </div>
    </div>
  );
}

// ─── TECHNICAL DETAIL MODAL ───────────────────────────────────────────────────
function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-case-study" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <span className="tech-tag">{project.tag}</span>
              {project.status && (
                <span className={`status-pill ${project.status.type}`}>
                  <span className="status-dot" />
                  {project.status.label}
                </span>
              )}
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              {project.name}
            </h2>
            <p style={{ fontSize: 13.5, color: "var(--accent-emerald-light)", marginTop: 2 }}>{project.subtitle}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
            {project.metrics.map((m, i) => (
              <span key={i} className="metric-chip">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                {m}
              </span>
            ))}
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <p className="case-section-title">El Desafío</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)" }}>
            {project.problem || project.description}
          </p>
        </div>

        {project.solution && (
          <div style={{ marginBottom: 20 }}>
            <p className="case-section-title">La Solución</p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)" }}>
              {project.solution}
            </p>
          </div>
        )}

        {project.architecture && (
          <div style={{
            background: "var(--bg-surface-elevated)",
            padding: "16px 20px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            marginBottom: 24,
          }}>
            <p className="case-section-title">Arquitectura & Stack Técnico</p>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)" }}>
              {project.architecture}
            </p>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: "auto" }}>
          {project.links && project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ fontSize: 12, padding: "8px 18px" }}
            >
              {link.label}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          ))}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ fontSize: 12, padding: "8px 18px" }}
            >
              Ver Sitio Live
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MEDIA LIGHTBOX MODAL ─────────────────────────────────────────────────────
function MediaModal({ mediaModal, onClose }) {
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    setModalIndex(0);
  }, [mediaModal]);

  useEffect(() => {
    if (!mediaModal) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setModalIndex((p) => (p + 1) % mediaModal.length);
      if (e.key === "ArrowLeft") setModalIndex((p) => (p - 1 + mediaModal.length) % mediaModal.length);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mediaModal, onClose]);

  if (!mediaModal || !mediaModal.length) return null;

  const currentMedia = mediaModal[modalIndex];
  const isVideo = currentMedia.endsWith(".mp4");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <button
        className="modal-close-btn"
        style={{ position: "absolute", top: 24, right: 24, zIndex: 1010 }}
        onClick={onClose}
        aria-label="Cerrar modal"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {mediaModal.length > 1 && (
        <>
          <button
            className="media-arrow"
            style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", zIndex: 1010, width: 44, height: 44, fontSize: 24 }}
            onClick={(e) => {
              e.stopPropagation();
              setModalIndex((p) => (p - 1 + mediaModal.length) % mediaModal.length);
            }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            className="media-arrow"
            style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", zIndex: 1010, width: 44, height: 44, fontSize: 24 }}
            onClick={(e) => {
              e.stopPropagation();
              setModalIndex((p) => (p + 1) % mediaModal.length);
            }}
            aria-label="Siguiente"
          >
            ›
          </button>
        </>
      )}

      <div className="modal-media" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video
            key={currentMedia}
            src={resolveAsset(currentMedia)}
            controls
            autoPlay
            style={{ maxHeight: "84vh", width: "auto", maxWidth: "90vw" }}
          />
        ) : (
          <img
            key={currentMedia}
            src={resolveAsset(currentMedia)}
            alt="Detalle del proyecto"
            style={{ maxHeight: "84vh", width: "auto", maxWidth: "90vw", objectFit: "contain" }}
          />
        )}
      </div>
    </div>
  );
}

// ─── PDF CERTIFICATE MODAL ────────────────────────────────────────────────────
function CertificatePdfModal({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [cert, onClose]);

  if (!cert) return null;

  const pdfUrl = resolveAsset(cert.pdfUrl);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-pdf" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <span className="status-pill live" style={{ marginBottom: 4 }}>
              <span className="status-dot" /> Credencial Verificada
            </span>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{cert.title}</h2>
            <p style={{ fontSize: 12, color: "var(--text-faint)" }}>{cert.issuer} · {cert.date}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={{ flex: 1, minHeight: 0, borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            title={cert.title}
            width="100%"
            height="100%"
            style={{ border: "none", background: "#111" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
          <a
            href={cert.credlyUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ fontSize: 12, padding: "8px 16px" }}
          >
            Verificar en Credly
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a
            href={pdfUrl}
            download="GoogleCybersecurityProfessionalCertificate_MatiasGimenez.pdf"
            className="btn-secondary"
            style={{ fontSize: 12, padding: "8px 16px" }}
          >
            Descargar Documento PDF
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────
function App() {
  const [mediaModal, setMediaModal] = useState(null);
  const [pdfModalCert, setPdfModalCert] = useState(null);
  const [detailProject, setDetailProject] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [projectFilter, setProjectFilter] = useState("all");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const active = useActiveSection();
  useSmoothScroll();
  useScrollReveal();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("matiasgimenez452@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const filteredProjects = useMemo(() => {
    if (projectFilter === "all") return mainProjects;
    return mainProjects.filter((p) => p.category === projectFilter);
  }, [projectFilter]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const S = { maxWidth: 1040, margin: "0 auto", padding: "80px 24px" };

  return (
    <>
      <Navbar active={active} />

      <main>
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="reveal">
            <div className="hero-status-bar">
              <div className="hero-status-dot-wrap">
                <span className="hero-status-pulse" />
                <span className="hero-status-dot" />
              </div>
              <span className="hero-status-text">Disponible para proyectos</span>
              <span className="font-mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>
                San Luis, AR (UTC-3)
              </span>
              <LiveClock />

              <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 8, borderLeft: "1px solid var(--border-subtle)" }}>
                <MusicEqualizer />
                <span className="font-mono" style={{ fontSize: 10.5, color: "var(--accent-emerald-light)" }}>
                  Lógica & Armonía
                </span>
              </div>
            </div>

            <h1 className="hero-name text-gradient">
              Matías Giménez
            </h1>
            <p className="hero-subtitle">
              Backend Developer & Analista en Sistemas
            </p>

            <p className="hero-bio">
              Construyo <strong>arquitecturas backend robustas</strong>, APIs escalables y algoritmos de alta precisión. Inspirado por la estrategia táctica del ajedrez, la armonía y sincronización de la música y la resolución formal de problemas informáticos.
            </p>

            <div className="hero-actions">
              <button onClick={() => scrollTo("projects")} className="btn-primary">
                Ver Proyectos en Producción
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>

              <button onClick={() => scrollTo("lab")} className="btn-secondary">
                <span>♞</span>
                <span>Laboratorio Interactivo</span>
              </button>

              <button onClick={() => scrollTo("certifications")} className="btn-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Certificación Google
              </button>

              <button onClick={handleCopyEmail} className="btn-ghost" title="Copiar email">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {copiedEmail ? "¡Email Copiado!" : "matiasgimenez452@gmail.com"}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-grid reveal reveal-delay-1">
            <div className="hero-metric-card">
              <div className="hero-metric-val">
                +6
                <span className="status-dot" style={{ background: "var(--accent-emerald)" }} />
              </div>
              <div className="hero-metric-label">Proyectos en Producción (SaaS, E-commerce, Portales)</div>
            </div>

            <div className="hero-metric-card">
              <div className="hero-metric-val">
                Google Cert
              </div>
              <div className="hero-metric-label">Ciberseguridad Profesional verificada en Credly</div>
            </div>

            <div className="hero-metric-card">
              <div className="hero-metric-val">
                UNViMe / FICA
              </div>
              <div className="hero-metric-label">Analista en Sistemas & Estudiante avanzado de Ingeniería</div>
            </div>

            <div className="hero-metric-card">
              <div className="hero-metric-val">
                Stack Core
              </div>
              <div className="hero-metric-label">Node.js · Express · MySQL · MongoDB · Python</div>
            </div>
          </div>
        </section>

        {/* 01: ABOUT ME */}
        <section id="about" style={S}>
          <SectionHeader num="01" label="Sobre Mí & Enfoque" />

          <div className="about-grid">
            {/* Spec Sheet */}
            <div className="spec-sheet reveal">
              <div className="spec-sheet-header">
                <span className="spec-sheet-title font-mono">Ficha Técnica</span>
                <span className="status-pill live">
                  <span className="status-dot" /> Activo
                </span>
              </div>

              <div className="spec-row">
                <span className="spec-label">Perfil</span>
                <span className="spec-val">Backend Developer / Analista de Sistemas</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Formación</span>
                <span className="spec-val">Ingeniería en Sistemas de Información (Avanzado)</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Universidad</span>
                <span className="spec-val">UNViMe / FICA</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Ubicación</span>
                <span className="spec-val">Villa Mercedes, San Luis, Argentina</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Idiomas</span>
                <span className="spec-val">Español (Nativo) · Inglés (B2)</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Intereses</span>
                <span className="spec-val">Ajedrez Táctico, Acústica & Algoritmos</span>
              </div>
            </div>

            {/* Narrative Bio */}
            <div className="about-text reveal reveal-delay-1">
              <p>
                Soy Analista en Sistemas y desarrollador con fuerte vocación hacia la <strong>ingeniería de software backend</strong>. Mi enfoque combina rigor arquitectónico con pragmatismo de producto: priorizo código limpio, mantenible, tiempos de respuesta óptimos y sistemas que toleren cargas de trabajo reales.
              </p>
              <p>
                Cuento con experiencia en la construcción de plataformas SaaS multi-tenant, integración de APIs de mensajería con modelos de lenguaje para agendamiento automatizado, procesamiento de series temporales mediante web scraping continuo y diseño de bases de datos relacionales normalizadas.
              </p>
              <p>
                Complemento el desarrollo backend con una sólida formación en <strong>ciberseguridad operativa</strong> (Google Certified), lo que me permite diseñar sistemas con seguridad desde la concepción (Security by Design), mitigando riesgos de inyección, accesos no autorizados y fallos de configuración.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 24 }}>
                {["Arquitectura REST", "Node.js", "Express", "Python", "MySQL", "MongoDB", "Linux", "OWASP Security", "Git"].map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Strategic Philosophy Cards */}
          <PhilosophyCards />

          {/* GitHub Activity Card */}
          <div className="calendar-card reveal reveal-delay-2">
            <div className="calendar-card-header">
              <div className="calendar-card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                Actividad de Código en GitHub (@MatiGimenezD)
              </div>
              <a
                href="https://github.com/MatiGimenezD"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{ fontSize: 11 }}
              >
                Ver Perfil ↗
              </a>
            </div>

            <div style={{ width: "100%", overflowX: "auto", display: "flex", justifyContent: "center" }}>
              <GitHubCalendar
                username="MatiGimenezD"
                colorScheme="dark"
                blockSize={11}
                blockMargin={4}
                fontSize={12}
                theme={{
                  dark: ["#161920", "#143a29", "#1b5a3f", "#1f875b", "#10b981"],
                }}
              />
            </div>
          </div>
        </section>

        {/* 02: THINKING LAB (CHESS · MUSIC · ALGORITHMS) */}
        <section id="lab" style={S}>
          <SectionHeader num="02" label="Laboratorio Interactivo: Ajedrez, Acústica & Algoritmos" />

          <p className="reveal" style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>
            Un espacio interactivo que demuestra la aplicación práctica de algoritmos de búsqueda, teoría de señales acústicas y cálculo táctico.
          </p>

          <ThinkingLabSandbox />
        </section>

        {/* 03: STACK & CAPABILITIES */}
        <section id="stack" style={S}>
          <SectionHeader num="03" label="Stack Tecnológico & Capacidades" />

          <p className="reveal" style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>
            Hacé click en cualquier tecnología para ver los proyectos específicos donde fue implementada.
          </p>

          <div className="stack-matrix">
            {stackCapabilities.map((cat, i) => (
              <div key={cat.domain} className="stack-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="stack-card-header">
                  <div className="stack-card-icon">{cat.icon}</div>
                  <h3 className="stack-card-name">{cat.domain}</h3>
                </div>
                <p className="stack-card-desc">{cat.description}</p>

                <div className="stack-chips-wrap">
                  {cat.technologies.map((tech) => {
                    const isSelected = selectedTech?.tech === tech;
                    const related = cat.projectMap[tech] || [];
                    return (
                      <button
                        key={tech}
                        type="button"
                        className={`stack-chip-interactive ${isSelected ? "active" : ""}`}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedTech(null);
                          } else {
                            setSelectedTech({ tech, projects: related });
                          }
                        }}
                      >
                        {tech}
                        {related.length > 0 && (
                          <span style={{ opacity: 0.6, fontSize: 10, marginLeft: 4 }}>
                            ({related.length})
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Stack Inspector */}
          {selectedTech && (
            <div className="stack-inspector-banner">
              <div className="stack-inspector-text">
                Implementación de <strong>{selectedTech.tech}</strong> en proyectos:
              </div>
              <div className="stack-inspector-projects">
                {selectedTech.projects.length > 0 ? (
                  selectedTech.projects.map((pName) => (
                    <button
                      key={pName}
                      type="button"
                      className="btn-primary"
                      style={{ fontSize: 11, padding: "5px 12px" }}
                      onClick={() => {
                        const target = mainProjects.find((p) => p.name === pName) ||
                                       hobbyProjects.find((p) => p.name === pName);
                        if (target) setDetailProject(target);
                      }}
                    >
                      {pName} ↗
                    </button>
                  ))
                ) : (
                  <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
                    Conocimiento técnico transversal en desarrollo e investigación.
                  </span>
                )}
                <button
                  type="button"
                  className="btn-ghost"
                  style={{ fontSize: 11, padding: "4px 8px" }}
                  onClick={() => setSelectedTech(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 04: CERTIFICATIONS */}
        <section id="certifications" style={S}>
          <SectionHeader num="04" label="Certificación Profesional" />

          {certifications.map((cert) => (
            <article key={cert.id} className="cert-card-elite reveal">
              <div className="cert-badge-box">
                <img
                  src={resolveAsset(cert.badge)}
                  alt={cert.title}
                  className="cert-badge-img"
                />
              </div>

              <div>
                <div className="cert-meta-row">
                  <span className="cert-verified-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Credencial Oficial Verificada
                  </span>
                  <span className="font-mono" style={{ fontSize: 12, color: "var(--text-faint)" }}>
                    Emitido en {cert.date}
                  </span>
                </div>

                <h3 className="cert-title-elite">{cert.title}</h3>
                <p className="cert-issuer-row">
                  Programa oficial de especialización emitido por <strong>{cert.issuer}</strong>
                </p>

                <p className="cert-desc-text">{cert.description}</p>

                <div className="cert-skills-grid">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="cert-skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="cert-actions-elite">
                  <a
                    href={cert.credlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ fontSize: 12 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Verificar Credencial en Credly
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>

                  <button
                    type="button"
                    onClick={() => setPdfModalCert(cert)}
                    className="btn-secondary"
                    style={{ fontSize: 12 }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Previsualizar PDF Oficial
                  </button>

                  <a
                    href={resolveAsset(cert.pdfUrl)}
                    download="GoogleCybersecurityCertificate_MatiasGimenez.pdf"
                    className="btn-ghost"
                    style={{ fontSize: 12 }}
                  >
                    Descargar PDF
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* 05: PROJECTS */}
        <section id="projects" style={S}>
          <SectionHeader num="05" label="Proyectos en Producción" />

          {/* Filter Bar */}
          <div className="project-filter-container reveal">
            {[
              { id: "all", label: "Todos los Proyectos" },
              { id: "backend", label: "Backend & SaaS" },
              { id: "ia", label: "IA & Hackathon" },
              { id: "web", label: "Plataformas Web" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-tab ${projectFilter === f.id ? "active" : ""}`}
                onClick={() => setProjectFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((p, i) => (
              <article key={p.name} className="project-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <ProjectImageSlider images={p.images} onOpenGallery={(arr) => setMediaModal(arr)} />

                <div className="project-content">
                  <div className="project-header-row">
                    <span className="tech-tag">{p.tag}</span>
                    {p.status && (
                      <span className={`status-pill ${p.status.type}`}>
                        <span className="status-dot" />
                        {p.status.label}
                      </span>
                    )}
                  </div>

                  <h3 className="project-title">{p.name}</h3>
                  <p className="project-subtitle">{p.subtitle}</p>

                  {p.metrics && (
                    <div className="project-metrics-row">
                      {p.metrics.map((m, idx) => (
                        <span key={idx} className="metric-chip">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="project-desc">{p.problem || p.description}</p>

                  <div className="project-footer-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ fontSize: 11, padding: "6px 14px" }}
                      onClick={() => setDetailProject(p)}
                    >
                      Ficha Técnica Completa
                    </button>

                    <div style={{ display: "flex", gap: 8 }}>
                      {p.links && p.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary"
                          style={{ fontSize: 11, padding: "6px 14px" }}
                        >
                          {link.label}
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 06: HOBBY & RESEARCH */}
        <section id="hobby" style={S}>
          <SectionHeader num="06" label="Proyectos de Investigación & Hobby" />
          <p className="reveal" style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>
            Experimentos con algoritmos evolutivos, redes neuronales sin librerías, scraping masivo y extensiones de navegador.
          </p>

          <div className="hobby-grid">
            {hobbyProjects.map((p, i) => (
              <article key={p.name} className="hobby-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="hobby-card-header">
                  <span className="tech-tag">{p.tag}</span>
                  {p.status && (
                    <span className={`status-pill ${p.status.type}`}>
                      <span className="status-dot" />
                      {p.status.label}
                    </span>
                  )}
                </div>

                <h3 className="hobby-card-title">{p.name}</h3>
                <p className="hobby-card-sub">{p.subtitle}</p>

                <p className="hobby-card-desc">{p.description}</p>

                {p.metrics && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                    {p.metrics.map((m, idx) => (
                      <span key={idx} className="metric-chip">
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", gap: 8, marginTop: "auto", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ fontSize: 11, padding: "6px 12px" }}
                    onClick={() => setDetailProject(p)}
                  >
                    Detalles
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
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 07: CLIENT LANDINGS */}
        <section id="landings" style={S}>
          <SectionHeader num="07" label="Landing Pages & Clientes" />

          <div className="landings-grid">
            {additionalProjects.map((p, i) => (
              <article key={p.name} className="landing-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div
                  className="landing-media"
                  onClick={() => setMediaModal(p.images)}
                  style={{ cursor: "pointer" }}
                  title="Ver imagen"
                >
                  <img
                    src={resolveAsset(p.images[0])}
                    alt={p.name}
                    loading="lazy"
                  />
                </div>
                <div className="landing-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span className="tech-tag">{p.tag}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--accent-emerald-light)", marginBottom: 12 }}>
                    {p.subtitle}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
                    {p.description}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                    style={{ alignSelf: "flex-start", fontSize: 11 }}
                  >
                    Visitar Sitio Web ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 08: CONTACT */}
        <section id="contact" style={S}>
          <SectionHeader num="08" label="Contacto Profesional" />

          <div className="contact-container reveal">
            <div>
              <h2 className="contact-heading text-gradient">
                Construyamos software que escale.
              </h2>
              <p className="contact-lead">
                Disponible para integrarme a equipos de ingeniería backend, consultoría técnica de arquitectura de software o proyectos con desafíos complejos de integración y rendimiento.
              </p>
            </div>

            <div className="contact-box">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="contact-email-btn"
                title="Copiar email al portapapeles"
              >
                <span>matiasgimenez452@gmail.com</span>
                <span className="font-mono" style={{ fontSize: 11, color: copiedEmail ? "var(--accent-emerald-light)" : "var(--text-faint)" }}>
                  {copiedEmail ? "✓ Copiado" : "Copiar"}
                </span>
              </button>

              <div className="contact-social-row">
                <a
                  href="https://www.linkedin.com/in/matias-gimenez-1a7a172bb/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>

                <a
                  href="https://github.com/MatiGimenezD"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer">
          <div>
            <span>Matías Giménez · {new Date().getFullYear()}</span>
            <span style={{ margin: "0 8px" }}>·</span>
            <span className="font-mono" style={{ fontSize: 11 }}>Backend & Systems Engineering</span>
          </div>

          <div className="footer-links">
            <a href="https://github.com/MatiGimenezD" target="_blank" rel="noreferrer" className="footer-link">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/matias-gimenez-1a7a172bb/" target="_blank" rel="noreferrer" className="footer-link">
              LinkedIn
            </a>
            <a href="mailto:matiasgimenez452@gmail.com" className="footer-link">
              Email
            </a>
          </div>
        </footer>
      </main>

      {/* MODALS */}
      <MediaModal mediaModal={mediaModal} onClose={() => setMediaModal(null)} />
      <ProjectDetailModal project={detailProject} onClose={() => setDetailProject(null)} />
      <CertificatePdfModal cert={pdfModalCert} onClose={() => setPdfModalCert(null)} />
    </>
  );
}

export default App;
