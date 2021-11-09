const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const chalk = require("chalk");

// Remove webpack cache when install some deps...
if (fs.existsSync(path.resolve(__dirname, "./.webpack_cache"))) {
  rimraf("./.webpack_cache/*", (e) => {
    if (e) {
      console.log(chalk.red`${e}`);
    } else {
      console.log(chalk.green`Webpack Cache removed successfully.`);
    }
  });
}
