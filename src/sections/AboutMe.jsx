import { motion, useReducedMotion } from "framer-motion";
import cutout from "../assets/felipe-glasses-cutout-hero.png";
import { useLang } from "../context/useLang";
import { t } from "../context/translations";

const BIO_ES = "Hola soy Felipe — Desarrollador Fullstack enfocado en crear experiencias modernas, rápidas y atractivas.";
const BIO_EN = "Hi, I'm Felipe — Fullstack developer focused on building modern, fast, and engaging experiences.";

const EXPO = [0.22, 1, 0.36, 1];
const MONO = { fontFamily: "'Space Mono', monospace" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };
const DISPLAY = { fontFamily: "'Anton', sans-serif" };
const C = { deep: "#191D23", accent: "#57707A", steel: "#7B919C", mist: "#989DAA", rose: "#C5BAC4", ink: "#DEDCDC" };

const STACK = [
  { group: "Backend", items: ["C#", ".NET", "Python", "PHP"] },
  { group: "Frontend", items: ["React", "Vue", "TypeScript", "JavaScript", "Tailwind"] },
  { group: "Data & tools", items: ["PostgreSQL", "MySQL", "Git"] },
];

const COPY = {
  es: {
    kicker: "Sobre mí",
    lead: "Diseño y construyo producto de punta a punta: APIs limpias, interfaces cuidadas y la tipografía como columna vertebral.",
    meta: [
      ["Enfoque", "Fullstack — backend .NET, frontend React / Vue"],
      ["Base", "Bucaramanga — CO · remoto"],
      ["Formación", "Desarrollador Full Stack Junior"],
      ["Idiomas", "Español — Inglés"],
      ["Disponibilidad", "Abierto a proyectos y full-time"],
    ],
    stack: "Stack",
    interests: "Intereses",
    interestList: ["Tipografía editorial", "Sistemas de diseño", "Motion en interfaces", "IA & open source", "Videojuegos", "Fútbol"],
    projects: "Ver proyectos",
    contact: "Hablemos",
  },
  en: {
    kicker: "About me",
    lead: "I design and build product end to end: clean APIs, crafted interfaces and typography as the backbone.",
    meta: [
      ["Focus", "Fullstack — .NET backend, React / Vue frontend"],
      ["Based in", "Bucaramanga — CO · remote"],
      ["Education", "Junior Full Stack Developer"],
      ["Languages", "Spanish — English"],
      ["Availability", "Open to projects & full-time"],
    ],
    stack: "Stack",
    interests: "Interests",
    interestList: ["Editorial typography", "Design systems", "Interface motion", "AI & open source", "Video games", "Football"],
    projects: "See projects",
    contact: "Let's talk",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO } },
};
const stagger = { show: { transition: { staggerChildren: 0.09 } } };

