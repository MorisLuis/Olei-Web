// next.config.js o next.config.ts

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ['oleistorage.blob.core.windows.net', 'm.media-amazon.com'],
  },

  async headers() {
    return [
      {
        source: '/(.*)', // Aplica a todas las rutas
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.oleionline.com',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Accept, Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
