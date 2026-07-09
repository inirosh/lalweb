"use server";

// Server actions for managing coupons (admin only).
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { createSupabaseServer } from "@/lib/supabase/serverClient";

async function requireAdmin() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

function readForm(formData) {
  const code = String(formData.get("code") || "").trim().toUpperCase();
  return {
    code,
    description: String(formData.get("description") || "").trim() || null,
    discount_type: String(formData.get("discount_type") || "percent"),
    discount_value: Number(formData.get("discount_value") || 0),
    min_order: Number(formData.get("min_order") || 0),
    product_slug: String(formData.get("product_slug") || "").trim() || null,
    valid_from: String(formData.get("valid_from") || "").trim() || null,
    valid_to: String(formData.get("valid_to") || "").trim() || null,
    active: formData.get("active") === "on",
  };
}

function refresh() {
  revalidatePath("/admin/coupons");
  revalidatePath("/"); // vouchers show on homepage
}

export async function createCoupon(prevState, formData) {
  await requireAdmin();
  const values = readForm(formData);
  if (!values.code) return { error: "Coupon code is required." };
  if (!(values.discount_value > 0)) return { error: "Discount value must be greater than 0." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("coupons").insert(values);
  if (error)
    return {
      error: error.message.includes("duplicate")
        ? "A coupon with this code already exists."
        : "Could not save coupon: " + error.message,
    };
  refresh();
  redirect("/admin/coupons?saved=1");
}

export async function updateCoupon(id, prevState, formData) {
  await requireAdmin();
  const values = readForm(formData);
  if (!values.code) return { error: "Coupon code is required." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("coupons").update(values).eq("id", id);
  if (error)
    return {
      error: error.message.includes("duplicate")
        ? "A coupon with this code already exists."
        : "Could not update coupon: " + error.message,
    };
  refresh();
  redirect("/admin/coupons?saved=1");
}

export async function deleteCoupon(id) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("coupons").delete().eq("id", id);
  if (error) return { error: "Could not delete coupon: " + error.message };
  refresh();
  redirect("/admin/coupons?deleted=1");
}
