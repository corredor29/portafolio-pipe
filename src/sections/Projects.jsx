import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/useLang";
import { t } from "../context/translations";
import n8n from "../assets/n8n.png";
import hotel from "../assets/RinconCarmen.png";
import fastapi from "../assets/pythonfastapi.webp";
import luxtime from "../assets/luxtime.png";
import betplay from "../assets/bet.jpg";
import coleccion from "../assets/coleccion.jpg";
import smartinventory from "../assets/smartinventory.png";
import autotaller from "../assets/autotaller.png";
import nexusodonto from "../assets/nexusodonto.png";

const EXPO = [0.22, 1, 0.36, 1];
const MONO = { fontFamily: "'Space Mono', monospace" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };
const DISPLAY = { fontFamily: "'Anton', sans-serif" };
const C = { deep: "#191D23", accent: "#57707A", steel: "#7B919C", mist: "#989DAA", rose: "#C5BAC4", ink: "#DEDCDC" };

const projects = [
  { id: 1, title: "Hotel El Rincón del Carmen", image: hotel, tags: ["HTML", "CSS", "JavaScript"], category: "Fullstack", github: "https://github.com/corredor29/Proyecto-de-js", demo: "https://hotelrincondelcarmenr.netlify.app", featured: false },
  { id: 2, title: "Task Manager API", image: fastapi, tags: ["Python", "FastAPI", "MySQL"], category: "Backend", github: "https://github.com/corredor29/fasapi-python-", demo: null, featured: false },
  { id: 3, title: "LuxTime - Corporate Website", image: luxtime, tags: ["HTML", "CSS"], category: "Frontend", github: "https://github.com/wen-27/proyecto-html", demo: "https://wen-27.github.io/proyecto-html/", featured: false },
  { id: 4, title: "Liga Betplay - C#", image: betplay, tags: ["C#", "POO", "LINQ"], category: "Backend", displayTitle: "Liga Betplay", subtitle: "C# — consola", github: "https://github.com/corredor29/Liga_Betplay_cshap", demo: null, featured: false },
  { id: 5, title: "Collection Manager", image: coleccion, tags: ["Python", "POO"], category: "Backend", github: "https://github.com/wen-27/proyecto-python", demo: null, featured: false },
  { id: 6, title: "Chat N8n AgendaBot", image: n8n, tags: ["N8n", "Telegram API"], category: "Fullstack", github: "https://github.com/corredor29/proyecto-n8n-pipe", demo: null, featured: false },
  { id: 7, title: "Smart Inventory", displayTitle: "Smart Inventory", subtitle: "SMART//INV — catálogo táctico", image: smartinventory, tags: ["React", "API", "Chatbot"], category: "Fullstack", github: "https://github.com/corredor29/smartinventory-frontend", repos: [{ label: "Frontend", url: "https://github.com/corredor29/smartinventory-frontend" }, { label: "API", url: "https://github.com/corredor29/SmartInventoryAPI" }, { label: "Chatbot", url: "https://github.com/corredor29/smartinventory-chatbot" }], demo: null, featured: false },
  { id: 8, title: "AutoTaller Management System", displayTitle: "AutoTaller", subtitle: ".NET — taller & facturación", image: autotaller, tags: [".NET", "C#", "React"], category: "Fullstack", github: "https://github.com/corredor29/AutoTallerManager_ProyectNET", repos: [{ label: "Backend", url: "https://github.com/corredor29/AutoTallerManager_ProyectNET" }, { label: "Front", url: "https://github.com/corredor29/Proyect.net-Front" }], demo: null, featured: false },
  { id: 9, title: "NexusOdonto", displayTitle: "NexusOdonto", subtitle: "Portal clínico — frontend", image: nexusodonto, tags: ["React", "UI", "Clínica"], category: "Frontend", github: "https://github.com/NexusOdonto", demo: null, featured: true },
];

