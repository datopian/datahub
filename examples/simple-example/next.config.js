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
          source: '/@:org/:project*',
          destination: '/@org/:org/:project*',
        },
      ],
    };
  },
  serverRuntimeConfig: {
    github_pat: process.env.GITHUB_PAT ? process.env.GITHUB_PAT : null,
    project_name: process.env.PROJECT_NAME ? process.env.PROJECT_NAME : 'simple-example'  
  }, 
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
};

module.exports = withNx(nextConfig);
