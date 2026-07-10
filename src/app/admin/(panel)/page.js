import Link from "next/link";
import { getDashboardStats } from "@/lib/dashboard";
import { formatPrice } from "@/lib/products";

export const dynamic = "force-dynamic";

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
      <p className={`mt-1 text-2xl font-black ${accent || "text-gray-900"}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

export default async function AdminDashboardPage() {
  const s = await getDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
      <p className="mt-1 text-gray-500">Your shop at a glance.</p>

      {/* New orders alert */}
      {s.newOrdersCount > 0 && (
        <Link href="/admin/orders" className="mt-6 flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-sm hover:bg-blue-100">
          <span className="font-bold text-blue-800">{s.newOrdersCount} new order{s.newOrdersCount !== 1 ? "s" : ""} to review</span>
          <span className="text-sm font-bold text-blue-700">View →</span>
        </Link>
      )}

      {/* Sales stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Sales Today" value={formatPrice(s.totalSalesToday)} sub={`${s.countToday} bill${s.countToday !== 1 ? "s" : ""}`} accent="text-brand-red" />
        <StatCard label="Sales This Month" value={formatPrice(s.totalSalesMonth)} sub={`${s.countMonth} bill${s.countMonth !== 1 ? "s" : ""}`} accent="text-brand-red" />
        <StatCard label="New Orders" value={s.newOrdersCount} sub="online, to review" accent={s.newOrdersCount > 0 ? "text-blue-600" : "text-gray-900"} />
        <StatCard label="Low-Stock Items" value={s.lowStock.length} sub="need attention" accent={s.lowStock.length > 0 ? "text-amber-600" : "text-green-600"} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Best sellers */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-black text-gray-900">Best-Selling Items</h2>
          {s.bestSellers.length === 0 ? (
            <p className="mt-3 text-sm text-gray-400">No sales recorded yet.</p>
          ) : (
            <ol className="mt-3 space-y-2">
              {s.bestSellers.map((item, i) => (
                <li key={item.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">
                    <span className="mr-2 font-bold text-brand-red">{i + 1}.</span>
                    {item.name}
                  </span>
                  <span className="font-bold text-gray-900">{item.qty} sold</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Low stock */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-black text-gray-900">Low-Stock Alerts</h2>
          {s.lowStock.length === 0 ? (
            <p className="mt-3 text-sm text-green-600">All products are well stocked. </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {s.lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <Link href={`/admin/products/${p.id}/edit`} className="text-gray-700 hover:text-brand-red hover:underline">
                    {p.name}
                  </Link>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${p.qty === 0 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`}>
                    {p.qty === 0 ? "Out of stock" : `${p.qty} left`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent sales */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-gray-900">Recent Sales</h2>
          <Link href="/admin/invoices" className="text-sm font-bold text-brand-red hover:underline">
            View all →
          </Link>
        </div>
        {s.recent.length === 0 ? (
          <p className="mt-3 text-sm text-gray-400">
            No invoices yet. <Link href="/admin/invoices/new" className="font-semibold text-brand-red hover:underline">Create your first invoice →</Link>
          </p>
        ) : (
          <div className="mt-3 divide-y divide-gray-100">
            {s.recent.map((inv) => (
              <Link key={inv.id} href={`/admin/invoices/${inv.id}`} className="flex items-center justify-between py-2.5 text-sm hover:bg-gray-50">
                <span className="font-semibold text-gray-900">{inv.invoiceNumber}</span>
                <span className="text-gray-500">{inv.customerName}</span>
                <span className="text-gray-400">{new Date(inv.createdAt).toLocaleDateString("en-LK")}</span>
                <span className="font-bold text-gray-900">{formatPrice(inv.total)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
