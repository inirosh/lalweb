"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

export default function CatalogClient({ products, categories }) {
  const searchParams = useSearchParams();
  // Start on the category from the URL (e.g. coming from the homepage), else "all"
  const initial = searchParams.get("category") || "all";
  const [active, setActive] = useState(initial);
  const [stockOnly, setStockOnly] = useState(false);

  const filtered = products.filter((p) => {
    const matchCategory = active === "all" || p.category === active;
    const matchStock = !stockOnly || p.inStock;
    return matchCategory && matchStock;
  });

  const filterButtons = [{ slug: "all", name: "All" }, ...categories];

  return (
    <div className="mt-6">
      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2">
        {filterButtons.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
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
          Show in-stock only
        </label>
        <span className="text-sm text-gray-500">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          No products found in this category.
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
