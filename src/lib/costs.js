// Product cost prices — PRIVATE, server-only, admin (secret) key.
import "server-only";
import { createAdminClient } from "@/lib/supabase/server";

// Cost for one product (null if not set / table missing).
export async function getProductCost(id) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("product_costs")
    .select("cost_price")
    .eq("product_id", id)
    .maybeSingle();
  if (error || !data) return null;
  return Number(data.cost_price);
}

// Map of { productId: cost } for all products (for the admin list).
export async function getAllCosts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("product_costs")
    .select("product_id, cost_price");
  if (error || !data) return {};
  return Object.fromEntries(data.map((r) => [r.product_id, Number(r.cost_price)]));
}
