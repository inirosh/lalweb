"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { CATEGORIES } from "@/lib/products";

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="brand-gradient rounded-lg px-6 py-2.5 font-bold text-white shadow disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}

// `action` is a server action with signature (prevState, formData).
// `product` is the existing product when editing (null when adding).
export default function ProductForm({ action, product, submitLabel }) {
  const [state, formAction] = useActionState(action, null);
  const p = product || {};

  const field =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-brand-orange";
  const labelCls = "mb-1 block text-sm font-semibold text-gray-700";

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {state.error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Product name *</label>
          <input name="name" defaultValue={p.name} required className={field} placeholder="e.g. Cordless Impact Drill 20V" />
        </div>

        <div>
          <label className={labelCls}>Category *</label>
          <select name="category" defaultValue={p.category || ""} required className={field}>
            <option value="" disabled>Choose a category…</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Brand</label>
          <input name="brand" defaultValue={p.brand} className={field} placeholder="e.g. EMTOP" />
        </div>

        <div>
          <label className={labelCls}>Price (Rs) *</label>
          <input name="price" type="number" min="0" step="0.01" defaultValue={p.price} required className={field} placeholder="12500" />
        </div>

        <div>
          <label className={labelCls}>Stock quantity *</label>
          <input name="stock_qty" type="number" min="0" step="1" defaultValue={p.stockQty ?? 0} required className={field} placeholder="10" />
        </div>

        <div>
          <label className={labelCls}>Low-stock warning at (or below)</label>
          <input name="low_stock_threshold" type="number" min="0" step="1" defaultValue={p.lowStockThreshold ?? 3} className={field} placeholder="3" />
        </div>

        <div>
          <label className={labelCls}>Warranty</label>
          <input name="warranty" defaultValue={p.warranty} className={field} placeholder="e.g. 1 Year Warranty" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Short description (shown on cards)</label>
          <input name="short_description" defaultValue={p.shortDescription} className={field} placeholder="One short line about the product" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Full description (shown on product page)</label>
          <textarea name="description" defaultValue={p.description} rows={4} className={field} placeholder="Detailed description…" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Image URL (optional)</label>
          <input name="image" defaultValue={p.image} className={field} placeholder="https://… (leave blank to show a placeholder)" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Web address (slug) — leave blank to auto-generate</label>
          <input name="slug" defaultValue={p.slug} className={field} placeholder="auto-generated from the name" />
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 sm:col-span-2">
          <input type="checkbox" name="featured" defaultChecked={p.featured} className="h-4 w-4 accent-brand-orange" />
          Show on homepage (Featured)
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton label={submitLabel} />
        <Link href="/admin/products" className="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">
          Cancel
        </Link>
      </div>
    </form>
  );
}
