"use client";

import { useLang } from "./LanguageProvider";

// Small button that switches between English and Sinhala.
export default function LanguageToggle({ className = "" }) {
  const { t, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className={`rounded-full border border-gray-300 px-2.5 py-1 text-xs font-bold text-gray-700 hover:border-brand-orange hover:text-brand-red ${className}`}
      aria-label="Switch language"
    >
      {t("lang.other")}
    </button>
  );
}
