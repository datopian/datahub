/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    DMS: process.env.DMS
      ? process.env.DMS.replace(/\/?$/, '')
      : 'https://demo.dev.datopian.com/',
  },
};

module.exports = nextConfig;
