/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
