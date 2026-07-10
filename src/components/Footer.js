import Link from "next/link";
import { SHOP, telLink } from "@/lib/shop";
import { IconPin, IconPhone, IconMail, IconInstagram, IconClock } from "./icons";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export default async function Footer() {
  const lang = await getLang();
  const tr = (k) => t(lang, k);
  return (
    <footer className="mt-16 bg-brand-dark text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        {/* About */}
        <div>
          <h3 className="mb-3 text-lg font-extrabold text-brand-yellow">
            {SHOP.name}
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            {tr("footer.about")}
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            {tr("footer.quickLinks")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-brand-yellow">{tr("nav.home")}</Link></li>
            <li><Link href="/products" className="hover:text-brand-yellow">{tr("nav.products")}</Link></li>
            <li><Link href="/about" className="hover:text-brand-yellow">{tr("nav.about")}</Link></li>
            <li><Link href="/contact" className="hover:text-brand-yellow">{tr("nav.contact")}</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            {tr("footer.help")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/delivery" className="hover:text-brand-yellow">{tr("link.delivery")}</Link></li>
            <li><Link href="/returns" className="hover:text-brand-yellow">{tr("link.returns")}</Link></li>
            <li><Link href="/faq" className="hover:text-brand-yellow">{tr("link.faq")}</Link></li>
            <li><Link href="/terms" className="hover:text-brand-yellow">{tr("link.terms")}</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-yellow">{tr("link.privacy")}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            {tr("footer.contact")}
          </h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li className="flex items-center gap-2.5"><IconPin width={16} height={16} className="shrink-0 text-brand-yellow" /> {SHOP.location}</li>
            <li className="flex items-center gap-2.5"><IconPhone width={16} height={16} className="shrink-0 text-brand-yellow" /> <a href={telLink} className="hover:text-brand-yellow">{SHOP.phoneDisplay}</a></li>
            <li className="flex items-center gap-2.5"><IconMail width={16} height={16} className="shrink-0 text-brand-yellow" /> <a href={`mailto:${SHOP.email}`} className="hover:text-brand-yellow">{SHOP.email}</a></li>
            <li className="flex items-center gap-2.5"><IconInstagram width={16} height={16} className="shrink-0 text-brand-yellow" /> <a href={SHOP.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-brand-yellow">@{SHOP.instagram}</a></li>
            <li className="flex items-center gap-2.5"><IconClock width={16} height={16} className="shrink-0 text-brand-yellow" /> {SHOP.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} {SHOP.name}. {tr("footer.rights")}
        </p>

        {/* Developer credit */}
        <a
          href={SHOP.developerUrl || "#"}
          target="_blank"
          rel="noreferrer"
          className="group mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 transition-colors hover:border-brand-yellow/40 hover:bg-white/10"
        >
          <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
            Designed &amp; Developed by
          </span>
          <span className="shine relative bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-red bg-clip-text text-sm font-black tracking-tight text-transparent">
            Brandcare
          </span>
          <span className="text-brand-yellow transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        <p className="mt-1.5 text-[10px] tracking-wide text-gray-600">
          Websites • Branding • Digital Marketing
        </p>
      </div>
    </footer>
  );
}
