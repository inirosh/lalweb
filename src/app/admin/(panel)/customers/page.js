import Link from "next/link";
import { getAllCustomers } from "@/lib/customers";
import { deleteCustomer } from "./actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage({ searchParams }) {
  const params = await searchParams;
  const customers = await getAllCustomers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">
            {customers.length} customer{customers.length !== 1 ? "s" : ""} · Used for invoices.
          </p>
        </div>
        <Link href="/admin/customers/new" className="brand-gradient rounded-lg px-5 py-2.5 font-bold text-white shadow">
          + Add Customer
        </Link>
      </div>

      {params?.saved && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Customer saved successfully.
        </p>
      )}
      {params?.deleted && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Customer deleted.
        </p>
      )}

      {customers.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No customers yet. Click <span className="font-semibold">+ Add Customer</span> to add your first one.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/customers/${c.id}`} className="font-semibold text-brand-red hover:underline">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.phone || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{c.address || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/customers/${c.id}/edit`} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100">
                        Edit
                      </Link>
                      <ConfirmDeleteButton id={c.id} name={c.name} action={deleteCustomer} />
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
