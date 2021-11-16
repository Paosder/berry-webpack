const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");

/** @type { import('webpack').Configuration } */
module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    vendor: ["react", "react-dom", "styled-components"],
  },
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
