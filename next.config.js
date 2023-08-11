const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://www.africau.edu/:path*",
      },
    ];
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /canvas\.node$/, // canvas.node 파일을 처리하는 로더 설정
      use: "raw-loader", // raw-loader나 다른 적절한 로더 사용
    });
    config.module.rules.push({
      test: /pdfjs-dist\/build\/pdf\.worker\.js$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[name].[hash][ext]",
      },
    });
    return config;
  },
};
// module.exports = {
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /canvas\.node$/, // canvas.node 파일을 처리하는 로더 설정
//       use: "raw-loader", // raw-loader나 다른 적절한 로더 사용
//     });

//     return config;
//   },
// };

// module.exports = {
//   reactStrictMode: true,
//   transpilePackages: ['ui'],
//   output: 'export',
//   trailingSlash: true,
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.node/,
//       use: {
//         loader: 'raw-loader',
//       },
//     })

//     return config
//   },
// }
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,

//   async rewrites() {
//     return [
//       {
//         source: "/:path*",
//         destination: "https://www.africau.edu/:path*",
//       },
//     ];
//   },
// };

module.exports = nextConfig;
