const fs = require("fs");
const trash = require("trash");
const dotenv = require("dotenv").config();
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ANALYZE } = process.env;

module.exports = {
  useFileSystemPublicRoutes: false,
  webpack: config => {
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: 8888,
          openAnalyzer: true
        })
      );
    }

    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== "UglifyJsPlugin"
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
                `stylesheet: \`${content}\``,
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
};
