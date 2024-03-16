/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    SERVER_URL: 'https://gm-ready.onrender.com',
  },
};

export default nextConfig;
