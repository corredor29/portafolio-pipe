import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarBackground from "../components/StarBackground";
import n8n from "../assets/n8n.png";
import hotel from "../assets/RinconCarmen.png";
import fastapi from "../assets/pythonfastapi.webp";
import luxtime from "../assets/luxtime.png";
import betplay from "../assets/bet.jpg";
import coleccion from "../assets/coleccion.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const projects = [
  {
    id: 1,
    title: "Hotel El Rincón del Carmen",
    description:
      "Sitio web funcional que permite a los clientes explorar el hotel, consultar disponibilidad y gestionar reservas, con un panel administrativo para controlar habitaciones y reservas.",
    image: hotel, 
    tags: ["HTML", "Css", "JavaScript" ],
    category: "Fullstack",
    github: "https://github.com/corredor29/Proyecto-de-js",
    demo: "https://hotelrincondelcarmenr.netlify.app",
    featured: true,
  },
  {
    id: 2,
    title: "Task Manager API",
    description:
      "API RESTful para gestión de tareas con autenticación JWT, roles de usuario y Registramiento de habitaciones.",
    image: fastapi,
    tags: ["Python", "FastAPI", "MySQL"],
    category: "Backend",
    github: "https://github.com/corredor29/fasapi-python-",
    demo: null,
    featured: false,
  },
  {
    id: 3,
    title: "LuxTime - Sitio Web Corporativo",
    description:
      "El objetivo es representar visualmente todas las páginas y funcionalidades principales de la marca, sin incluir lógica funcional ni backend.",
    image: luxtime,
    tags: ["HTML", "CSS"],
    category: "Frontend",
    github: "https://github.com/wen-27/proyecto-html",
    demo: "https://wen-27.github.io/proyecto-html/",
    featured: true,
  },
  {
    id: 4,
    title: "Liga Betplay - C#",
    description:
      "Simulación de la Liga BetPlay en consola usando POO, estructuras en memoria y LINQ. Permite registrar equipos, simular partidos, actualizar estadísticas y consultar métricas del torneo.",
    image: betplay,
    tags: ["C#", "POO", "LINQ"],
    category: "Backend",
    github: "https://github.com/corredor29/Liga_Betplay_cshap",
    demo: null,
    featured: true,
  },
  {
    id: 5,
    title: "Administrador de Colección",
    description:
      "Aplicación de consola en Python para gestionar colecciones personales de libros, películas o música, permitiendo organizar títulos, registrar detalles y valorar cada elemento de manera sencilla y estructurada.",
    image: coleccion,
    tags: ["Python", "POO"],
    category: "Backend",
    github: "https://github.com/wen-27/proyecto-python",
    demo: null,
    featured: false,
  },
  {
    id: 6,
    title: "Chat N8n AgendaBot",
    description:
      "AgendaBot es un bot en Telegram que gestiona citas, tareas y recordatorios, usando Google Sheets como base de datos ligera y manteniendo flujos coherentes con estados persistentes.",
    image: n8n,
    tags: [ "N8n", "Telegram API"],
    category: "Fullstack",
    github: "https://github.com/corredor29/proyecto-n8n-pipe",
    demo: null,
    featured: false,
  },
];

const categories = ["Todos", "Fullstack", "Frontend", "Backend"];

