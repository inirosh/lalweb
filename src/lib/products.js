// ===================================================================
// PRODUCT DATA — now served LIVE from your Supabase database.
//
// The website reads products from Supabase. When you change stock or
// add products in the admin panel (Phase 2), the site updates
// automatically. These functions run on the server.
// ===================================================================
import { supabase } from "@/lib/supabase/client";

// Categories used for filtering on the catalog page.
export const CATEGORIES = [
  { slug: "power-tools", name: "Power Tools" },
  { slug: "pressure-washers", name: "Pressure Washers" },
  { slug: "air-compressors", name: "Air Compressors" },
  { slug: "cleaning-equipment", name: "Electric Scrapers / Cleaning" },
  { slug: "home-appliances", name: "Home Appliances" },
  { slug: "accessories", name: "Accessories & Spare Parts" },
];

// Convert a database row (snake_case) into the shape the website uses (camelCase)
function mapProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    brand: row.brand,
    price: Number(row.price),
    offerPrice: row.offer_price != null ? Number(row.offer_price) : null,
    offerEnds: row.offer_ends || null,
    inStock: row.in_stock,
    stockQty: row.stock_qty,
    lowStockThreshold: row.low_stock_threshold,
    featured: row.featured,
    warranty: row.warranty,
    shortDescription: row.short_description,
    description: row.description,
    image: row.image,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
  };
}

// ---- Data-fetching functions used by the pages ----

export async function getAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });
  if (error) {
    console.error("Error loading products:", error.message);
    return [];
  }
  return data.map(mapProduct);
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("name", { ascending: true });
  if (error) {
    console.error("Error loading featured products:", error.message);
    return [];
  }
  return data.map(mapProduct);
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("Error loading product:", error.message);
    return null;
  }
  return mapProduct(data);
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("Error loading product:", error.message);
    return null;
  }
  return mapProduct(data);
}

// ---- Small static helpers (no database needed) ----

export function getCategoryName(slug) {
  return CATEGORIES.find((c) => c.slug === slug)?.name || slug;
}

// Format a number as Sri Lankan Rupees, e.g. 18500 -> "රු 18,500.00"
export function formatPrice(value) {
  return (
    "රු " +
    Number(value).toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
