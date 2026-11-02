import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import AboutMe from "./sections/AboutMe";
import Projects from "./sections/Projects";
import Recommendations from "./sections/Recommendations";
import SkillsPortfolio from "./sections/skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import ScrollStage from "./components/ScrollStage";
import { CURTAIN, easeCurtain } from "./components/curtain";
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";

/*
 * Scroll chain (px; vh = innerHeight, D = CURTAIN*vh curtain travel, H = About height):
 *  [0, D]            Hero curtain lifts (ScrollStage, eased). About held at top: y = v - D.
 *  [D, v1]           About scrolls normally, v1 = D + H - vh (About bottom meets viewport bottom).
 *  [v1, v1 + D]      About's last screen held (y = v - v1), clipped from bottom by ease(t)*vh.
 *                    Projects (pushed down by a D - vh spacer) held at top: y = v - v1 - D.
 *  > v1 + D          Projects in normal flow (ProjectsHold y = 0). T = Projects layout top, Hp = its height.
 *  [v1+D, v2]        Projects scrolls normally; v2 = T + Hp - vh (≈ T on lg where Hp = 100dvh).
 *  [v2, v2 + D]      Projects held (inner y = v - v2), clipped from bottom by ease(t)*vh (ProjectsStage).
 *                    Recommendations (pushed down by a D - vh spacer) held at top: y = v - v2 - D (RecsHold).
 *  > v2 + D          Recommendations in normal flow (RecsHold y = 0). Tr = Recs layout top (= v2 + D), Hr = its height.
 *  [v2+D, v3]        Recs scrolls normally; v3 = Tr + Hr - vh (= Tr when Hr = 100dvh).
 *  [v3, v3 + D]      Recs held (inner y = v - v3), clipped from bottom by ease((v - v3)/D)*vh (RecsStage).
 *                    Skills (pushed down by a D - vh spacer) held at top: y = clamp(v - v3 - D, -D, 0) (SkillsHold).
 *  [v3+D, v4]        Skills scrolls normally; v4 = Ts + Hs - vh (= Ts when Hs = 100dvh).
 *  [v4, v4 + D]      Skills held (inner y = v - v4), clipped from bottom by ease((v - v4)/D)*vh (SkillsStage).
 *                    Contact (pushed down by a D - vh spacer) held at top: y = clamp(v - v4 - D, -D, 0) (ContactHold).
 *  > v4 + D          Contact in normal flow. Reduced motion: no transforms / spacers anywhere.
 */
