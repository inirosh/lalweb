// Admin-only coupon reads (includes inactive). Server-only, secret key.
import "server-only";
import { createAdminClient } from "@/lib/supabase/server";
import { mapCoupon } from "@/lib/coupons";

export async function getAllCoupons() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error loading coupons:", error.message);
    return [];
  }
  return data.map(mapCoupon);
}

export async function getCouponById(id) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("Error loading coupon:", error.message);
    return null;
  }
  return mapCoupon(data);
}
