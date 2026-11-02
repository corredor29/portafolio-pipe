import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/useLang";
import { t } from "../context/translations.js";
import LanguageToggle from "./LanguageToggle";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useLang();
  const tx = t[lang].nav;

  const links = [
    { label: tx.inicio,          href: "#inicio" },
    { label: tx.sobreMi,         href: "#sobre-mi" },
    { label: tx.proyectos,       href: "#proyectos" },
    { label: tx.recomendaciones, href: "#recomendaciones" },
    { label: tx.habilidades,     href: "#habilidades" },
    { label: tx.contacto,        href: "#contacto" },
  ];

  // Detect scroll background and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["inicio", "sobre-mi", "proyectos", "recomendaciones", "habilidades", "contacto"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveHref(`#${sectionIds[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href) => {
    setActiveHref(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <nav
        className={`w-full transition-all duration-500 ${
          scrolled
            ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleClick("#inicio")}
            className="group flex items-center gap-2 cursor-pointer select-none focus:outline-none"
          >
            <span
              className="uppercase leading-none tracking-tight text-2xl"
              style={{ fontFamily: "'Anton', sans-serif", color: "#DEDCDC" }}
            >
              pipe<span style={{ color: "#57707A" }}>.dev</span>
            </span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {links.map(({ label, href }) => {
              const isActive = activeHref === href;
              return (
                <li key={href}>
                  <button
                    onClick={() => handleClick(href)}
                    className={`relative px-3 py-2 text-xs font-medium tracking-wide transition-all duration-300 rounded-lg cursor-pointer focus:outline-none ${
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-white/8 rounded-lg border border-white/10" />
                    )}
                    <span className="relative">
                      {isActive && <span className="text-[#57707A] mr-1 text-xs">▹</span>}
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right side: language toggle + available badge */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />

            <button
              onClick={() => handleClick("#contacto")}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#57707A]/40 text-[#57707A] text-xs font-semibold hover:bg-[#57707A] hover:text-white hover:border-[#57707A] transition-all duration-300 cursor-pointer"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#57707A] animate-pulse" />
              {tx.disponible}
            </button>
          </div>

          {/* Mobile Hamburger Button & Language Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6"
            >
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => {
                  const isActive = activeHref === href;
                  return (
                    <li key={href}>
                      <button
                        onClick={() => handleClick(href)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-between ${
                          isActive
                            ? "bg-[#57707A]/15 text-white border border-[#57707A]/30"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        <span>{label}</span>
                        {isActive && <span className="text-[#57707A] font-bold">▹</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleClick("#contacto")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#57707A]/40 text-[#57707A] text-xs font-semibold hover:bg-[#57707A] hover:text-white transition-all duration-300"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#57707A] animate-pulse" />
                  {tx.disponible}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;