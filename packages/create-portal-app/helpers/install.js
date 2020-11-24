const spawn = require("cross-spawn");
const path = require("path");


function install(projectName, isYarn) {
  return new Promise((resolve, reject) => {
    const appPath = [process.cwd(), projectName].join(path.sep);
    //change the directory to the app directory
    process.chdir(appPath);

    const command = isYarn ? "yarn" : "npm";
    const args = isYarn ? [""] : ["install"];
    const exec = spawn(command, args, {
      stdio: "pipe",
      env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" },
    });

    exec.on("close", (code) => {
      if (code !== 0) {
        reject({ command: `${command} ${args[0]}` });
        return;
      }
      resolve();
    });
  });
}


