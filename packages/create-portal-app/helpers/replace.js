const fs = require('fs')
const path = require('path')
const { parserPath } = require('./copy')

function _replacePackage(projectName) {
  const appPath = parserPath(projectName)
  const packagePath = `${appPath}/package.json`
  const data = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  data.name = projectName
  delete data.homepage

  fs.writeFileSync(packagePath, JSON.stringify(data, null, 2))
}

function replaceContent(projectName) {
  _replacePackage(projectName)
}

module.exports = replaceContent
