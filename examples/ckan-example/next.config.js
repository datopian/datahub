// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
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
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

module.exports = withNx(nextConfig);
