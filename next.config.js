/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ]
  },
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    // Workaround for the following issue:
    // https://github.com/aws-amplify/amplify-js/issues/11030#issuecomment-1598207365

    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === "nodejs")
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ }),
        new webpack.IgnorePlugin({
          resourceRegExp: /^@aws-sdk\/signature-v4-crt$/,
        })
      );
    return config;
  },
};

module.exports = nextConfig;
