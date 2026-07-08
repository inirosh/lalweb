import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/products";
import { updateProduct } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  // Pre-fill the product id into the update action.
  const updateWithId = updateProduct.bind(null, id);

  return (
    <div className="max-w-3xl">
      <Link href="/admin/products" className="text-sm font-semibold text-gray-500 hover:text-brand-red">
        ← Back to products
      </Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">Edit Product</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        Update the details, then click Save changes.
      </p>

      <ProductForm action={updateWithId} product={product} submitLabel="Save changes" />
    </div>
  );
}
