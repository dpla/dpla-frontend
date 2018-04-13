const webpack = require("webpack");
const dotenv = require("dotenv").config();
const withSass = require("@zeit/next-sass");
const withSourceMaps = require("@zeit/next-source-maps");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = withBundleAnalyzer(
  withSourceMaps(
    withSass({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 2,
        localIdentName: "[name]__[local]___[hash:base64:5]"
      },
      useFileSystemPublicRoutes: false,
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static",
          reportFilename: "../../bundles/server.html"
        },
        browser: {
          analyzerMode: "static",
          reportFilename: "../bundles/client.html"
        }
      },
      webpack: (config, options) => {
        const { dev, isServer } = options;

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
  )
);
