import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarBackground from "../components/StarBackground";
import { useLang } from "../context/LanguageContext";
import { t } from "../context/translations";
import wen from "../assets/wen.jpg";
import heili from "../assets/heili.jpeg";
import dilan from "../assets/dilan.jpg";
import panelita from "../assets/panelita.png";
import juan from "../assets/sebas.png";
import tomas from "../assets/tomas.png";
import juanCogollo from "../assets/cogollo.png";

const photos = [wen, heili, dilan, panelita, juan, tomas, juanCogollo];
const colors = ["#3b82f6", "#a855f7", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#8b5cf6"];
const initials = ["WA", "HB", "DC", "SG", "JT", "TC", "JC"];

function Stars({ count, max = 3 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < count ? "#f59e0b" : "none"}
          stroke={i < count ? "#f59e0b" : "#374151"}
          strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      <span className="text-[10px] text-gray-500 ml-1" style={{ fontFamily: "'Space Mono', monospace" }}>
        {count}/3
      </span>
    </div>
  );
}

function Avatar({ person, size = "lg" }) {
  const dim = size === "lg" ? "w-16 h-16" : "w-10 h-10";
  const text = size === "lg" ? "text-lg" : "text-sm";
  if (person.photo) {
    return (
      <img src={person.photo} alt={person.name}
        className={`${dim} rounded-full object-cover border-2`}
        style={{ borderColor: `${person.color}60` }} />
    );
  }
  return (
    <div className={`${dim} rounded-full flex items-center justify-center font-bold ${text} flex-shrink-0`}
      style={{ background: `${person.color}18`, border: `1.5px solid ${person.color}40`, color: person.color, fontFamily: "'Space Mono', monospace" }}>
      {person.initials}
    </div>
  );
}

function MainCard({ person, direction }) {
  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.97, transition: { duration: 0.3 } }),
  };
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div key={person.id} custom={direction} variants={variants}
        initial="enter" animate="center" exit="exit"
        className="relative rounded-2xl border border-white/8 bg-black/50 backdrop-blur-sm p-8 md:p-10"
        style={{ boxShadow: `0 0 60px ${person.color}08` }}>
        <div className="absolute top-0 left-8 right-8 h-px rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${person.color}60, transparent)` }} />
        <div className="absolute top-6 right-8 opacity-8">
          <svg width="48" height="48" viewBox="0 0 24 24" fill={person.color}>
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <div className="mb-6"><Stars count={person.stars} /></div>
        <blockquote className="text-gray-300 text-base md:text-lg leading-relaxed mb-8"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
          "{person.text}"
        </blockquote>
        <div className="flex items-center gap-4">
          <Avatar person={person} size="lg" />
          <div>
            <p className="text-white font-bold text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>{person.name}</p>
            <p style={{ color: person.color, fontFamily: "'Space Mono', monospace" }} className="text-xs mt-0.5">{person.role}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-gray-600" style={{ fontFamily: "'Space Mono', monospace" }}>{person.company}</span>
              {person.company && <span className="w-1 h-1 rounded-full bg-gray-700" />}
              <span className="text-[10px] text-gray-600" style={{ fontFamily: "'Space Mono', monospace" }}>{person.relation}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Recommendations() {
  const { lang } = useLang();
  const tx = t[lang].recommendations;

  // Combinar textos traducidos con fotos/colores estáticos
  const testimonials = tx.list.map((item, i) => ({
    ...item,
    photo: photos[i],
    color: colors[i],
    initials: initials[i],
  }));

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent((idx + testimonials.length) % testimonials.length);
  }, [current, testimonials.length]);

  const next = useCallback(() => go(current + 1), [go, current]);
  const prev = useCallback(() => go(current - 1), [go, current]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const person = testimonials[current];
  const avg = (testimonials.reduce((s, item) => s + item.stars, 0) / testimonials.length).toFixed(1);

  return (
    <section id="recomendaciones" className="relative w-full bg-black text-white overflow-hidden">
      <StarBackground density={80} shootingStars={false} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent z-[2]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#3b82f6]/4 rounded-full blur-[140px] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 py-28">

        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6">
          <span className="text-[#3b82f6] text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}>{tx.sectionNum}</span>
          <span className="w-12 h-px bg-[#3b82f6]/40" />
          <span className="text-gray-500 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}>{tx.sectionLabel}</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-3"
              style={{ fontFamily: "'Space Mono', monospace" }}>
              {tx.heading1}{" "}
              <span className="relative inline-block">
                <span className="text-[#3b82f6]">{tx.heading2}</span>
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#3b82f6]/40" />
              </span>{" "}
              {tx.heading3}
            </h2>
            <p className="text-gray-500 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{tx.subheading}</p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-center">
              <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Mono', monospace" }}>{avg}</p>
              <Stars count={3} max={3} />
              <p className="text-[9px] text-gray-600 mt-1 tracking-wider uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}>{tx.avgLabel}</p>
            </div>
            <div className="w-px h-12 bg-white/8" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Mono', monospace" }}>{testimonials.length}</p>
              <p className="text-[9px] text-gray-600 tracking-wider uppercase mt-1"
                style={{ fontFamily: "'Space Mono', monospace" }}>{tx.reviewsLabel}</p>
            </div>
          </div>
        </motion.div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <MainCard person={person} direction={direction} />
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            {testimonials.map((item, i) => (
              <button key={item.id} onClick={() => go(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? "24px" : "6px",
                  height: "6px",
                  background: i === current ? person.color : "rgba(255,255,255,0.15)",
                }} />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-600" style={{ fontFamily: "'Space Mono', monospace" }}>
              {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <button onClick={prev}
              className="w-10 h-10 rounded-xl border border-white/8 bg-black/40 text-gray-400 hover:border-white/20 hover:text-white hover:bg-white/6 transition-all duration-200 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button onClick={next}
              className="w-10 h-10 rounded-xl border border-[#3b82f6]/30 bg-[#3b82f6]/8 text-[#3b82f6] hover:border-[#3b82f6]/60 hover:bg-[#3b82f6]/15 transition-all duration-200 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-3 mt-10 pt-8 border-t border-white/6">
          <div className="flex -space-x-2">
            {testimonials.map((item, i) => (
              <button key={item.id} onClick={() => go(i)}
                className="transition-all duration-200 rounded-full"
                style={{
                  transform: i === current ? "scale(1.15) translateY(-2px)" : "scale(1)",
                  zIndex: i === current ? 10 : 1,
                  outline: i === current ? `2px solid ${item.color}` : "2px solid transparent",
                  outlineOffset: "1px",
                }}>
                <Avatar person={item} size="sm" />
              </button>
            ))}
          </div>
          <p className="text-[11px] text-gray-600" style={{ fontFamily: "'Space Mono', monospace" }}>
            {testimonials.length} {tx.footerText}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent z-[2]" />
    </section>
  );
}

export default Recommendations;