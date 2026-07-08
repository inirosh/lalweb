"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SHOP, telLink } from "@/lib/shop";
import { IconSearch, IconPhone, IconMenu, IconClose } from "./icons";

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

  // Close the mobile drawer whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  const Logo = ({ size = "h-9 w-9" }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.jpg"
      alt="Lal Distributors logo"
      className={`${size} rounded-xl object-cover shadow ring-1 ring-brand-yellow/50`}
    />
  );

  return (
    <>
      {/* ============ MOBILE HEADER (Daraz-style solid bar) ============ */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white shadow-sm md:hidden">
        <div className="flex items-center gap-2 px-3 py-2">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
          <form action="/products" className="flex flex-1 items-center rounded-full border border-gray-200 bg-gray-50 pl-3">
            <IconSearch width={18} height={18} className="text-gray-400" />
            <input
              type="search"
              name="q"
              placeholder="Search tools & appliances"
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-gray-900 outline-none"
            />
            <button type="submit" className="brand-gradient m-0.5 rounded-full px-3 py-1.5 text-xs font-bold text-white">
              Search
            </button>
          </form>
          <button
            className="rounded-lg p-1.5 text-gray-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <IconClose width={24} height={24} /> : <IconMenu width={24} height={24} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-gray-100 bg-white px-2 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ============ DESKTOP HEADER (floating pill) ============ */}
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 hidden px-3 md:block">
        <div
          className={`pointer-events-auto mx-auto flex max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 ${
            scrolled
              ? "border-gray-200 bg-white/85 shadow-lg backdrop-blur-xl"
              : "border-transparent bg-white/70 backdrop-blur-md"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 pl-1">
            <Logo size="h-10 w-10" />
            <span className="leading-tight">
              <span className="block text-sm font-extrabold tracking-tight text-gray-900">
                LAL DISTRIBUTORS
              </span>
              <span className="block text-[10px] font-semibold text-brand-red">
                Tools &amp; Home Appliances
              </span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
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

          <a
            href={telLink}
            className="brand-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white shadow transition-transform hover:scale-105"
          >
            <IconPhone width={16} height={16} /> {SHOP.phoneDisplay}
          </a>
        </div>
      </header>
    </>
  );
}
