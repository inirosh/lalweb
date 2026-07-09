"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { useLang } from "@/components/LanguageProvider";
import { formatPrice } from "@/lib/products";
import { IconPlus, IconMinus, IconTrash, IconTruck, IconCart } from "@/components/icons";

export default function CartPage() {
  const { items, setQty, removeItem, subtotal, loaded } = useCart();
  const { t } = useLang();

  if (loaded && items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <IconCart width={56} height={56} className="mx-auto text-gray-300" />
        <h1 className="mt-4 text-xl font-black text-gray-900">{t("cart.empty")}</h1>
        <p className="mt-1 text-gray-500">{t("cart.emptySub")}</p>
        <Link href="/products" className="brand-gradient mt-6 inline-block rounded-full px-6 py-3 font-bold text-white shadow">
          {t("btn.browse")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-3 py-6 sm:px-4">
      <h1 className="text-2xl font-black text-gray-900">{t("cart.title")}</h1>
      <p className="mt-1 text-sm text-gray-500">{items.length} {t("cart.items")}</p>

      {/* Items */}
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item.slug} className="flex gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-50">
              {item.image ? (
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-300">
                  <IconCart width={24} height={24} />
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <Link href={`/products/${item.slug}`} className="line-clamp-2 text-sm font-semibold text-gray-800 hover:text-brand-red">
                {item.name}
              </Link>
              <span className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-green-700">
                <IconTruck width={12} height={12} /> {t("badge.freeDelivery")}
              </span>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="font-black text-brand-red">{formatPrice(item.price * item.qty)}</span>
                {/* Qty stepper */}
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(item.slug, item.qty - 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100" aria-label="Decrease">
                    <IconMinus width={14} height={14} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">{item.qty}</span>
                  <button onClick={() => setQty(item.slug, item.qty + 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100" aria-label="Increase">
                    <IconPlus width={14} height={14} />
                  </button>
                  <button onClick={() => removeItem(item.slug)} className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600" aria-label="Remove">
                    <IconTrash width={16} height={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t("cart.subtotal")}</span>
          <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-1.5 flex justify-between text-sm">
          <span className="text-gray-600">{t("cart.delivery")}</span>
          <span className="font-bold text-green-600">{t("cart.free")}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-gray-200 pt-3">
          <span className="font-bold text-gray-900">{t("cart.total")}</span>
          <span className="text-xl font-black text-brand-red">{formatPrice(subtotal)}</span>
        </div>
        <Link href="/checkout" className="brand-gradient mt-4 block rounded-full py-3.5 text-center font-bold text-white shadow">
          {t("cart.checkout")}
        </Link>
        <Link href="/products" className="mt-2 block text-center text-sm font-semibold text-gray-500 hover:text-brand-red">
          {t("cart.continue")}
        </Link>
      </div>
    </div>
  );
}
