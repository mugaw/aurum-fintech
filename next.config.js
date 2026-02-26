/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/aurum-fintech',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
