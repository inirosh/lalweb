"use server";

// Saves a website order to the database using the secret admin key,
// so the orders table stays private (no public write access).
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

// Trim + cap a string to a safe length.
const clean = (v, max) => String(v ?? "").trim().slice(0, max);

export async function createOrder(data) {
  if (!data?.name || !data?.phone || !data?.address || !data?.items?.length) {
    return { error: "Missing order details." };
  }

  // Basic validation / limits to prevent abusive or malformed submissions.
  const name = clean(data.name, 120);
  const phone = clean(data.phone, 30);
  const address = clean(data.address, 400);
  const note = clean(data.note, 500);
  if (name.length < 2) return { error: "Invalid name." };
  if (phone.replace(/\D/g, "").length < 9) return { error: "Invalid phone number." };
  if (address.length < 4) return { error: "Invalid address." };
  if (data.items.length > 100) return { error: "Too many items." };

  // Sanitize items and recompute totals on the server (never trust the client).
  const items = data.items.slice(0, 100).map((it) => {
    const qty = Math.max(1, Math.min(999, parseInt(it.qty, 10) || 1));
    const price = Math.max(0, Number(it.price) || 0);
    return {
      slug: clean(it.slug, 200),
      name: clean(it.name, 200) || "Item",
      price,
      qty,
      lineTotal: price * qty,
    };
  });
  const subtotal = items.reduce((s, it) => s + it.lineTotal, 0);
  const discount = Math.max(0, Math.min(subtotal, Number(data.discount) || 0));
  const total = Math.max(0, subtotal - discount);

  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      customer_name: name,
      customer_phone: phone,
      customer_address: address,
      note: note || null,
      subtotal,
      discount,
      coupon_code: clean(data.couponCode, 40) || null,
      total,
    })
    .select("id, order_number")
    .single();

  if (error) return { error: error.message };

  const rows = items.map((it) => ({
    order_id: order.id,
    product_slug: it.slug || null,
    name: it.name,
    unit_price: it.price,
    quantity: it.qty,
    line_total: it.lineTotal,
  }));

  const { error: itemsErr } = await supabase.from("order_items").insert(rows);
  if (itemsErr) {
    await supabase.from("orders").delete().eq("id", order.id); // roll back
    return { error: itemsErr.message };
  }

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  return { orderNumber: order.order_number, orderId: order.id };
}
