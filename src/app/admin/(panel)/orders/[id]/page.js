import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/orders";
import { formatPrice } from "@/lib/products";
import { updateOrderStatus, deleteOrder } from "../actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "confirmed", "delivered", "cancelled"];

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const setStatus = updateOrderStatus.bind(null, id);
  const waLink = `https://wa.me/${order.customerPhone.replace(/\D/g, "").replace(/^0/, "94")}`;

  return (
    <div className="max-w-3xl">
      <Link href="/admin/orders" className="text-sm font-semibold text-gray-500 hover:text-brand-red">← Back to orders</Link>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString("en-LK")}
          </p>
        </div>
        <ConfirmDeleteButton id={id} name={order.orderNumber} action={deleteOrder} />
      </div>

      {/* Status control */}
      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-xs font-bold uppercase text-gray-400">Order Status</p>
        <form action={setStatus} className="flex flex-wrap items-center gap-2">
          <select name="status" defaultValue={order.status} className="rounded-lg border border-gray-300 px-3 py-2 text-sm capitalize outline-none focus:border-brand-orange">
            {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>
          <button type="submit" className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-bold text-white hover:bg-black">Update</button>
        </form>
      </div>

      {/* Customer */}
      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-bold uppercase text-gray-400">Customer</p>
        <p className="mt-1 font-semibold text-gray-900">{order.customerName}</p>
        <p className="text-sm text-gray-600">{order.customerPhone}</p>
        <p className="text-sm text-gray-600">{order.customerAddress}</p>
        {order.note && <p className="mt-1 text-sm text-gray-500">Note: {order.note}</p>}
        <a href={waLink} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700">
          Message customer on WhatsApp
        </a>
      </div>

      {/* Items */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.items.map((it, i) => (
              <tr key={i}>
                <td className="px-4 py-3">
                  {it.slug ? <Link href={`/products/${it.slug}`} className="font-medium text-gray-900 hover:text-brand-red">{it.name}</Link> : <span className="font-medium text-gray-900">{it.name}</span>}
                </td>
                <td className="px-4 py-3 text-center text-gray-600">{it.quantity}</td>
                <td className="px-4 py-3 text-right text-gray-600">{formatPrice(it.unitPrice)}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatPrice(it.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-4 ml-auto max-w-xs space-y-1.5 text-sm">
        <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-semibold">{formatPrice(order.subtotal)}</span></div>
        {order.discount > 0 && <div className="flex justify-between"><span className="text-gray-600">Coupon {order.couponCode ? `(${order.couponCode})` : ""}</span><span className="font-semibold text-green-600">- {formatPrice(order.discount)}</span></div>}
        <div className="flex justify-between"><span className="text-gray-600">Delivery</span><span className="font-bold text-green-600">FREE</span></div>
        <div className="flex justify-between border-t border-gray-200 pt-2 text-base"><span className="font-bold text-gray-900">Total (COD)</span><span className="font-black text-brand-red">{formatPrice(order.total)}</span></div>
      </div>
    </div>
  );
}
