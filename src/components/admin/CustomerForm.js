"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

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

// `action` = server action (prevState, formData). `customer` = existing when editing.
export default function CustomerForm({ action, customer, submitLabel }) {
  const [state, formAction] = useActionState(action, null);
  const c = customer || {};

  const field =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-brand-orange";
  const labelCls = "mb-1 block text-sm font-semibold text-gray-700";

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {state.error}
        </p>
      )}

      <div>
        <label className={labelCls}>Customer name *</label>
        <input name="name" defaultValue={c.name} required className={field} placeholder="e.g. Kamal Perera" />
      </div>

      <div>
        <label className={labelCls}>Phone</label>
        <input name="phone" defaultValue={c.phone} className={field} placeholder="e.g. 071 234 5678" />
      </div>

      <div>
        <label className={labelCls}>Address</label>
        <textarea name="address" defaultValue={c.address} rows={3} className={field} placeholder="Street, town…" />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SubmitButton label={submitLabel} />
        <Link href="/admin/customers" className="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">
          Cancel
        </Link>
      </div>
    </form>
  );
}
