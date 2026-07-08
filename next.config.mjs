/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Allow larger uploads (product photos from phones can be several MB).
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
