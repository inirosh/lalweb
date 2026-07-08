/* eslint-disable @next/next/no-img-element */
import { IconTruck } from "./icons";

// Shows the real product photo when available, otherwise a clean branded
// placeholder. This lets the site look complete before every item has a photo.
export default function ProductImage({ product, className = "" }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-50 to-gray-100 p-3 text-center ${className}`}
    >
      <IconTruck width={30} height={30} className="text-gray-300" />
      <span className="line-clamp-2 text-[11px] font-semibold text-gray-400">
        {product.name}
      </span>
    </div>
  );
}
