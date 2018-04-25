const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv").config();
const withSass = require("@zeit/next-sass");
const withSourceMaps = require("@zeit/next-source-maps");
const autoprefixer = require("autoprefixer");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { LOCALS } = require("./constants/local");

module.exports = withBundleAnalyzer(
  withSourceMaps(
    withSass({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 2,
        localIdentName: "[name]__[local]___[hash:base64:5]"
      },
      sassLoaderOptions: {
        includePaths: [
          // to allow SCSS files to import a plain “theme.scss” file
          "./stylesheets/themes/" + LOCALS[process.env.LOCAL_ID].theme
        ]
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
          new CopyWebpackPlugin([
            {
              from: "node_modules/pdfjs-dist/cmaps/",
              to: "cmaps/"
            }
          ])
        );

        config.plugins.push(
          new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
          })
        );

        config.module.rules.push({
          test: /\.css$/,
          exclude: /node_modules/,
          use: [{ loader: "postcss-loader" }]
        });

        config.module.rules.push({
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: ["file-loader?name=dist/static/images/[name].[ext]"]
        });

        return config;
      }
    })
  )
);
