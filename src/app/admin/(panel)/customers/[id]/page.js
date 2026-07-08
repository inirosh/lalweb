import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomerById, getCustomerInvoices } from "@/lib/customers";
import { formatPrice } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function CustomerDetailPage({ params }) {
  const { id } = await params;
  const customer = await getCustomerById(id);
  if (!customer) notFound();

  const invoices = await getCustomerInvoices(id);
  const totalSpent = invoices.reduce((sum, inv) => sum + Number(inv.total || 0), 0);

  return (
    <div>
      <Link href="/admin/customers" className="text-sm font-semibold text-gray-500 hover:text-brand-red">
        ← Back to customers
      </Link>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{customer.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {customer.phone || "No phone"} · {customer.address || "No address"}
          </p>
        </div>
        <Link href={`/admin/customers/${id}/edit`} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
          Edit
        </Link>
      </div>

      {/* Summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase text-gray-400">Total Purchases</p>
          <p className="mt-1 text-2xl font-black text-gray-900">{invoices.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase text-gray-400">Total Spent</p>
          <p className="mt-1 text-2xl font-black text-brand-red">{formatPrice(totalSpent)}</p>
        </div>
      </div>

      {/* Purchase history */}
      <h2 className="mt-8 text-lg font-black text-gray-900">Purchase History</h2>
      {invoices.length === 0 ? (
        <div className="mt-3 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          No purchases yet. Invoices you create for this customer will appear here.
        </div>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{inv.invoice_number}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(inv.created_at).toLocaleDateString("en-LK")}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">
                    {formatPrice(inv.total)}
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
