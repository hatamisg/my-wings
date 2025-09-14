import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: 'https',
    hostname: 'ik.imagekit.io',
    port: '',
    pathname: '/**',
  },
]

// Dynamically include Supabase storage host from env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
if (supabaseUrl) {
  try {
    const url = new URL(supabaseUrl)
    remotePatterns!.push({
      protocol: 'https',
      hostname: url.hostname,
      port: '',
      pathname: '/storage/v1/object/public/**',
    })
  } catch (e) {
    // ignore invalid URL
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
