import { useRef, cloneElement } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { CURTAIN, easeCurtain } from "./curtain";

/**
 * Pins the hero (sticky, 100svh) inside a (100 + CURTAIN*100)vh track. While the wheel moves
 * through the track the hero's clip-path lifts like a curtain (eased) and the next section,
 * held in place by App's AboutStage, is revealed underneath.
 * prefers-reduced-motion: no pin, no clip.
 */
export default function ScrollStage({ children, id = "inicio" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: reduce ? ["start start", "end start"] : ["start start", "end end"],
  });

  const eased = useTransform(scrollYProgress, (p) => easeCurtain(p));
  const lift = useTransform(eased, (e) => e * 100);
  const radius = useTransform(eased, (e) => Math.min(48, e * 120));
  const clipPath = useMotionTemplate`inset(0% 0% ${lift}% 0% round 0px 0px ${radius}px ${radius}px)`;
  const edgeTop = useMotionTemplate`calc(${useTransform(lift, (v) => 100 - v)}% - 1px)`;
  const edgeOpacity = useTransform(eased, [0, 0.03, 0.95, 1], [0, 1, 1, 0]);

  const child = cloneElement(children, { progress: scrollYProgress });

  if (reduce) {
    return (
      <div id={id} ref={ref} className="relative">
        {child}
      </div>
    );
  }

  return (
    <div id={id} ref={ref} data-stage="pin" className="relative z-20 pointer-events-none" style={{ height: `${100 + CURTAIN * 100}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          data-stage="curtain"
          className="absolute inset-0 pointer-events-auto bg-black"
          style={{ clipPath, WebkitClipPath: clipPath, willChange: "clip-path" }}
        >
          {child}
        </motion.div>
        <motion.div
          aria-hidden
          className="absolute inset-x-0 h-px"
          style={{ top: edgeTop, opacity: edgeOpacity, background: "linear-gradient(90deg, transparent, #57707A 20%, #C5BAC4 50%, #57707A 80%, transparent)" }}
        />
      </div>
    </div>
  );
}
