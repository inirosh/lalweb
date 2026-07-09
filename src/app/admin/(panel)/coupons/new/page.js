import Link from "next/link";
import CouponForm from "@/components/admin/CouponForm";
import { getAllProducts } from "@/lib/products";
import { createCoupon } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewCouponPage() {
  const products = await getAllProducts();
  return (
    <div>
      <Link href="/admin/coupons" className="text-sm font-semibold text-gray-500 hover:text-brand-red">← Back to coupons</Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">New Coupon</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">Create a discount code customers can collect and use at checkout.</p>
      <CouponForm action={createCoupon} coupon={null} submitLabel="Create Coupon" products={products} />
    </div>
  );
}
