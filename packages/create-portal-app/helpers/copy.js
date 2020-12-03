const path = require('path')
const fs = require('fs')
const spawn = require('cross-spawn')

function parserPath(projectPath) {
  return [process.cwd(), projectPath].join(path.sep)
}

function copy(root, destination) {
  const destinationPath = parserPath(destination)
  return spawn.sync('cp', ['-r', root, destinationPath])
}

function isPathInUse(projectPath) {
  const fullPath = parserPath(projectPath)
  const isPathExists = fs.existsSync(fullPath)
  if (isPathExists) {
    return fs.readdirSync(fullPath).length
  }
  return isPathExists
}

module.exports = { parserPath, copy, isPathInUse }
