import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/useLang";

const EXPO = [0.22, 1, 0.36, 1];
const MONO = { fontFamily: "'Space Mono', monospace" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };
const DISPLAY = { fontFamily: "'Anton', sans-serif" };
const C = { deep: "#191D23", accent: "#57707A", steel: "#7B919C", mist: "#989DAA", rose: "#C5BAC4", ink: "#DEDCDC" };
const pad = (n) => String(n).padStart(2, "0");

const TECH = {
  backend: ["C#", ".NET / ASP.NET", "Python", "PHP", "Node.js"],
  frontend: ["React", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  data: ["MySQL", "PostgreSQL", "Oracle", "Supabase", "Firebase", "Git", "GitHub"],
};

const COPY = {
  es: {
    title: "Habilidades", kicker: "05 — Stack", index: "Índice", hint: "↑ ↓ / J K",
    cats: [
      { key: "backend", label: "Backend", lead: "Lenguajes y frameworks del servidor." },
      { key: "frontend", label: "Frontend", lead: "Interfaces y experiencia." },
      { key: "data", label: "Datos y tools", lead: "Bases de datos, backend-as-a-service y control de versiones." },
      { key: "soft", label: "Blandas", lead: "Cómo trabajo con equipos." },
    ],
    soft: [
      ["Liderazgo", "Capacidad de guiar equipos y tomar decisiones bajo incertidumbre."],
      ["Trabajo en equipo", "Colaboro activamente, escucho y adapto mi trabajo al ritmo del equipo."],
      ["Comunicación", "Transmito ideas técnicas con claridad a audiencias técnicas y no técnicas."],
      ["Trabajo bajo presión", "Mantengo la calidad y enfoque en entornos de alta exigencia y plazos ajustados."],
      ["Aprendizaje continuo", "Me adapto rápidamente a nuevas tecnologías y metodologías de forma autónoma."],
      ["Resolución de problemas", "Analizo, descompongo y resuelvo problemas complejos con pensamiento lógico."],
      ["Creatividad", "Aporto soluciones originales y diseños pensados en la experiencia del usuario."],
      ["Puntualidad", "Cumplo con los tiempos establecidos y gestiono mis prioridades eficientemente."],
    ],
  },
  en: {
    title: "Skills", kicker: "05 — Stack", index: "Index", hint: "↑ ↓ / J K",
    cats: [
      { key: "backend", label: "Backend", lead: "Server-side languages and frameworks." },
      { key: "frontend", label: "Frontend", lead: "Interfaces and experience." },
      { key: "data", label: "Data & Tools", lead: "Databases, backend-as-a-service and version control." },
      { key: "soft", label: "Soft", lead: "How I work with teams." },
    ],
    soft: [
      ["Leadership", "Ability to guide teams and make decisions under uncertainty."],
      ["Teamwork", "I collaborate actively, listen, and adapt my work to the team's rhythm."],
      ["Communication", "I convey technical ideas clearly to both technical and non-technical audiences."],
      ["Working under pressure", "I maintain quality and focus in high-demand environments with tight deadlines."],
      ["Continuous learning", "I quickly adapt to new technologies and methodologies autonomously."],
      ["Problem solving", "I analyze, break down and solve complex problems with logical thinking."],
      ["Creativity", "I bring original solutions and designs focused on the user experience."],
      ["Punctuality", "I meet deadlines and manage my priorities efficiently."],
    ],
  },
};

function Row({ i, name, desc }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EXPO, delay: 0.15 + i * 0.05 }}
      className="group flex items-baseline gap-5 py-2.5 md:py-3 border-b transition-colors"
      style={{ borderColor: `${C.steel}38` }}>
      <span className="text-[11px] tracking-[0.2em] shrink-0" style={{ ...MONO, color: C.accent }}>{pad(i + 1)}</span>
      <div className="min-w-0">
        <div className={`${desc ? "text-sm md:text-[15px]" : "text-lg md:text-2xl"} uppercase tracking-[0.08em] transition-colors group-hover:text-[#C5BAC4]`}
          style={{ ...MONO, color: C.ink }}>{name}</div>
        {desc && <p className="mt-0.5 text-[13px] leading-snug transition-colors group-hover:text-[#DEDCDC]" style={{ ...SANS, color: C.mist }}>{desc}</p>}
      </div>
    </motion.li>
  );
}

