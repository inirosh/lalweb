"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { createInvoice } from "@/app/admin/(panel)/invoices/actions";

export default function InvoiceForm({ customers, products }) {
  const [customerId, setCustomerId] = useState("");
  const [discount, setDiscount] = useState(0);
  const [reduceStock, setReduceStock] = useState(true);
  const [rows, setRows] = useState([{ productId: "", quantity: 1 }]);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const productById = Object.fromEntries(products.map((p) => [p.id, p]));

  function updateRow(index, changes) {
    setRows((rs) => rs.map((r, i) => (i === index ? { ...r, ...changes } : r)));
  }
  function addRow() {
    setRows((rs) => [...rs, { productId: "", quantity: 1 }]);
  }
  function removeRow(index) {
    setRows((rs) => rs.filter((_, i) => i !== index));
  }

  const subtotal = rows.reduce((sum, r) => {
    const p = productById[r.productId];
    return sum + (p ? Number(p.price) * Number(r.quantity || 0) : 0);
  }, 0);
  const total = Math.max(0, subtotal - Number(discount || 0));

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const items = rows.filter((r) => r.productId && Number(r.quantity) > 0);
    if (items.length === 0) {
      setError("Please add at least one product with a quantity.");
      return;
    }
    startTransition(async () => {
      const result = await createInvoice({
        customerId: customerId || null,
        discount: Number(discount) || 0,
        reduceStock,
        items: items.map((r) => ({ productId: r.productId, quantity: Number(r.quantity) })),
      });
      // On success the action redirects; only errors come back here.
      if (result?.error) setError(result.error);
    });
  }

  const field =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-brand-orange";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}

      {/* Customer */}
      <div className="max-w-md">
        <label className="mb-1 block text-sm font-semibold text-gray-700">Customer</label>
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className={field}>
          <option value="">Walk-in customer (no record)</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} {c.phone ? `— ${c.phone}` : ""}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-400">
          Choose a saved customer to add this sale to their history, or leave as walk-in.
        </p>
      </div>

      {/* Line items */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">Items</label>
        <div className="space-y-2">
          {rows.map((row, i) => {
            const p = productById[row.productId];
            const lineTotal = p ? Number(p.price) * Number(row.quantity || 0) : 0;
            return (
              <div key={i} className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white p-2">
                <select
                  value={row.productId}
                  onChange={(e) => updateRow(i, { productId: e.target.value })}
                  className={`${field} flex-1 min-w-[180px]`}
                >
                  <option value="">Select a product…</option>
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name} ({formatPrice(prod.price)}) · {prod.stockQty} in stock
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={row.quantity}
                  onChange={(e) => updateRow(i, { quantity: e.target.value })}
                  className={`${field} w-20`}
                  aria-label="Quantity"
                />
                <span className="w-28 text-right text-sm font-semibold text-gray-900">
                  {formatPrice(lineTotal)}
                </span>
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  disabled={rows.length === 1}
                  className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-2 rounded-lg border border-brand-orange px-4 py-2 text-sm font-bold text-brand-red hover:bg-orange-50"
        >
          + Add another item
        </button>
      </div>

      {/* Totals */}
      <div className="max-w-md space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Discount (Rs)</span>
          <input
            type="number"
            min="0"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-right text-gray-900 outline-none focus:border-brand-orange"
          />
        </div>
        <div className="flex justify-between border-t border-gray-300 pt-3">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-xl font-black text-brand-red">{formatPrice(total)}</span>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <input type="checkbox" checked={reduceStock} onChange={(e) => setReduceStock(e.target.checked)} className="h-4 w-4 accent-brand-orange" />
        Reduce stock levels for these items
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="brand-gradient rounded-lg px-6 py-2.5 font-bold text-white shadow disabled:opacity-60"
        >
          {isPending ? "Creating…" : "Create Invoice"}
        </button>
        <Link href="/admin/invoices" className="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">
          Cancel
        </Link>
      </div>
    </form>
  );
}
