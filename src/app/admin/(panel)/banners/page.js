/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getAllBanners } from "@/lib/bannersAdmin";
import { deleteBanner } from "./actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage({ searchParams }) {
  const params = await searchParams;
  const banners = await getAllBanners();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Hero Banners</h1>
          <p className="mt-1 text-sm text-gray-500">
            {banners.length} banner{banners.length !== 1 ? "s" : ""} · Shown at the top of your homepage.
          </p>
        </div>
        <Link href="/admin/banners/new" className="brand-gradient rounded-lg px-5 py-2.5 font-bold text-white shadow">
          + New Banner
        </Link>
      </div>

      {params?.saved && <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">✅ Banner saved.</p>}
      {params?.deleted && <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">✅ Banner deleted.</p>}

      {banners.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No banners yet. Click <span className="font-semibold">+ New Banner</span> to upload your first homepage banner.
          <br />
          <span className="text-xs">(If none are added, the default banner is shown.)</span>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {banners.map((b) => (
            <div key={b.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <img src={b.image} alt={b.title || "Banner"} className="aspect-[12/5] w-full object-cover" />
              <div className="flex items-center justify-between p-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-900">{b.title || "(no title)"}</p>
                  <span className={`text-xs font-bold ${b.active ? "text-green-600" : "text-gray-400"}`}>
                    {b.active ? "● Active" : "○ Hidden"} · order {b.sortOrder}
                  </span>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link href={`/admin/banners/${b.id}/edit`} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100">Edit</Link>
                  <ConfirmDeleteButton id={b.id} name={b.title || "this banner"} action={deleteBanner} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
