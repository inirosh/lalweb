import Link from "next/link";
import { getAllCoupons } from "@/lib/couponsAdmin";
import { formatPrice } from "@/lib/products";
import { deleteCoupon } from "./actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage({ searchParams }) {
  const params = await searchParams;
  const coupons = await getAllCoupons();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Coupons &amp; Offers</h1>
          <p className="mt-1 text-sm text-gray-500">
            {coupons.length} coupon{coupons.length !== 1 ? "s" : ""} · Customers collect these on the homepage.
          </p>
        </div>
        <Link href="/admin/coupons/new" className="brand-gradient rounded-lg px-5 py-2.5 font-bold text-white shadow">
          + New Coupon
        </Link>
      </div>

      {params?.saved && <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">✅ Coupon saved.</p>}
      {params?.deleted && <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">✅ Coupon deleted.</p>}

      {coupons.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No coupons yet. Click <span className="font-semibold">+ New Coupon</span> to create your first discount code.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Min order</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-black text-brand-red">{c.code}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {c.discountType === "percent" ? `${c.discountValue}%` : formatPrice(c.discountValue)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.minOrder > 0 ? formatPrice(c.minOrder) : "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${c.active ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}`}>
                      {c.active ? "Active" : "Off"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/coupons/${c.id}/edit`} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100">Edit</Link>
                      <ConfirmDeleteButton id={c.id} name={c.code} action={deleteCoupon} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
