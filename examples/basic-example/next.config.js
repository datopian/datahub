/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
    beforeFiles: [
        {
          source: '/datasets/:file*.csv',
          destination: '/:file*.csv',
        },
      ]
    }
  }
}

module.exports = nextConfig
