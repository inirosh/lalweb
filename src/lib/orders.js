// Online orders — PRIVATE, server-only, admin (secret) key.
import "server-only";
import { createAdminClient } from "@/lib/supabase/server";

function mapOrder(row) {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerAddress: row.customer_address,
    note: row.note,
    subtotal: Number(row.subtotal),
    discount: Number(row.discount),
    couponCode: row.coupon_code,
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function getAllOrders() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data.map(mapOrder);
}

export async function getOrderById(id) {
  const supabase = createAdminClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !order) return null;

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  return {
    ...mapOrder(order),
    items: (items || []).map((it) => ({
      slug: it.product_slug,
      name: it.name,
      unitPrice: Number(it.unit_price),
      quantity: it.quantity,
      lineTotal: Number(it.line_total),
    })),
  };
}

// Count of new (unhandled) orders — for the dashboard alert.
export async function getNewOrderCount() {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");
  if (error) return 0;
  return count || 0;
}
