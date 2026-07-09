export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the private admin area out of search engines.
      disallow: ["/admin", "/checkout", "/cart"],
    },
    sitemap: "https://lalweb.vercel.app/sitemap.xml",
  };
}
