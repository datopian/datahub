const path = require('path')
const fs = require('fs');

const srcPath = process.argv[2]
const destForMarkdown = './content'
const destForData = './public'

const readme = path.join(srcPath, 'README.md')
const readmeDest = path.join(destForMarkdown, 'README.md')

fs.copyFileSync(readme, readmeDest)

const data = path.join(srcPath, 'data.csv')
const dataDest = path.join(destForData, 'data.csv')

fs.copyFileSync(data, dataDest)

console.log('Done')