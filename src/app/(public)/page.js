import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, CATEGORIES } from "@/lib/products";
import { SHOP } from "@/lib/shop";
import {
  IconWrench, IconDroplet, IconWind, IconBolt, IconHome, IconBag,
  IconSearch, IconChevronRight, IconShield, IconTruck, IconStar,
} from "@/components/icons";

export const dynamic = "force-dynamic";

// Icon for each category tile
const CAT_ICONS = {
  "power-tools": IconWrench,
  "pressure-washers": IconDroplet,
  "air-compressors": IconWind,
  "cleaning-equipment": IconBolt,
  "home-appliances": IconHome,
  "accessories": IconBag,
};

export default async function HomePage() {
  const products = await getAllProducts();
  const deals = products.filter(
    (p) => p.offerPrice != null && p.offerPrice < p.price
  );

  return (
    <div className="mx-auto max-w-6xl px-3 pb-8 sm:px-4">
      {/* ============ PROMO BANNER ============ */}
      <section className="mt-3">
        <div className="brand-gradient anim-gradient relative overflow-hidden rounded-2xl px-5 py-5 sm:px-8 sm:py-8">
          <div className="relative z-10 max-w-[62%] sm:max-w-[70%]">
            <span className="inline-block rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              Official EMTOP Distributor
            </span>
            <h1 className="mt-2 text-xl font-black leading-tight text-white sm:text-3xl">
              Power Tools &amp; Home Appliances
            </h1>
            <p className="mt-1 text-xs text-white/90 sm:text-sm">
              Value for money · {SHOP.location}
            </p>
            <Link
              href="/products"
              className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-red shadow sm:text-sm"
            >
              Shop Now <IconChevronRight width={14} height={14} />
            </Link>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://nafldzwawqvljotcxspw.supabase.co/storage/v1/object/public/product-images/emtop-cordless-drill-20v.png"
            alt="EMTOP drill"
            className="anim-float pointer-events-none absolute -right-2 bottom-0 top-0 my-auto h-[85%] object-contain drop-shadow-xl"
          />
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm">
        {[
          [IconShield, "Warranty", "on eligible items"],
          [IconTruck, "Genuine", "EMTOP stock"],
          [IconStar, "Trusted", "16K+ followers"],
        ].map(([Icon, title, sub]) => (
          <div key={title} className="flex flex-col items-center gap-1">
            <Icon width={20} height={20} className="text-brand-red" />
            <span className="text-[11px] font-bold text-gray-800 sm:text-xs">{title}</span>
            <span className="hidden text-[10px] text-gray-400 sm:block">{sub}</span>
          </div>
        ))}
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
        <h2 className="mb-3 text-sm font-black text-gray-900 sm:text-base">Categories</h2>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = CAT_ICONS[cat.slug] || IconBag;
            return (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-1.5 rounded-xl p-2 text-center transition-colors hover:bg-gray-50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-50 to-red-50 text-brand-red">
                  <Icon width={22} height={22} />
                </span>
                <span className="text-[10px] font-semibold leading-tight text-gray-700 sm:text-xs">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============ HOT DEALS (horizontal scroll) ============ */}
      {deals.length > 0 && (
        <section className="mt-5">
          <div className="mb-2.5 flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 text-base font-black text-gray-900">
              <IconBolt width={18} height={18} className="text-brand-red" />
              Hot Deals
            </h2>
            <Link href="/products" className="flex items-center text-xs font-bold text-brand-red">
              See all <IconChevronRight width={14} height={14} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {deals.map((product) => (
              <div key={product.slug} className="w-36 shrink-0 sm:w-44">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ PRODUCT FEED ============ */}
      <section className="mt-5">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-base font-black text-gray-900">Just For You</h2>
          <Link href="/products" className="flex items-center text-xs font-bold text-brand-red">
            View all <IconChevronRight width={14} height={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
