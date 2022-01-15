// common config
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ansis = require("ansis");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const WebpackBar = require("webpackbar");
const tsconfig = require("./tsconfig.json");

const getAliasFromTSconfig = () => {
  if (tsconfig.compilerOptions && tsconfig.compilerOptions.paths) {
    return Object.keys(tsconfig.compilerOptions.paths).reduce(
      (alias, aliasPath) => {
        const escapedPath = aliasPath.replace(/\/\*/g, "");
        alias[escapedPath] = [
          path.resolve(
            __dirname,
            tsconfig.compilerOptions.paths[aliasPath][0].replace(/\/\*/g, "")
          ),
        ];
        return alias;
      },
      {}
    );
  }
  return {};
};

const env = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
const mode = /production/g.test(env) ? "production" : "development";

console.clear();
console.log(ansis.bold(`Using ${env}...`));
console.log(
  ansis.gray(`Webpack starts with ${mode} mode...
`)
);

module.exports = {
  env,
  /** @type { import('webpack').Configuration } */
  config: {
    mode,
    output: {
      path: path.resolve(__dirname, "./dist/js"),
    },
    cache: {
      type: "filesystem",
      cacheDirectory: path.resolve(__dirname, "./.webpack_cache"),
    },
    resolve: {
      extensions: [".ts", ".js", ".jsx", ".tsx"],
      alias: getAliasFromTSconfig(),
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
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    experiments: {
      topLevelAwait: true,
    },
    plugins: [
      mode === "development" &&
        new HtmlWebpackTagsPlugin({ tags: ["dll/index.js"], append: false }),
      new Dotenv({
        systemvars: true,
        safe: true,
        path: env,
      }),
      new WebpackBar({
        reporters: [mode !== "development" ? "profile" : "fancy"],
        profile: mode !== "development",
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
