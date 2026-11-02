import { useState } from "react";
import { LanguageContext } from "./LanguageContextObj";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("es");
  const toggle = () => setLang((l) => (l === "es" ? "en" : "es"));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}