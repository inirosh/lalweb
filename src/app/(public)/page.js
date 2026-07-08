import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/anim/Reveal";
import WordSwap from "@/components/anim/WordSwap";
import { getFeaturedProducts, CATEGORIES } from "@/lib/products";
import { SHOP, telLink, whatsappLink } from "@/lib/shop";

export const dynamic = "force-dynamic";

const MARQUEE_ITEMS = [
  "EMTOP", "Power Tools", "Intimax", "Pressure Washers", "EMTOP Distributor",
  "Air Compressors", "Lakro", "Home Appliances", "Value for Money", "Warranty Included",
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="dot-grid relative -mt-20 bg-white pb-16 pt-32 md:-mt-24 md:pb-24 md:pt-44">
        {/* soft brand glows */}
        <div className="anim-gradient pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-brand-yellow/40 to-brand-orange/30 blur-3xl" />
        <div className="anim-gradient pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-gradient-to-br from-brand-red/25 to-brand-orange/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
              <span className="pulse-ring inline-block h-2 w-2 rounded-full bg-green-500 text-green-500" />
              Open now · {SHOP.location}
            </span>

            <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-gray-900 sm:text-6xl">
              Quality
              <br />
              <WordSwap
                words={["Power Tools", "Pressure Washers", "Air Compressors", "Appliances"]}
                className="text-brand-gradient"
              />
              <br />
              <span className="serif text-4xl font-normal text-gray-500 sm:text-5xl">
                for every job.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-gray-600">
              {SHOP.tagline}. Your trusted local shop and the{" "}
              <strong className="text-gray-900">official EMTOP distributor</strong> in{" "}
              {SHOP.location}.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="brand-gradient hover-lift inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-center font-bold text-white shadow-lg shadow-brand-red/20"
              >
                🛒 Browse Products
              </Link>
              <a
                href={telLink}
                className="hover-lift inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 px-7 py-3.5 text-center font-bold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
              >
                📞 Call {SHOP.phoneDisplay}
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
              <div>
                <span className="block text-2xl font-black text-gray-900">16K+</span>
                Followers
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <span className="block text-2xl font-black text-gray-900">100%</span>
                Value for money
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <span className="block text-2xl font-black text-gray-900">24/7</span>
                Online
              </div>
            </div>
          </Reveal>

          {/* Poster-style floating visual */}
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="anim-float shine relative rounded-3xl border-4 border-brand-yellow bg-brand-dark p-7 shadow-2xl">
              <p className="text-center text-xs font-bold uppercase tracking-widest text-brand-yellow">
                Best Value in Waduwa
              </p>
              <p className="mt-3 text-center text-4xl font-black leading-none text-white">
                TOOLS THAT
                <br />
                <span className="text-brand-gradient text-5xl">GET IT DONE</span>
              </p>
              <div className="mt-5 rounded-xl bg-brand-yellow py-2 text-center text-sm font-black text-brand-dark">
                CORDED &amp; CORDLESS
              </div>
            </div>
            <div className="anim-float-slow absolute -bottom-5 -left-5 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl">
              <span className="text-xs text-gray-500">Warranty</span>
              <span className="block font-black text-gray-900">Included ✓</span>
            </div>
            <div className="anim-float absolute -right-4 -top-4 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl">
              <span className="text-xs text-gray-500">EMTOP</span>
              <span className="block font-black text-brand-red">Official</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <section className="marquee border-y border-gray-200 bg-gray-900 py-4">
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div key={g} className="flex items-center" aria-hidden={g === 1}>
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} className="flex items-center gap-4 px-6 text-lg font-extrabold tracking-tight text-white">
                  {item}
                  <span className="inline-block h-2 w-2 rounded-full bg-brand-yellow" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="text-3xl font-black tracking-tight text-gray-900">
            Shop by <span className="serif font-normal text-brand-red">category</span>
          </h2>
          <p className="mt-2 text-gray-500">Find exactly what you need for the job.</p>
        </Reveal>
        <Reveal stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              style={{ "--i": i }}
              className="hover-lift group rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm hover:border-brand-orange hover:shadow-lg"
            >
              <span className="text-sm font-bold text-gray-800 group-hover:text-brand-red">
                {cat.name}
              </span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-gray-900">
                Featured <span className="serif font-normal text-brand-red">products</span>
              </h2>
              <p className="mt-2 text-gray-500">Popular picks, in stock now.</p>
            </div>
            <Link href="/products" className="hidden text-sm font-bold text-brand-red hover:underline sm:block">
              View all →
            </Link>
          </Reveal>
          <Reveal stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product, i) => (
              <div key={product.slug} style={{ "--i": i }}>
                <ProductCard product={product} />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="text-3xl font-black tracking-tight text-gray-900">
            Why choose <span className="serif font-normal text-brand-red">us</span>
          </h2>
        </Reveal>
        <Reveal stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["🏆", "Trusted Local Shop", "Serving Waduwa with 16K+ happy followers."],
            ["🔧", "Official EMTOP Distributor", "Genuine tools, sourced directly."],
            ["🛡️", "Warranty Included", "Peace of mind on eligible products."],
            ["💰", "Best Value", "Honest, value-for-money pricing."],
          ].map(([icon, title, desc], i) => (
            <div
              key={title}
              style={{ "--i": i }}
              className="hover-lift rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <span className="text-3xl">{icon}</span>
              <h3 className="mt-3 font-black text-gray-900">{title}</h3>
              <p className="mt-1 text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Reveal>
          <div className="brand-gradient anim-gradient relative overflow-hidden rounded-3xl px-6 py-12 text-center shadow-xl">
            <div className="shine pointer-events-none absolute inset-0" />
            <h2 className="relative text-3xl font-black text-white sm:text-4xl">
              Need help choosing the right tool?
            </h2>
            <p className="relative mx-auto mt-2 max-w-lg text-white/90">
              Talk to us directly — we&apos;re here to help you buy smart.
            </p>
            <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={telLink} className="hover-lift rounded-full bg-white px-7 py-3.5 font-bold text-brand-red shadow">
                📞 Call Now
              </a>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hover-lift rounded-full bg-brand-dark px-7 py-3.5 font-bold text-white shadow">
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
