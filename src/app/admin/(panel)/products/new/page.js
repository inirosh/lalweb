import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin/products" className="text-sm font-semibold text-gray-500 hover:text-brand-red">
        ← Back to products
      </Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">Add Product</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        Fill in the details. Fields marked * are required.
      </p>

      <ProductForm action={createProduct} product={null} submitLabel="Add Product" />
    </div>
  );
}
