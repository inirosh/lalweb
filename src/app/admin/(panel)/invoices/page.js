import Link from "next/link";
import { getAllInvoices } from "@/lib/invoices";
import { formatPrice } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminInvoicesPage({ searchParams }) {
  const params = await searchParams;
  const invoices = await getAllInvoices();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Invoices</h1>
          <p className="mt-1 text-sm text-gray-500">
            {invoices.length} invoice{invoices.length !== 1 ? "s" : ""} · Create and download PDF bills.
          </p>
        </div>
        <Link href="/admin/invoices/new" className="brand-gradient rounded-lg px-5 py-2.5 font-bold text-white shadow">
          + New Invoice
        </Link>
      </div>

      {params?.deleted && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Invoice deleted.
        </p>
      )}

      {invoices.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No invoices yet. Click <span className="font-semibold">+ New Invoice</span> to create your first bill.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{inv.invoiceNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{inv.customerName}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(inv.createdAt).toLocaleDateString("en-LK")}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">
                    {formatPrice(inv.total)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/invoices/${inv.id}`} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100">
                        View
                      </Link>
                      <a href={`/admin/invoices/${inv.id}/pdf`} target="_blank" rel="noreferrer" className="rounded-lg border border-brand-orange px-3 py-1.5 text-xs font-semibold text-brand-red hover:bg-orange-50">
                        PDF
                      </a>
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
