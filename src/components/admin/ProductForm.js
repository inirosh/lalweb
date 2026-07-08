"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { CATEGORIES } from "@/lib/products";
import { compressImage } from "@/lib/compressImage";

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
  const [photoNote, setPhotoNote] = useState("");
  const p = product || {};

  // Compress the chosen photo in the browser before it uploads.
  async function handleFileChange(e) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    setPhotoNote("Optimizing photo…");
    try {
      const compressed = await compressImage(file);
      const dt = new DataTransfer();
      dt.items.add(compressed);
      input.files = dt.files;
      const kb = (compressed.size / 1024).toFixed(0);
      const origKb = (file.size / 1024).toFixed(0);
      setPhotoNote(
        compressed === file
          ? `Ready (${kb} KB)`
          : `Optimized: ${origKb} KB → ${kb} KB ✓`
      );
    } catch {
      setPhotoNote("Photo ready.");
    }
  }

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
          <label className={labelCls}>Sale price (Rs) — optional</label>
          <input name="offer_price" type="number" min="0" step="0.01" defaultValue={p.offerPrice ?? ""} className={field} placeholder="e.g. 9900 (leave blank for no offer)" />
          <p className="mt-1 text-xs text-gray-400">If set lower than the price, the product shows a discount badge.</p>
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
          <label className={labelCls}>Product photo</label>
          {p.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={p.image}
              alt="Current product photo"
              className="mb-2 h-24 w-24 rounded-lg border border-gray-200 object-cover"
            />
          )}
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-orange file:px-4 file:py-2 file:font-bold file:text-white hover:file:opacity-90"
          />
          {photoNote && (
            <p className="mt-1 text-xs font-semibold text-green-600">{photoNote}</p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            {p.image
              ? "Choose a new photo to replace the current one, or leave blank to keep it."
              : "Upload a photo from your computer or phone (JPG/PNG). Optional — a placeholder is shown if left blank."}
          </p>
          {/* Keeps the existing photo when editing if no new file is chosen. */}
          <input type="hidden" name="image" defaultValue={p.image || ""} />
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
