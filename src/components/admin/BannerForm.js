"use client";

/* eslint-disable @next/next/no-img-element */
import { useActionState, useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { compressImage } from "@/lib/compressImage";

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="brand-gradient rounded-lg px-6 py-2.5 font-bold text-white shadow disabled:opacity-60">
      {pending ? "Saving…" : label}
    </button>
  );
}

export default function BannerForm({ action, banner, submitLabel }) {
  const [state, formAction] = useActionState(action, null);
  const [note, setNote] = useState("");
  const b = banner || {};
  const field = "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-brand-orange";
  const labelCls = "mb-1 block text-sm font-semibold text-gray-700";

  async function handleFile(e) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    setNote("Optimizing image…");
    try {
      // Banners are wide — allow a larger max dimension.
      const compressed = await compressImage(file, { maxSize: 1400, quality: 0.82 });
      const dt = new DataTransfer();
      dt.items.add(compressed);
      input.files = dt.files;
      setNote(`Ready (${(compressed.size / 1024).toFixed(0)} KB)`);
    } catch {
      setNote("Image ready.");
    }
  }

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{state.error}</p>
      )}

      <div>
        <label className={labelCls}>Banner image *</label>
        {b.image && <img src={b.image} alt="Current banner" className="mb-2 w-full max-w-md rounded-lg border border-gray-200" />}
        <input type="file" name="imageFile" accept="image/*" onChange={handleFile}
          className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-orange file:px-4 file:py-2 file:font-bold file:text-white hover:file:opacity-90" />
        {note && <p className="mt-1 text-xs font-semibold text-green-600">{note}</p>}
        <p className="mt-1 text-xs text-gray-400">Recommended: 1200 × 500 px, landscape. {b.image ? "Leave blank to keep the current image." : ""}</p>
        <input type="hidden" name="image" defaultValue={b.image || ""} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Title (optional overlay text)</label>
          <input name="title" defaultValue={b.title} className={field} placeholder="e.g. Avurudu Mega Sale" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Subtitle (optional)</label>
          <input name="subtitle" defaultValue={b.subtitle} className={field} placeholder="e.g. Up to 20% off power tools" />
        </div>
        <div>
          <label className={labelCls}>Button text (optional)</label>
          <input name="cta_label" defaultValue={b.ctaLabel} className={field} placeholder="e.g. Shop Now" />
        </div>
        <div>
          <label className={labelCls}>Button link (optional)</label>
          <input name="cta_href" defaultValue={b.ctaHref} className={field} placeholder="/products" />
        </div>
        <div>
          <label className={labelCls}>Order (lower shows first)</label>
          <input name="sort_order" type="number" defaultValue={b.sortOrder ?? 0} className={field} />
        </div>
        <label className="flex items-center gap-2 pt-7 text-sm font-semibold text-gray-700">
          <input type="checkbox" name="active" defaultChecked={b.active ?? true} className="h-4 w-4 accent-brand-orange" />
          Show on homepage
        </label>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SubmitButton label={submitLabel} />
        <Link href="/admin/banners" className="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">Cancel</Link>
      </div>
    </form>
  );
}
