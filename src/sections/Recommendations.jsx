import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/useLang";
import { t } from "../context/translations";
import wen from "../assets/wen.jpg";
import heili from "../assets/heili.jpeg";
import dilan from "../assets/dilan.jpg";
import panelita from "../assets/panelita.png";
import juan from "../assets/sebas.png";
import tomas from "../assets/tomas.png";
import juanCogollo from "../assets/cogollo.png";

const EXPO = [0.22, 1, 0.36, 1];
const MONO = { fontFamily: "'Space Mono', monospace" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };
const DISPLAY = { fontFamily: "'Anton', sans-serif" };
const C = { deep: "#191D23", accent: "#57707A", steel: "#7B919C", mist: "#989DAA", rose: "#C5BAC4", ink: "#DEDCDC" };

// avatars keyed by name (EN list orders ids 6/7 differently than ES)
const PHOTOS = {
  "Wendy Angelica": wen, "Heiling Bernal": heili, "Dilan Corredor": dilan, "Sebastian Gualdron": panelita,
  "Juan Tapias": juan, "Tomas Gonzalez": tomas, "Juan Cogollo": juanCogollo,
};
const COPY = {
  es: { title: "Recomendaciones", kicker: "04 — Voces", list: "Índice", rating: "Valoración" },
  en: { title: "Recommendations", kicker: "04 — Voices", list: "Index", rating: "Rating" },
};
const pad = (n) => String(n).padStart(2, "0");
const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("");

function Stage({ person, index, total, copy }) {
  const photo = PHOTOS[person.name];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.figure key={person.name}
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)", y: 18 }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0 }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: EXPO } }}
        transition={{ duration: 0.8, ease: EXPO }}
        className="relative h-full flex flex-col justify-center">
        <span aria-hidden="true" className="pointer-events-none select-none absolute -top-6 md:-top-10 -left-2 leading-none"
          style={{ ...DISPLAY, fontSize: "clamp(9rem, min(22vw, 34vh), 20rem)", color: "transparent", WebkitTextStroke: `1px ${C.rose}55` }}>
          {pad(index + 1)}
        </span>
        <div className="relative flex items-center gap-4 mb-6 text-[11px] uppercase tracking-[0.3em]" style={{ ...MONO, color: C.steel }}>
          <span style={{ color: C.rose }}>{pad(index + 1)}</span> / {pad(total)}
          <span className="h-px w-10" style={{ background: C.accent }} />
          <span>{person.relation}</span>
        </div>
        <blockquote className="relative max-w-[52rem] leading-[1.38] mb-10"
          style={{ ...SANS, fontWeight: 400, color: C.ink, fontSize: "clamp(1.15rem, min(1.85vw, 3.1vh), 2.05rem)" }}>
          <span style={{ color: C.rose }}>“</span>{person.text}<span style={{ color: C.rose }}>”</span>
        </blockquote>
        <figcaption className="relative flex items-center gap-5">
          <span className="w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] shrink-0 overflow-hidden border" style={{ borderColor: `${C.steel}33`, background: C.deep }}>
            {photo ? (
              <img src={photo} alt={person.name} className="w-full h-full object-cover" />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-sm" style={{ ...MONO, color: C.steel }}>{initials(person.name)}</span>
            )}
          </span>
          <span className="flex flex-col gap-1.5 min-w-0">
            <span className="uppercase leading-none" style={{ ...DISPLAY, color: C.ink, fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}>{person.name}</span>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ ...MONO, color: `${C.ink}d9` }}>
              {person.role}{person.company ? ` · ${person.company}` : ""}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ ...MONO, color: C.mist }}>
              {copy.rating} <span style={{ color: C.rose }}>{"★".repeat(person.stars)}</span> {person.stars} / 3
            </span>
          </span>
        </figcaption>
      </motion.figure>
    </AnimatePresence>
  );
}

