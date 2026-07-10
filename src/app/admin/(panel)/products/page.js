import Link from "next/link";
import { getAllProducts, formatPrice } from "@/lib/products";
import { getAllCategories, categoryName } from "@/lib/categories";
import { getAllCosts } from "@/lib/costs";
import { deleteProduct } from "./actions";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({ searchParams }) {
  const params = await searchParams;
  const [products, costs, categories] = await Promise.all([getAllProducts(), getAllCosts(), getAllCategories()]);

  const lowStock = products.filter(
    (p) => p.stockQty > 0 && p.stockQty <= (p.lowStockThreshold ?? 3)
  );
  const outOfStock = products.filter((p) => p.stockQty === 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Products &amp; Stock</h1>
          <p className="mt-1 text-sm text-gray-500">
            {products.length} products · Changes appear on your website instantly.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="brand-gradient rounded-lg px-5 py-2.5 font-bold text-white shadow"
        >
          + Add Product
        </Link>
      </div>

      {/* Success messages */}
      {params?.saved && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Product saved successfully.
        </p>
      )}
      {params?.deleted && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Product deleted.
        </p>
      )}

      {/* Stock alerts */}
      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
          <span className="font-bold text-amber-800">Stock alerts: </span>
          {outOfStock.length > 0 && (
            <span className="text-amber-800">
              {outOfStock.length} out of stock
            </span>
          )}
          {outOfStock.length > 0 && lowStock.length > 0 && <span> · </span>}
          {lowStock.length > 0 && (
            <span className="text-amber-800">{lowStock.length} running low</span>
          )}
        </div>
      )}

      {/* Products table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Cost </th>
              <th className="px-4 py-3">Profit</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => {
              const isOut = p.stockQty === 0;
              const isLow = !isOut && p.stockQty <= (p.lowStockThreshold ?? 3);
              const cost = costs[p.id];
              const sell = p.offerPrice != null && p.offerPrice < p.price ? p.offerPrice : p.price;
              const profit = cost != null ? sell - cost : null;
              return (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-gray-900">{p.name}</span>
                    {p.featured && (
                      <span className="ml-2 rounded bg-brand-yellow px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand-dark">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {categoryName(categories, p.category)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {formatPrice(p.price)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {cost != null && cost > 0 ? formatPrice(cost) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {profit != null && cost > 0 ? (
                      <span className={`font-semibold ${profit >= 0 ? "text-green-700" : "text-red-600"}`}>
                        {formatPrice(profit)}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        isOut
                          ? "bg-red-100 text-red-700"
                          : isLow
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {p.stockQty} {isOut ? "· Out" : isLow ? "· Low" : "· OK"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </Link>
                      <DeleteProductButton
                        id={p.id}
                        name={p.name}
                        action={deleteProduct}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
