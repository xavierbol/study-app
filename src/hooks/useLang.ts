import { Language } from "@/models";

export function useLang(lang: Language): "néerlandais" | "anglais" {
  return lang === "nl" ? "néerlandais" : "anglais";
}
