import Link from "next/link";
import { getAllCategories } from "@/lib/categories";
import { deleteCategory } from "./actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage({ searchParams }) {
  const params = await searchParams;
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">
            {categories.length} categories · Shown on the homepage and product filters.
          </p>
        </div>
        <Link href="/admin/categories/new" className="brand-gradient rounded-lg px-5 py-2.5 font-bold text-white shadow">
          + New Category
        </Link>
      </div>

      {params?.saved && <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">Category saved.</p>}
      {params?.deleted && <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">Category deleted.</p>}

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Web address</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((c) => (
              <tr key={c.slug} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{c.sortOrder ?? "—"}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-gray-500">{c.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {c.id ? (
                      <>
                        <Link href={`/admin/categories/${c.id}/edit`} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100">Edit</Link>
                        <ConfirmDeleteButton id={c.id} name={c.name} action={deleteCategory} />
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">Run the SQL to manage</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
