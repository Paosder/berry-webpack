// production(build) config
const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyPlugin = require("copy-webpack-plugin");
const common = require("./webpack.config.common.cjs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge.merge(common.config, {
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: "template/index.html",
      lang: "en-US",
      filename: "../index.html",
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: "static",
      reportFilename: "../../report/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: "../",
        },
      ],
    }),
  ],
  stats: "minimal",
});
