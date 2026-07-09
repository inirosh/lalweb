"use server";

// Saves a website order to the database using the secret admin key,
// so the orders table stays private (no public write access).
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

export async function createOrder(data) {
  if (!data?.name || !data?.phone || !data?.address || !data?.items?.length) {
    return { error: "Missing order details." };
  }

  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      customer_name: data.name,
      customer_phone: data.phone,
      customer_address: data.address,
      note: data.note || null,
      subtotal: data.subtotal || 0,
      discount: data.discount || 0,
      coupon_code: data.couponCode || null,
      total: data.total || 0,
    })
    .select("id, order_number")
    .single();

  if (error) return { error: error.message };

  const items = data.items.map((it) => ({
    order_id: order.id,
    product_slug: it.slug,
    name: it.name,
    unit_price: it.price,
    quantity: it.qty,
    line_total: it.price * it.qty,
  }));

  const { error: itemsErr } = await supabase.from("order_items").insert(items);
  if (itemsErr) {
    await supabase.from("orders").delete().eq("id", order.id); // roll back
    return { error: itemsErr.message };
  }

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  return { orderNumber: order.order_number, orderId: order.id };
}
