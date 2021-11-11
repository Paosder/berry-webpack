// Local development config
const path = require("path");
const merge = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const common = require("./webpack.config.common.cjs");
const DllReferencePlugin = require("webpack").DllReferencePlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type { import('webpack').Configuration } */
const config = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "template/index.html",
      lang: "en-US",
    }),
    new ESLintPlugin({
      threads: true,
      lintDirtyModulesOnly: true,
      extensions: ["ts", "tsx"],
    }),
    new ReactRefreshWebpackPlugin(),
    new DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, "dll/manifest.json"),
    }),
  ],
  stats: "minimal",
  devtool: "inline-source-map",
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "public"),
        watch: true,
      },
      {
        directory: path.join(__dirname, "dll"),
        publicPath: "/dll",
      },
    ],
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
