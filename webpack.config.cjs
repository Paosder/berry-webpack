const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    alias: {},
  },
  stats: "errors-only",
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: path.resolve(__dirname, "./src/index.tsx"),
  },
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
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "es2015",
            },
          },
        ],
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
        css: true,
      }),
    ],
  },
};
