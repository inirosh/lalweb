import Link from "next/link";
import { notFound } from "next/navigation";
import CouponForm from "@/components/admin/CouponForm";
import { getCouponById } from "@/lib/couponsAdmin";
import { getAllProducts } from "@/lib/products";
import { updateCoupon } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditCouponPage({ params }) {
  const { id } = await params;
  const [coupon, products] = await Promise.all([getCouponById(id), getAllProducts()]);
  if (!coupon) notFound();

  const updateWithId = updateCoupon.bind(null, id);

  return (
    <div>
      <Link href="/admin/coupons" className="text-sm font-semibold text-gray-500 hover:text-brand-red">← Back to coupons</Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">Edit Coupon</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">Update the details, then click Save changes.</p>
      <CouponForm action={updateWithId} coupon={coupon} submitLabel="Save changes" products={products} />
    </div>
  );
}
