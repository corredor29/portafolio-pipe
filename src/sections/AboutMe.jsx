import { motion } from "framer-motion";
import foto from "../assets/portada.jpeg";
import StarBackground from "../components/StarBackground";
import { useLang } from "../context/LanguageContext";
import { t } from "../context/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const skills = [
  { name: "Python",       level: 90 },
  { name: "Git",          level: 100 },
  { name: "JavaScript",   level: 80 },
  { name: "React",        level: 82 },
  { name: "Tailwind CSS", level: 82 },
  { name: "C#",           level: 72 },
  { name: "MySQL",        level: 78 },
];

function AboutMe() {
  const { lang } = useLang();
  const tx = t[lang].about;

  return (
    <section id="sobre-mi" className="relative w-full min-h-screen bg-black text-white overflow-hidden">

      <StarBackground density={140} shootingStars={true} />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent z-[2]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#3b82f6]/5 rounded-full blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-purple-900/8 rounded-full blur-[100px] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-28">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-[#3b82f6] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>{tx.sectionNum}</span>
          <span className="w-12 h-px bg-[#3b82f6]/40" />
          <span className="text-gray-500 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>{tx.sectionLabel}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left column */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col gap-6"
          >
            {/* Profile card */}
            <motion.div variants={fadeUp}>
              <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-black/40 backdrop-blur-sm">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#3b82f6]/60 via-[#3b82f6]/20 to-transparent" />
                <div className="flex gap-6 p-6 items-center">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                      style={{ background: "conic-gradient(from 0deg, transparent 50%, #3b82f6 75%, transparent 100%)", padding: "1.5px", borderRadius: "1rem" }}
                    >
                      <div className="w-full h-full rounded-2xl bg-black" />
                    </motion.div>
                    <img src={foto} alt="Pipe" className="w-28 h-28 object-cover rounded-2xl relative z-10"
                      style={{ border: "1.5px solid rgba(59,130,246,0.3)" }} />
                    <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black z-20 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Space Mono', monospace" }}>Felipe Corredor Silva</h3>
                    <p className="text-[#3b82f6] text-sm mb-3" style={{ fontFamily: "'Space Mono', monospace" }}>{tx.role}</p>
                    <div className="flex gap-2">
                      {["React", "Python", "C#"].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] rounded border border-white/10 bg-white/5 text-gray-400"
                          style={{ fontFamily: "'Space Mono', monospace" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Facts grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
              {tx.facts.map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-white/6 bg-black/40 backdrop-blur-sm hover:border-[#3b82f6]/30 hover:bg-white/5 transition-all duration-300">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>{label}</p>
                    <p className="text-sm text-white font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Download CV */}
            <motion.div variants={fadeUp}>
              <a href="#" className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/8 transition-all duration-300 text-sm text-gray-300 hover:text-white"
                style={{ fontFamily: "'Space Mono', monospace" }}>
                <span>↓</span> {tx.downloadCV}
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/8 text-gray-400">PDF</span>
              </a>
            </motion.div>

            {/* Hobbies */}
            <motion.div variants={fadeUp}>
              <div className="rounded-2xl border border-white/8 bg-black/40 backdrop-blur-sm p-5">
                <p className="text-[10px] text-gray-500 tracking-[0.25em] uppercase mb-4"
                  style={{ fontFamily: "'Space Mono', monospace" }}>{tx.hobbiesLabel}</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {tx.hobbies.map(({ emoji, label, sub }) => (
                    <div key={label}
                      className="group flex items-center gap-3 px-3.5 py-3 rounded-xl border border-white/6 bg-white/[0.02]
                        hover:border-[#3b82f6]/35 hover:bg-[#3b82f6]/6 hover:-translate-y-px transition-all duration-250 cursor-default">
                      <div className="w-9 h-9 rounded-[9px] flex items-center justify-center text-[17px] flex-shrink-0 bg-white/[0.04] border border-white/6">
                        {emoji}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-300 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
                        <p className="text-[10px] text-gray-600 mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>{sub}</p>
                      </div>
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3b82f6] opacity-0 group-hover:opacity-100
                        transition-opacity duration-250 flex-shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
                {tx.headline1}{" "}
                <span className="relative inline-block">
                  <span className="text-[#3b82f6]">{tx.headline2}</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#3b82f6]/40" />
                </span>{" "}
                {tx.headline3} <br />
                <span className="text-gray-400">{tx.headline4}</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                {tx.bio}
              </p>
            </motion.div>

            <motion.blockquote variants={fadeUp} className="relative pl-5 border-l-2 border-[#3b82f6]/50">
              <p className="text-gray-300 italic text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {tx.quote}
              </p>
            </motion.blockquote>

            {/* Skills bars */}
            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-5" style={{ fontFamily: "'Space Mono', monospace" }}>{tx.stackLabel}</p>
              {skills.map(({ name, level }, i) => (
                <div key={name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-gray-300" style={{ fontFamily: "'Space Mono', monospace" }}>{name}</span>
                    <span className="text-xs text-gray-500" style={{ fontFamily: "'Space Mono', monospace" }}>{level}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]"
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-4 pt-2">
              <a href="#proyectos"
                className="group px-6 py-3 rounded-xl bg-[#3b82f6] text-white text-sm font-semibold hover:bg-[#2563eb] hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2"
                style={{ fontFamily: "'Space Mono', monospace" }}>
                {tx.ctaProjects} <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
              <a href="#contacto"
                className="px-6 py-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm text-gray-300 text-sm hover:border-white/25 hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
                style={{ fontFamily: "'Space Mono', monospace" }}>
                {tx.ctaContact}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent z-[2]" />
    </section>
  );
}

export default AboutMe;