const BLURBS = {
  es: {
    7: { text: "Inventario / e-commerce táctico con catálogo, API y chatbot. Front + SmartInventoryAPI + chatbot para gestionar equipos, stock y soporte.", features: ["Catálogo táctico con filtros", "API REST de inventario y stock", "Chatbot de soporte integrado"] },
    8: { text: "Sistema de gestión de taller (.NET + front): clientes, vehículos, órdenes de servicio, inventario y facturación en un solo lugar.", features: ["Clientes y vehículos", "Órdenes de servicio", "Inventario y facturación"] },
    9: { text: "Portal clínico odontológico: citas, información del paciente y seguimiento desde una experiencia frontend cuidada (org NexusOdonto).", features: ["Gestión de citas", "Ficha del paciente", "Seguimiento clínico"] },
  },
  en: {
    7: { text: "Tactical inventory / e-commerce with catalog, API and chatbot. Frontend + SmartInventoryAPI + chatbot to manage gear, stock and support.", features: ["Tactical catalog with filters", "Inventory and stock REST API", "Built-in support chatbot"] },
    8: { text: "Workshop management system (.NET + frontend): customers, vehicles, service orders, inventory and billing in one place.", features: ["Customers and vehicles", "Service orders", "Inventory and billing"] },
    9: { text: "Dental clinic portal: appointments, patient information and follow-up through a carefully crafted frontend experience (NexusOdonto org).", features: ["Appointment management", "Patient records", "Clinical follow-up"] },
  },
};

const blurb = (lang, id) => (BLURBS[lang] || BLURBS.es)[id];
const descOf = (tx, lang, id) => tx.descriptions?.[id] || blurb(lang, id)?.text || "";
const shortTitle = (p) => p.displayTitle || p.title.split(" - ")[0];

const pad = (n) => String(n).padStart(2, "0");

const COPY = {
  es: { kicker: "03 — Trabajo", title: "Proyectos", lead: "Una selección de trabajo real: backend, frontend y automatización, construido de punta a punta.", feat: "Caso destacado", list: "Índice", stack: "Stack" },
  en: { kicker: "03 — Work", title: "Projects", lead: "A selection of real work: backend, frontend and automation, built end to end.", feat: "Featured case", list: "Index", stack: "Stack" },
};

const reveal = {
  hidden: { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
  show: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", transition: { duration: 0.9, ease: EXPO } },
};

function GitHubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function Preview({ project, tx, lang, copy, onOpen }) {
  return (
    <div className="relative h-full" style={{ perspective: "1600px" }}>
      <AnimatePresence initial={false}>
        <motion.article key={project.id}
          initial={{ opacity: 0, rotateY: -4, clipPath: "inset(0 0 0 100%)" }}
          animate={{ opacity: 1, rotateY: -4, clipPath: "inset(0 0 0 0%)" }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: EXPO } }}
          transition={{ duration: 0.75, ease: EXPO }}
          className="absolute inset-0 border flex flex-col"
          style={{ borderColor: `${C.steel}2e`, background: "#0B0D10", transformOrigin: "left center", transformStyle: "preserve-3d" }}>
          <div className="flex items-center justify-between px-5 py-3 border-b text-[10px] uppercase tracking-[0.25em]" style={{ ...MONO, color: C.steel, borderColor: `${C.steel}22` }}>
            <span><span style={{ color: C.rose }}>{pad(project.id)}</span> / {project.category}</span>
            <span style={{ color: C.mist }}>{project.subtitle || project.tags[0]}</span>
          </div>
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <motion.img src={project.image} alt={project.title}
              initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: EXPO }}
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: "grayscale(0.2) contrast(1.04) brightness(0.9)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #0B0D10 0%, transparent 40%)" }} />
            <span aria-hidden="true" className="pointer-events-none select-none absolute right-4 -bottom-6 leading-none"
              style={{ ...DISPLAY, fontSize: "clamp(6rem, 12vw, 11rem)", color: "transparent", WebkitTextStroke: `1px ${C.rose}66` }}>
              {pad(project.id)}
            </span>
          </div>
          <div className="px-5 md:px-7 py-5 grid gap-4 shrink-0">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em]" style={{ ...MONO, color: C.rose }}>
              <span style={{ color: C.steel }}>{copy.stack}</span>
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="flex flex-wrap items-center gap-8 text-sm" style={MONO}>
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 pb-1 border-b" style={{ color: C.ink, borderColor: `${C.ink}55` }}>
                <GitHubIcon /> {tx.github}
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
              <button type="button" onClick={() => onOpen(project)}
                className="group inline-flex items-center gap-3 pb-1 border-b cursor-pointer transition-colors duration-500 hover:text-[#DEDCDC]"
                style={{ color: C.steel, borderColor: `${C.steel}55` }}>
                {tx.viewDetails} <span className="transition-transform duration-500 group-hover:translate-x-1">↗</span>
              </button>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pb-1 border-b" style={{ color: C.rose, borderColor: `${C.rose}55` }}>{tx.demo} ↗</a>
              )}
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
      <p className="sr-only" aria-live="polite">{shortTitle(project)} — {descOf(tx, lang, project.id)}</p>
    </div>
  );
}

