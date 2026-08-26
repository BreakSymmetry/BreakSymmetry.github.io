import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep generated pages portable across GitHub Pages and Tencent COS, where
  // the Next.js image-optimization endpoint is not available.
  images: { unoptimized: true },
};

export default nextConfig;
