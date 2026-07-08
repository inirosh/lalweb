"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHOP, telLink, whatsappLink } from "@/lib/shop";
import { IconHome, IconGrid, IconWhatsApp, IconPhone } from "./icons";

// Fixed bottom tab bar for mobile (Daraz-style). Hidden on desktop.
export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkCls = (active) =>
    `flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold ${
      active ? "text-brand-red" : "text-gray-500"
    }`;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-gray-200 bg-white/95 backdrop-blur-md md:hidden">
      <Link href="/" className={linkCls(isActive("/"))}>
        <IconHome width={22} height={22} />
        Home
      </Link>
      <Link href="/products" className={linkCls(isActive("/products"))}>
        <IconGrid width={22} height={22} />
        Products
      </Link>
      <a
        href={whatsappLink("Hello Lal Distributors, I have a question.")}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold text-green-600"
      >
        <IconWhatsApp width={22} height={22} />
        WhatsApp
      </a>
      <a
        href={telLink}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold text-gray-500"
        aria-label={`Call ${SHOP.phoneDisplay}`}
      >
        <IconPhone width={22} height={22} />
        Call
      </a>
    </nav>
  );
}
