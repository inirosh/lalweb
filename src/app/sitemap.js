import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

const BASE = "https://lalweb.vercel.app";

export default async function sitemap() {
  let products = [];
  try {
    products = await getAllProducts();
  } catch {}

  const productUrls = products.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/delivery`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/returns`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    ...productUrls,
  ];
}
