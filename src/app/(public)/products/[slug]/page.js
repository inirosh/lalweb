import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductBuyBar from "@/components/ProductBuyBar";
import JsonLd from "@/components/JsonLd";
import StockBadge from "@/components/StockBadge";
import InquiryButtons from "@/components/InquiryButtons";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { IconTruck, IconShield } from "@/components/icons";
import {
  getProductBySlug,
  getCategoryName,
  formatPrice,
} from "@/lib/products";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

// Always fetch fresh so stock/price changes show up right away
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  const price = product.offerPrice ?? product.price;
  const desc =
    (product.shortDescription || product.description || "").slice(0, 160) +
    ` — ${formatPrice(price)}. Free island-wide delivery, cash on delivery.`;
  const image = product.image || "/logo.jpg";

  return {
    title: product.name,
    description: desc,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} — ${formatPrice(price)}`,
      description: desc,
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — ${formatPrice(price)}`,
      description: desc,
      images: [image],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const [product, lang] = await Promise.all([getProductBySlug(slug), getLang()]);
  if (!product) notFound();
  const tr = (k) => t(lang, k);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-24 md:pb-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: product.image ? [product.image] : undefined,
          description: product.description || product.shortDescription,
          brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
          offers: {
            "@type": "Offer",
            priceCurrency: "LKR",
            price: product.offerPrice ?? product.price,
            availability: product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: `https://lalweb.vercel.app/products/${product.slug}`,
          },
        }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-red">{tr("nav.home")}</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-brand-red">{tr("nav.products")}</Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-gray-700">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image gallery */}
        <ProductGallery images={[product.image, ...product.gallery]} name={product.name} />

        {/* Details */}
        <div className="flex flex-col">
          <span className="inline-block w-fit rounded bg-brand-yellow px-2 py-0.5 text-[11px] font-bold uppercase text-brand-dark">
            {getCategoryName(product.category)}
          </span>
          <h1 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
            {product.name}
          </h1>
          {product.brand && (
            <p className="mt-1 text-sm text-gray-500">{tr("product.brand")}: {product.brand}</p>
          )}

          {(() => {
            const hasOffer = product.offerPrice != null && product.offerPrice < product.price;
            const shown = hasOffer ? product.offerPrice : product.price;
            const discount = hasOffer ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;
            return (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-black text-brand-red">{formatPrice(shown)}</span>
                {hasOffer && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                    <span className="rounded bg-brand-red px-2 py-0.5 text-xs font-bold text-white">-{discount}%</span>
                  </>
                )}
                <StockBadge inStock={product.inStock} />
              </div>
            );
          })()}

          {/* Free delivery */}
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
            <IconTruck width={16} height={16} /> {tr("product.freeDeliveryFull")}
          </div>

          <p className="mt-5 leading-relaxed text-gray-700">
            {product.description}
          </p>

          {/* Warranty */}
          {product.warranty && (
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm">
              <IconShield width={18} height={18} className="text-brand-red" />
              <span className="font-semibold text-gray-800">{product.warranty}</span>
            </div>
          )}

          {/* Buy actions (desktop — mobile uses the sticky bar below) */}
          <div className="mt-6 hidden gap-3 sm:flex-row md:flex">
            <AddToCartButton product={product} mode="add" className="flex-1" />
            <AddToCartButton product={product} mode="buy" className="flex-1" />
          </div>

          {/* Inquiry */}
          <div className="mt-4">
            <p className="mb-3 text-sm font-semibold text-gray-600">
              {tr("inquiry.prompt")}
            </p>
            <InquiryButtons productName={product.name} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Link href="/products" className="text-sm font-bold text-brand-red hover:underline">
          {tr("product.back")}
        </Link>
      </div>

      {/* Sticky buy bar (mobile) */}
      <ProductBuyBar product={product} />
    </div>
  );
}
