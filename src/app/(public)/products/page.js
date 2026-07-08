import { Suspense } from "react";
import CatalogClient from "@/components/CatalogClient";
import { getAllProducts, CATEGORIES } from "@/lib/products";

export const metadata = {
  title: "Products | Lal Distributors — Power Tools & Home Appliances",
  description:
    "Browse power tools, pressure washers, air compressors and home appliances at Lal Distributors, Waduwa.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-black text-gray-900">Our Products</h1>
      <p className="mt-1 text-gray-500">
        Filter by category and check live stock availability.
      </p>

      {/* Suspense is required because the filter reads the URL (?category=) */}
      <Suspense fallback={<p className="mt-8 text-gray-500">Loading…</p>}>
        <CatalogClient products={products} categories={CATEGORIES} />
      </Suspense>
    </div>
  );
}