const categoryColors = {
  Fullstack: { bg: "bg-[#3b82f6]/10", text: "text-[#3b82f6]", border: "border-[#3b82f6]/20" },
  Frontend:  { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  Backend:   { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
};

// Placeholder visual when no image is provided
function ProjectPlaceholder({ title, category }) {
  const colors = {
    Fullstack: ["#3b82f6", "#1d4ed8"],
    Frontend:  ["#a855f7", "#7c3aed"],
    Backend:   ["#10b981", "#059669"],
  };
  const [c1, c2] = colors[category] || ["#3b82f6", "#1d4ed8"];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${title}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke={c1} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${title})`} />
      </svg>
      {/* Glowing orb */}
      <div
        className="absolute w-28 h-28 rounded-full blur-2xl opacity-30"
        style={{ background: `radial-gradient(circle, ${c1}, ${c2})` }}
      />
      {/* Icon */}
      <div
        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center border"
        style={{
          background: `linear-gradient(135deg, ${c1}22, ${c2}11)`,
          borderColor: `${c1}40`,
        }}
      >
        <span className="text-2xl">
          {category === "Frontend" ? "⚡" : category === "Backend" ? "🔧" : "🚀"}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const cat = categoryColors[project.category] || categoryColors.Fullstack;

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border border-white/8 bg-black/40 backdrop-blur-sm overflow-hidden
        hover:border-[#3b82f6]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.07)] flex flex-col"
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full
          bg-[#3b82f6]/15 border border-[#3b82f6]/30 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
          <span className="text-[9px] text-[#3b82f6] tracking-wider uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}>Destacado</span>
        </div>
      )}

      {/* Image / Placeholder */}
      <div className="relative h-44 bg-black/60 overflow-hidden border-b border-white/6">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <ProjectPlaceholder title={project.title} category={project.category} />
        )}
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-[#3b82f6]/8 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`} />
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/40 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-white leading-tight"
            style={{ fontFamily: "'Space Mono', monospace" }}>{project.title}</h3>
          <span className={`shrink-0 px-2 py-0.5 text-[9px] rounded-md border tracking-wider uppercase
            ${cat.bg} ${cat.text} ${cat.border}`}
            style={{ fontFamily: "'Space Mono', monospace" }}>
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-3 flex-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag}
              className="px-2 py-0.5 text-[10px] rounded border border-white/8 bg-white/4 text-gray-400"
              style={{ fontFamily: "'Space Mono', monospace" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2 pt-1 border-t border-white/6 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/8 bg-white/4
              hover:border-white/20 hover:bg-white/8 transition-all duration-200 text-gray-400 hover:text-white flex-1 justify-center"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px" }}
          >
            {/* GitHub icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#3b82f6]/25 bg-[#3b82f6]/8
                hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/15 transition-all duration-200 text-[#3b82f6] flex-1 justify-center"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Demo
            </a>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/4 bg-transparent
              text-gray-600 flex-1 justify-center cursor-not-allowed"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              Sin demo
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered = activeFilter === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="proyectos" className="relative w-full bg-black text-white overflow-hidden">

      <StarBackground density={100} shootingStars={false} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent z-[2]" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-900/6 rounded-full blur-[100px] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-28">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[#3b82f6] text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}>03 /</span>
          <span className="w-12 h-px bg-[#3b82f6]/40" />
          <span className="text-gray-500 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}>proyectos</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "'Space Mono', monospace" }}>
            Mis{" "}
            <span className="relative inline-block">
              <span className="text-[#3b82f6]">proyectos</span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#3b82f6]/40" />
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Una selección de proyectos que muestran mis habilidades en desarrollo
            fullstack, desde el diseño hasta el despliegue.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 mb-10 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs border transition-all duration-300
                ${activeFilter === cat
                  ? "border-[#3b82f6]/50 bg-[#3b82f6]/12 text-[#3b82f6]"
                  : "border-white/8 bg-black/40 text-gray-500 hover:border-white/16 hover:text-gray-300"
                }`}
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {cat}
              <span className={`ml-2 text-[9px] px-1.5 py-0.5 rounded
                ${activeFilter === cat ? "bg-[#3b82f6]/20 text-[#3b82f6]" : "bg-white/6 text-gray-600"}`}>
                {cat === "Todos" ? projects.length : projects.filter(p => p.category === cat).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-14"
        >
          <a
            href="https://github.com/corredor29"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-3.5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm
              text-sm text-gray-400 hover:border-[#3b82f6]/40 hover:text-white hover:bg-[#3b82f6]/8
              transition-all duration-300"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Ver más en GitHub
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent z-[2]" />
    </section>
  );
}

export default Projects;