const path = require("path");
const fs = require('fs');
const spawn  = require('cross-spawn');

module.exports = function copy(root,destination){
  const dest_path = [process.cwd(), destination].join(path.sep)
  if(fs.existsSync(dest_path)){
    if(fs.readdirSync(dest_path).length > 0) return Promise.reject(`directory ${dest_path} exist and not empty`);
  }
  return spawn.sync('cp', ['-r', root, dest_path]);
}
