const path = require("path");
const fs = require('fs');
const spawn  = require('cross-spawn');

function _parserPath(projectPath){
  return [process.cwd(), projectPath].join(path.sep)
}

function copy(root,destination){
  const destinationPath = _parserPath(destination)
  return spawn.sync('cp', ['-r', root, destinationPath]);
}

function isPathInUse(projectPath){
  const fullPath = _parserPath(projectPath)
  const isPathExists = fs.existsSync(fullPath)
  if(isPathExists) {
    return fs.readdirSync(fullPath).length
  }
  return isPathExists
}

module.exports = { copy, isPathInUse }