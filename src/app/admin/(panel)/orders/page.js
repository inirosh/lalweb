import Link from "next/link";
import { getAllOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/products";

export const dynamic = "force-dynamic";

const STATUS_STYLE = {
  new: "bg-blue-100 text-blue-800",
  confirmed: "bg-amber-100 text-amber-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-gray-200 text-gray-600",
};

export default async function AdminOrdersPage({ searchParams }) {
  const params = await searchParams;
  const orders = await getAllOrders();
  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-black text-gray-900">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
          {newCount > 0 && <span className="ml-1 font-semibold text-blue-600">· {newCount} new</span>}
        </p>
      </div>

      {params?.deleted && <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">✅ Order deleted.</p>}

      {orders.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No orders yet. Website orders will appear here automatically.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-semibold text-brand-red hover:underline">
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{o.customerName}</td>
                  <td className="px-4 py-3 text-gray-600">{o.customerPhone}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString("en-LK")}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold capitalize ${STATUS_STYLE[o.status] || "bg-gray-100 text-gray-600"}`}>
                      {o.status}
                    </span>
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
