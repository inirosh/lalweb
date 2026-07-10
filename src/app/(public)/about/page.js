import Link from "next/link";
import { SHOP, telLink } from "@/lib/shop";
import { getAllCategories } from "@/lib/categories";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export const metadata = {
  title: "About Us | Lal Distributors — Wadduwa",
  description:
    "Learn about Lal Distributors & Tools Shop in Wadduwa, Sri Lanka — your trusted local source for power tools and home appliances.",
};

export default async function AboutPage() {
  const [lang, categories] = await Promise.all([getLang(), getAllCategories()]);
  const tr = (k) => t(lang, k);
  return (
    <div>
      {/* Header band */}
      <section className="bg-brand-dark py-14 text-center text-white">
        <h1 className="text-3xl font-black sm:text-4xl">{tr("about.title")}</h1>
        <p className="mt-2 text-brand-yellow">{SHOP.tagline}</p>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-2xl font-black text-gray-900">{SHOP.name}</h2>
        <p className="mt-1 text-sm font-semibold text-gray-500">
          Also known as {SHOP.altName}
        </p>

        <p className="mt-6 leading-relaxed text-gray-700">
          Based in <strong>{SHOP.location}</strong>, Lal Distributors is your
          trusted local shop for power tools, pressure washers, air compressors,
          electric scrapers, cleaning equipment and everyday home appliances. We
          focus on <strong>value for money</strong> — quality tools and
          appliances at honest prices, backed by friendly local service.
        </p>

        <p className="mt-4 leading-relaxed text-gray-700">
          Whether you are a professional tradesperson, a DIY enthusiast or
          setting up your home, we help you choose the right product for the job.
          Just call or message us and we&apos;ll guide you.
        </p>

        {/* What we sell */}
        <h3 className="mt-10 text-lg font-black text-gray-900">{tr("about.whatWeSell")}</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="rounded-lg border border-gray-200 bg-white p-3 text-center text-sm font-semibold text-gray-800 shadow-sm"
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* Why choose us */}
        <h3 className="mt-10 text-lg font-black text-gray-900">{tr("about.whyUs")}</h3>
        <ul className="mt-4 space-y-3">
          {[
            ["🏆", "Trusted local business in Wadduwa"],
            ["💰", "Value-for-money pricing"],
            ["🛡️", "Warranty on eligible products"],
            ["📞", "Friendly advice — just call or WhatsApp us"],
          ].map(([icon, text]) => (
            <li key={text} className="flex items-center gap-3 text-gray-700">
              <span className="text-xl">{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="brand-gradient mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl px-6 py-8 text-center md:flex-row md:text-left">
          <p className="text-lg font-black text-white">
            {tr("about.contactCta")}
          </p>
          <div className="flex gap-3">
            <a href={telLink} className="rounded-full bg-white px-6 py-3 font-bold text-brand-red shadow hover:bg-gray-100">
              📞 Call Us
            </a>
            <Link href="/contact" className="rounded-full bg-brand-dark px-6 py-3 font-bold text-white shadow hover:bg-black">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
