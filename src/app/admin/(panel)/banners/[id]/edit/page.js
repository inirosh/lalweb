import Link from "next/link";
import { notFound } from "next/navigation";
import BannerForm from "@/components/admin/BannerForm";
import { getBannerById } from "@/lib/bannersAdmin";
import { updateBanner } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditBannerPage({ params }) {
  const { id } = await params;
  const banner = await getBannerById(id);
  if (!banner) notFound();

  const updateWithId = updateBanner.bind(null, id);

  return (
    <div>
      <Link href="/admin/banners" className="text-sm font-semibold text-gray-500 hover:text-brand-red">← Back to banners</Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">Edit Banner</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">Update the banner, then click Save changes.</p>
      <BannerForm action={updateWithId} banner={banner} submitLabel="Save changes" />
    </div>
  );
}
