"use client";

// Holds the current language on the client and lets components translate.
// The choice is stored in a cookie so SERVER components render in the same
// language too (the toggle refreshes the page so they re-read the cookie).
import { createContext, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { t as translate, DEFAULT_LANG } from "@/lib/i18n";

const LangContext = createContext(null);

export function LanguageProvider({ initialLang = DEFAULT_LANG, children }) {
  const router = useRouter();

  const setLang = useCallback(
    (lang) => {
      // 1 year cookie
      document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
      router.refresh(); // re-render server components in the new language
    },
    [router]
  );

  const value = {
    lang: initialLang,
    t: (key) => translate(initialLang, key),
    setLang,
    toggle: () => setLang(initialLang === "si" ? "en" : "si"),
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  // Safe fallback so components never crash if used outside the provider.
  if (!ctx) return { lang: DEFAULT_LANG, t: (k) => translate(DEFAULT_LANG, k), setLang: () => {}, toggle: () => {} };
  return ctx;
}
