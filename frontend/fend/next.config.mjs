/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  typescript: {
    ignoreBuildErrors: true,  // Ignore TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true,  // Ignore ESLint errors
  },
};

export default nextConfig;
