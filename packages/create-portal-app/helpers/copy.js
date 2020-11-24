
const cpy = require("cpy")
const path = require("path");
const fs = require('fs');

module.exports = function copy(root,destination){
  const dest_path = [process.cwd(), destination].join(path.sep)
  if(fs.existsSync(dest_path)){
    if(fs.readdirSync(dest_path).length > 0) return Promise.reject(`directory ${dest_path} exist and not empty`);
  }
  return cpy(root, dest_path);
}

// (async ()=> {
//   await copy([process.cwd(),"templates"].join(path.sep), "newme");
// })().catch(e=> console.log(chalk.red(e)));