/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = nextConfig


module.exports = {
    async rewrites() {
      return [
        {
          source: 'http://localhost:3000/api/status',
          destination: 'http://localhost:5000/test',
        },
      ]
    },
  }

const removeImports = require("next-remove-imports")();

module.exports = removeImports({
  experimental: { esmExternals: true }
});