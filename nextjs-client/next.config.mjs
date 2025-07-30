/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Import 'path' module for resolving absolute paths
    const path = require('path');

    // Add or extend the resolve.alias configuration
    config.resolve.alias = {
      ...config.resolve.alias, // Keep existing aliases if any
      '@/': path.resolve(__dirname, './'), // Map '@/' to your project's root directory
    };

    // Return the modified config
    return config;
  },
};

export default nextConfig;