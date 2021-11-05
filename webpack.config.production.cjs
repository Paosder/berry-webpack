// production(build) config
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const common = require("./webpack.config.common.cjs");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(
  merge.merge(common.config, {
    devtool: false,
    plugins: [
      new CleanWebpackPlugin(),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: "static",
        reportFilename: "../report/index.html",
      }),
    ],
    stats: "minimal",
  })
);
