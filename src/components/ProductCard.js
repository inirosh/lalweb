import Link from "next/link";
import ProductImage from "./ProductImage";
import StockBadge from "./StockBadge";
import { formatPrice, getCategoryName } from "@/lib/products";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden">
        <ProductImage product={product} className="transition-transform duration-300 group-hover:scale-105" />
        <span className="absolute left-2 top-2 rounded bg-brand-yellow px-2 py-0.5 text-[10px] font-bold uppercase text-brand-dark">
          {getCategoryName(product.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-gray-900 group-hover:text-brand-red">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-brand-red">
              {formatPrice(product.price)}
            </span>
            <StockBadge inStock={product.inStock} />
          </div>
        </div>
      </div>
    </Link>
  );
}
