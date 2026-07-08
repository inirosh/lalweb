// ===================================================================
// Sales dashboard data — PRIVATE, server-only. Reads invoices, invoice
// items and products, and summarizes them into simple business numbers.
// ===================================================================
import "server-only";
import { createAdminClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = createAdminClient();

  // Pull the raw data we need.
  const [{ data: invoices }, { data: items }, { data: products }] =
    await Promise.all([
      supabase
        .from("invoices")
        .select("id, invoice_number, total, created_at, customers(name)")
        .order("created_at", { ascending: false }),
      supabase.from("invoice_items").select("description, quantity"),
      supabase
        .from("products")
        .select("id, name, stock_qty, low_stock_threshold"),
    ]);

  const allInvoices = invoices || [];

  // Time boundaries
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const sum = (list) => list.reduce((t, inv) => t + Number(inv.total || 0), 0);
  const inRange = (from) =>
    allInvoices.filter((inv) => new Date(inv.created_at) >= from);

  const todays = inRange(startOfToday);
  const months = inRange(startOfMonth);

  // Best-selling items: add up quantities per product name.
  const qtyByName = {};
  for (const it of items || []) {
    qtyByName[it.description] = (qtyByName[it.description] || 0) + it.quantity;
  }
  const bestSellers = Object.entries(qtyByName)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  // Low-stock / out-of-stock products.
  const lowStock = (products || [])
    .filter((p) => p.stock_qty <= (p.low_stock_threshold ?? 3))
    .sort((a, b) => a.stock_qty - b.stock_qty)
    .map((p) => ({ id: p.id, name: p.name, qty: p.stock_qty }));

  // Recent sales (latest 5).
  const recent = allInvoices.slice(0, 5).map((inv) => ({
    id: inv.id,
    invoiceNumber: inv.invoice_number,
    customerName: inv.customers?.name || "Walk-in",
    total: Number(inv.total || 0),
    createdAt: inv.created_at,
  }));

  return {
    totalSalesAll: sum(allInvoices),
    totalSalesMonth: sum(months),
    totalSalesToday: sum(todays),
    countAll: allInvoices.length,
    countMonth: months.length,
    countToday: todays.length,
    bestSellers,
    lowStock,
    recent,
  };
}
