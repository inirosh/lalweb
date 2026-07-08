// Green "In Stock" or red "Out of Stock" badge.
// (In Phase 2 the inStock value will come live from the database.)
export default function StockBadge({ inStock }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
        inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
      />
      {inStock ? "In Stock" : "Out of Stock"}
    </span>
  );
}
