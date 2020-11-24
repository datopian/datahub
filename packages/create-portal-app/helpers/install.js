const spawn  = require('cross-spawn');
const { resolve } = require('path');
const path   = require('path');

module.exports = function install(projectName, isYarn){
  return new Promise((resolve, reject)=>{
      const appPath = [process.cwd(), projectName].join(path.sep);
      //change the directory to the app directory
      process.chdir(appPath);

      let command = isYarn ? "yarn": "npm";
      let args    = isYarn ? [''] : ["install"];
      let exec = spawn(command,args, {
        stdio: 'inherit',
        env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
      })

      exec.on('close', (code)=>{
        if (code !== 0) {
          reject({ command: `${command} ${args[0]}` })
          return
        }
        resolve()
      });
  });
  
}