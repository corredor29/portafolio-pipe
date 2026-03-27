import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarBackground from "../components/StarBackground";
import { useLang } from "../context/LanguageContext";
import { t } from "../context/translations";
 
// ── Iconos SVG inline ──────────────────────────────────────────────────────────
const icons = {
  react: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <circle cx="12" cy="12" r="2.5" fill="#61dafb" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
  js: (
    <svg viewBox="0 0 24 24" fill="#f7df1e" className="w-6 h-6">
      <rect width="24" height="24" rx="3" fill="#f7df1e" />
      <path d="M6 17.5c.4.7 1 1.2 2 1.2 1.1 0 1.7-.5 1.7-1.3 0-.9-.7-1.2-1.8-1.7L7.3 15c-1.5-.6-2.4-1.5-2.4-3.1 0-1.8 1.4-3 3.4-3 1.4 0 2.5.5 3.2 1.8l-1.7 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1.9 0 .7.4.9 1.4 1.3l.6.3c1.8.8 2.8 1.6 2.8 3.3 0 2-1.5 3.2-3.6 3.2-2 0-3.3-1-3.9-2.3L6 17.5zm8.5.2c.5.8 1.1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2V11h2.1v7c0 2-1.2 3-3 3-1.6 0-2.6-.8-3.1-1.9l2.2-1.4z" fill="#000" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" fill="#06b6d4" className="w-6 h-6">
      <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C13.25 10.43 14.18 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C15.25 6.97 14.32 6 12 6zM7.5 11.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C8.75 15.83 9.68 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C10.75 12.37 9.82 11.4 7.5 11.4z" />
    </svg>
  ),
  html: (
    <svg viewBox="0 0 24 24" fill="#e34f26" className="w-6 h-6">
      <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4zm13.1 5H8.9l.2 2h7.8l-.6 6.5L12 18l-4.3-1.5-.3-3.2h2l.2 1.7 2.4.7 2.4-.7.3-3H8.2L7.8 8h8.5l-.2 5z" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M11.9 2C8.7 2 7 3.5 7 5.5V8h5v1H5.5C3.6 9 2 10.7 2 13.1s1.3 4.1 3.5 4.4l.5.1V20c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-1h-5v-1h7.5c2.2 0 3.5-1.7 3.5-4.1V9.9C20 7.5 18.7 6 16.5 6H16V5.5C16 3.5 14.3 2 11.9 2zM9.5 4.5A1 1 0 1 1 9.5 6.5 1 1 0 0 1 9.5 4.5z" fill="#3776ab" />
      <path d="M12.1 22c3.2 0 4.9-1.5 4.9-3.5V16h-5v-1h6.5c1.9 0 3.5-1.7 3.5-4.1S20.7 6.8 18.5 6.5l-.5-.1V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1h5v1H8.5C6.3 7 5 8.7 5 11.1V14c0 2.4 1.3 3.9 3.5 4.2l.5.1V19c0 1.1.9 2 2 2h1.1zm2.4-2.5A1 1 0 1 1 14.5 21.5 1 1 0 0 1 14.5 19.5z" fill="#ffd43b" />
    </svg>
  ),
  csharp: (
    <svg viewBox="0 0 24 24" fill="#9b4f96" className="w-6 h-6">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.3l7.7 3.85-7.7 3.85-7.7-3.85L12 4.3zM4 8.9l7 3.5V20l-7-3.5V8.9zm9 11.1v-7.6l7-3.5v7.6l-7 3.5z" />
      <text x="9" y="14" fontSize="6" fontWeight="bold" fill="white">#</text>
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" fill="#f59e0b" className="w-6 h-6">
      <path d="M12 2C8 2 5 3.5 5 5.5S8 9 12 9s7-1.5 7-3.5S16 2 12 2zm0 8C8 10 5 11.3 5 13v2.5C5 17.5 8 19 12 19s7-1.5 7-3.5V13c0-1.7-3-3-7-3zm0 10c-4 0-7-1.3-7-3v2.5C5 21.5 8 23 12 23s7-1.5 7-3.5V17c0 1.7-3 3-7 3z" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" fill="#f97316" className="w-6 h-6">
      <path d="M23.5 11.5l-11-11a1.7 1.7 0 0 0-2.4 0l-2.4 2.4 3 3a2 2 0 0 1 2.5 2.5l2.9 2.9a2 2 0 1 1-1.2 1.2L12 9.6v7a2 2 0 1 1-1.6 0V9.3A2 2 0 0 1 9.3 7L6.5 4.2.5 10.1a1.7 1.7 0 0 0 0 2.4l11 11a1.7 1.7 0 0 0 2.4 0l9.6-9.6a1.7 1.7 0 0 0 0-2.4z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.49v-1.71c-2.78.62-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49C19.14 20.64 22 16.79 22 12.26 22 6.58 17.52 2 12 2z" />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" fill="#22c55e" className="w-6 h-6">
      <path d="M12 1.85L2 7.28v9.43L12 22.15l10-5.44V7.28L12 1.85zm0 2.3l7.7 4.2-7.7 4.2-7.7-4.2 7.7-4.2zM4 9.18l7 3.82v7.63l-7-3.82V9.18zm9 11.45v-7.63l7-3.82v7.63l-7 3.82z" />
    </svg>
  ),
  leadership: "🧭",
  teamwork: "🤝",
  communication: "💬",
  pressure: "⚡",
  learning: "🚀",
  problemsolving: "🔍",
  creativity: "🎨",
  punctuality: "⏰",
};
 
