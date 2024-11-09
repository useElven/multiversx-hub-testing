/** @type {import('next').NextConfig} */

const externals = [
  'pino-pretty',
  'lokijs',
  'encoding',
  {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
];

const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.externals.push(...externals);
    return config;
  },
  eslint: {
    dirs: ['components', 'hooks', 'lib', 'app'],
  },
};

module.exports = nextConfig;
