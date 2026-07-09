"use client";

import { useLang } from "./LanguageProvider";

// Green "In Stock" or red "Out of Stock" badge.
export default function StockBadge({ inStock }) {
  const { t } = useLang();
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
        inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
      />
      {inStock ? t("badge.inStock") : t("badge.outOfStock")}
    </span>
  );
}
