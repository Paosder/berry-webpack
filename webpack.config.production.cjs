// production(build) config
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyPlugin = require("copy-webpack-plugin");
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
      new CopyPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
          },
        ],
      }),
    ],
    stats: "minimal",
  })
);
