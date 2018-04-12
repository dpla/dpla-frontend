const webpack = require("webpack");
const dotenv = require("dotenv").config();
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ANALYZE } = process.env;
const withSass = require("@zeit/next-sass");
const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 2,
      localIdentName: "[name]__[local]___[hash:base64:5]"
    },
    useFileSystemPublicRoutes: false,
    webpack: (config, options) => {
      const { dev, isServer } = options;
      if (ANALYZE) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerPort: 8888,
            openAnalyzer: true
          })
        );
      }

      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          }
        })
      );

      config.module.rules.push({
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ["file-loader?name=dist/static/images/[name].[ext]"]
      });

      return config;
    }
  })
);
