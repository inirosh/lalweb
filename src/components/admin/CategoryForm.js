"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="brand-gradient rounded-lg px-6 py-2.5 font-bold text-white shadow disabled:opacity-60">
      {pending ? "Saving…" : label}
    </button>
  );
}

export default function CategoryForm({ action, category, submitLabel }) {
  const [state, formAction] = useActionState(action, null);
  const c = category || {};
  const field = "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-brand-orange";
  const labelCls = "mb-1 block text-sm font-semibold text-gray-700";

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{state.error}</p>
      )}

      <div>
        <label className={labelCls}>Category name *</label>
        <input name="name" defaultValue={c.name} required className={field} placeholder="e.g. Welding Machines" />
      </div>

      <div>
        <label className={labelCls}>Order (lower shows first)</label>
        <input name="sort_order" type="number" defaultValue={c.sortOrder ?? 0} className={field} />
      </div>

      <div>
        <label className={labelCls}>Web address (slug) — leave blank to auto-generate</label>
        <input name="slug" defaultValue={c.slug} className={field} placeholder="auto-generated from the name" />
        <p className="mt-1 text-xs text-gray-400">Changing this on an existing category will change its link; existing products keep their current category.</p>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SubmitButton label={submitLabel} />
        <Link href="/admin/categories" className="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">Cancel</Link>
      </div>
    </form>
  );
}
