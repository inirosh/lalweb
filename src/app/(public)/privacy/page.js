import InfoPage from "@/components/InfoPage";
import { SHOP } from "@/lib/shop";

export const metadata = {
  title: "Privacy Policy",
  description: "How Lal Distributors collects and uses your information.",
};

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy" subtitle="Your information is safe with us">
      <p>
        {SHOP.name} respects your privacy. This policy explains what information we collect and how
        we use it.
      </p>

      <h2>What we collect</h2>
      <p>When you place an order, we collect only what we need to fulfil it:</p>
      <ul>
        <li>Your name</li>
        <li>Your phone number</li>
        <li>Your delivery address</li>
        <li>The items you ordered</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To process, confirm and deliver your order</li>
        <li>To contact you about your order or arrange delivery</li>
        <li>To provide warranty or after-sales support</li>
      </ul>

      <h2>What we do NOT do</h2>
      <p>
        We do <strong>not</strong> sell or rent your information. We only share your delivery
        details with our delivery partner as needed to bring your order to you.
      </p>

      <h2>Data security</h2>
      <p>
        Your details are stored securely and are accessible only to our team. Website traffic is
        protected with HTTPS encryption.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to update or delete your details at any time — just contact us at{" "}
        {SHOP.phoneDisplay} or {SHOP.email}.
      </p>

      <p className="text-sm text-gray-400">Last updated: 2026.</p>
    </InfoPage>
  );
}