function useViewport(ref) {
  const [m, setM] = useState({ vh: typeof window !== "undefined" ? window.innerHeight : 900, h: 0 });
  useEffect(() => {
    const update = () => setM({ vh: window.innerHeight, h: ref.current?.offsetHeight || 0 });
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, [ref]);
  return m;
}

function AboutStage({ children, onMeasure }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { vh, h } = useViewport(ref);
  const { scrollY } = useScroll();
  const H = Math.max(h, vh);
  const D = CURTAIN * vh;
  const v1 = D + H - vh;

  useEffect(() => { onMeasure(H); }, [H, onMeasure]);

  const y = useTransform(scrollY, (v) => {
    if (reduce) return 0;
    if (v < D) return v - D;
    if (v < v1) return 0;
    return Math.min(v - v1, D);
  });
  const lift = useTransform(scrollY, (v) => (reduce ? 0 : easeCurtain((v - v1) / D) * vh));
  const radius = useTransform(lift, (l) => Math.min(48, (l / vh) * 120));
  const clipPath = useMotionTemplate`inset(0px 0px ${lift}px 0px round 0px 0px ${radius}px ${radius}px)`;
  const seamTop = useTransform(lift, (l) => H - l - 1);
  const seamOpacity = useTransform(lift, (l) => (l > 2 && l < vh - 2 ? 1 : 0));

  return (
    <motion.div ref={ref} data-stage="about-curtain"
      className="sobre-mi-wrap relative z-10 motion-safe:-mt-[100vh] bg-black"
      style={{ y, clipPath, WebkitClipPath: clipPath }}>
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 h-px"
        style={{ top: seamTop, opacity: seamOpacity, background: "linear-gradient(90deg, transparent, #57707A 20%, #C5BAC4 50%, #57707A 80%, transparent)" }} />
    </motion.div>
  );
}

function ProjectsHold({ children, aboutH }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 900);
  useEffect(() => {
    const r = () => setVh(window.innerHeight);
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);
  const D = CURTAIN * vh;
  const active = !reduce && aboutH > 0;
  const y = useTransform(scrollY, (v) => {
    if (!active) return 0;
    const v1 = D + aboutH - vh;
    return Math.max(-D, Math.min(0, v - v1 - D));
  });
  return (
    <motion.div id="proyectos" className="relative z-[5]" style={{ y, marginTop: active ? D - vh : 0 }}>
      {children}
    </motion.div>
  );
}

function absTop(el) {
  let t = 0;
  for (let n = el; n; n = n.offsetParent) t += n.offsetTop;
  return t;
}

/* Projects→Recs curtain. Only active after ProjectsHold has settled (v > v1 + D), so it composes with it. */
function ProjectsStage({ children, aboutH, onMeasure }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { vh, h } = useViewport(ref);
  const [T, setT] = useState(0);
  useEffect(() => {
    const m = () => ref.current && setT(absTop(ref.current));
    m();
    window.addEventListener("resize", m);
    window.addEventListener("load", m);
    return () => { window.removeEventListener("resize", m); window.removeEventListener("load", m); };
  }, [aboutH, h, vh]);
  const { scrollY } = useScroll();
  const Hp = Math.max(h, vh);
  const D = CURTAIN * vh;
  const v2 = T + Hp - vh;
  const active = !reduce && aboutH > 0 && T > 0;
  useEffect(() => { onMeasure(active ? v2 : 0); }, [active, v2, onMeasure]);

  const y = useTransform(scrollY, (v) => (active ? Math.max(0, Math.min(v - v2, D)) : 0));
  const lift = useTransform(scrollY, (v) => (active ? easeCurtain((v - v2) / D) * vh : 0));
  const radius = useTransform(lift, (l) => Math.min(48, (l / vh) * 120));
  const clipPath = useMotionTemplate`inset(0px 0px ${lift}px 0px round 0px 0px ${radius}px ${radius}px)`;
  const seamTop = useTransform(lift, (l) => Hp - l - 1);
  const seamOpacity = useTransform(lift, (l) => (l > 2 && l < vh - 2 ? 1 : 0));

  return (
    <motion.div ref={ref} data-stage="projects-curtain" className="relative bg-black"
      style={{ y, clipPath, WebkitClipPath: clipPath }}>
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 h-px"
        style={{ top: seamTop, opacity: seamOpacity, background: "linear-gradient(90deg, transparent, #57707A 20%, #C5BAC4 50%, #57707A 80%, transparent)" }} />
    </motion.div>
  );
}

function RecsHold({ children, v2 }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 900);
  useEffect(() => {
    const r = () => setVh(window.innerHeight);
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);
  const D = CURTAIN * vh;
  const active = !reduce && v2 > 0;
  const y = useTransform(scrollY, (v) => (active ? Math.max(-D, Math.min(0, v - v2 - D)) : 0));
  return (
    <motion.div id="recomendaciones" className="relative z-[3]" style={{ y, marginTop: active ? D - vh : 0 }}>
      {children}
    </motion.div>
  );
}

/* Recs->Skills curtain. Active only after RecsHold settled (v > v2 + D). */
function RecsStage({ children, v2, onMeasure }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { vh, h } = useViewport(ref);
  const [T, setT] = useState(0);
  useEffect(() => {
    const m = () => ref.current && setT(absTop(ref.current));
    m();
    window.addEventListener("resize", m);
    window.addEventListener("load", m);
    return () => { window.removeEventListener("resize", m); window.removeEventListener("load", m); };
  }, [v2, h, vh]);
  const { scrollY } = useScroll();
  const Hr = Math.max(h, vh);
  const D = CURTAIN * vh;
  const v3 = T + Hr - vh;
  const active = !reduce && v2 > 0 && T > 0;
  useEffect(() => { onMeasure(active ? v3 : 0); }, [active, v3, onMeasure]);

  const y = useTransform(scrollY, (v) => (active ? Math.max(0, Math.min(v - v3, D)) : 0));
  const lift = useTransform(scrollY, (v) => (active ? easeCurtain((v - v3) / D) * vh : 0));
  const radius = useTransform(lift, (l) => Math.min(48, (l / vh) * 120));
  const clipPath = useMotionTemplate`inset(0px 0px ${lift}px 0px round 0px 0px ${radius}px ${radius}px)`;
  const seamTop = useTransform(lift, (l) => Hr - l - 1);
  const seamOpacity = useTransform(lift, (l) => (l > 2 && l < vh - 2 ? 1 : 0));

  return (
    <motion.div ref={ref} data-stage="recs-curtain" className="relative bg-black"
      style={{ y, clipPath, WebkitClipPath: clipPath }}>
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 h-px"
        style={{ top: seamTop, opacity: seamOpacity, background: "linear-gradient(90deg, transparent, #57707A 20%, #C5BAC4 50%, #57707A 80%, transparent)" }} />
    </motion.div>
  );
}

function SkillsHold({ children, v3 }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 900);
  useEffect(() => {
    const r = () => setVh(window.innerHeight);
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);
  const D = CURTAIN * vh;
  const active = !reduce && v3 > 0;
  const y = useTransform(scrollY, (v) => (active ? Math.max(-D, Math.min(0, v - v3 - D)) : 0));
  return (
    <motion.div id="habilidades" className="relative z-[2]" style={{ y, marginTop: active ? D - vh : 0 }}>
      {children}
    </motion.div>
  );
}

/* Skills->Contact curtain. Active only after SkillsHold settled (v > v3 + D). */
function SkillsStage({ children, v3, onMeasure }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { vh, h } = useViewport(ref);
  const [T, setT] = useState(0);
  useEffect(() => {
    const m = () => ref.current && setT(absTop(ref.current));
    m();
    window.addEventListener("resize", m);
    window.addEventListener("load", m);
    return () => { window.removeEventListener("resize", m); window.removeEventListener("load", m); };
  }, [v3, h, vh]);
  const { scrollY } = useScroll();
  const Hs = Math.max(h, vh);
  const D = CURTAIN * vh;
  const v4 = T + Hs - vh;
  const active = !reduce && v3 > 0 && T > 0;
  useEffect(() => { onMeasure(active ? v4 : 0); }, [active, v4, onMeasure]);

  const y = useTransform(scrollY, (v) => (active ? Math.max(0, Math.min(v - v4, D)) : 0));
  const lift = useTransform(scrollY, (v) => (active ? easeCurtain((v - v4) / D) * vh : 0));
  const radius = useTransform(lift, (l) => Math.min(48, (l / vh) * 120));
  const clipPath = useMotionTemplate`inset(0px 0px ${lift}px 0px round 0px 0px ${radius}px ${radius}px)`;
  const seamTop = useTransform(lift, (l) => Hs - l - 1);
  const seamOpacity = useTransform(lift, (l) => (l > 2 && l < vh - 2 ? 1 : 0));

  return (
    <motion.div ref={ref} data-stage="skills-curtain" className="relative bg-black"
      style={{ y, clipPath, WebkitClipPath: clipPath }}>
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 h-px"
        style={{ top: seamTop, opacity: seamOpacity, background: "linear-gradient(90deg, transparent, #57707A 20%, #C5BAC4 50%, #57707A 80%, transparent)" }} />
    </motion.div>
  );
}

function ContactHold({ children, v4 }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 900);
  useEffect(() => {
    const r = () => setVh(window.innerHeight);
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);
  const D = CURTAIN * vh;
  const active = !reduce && v4 > 0;
  const y = useTransform(scrollY, (v) => (active ? Math.max(-D, Math.min(0, v - v4 - D)) : 0));
  return (
    <motion.div id="contacto" className="relative z-[1]" style={{ y, marginTop: active ? D - vh : 0 }}>
      {children}
    </motion.div>
  );
}

function App() {
  const [aboutH, setAboutH] = useState(0);
  const [v2, setV2] = useState(0);
  const [v3, setV3] = useState(0);
  const [v4, setV4] = useState(0);
  return (
    <div className="bg-black text-white">
      <Navbar />
      <ScrollStage id="inicio">
        <Hero />
      </ScrollStage>
      <AboutStage onMeasure={setAboutH}>
        <AboutMe />
      </AboutStage>
      <ProjectsHold aboutH={aboutH}>
        <ProjectsStage aboutH={aboutH} onMeasure={setV2}>
          <Projects />
        </ProjectsStage>
      </ProjectsHold>
      <RecsHold v2={v2}>
        <RecsStage v2={v2} onMeasure={setV3}>
          <Recommendations />
        </RecsStage>
      </RecsHold>
      <SkillsHold v3={v3}>
        <SkillsStage v3={v3} onMeasure={setV4}>
          <SkillsPortfolio />
        </SkillsStage>
      </SkillsHold>
      <ContactHold v4={v4}>
        <Contact />
      </ContactHold>
      <Footer />
    </div>
  );
}

export default App;
