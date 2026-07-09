// Hero banners — publicly readable (active ones) for the homepage.
import { supabase } from "@/lib/supabase/client";

export function mapBanner(row) {
  if (!row) return null;
  return {
    id: row.id,
    image: row.image,
    title: row.title,
    subtitle: row.subtitle,
    ctaLabel: row.cta_label,
    ctaHref: row.cta_href,
    active: row.active,
    sortOrder: row.sort_order,
  };
}

// Active banners with an image, for the storefront hero (top first).
export async function getActiveBanners() {
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) return []; // table/column may not exist yet
  return data.map(mapBanner).filter((b) => b.image);
}