function ActiveHead({ project, tx, lang }) {
  return (
    <div className="shrink-0 h-[13.5rem] xl:h-[15rem] mb-4 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={project.id} initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.18 } }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
          <motion.div variants={reveal} className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ ...MONO, color: C.steel }}>
            <span style={{ color: C.rose }}>{pad(project.id)}</span> / {project.category}
          </motion.div>
          <motion.h3 variants={reveal} className="uppercase leading-[0.88] mb-4 truncate" style={{ ...DISPLAY, color: C.ink, fontSize: "clamp(2.4rem, min(5vw, 9vh), 5.2rem)" }}>
            {shortTitle(project)}
          </motion.h3>
          <motion.p variants={reveal} className="max-w-md text-sm md:text-base leading-relaxed line-clamp-3" style={{ ...SANS, color: C.mist }}>
            {descOf(tx, lang, project.id)}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Row({ project, active, onSelect }) {
  return (
    <li data-id={project.id} className="border-b" style={{ borderColor: `${C.steel}1f` }}>
      <button type="button" onClick={() => onSelect(project.id)} onMouseEnter={() => onSelect(project.id, true)} aria-pressed={active} tabIndex={-1}
        className="group relative w-full grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-3 text-left cursor-pointer outline-none">
        <span className="text-[11px] tracking-[0.2em]" style={{ ...MONO, color: active ? C.rose : `${C.steel}aa` }}>{pad(project.id)}</span>
        <span className="flex flex-col min-w-0">
          <span className="uppercase leading-none truncate transition-all duration-500 group-hover:translate-x-2"
            style={{ ...DISPLAY, fontSize: "clamp(1.15rem, 1.8vw, 1.6rem)", color: active ? C.ink : C.mist, transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}>
            {shortTitle(project)}
          </span>
          <span className="mt-1.5 text-[10px] uppercase tracking-[0.18em] truncate" style={{ ...MONO, color: `${C.steel}aa` }}>{project.tags.join(" · ")}</span>
        </span>
        <span className="relative w-20 h-12 overflow-hidden border" style={{ borderColor: `${C.steel}22` }}>
          <img src={project.image} alt="" aria-hidden="true"
            className={`w-full h-full object-cover transition-all duration-700 ${active ? "opacity-90" : "opacity-25 group-hover:opacity-80"}`}
            style={{ filter: active ? "none" : "grayscale(1)" }} />
        </span>
        <span aria-hidden="true" className="absolute left-0 bottom-[-1px] h-px transition-all duration-700"
          style={{ width: active ? "100%" : "0%", background: C.rose }} />
      </button>
    </li>
  );
}

function ProjectModal({ project, tx, lang, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const d = tx.details?.[project.id] || {};
  const features = d.features?.length ? d.features : blurb(lang, project.id)?.features || [];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EXPO }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
      style={{ background: "rgba(7,8,10,0.88)" }} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 30, clipPath: "inset(8% 0 8% 0)" }}
        animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0)" }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: EXPO }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border"
        style={{ background: C.deep, borderColor: `${C.steel}33` }}>
        <div className="relative h-56 md:h-72 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" style={{ filter: "grayscale(0.4) brightness(0.75)" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, ${C.deep} 0%, transparent 60%)` }} />
          <button type="button" onClick={onClose} className="absolute top-4 right-5 text-xs uppercase tracking-[0.2em] cursor-pointer hover:text-[#DEDCDC] transition-colors"
            style={{ ...MONO, color: C.mist }}>{tx.modalClose || "Cerrar"} ×</button>
        </div>
        <div className="p-6 md:p-10 -mt-12 relative">
          <div className="text-[11px] uppercase tracking-[0.25em] mb-3" style={{ ...MONO, color: C.steel }}>
            {pad(project.id)} / {project.category}
          </div>
          <h3 className="uppercase leading-none mb-6" style={{ ...DISPLAY, color: C.ink, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>{project.title}</h3>
          <p className="leading-relaxed mb-8" style={{ ...SANS, color: C.mist }}>{d.fullDescription || descOf(tx, lang, project.id)}</p>
          {d.architecture && (
            <div className="mb-8">
              <h4 className="text-[11px] uppercase tracking-[0.25em] mb-3" style={{ ...MONO, color: C.rose }}>{tx.modalArchitecture}</h4>
              <p className="text-sm leading-relaxed" style={{ ...SANS, color: C.mist }}>{d.architecture}</p>
            </div>
          )}
          {features.length > 0 && (
            <div className="mb-8">
              <h4 className="text-[11px] uppercase tracking-[0.25em] mb-3" style={{ ...MONO, color: C.rose }}>{tx.modalFeatures}</h4>
              <ul className="space-y-2">
                {features.map((f, i) => (
                  <li key={i} className="flex gap-4 text-sm border-b pb-2" style={{ ...SANS, color: C.mist, borderColor: `${C.steel}1a` }}>
                    <span style={{ ...MONO, color: C.steel }}>{pad(i + 1)}</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-xs uppercase tracking-[0.2em]" style={{ ...MONO, color: C.steel }}>
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="flex flex-wrap gap-8 text-sm" style={MONO}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 pb-1 border-b" style={{ color: C.ink, borderColor: `${C.ink}55` }}>
                <GitHubIcon /> {tx.github} →
              </a>
            )}
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 pb-1 border-b" style={{ color: C.rose, borderColor: `${C.rose}55` }}>
                {tx.demo} ↗
              </a>
            ) : (
              <span style={{ color: `${C.mist}88` }}>{tx.noDemo}</span>
            )}
          </div>
          {project.repos?.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em]" style={MONO}>
              <span style={{ color: C.steel }}>Repos</span>
              {project.repos.map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="pb-0.5 border-b hover:text-[#DEDCDC] transition-colors" style={{ color: C.mist, borderColor: `${C.mist}33` }}>
                  {r.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  const { lang } = useLang();
  const tx = t[lang].projects;
  const copy = COPY[lang] || COPY.es;
  const [selected, setSelected] = useState(null);
  const [activeId, setActiveId] = useState(9);
  const listRef = useRef(null);
  const active = projects.find((p) => p.id === activeId) || projects[0];

  // keep the active row visible inside the list only (never scroll the page)
  const revealRow = (id) => {
    const ul = listRef.current;
    const li = ul?.querySelector(`[data-id="${id}"]`);
    if (!ul || !li) return;
    const top = li.offsetTop - ul.offsetTop;
    if (top < ul.scrollTop) ul.scrollTo({ top, behavior: "smooth" });
    else if (top + li.offsetHeight > ul.scrollTop + ul.clientHeight) ul.scrollTo({ top: top + li.offsetHeight - ul.clientHeight, behavior: "smooth" });
  };
  const select = (id, hover) => { setActiveId(id); if (!hover) revealRow(id); };
  const onKey = (e) => {
    const i = projects.findIndex((p) => p.id === activeId);
    let n = null;
    if (e.key === "ArrowDown" || e.key === "j") n = Math.min(projects.length - 1, i + 1);
    if (e.key === "ArrowUp" || e.key === "k") n = Math.max(0, i - 1);
    if (e.key === "Enter") { setSelected(active); e.preventDefault(); return; }
    if (n === null) return;
    e.preventDefault();
    setActiveId(projects[n].id);
    revealRow(projects[n].id);
  };

  return (
    <section id="proyectos" className="relative w-full text-white overflow-hidden lg:h-[100dvh] flex flex-col pt-20 lg:pt-[5.5rem] pb-6"
      style={{ background: `linear-gradient(180deg, #000 0%, #07080A 35%, ${C.deep} 100%)` }}>
      <header className="shrink-0 px-6 md:px-12 lg:px-16 pb-5 flex items-end justify-between gap-6">
        <div className="flex items-end gap-6">
          <h2 className="uppercase leading-[0.8]" style={{ ...DISPLAY, color: C.accent, fontSize: "clamp(2.4rem, min(5vw, 8vh), 4.5rem)" }}>{copy.title}</h2>
          <div className="hidden md:flex items-center gap-4 pb-1 text-[11px] uppercase tracking-[0.3em]" style={{ ...MONO, color: C.steel }}>
            <span>{copy.kicker}</span>
            <span className="h-px w-16" style={{ background: `${C.steel}44` }} />
            <span style={{ color: C.mist }}>{pad(projects.length)}</span>
          </div>
        </div>
        <a href="https://github.com/corredor29" target="_blank" rel="noopener noreferrer"
          className="group hidden md:inline-flex items-center gap-3 pb-1 border-b text-xs transition-colors duration-500 hover:text-[#DEDCDC]"
          style={{ ...MONO, color: C.steel, borderColor: `${C.steel}55` }}>
          <GitHubIcon size={12} /> {tx.viewMore}
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </a>
      </header>

      <div className="flex-1 min-h-0 px-6 md:px-12 lg:px-16 grid lg:grid-cols-[45fr_55fr] gap-8 lg:gap-14">
        <div className="flex flex-col min-h-0">
          <ActiveHead project={active} tx={tx} lang={lang} />
          <div className="shrink-0 flex items-center justify-between mb-2 text-[11px] uppercase tracking-[0.3em]" style={{ ...MONO, color: C.steel }}>
            <span>{copy.list}</span>
            <span><span style={{ color: C.rose }}>{pad(active.id)}</span> / {pad(projects.length)} · ↑↓</span>
          </div>
          <ul ref={listRef} tabIndex={0} onKeyDown={onKey} aria-label={copy.list}
            className="proj-index flex-1 min-h-0 overflow-y-auto overscroll-contain border-t pr-2 outline-none focus-visible:ring-1 focus-visible:ring-[#C5BAC4]/30"
            style={{ borderColor: `${C.steel}1f`, scrollbarWidth: "thin", scrollbarColor: `${C.accent} transparent`,
              maskImage: "linear-gradient(180deg, #000 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(180deg, #000 88%, transparent 100%)" }}>
            {projects.map((p) => <Row key={p.id} project={p} active={p.id === activeId} onSelect={select} />)}
            <li aria-hidden="true" className="h-10" />
          </ul>
        </div>
        <div className="order-first lg:order-none h-[60vh] lg:h-auto min-h-0">
          <Preview project={active} tx={tx} lang={lang} copy={copy} onOpen={setSelected} />
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} tx={tx} lang={lang} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
