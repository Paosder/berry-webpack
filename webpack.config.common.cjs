// common config
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const chalk = require("chalk");
const Dotenv = require("dotenv-webpack");
const path = require("path");

const env = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
const mode = /production/g.test(env) ? "production" : "development";

console.clear();
console.log(chalk.bold.bgGrey(`Using ${env}...`));
console.log(
  chalk.grey(`Webpack starts with ${mode} mode...
`)
);

module.exports = {
  env,
  config: {
    mode,
    output: {
      path: path.resolve(__dirname, "./dist"),
    },
    resolve: {
      extensions: [".ts", ".js", ".jsx", ".tsx"],
      alias: {},
    },
    entry: {
      main: path.resolve(__dirname, "./src/index.tsx"),
    },
    module: {
      rules: [
        {
          test: /\.[jt]{1}sx?$/,
          include: [path.resolve(__dirname, "./src")],
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
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    experiments: {
      topLevelAwait: true,
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
      new Dotenv({
        systemvars: true,
        safe: true,
        path: env,
      }),
    ],
    optimization: {
      minimizer: [
        new ESBuildMinifyPlugin({
          target: "es2015",
          css: true,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = (
                process.platform !== "win32"
                  ? module.identifier().split("/")
                  : module.identifier().split("\\")
              )
                .reduceRight((item) => item)
                .split("|")[0]
                .replace(/.(js|css)/g, "");
              const allChunksNames = chunks.map((item) => item.name).join("~");
              return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            },
            chunks: "all",
          },
        },
      },
    },
  },
};
