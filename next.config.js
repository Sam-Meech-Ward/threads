/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['www.gravatar.com', 'picsum.photos', 'images.clerk.dev', 'cdn.discordapp.com'],
  }
}

module.exports = nextConfig
