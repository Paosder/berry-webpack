import fs from "fs";
import path from "path";
import rimraf from "rimraf";
import ansis from "ansis";

const __dirname = path.resolve();
// Remove webpack cache when install some deps...
if (fs.existsSync(path.resolve(__dirname, "./.webpack_cache"))) {
  rimraf("./.webpack_cache/*", (e) => {
    if (e) {
      console.log(ansis.red(`${e}`));
    } else {
      console.log(ansis.green(`Webpack Cache removed successfully.`));
    }
  });
}
