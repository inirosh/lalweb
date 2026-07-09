// ===================================================================
// Coupons — publicly readable (active ones) so customers can collect
// and use them. Admin manages them via server actions (secret key).
// ===================================================================
import { supabase } from "@/lib/supabase/client";

export function mapCoupon(row) {
  if (!row) return null;
  return {
    id: row.id,
    code: row.code,
    description: row.description,
    discountType: row.discount_type, // 'percent' | 'fixed'
    discountValue: Number(row.discount_value),
    minOrder: Number(row.min_order),
    productSlug: row.product_slug,
    validFrom: row.valid_from,
    validTo: row.valid_to,
    active: row.active,
  };
}

// Active, currently-valid coupons for the storefront (collection + checkout).
export async function getActiveCoupons() {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });
  if (error) {
    // Table may not exist yet (before the SQL is run) — fail quietly.
    return [];
  }
  const now = Date.now();
  return data
    .map(mapCoupon)
    .filter((c) => {
      const from = c.validFrom ? new Date(c.validFrom).getTime() : null;
      const to = c.validTo ? new Date(c.validTo).getTime() : null;
      if (from && now < from) return false;
      if (to && now > to) return false;
      return true;
    });
}

// Pure check used at checkout. Returns { ok, discount, reason }.
export function validateCoupon(coupon, { subtotal, slugs }) {
  if (!coupon) return { ok: false, discount: 0, reason: "Invalid coupon code." };

  const now = Date.now();
  if (coupon.validFrom && now < new Date(coupon.validFrom).getTime())
    return { ok: false, discount: 0, reason: "This coupon isn't active yet." };
  if (coupon.validTo && now > new Date(coupon.validTo).getTime())
    return { ok: false, discount: 0, reason: "This coupon has expired." };
  if (coupon.minOrder && subtotal < coupon.minOrder)
    return {
      ok: false,
      discount: 0,
      reason: `Spend at least Rs ${coupon.minOrder.toLocaleString("en-LK")} to use this coupon.`,
    };
  if (coupon.productSlug && !slugs.includes(coupon.productSlug))
    return { ok: false, discount: 0, reason: "This coupon is for a specific product not in your cart." };

  let discount =
    coupon.discountType === "percent"
      ? Math.round((subtotal * coupon.discountValue) / 100)
      : coupon.discountValue;
  discount = Math.min(discount, subtotal); // never below zero

  return { ok: true, discount, reason: "" };
}
