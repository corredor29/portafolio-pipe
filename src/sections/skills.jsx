import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── HABILIDADES con logos ────────────────────────────────────────────────────
// Para usar logos reales, coloca la URL en `logo`. Si está vacío, usa el icono emoji.
const ALL_SKILLS = [
  { label: "Python",       type: "tech", color: "#3b82f6", icon: "🐍",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { label: "React",        type: "tech", color: "#60a5fa", icon: "⚛️",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { label: "JavaScript",   type: "tech", color: "#f59e0b", icon: "📜",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { label: "Tailwind CSS", type: "tech", color: "#06b6d4", icon: "🎨",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { label: "C#",           type: "tech", color: "#a855f7", icon: "🔷",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { label: "MySQL",        type: "tech", color: "#10b981", icon: "🗄️",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { label: "Git",          type: "tech", color: "#f97316", icon: "🌿",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { label: "Node.js",      type: "tech", color: "#84cc16", icon: "🟩",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { label: "Liderazgo",    type: "soft", color: "#ec4899", icon: "👑", logo: "" },
  { label: "Trabajo en equipo", type: "soft", color: "#8b5cf6", icon: "🤝", logo: "" },
  { label: "Resolución de problemas", type: "soft", color: "#14b8a6", icon: "🧠", logo: "" },
  { label: "Comunicación", type: "soft", color: "#f43f5e", icon: "💬", logo: "" },
  { label: "Aprendizaje rápido", type: "soft", color: "#6366f1", icon: "⚡", logo: "" },
  { label: "Trabajo bajo presión", type: "soft", color: "#d946ef", icon: "🔥", logo: "" },
];

// ─── CHIP DE HABILIDAD ────────────────────────────────────────────────────────
function SkillChip({ skill }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-sm"
      style={{
        borderColor: `${skill.color}40`,
        background: `${skill.color}15`,
      }}
    >
      {skill.logo ? (
        <img src={skill.logo} alt={skill.label}
          style={{ width: 16, height: 16, objectFit: "contain" }} />
      ) : (
        <span style={{ fontSize: 13 }}>{skill.icon}</span>
      )}
      <span className="text-xs font-semibold whitespace-nowrap"
        style={{ color: skill.color, fontFamily: "'Space Mono', monospace" }}>
        {skill.label}
      </span>
      {skill.type === "soft" && (
        <span className="text-[8px] px-1 py-0.5 rounded border"
          style={{ color: `${skill.color}99`, borderColor: `${skill.color}30`,
            fontFamily: "'Space Mono', monospace" }}>
          soft
        </span>
      )}
    </motion.div>
  );
}

// ─── MOTOR 3D TENIS DE MESA ───────────────────────────────────────────────────
function PingPongGame3D({ onHit }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const rafRef    = useRef(null);
  const imagesRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    // Precargar logos
    ALL_SKILLS.forEach(s => {
      if (s.logo && !imagesRef.current[s.label]) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = s.logo;
        imagesRef.current[s.label] = img;
      }
    });

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const W = () => canvas.width;
    const H = () => canvas.height;

    // ── Proyección perspectiva 3D ──────────────────────────────────────────
    // Coordenadas de mundo: x ∈ [-1,1], y ∈ [0,1] (profundidad), z ∈ [0,1] (altura)
    // Cámara desde arriba y ligeramente adelante
    const CAM_FOV   = 0.72;   // Factor de perspectiva
    const CAM_Y_OFF = 0.38;   // Qué tan inclinada está la cámara
    const TABLE_W   = 0.9;    // Ancho de la mesa en unidades de mundo
    const TABLE_L   = 1.0;    // Largo
    const BALL_R    = 0.038;  // Radio de la pelota en unidades

    function project(wx, wy, wz) {
      // wy = profundidad [0=cerca, 1=lejos], wx = lado, wz = altura
      const depth = wy * CAM_FOV + (1 - CAM_FOV);
      const sx = W() * 0.5 + wx * W() * 0.44 * depth;
      const sy = H() * (CAM_Y_OFF + wy * (1 - CAM_Y_OFF) * 0.78) - wz * H() * 0.22 * depth;
      return { x: sx, y: sy, scale: depth };
    }

    // ── Estado del juego ───────────────────────────────────────────────────
    const state = {
      // Pelota: bx ∈ [-TABLE_W/2, TABLE_W/2], by ∈ [0,1] profundidad, bz altura
      bx: 0, by: 0.15, bz: 0.12,
      vx: 0.006, vy: 0.009, vz: -0.006, // vz: velocidad vertical (arco)
      gravity: 0.00035,
      // Paletas: posición en x dentro de la mesa
      p1x: 0, p2x: 0,
      p1Hit: 0, p2Hit: 0,
      side: "p2",
      ballScale: 1,
      // Trazo de la pelota (trail)
      trail: [],
    };
    stateRef.current = state;

    // ── Gradientes y colores de mesa ────────────────────────────────────────
    const TABLE_COLOR_NEAR = "#0d2144";
    const TABLE_COLOR_FAR  = "#071428";
    const LINE_COLOR       = "rgba(96,165,250,0.3)";
    const NET_COLOR        = "rgba(148,163,184,0.6)";

    // ── Dibujo de la mesa 3D ───────────────────────────────────────────────
    function drawTable() {
      // 4 esquinas de la mesa
      const corners = [
        project(-TABLE_W/2, 0,   0), // cerca-izq
        project( TABLE_W/2, 0,   0), // cerca-der
        project( TABLE_W/2, TABLE_L, 0), // lejos-der
        project(-TABLE_W/2, TABLE_L, 0), // lejos-izq
      ];

      // Cara superior (superficie)
      ctx.save();
      const grad = ctx.createLinearGradient(0, corners[3].y, 0, corners[0].y);
      grad.addColorStop(0, TABLE_COLOR_FAR);
      grad.addColorStop(1, TABLE_COLOR_NEAR);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      ctx.lineTo(corners[1].x, corners[1].y);
      ctx.lineTo(corners[2].x, corners[2].y);
      ctx.lineTo(corners[3].x, corners[3].y);
      ctx.closePath();
      ctx.fill();

      // Borde de la mesa (grosor lateral)
      const THICKNESS = 10;
      ctx.fillStyle = "#0a1d38";
      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      ctx.lineTo(corners[1].x, corners[1].y);
      ctx.lineTo(corners[1].x, corners[1].y + THICKNESS);
      ctx.lineTo(corners[0].x, corners[0].y + THICKNESS);
      ctx.closePath();
      ctx.fill();

      // Borde brillante de frente
      ctx.strokeStyle = "rgba(59,130,246,0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      ctx.lineTo(corners[1].x, corners[1].y);
      ctx.stroke();

      // Líneas de cancha
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1;
      // Borde exterior
      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      ctx.lineTo(corners[3].x, corners[3].y);
      ctx.lineTo(corners[2].x, corners[2].y);
      ctx.lineTo(corners[1].x, corners[1].y);
      ctx.stroke();
      // Línea central longitudinal
      const cm1 = project(0, 0,   0);
      const cm2 = project(0, TABLE_L, 0);
      ctx.beginPath();
      ctx.moveTo(cm1.x, cm1.y);
      ctx.lineTo(cm2.x, cm2.y);
      ctx.stroke();

      // ── Red 3D ──────────────────────────────────────────────────────────
      const netY = TABLE_L * 0.5;
      const NET_HEIGHT = 0.09;
      const nl1 = project(-TABLE_W/2, netY, 0);
      const nl2 = project(-TABLE_W/2, netY, NET_HEIGHT);
      const nr1 = project( TABLE_W/2, netY, 0);
      const nr2 = project( TABLE_W/2, netY, NET_HEIGHT);

      // Cara frontal de la red
      ctx.fillStyle = "rgba(148,163,184,0.12)";
      ctx.beginPath();
      ctx.moveTo(nl1.x, nl1.y); ctx.lineTo(nr1.x, nr1.y);
      ctx.lineTo(nr2.x, nr2.y); ctx.lineTo(nl2.x, nl2.y);
      ctx.closePath();
      ctx.fill();

      // Hilos de la red
      const STRANDS = 7;
      for (let i = 0; i <= STRANDS; i++) {
        const t  = i / STRANDS;
        const lx = nl1.x + (nr1.x - nl1.x) * t;
        const ly = nl1.y + (nr1.y - nl1.y) * t;
        const tx = nl2.x + (nr2.x - nl2.x) * t;
        const ty = nl2.y + (nr2.y - nl2.y) * t;
        ctx.strokeStyle = NET_COLOR;
        ctx.lineWidth   = 0.7;
        ctx.beginPath();
        ctx.moveTo(lx, ly); ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      // Horizontal top & bottom
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(148,163,184,0.8)";
      ctx.beginPath();
      ctx.moveTo(nl2.x, nl2.y); ctx.lineTo(nr2.x, nr2.y);
      ctx.stroke();
      ctx.strokeStyle = "rgba(148,163,184,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(nl1.x, nl1.y); ctx.lineTo(nr1.x, nr1.y);
      ctx.stroke();

      // Postes de la red
      ctx.strokeStyle = "rgba(200,220,255,0.7)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(nl1.x, nl1.y - 3); ctx.lineTo(nl2.x, nl2.y - 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(nr1.x, nr1.y - 3); ctx.lineTo(nr2.x, nr2.y - 2);
      ctx.stroke();

      ctx.restore();
    }

    // ── Paleta 3D ──────────────────────────────────────────────────────────
    function drawPaddle(px, py, hitAnim, player) {
      const PAD_W   = 0.16;
      const PAD_D   = 0.05;  // profundidad visual
      const HANDLE_L= 0.12;
      const liftZ   = 0.02 + hitAnim * 0.06;

      const c = project(px, py, liftZ);
      const scale = c.scale * Math.min(W(), H()) * 0.0013;

      const color   = player === 1 ? "#c0392b" : "#c0392b";
      const edge    = player === 1 ? "#8b0000" : "#8b0000";
      const rubber1 = player === 1 ? "#e74c3c" : "#1a1a2e";
      const rubber2 = player === 1 ? "#1a1a2e" : "#e74c3c";

      ctx.save();
      ctx.translate(c.x, c.y);

      // Sombra en mesa
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.beginPath();
      ctx.ellipse(0, scale * 8, scale * 80, scale * 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cuerpo de la paleta (perspectiva inclinada)
      const tiltX = hitAnim * 0.3;

      // Cara posterior (hule negro o rojo)
      ctx.fillStyle = rubber2;
      ctx.beginPath();
      ctx.ellipse(tiltX * scale * 5, -scale * 4, scale * 68, scale * 55, 0, 0, Math.PI * 2);
      ctx.fill();

      // Borde
      ctx.strokeStyle = edge;
      ctx.lineWidth = scale * 8;
      ctx.stroke();

      // Cara principal
      ctx.fillStyle = rubber1;
      ctx.shadowColor = hitAnim > 0.3 ? color : "transparent";
      ctx.shadowBlur  = hitAnim > 0.3 ? 25 : 0;
      ctx.beginPath();
      ctx.ellipse(0, -scale * 6, scale * 64, scale * 50, 0, 0, Math.PI * 2);
      ctx.fill();

      // Reflejo
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.beginPath();
      ctx.ellipse(-scale * 15, -scale * 20, scale * 25, scale * 15, -0.5, 0, Math.PI * 2);
      ctx.fill();

      // Mango
      ctx.fillStyle = "#8B6914";
      ctx.strokeStyle = "#5C4300";
      ctx.lineWidth = scale * 2;
      ctx.beginPath();
      ctx.roundRect(
        -scale * 8,
        scale * 42,
        scale * 16,
        scale * 45,
        scale * 4
      );
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    // ── Pelota 3D ──────────────────────────────────────────────────────────
    function drawBall(s) {
      const p = project(s.bx, s.by, s.bz);
      const r = BALL_R * W() * p.scale * 0.88 * s.ballScale;

      ctx.save();

      // Sombra en la mesa (proyectada abajo)
      const shadow = project(s.bx, s.by, 0);
      const shadowR = r * (1 - s.bz * 0.5);
      ctx.fillStyle = `rgba(0,0,0,${0.35 * (1 - s.bz * 0.6)})`;
      ctx.beginPath();
      ctx.ellipse(shadow.x, shadow.y, shadowR, shadowR * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Trail
      s.trail.forEach((pt, i) => {
        const tp = project(pt.x, pt.y, pt.z);
        const tr = r * (i / s.trail.length) * 0.6;
        ctx.fillStyle = `rgba(255,255,255,${(i / s.trail.length) * 0.18})`;
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, tr, 0, Math.PI * 2);
        ctx.fill();
      });

      // Gradiente esférico
      const gx = p.x - r * 0.35;
      const gy = p.y - r * 0.35;
      const grad = ctx.createRadialGradient(gx, gy, r * 0.05, p.x, p.y, r);
      grad.addColorStop(0,   "#ffffff");
      grad.addColorStop(0.2, "#f0f4ff");
      grad.addColorStop(0.7, "#d6e4ff");
      grad.addColorStop(1,   "#93c5fd");

      ctx.shadowColor = "rgba(147,197,253,0.6)";
      ctx.shadowBlur  = r * 1.5;
      ctx.fillStyle   = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();

      // Brillo especular
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.ellipse(p.x - r * 0.28, p.y - r * 0.28, r * 0.22, r * 0.15, -0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // ── Fondo ambiental ────────────────────────────────────────────────────
    function drawBackground() {
      ctx.clearRect(0, 0, W(), H());

      // Suelo del salón
      const floorGrad = ctx.createLinearGradient(0, H() * 0.5, 0, H());
      floorGrad.addColorStop(0, "#080d18");
      floorGrad.addColorStop(1, "#040810");
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, H() * 0.5, W(), H());

      // Techo/fondo
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H() * 0.5);
      bgGrad.addColorStop(0, "#050b1a");
      bgGrad.addColorStop(1, "#080d18");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W(), H() * 0.5);

      // Luz cenital (spot)
      const spotlight = ctx.createRadialGradient(W() * 0.5, H() * 0.1, 0, W() * 0.5, H() * 0.5, W() * 0.6);
      spotlight.addColorStop(0, "rgba(59,130,246,0.07)");
      spotlight.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, W(), H());
    }

    // ── Patas de la mesa ───────────────────────────────────────────────────
    function drawTableLegs() {
      const legs = [
        { wx: -TABLE_W/2 + 0.06, wy: 0.04 },
        { wx:  TABLE_W/2 - 0.06, wy: 0.04 },
        { wx: -TABLE_W/2 + 0.06, wy: TABLE_L - 0.04 },
        { wx:  TABLE_W/2 - 0.06, wy: TABLE_L - 0.04 },
      ];
      legs.forEach(({ wx, wy }) => {
        const top = project(wx, wy, 0);
        const bot = project(wx, wy + 0.02, -0.3);
        ctx.strokeStyle = "#1e3a5f";
        ctx.lineWidth = 4 * top.scale;
        ctx.beginPath();
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(bot.x, bot.y);
        ctx.stroke();
      });
    }

    // ── Loop principal ─────────────────────────────────────────────────────
    function tick() {
      const s = stateRef.current;

      drawBackground();
      drawTableLegs();
      drawTable();

      // IA de las paletas
      const p1TargetY = 0.08;
      const p2TargetY = TABLE_L - 0.08;
      s.p1x += (s.bx - s.p1x) * 0.055;
      s.p2x += (s.bx - s.p2x) * 0.055;

      // Mover pelota
      s.trail.push({ x: s.bx, y: s.by, z: s.bz });
      if (s.trail.length > 8) s.trail.shift();

      s.bx += s.vx;
      s.by += s.vy;
      s.bz += s.vz;
      s.vz -= s.gravity; // gravedad

      // Rebote en bordes laterales
      if (s.bx < -TABLE_W/2 + BALL_R) { s.bx = -TABLE_W/2 + BALL_R; s.vx = Math.abs(s.vx); }
      if (s.bx >  TABLE_W/2 - BALL_R) { s.bx =  TABLE_W/2 - BALL_R; s.vx = -Math.abs(s.vx); }

      // Rebote en la mesa (z=0)
      if (s.bz < BALL_R && s.vz < 0) {
        s.bz  = BALL_R;
        s.vz  = Math.abs(s.vz) * 0.62; // pérdida de energía al botar
        if (Math.abs(s.vz) < 0.003) s.vz = 0.003;
      }

      // Colisión paleta cercana (jugador 1, by cerca de 0)
      if (s.by < p1TargetY + 0.07 && s.by > 0 && s.vy < 0 && s.side === "p1") {
        s.by    = p1TargetY + 0.07;
        s.vy    = Math.abs(s.vy) * (1.0 + Math.random() * 0.08);
        s.vz    = 0.008 + Math.random() * 0.005; // lanzar arriba
        s.vx   += (Math.random() - 0.5) * 0.004;
        s.p1Hit = 1;
        s.side  = "p2";
        s.ballScale = 1.4;
        onHit("p1");
      }

      // Colisión paleta lejana (jugador 2, by cerca de TABLE_L)
      if (s.by > TABLE_L - p1TargetY - 0.07 && s.by < TABLE_L && s.vy > 0 && s.side === "p2") {
        s.by    = TABLE_L - p1TargetY - 0.07;
        s.vy    = -Math.abs(s.vy) * (1.0 + Math.random() * 0.08);
        s.vz    = 0.008 + Math.random() * 0.005;
        s.vx   += (Math.random() - 0.5) * 0.004;
        s.p2Hit = 1;
        s.side  = "p1";
        s.ballScale = 1.4;
        onHit("p2");
      }

      // Garantizar velocidad mínima en y
      if (Math.abs(s.vy) < 0.006) s.vy = s.vy > 0 ? 0.007 : -0.007;
      // Limitar velocidad en x
      s.vx = Math.max(-0.014, Math.min(0.014, s.vx));

      // Decay
      s.p1Hit     = Math.max(0, s.p1Hit     - 0.06);
      s.p2Hit     = Math.max(0, s.p2Hit     - 0.06);
      s.ballScale = Math.max(1, s.ballScale - 0.035);

      // Dibujar paletas (orden: la más lejos primero)
      drawPaddle(s.p2x, TABLE_L - 0.08, s.p2Hit, 2);
      drawBall(s);
      drawPaddle(s.p1x, p1TargetY, s.p1Hit, 1);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onHit]);

  return (
    <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
  );
}

// ─── SECCIÓN PRINCIPAL ────────────────────────────────────────────────────────
function Skills() {
  const [revealed,  setRevealed]  = useState([]);
  const [floating,  setFloating]  = useState([]);
  const skillIndex  = useRef(0);
  const floatId     = useRef(0);

  const handleHit = useCallback((player) => {
    if (skillIndex.current >= ALL_SKILLS.length) return;
    const skill = ALL_SKILLS[skillIndex.current++];
    setRevealed(prev => [...prev, skill]);

    const id = floatId.current++;
    setFloating(prev => [...prev, { id, skill, player }]);
    setTimeout(() => setFloating(prev => prev.filter(f => f.id !== id)), 1400);
  }, []);

  const allDone = revealed.length >= ALL_SKILLS.length;

  return (
    <section
      id="habilidades"
      className="relative w-full bg-[#04080f] text-white overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1d4ed8]/6 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-900/8 rounded-full blur-[120px]" />
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent z-[2]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-28">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[#3b82f6] text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}>05 /</span>
          <span className="w-12 h-px bg-[#3b82f6]/40" />
          <span className="text-gray-500 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}>habilidades</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-3"
            style={{ fontFamily: "'Space Mono', monospace" }}>
            Mis{" "}
            <span className="relative inline-block">
              <span className="text-[#3b82f6]">habilidades</span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#3b82f6]/40" />
            </span>
          </h2>
          <p className="text-gray-500 text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Cada golpe revela una nueva habilidad. ¡Observa el juego!
          </p>
        </motion.div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── PING PONG 3D ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="relative rounded-2xl border border-white/8 overflow-hidden"
              style={{ height: "440px", background: "#04080f" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/50 to-transparent z-10" />

              <PingPongGame3D onHit={handleHit} />

              {/* Player labels */}
              <div className="absolute top-3 left-4 flex items-center gap-2 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e74c3c]" />
                <span className="text-[10px] text-[#e74c3c]"
                  style={{ fontFamily: "'Space Mono', monospace" }}>Jugador 1</span>
              </div>
              <div className="absolute top-3 right-4 flex items-center gap-2 z-10">
                <span className="text-[10px] text-[#a855f7]"
                  style={{ fontFamily: "'Space Mono', monospace" }}>Jugador 2</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#a855f7]" />
              </div>

              {/* Contador */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10
                flex items-center gap-2 px-3 py-1 rounded-full border border-white/8 bg-black/70 backdrop-blur-sm">
                <span className="text-[10px] text-gray-400"
                  style={{ fontFamily: "'Space Mono', monospace" }}>
                  {revealed.length}/{ALL_SKILLS.length} habilidades
                </span>
                {allDone && (
                  <span className="text-[10px] text-emerald-400"
                    style={{ fontFamily: "'Space Mono', monospace" }}>
                    ✓ completo
                  </span>
                )}
              </div>

              {/* Chips flotantes */}
              <AnimatePresence>
                {floating.map(({ id, skill, player }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.5, y: player === "p1" ? 30 : -30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: player === "p1" ? -40 : 40 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none
                      flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm"
                    style={{
                      top: player === "p1" ? "auto" : "18%",
                      bottom: player === "p1" ? "18%" : "auto",
                      borderColor: `${skill.color}55`,
                      background: `${skill.color}22`,
                      boxShadow: `0 0 28px ${skill.color}35`,
                    }}
                  >
                    {skill.logo ? (
                      <img src={skill.logo} alt={skill.label}
                        style={{ width: 20, height: 20, objectFit: "contain" }} />
                    ) : (
                      <span style={{ fontSize: 16 }}>{skill.icon}</span>
                    )}
                    <span className="text-sm font-bold"
                      style={{ color: skill.color, fontFamily: "'Space Mono', monospace" }}>
                      {skill.label}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Leyenda */}
            <div className="flex items-center gap-4 mt-3 px-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                <span className="text-[10px] text-gray-600"
                  style={{ fontFamily: "'Space Mono', monospace" }}>Técnica</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ec4899]" />
                <span className="text-[10px] text-gray-600"
                  style={{ fontFamily: "'Space Mono', monospace" }}>Soft skill</span>
              </div>
              <span className="text-[10px] text-gray-700 ml-auto"
                style={{ fontFamily: "'Space Mono', monospace" }}>
                animación automática
              </span>
            </div>
          </motion.div>

          {/* ── PANEL DE HABILIDADES ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-white/8 bg-black/40 backdrop-blur-sm p-5 min-h-[440px]">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] text-gray-500 tracking-[0.25em] uppercase"
                  style={{ fontFamily: "'Space Mono', monospace" }}>
                  Habilidades desbloqueadas
                </p>
                {revealed.length > 0 && (
                  <motion.span
                    key={revealed.length}
                    initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="text-xs text-[#3b82f6]"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    +{revealed.length}
                  </motion.span>
                )}
              </div>

              {revealed.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-full border border-[#3b82f6]/30 flex items-center justify-center"
                  >
                    <span className="text-[#3b82f6] text-xl">🏓</span>
                  </motion.div>
                  <p className="text-gray-700 text-xs text-center"
                    style={{ fontFamily: "'Space Mono', monospace" }}>
                    Esperando el primer golpe...
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {revealed.map((skill) => (
                      <SkillChip key={skill.label} skill={skill} />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {revealed.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/6">
                  <div className="flex justify-between mb-2">
                    <span className="text-[9px] text-gray-600 uppercase tracking-wider"
                      style={{ fontFamily: "'Space Mono', monospace" }}>Progreso</span>
                    <span className="text-[9px] text-[#3b82f6]"
                      style={{ fontFamily: "'Space Mono', monospace" }}>
                      {Math.round((revealed.length / ALL_SKILLS.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7]"
                      animate={{ width: `${(revealed.length / ALL_SKILLS.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  {allDone && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-emerald-400 mt-3 text-center"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      ✓ ¡Todas las habilidades reveladas!
                    </motion.p>
                  )}
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent z-[2]" />
    </section>
  );
}

export default Skills;