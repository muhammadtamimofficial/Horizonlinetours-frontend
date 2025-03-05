import type { NextConfig } from "next";
import withVideos from "next-videos";

const nextConfig: NextConfig = {
  // Custom Webpack configuration
  webpack(config) {
    // Add custom rule for additional video formats if needed
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/i,
      type: "asset/resource",
    });

    return config;
  },

  reactStrictMode: true,
};

export default withVideos(nextConfig);
