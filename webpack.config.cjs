// Local development config
const path = require("path");
const merge = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const common = require("./webpack.config.common.cjs");

module.exports = merge.merge(common.config, {
  plugins: [
    new ESLintPlugin({
      threads: true,
      lintDirtyModulesOnly: true,
      extensions: ["ts", "tsx"],
    }),
  ],
  stats: "minimal",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
      watch: true,
    },
    client: {
      logging: "warn",
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    port: "8083",
    allowedHosts: "auto",
    compress: true,
    host: "0.0.0.0",
    hot: true,
  },
});
