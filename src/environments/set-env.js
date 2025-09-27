const fs = require("fs");
const colors = require("colors");
const appVersion = require("../../package.json").version;
const npmLifecycleEvent = process.env.npm_lifecycle_event;
const targetFile = "./src/environments/environment.ts";
console.log(colors.zebra("Started set-env.js"));

function generateEnv(envPath, dotenvPath, production) {
  require("dotenv").config({ path: dotenvPath });

  const buildDate = new Date().toISOString().slice(0, 16).replace("T", " ");
  const envConfigFile = `export const environment = {
    API_URL: '${process.env["API_URL"]}',
    appVersion: '${appVersion}',
    buildDate: '${buildDate}',
    production: ${production},
  };`;
  fs.writeFile(envPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
    try {
      fs.copyFileSync(envPath, targetFile);
      const message = `Environment file copied from ${envPath} to ${targetFile}`;
      if (npmLifecycleEvent === "prestart:dev") {
        console.log(colors.bgGreen.black(` DEV: ${message} `));
      } else if (npmLifecycleEvent === "prestart:prod") {
        console.log(colors.bgRed.white.bold(` PROD: ${message} `));
      } else {
        console.log(colors.bgBlue.white(` ${message} `));
      }
    } catch (err) {
      console.error(colors.red(`Error copying environment file: ${err}`));
      throw err;
    }
  });
}

if (npmLifecycleEvent === "prestart:dev") {
  generateEnv(
    "./src/environments/environment.development.ts",
    "src/environments/.env.development",
    false
  );
} else if (npmLifecycleEvent === "prestart:prod") {
  generateEnv(
    "./src/environments/environment.development.ts",
    "src/environments/.env.prod",
    true
  );
} else {
  console.log(
    colors.bgRed.black(
      `No npm lifecycle event detected. Skipping environment file copy.`
    )
  );
}