function Recommendations() {
  const { lang } = useLang();
  const list = t[lang].recommendations.list;
  const copy = COPY[lang] || COPY.es;
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const person = list[active] || list[0];

  const onKey = (e) => {
    let n = null;
    if (["ArrowDown", "ArrowRight", "j"].includes(e.key)) n = (active + 1) % list.length;
    if (["ArrowUp", "ArrowLeft", "k"].includes(e.key)) n = (active - 1 + list.length) % list.length;
    if (n === null) return;
    e.preventDefault();
    setActive(n);
  };

  return (
    <section id="recomendaciones-stage" className="relative w-full text-white overflow-hidden lg:h-[100dvh] flex flex-col pt-20 lg:pt-[5.5rem] pb-8"
      style={{ background: `linear-gradient(180deg, ${C.deep} 0%, #07080A 55%, #000 100%)` }}>
      <header className="shrink-0 px-6 md:px-12 lg:px-16 pb-6 flex items-end gap-6">
        <h2 className="uppercase leading-[0.8]" style={{ ...DISPLAY, color: C.accent, fontSize: "clamp(2.4rem, min(5vw, 8vh), 4.5rem)" }}>{copy.title}</h2>
        <div className="hidden md:flex items-center gap-4 pb-1 text-[11px] uppercase tracking-[0.3em]" style={{ ...MONO, color: C.steel }}>
          <span>{copy.kicker}</span>
          <span className="h-px w-16" style={{ background: `${C.steel}44` }} />
          <span style={{ color: C.mist }}>{pad(list.length)}</span>
        </div>
      </header>

      <div className="flex-1 min-h-0 px-6 md:px-12 lg:px-16 grid lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem] gap-10 lg:gap-16 border-t pt-8" style={{ borderColor: `${C.steel}1f` }}>
        <div className="relative min-h-[34rem] lg:min-h-0">
          <Stage person={person} index={active} total={list.length} copy={copy} />
        </div>

        <nav aria-label={copy.list} className="flex flex-col min-h-0">
          <div className="shrink-0 flex items-center justify-between mb-2 text-[11px] uppercase tracking-[0.3em]" style={{ ...MONO, color: C.steel }}>
            <span>{copy.list}</span>
            <span><span style={{ color: C.rose }}>{pad(active + 1)}</span> / {pad(list.length)} · ↑↓</span>
          </div>
          <ul ref={listRef} tabIndex={0} onKeyDown={onKey}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain border-t outline-none focus-visible:ring-1 focus-visible:ring-[#C5BAC4]/30"
            style={{ borderColor: `${C.steel}1f`, scrollbarWidth: "thin", scrollbarColor: `${C.accent} transparent` }}>
            {list.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.name} className="border-b" style={{ borderColor: `${C.steel}1f` }}>
                  <button type="button" tabIndex={-1} onClick={() => setActive(i)} aria-pressed={on}
                    className="group relative w-full grid grid-cols-[2.25rem_1fr] items-baseline gap-3 py-3.5 text-left cursor-pointer outline-none">
                    <span className="text-[11px] tracking-[0.2em]" style={{ ...MONO, color: on ? C.rose : `${C.steel}aa` }}>{pad(i + 1)}</span>
                    <span className="flex flex-col min-w-0">
                      <span className="uppercase leading-none truncate transition-transform duration-500 group-hover:translate-x-1.5"
                        style={{ ...DISPLAY, fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", color: on ? C.ink : C.mist, opacity: on ? 1 : 0.7, transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}>
                        {p.name}
                      </span>
                      <span className="mt-1.5 text-[10px] uppercase tracking-[0.16em] truncate" style={{ ...MONO, color: `${C.steel}aa` }}>{p.role}</span>
                    </span>
                    <motion.span aria-hidden="true" className="absolute left-0 bottom-[-1px] h-px"
                      initial={false} animate={{ width: on ? "100%" : "0%" }} transition={{ duration: 0.7, ease: EXPO }}
                      style={{ background: C.rose }} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Recommendations;
