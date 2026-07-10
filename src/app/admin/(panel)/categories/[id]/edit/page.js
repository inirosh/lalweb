import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { getCategoryById } from "@/lib/categories";
import { updateCategory } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }) {
  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) notFound();

  const updateWithId = updateCategory.bind(null, id);

  return (
    <div>
      <Link href="/admin/categories" className="text-sm font-semibold text-gray-500 hover:text-brand-red">← Back to categories</Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">Edit Category</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">Update the details, then click Save changes.</p>
      <CategoryForm action={updateWithId} category={category} submitLabel="Save changes" />
    </div>
  );
}
