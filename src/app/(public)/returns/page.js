import InfoPage from "@/components/InfoPage";
import { SHOP, telLink, whatsappLink } from "@/lib/shop";

export const metadata = {
  title: "Returns & Warranty",
  description: "Warranty, returns and replacement policy for Lal Distributors, Wadduwa.",
};

export default function ReturnsPage() {
  return (
    <InfoPage title="Returns & Warranty" subtitle="Buy with confidence">
      <h2>Warranty</h2>
      <p>
        Most of our products carry a <strong>manufacturer warranty</strong> — the exact period
        (for example 6 months or 1 year) is shown on each product page. As the{" "}
        <strong>official EMTOP distributor</strong>, we supply genuine products and honest warranty
        service.
      </p>
      <p>The warranty covers manufacturing defects. It does <strong>not</strong> cover:</p>
      <ul>
        <li>Normal wear and tear, or consumable parts (blades, brushes, bits, etc.)</li>
        <li>Damage from misuse, overloading, dropping, or unauthorised repair</li>
        <li>Damage from incorrect voltage or water where not designed for it</li>
      </ul>

      <h2>How to claim warranty</h2>
      <p>
        Contact us on <a href={whatsappLink("Hello, I would like to make a warranty claim.")} target="_blank" rel="noreferrer">WhatsApp</a>{" "}
        or call <a href={telLink}>{SHOP.phoneDisplay}</a> with your <strong>order number</strong> and
        a description (photos/video help). We&apos;ll guide you through inspection and repair or
        replacement.
      </p>

      <h2>Damaged or wrong item</h2>
      <p>
        Please check your item at the time of delivery. If it arrives <strong>damaged</strong> or
        it&apos;s the <strong>wrong item</strong>, contact us within <strong>3 days</strong> of
        delivery with photos and we&apos;ll arrange a replacement or refund at no cost to you.
      </p>

      <h2>Change-of-mind returns</h2>
      <p>
        If you change your mind, you may return an <strong>unused item in its original packaging
        within 7 days</strong>. Return delivery is arranged with us. Items that have been used,
        installed, or damaged cannot be returned for change of mind.
      </p>

      <p>
        Need help? <a href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp us</a> — we&apos;re happy to sort it out.
      </p>
    </InfoPage>
  );
}
