import Link from "next/link";
import CustomerForm from "@/components/admin/CustomerForm";
import { createCustomer } from "../actions";

export default function NewCustomerPage() {
  return (
    <div>
      <Link href="/admin/customers" className="text-sm font-semibold text-gray-500 hover:text-brand-red">
        ← Back to customers
      </Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">Add Customer</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">Only the name is required.</p>

      <CustomerForm action={createCustomer} customer={null} submitLabel="Add Customer" />
    </div>
  );
}
