import { SHOP, telLink, whatsappLink } from "@/lib/shop";

export const metadata = {
  title: "Contact | Lal Distributors — Wadduwa",
  description:
    "Contact Lal Distributors in Wadduwa, Sri Lanka. Call 071 247 3281, email or find us on the map.",
};

export default function ContactPage() {
  const contactItems = [
    { icon: "📞", label: "Phone", value: SHOP.phoneDisplay, href: telLink },
    { icon: "✉️", label: "Email", value: SHOP.email, href: `mailto:${SHOP.email}` },
    { icon: "📷", label: "Instagram", value: `@${SHOP.instagram}`, href: SHOP.instagramUrl },
    { icon: "📍", label: "Location", value: SHOP.location, href: null },
    { icon: "🕒", label: "Hours", value: SHOP.hours, href: null },
  ];

  return (
    <div>
      {/* Header band */}
      <section className="bg-brand-dark py-14 text-center text-white">
        <h1 className="text-3xl font-black sm:text-4xl">Contact Us</h1>
        <p className="mt-2 text-brand-yellow">We&apos;re here to help</p>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact details */}
          <div>
            <h2 className="text-2xl font-black text-gray-900">Get in Touch</h2>
            <p className="mt-2 text-gray-600">
              Call or message us anytime — we&apos;re online 24/7.
            </p>

            <ul className="mt-6 space-y-4">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="font-semibold text-gray-800 hover:text-brand-red"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-gray-800">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Quick action buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={telLink}
                className="brand-gradient flex-1 rounded-full px-6 py-3 text-center font-bold text-white shadow hover:scale-105"
              >
                📞 Call Now
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full bg-green-600 px-6 py-3 text-center font-bold text-white shadow hover:scale-105"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-2xl font-black text-gray-900">Find Us</h2>
            <p className="mt-2 text-gray-600">{SHOP.location}</p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 shadow">
              <iframe
                title="Lal Distributors location — Wadduwa"
                src="https://www.google.com/maps?q=Wadduwa,+Sri+Lanka&output=embed"
                className="h-72 w-full md:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Wadduwa,+Sri+Lanka"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-bold text-brand-red hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
