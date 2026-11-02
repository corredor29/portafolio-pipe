import { useContext } from "react";
import { LanguageContext } from "./LanguageContextObj";

export function useLang() {
  return useContext(LanguageContext);
}
