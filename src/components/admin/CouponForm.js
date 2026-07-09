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

// `action` = server action (prevState, formData). `coupon` = existing when editing.
export default function CouponForm({ action, coupon, submitLabel, products }) {
  const [state, formAction] = useActionState(action, null);
  const c = coupon || {};
  const field = "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-brand-orange";
  const labelCls = "mb-1 block text-sm font-semibold text-gray-700";
  const dt = (v) => (v ? v.slice(0, 16) : "");

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{state.error}</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Coupon code *</label>
          <input name="code" defaultValue={c.code} required className={`${field} uppercase`} placeholder="e.g. TOOLS10" />
        </div>
        <div>
          <label className={labelCls}>Active</label>
          <label className="flex h-[42px] items-center gap-2 text-sm font-semibold text-gray-700">
            <input type="checkbox" name="active" defaultChecked={c.active ?? true} className="h-4 w-4 accent-brand-orange" />
            Show &amp; allow this coupon
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Description</label>
          <input name="description" defaultValue={c.description} className={field} placeholder="e.g. 10% off any order" />
        </div>

        <div>
          <label className={labelCls}>Discount type *</label>
          <select name="discount_type" defaultValue={c.discountType || "percent"} className={field}>
            <option value="percent">Percentage (%)</option>
            <option value="fixed">Fixed amount (Rs)</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Discount value *</label>
          <input name="discount_value" type="number" min="0" step="0.01" defaultValue={c.discountValue} required className={field} placeholder="10 or 500" />
        </div>

        <div>
          <label className={labelCls}>Minimum order (Rs)</label>
          <input name="min_order" type="number" min="0" step="0.01" defaultValue={c.minOrder ?? 0} className={field} placeholder="0" />
        </div>
        <div>
          <label className={labelCls}>Only for product (optional)</label>
          <select name="product_slug" defaultValue={c.productSlug || ""} className={field}>
            <option value="">Any product</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Valid from (optional)</label>
          <input name="valid_from" type="datetime-local" defaultValue={dt(c.validFrom)} className={field} />
        </div>
        <div>
          <label className={labelCls}>Valid until (optional)</label>
          <input name="valid_to" type="datetime-local" defaultValue={dt(c.validTo)} className={field} />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SubmitButton label={submitLabel} />
        <Link href="/admin/coupons" className="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">Cancel</Link>
      </div>
    </form>
  );
}
