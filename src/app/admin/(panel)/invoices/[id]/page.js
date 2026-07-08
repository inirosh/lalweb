import Link from "next/link";
import { notFound } from "next/navigation";
import { getInvoiceById } from "@/lib/invoices";
import { formatPrice } from "@/lib/products";
import { deleteInvoice } from "../actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

export default async function InvoiceDetailPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const invoice = await getInvoiceById(id);
  if (!invoice) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/invoices" className="text-sm font-semibold text-gray-500 hover:text-brand-red">
        ← Back to invoices
      </Link>

      {sp?.created && (
        <p className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          ✅ Invoice created! Download the PDF below or print it for your customer.
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{invoice.invoiceNumber}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {new Date(invoice.createdAt).toLocaleDateString("en-LK", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-2">
          <a href={`/admin/invoices/${id}/pdf`} target="_blank" rel="noreferrer" className="brand-gradient rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow">
            ⬇ Download PDF
          </a>
          <ConfirmDeleteButton id={id} name={invoice.invoiceNumber} action={deleteInvoice} />
        </div>
      </div>

      {/* Bill to */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase text-gray-400">Bill To</p>
        {invoice.customer ? (
          <>
            <p className="mt-1 font-semibold text-gray-900">{invoice.customer.name}</p>
            <p className="text-sm text-gray-500">
              {invoice.customer.phone || ""} {invoice.customer.address ? `· ${invoice.customer.address}` : ""}
            </p>
          </>
        ) : (
          <p className="mt-1 font-semibold text-gray-900">Walk-in customer</p>
        )}
      </div>

      {/* Items */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-right">Unit Price</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoice.items.map((it, i) => (
              <tr key={i}>
                <td className="px-4 py-3 font-medium text-gray-900">{it.description}</td>
                <td className="px-4 py-3 text-center text-gray-600">{it.quantity}</td>
                <td className="px-4 py-3 text-right text-gray-600">{formatPrice(it.unitPrice)}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatPrice(it.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-4 ml-auto max-w-xs space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">{formatPrice(invoice.subtotal)}</span>
        </div>
        {invoice.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-semibold text-gray-900">- {formatPrice(invoice.discount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-gray-300 pt-2">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-xl font-black text-brand-red">{formatPrice(invoice.total)}</span>
        </div>
      </div>
    </div>
  );
}
