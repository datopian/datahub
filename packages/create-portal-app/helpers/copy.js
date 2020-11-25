const path = require("path");
const fs = require('fs');
const spawn  = require('cross-spawn');

function _parserPath(path){
  return [process.cwd(), destination].join(path.sep)
}
module.exports = function copy(root,destination){
  const destinationPath = _parserPath(destination)
  //TODO Move this method to validate in another function to throw a error and prompt another name
  if(fs.existsSync(destinationPath)){
    if(fs.readdirSync(destinationPath).length > 0) return Promise.reject(`directory ${destinationPath} exist and not empty`);
  }
  return spawn.sync('cp', ['-r', root, destinationPath]);
}

