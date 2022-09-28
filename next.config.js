/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crafatar.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  env: {
    MAX_LEVEL: 50
  }
}

module.exports = nextConfig
