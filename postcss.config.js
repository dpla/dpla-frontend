module.exports = {
  plugins: [
    require("postcss-icss-values"),
    require("postcss-cssnext")(),
    require("postcss-modules")({
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    }),
    require("cssnano")(),
    require("postcss-flexbugs-fixes")
  ]
};
