"use client";

import { SHOP, telLink, whatsappLink } from "@/lib/shop";
import { useLang } from "./LanguageProvider";
import { IconWhatsApp, IconPhone } from "./icons";

// Call + WhatsApp buttons. Optionally pass a product name so the WhatsApp
// message is pre-filled with what the customer is asking about.
export default function InquiryButtons({ productName }) {
  const { t } = useLang();
  const message = productName
    ? `Hello ${SHOP.name}, I am interested in "${productName}". Please share details.`
    : `Hello ${SHOP.name}, I would like to make an inquiry.`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 font-bold text-white shadow transition-transform hover:scale-105"
      >
        <IconWhatsApp width={18} height={18} /> {t("product.whatsappInquiry")}
      </a>
      <a
        href={telLink}
        className="brand-gradient flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-white shadow transition-transform hover:scale-105"
      >
        <IconPhone width={18} height={18} /> {t("nav.call")} {SHOP.phoneDisplay}
      </a>
    </div>
  );
}
