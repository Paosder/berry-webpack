// production(build) config
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.config.common.cjs");

module.exports = merge.merge(common.config, {
  devtool: false,
  plugins: [new CleanWebpackPlugin()],
  stats: "minimal",
});
