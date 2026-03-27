import foto from "../assets/portada.jpeg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

/* ── Stagger container ── */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Skill tags ── */
const tags = ["React", "Git", "Tailwind", "TypeScript", "C#"];

function Hero() {
  const textoCompleto = "Hola soy Felipe";
  const [texto, setTexto] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const intervalo = setInterval(() => {
      setTexto(textoCompleto.slice(0, i + 1));
      i++;
      if (i === textoCompleto.length) {
        clearInterval(intervalo);
        setDone(true);
      }
    }, 75);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <section className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-16 overflow-hidden">

        {/* ── Spline background ── */}
        <div className="absolute inset-0 z-0">
          <Spline
            scene="https://prod.spline.design/tZayxwGxbJDd21dw/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* ── Gradient overlay (bottom fade for next section) ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black z-[1]" />

        {/* ── Noise grain texture ── */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* ── Subtle grid lines ── */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── Glow blobs ── */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-[120px] z-[1] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-[100px] z-[1] pointer-events-none" />

        {/* ── Main content ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-16"
        >
          {/* Left — text */}
          <div className="flex-1 text-left">

            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-8">
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-gray-300"
                style={{ fontFamily: "'Space Mono', monospace" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Disponible para proyectos
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span className="text-white">{texto}</span>
              <span
                className="text-[#3b82f6]"
                style={{ opacity: done ? 0 : 1, transition: "opacity 0.1s" }}
              >|</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-md"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Desarrollador{" "}
              <span className="text-white font-medium">Fullstack</span> enfocado
              en crear experiencias modernas, rápidas y{" "}
              <span className="text-white font-medium">atractivas</span>.
            </motion.p>

            {/* Skill tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs rounded-md border border-white/10 bg-white/5 text-gray-300 hover:border-[#3b82f6]/40 hover:text-white transition-all duration-200 cursor-default"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button
                className="group relative px-7 py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300
                  bg-[#3b82f6] hover:bg-[#2563eb] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-95"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.875rem" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Ver proyectos
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
              </button>

              <button
                className="px-7 py-3.5 rounded-xl font-semibold text-gray-300 border border-white/10 bg-white/5 backdrop-blur-sm
                  hover:border-white/25 hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.875rem" }}
              >
                Sobre mí
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="flex items-center gap-8 mt-12 pt-8 border-t border-white/5">
              {[["1", "año exp."], ["10+", "proyectos"], ["5+", "tecnologías"]].map(([num, label]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Mono', monospace" }}>{num}</span>
                  <span className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — photo */}
          <motion.div
            variants={fadeUp}
            className="flex-shrink-0 flex items-center justify-center"
          >
            {/* Card frame */}
            <div className="relative">
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 60%, #3b82f6 80%, transparent 100%)",
                  padding: "2px",
                  borderRadius: "9999px",
                }}
              >
                <div className="w-full h-full rounded-full bg-transparent" />
              </motion.div>

              {/* Glow pulse */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3b82f6]/40 to-purple-500/20 blur-3xl -z-10 scale-110"
              />

              {/* Photo */}
              <motion.img
                src={foto}
                alt="Pipe"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-64 h-64 md:w-[320px] md:h-[320px] object-cover rounded-full relative z-10"
                style={{
                  border: "1.5px solid rgba(59,130,246,0.5)",
                  boxShadow: "0 0 0 6px rgba(59,130,246,0.08), 0 32px 64px rgba(0,0,0,0.5)",
                }}
              />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md text-xs text-gray-300 z-20 whitespace-nowrap"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                 Fullstack Dev Junior
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-gray-500 tracking-widest uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[#3b82f6]/60 to-transparent"
          />
        </motion.div>
      </section>
    </>
  );
}

export default Hero;