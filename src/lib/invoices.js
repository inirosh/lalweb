// ===================================================================
// Invoice data — PRIVATE. Server-only, uses the admin (secret) key.
// ===================================================================
import "server-only";
import { createAdminClient } from "@/lib/supabase/server";

// All invoices with the customer's name joined in (newest first).
export async function getAllInvoices() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*, customers(name)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error loading invoices:", error.message);
    return [];
  }
  return data.map((inv) => ({
    id: inv.id,
    invoiceNumber: inv.invoice_number,
    customerName: inv.customers?.name || "Walk-in customer",
    subtotal: Number(inv.subtotal),
    discount: Number(inv.discount),
    total: Number(inv.total),
    createdAt: inv.created_at,
  }));
}

// One full invoice: header + customer + line items.
export async function getInvoiceById(id) {
  const supabase = createAdminClient();

  const { data: inv, error } = await supabase
    .from("invoices")
    .select("*, customers(name, phone, address)")
    .eq("id", id)
    .maybeSingle();
  if (error || !inv) {
    if (error) console.error("Error loading invoice:", error.message);
    return null;
  }

  const { data: items } = await supabase
    .from("invoice_items")
    .select("*")
    .eq("invoice_id", id);

  return {
    id: inv.id,
    invoiceNumber: inv.invoice_number,
    customer: inv.customers
      ? {
          name: inv.customers.name,
          phone: inv.customers.phone,
          address: inv.customers.address,
        }
      : null,
    subtotal: Number(inv.subtotal),
    discount: Number(inv.discount),
    total: Number(inv.total),
    createdAt: inv.created_at,
    items: (items || []).map((it) => ({
      description: it.description,
      unitPrice: Number(it.unit_price),
      quantity: it.quantity,
      lineTotal: Number(it.line_total),
    })),
  };
}
