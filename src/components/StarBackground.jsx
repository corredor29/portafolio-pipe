import { useEffect, useRef } from "react";

function StarBackground({ density = 120, shootingStars = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId;

    /* ── Stars ── */
    const stars = Array.from({ length: density }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.6 + 0.15,
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    /* ── Shooting stars ── */
    const shoots = [];
    let shootTimer = 0;
    const SHOOT_INTERVAL = 180;

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

    /* ── Nebula blobs (static, painted once) ── */
    const offscreen = document.createElement("canvas");
    offscreen.width = W;
    offscreen.height = H;
    const octx = offscreen.getContext("2d");

    const blobs = [
      { x: W * 0.15, y: H * 0.3,  r: 280, color: "rgba(37,99,235,0.07)" },
      { x: W * 0.85, y: H * 0.6,  r: 320, color: "rgba(109,40,217,0.05)" },
      { x: W * 0.5,  y: H * 0.15, r: 200, color: "rgba(59,130,246,0.04)" },
    ];
    blobs.forEach(({ x, y, r, color }) => {
      const g = octx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "transparent");
      octx.fillStyle = g;
      octx.beginPath();
      octx.arc(x, y, r, 0, Math.PI * 2);
      octx.fill();
    });

    /* ── Resize ── */
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    /* ── Render loop ── */
    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      /* nebula */
      ctx.drawImage(offscreen, 0, 0);

      /* stars */
      frame++;
      stars.forEach((s) => {
        const pulse = Math.sin(frame * s.speed + s.phase) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * pulse})`;
        ctx.fill();
      });

      /* shooting stars */
      if (shootingStars) {
        shootTimer++;
        if (shootTimer >= SHOOT_INTERVAL + Math.random() * 60) {
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

          const tailX = s.x - Math.cos(s.angle) * s.len;
          const tailY = s.y - Math.sin(s.angle) * s.len;

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.6, `rgba(148,196,255,${s.alpha * 0.4})`);
          grad.addColorStop(1, `rgba(255,255,255,${s.alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          /* head glow */
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,230,255,${s.alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [density, shootingStars]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default StarBackground;