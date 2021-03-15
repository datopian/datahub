#!/usr/bin/env node
const Listr = require('listr')
const { program } = require('commander')
const chalk = require('chalk')
const path = require('path')
const figlet = require('figlet')
const { exec } = require('child_process');
const package = require('../package.json')
const fs = require('fs')


console.log(
  chalk.yellow(figlet.textSync('Portal App', { horizontalLayout: 'full' }))
)

function directoryExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
        reject(error)
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

function processArgs(args) {
  const userArgs = { npm: false, override: false, port: 3000, path: process.cwd() }
  args.forEach((arg) => {
    if (arg.includes("=")) {
      let temp = arg.split("=")
      userArgs[temp[0]] = temp[1]
    }
  })
  return userArgs
}
// Output path to create new portal app


// Commander parameters to specify CLI behavior
program
  .version(package.version)
  .usage('show [ path=/some/path | npm=true | port=3000 ]')
  .description('Creates a portal application from specified dataset',
  )
  .option('npm', '[true || false] Install dependencies using npm instead yarn, defaults to false (yarn)')
  .option('port', 'Server port, defaults to 3000')
  .parse(process.argv,)

const userArgs = processArgs(program.args)


/**
 * Main method to start CLI and validate inputs
 */
async function run() {
  const datasetPath = userArgs.path.trim()

  if (directoryExists(datasetPath)) {
    console.log(
      `${chalk.yellow(`Using dataset found in: ${chalk.cyan(datasetPath)}`)}`
    )
  } else {
    console.log(
      `${chalk.red(`Directory: ${chalk.cyan(datasetPath)} does not exist!`)}`
    )
    process.exit(1)
  }

  const portalGithubRepo = "https://github.com/datopian/portal-experiment.git"
  const portalLocalRepoDirectory = path.join(datasetPath, 'portal-experiment')

  const cloneRepoCmd = `cd ${datasetPath} && 
                        export PORTAL_DATASET_PATH=${datasetPath} && 
                        git clone ${portalGithubRepo}`

  const buildNextAppCmd = userArgs.npm ? `cd ${portalLocalRepoDirectory} && npm install && npm run build` :
                                          `cd ${portalLocalRepoDirectory} && yarn && yarn build`

  const startNextAppCmd = userArgs.npm ?
    `cd ${portalLocalRepoDirectory} && npm run start -p ${userArgs.port}` :
    `cd ${portalLocalRepoDirectory} && yarn start -p ${userArgs.port}`


  //Tasks workflow
  const tasks = new Listr([
    {
      title: 'Getting portal tools...',
      task: async () => {
        try {
          if (directoryExists(portalLocalRepoDirectory)) {
            console.log(
              chalk.cyan(`${package.name} ${chalk.yellow('already exists! Skipping this step')}`))
          } else {
            await execShellCommand(cloneRepoCmd)
          }

        } catch (error) {
          throw error
        }
      },
    },
    {
      title: 'Preparing your app...',
      task: async () => { await execShellCommand(buildNextAppCmd) }
    },
    {
      title: `Displaying dataset at http://localhost:${userArgs.port}`,
      task: () => execShellCommand(startNextAppCmd),
    }
  ])

  tasks.run()
}

run().catch((error) => {
  console.log(error)
  console.log()
  process.exit(1)
})
