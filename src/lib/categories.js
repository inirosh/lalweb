// Categories — publicly readable, managed by admin. Falls back to the
// built-in list if the categories table hasn't been created yet.
import { supabase } from "@/lib/supabase/client";
import { CATEGORIES as FALLBACK } from "@/lib/products";

export async function getAllCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) {
    return FALLBACK.map((c) => ({ slug: c.slug, name: c.name }));
  }
  return data.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    sortOrder: c.sort_order,
  }));
}

export async function getCategoryById(id) {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data
    ? { id: data.id, slug: data.slug, name: data.name, sortOrder: data.sort_order }
    : null;
}

// Look up a display name from a slug within a fetched category list.
export function categoryName(categories, slug) {
  return categories.find((c) => c.slug === slug)?.name || slug;
}
