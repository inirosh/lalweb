"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { IconTruck } from "./icons";

// Daraz-style gallery: one big image + a row of thumbnails to switch.
export default function ProductGallery({ images, name }) {
  const list = (images || []).filter(Boolean);
  const [active, setActive] = useState(0);

  if (list.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-300">
        <IconTruck width={48} height={48} />
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
        <img src={list[active]} alt={name} className="h-full w-full object-contain" />
      </div>

      {list.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {list.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white ${
                i === active ? "border-brand-red" : "border-gray-200"
              }`}
              aria-label={`Photo ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
