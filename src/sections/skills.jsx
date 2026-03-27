import { useState, useEffect, useRef } from "react";

// ── Star Background ──────────────────────────────────────────────────────────
function StarBackground({ density = 130 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId;

    const stars = Array.from({ length: density }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.6 + 0.15,
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    const shoots = [];
    let shootTimer = 0;

    function spawnShoot() {
      shoots.push({
        x: Math.random() * W * 0.7,
        y: Math.random() * H * 0.4,
        len: Math.random() * 120 + 80,
        speed: Math.random() * 6 + 8,
        angle: Math.PI / 5 + (Math.random() * Math.PI) / 10,
        alpha: 1,
        life: 0,
        maxLife: 60,
      });
    }

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;

      [
        { x: W * 0.15, y: H * 0.25, r: 300, c: "rgba(37,99,235,0.06)" },
        { x: W * 0.85, y: H * 0.65, r: 340, c: "rgba(109,40,217,0.05)" },
        { x: W * 0.5,  y: H * 0.1,  r: 220, c: "rgba(59,130,246,0.04)" },
      ].forEach(({ x, y, r, c }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, c);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      stars.forEach((s) => {
        const pulse = Math.sin(frame * s.speed + s.phase) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * pulse})`;
        ctx.fill();
      });

      shootTimer++;
      if (shootTimer >= 180 + Math.random() * 60) {
        spawnShoot();
        shootTimer = 0;
      }

      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha = 1 - s.life / s.maxLife;
        if (s.alpha <= 0) { shoots.splice(i, 1); continue; }
        const tx = s.x - Math.cos(s.angle) * s.len;
        const ty = s.y - Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.6, `rgba(148,196,255,${s.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,255,${s.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ── Radar Chart ──────────────────────────────────────────────────────────────
function RadarChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cx = 160, cy = 145, R = 105;
    const N = data.length;
    let progress = 0;

    function angle(i) { return (Math.PI * 2 * i) / N - Math.PI / 2; }

    function draw(t) {
      ctx.clearRect(0, 0, 320, 290);

      for (let ring = 1; ring <= 5; ring++) {
        const r = (R * ring) / 5;
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const a = angle(i);
          i === 0
            ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
            : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(148,163,184,0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 0; i < N; i++) {
        const a = angle(i);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        ctx.strokeStyle = "rgba(148,163,184,0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const a = angle(i);
        const r = R * data[i].value * t;
        i === 0
          ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
          : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(99,102,241,0.15)";
      ctx.fill();
      ctx.strokeStyle = "rgba(99,102,241,0.8)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      for (let i = 0; i < N; i++) {
        const a = angle(i);
        const r = R * data[i].value * t;
        ctx.beginPath();
        ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), 4, 0, Math.PI * 2);
        ctx.fillStyle = "#818cf8";
        ctx.fill();
      }

      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(148,163,184,0.8)";
      for (let i = 0; i < N; i++) {
        const a = angle(i);
        const lr = R + 24;
        ctx.fillText(data[i].label, cx + lr * Math.cos(a), cy + lr * Math.sin(a));
      }
    }

    let animId;
    function animate() {
      progress = Math.min(progress + 0.03, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      draw(eased);
      if (progress < 1) animId = requestAnimationFrame(animate);
    }

    const timeout = setTimeout(animate, 400);
    return () => { clearTimeout(timeout); cancelAnimationFrame(animId); };
  }, [data]);

  return <canvas ref={canvasRef} width={320} height={290} />;
}

// ── Tech Icon ─────────────────────────────────────────────────────────────────
function TechIcon({ img, icon, name }) {
  const [failed, setFailed] = useState(false);

  if (img && !failed) {
    return (
      <img
        src={img}
        alt={name}
        onError={() => setFailed(true)}
        className="w-6 h-6 object-contain"
      />
    );
  }
  return <span className="text-base leading-none">{icon}</span>;
}

// ── Animated Bar ──────────────────────────────────────────────────────────────
function AnimBar({ pct, color }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setWidth(pct); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref} className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, background: color }}
      />
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
// img: URL de CDN  →  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/..."
// img: local       →  importa arriba (ej: import pyIcon from "../assets/python.png") y pon img: pyIcon
// img: null        →  muestra el emoji icon como fallback
const TECH_SKILLS = [
  {
    name: "JavaScript",
    pct: 90,
    icon: "⚡",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "linear-gradient(90deg,#b45309,#fbbf24)",
    bg: "rgba(251,191,36,0.1)",
  },
  {
    name: "React",
    pct: 85,
    icon: "⚛",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "linear-gradient(90deg,#0e7490,#22d3ee)",
    bg: "rgba(34,211,238,0.1)",
  },
  {
    name: "Node.js",
    pct: 80,
    icon: "◈",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "linear-gradient(90deg,#166534,#4ade80)",
    bg: "rgba(74,222,128,0.1)",
  },
  {
    name: "TypeScript",
    pct: 80,
    icon: "Ts",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "linear-gradient(90deg,#1e40af,#60a5fa)",
    bg: "rgba(96,165,250,0.1)",
  },
  {
    name: "Python",
    pct: 75,
    icon: "𝜋",
    // Para imagen local: import pyIcon from "../assets/python.png"  →  img: pyIcon
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "linear-gradient(90deg,#1d4ed8,#818cf8)",
    bg: "rgba(129,140,248,0.1)",
  },
  {
    name: "SQL / NoSQL",
    pct: 72,
    icon: "⬡",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "linear-gradient(90deg,#6d28d9,#c084fc)",
    bg: "rgba(192,132,252,0.1)",
  },
  {
    name: "C#",
    pct: 65,
    icon: "C#",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    color: "linear-gradient(90deg,#075985,#38bdf8)",
    bg: "rgba(56,189,248,0.1)",
  },
  {
    name: "Git / CI·CD",
    pct: 88,
    icon: "⑂",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "linear-gradient(90deg,#991b1b,#f87171)",
    bg: "rgba(248,113,113,0.1)",
  },
];

const SOFT_SKILLS = [
  { icon: "🧭", title: "Liderazgo técnico",       desc: "Guío equipos hacia decisiones claras y arquitecturas sostenibles a largo plazo." },
  { icon: "💬", title: "Comunicación efectiva",   desc: "Traduzco conceptos técnicos a lenguaje que cualquier stakeholder comprende." },
  { icon: "🔍", title: "Resolución de problemas", desc: "Descompongo retos complejos en soluciones iterativas y medibles." },
  { icon: "🤝", title: "Trabajo en equipo",        desc: "Colaboro activamente, comparto conocimiento y elevo a mis compañeros." },
  { icon: "🔄", title: "Adaptabilidad",            desc: "Aprendo nuevas tecnologías con rapidez y me ajusto a cambios de contexto." },
  { icon: "⏱",  title: "Gestión del tiempo",       desc: "Priorizo con criterio y entrego con consistencia, incluso bajo presión." },
];

const RADAR_DATA = [
  { label: "Frontend",   value: 0.88 },
  { label: "Backend",    value: 0.80 },
  { label: "DevOps",     value: 0.65 },
  { label: "Liderazgo",  value: 0.82 },
  { label: "Comunic.",   value: 0.78 },
  { label: "Resolución", value: 0.90 },
];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function SkillsPortfolio() {
  const [activeTab, setActiveTab]       = useState("tech");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div
      className="relative min-h-screen bg-[#050b18] text-slate-200 overflow-x-hidden"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');
        .font-mono-custom { font-family: 'Space Mono', monospace; }
      `}</style>

      <StarBackground />

      <div className="relative z-10 max-w-3xl mx-auto px-5 py-16">

        {/* ── Hero ── */}
        <div className="text-center mb-16">
          <span className="font-mono-custom inline-block text-[10px] tracking-[0.22em] uppercase text-blue-400 border border-blue-500/30 rounded-full px-4 py-1 mb-4">
            Portfolio · 2025
          </span>
          <h1
            className="text-5xl font-extrabold leading-[1.05] mb-4"
            style={{
              background: "linear-gradient(135deg, #fff 30%, #7aadff 65%, #b69fff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Desarrollador<br />Full-Stack
          </h1>
          <p className="text-slate-400 text-base max-w-sm mx-auto leading-relaxed">
            Construyendo productos digitales con código limpio,<br />
            liderazgo efectivo y pasión por resolver problemas reales.
          </p>

          <div className="flex justify-center gap-10 mt-8">
            {[["1+", "años exp."], ["10+", "proyectos"], ["5+", "tecnologías"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="font-mono-custom text-2xl font-bold text-blue-300">{n}</div>
                <div className="text-xs text-slate-500 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-white/5 border border-white/[0.08] rounded-full p-1 gap-1">
            {[["tech", "Técnicas"], ["soft", "Blandas"], ["radar", "Visión general"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`font-mono-custom text-xs tracking-wide px-5 py-2 rounded-full transition-all duration-300 ${
                  activeTab === id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tech tab ── */}
        {activeTab === "tech" && (
          <div>
            <p className="font-mono-custom text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5 flex items-center gap-3">
              Habilidades técnicas
              <span className="flex-1 h-px bg-gradient-to-r from-indigo-500/20 to-transparent" />
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TECH_SKILLS.map((s) => (
                <div
                  key={s.name}
                  onMouseEnter={() => setHoveredSkill(s.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`relative bg-white/[0.03] border rounded-2xl p-4 cursor-default transition-all duration-300 ${
                    hoveredSkill === s.name
                      ? "border-indigo-500/40 bg-white/[0.06] -translate-y-0.5"
                      : "border-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/[0.08]"
                      style={{ background: s.bg || "rgba(255,255,255,0.05)" }}
                    >
                      <TechIcon img={s.img} icon={s.icon} name={s.name} />
                    </div>
                    <span className="font-semibold text-slate-200 text-sm">{s.name}</span>
                    <span className="ml-auto font-mono-custom text-xs text-slate-500">{s.pct}%</span>
                  </div>
                  <AnimBar pct={s.pct} color={s.color} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Soft tab ── */}
        {activeTab === "soft" && (
          <div>
            <p className="font-mono-custom text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5 flex items-center gap-3">
              Habilidades blandas
              <span className="flex-1 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOFT_SKILLS.map((s) => (
                <div
                  key={s.title}
                  className="flex gap-4 bg-white/[0.025] border border-white/[0.06] hover:border-violet-500/30 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center text-lg flex-shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200 mb-1">{s.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Radar tab ── */}
        {activeTab === "radar" && (
          <div>
            <p className="font-mono-custom text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5 flex items-center gap-3">
              Visión general
              <span className="flex-1 h-px bg-gradient-to-r from-indigo-500/20 to-transparent" />
            </p>
            <div className="flex flex-col items-center gap-6">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6">
                <RadarChart data={RADAR_DATA} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                {RADAR_DATA.map((d) => (
                  <div key={d.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                    <div className="font-mono-custom text-lg font-bold text-indigo-300">
                      {Math.round(d.value * 100)}%
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          <button className="font-mono-custom text-xs tracking-wide bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95">
            Descargar CV
          </button>
          <button className="font-mono-custom text-xs tracking-wide border border-white/15 hover:border-white/30 text-slate-400 hover:text-slate-200 px-6 py-2.5 rounded-full transition-all duration-200">
            Ver proyectos
          </button>
          <button className="font-mono-custom text-xs tracking-wide border border-white/15 hover:border-white/30 text-slate-400 hover:text-slate-200 px-6 py-2.5 rounded-full transition-all duration-200">
            Contactar
          </button>
        </div>

      </div>
    </div>
  );
}