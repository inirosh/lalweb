import Link from "next/link";
import { notFound } from "next/navigation";
import CustomerForm from "@/components/admin/CustomerForm";
import { getCustomerById } from "@/lib/customers";
import { updateCustomer } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditCustomerPage({ params }) {
  const { id } = await params;
  const customer = await getCustomerById(id);
  if (!customer) notFound();

  const updateWithId = updateCustomer.bind(null, id);

  return (
    <div>
      <Link href="/admin/customers" className="text-sm font-semibold text-gray-500 hover:text-brand-red">
        ← Back to customers
      </Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">Edit Customer</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">Update the details, then click Save changes.</p>

      <CustomerForm action={updateWithId} customer={customer} submitLabel="Save changes" />
    </div>
  );
}
