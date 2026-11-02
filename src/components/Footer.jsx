import { useState, useEffect } from "react";
import { useLang } from "../context/useLang";
import { t } from "../context/translations";

const C = { deep: "#191D23", accent: "#57707A", steel: "#7B919C", mist: "#989DAA", rose: "#C5BAC4", ink: "#DEDCDC" };
const MONO = { fontFamily: "'Space Mono', monospace" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };

const socials = [
  { label: "GITHUB", href: "https://github.com/corredor29", external: true },
  { label: "LINKEDIN", href: "https://linkedin.com/in/felipe-corredor-95664434b", external: true },
  { label: "MAIL", href: "mailto:corredorsilvafelipe8@gmail.com", external: false },
];

function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;
  const navTx = t[lang].nav;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: navTx.inicio, href: "#inicio" },
    { label: navTx.sobreMi, href: "#sobre-mi" },
    { label: navTx.proyectos, href: "#proyectos" },
    { label: navTx.recomendaciones, href: "#recomendaciones" },
    { label: navTx.habilidades, href: "#habilidades" },
    { label: navTx.contacto, href: "#contacto" },
  ];

  const linkCls = "text-[#7B919C] hover:text-[#DEDCDC] transition-colors duration-300";

  return (
    <footer className="relative bg-black overflow-hidden" style={{ color: C.ink, borderTop: `1px solid ${C.accent}55` }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16 pt-20 pb-10 flex flex-col gap-14">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <a href="#inicio" className="inline-block uppercase leading-none tracking-tight" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.75rem,6vw,4.5rem)", color: C.ink }}>
              pipe<span style={{ color: C.accent }}>.dev</span>
            </a>
            <p className="mt-5 text-sm max-w-xs leading-relaxed" style={{ ...SANS, color: C.mist }}>{tx.tagline}</p>
          </div>

          <nav className="md:col-span-4" aria-label="Footer">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-5" style={{ ...MONO, color: C.accent }}>— Index</p>
            <ul className="flex flex-col">
              {navLinks.map(({ label, href }) => (
                <li key={href} style={{ borderTop: `1px solid ${C.ink}14` }}>
                  <a href={href} className={`block py-2.5 text-[15px] ${linkCls}`} style={SANS}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-5" style={{ ...MONO, color: C.accent }}>— Social</p>
            <ul className="flex flex-col gap-3">
              {socials.map(({ label, href, external }) => (
                <li key={label}>
                  <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group inline-flex items-center gap-2 text-xs tracking-[0.2em] ${linkCls}`} style={MONO}>
                    {label}
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 text-[11px]" style={{ ...MONO, color: C.steel, borderTop: `1px solid ${C.ink}14` }}>
          <p>© {new Date().getFullYear()} Felipe Corredor Silva. {tx.rights}</p>
          <p style={{ color: `${C.steel}AA` }}>{tx.builtWith}</p>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-sm border border-[#7B919C]/60 text-[#7B919C] hover:text-[#DEDCDC] hover:border-[#DEDCDC] transition-colors duration-300 cursor-pointer"
          aria-label={tx.backToTop}
          title={tx.backToTop}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </footer>
  );
}

export default Footer;
