"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/products";
import { useLang } from "./LanguageProvider";

function VoucherCard({ coupon }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const label =
    coupon.discountType === "percent"
      ? `${coupon.discountValue}% OFF`
      : `${formatPrice(coupon.discountValue)} OFF`;

  function collect() {
    navigator.clipboard?.writeText(coupon.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex w-56 shrink-0 items-stretch overflow-hidden rounded-xl border border-dashed border-brand-orange bg-orange-50">
      {/* left: value */}
      <div className="brand-gradient flex w-20 shrink-0 flex-col items-center justify-center px-2 py-3 text-center text-white">
        <span className="text-sm font-black leading-tight">{label}</span>
      </div>
      {/* right: details + collect */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-2.5">
        <p className="line-clamp-2 text-[11px] font-semibold text-gray-700">
          {coupon.description || `Use code ${coupon.code}`}
        </p>
        <div className="mt-1 flex items-center justify-between gap-1">
          <span className="rounded bg-white px-1.5 py-0.5 text-[11px] font-black tracking-wide text-brand-red">
            {coupon.code}
          </span>
          <button
            onClick={collect}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold text-white ${copied ? "bg-green-600" : "bg-brand-red"}`}
          >
            {copied ? t("voucher.copied") : t("voucher.collect")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VoucherStrip({ coupons }) {
  const { t } = useLang();
  if (!coupons || coupons.length === 0) return null;
  return (
    <section className="mt-4">
      <h2 className="mb-2 text-sm font-black text-gray-900">🎟️ {t("home.vouchers")}</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {coupons.map((c) => (
          <VoucherCard key={c.id} coupon={c} />
        ))}
      </div>
    </section>
  );
}
