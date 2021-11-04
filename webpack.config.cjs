// Local development config
const path = require("path");
const merge = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const common = require("./webpack.config.common.cjs");

/** @type { import('webpack').Configuration } */
const config = {
  plugins: [
    new ESLintPlugin({
      threads: true,
      lintDirtyModulesOnly: true,
      extensions: ["ts", "tsx"],
    }),
    new ReactRefreshWebpackPlugin(),
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
};

module.exports = merge.merge(common.config, config);