function Rule({ label }) {
  return (
    <div className="flex items-center gap-4 mb-3" style={MONO}>
      <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.steel }}>{label}</span>
      <span className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${C.accent}, transparent)` }} />
    </div>
  );
}

function AboutMe() {
  const { lang } = useLang();
  const tx = t[lang]?.about ?? t.es.about;
  const cp = COPY[lang] ?? COPY.es;
  const bioText = lang === "en" ? BIO_EN : BIO_ES;
  const reduce = useReducedMotion();
  const inView = reduce
    ? {}
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.12 }, variants: stagger };

  return (
    <section
      id="sobre-mi"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: `linear-gradient(to bottom, #000 0%, #07080A 40%, ${C.deep} 100%)`, color: C.ink }}
    >
      {/* FULLSTACK — bottom-left under the photo (empty black), never behind the name */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute left-[3vw] bottom-[6vh] whitespace-nowrap leading-none uppercase"
        style={{
          ...DISPLAY,
          fontSize: "clamp(56px, 8.5vw, 148px)",
          letterSpacing: "0.08em",
          color: `${C.steel}48`,
        }}
      >
        Fullstack
      </div>

      {/* .NET watermark — upper right (Felipe liked this) */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute right-[1.5vw] top-[7vh] leading-[0.75] uppercase text-right"
        style={{
          ...DISPLAY,
          fontSize: "clamp(80px, 12vw, 220px)",
          color: "transparent",
          WebkitTextStroke: `1.25px ${C.accent}66`,
        }}
      >
        .NET
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-24">
        <motion.div {...inView} className="flex items-center gap-4 mb-10" style={MONO}>
          <motion.span variants={fadeUp} className="text-sm tracking-[0.35em]" style={{ color: C.ink }}>02</motion.span>
          <motion.span variants={fadeUp} className="block h-px w-16" style={{ background: C.accent }} />
          <motion.span variants={fadeUp} className="text-[11px] tracking-[0.35em] uppercase" style={{ color: C.mist }}>{cp.kicker}</motion.span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <motion.div {...inView} className="lg:col-span-5 relative lg:sticky lg:top-28 self-start">
            <motion.div variants={fadeUp} className="relative">
              <span
                aria-hidden
                className="absolute -left-2 md:-left-6 -top-8 leading-[0.8] select-none"
                style={{
                  ...DISPLAY,
                  fontSize: "clamp(180px, 26vw, 380px)",
                  color: "transparent",
                  backgroundImage: `linear-gradient(180deg, ${C.accent}aa 0%, ${C.deep} 90%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                02
              </span>
              <div
                className="relative ml-[14%] mt-4 aspect-[3/4] overflow-hidden"
                style={{ background: `radial-gradient(ellipse at 50% 30%, ${C.deep} 0%, #000 75%)` }}
              >
                <img
                  src={cutout}
                  alt="Felipe Corredor Silva"
                  draggable={false}
                  className="absolute inset-x-0 bottom-0 w-full h-full object-contain object-bottom"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(to top, #000, transparent)" }} />
              </div>
              <p className="ml-[14%] mt-3 text-[10px] tracking-[0.35em] uppercase" style={{ ...MONO, color: C.mist }}>
                Fig. 01 — Bucaramanga, CO
              </p>
            </motion.div>
          </motion.div>

          <motion.div {...inView} className="lg:col-span-7 flex flex-col gap-7 min-w-0">
            <motion.div variants={fadeUp}>
              <h2 className="uppercase leading-[0.9]" style={{ ...DISPLAY, fontSize: "clamp(44px, 5.5vw, 88px)", letterSpacing: "0.005em" }}>
                Felipe<br /><span style={{ color: C.steel }}>Corredor Silva</span>
              </h2>
              <p className="mt-3 text-xs tracking-[0.3em] uppercase" style={{ ...MONO, color: C.accent }}>{tx.role}</p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p id="about-bio" className="text-xl md:text-2xl leading-[1.35] tracking-[-0.01em]" style={{ ...SANS, color: C.ink, fontWeight: 300 }}>
                {bioText}
              </p>
              <p className="mt-4 text-[15px] leading-[1.65] max-w-xl" style={{ ...SANS, color: C.mist }}>{cp.lead}</p>
            </motion.div>

            <motion.dl variants={fadeUp} className="border-t" style={{ borderColor: `${C.accent}55` }}>
              {cp.meta.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[minmax(8rem,9rem)_1fr] gap-4 py-3 border-b" style={{ borderColor: `${C.accent}22` }}>
                  <dt className="text-[10px] tracking-[0.28em] uppercase pt-0.5 leading-snug" style={{ ...MONO, color: C.steel }}>{k}</dt>
                  <dd className="text-[15px]" style={{ ...SANS, color: C.ink }}>{v}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-x-10 gap-y-6">
              <div id="about-stack">
                <Rule label={cp.stack} />
                <div className="flex flex-col gap-3">
                  {STACK.map(({ group, items }) => (
                    <p key={group} className="text-[15px] md:text-base leading-snug" style={{ ...SANS, color: C.ink }}>
                      <span className="block mb-1 text-[10px] tracking-[0.3em] uppercase" style={{ ...MONO, color: C.mist }}>{group}</span>
                      {items.map((s, i) => (
                        <span key={s}>
                          {s}
                          {i < items.length - 1 && <span className="mx-2" style={{ color: C.accent }}>—</span>}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <Rule label={cp.interests} />
                <p className="text-[15px] leading-relaxed italic" style={{ ...SANS, color: C.rose }}>
                  {cp.interestList.join("  —  ")}
                </p>
              </div>
            </motion.div>

            <motion.blockquote variants={fadeUp} className="relative pl-8 pt-2 max-w-xl">
              <span aria-hidden className="absolute left-0 -top-1 text-5xl leading-none" style={{ ...DISPLAY, color: C.accent }}>“</span>
              <p className="text-lg leading-[1.45]" style={{ ...SANS, color: C.rose, fontWeight: 300 }}>
                {tx.quote.replace(/^"|"$/g, "")}
              </p>
            </motion.blockquote>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-1">
              <motion.a
                href="#proyectos"
                initial={{ backgroundColor: C.accent }}
                whileHover={{ backgroundColor: C.steel, boxShadow: "0 0 40px rgba(87,112,122,0.35)" }}
                transition={{ duration: 0.28, ease: EXPO }}
                className="group inline-flex items-center gap-3 h-12 px-7 rounded-full text-[15px] font-medium"
                style={{ ...SANS, color: C.ink }}
              >
                {cp.projects}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </motion.a>
              <a
                href="/HojaDeVida_FelipeCorreder.pdf"
                download="HojaDeVida_FelipeCorreder.pdf"
                className="inline-flex items-center h-12 px-7 rounded-full text-[15px] border transition-colors duration-300 hover:border-[#C5BAC4] hover:text-[#DEDCDC]"
                style={{ ...SANS, color: C.rose, borderColor: `${C.accent}80` }}
              >
                {tx.downloadCV}
              </a>
              <a href="#contacto" className="text-[12px] tracking-[0.3em] uppercase underline-offset-4 hover:underline" style={{ ...MONO, color: C.mist }}>
                {cp.contact} ↗
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
