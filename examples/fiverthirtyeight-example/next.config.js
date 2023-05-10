/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    github_pat: process.env.GITHUB_PAT ? process.env.GITHUB_PAT : null,
  },
}

module.exports = nextConfig
