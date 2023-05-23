const nextConfig = {
  publicRuntimeConfig: {
    DMS: process.env.DMS ? process.env.DMS : '',
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/@:org/:project*',
          destination: '/@org/:org/:project*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
