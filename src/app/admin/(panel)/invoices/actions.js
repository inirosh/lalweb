"use server";

// Server actions for invoices. Totals are calculated HERE on the server
// using real product prices from the database, so they can't be tampered
// with from the browser.
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

// data = {
//   customerId: string | null,
//   discount: number,
//   reduceStock: boolean,
//   items: [{ productId, quantity }]
// }
export async function createInvoice(data) {
  await requireAdmin();
  const supabase = createAdminClient();

  const rawItems = (data.items || []).filter(
    (it) => it.productId && Number(it.quantity) > 0
  );
  if (rawItems.length === 0) {
    return { error: "Please add at least one product with a quantity." };
  }

  // Look up the real products so we use trusted prices and names.
  const ids = rawItems.map((it) => it.productId);
  const { data: products, error: prodErr } = await supabase
    .from("products")
    .select("id, name, price, stock_qty")
    .in("id", ids);
  if (prodErr) return { error: "Could not load products: " + prodErr.message };

  const byId = Object.fromEntries(products.map((p) => [p.id, p]));

  // Build line items with server-side totals.
  const lineItems = [];
  let subtotal = 0;
  for (const it of rawItems) {
    const p = byId[it.productId];
    if (!p) continue;
    const quantity = parseInt(it.quantity, 10);
    const unitPrice = Number(p.price);
    const lineTotal = unitPrice * quantity;
    subtotal += lineTotal;
    lineItems.push({
      product_id: p.id,
      description: p.name,
      unit_price: unitPrice,
      quantity,
      line_total: lineTotal,
      _currentStock: p.stock_qty,
    });
  }

  const discount = Math.max(0, Number(data.discount) || 0);
  const total = Math.max(0, subtotal - discount);

  // 1) Create the invoice header.
  const { data: invoice, error: invErr } = await supabase
    .from("invoices")
    .insert({
      customer_id: data.customerId || null,
      subtotal,
      discount,
      total,
    })
    .select("id")
    .single();
  if (invErr) return { error: "Could not create invoice: " + invErr.message };

  // 2) Add the line items.
  const { error: itemsErr } = await supabase.from("invoice_items").insert(
    lineItems.map((li) => ({
      invoice_id: invoice.id,
      product_id: li.product_id,
      description: li.description,
      unit_price: li.unit_price,
      quantity: li.quantity,
      line_total: li.line_total,
    }))
  );
  if (itemsErr) {
    // Roll back the header so we don't leave an empty invoice.
    await supabase.from("invoices").delete().eq("id", invoice.id);
    return { error: "Could not save invoice items: " + itemsErr.message };
  }

  // 3) Optionally reduce stock (never below 0).
  if (data.reduceStock) {
    for (const li of lineItems) {
      const newQty = Math.max(0, li._currentStock - li.quantity);
      await supabase
        .from("products")
        .update({ stock_qty: newQty })
        .eq("id", li.product_id);
    }
    revalidatePath("/products");
    revalidatePath("/admin/products");
  }

  revalidatePath("/admin/invoices");
  redirect(`/admin/invoices/${invoice.id}?created=1`);
}

export async function deleteInvoice(id) {
  await requireAdmin();
  const supabase = createAdminClient();
  // invoice_items are removed automatically (ON DELETE CASCADE).
  const { error } = await supabase.from("invoices").delete().eq("id", id);
  if (error) return { error: "Could not delete invoice: " + error.message };
  revalidatePath("/admin/invoices");
  redirect("/admin/invoices?deleted=1");
}
