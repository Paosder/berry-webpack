// common config
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const chalk = require("chalk");
const Dotenv = require("dotenv-webpack");
const ProgressPlugin = require("webpack").ProgressPlugin;
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
  /** @type { import('webpack').Configuration } */
  config: {
    mode,
    output: {
      path: path.resolve(__dirname, "./dist"),
    },
    cache: {
      type: "filesystem",
      cacheDirectory: path.resolve(__dirname, "./.webpack_cache"),
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
              loader: "swc-loader",
              options: {
                jsc: {
                  parser: {
                    syntax: "typescript",
                    tsx: true,
                  },
                  transform: {
                    react: {
                      runtime: "automatic",
                      development: mode === "development",
                      refresh: mode === "development" ? true : false,
                    },
                  },
                  target: "es2015",
                  loose: false,
                  externalHelpers: false,
                  keepClassNames: false,
                },
                sourceMaps: true,
                env: {
                  coreJs: 3,
                },
                module: {
                  type: "es6",
                  noInterop: true,
                },
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
        lang: "en-US",
      }),
      mode === "development" &&
        new HtmlWebpackTagsPlugin({ tags: ["dll/index.js"], append: false }),
      mode === "development" && new ProgressPlugin({}),
      new Dotenv({
        systemvars: true,
        safe: true,
        path: env,
      }),
    ].filter((p) => p),
    optimization: {
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.swcMinify,
          terserOptions: {
            compress: {
              dead_code: true,
              ecma: "2015",
            },
          },
        }),
      ],
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendors: {
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
              return `${cacheGroupKey}-${moduleFileName}`;
            },
            chunks: "all",
            reuseExistingChunk: true,
            priority: 10,
            idHint: "vendors",
            enforce: true,
          },
          default: {
            chunks: "all",
            maxSize: 40960,
            minChunks: 1,
            reuseExistingChunk: true,
            name: "main",
          },
        },
      },
    },
  },
};
