"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHOP, telLink, whatsappLink } from "@/lib/shop";
import { IconHome, IconGrid, IconCart, IconWhatsApp, IconPhone } from "./icons";
import { useCart } from "./cart/CartProvider";
import { useLang } from "./LanguageProvider";

// Fixed bottom tab bar for mobile (Daraz-style). Hidden on desktop.
export default function MobileNav() {
  const pathname = usePathname();
  const { count } = useCart();
  const { t } = useLang();

  // On a product detail page the sticky buy bar replaces this tab bar.
  if (/^\/products\/.+/.test(pathname)) return null;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkCls = (active) =>
    `relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold ${
      active ? "text-brand-red" : "text-gray-500"
    }`;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-gray-200 bg-white/95 backdrop-blur-md md:hidden">
      <Link href="/" className={linkCls(isActive("/"))}>
        <IconHome width={21} height={21} />
        {t("nav.home")}
      </Link>
      <Link href="/products" className={linkCls(isActive("/products"))}>
        <IconGrid width={21} height={21} />
        {t("nav.products")}
      </Link>
      <Link href="/cart" className={linkCls(isActive("/cart"))}>
        <span className="relative">
          <IconCart width={21} height={21} />
          {count > 0 && (
            <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[9px] font-bold text-white">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </span>
        {t("nav.cart")}
      </Link>
      <a
        href={whatsappLink("Hello Lal Distributors, I have a question.")}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold text-green-600"
      >
        <IconWhatsApp width={21} height={21} />
        {t("nav.whatsapp")}
      </a>
      <a
        href={telLink}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold text-gray-500"
        aria-label={`Call ${SHOP.phoneDisplay}`}
      >
        <IconPhone width={21} height={21} />
        {t("nav.call")}
      </a>
    </nav>
  );
}
