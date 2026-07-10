import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import VoucherStrip from "@/components/VoucherStrip";
import Countdown from "@/components/Countdown";
import HeroBanner from "@/components/HeroBanner";
import JsonLd from "@/components/JsonLd";
import { SHOP } from "@/lib/shop";
import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import { getActiveCoupons } from "@/lib/coupons";
import { getActiveBanners } from "@/lib/banners";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";
import {
  IconWrench, IconDroplet, IconWind, IconBolt, IconHome, IconBag,
  IconChevronRight, IconShield, IconTruck, IconStar,
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
  const [products, coupons, banners, categories, lang] = await Promise.all([
    getAllProducts(),
    getActiveCoupons(),
    getActiveBanners(),
    getAllCategories(),
    getLang(),
  ]);
  const tr = (k) => t(lang, k);
  const deals = products.filter(
    (p) => p.offerPrice != null && p.offerPrice < p.price
  );

  return (
    <div className="mx-auto max-w-6xl px-3 pb-8 sm:px-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HardwareStore",
          name: SHOP.name,
          image: "https://lalweb.vercel.app/logo.jpg",
          "@id": "https://lalweb.vercel.app",
          url: "https://lalweb.vercel.app",
          telephone: `+${SHOP.phoneIntl}`,
          email: SHOP.email,
          priceRange: "රු",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Wadduwa",
            addressRegion: "Western Province",
            addressCountry: "LK",
          },
          sameAs: [SHOP.instagramUrl],
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        }}
      />

      {/* ============ HERO BANNER (managed from admin) ============ */}
      <HeroBanner banners={banners} />

      {/* ============ TRUST STRIP ============ */}
      <section className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm">
        {[
          [IconShield, "trust.warranty", "trust.warrantySub"],
          [IconTruck, "trust.genuine", "trust.genuineSub"],
          [IconStar, "trust.trusted", "trust.trustedSub"],
        ].map(([Icon, titleKey, subKey]) => (
          <div key={titleKey} className="flex flex-col items-center gap-1">
            <Icon width={20} height={20} className="text-brand-red" />
            <span className="text-[11px] font-bold text-gray-800 sm:text-xs">{tr(titleKey)}</span>
            <span className="hidden text-[10px] text-gray-400 sm:block">{tr(subKey)}</span>
          </div>
        ))}
      </section>

      {/* ============ VOUCHERS ============ */}
      <VoucherStrip coupons={coupons} />

      {/* ============ FLASH SALE / SPECIAL OFFERS ============ */}
      {deals.length > 0 && (
        <section className="mt-5 rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-orange-50 p-3 shadow-sm sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 text-base font-black text-brand-red">
              <IconBolt width={18} height={18} />
              {tr("home.flashSale")}
            </h2>
            <Link href="/products" className="flex items-center text-xs font-bold text-brand-red">
              {tr("btn.seeAll")} <IconChevronRight width={14} height={14} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {deals.map((product) => (
              <div key={product.slug} className="w-36 shrink-0 sm:w-44">
                <ProductCard product={product} />
                {product.offerEnds && (
                  <div className="mt-1.5 text-center">
                    <span className="text-[10px] font-bold uppercase text-gray-500">{tr("home.endsIn")}</span>
                    <div className="mt-0.5 flex justify-center">
                      <Countdown endsAt={product.offerEnds} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ CATEGORIES ============ */}
      <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
        <h2 className="mb-3 text-sm font-black text-gray-900 sm:text-base">{tr("home.categories")}</h2>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3">
          {categories.map((cat) => {
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

      {/* ============ PRODUCT FEED ============ */}
      <section className="mt-5">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-base font-black text-gray-900">{tr("home.justForYou")}</h2>
          <Link href="/products" className="flex items-center text-xs font-bold text-brand-red">
            {tr("btn.viewAll")} <IconChevronRight width={14} height={14} />
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
