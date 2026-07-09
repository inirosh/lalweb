"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import { SHOP } from "@/lib/shop";
import { IconChevronRight } from "./icons";
import { useLang } from "./LanguageProvider";

// Shows uploaded hero banners (auto-rotating carousel if more than one).
// Falls back to the default gradient banner when none are uploaded.
export default function HeroBanner({ banners }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const list = banners || [];

  useEffect(() => {
    if (list.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % list.length), 4500);
    return () => clearInterval(t);
  }, [list.length]);

  // ---- Default banner (no uploads yet) ----
  if (list.length === 0) {
    return (
      <section className="mt-3">
        <div className="brand-gradient anim-gradient relative overflow-hidden rounded-2xl px-5 py-5 sm:px-8 sm:py-8">
          <div className="relative z-10 max-w-[62%] sm:max-w-[70%]">
            <span className="inline-block rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {t("banner.official")}
            </span>
            <h1 className="mt-2 text-xl font-black leading-tight text-white sm:text-3xl">
              {t("banner.title")}
            </h1>
            <p className="mt-1 text-xs text-white/90 sm:text-sm">{t("banner.value")} · {SHOP.location}</p>
            <Link href="/products" className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-red shadow sm:text-sm">
              {t("btn.shopNow")} <IconChevronRight width={14} height={14} />
            </Link>
          </div>
          <img
            src="https://nafldzwawqvljotcxspw.supabase.co/storage/v1/object/public/product-images/emtop-cordless-drill-20v.png"
            alt="EMTOP drill"
            className="anim-float pointer-events-none absolute -right-2 bottom-0 top-0 my-auto h-[85%] object-contain drop-shadow-xl"
          />
        </div>
      </section>
    );
  }

  // ---- Uploaded banners ----
  const current = list[index];
  const inner = (
    <div className="relative aspect-[12/5] w-full">
      <img src={current.image} alt={current.title || "Promotion"} className="h-full w-full object-cover" />
      {(current.title || current.subtitle || current.ctaLabel) && (
        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/50 to-transparent p-5 sm:p-8">
          {current.title && <h1 className="max-w-[65%] text-lg font-black text-white sm:text-3xl">{current.title}</h1>}
          {current.subtitle && <p className="mt-1 max-w-[65%] text-xs text-white/90 sm:text-base">{current.subtitle}</p>}
          {current.ctaLabel && (
            <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-red shadow sm:text-sm">
              {current.ctaLabel} <IconChevronRight width={14} height={14} />
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section className="mt-3">
      <div className="relative overflow-hidden rounded-2xl shadow-sm">
        {current.ctaHref ? <Link href={current.ctaHref}>{inner}</Link> : inner}

        {/* Dots */}
        {list.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Banner ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-4 bg-white" : "w-1.5 bg-white/60"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
