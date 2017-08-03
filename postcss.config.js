module.exports = {
  plugins: [
    require("postcss-icss-values"),
    require("postcss-cssnext")(),
    require("postcss-modules")({
      generateScopedName: "[local]-[hash:base64:5]"
    }),
    require("cssnano")()
  ]
};
