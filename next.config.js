module.exports = {
  target: "serverless",
  future: {
    webpack5: true
  },
  webpack: (config, { isServer }) => {
    config.experiments = { topLevelAwait: true, layers: true};
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
