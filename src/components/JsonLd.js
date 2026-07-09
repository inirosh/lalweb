// Renders SEO structured data (JSON-LD) so Google understands the shop
// and products (rich results in search).
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
