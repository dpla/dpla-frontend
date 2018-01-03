const fs = require("fs");
const trash = require("trash");
const dotenv = require("dotenv").config();

// append env value to site.js
// this file is supposedly only run once at build
if (dotenv.error) {
  throw dotenv.error;
} else {
  const envFile = "./constants/env.js";
  fs.writeFile(
    envFile,
    `export const SITE_ENV = "${process.env.SITE_ENV}";\n`,
    "utf8",
    err => {
      if (err) throw err;
      console.log("site environment appended to " + envFile);
    }
  );
}

module.exports = {
  webpack: config => {
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
