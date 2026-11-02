import cutout from "../assets/felipe-glasses-cutout-hero.png";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useLang } from "../context/useLang";
import { t } from "../context/translations";

const ACCENT = "#57707A";
const INK = "#DEDCDC";
const SURFACE = "#989DAA";
const DEEP = "#191D23";
const VOID = "#0B0D10";
const EXPO = [0.22, 1, 0.36, 1];
const INTRO = 1.25; // hero reveal starts as the loader curtain lifts

function IntroLoader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = setTimeout(() => { document.body.style.overflow = prev; setDone(true); }, 2300);
    return () => { clearTimeout(id); document.body.style.overflow = prev; };
  }, []);
  if (done) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
      style={{ background: "#08090B" }}
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.95 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.1 }}
            className="text-sm tracking-[0.5em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace", color: INK }}
          >
            pipe<span style={{ color: ACCENT }}>.</span>dev
          </motion.div>
        </div>
        <div className="w-40 h-px overflow-hidden" style={{ background: `${ACCENT}22` }}>
          <motion.div
            className="h-full origin-left"
            style={{ background: ACCENT }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EXPO, delay: 0.15 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function HeroCTA({ children, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ backgroundColor: "#57707A", boxShadow: "0 0 0 rgba(87,112,122,0)" }}
      whileHover={{
        backgroundColor: "#7B919C",
        boxShadow: "0 0 40px rgba(87,112,122,0.35)",
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="group inline-flex items-center gap-3 h-12 px-7 rounded-full text-[15px] font-medium cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C5BAC4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D10]"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#DEDCDC", border: "none" }}
    >
      <span>{children}</span>
      <span className="inline-block transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">→</span>
    </motion.button>
  );
}

function Hero({ progress }) {
  const { lang } = useLang();
  const tx = t[lang]?.hero ?? t.es.hero;
  const BIO_ES = "Hola soy Felipe — Desarrollador Fullstack enfocado en crear experiencias modernas, rápidas y atractivas.";
  const BIO_EN = "Hi, I'm Felipe — Fullstack developer focused on building modern, fast, and engaging experiences.";
  const bioText = lang === "en" ? BIO_EN : BIO_ES;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 30, mass: 1.4, restDelta: 0.0005 });
  const sy = useSpring(my, { stiffness: 30, damping: 30, mass: 1.4, restDelta: 0.0005 });
  const typeX = useTransform(sx, (v) => v * -24);
  const typeY = useTransform(sy, (v) => v * -12);
  const cutX = useTransform(sx, (v) => v * 14);
  const cutY = useTransform(sy, (v) => v * 8);
  const spotX = useTransform(sx, (v) => `${50 + v * 60}%`);
  const spotY = useTransform(sy, (v) => `${45 + v * 60}%`);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${spotX} ${spotY}, ${ACCENT}8c, ${ACCENT}26 38%, transparent 66%), radial-gradient(ellipse at 50% 45%, transparent 45%, #000000cc 100%)`;


  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const fallbackP = useMotionValue(0);
  const p = progress ?? fallbackP;
  // driven by ScrollStage: pinned hero recedes while the clip-path curtain lifts
  const exitOpacity = useTransform(p, [0, 1], [1, reduce ? 0 : 0.4], { clamp: true });
  const exitScale = useTransform(p, [0, 1], [1, reduce ? 1 : 0.9]);
  const exitY = useTransform(p, [0, 1], [0, reduce ? 0 : -70]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
      <IntroLoader />
      <section
        ref={heroRef}
        onMouseMove={onMove}
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
        style={{ background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${DEEP} 0%, ${VOID} 70%, #000 100%)` }}
      >
        <motion.div className="absolute inset-0 origin-center" style={{ opacity: exitOpacity, scale: exitScale, y: exitY, willChange: "transform, opacity" }}>
        {/* spotlight */}
        <motion.div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: spotlight }} />

        {/* FELIPE display */}
        <motion.div
          className="absolute inset-x-0 top-[9vh] z-[2] flex justify-center select-none pointer-events-none"
          style={{ x: typeX, y: typeY, willChange: "transform" }}
        >
          <h1
            aria-label="Felipe"
            className="flex leading-[0.85] uppercase"
            style={{ fontFamily: "'Anton', 'Space Grotesk', sans-serif", fontSize: "clamp(120px, 26vw, 520px)", letterSpacing: "-0.01em" }}
          >
            {"FELIPE".split("").map((ch, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EXPO, delay: INTRO + i * 0.075 }}
                  style={{
                    backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, ${INK} 25%, ${ACCENT} 70%, #2c3a40 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    opacity: 0.92,
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        {/* cutout portrait */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-[3] flex justify-center pointer-events-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EXPO, delay: INTRO + 0.45 }}
        >
        <motion.img
          src={cutout}
          alt="Felipe"
          draggable={false}
                    style={{ x: cutX, y: cutY, willChange: "transform", filter: "drop-shadow(0 30px 60px rgba(0,0,0,.55))" }}
          className="block h-[82vh] max-w-none w-auto object-contain object-bottom select-none"
        />
        </motion.div>

        </motion.div>

        {/* bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-56 z-[4] pointer-events-none" style={{ background: "linear-gradient(to top, #000 0%, #000000cc 30%, transparent 100%)" }} />

        {/* grain */}
        <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "140px" }} />

        <motion.div className="absolute inset-0 z-[7] pointer-events-none [&>*]:pointer-events-auto" style={{ opacity: exitOpacity, y: exitY }}>
        {/* CTA + bio editorial bottom-left */}
        <div className="absolute z-[7] left-6 md:left-10 bottom-[10vh] flex flex-col items-start w-full max-w-[32rem] pr-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EXPO, delay: INTRO + 1.05 }}
            className="text-[11px] md:text-xs tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "'Space Mono', monospace", color: "#989DAA" }}
          >
            {lang === "en" ? "Available for projects" : "Disponible para proyectos"}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO, delay: INTRO + 1.15 }}
          >
            <HeroCTA onClick={() => scrollTo("#proyectos")}>
              {tx.cta1}
            </HeroCTA>
          </motion.div>

          <motion.p
            id="hero-bio"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO, delay: INTRO + 1.3 }}
            className="mt-4 text-[15px] md:text-base leading-[1.55] max-w-[28rem]"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#C5BAC4", fontWeight: 400 }}
          >
            {bioText}
          </motion.p>
        </div>

        {/* index 01 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EXPO, delay: INTRO + 0.95 }}
          className="absolute z-[6] left-6 md:left-[5vw] top-[16vh] flex items-center gap-3"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span className="text-sm tracking-[0.35em]" style={{ color: INK }}>01</span>
          <motion.span className="block h-px origin-left" style={{ background: ACCENT, width: 56 }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease: EXPO, delay: INTRO + 1.05 }} />
          <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: SURFACE }}>Bucaramanga — CO</span>
        </motion.div>

        {/* vertical rail right */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, ease: EXPO, delay: INTRO + 0.8 }}
          className="hidden md:block absolute z-[6] right-[5vw] top-[20vh] bottom-[18vh] w-px origin-top"
          style={{ background: `linear-gradient(${ACCENT}88, transparent)` }}
        />
        <div
          className="hidden md:block absolute z-[6] right-[calc(5vw-6px)] bottom-[12vh] opacity-50 text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "'Space Mono', monospace", color: SURFACE, writingMode: "vertical-rl" }}
        >
          Portfolio ©2026
        </div>

        </motion.div>
      </section>
    </>
  );
}

export default Hero;
