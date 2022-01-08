const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");
const package = require("./package.json");
const localDll = require("./local-dll.cjs");
const common = require("./webpack.config.common.cjs");

/** @type { import('webpack').Configuration } */
module.exports = {
  mode: common.config.mode,
  devtool: "source-map",
  entry: {
    vendor: Object.keys(package.dependencies).concat(Object.keys(localDll)),
  },
  module: common.config.module,
  output: {
    path: path.resolve(__dirname, "dll"),
    filename: "index.js",
    library: "vendor_lib",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: "vendor_lib",
      path: path.resolve(__dirname, "dll/manifest.json"),
      format: true,
    }),
    new WebpackBar(),
  ],
  stats: "minimal",
};
