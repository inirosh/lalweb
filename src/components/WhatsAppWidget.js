"use client";

import { useState } from "react";
import { SHOP, whatsappLink, telLink } from "@/lib/shop";

// Floating WhatsApp button (bottom-right) that opens a small chat popup.
// Shown on every public page, on both mobile and desktop.
export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
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
              👋 Hi there! How can we help you today? Ask us about any tool, price or availability.
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
              💬 Start WhatsApp Chat
            </a>
            <a
              href={telLink}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              📞 Call {SHOP.phoneDisplay}
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
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.02c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.58-.07.16-.19.67-.78.85-1.05.18-.27.36-.22.61-.13.24.09 1.55.73 1.82.86.27.14.45.2.51.31.07.11.07.63-.17 1.31z" />
          </svg>
        )}
      </button>
    </div>
  );
}
