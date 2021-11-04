import { Language } from "@/models";

/**
 * Hook to get the language based on the slug contained as params in vue router.
 *
 * @deprecated
 * @param lang slug to get the language. ('nl' or 'en')
 * @returns the language
 */
export function useLang(lang: Language): "néerlandais" | "anglais" {
  return lang === "nl" ? "néerlandais" : "anglais";
}
