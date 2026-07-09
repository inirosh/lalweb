import InfoPage from "@/components/InfoPage";
import { SHOP, telLink, whatsappLink } from "@/lib/shop";

export const metadata = {
  title: "Delivery Information",
  description: "Island-wide delivery and cash-on-delivery details for Lal Distributors, Wadduwa.",
};

export default function DeliveryPage() {
  return (
    <InfoPage title="Delivery Information" subtitle="Island-wide · Cash on Delivery">
      <h2>Where we deliver</h2>
      <p>
        We deliver <strong>across Sri Lanka</strong> — from Colombo to any town or village.
        Wherever you are, we&apos;ll get your tools and appliances to your door.
      </p>

      <h2>Delivery charges</h2>
      <p>
        <strong>Free delivery</strong> on our products island-wide. For very remote areas or
        unusually heavy/bulky items, we&apos;ll let you know in advance if any special
        arrangement is needed — there are no hidden charges.
      </p>

      <h2>Delivery time</h2>
      <ul>
        <li>Colombo &amp; suburbs: usually <strong>1–2 working days</strong></li>
        <li>Other areas island-wide: usually <strong>2–5 working days</strong></li>
        <li>Remote areas may take a little longer during busy periods</li>
      </ul>

      <h2>Payment — Cash on Delivery</h2>
      <p>
        We offer <strong>Cash on Delivery (COD)</strong> island-wide. You pay in cash when your
        order arrives. Please check your item at the time of delivery.
      </p>

      <h2>How to order</h2>
      <p>
        Add items to your cart and check out, or simply call / WhatsApp us. We confirm every
        order and delivery date directly with you.
      </p>
      <p>
        Questions about a delivery?{" "}
        <a href={whatsappLink("Hello, I have a question about delivery.")} target="_blank" rel="noreferrer">
          WhatsApp us
        </a>{" "}
        or call <a href={telLink}>{SHOP.phoneDisplay}</a>.
      </p>
    </InfoPage>
  );
}
