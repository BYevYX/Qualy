//@ts-check

const { composePlugins, withNx } = require('@nx/next');

const { AUTH_URL = 'http://localhost:3000' } = process.env;

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  rewrites: async () => [
    {
      source: '/auth',
      destination: `${AUTH_URL}/auth`,
    },
    {
      source: '/auth/:path+',
      destination: `${AUTH_URL}/auth/:path+`,
    },
    {
      source: '/auth-static/_next/:path+',
      destination: `${AUTH_URL}/auth-static/_next/:path+`,
    },
  ],
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
