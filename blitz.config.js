const { sessionMiddleware, unstable_simpleRolesIsAuthorized } = require('@blitzjs/server');
const withTM = require('next-transpile-modules')(['ol']); // pass the modules you would like to see transpiled

module.exports = withTM({
  middleware: [
    sessionMiddleware({
      unstable_isAuthorized: unstable_simpleRolesIsAuthorized,
    }),
  ],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
