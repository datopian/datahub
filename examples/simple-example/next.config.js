// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/@org/:org/:project/:file(\.\+\\\.\.\+\$)",
          destination:
            '/api/proxy?url=https://raw.githubusercontent.com/:org/:project/main/:file',
        },
        {
          source: "/@:org/:project/:file(\.\+\\\.\.\+\$)",
          destination:
            '/api/proxy?url=https://raw.githubusercontent.com/:org/:project/main/:file',
        },
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
    svgr: true,
  },
};

module.exports = withNx(nextConfig);
