// @ts-check

const { withNx } = require('@nx/next');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    // Добавляем NextFederationPlugin в конфигурацию Webpack
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        remotes: {
          microfrontend1: 'microfrontend1@http://localhost:3001/_next/static/chunks/remoteEntry.js',
        },
        shared: {
          react: { singleton: true, eager: true },
          'react-dom': { singleton: true, eager: true },
        },
        extraOptions: {}, // Добавляем extraOptions (пустой объект или конфигурация по умолчанию)
      })
    );
    return config;
  },
};

module.exports = withNx(nextConfig);
