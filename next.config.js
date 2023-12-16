/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "gravatar.com" },
    ],
  },
};

module.exports = withPWA(nextConfig);
