// Admin-only banner reads (includes inactive). Server-only, secret key.
import "server-only";
import { createAdminClient } from "@/lib/supabase/server";
import { mapBanner } from "@/lib/banners";

export async function getAllBanners() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error loading banners:", error.message);
    return [];
  }
  return data.map(mapBanner);
}

export async function getBannerById(id) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("Error loading banner:", error.message);
    return null;
  }
  return mapBanner(data);
}
