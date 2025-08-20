const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "ol",
    "@nextui-org/react",
    "@nextui-org/theme", 
    "@nextui-org/system"
  ],
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  // Configuraciones optimizadas para cache estable
  reactStrictMode: true,
  swcMinify: true,
  // REMOVIDO: generateBuildId dinámico que causa problemas de cache
  webpack: (config, { isServer, dev }) => {
    // Solo aplicar configuraciones específicas en desarrollo
    if (dev) {
      // Configuración específica para NextUI en desarrollo
      config.resolve.alias = {
        ...config.resolve.alias,
        '@nextui-org/react': path.resolve(__dirname, 'node_modules/@nextui-org/react'),
        '@nextui-org/system': path.resolve(__dirname, 'node_modules/@nextui-org/system'),
        '@nextui-org/theme': path.resolve(__dirname, 'node_modules/@nextui-org/theme'),
      };

      // Evitar problemas de transpilación con NextUI
      config.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });
    }

    // Configuración de Cesium (aplicada siempre)
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: path.resolve(__dirname, 'public/Cesium'),
      use: 'ignore-loader',
    });

    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(__dirname, 'node_modules/cesium/Build/Cesium'),
              to: path.join(__dirname, 'public/Cesium'),
            },
          ],
        })
      );
    }

    return config;
  },
};

// module.exports = nextConfig;
module.exports.experimental = nextConfig.experimental