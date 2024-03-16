/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    SERVER_URL: 'http://localhost:8000',
  },
};

export default nextConfig;
