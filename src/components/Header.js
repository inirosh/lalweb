"use client";

import Link from "next/link";
import { useState } from "react";
import { SHOP, telLink } from "@/lib/shop";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-dark text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / shop name */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-lg text-xl font-black text-white shadow">
            LD
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-extrabold tracking-wide text-brand-yellow sm:text-base">
              LAL DISTRIBUTORS
            </span>
            <span className="block text-[10px] font-medium text-gray-300 sm:text-xs">
              Tools &amp; Home Appliances
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-gray-200 transition-colors hover:text-brand-yellow"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={telLink}
            className="brand-gradient rounded-full px-4 py-2 text-sm font-bold text-white shadow transition-transform hover:scale-105"
          >
            📞 {SHOP.phoneDisplay}
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="rounded-md p-2 text-brand-yellow md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <nav className="border-t border-white/10 bg-brand-dark-2 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm font-semibold text-gray-200 hover:text-brand-yellow"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={telLink}
              className="brand-gradient my-3 rounded-full px-4 py-2 text-center text-sm font-bold text-white"
            >
              📞 Call {SHOP.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
