import Link from "next/link";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/products";
import { IconTruck, IconShield } from "./icons";
import AddToCartButton from "./cart/AddToCartButton";

export default function ProductCard({ product }) {
  const hasOffer =
    product.offerPrice != null && product.offerPrice < product.price;
  const shownPrice = hasOffer ? product.offerPrice : product.price;
  const discount = hasOffer
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md">
      {/* Quick add-to-cart (sits above the card link) */}
      {product.inStock && (
        <div className="absolute bottom-2 right-2 z-10">
          <AddToCartButton product={product} mode="icon" />
        </div>
      )}
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 flex-col"
      >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <ProductImage
          product={product}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {hasOffer && (
          <span className="absolute left-0 top-2 rounded-r-md bg-brand-red px-2 py-0.5 text-[11px] font-extrabold text-white shadow">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70 text-sm font-bold text-gray-700">
            Out of Stock
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-2.5">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] leading-tight text-gray-800 group-hover:text-brand-red">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-base font-extrabold text-brand-red">
            {formatPrice(shownPrice)}
          </span>
          {hasOffer && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Free delivery tag */}
        <div className="mt-1.5">
          <span className="inline-flex items-center gap-1 rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
            <IconTruck width={11} height={11} /> Free Delivery
          </span>
        </div>

        {/* Warranty */}
        {product.warranty && product.warranty !== "No Warranty" && (
          <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
            <IconShield width={11} height={11} className="text-brand-red" />
            {product.warranty}
          </div>
        )}
      </div>
      </Link>
    </div>
  );
}
