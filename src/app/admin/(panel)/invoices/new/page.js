import Link from "next/link";
import InvoiceForm from "@/components/admin/InvoiceForm";
import { getAllCustomers } from "@/lib/customers";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function NewInvoicePage() {
  const [customers, products] = await Promise.all([
    getAllCustomers(),
    getAllProducts(),
  ]);

  return (
    <div className="max-w-3xl">
      <Link href="/admin/invoices" className="text-sm font-semibold text-gray-500 hover:text-brand-red">
        ← Back to invoices
      </Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">New Invoice</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        Pick a customer, add items, and the total is calculated for you.
      </p>

      <InvoiceForm customers={customers} products={products} />
    </div>
  );
}
