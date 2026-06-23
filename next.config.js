/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: 'export', // ভার্সেল স্ট্যাটিক হোস্টিংয়ের জন্য
};

module.exports = nextConfig;