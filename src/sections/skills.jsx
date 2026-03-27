import { useState } from "react";
import { motion } from "framer-motion";
import StarBackground from "../components/StarBackground";
import pythonImg from "../assets/python.png";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#3b82f6",
    skills: [
      { name: "React", level: 82, icon: "⚛️" },
      { name: "JavaScript", level: 80, icon: "🟨" },
      { name: "Tailwind CSS", level: 82, icon: "🎨" },
      { name: "HTML / CSS", level: 90, icon: "🌐" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#10b981",
    skills: [
      { name: "Python", level: 90, icon: "🐍" },
      { name: "C#", level: 72, icon: "🔷" },
      { name: "Node.js", level: 65, icon: "🟩" },
      { name: "MySQL", level: 78, icon: "🗄️" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    color: "#a855f7",
    skills: [
      { name: "Git", level: 100, icon: "🔧" },
      { name: "GitHub", level: 95, icon: "🐙" },
      { name: "VS Code", level: 95, icon: "💻" },
      { name: "Postman", level: 75, icon: "📮" },
    ],
  },
];

const techStack = [
  { name: "React", color: "#61dafb" },
  { name: "Python", color: "#3b82f6", img: pythonImg },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "C#", color: "#9b59b6" },
  { name: "Tailwind", color: "#06b6d4" },
  { name: "MySQL", color: "#f59e0b" },
  { name: "Git", color: "#f97316" },
  { name: "Node.js", color: "#22c55e" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function SkillBar({ name, level, icon, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-sm text-gray-300" style={{ fontFamily: "'Space Mono', monospace" }}>{name}</span>
        </div>
        <span className="text-xs text-gray-500" style={{ fontFamily: "'Space Mono', monospace" }}>{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.07 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        />
      </div>
    </motion.div>
  );
}

function SkillsPortfolio() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const current = skillCategories.find((c) => c.id === activeCategory);

  return (
    <section id="habilidades" className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <StarBackground density={100} shootingStars={false} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent z-[2]" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#a855f7]/5 rounded-full blur-[120px] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-28">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-[#a855f7] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>05 /</span>
          <span className="w-12 h-px bg-[#a855f7]/40" />
          <span className="text-gray-500 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>habilidades</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — heading + category tabs + bars */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Space Mono', monospace" }}>
                Mi{" "}
                <span className="relative inline-block">
                  <span className="text-[#a855f7]">stack</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#a855f7]/40" />
                </span>{" "}
                técnico.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                Tecnologías y herramientas con las que trabajo día a día para construir productos modernos y eficientes.
              </p>
            </motion.div>

            {/* Category tabs */}
            <motion.div variants={fadeUp} className="flex gap-2">
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 py-2 rounded-lg text-xs transition-all duration-300"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    background: activeCategory === cat.id ? `${cat.color}18` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${activeCategory === cat.id ? cat.color + "50" : "rgba(255,255,255,0.08)"}`,
                    color: activeCategory === cat.id ? cat.color : "#6b7280",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Skill bars */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {current.skills.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} color={current.color} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right — tech stack grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
                Tecnologías principales
              </p>
              <div className="grid grid-cols-2 gap-3">
                {techStack.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={fadeUp}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-white/6 bg-black/40 backdrop-blur-sm
                      hover:border-white/15 hover:bg-white/5 transition-all duration-300 cursor-default"
                  >
                    {tech.img ? (
                      <img src={tech.img} alt={tech.name} className="w-8 h-8 object-contain" />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: `${tech.color}18`, border: `1px solid ${tech.color}30`, color: tech.color, fontFamily: "'Space Mono', monospace" }}
                      >
                        {tech.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Space Mono', monospace" }}>
                      {tech.name}
                    </span>
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                      style={{ background: tech.color, boxShadow: `0 0 6px ${tech.color}` }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 mt-2">
              {[
                { value: "1+", label: "año exp." },
                { value: "10+", label: "proyectos" },
                { value: "5+", label: "tecnologías" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/6 bg-black/40 backdrop-blur-sm text-center">
                  <span className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Mono', monospace" }}>{value}</span>
                  <span className="text-[10px] text-gray-500 tracking-wider uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent z-[2]" />
    </section>
  );
}

export default SkillsPortfolio;