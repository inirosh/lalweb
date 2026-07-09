import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { SHOP } from "@/lib/shop";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about ordering, delivery, payment and warranty at Lal Distributors.",
};

const FAQS = [
  ["How do I place an order?", "Browse products, tap Add to Cart, then Checkout and fill in your name, phone and address. Tap “Order Now via WhatsApp” and send us the message — that’s it. You can also just call or WhatsApp us directly."],
  ["Do you offer Cash on Delivery (COD)?", "Yes. We offer Cash on Delivery island-wide — you pay in cash when your order arrives."],
  ["Is delivery really free?", "Yes, we offer free delivery across Sri Lanka. Very remote areas or heavy items may occasionally need a special arrangement, which we’ll always tell you about first."],
  ["How long does delivery take?", "Usually 1–2 working days for Colombo & suburbs, and 2–5 working days for other areas island-wide."],
  ["Do your products have a warranty?", "Yes — most products carry a manufacturer warranty, shown on each product page. We’re the official EMTOP distributor and supply genuine products."],
  ["How do I claim a warranty or return?", "WhatsApp or call us with your order number. See our Returns & Warranty page for full details."],
  ["Can I pay by card or online?", "At the moment we accept Cash on Delivery. Just order and pay when it arrives."],
  ["Are you an authorised dealer?", "Yes — Lal Distributors is the official EMTOP distributor, and we stock trusted brands like Intimax, Wadfow and more."],
  ["Where are you located?", `We’re based in ${SHOP.location}. You’re welcome to visit or contact us anytime.`],
  ["Is the site available in Sinhala?", "Yes — tap the language button at the top of any page to switch between English and සිංහල."],
];

export default function FaqPage() {
  return (
    <InfoPage title="Frequently Asked Questions" subtitle="Quick answers">
      <div className="space-y-3">
        {FAQS.map(([q, a]) => (
          <details key={q} className="group rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm">
            <summary className="cursor-pointer list-none font-bold text-gray-900 marker:hidden">
              <span className="flex items-center justify-between gap-2">
                {q}
                <span className="text-brand-red transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-2 leading-relaxed text-gray-600">{a}</p>
          </details>
        ))}
      </div>

      <p className="mt-8 text-center text-gray-600">
        Still have a question?{" "}
        <Link href="/contact" className="font-bold text-brand-red hover:underline">Contact us →</Link>
      </p>
    </InfoPage>
  );
}
