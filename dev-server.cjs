const ansis = require("ansis");
const path = require("path");
const fs = require("fs");
const packages = require("./package.json").dependencies;
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

/** @type { import('webpack').Configuration } */
const vendorConfig = require("./webpack.config.vendor.cjs");
/** @type { import('webpack').Configuration } */
const devConfig = require("./webpack.config.cjs");
/** @type string[] */
const vendors = vendorConfig.entry.vendor;

// CONSTANTS
// ---------------------------------------------------------------
const UNKNOWN_VENDOR_ERROR = "ENODEPS";
const DLL_PATH = "./dll";
const DLL_JSON = "version.json";
const DLL_JSON_PATH = path.join(__dirname, DLL_PATH, DLL_JSON);
const localDllList = require("./local-dll.cjs");
// ---------------------------------------------------------------

const generateDLL = (resolve, reject) => {
  console.log(ansis.green(`⏳ Generating DLL...`));

  const compiler = webpack(vendorConfig);
  compiler.run((e) => {
    if (e) {
      console.log(ansis.red(`${e}`));
      reject(e);
    } else {
      let lastDepsName = "";
      try {
        const newVersion = vendors.reduce((vendorCandidates, vendor) => {
          lastDepsName = vendor;
          if (localDllList[vendor]) {
            const nextVersion =
              typeof localDllList[vendor] === "string"
                ? localDllList[vendor]
                : localDllList[vendor]();
            vendorCandidates[vendor] = nextVersion;
          } else {
            console.log(`${vendor}: ${packages[vendor]}`);
            vendorCandidates[vendor] = packages[vendor].replace(/[\^~]/, ""); // ! error can occurs in here when user puts wrong name of deps.
          }
          return vendorCandidates;
        }, {});
        fs.mkdirSync(path.join(__dirname, DLL_PATH), {
          recursive: true,
        });
        fs.writeFileSync(DLL_JSON_PATH, JSON.stringify(newVersion, null, "\t"));
        console.log("");
        console.log(ansis.green(`[DLL] Generated successfully.`));
        console.log(ansis.green(`[DLL] 🚀 Ready to Launch! 🚀`));
        resolve();
      } catch (err) {
        if (err instanceof Error) {
          console.log(ansis.red(`[DLL] 🚨 Write Error! ${err.message}`));
          if (
            err.message.includes("Cannot read property 'replace' of undefined")
          ) {
            // Seems wrong name error.
            console.log(
              ansis.yellow(
                `[DLL] Seems you put wrong deps name: "${lastDepsName}"`
              )
            );
          }
        }
        reject(err);
      }
    }
    compiler.close(() => {
      console.log(ansis.gray(`[DLL] Compiler Closed.`));
    });
  });
};

/** @return Promise */
const bootstrap = () => {
  return new Promise((resolve, reject) => {
    let lastDepsName = "";
    try {
      const versionInfos = JSON.parse(
        fs.readFileSync(DLL_JSON_PATH).toString("utf-8")
      );
      if (vendors.length !== Object.keys(versionInfos).length) {
        console.log(ansis.green(`[DLL] Deps length changed. Refresh...`));
        return generateDLL(resolve, reject);
      }
      if (
        vendors.every((vendor) => {
          lastDepsName = vendor;
          let currentVersion;
          if (localDllList[vendor]) {
            // local dll.
            currentVersion =
              typeof localDllList[vendor] === "string"
                ? localDllList[vendor]
                : localDllList[vendor]();
          } else {
            // external package.
            currentVersion = packages[vendor].replace(/[\^~]/, ""); // ! error can occurs in here when user puts wrong name of deps.
          }
          const cacheVersion = versionInfos[vendor];

          if (!currentVersion) {
            // unknown vendor. Seems typo issue.
            const unknownVendorError = new Error(
              `Cannot find Deps: "${vendor}"`
            );
            unknownVendorError.name = UNKNOWN_VENDOR_ERROR;
            throw unknownVendorError;
          } else if (!cacheVersion) {
            // no cache found.
            return false;
          } else if (cacheVersion !== currentVersion) {
            // outdated.
            return false;
          }
          return true;
        })
      ) {
        console.log(ansis.green(`[DLL] Already up to date.`));
        resolve();
      } else {
        console.log(ansis.green(`[DLL] Refresh...`));
        return generateDLL(resolve, reject);
      }
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes("ENOENT")) {
          // version file not found when first init.
          console.log(ansis.green(`[DLL] Init...`));
          return generateDLL(resolve, reject);
        }
        console.log(ansis.red(`[DLL] Bootstrap Failed! ${e.message}`));
        if (e.name === UNKNOWN_VENDOR_ERROR) {
          // unknown deps.
          console.log(ansis.red(`[DLL] Please check vendor names.`));
        } else if (
          e.message.includes("Cannot read property 'replace' of undefined")
        ) {
          // Seems wrong name error.
          console.log(
            ansis.yellow(
              `[DLL] Seems you put wrong deps name: "${lastDepsName}"`
            )
          );
        } else {
          // unknown error.
          console.log(ansis.red`Unknown Bootstrap Error! Please report!`);
        }
        reject(e);
      }
    }
  });
};

bootstrap()
  .then(() => {
    const devCompiler = webpack(devConfig);
    const devServerOptions = devConfig.devServer;

    const devServer = new WebpackDevServer(devServerOptions, devCompiler);
    devServer.start();
  })
  .catch(() => {
    console.log(ansis.red(`Failed to bootstrap.`));
  });
