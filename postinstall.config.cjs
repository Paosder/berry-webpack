const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const chalk = require("chalk");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { exec } = require("child_process");
const argv = yargs(hideBin(process.argv)).argv;

// Remove webpack cache when install some deps...
if (fs.existsSync(path.resolve(__dirname, "./.webpack_cache"))) {
  rimraf("./.webpack_cache/*", (e) => {
    if (e) {
      console.log(chalk.red`${e}`);
    } else {
      console.log(chalk.green`Webpack Cache removed successfully.`);
      if (argv.generateDLL) {
        console.log(chalk.green`⏳ Generating DLL...`);
        exec("yarn bootstrap:dll", (e) => {
          if (e) {
            console.log(chalk.red`${e}`);
          } else {
            console.log(chalk.green`DLL generated successfully.`);
            console.log(chalk.green`🚀 Ready to Launch! 🚀`);
          }
        }).stdout.pipe(process.stdout);
      }
    }
  });
}
