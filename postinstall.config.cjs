const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

// remove webpack cache when install some deps...
if (fs.existsSync(path.resolve(__dirname, "./.webpack_cache"))) {
  rimraf("./.webpack_cache/*", (e) => {
    if (e) {
      console.log(e);
    }
  });
}
