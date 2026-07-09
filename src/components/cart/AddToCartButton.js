"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { IconCart, IconPlus } from "../icons";

// `product` needs: slug, name, price, offerPrice, image, inStock.
// mode: "add" (full button), "buy" (adds then goes to checkout), "icon" (compact).
export default function AddToCartButton({ product, mode = "add", className = "" }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const outOfStock = product.inStock === false;

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addItem(product, 1);
    if (mode === "buy") {
      router.push("/checkout");
      return;
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  if (mode === "icon") {
    return (
      <button
        onClick={handleAdd}
        disabled={outOfStock}
        aria-label="Add to cart"
        className={`flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md transition-colors disabled:cursor-not-allowed disabled:bg-gray-300 ${
          added ? "bg-green-600" : "brand-gradient"
        } ${className}`}
      >
        <IconPlus width={16} height={16} />
      </button>
    );
  }

  if (mode === "buy") {
    return (
      <button
        onClick={handleAdd}
        disabled={outOfStock}
        className={`brand-gradient flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-white shadow disabled:opacity-50 ${className}`}
      >
        {outOfStock ? "Out of Stock" : "Buy Now"}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      disabled={outOfStock}
      className={`flex items-center justify-center gap-2 rounded-full border-2 border-brand-red px-6 py-3 font-bold text-brand-red transition-colors hover:bg-red-50 disabled:opacity-50 ${className}`}
    >
      <IconCart width={18} height={18} />
      {outOfStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
