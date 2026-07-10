import { Suspense } from "react";
import CatalogClient from "@/components/CatalogClient";
import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export const metadata = {
  title: "Products | Lal Distributors — Power Tools & Home Appliances",
  description:
    "Browse power tools, pressure washers, air compressors and home appliances at Lal Distributors, Wadduwa.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [products, categories, lang] = await Promise.all([getAllProducts(), getAllCategories(), getLang()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-black text-gray-900">{t(lang, "catalog.title")}</h1>
      <p className="mt-1 text-gray-500">{t(lang, "catalog.subtitle")}</p>

      {/* Suspense is required because the filter reads the URL (?category=) */}
      <Suspense fallback={<p className="mt-8 text-gray-500">Loading…</p>}>
        <CatalogClient products={products} categories={categories} />
      </Suspense>
    </div>
  );
}
