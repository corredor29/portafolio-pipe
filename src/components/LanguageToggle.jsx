import { useLang } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggle } = useLang();
  const isES = lang === "es";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      style={{ fontFamily: "'Space Mono', monospace" }}
      className="relative flex items-center gap-0 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm
        hover:border-[#3b82f6]/40 transition-all duration-300 overflow-hidden h-8 w-[72px] cursor-pointer"
    >
      {/* sliding pill */}
      <span
        className="absolute top-1 bottom-1 w-[30px] rounded-full bg-[#3b82f6] transition-all duration-300 z-0"
        style={{ left: isES ? 3 : 39 }}
      />

      {/* ES label */}
      <span
        className={`relative z-10 flex-1 text-center text-[11px] font-bold transition-colors duration-300 ${
          isES ? "text-white" : "text-gray-500"
        }`}
      >
        ES
      </span>

      {/* EN label */}
      <span
        className={`relative z-10 flex-1 text-center text-[11px] font-bold transition-colors duration-300 ${
          !isES ? "text-white" : "text-gray-500"
        }`}
      >
        EN
      </span>
    </button>
  );
}