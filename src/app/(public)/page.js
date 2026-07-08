import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, CATEGORIES } from "@/lib/products";
import { SHOP, telLink, whatsappLink } from "@/lib/shop";

// Always fetch fresh so stock changes show up right away
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="brand-gradient absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark">
              {SHOP.location}
            </span>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Power Tools &amp;{" "}
              <span className="text-brand-gradient">Home Appliances</span>
            </h1>
            <p className="mt-4 max-w-md text-gray-300">
              {SHOP.tagline}. Quality drills, grinders, saws, pressure washers,
              air compressors and appliances — all in one trusted local shop.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="brand-gradient rounded-full px-7 py-3 text-center font-bold text-white shadow-lg transition-transform hover:scale-105"
              >
                🛒 Browse Products
              </Link>
              <a
                href={telLink}
                className="rounded-full border-2 border-brand-yellow px-7 py-3 text-center font-bold text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-brand-dark"
              >
                📞 Call {SHOP.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Poster-style price card */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="rotate-2 rounded-2xl border-4 border-brand-yellow bg-black p-6 shadow-2xl">
              <p className="text-center text-xs font-bold uppercase tracking-widest text-brand-yellow">
                Best Value in Waduwa
              </p>
              <p className="mt-2 text-center text-3xl font-black text-white">
                TOOLS THAT
                <br />
                <span className="text-brand-gradient text-4xl">GET IT DONE</span>
              </p>
              <div className="mt-4 rounded-lg bg-brand-yellow py-2 text-center text-sm font-black text-brand-dark">
                CORDED &amp; CORDLESS • IN STOCK NOW
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-black text-gray-900">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-brand-orange hover:shadow-md"
            >
              <span className="text-sm font-bold text-gray-800">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-sm font-bold text-brand-red hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="brand-gradient flex flex-col items-center justify-between gap-4 rounded-2xl px-6 py-8 text-center shadow-lg md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-black text-white">
              Need help choosing the right tool?
            </h2>
            <p className="mt-1 text-white/90">
              Talk to us directly — we&apos;re here to help you buy smart.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={telLink}
              className="rounded-full bg-white px-6 py-3 font-bold text-brand-red shadow hover:bg-gray-100"
            >
              📞 Call Now
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-dark px-6 py-3 font-bold text-white shadow hover:bg-black"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
