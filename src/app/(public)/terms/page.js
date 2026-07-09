import InfoPage from "@/components/InfoPage";
import { SHOP } from "@/lib/shop";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for purchasing from Lal Distributors, Wadduwa.",
};

export default function TermsPage() {
  return (
    <InfoPage title="Terms & Conditions">
      <p>
        Welcome to {SHOP.name}. By using this website and placing an order, you agree to the
        following terms.
      </p>

      <h2>Products &amp; pricing</h2>
      <ul>
        <li>All prices are in Sri Lankan Rupees (රු) and include applicable taxes unless stated otherwise.</li>
        <li>Prices, offers and stock availability may change without prior notice.</li>
        <li>We try to show accurate product details and images, but slight variations may occur.</li>
      </ul>

      <h2>Orders</h2>
      <ul>
        <li>Placing an order is a request to buy; every order is confirmed by us via phone or WhatsApp.</li>
        <li>We may decline or cancel an order if an item is out of stock or details cannot be verified.</li>
        <li>Payment is by <strong>Cash on Delivery</strong>.</li>
      </ul>

      <h2>Delivery</h2>
      <p>
        Delivery timelines are estimates. See our Delivery Information page for details. Please
        inspect your item at the time of delivery.
      </p>

      <h2>Warranty &amp; returns</h2>
      <p>
        Warranty and returns are handled as described on our Returns &amp; Warranty page.
      </p>

      <h2>Contact &amp; governing law</h2>
      <p>
        For any questions, contact us at {SHOP.phoneDisplay} or {SHOP.email}. These terms are
        governed by the laws of Sri Lanka.
      </p>

      <p className="text-sm text-gray-400">Last updated: 2026.</p>
    </InfoPage>
  );
}
