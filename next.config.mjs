/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't leak the framework version in response headers.
  poweredByHeader: false,

  experimental: {
    // Allow larger uploads (product photos from phones can be several MB).
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // Security headers applied to every response.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stop the browser guessing content types (blocks some attacks).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Prevent other sites from embedding ours in an iframe (clickjacking).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Limit how much referrer info is shared with other sites.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Disable powerful browser features the site doesn't use.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // Force HTTPS for 2 years (Vercel serves HTTPS already).
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
