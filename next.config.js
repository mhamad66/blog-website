const { i18n } = require('./next-i18next.config');

module.exports = {
  images: {
    domains: ['picsum.photos','i.pinimg.com'],
  },
  reactStrictMode: true,
  i18n,
  async rewrites() {
    return [
      {
        source: '/',
        destination: `/${i18n.defaultLocale}`,
      },
      {
        source: '/:path*',
        destination: `/:path*`,
      },
    ];
  },
};
