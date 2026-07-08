/* eslint-disable @next/next/no-img-element */
// Shows the real product photo when available, otherwise a branded
// placeholder with the product name. This lets the site look complete
// before you have uploaded photos for every item.
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
      className={`flex h-full w-full flex-col items-center justify-center bg-brand-dark p-4 text-center ${className}`}
    >
      <span className="text-3xl">🛠️</span>
      <span className="mt-2 text-sm font-bold text-brand-yellow">
        {product.name}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">
        Photo coming soon
      </span>
    </div>
  );
}
