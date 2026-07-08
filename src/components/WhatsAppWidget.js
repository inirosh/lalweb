"use client";

import { useState } from "react";
import { SHOP, whatsappLink, telLink } from "@/lib/shop";
import { IconWhatsApp, IconPhone, IconClose } from "./icons";

// Floating WhatsApp button (bottom-right) that opens a small chat popup.
// Shown on every public page, on both mobile and desktop.
export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden flex-col items-end gap-3 md:flex">
      {/* Popup card */}
      {open && (
        <div className="w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 bg-green-600 px-4 py-3 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-white/40" />
            <div className="leading-tight">
              <p className="text-sm font-bold">{SHOP.name}</p>
              <p className="flex items-center gap-1 text-[11px] text-green-100">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-300" />
                Typically replies instantly
              </p>
            </div>
          </div>

          {/* Message bubble */}
          <div className="bg-[#e5ddd5] px-4 py-5">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-gray-700 shadow">
              Hi there! How can we help you today? Ask us about any tool, price or availability.
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 p-3">
            <a
              href={whatsappLink("Hello Lal Distributors, I have a question.")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-green-700"
            >
              <IconWhatsApp width={18} height={18} /> Start WhatsApp Chat
            </a>
            <a
              href={telLink}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              <IconPhone width={16} height={16} /> Call {SHOP.phoneDisplay}
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat on WhatsApp"
        className="hover-lift flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-xl shadow-green-600/30"
      >
        {open ? <IconClose width={24} height={24} /> : <IconWhatsApp width={30} height={30} />}
      </button>
    </div>
  );
}
