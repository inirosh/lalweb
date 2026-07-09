import Link from "next/link";
import BannerForm from "@/components/admin/BannerForm";
import { createBanner } from "../actions";

export default function NewBannerPage() {
  return (
    <div>
      <Link href="/admin/banners" className="text-sm font-semibold text-gray-500 hover:text-brand-red">← Back to banners</Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">New Banner</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">Upload a wide banner image for the top of your homepage.</p>
      <BannerForm action={createBanner} banner={null} submitLabel="Add Banner" />
    </div>
  );
}
