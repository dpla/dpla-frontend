const fs = require("fs");
const trash = require("trash");
const webpack = require("webpack");
const dotenv = require("dotenv").config();

module.exports = {
  webpack: config => {
    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== "UglifyJsPlugin"
    );

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.SITE_ENV": JSON.stringify("hello") //JSON.stringify(process.env.GRAPHQL_URL)
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
