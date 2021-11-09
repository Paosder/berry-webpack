const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/** @type { import('webpack').Configuration } */
module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    vendor: ["react", "react-dom", "styled-components"],
  },
  output: {
    path: path.resolve(__dirname, "public/dll"),
    filename: "index.js",
    library: "vendor_lib",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: "vendor_lib",
      path: path.resolve(__dirname, "public/dll/manifest.json"),
      format: true,
    }),
  ],
  stats: "minimal",
};
