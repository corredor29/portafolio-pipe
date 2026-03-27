import { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import { t } from "../context/translations";
import LanguageToggle from "./LanguageToggle";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Inicio");
  const { lang } = useLang();
  const tx = t[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: tx.inicio,          href: "#inicio" },
    { label: tx.sobreMi,         href: "#sobre-mi" },
    { label: tx.proyectos,       href: "#proyectos" },
    { label: tx.habilidades,     href: "#habilidades" },
    { label: tx.recomendaciones, href: "#recomendaciones" },
    { label: tx.contacto,        href: "#contacto" },
  ];

  const handleClick = (label, href) => {
    setActive(label);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // keep active label in sync when language changes
  useEffect(() => {
    setActive(tx.inicio);
  }, [lang]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => handleClick(tx.inicio, "#inicio")}
          className="group flex items-center gap-2 cursor-pointer select-none"
        >
          <span
            className="text-xl font-black tracking-tighter text-white"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            pipe
            <span className="text-[#3b82f6] group-hover:text-white transition-colors duration-300">.</span>
            <span className="text-[#3b82f6] group-hover:opacity-70 transition-opacity duration-300 text-xs align-super">dev</span>
          </span>
        </button>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {links.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleClick(label, href)}
                className={`relative px-3 py-2 text-xs font-medium tracking-wide transition-all duration-300 rounded-lg cursor-pointer
                  ${active === label ? "text-white" : "text-gray-400 hover:text-white"}`}
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {active === label && (
                  <span className="absolute inset-0 bg-white/8 rounded-lg border border-white/10" />
                )}
                <span className="relative">
                  {active === label && (
                    <span className="text-[#3b82f6] mr-1 text-xs">▹</span>
                  )}
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: language toggle + available badge */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />

          <button
            onClick={() => handleClick(tx.contacto, "#contacto")}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#3b82f6]/40 text-[#3b82f6] text-sm font-semibold
              hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all duration-300 cursor-pointer"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
            {tx.disponible}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;