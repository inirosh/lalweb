"use client";

import { SHOP, whatsappLink } from "@/lib/shop";
import { formatPrice } from "@/lib/products";
import { IconWhatsApp } from "./icons";
import AddToCartButton from "./cart/AddToCartButton";

// Sticky bottom action bar shown on the product page (mobile only), like Daraz.
export default function ProductBuyBar({ product }) {
  const hasOffer = product.offerPrice != null && product.offerPrice < product.price;
  const shown = hasOffer ? product.offerPrice : product.price;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden">
      <a
        href={whatsappLink(`Hello ${SHOP.name}, I'm interested in "${product.name}".`)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-gray-200 text-green-600"
      >
        <IconWhatsApp width={22} height={22} />
      </a>
      <div className="mr-1 shrink-0 leading-none">
        <span className="block text-base font-black text-brand-red">{formatPrice(shown)}</span>
      </div>
      <AddToCartButton product={product} mode="add" className="flex-1 !px-2 !py-2.5 text-sm" />
      <AddToCartButton product={product} mode="buy" className="flex-1 !px-2 !py-2.5 text-sm" />
    </div>
  );
}