function Stage({ cat, index, total, copy }) {
  const items = cat.key === "soft" ? copy.soft.map(([n, d]) => ({ n, d })) : TECH[cat.key].map((n) => ({ n }));
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={cat.key}
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)", y: 18 }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0 }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: EXPO } }}
        transition={{ duration: 0.8, ease: EXPO }}
        className="relative h-full flex flex-col justify-center">
        <motion.span aria-hidden="true" className="pointer-events-none select-none absolute -top-6 md:-top-10 -left-2 leading-none origin-bottom-left"
          initial={{ opacity: 0, scale: 1.12, y: 24, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, scale: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 0.85, ease: EXPO, delay: 0.05 }}
          style={{ ...DISPLAY, fontSize: "clamp(9rem, min(22vw, 34vh), 20rem)", color: "transparent", WebkitTextStroke: `1px ${C.rose}55` }}>
          {pad(index + 1)}
        </motion.span>
        <div className="relative mb-4 text-[11px] uppercase tracking-[0.3em]" style={{ ...MONO, color: C.steel }}>
          <span style={{ color: C.rose }}>{pad(index + 1)}</span> / {pad(total)} — {cat.label}
        </div>
        <h3 className="relative uppercase leading-[0.9]" style={{ ...DISPLAY, color: C.ink, fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>{cat.label}</h3>
        <p className="relative mt-3 mb-6 text-base md:text-lg" style={{ ...SANS, color: C.mist }}>{cat.lead}</p>
        <ul className={`relative border-t ${cat.key === "soft" ? "grid md:grid-cols-2 md:gap-x-10" : "max-w-xl"}`} style={{ borderColor: `${C.steel}38` }}>
          {items.map((it, i) => <Row key={it.n} i={i} name={it.n} desc={it.d} />)}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}

const SkillsPortfolio = () => {
  const { lang } = useLang();
  const copy = COPY[lang] || COPY.es;
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const total = copy.cats.length;

  useEffect(() => {
    const onKey = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.5 || r.bottom < window.innerHeight * 0.5) return;
      if (["ArrowDown", "j", "ArrowRight"].includes(e.key)) setActive((a) => (a + 1) % total);
      if (["ArrowUp", "k", "ArrowLeft"].includes(e.key)) setActive((a) => (a - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <section ref={ref} id="habilidades-stage" className="relative w-full lg:min-h-[100dvh] flex flex-col overflow-hidden px-6 md:px-12 lg:px-16 pt-24 pb-16 lg:pt-24 lg:pb-12"
      style={{ background: "linear-gradient(180deg, #191D23 0%, #07080A 55%, #000 100%)" }}>
      <header className="flex items-end justify-between gap-6 mb-8 lg:mb-6">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EXPO }}
          className="uppercase leading-[0.85]" style={{ ...DISPLAY, color: C.accent, fontSize: "clamp(3rem, 8vw, 7rem)" }}>{copy.title}</motion.h2>
        <div className="text-right text-[11px] uppercase tracking-[0.3em] pb-2" style={{ ...MONO, color: C.steel }}>
          <div>{copy.kicker}</div><div className="mt-1" style={{ color: C.rose }}>{pad(total)}</div>
        </div>
      </header>
      <div className="flex-1 grid lg:grid-cols-[62fr_38fr] gap-10 lg:gap-16 min-h-0">
        <div className="relative min-h-[28rem]">
          <Stage cat={copy.cats[active]} index={active} total={total} copy={copy} />
        </div>
        <nav aria-label={copy.index} className="flex flex-col justify-center">
          <div className="flex justify-between mb-4 text-[11px] uppercase tracking-[0.3em]" style={{ ...MONO, color: C.steel }}>
            <span>{copy.index}</span><span style={{ color: C.accent }}>{copy.hint}</span>
          </div>
          <ul className="border-t" style={{ borderColor: `${C.steel}38` }}>
            {copy.cats.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.key} className="border-b" style={{ borderColor: on ? `${C.ink}80` : `${C.steel}38` }}>
                  <button type="button" onClick={() => setActive(i)} aria-pressed={on}
                    className={`group w-full flex items-center gap-5 py-4 md:py-5 text-left uppercase tracking-[0.2em] transition-[color,transform] duration-300 cursor-pointer ${on ? "text-[#DEDCDC]" : "text-[#7B919C] hover:text-[#DEDCDC] hover:-translate-y-px"}`}
                    style={MONO}>
                    <span className="text-[11px]" style={{ color: on ? C.rose : C.accent }}>{pad(i + 1)}</span>
                    <span className="flex-1 text-sm md:text-base">{c.label}</span>
                    {!on && <span aria-hidden className="h-px w-0 group-hover:w-4 transition-all duration-300" style={{ background: `${C.rose}99` }} />}
                    <motion.span animate={{ width: on ? 40 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.5, ease: EXPO }}
                      className="h-px" style={{ background: C.rose }} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default SkillsPortfolio;
