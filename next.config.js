const fs = require("fs");
const trash = require("trash");
const webpack = require("webpack");
const dotenv = require("dotenv").config();
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ANALYZE } = process.env;
const withSass = require("@zeit/next-sass");

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
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

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: "emit-file-loader",
          options: {
            name: "dist/[path][name].[ext]"
          }
        },
        {
          loader: "skeleton-loader",
          options: {
            procedure: function(content) {
              const fileName = `${this._module.userRequest}.json`;
              const classNames = fs.readFileSync(fileName, "utf8");

              trash(fileName);

              return [
                "module.exports = {",
                `classNames: ${classNames},`,
                `stylesheet: `,
                JSON.stringify(content),
                "}"
              ].join("");
            }
          }
        },
        "postcss-loader"
      ]
    });

    return config;
  }
});
