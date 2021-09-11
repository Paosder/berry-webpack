// common config
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
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
      filename: "index.js",
    },
    resolve: {
      extensions: [".ts", ".js", ".tsx"],
      alias: {},
    },
    entry: {
      main: path.resolve(__dirname, "./src/index.tsx"),
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
    },
  },
};
