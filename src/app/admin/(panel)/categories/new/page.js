import Link from "next/link";
import CategoryForm from "@/components/admin/CategoryForm";
import { createCategory } from "../actions";

export default function NewCategoryPage() {
  return (
    <div>
      <Link href="/admin/categories" className="text-sm font-semibold text-gray-500 hover:text-brand-red">← Back to categories</Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">New Category</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">Add a new product category (e.g. Welding, Garden Tools).</p>
      <CategoryForm action={createCategory} category={null} submitLabel="Add Category" />
    </div>
  );
}
