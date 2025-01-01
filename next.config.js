/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = withNextIntl({
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
});

module.exports = nextConfig;
