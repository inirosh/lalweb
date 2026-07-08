import Link from "next/link";
import { SHOP, telLink } from "@/lib/shop";

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-dark text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-3">
        {/* About */}
        <div>
          <h3 className="mb-3 text-lg font-extrabold text-brand-yellow">
            {SHOP.name}
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            {SHOP.tagline}. Your trusted local shop in {SHOP.location} for power
            tools, pressure washers, air compressors and home appliances.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-brand-yellow">Home</Link></li>
            <li><Link href="/products" className="hover:text-brand-yellow">Products</Link></li>
            <li><Link href="/about" className="hover:text-brand-yellow">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-brand-yellow">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 {SHOP.location}</li>
            <li>📞 <a href={telLink} className="hover:text-brand-yellow">{SHOP.phoneDisplay}</a></li>
            <li>✉️ <a href={`mailto:${SHOP.email}`} className="hover:text-brand-yellow">{SHOP.email}</a></li>
            <li>📷 <a href={SHOP.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-brand-yellow">@{SHOP.instagram}</a></li>
            <li>🕒 {SHOP.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {SHOP.name}. All rights reserved.
      </div>
    </footer>
  );
}