const techColors = {
  react: "#61dafb", js: "#f7df1e", tailwind: "#06b6d4", html: "#e34f26",
  python: "#3776ab", csharp: "#9b4f96", mysql: "#f59e0b", git: "#f97316",
  github: "#ffffff", node: "#22c55e",
};
 
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
 
// ── Componente barra de habilidad ──────────────────────────────────────────────
function SkillBar({ name, level, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-gray-300" style={{ fontFamily: "'Space Mono', monospace" }}>{name}</span>
        <span className="text-[10px] text-gray-500" style={{ fontFamily: "'Space Mono', monospace" }}>{level}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
        />
      </div>
    </motion.div>
  );
}
 
// ── Tarjeta tech ───────────────────────────────────────────────────────────────
function TechCard({ id, name, index }) {
  const color = techColors[id] || "#3b82f6";
  const icon = icons[id];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/6 bg-black/40 backdrop-blur-sm
        hover:border-white/15 hover:bg-white/5 transition-all duration-300 cursor-default"
      style={{ boxShadow: `0 0 0 0 ${color}` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        {typeof icon === "string" ? <span className="text-2xl">{icon}</span> : icon}
      </div>
      <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors duration-300 text-center"
        style={{ fontFamily: "'Space Mono', monospace" }}>{name}</span>
      <motion.div
        className="w-1 h-1 rounded-full"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, delay: index * 0.15 }}
      />
    </motion.div>
  );
}
 
// ── Tarjeta soft skill ─────────────────────────────────────────────────────────
function SoftCard({ emoji, label, desc, index, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      className="group flex items-start gap-3 p-4 rounded-2xl border border-white/6 bg-black/40 backdrop-blur-sm
        hover:border-white/15 hover:bg-white/5 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
        {emoji}
      </div>
      <div>
        <p className="text-sm text-white font-medium mb-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>{label}</p>
        <p className="text-[11px] text-gray-500 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
      </div>
      <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
    </motion.div>
  );
}
 
// ── Componente principal ───────────────────────────────────────────────────────
function SkillsPortfolio() {
  const { lang } = useLang();
  const tx = t[lang].skills;
  const [activeTab, setActiveTab] = useState("tech");
 
  return (
    <section id="habilidades" className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <StarBackground density={110} shootingStars={false} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent z-[2]" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#a855f7]/6 rounded-full blur-[130px] pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-[#3b82f6]/5 rounded-full blur-[100px] pointer-events-none z-[1]" />
 
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-28">
 
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-[#a855f7] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>{tx.sectionNum}</span>
          <span className="w-12 h-px bg-[#a855f7]/40" />
          <span className="text-gray-500 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>{tx.sectionLabel}</span>
        </motion.div>
 
        {/* Heading */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Space Mono', monospace" }}>
            {tx.heading1}{" "}
            <span className="relative inline-block">
              <span className="text-[#a855f7]">{tx.heading2}</span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#a855f7]/40" />
            </span>
            {tx.heading3 && <> {tx.heading3}</>}
          </h2>
          <p className="text-gray-500 text-sm max-w-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            {tx.subheading}
          </p>
        </motion.div>
 
        {/* Tabs */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex gap-2 mb-10">
          {[
            { id: "tech", label: tx.tabTech },
            { id: "soft", label: tx.tabSoft },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2.5 rounded-xl text-xs transition-all duration-300"
              style={{
                fontFamily: "'Space Mono', monospace",
                background: activeTab === tab.id ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeTab === tab.id ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.08)"}`,
                color: activeTab === tab.id ? "#a855f7" : "#6b7280",
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>
 
        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "tech" && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Skill bars */}
              <div className="flex flex-col gap-6">
                <p className="text-[10px] text-gray-500 tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>{tx.barsLabel}</p>
                {tx.bars.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} color={skill.color} index={i} />
                ))}
              </div>
 
              {/* Tech grid */}
              <div>
                <p className="text-[10px] text-gray-500 tracking-[0.25em] uppercase mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>{tx.techLabel}</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {tx.techStack.map((tech, i) => (
                    <TechCard key={tech.id} id={tech.id} name={tech.name} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
 
          {activeTab === "soft" && (
            <motion.div
              key="soft"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl"
            >
              {tx.softSkills.map((s, i) => (
                <SoftCard key={s.label} emoji={s.emoji} label={s.label} desc={s.desc} index={i} color={s.color} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
 
        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-8 mt-16 pt-8 border-t border-white/6"
        >
          {tx.stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Mono', monospace" }}>{value}</span>
              <span className="text-[10px] text-gray-500 tracking-wider uppercase mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>{label}</span>
            </div>
          ))}
        </motion.div>
 
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent z-[2]" />
    </section>
  );
}
 
export default SkillsPortfolio;