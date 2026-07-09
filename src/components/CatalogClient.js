"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { useLang } from "./LanguageProvider";

export default function CatalogClient({ products, categories }) {
  const { t } = useLang();
  const searchParams = useSearchParams();
  // Start on the category from the URL (e.g. coming from the homepage), else "all"
  const initial = searchParams.get("category") || "all";
  const [active, setActive] = useState(initial);
  const [stockOnly, setStockOnly] = useState(false);
  // Start with any search term passed in the URL (?q=...)
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const q = query.trim().toLowerCase();
  const filtered = products.filter((p) => {
    const matchCategory = active === "all" || p.category === active;
    const matchStock = !stockOnly || p.inStock;
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.brand || "").toLowerCase().includes(q) ||
      (p.shortDescription || "").toLowerCase().includes(q);
    return matchCategory && matchStock && matchQuery;
  });

  const filterButtons = [{ slug: "all", name: t("catalog.all") }, ...categories];

  return (
    <div className="mt-6">
      {/* Search bar */}
      <div className="relative mb-5">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("catalog.search")}
          className="w-full rounded-full border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-gray-900 shadow-sm outline-none transition-shadow focus:border-brand-orange focus:shadow-md"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Clear search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Category filter buttons */}
      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap">
        {filterButtons.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              active === cat.slug
                ? "brand-gradient text-white shadow"
                : "border border-gray-300 bg-white text-gray-700 hover:border-brand-orange"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* In-stock toggle + count */}
      <div className="mt-4 flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={stockOnly}
            onChange={(e) => setStockOnly(e.target.checked)}
            className="h-4 w-4 accent-brand-orange"
          />
          {t("catalog.inStockOnly")}
        </label>
        <span className="text-sm text-gray-500">
          {filtered.length} {t("catalog.unit")}
        </span>
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          {q ? t("catalog.noMatch") : t("catalog.none")}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
