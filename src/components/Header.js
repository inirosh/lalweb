"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SHOP, telLink } from "@/lib/shop";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3">
      <div
        className={`pointer-events-auto mx-auto flex max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 ${
          scrolled
            ? "border-gray-200 bg-white/85 shadow-lg backdrop-blur-xl"
            : "border-transparent bg-white/70 backdrop-blur-md"
        }`}
      >
        {/* Logo / shop name */}
        <Link href="/" className="flex items-center gap-2.5 pl-1" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="Lal Distributors logo"
            className="h-10 w-10 rounded-xl object-cover shadow ring-1 ring-brand-yellow/50"
          />
          <span className="leading-tight">
            <span className="block text-sm font-extrabold tracking-tight text-gray-900">
              LAL DISTRIBUTORS
            </span>
            <span className="block text-[10px] font-semibold text-brand-red">
              Tools &amp; Home Appliances
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telLink}
            className="brand-gradient hidden rounded-full px-4 py-2 text-sm font-bold text-white shadow transition-transform hover:scale-105 sm:inline-flex"
          >
            📞 {SHOP.phoneDisplay}
          </a>

          {/* Mobile menu button */}
          <button
            className="rounded-full border border-gray-200 p-2 text-gray-800 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-5xl rounded-3xl border border-gray-200 bg-white/95 p-2 shadow-xl backdrop-blur-xl md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
          <a href={telLink} className="brand-gradient mt-1 block rounded-2xl px-4 py-3 text-center text-sm font-bold text-white">
            📞 Call {SHOP.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  );
}
