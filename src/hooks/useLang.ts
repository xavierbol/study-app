export type Language = "nl" | "en";

export function useLang(lang: Language): "néerlandais" | "anglais" {
  return lang === "nl" ? "néerlandais" : "anglais";
}
