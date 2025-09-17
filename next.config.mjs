/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [320, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
