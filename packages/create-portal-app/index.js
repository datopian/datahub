#!/usr/bin/env node

const Listr = require('listr')
const { program } = require('commander')
const chalk = require('chalk')
const prompts = require('prompts')
const path = require('path')
const figlet = require('figlet')
const package = require('./package.json')
const { copy, isPathInUse } = require('./helpers/copy')
const { install, initGit, checkPackageVersion } = require('./helpers/install')
const replace = require('./helpers/replace')

// Output path to create new portal app
let projectPath = ''

// Commander parameters to specify CLI behavior
program
  .name(package.name)
  .version(package.version)
  .arguments('[dir]')
  .usage(`${chalk.yellow('[dir]')}`)
  .description({
    dir: 'Directory to be used on install Portal.js',
  })
  .action((name) => (projectPath = name))
  .option('--use-npm', 'Install dependencies using npm instead yarn')
  .parse(process.argv)

/**
 * Method to ask a custon name if was not passed as parameter
 * returns the value passed from terminal input
 */
async function promptPath() {
  return prompts({
    type: 'text',
    name: 'path',
    message: 'Choose a name to your project',
    initial: '',
    validate: (name) => {
      projectPath = name
      if (isPathInUse(projectPath)) {
        return `${chalk.yellow(
          'Path ' +
            chalk.redBright(projectPath) +
            ' is already in use and is not empty.'
        )}`
      }
      return true
    },
  })
}

/**
 * Main method to start CLI and validate inputs
 */
async function run() {
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim()
  }
  if (!projectPath) {
    const response = await promptPath()
    if (typeof response.path === 'string') {
      projectPath = response.path.trim()
    }
  }
  if (!projectPath) {
    //TODO separate log methods
    console.log()
    console.log('Please choose a name to your project:')
    console.log()
    console.log('Example:')
    console.log(
      `${chalk.cyan(program.name())} ${chalk.yellow('ny-portal-app')}`
    )
    console.log()

    process.exit(1)
  }

  const root = path.join(__dirname + '/../portal')

  if (isPathInUse(projectPath)) {
    console.log()
    console.log(
      `${chalk.yellow(
        'Path ' +
          chalk.redBright(projectPath) +
          ' is already in use and is not empty.'
      )}`
    )
    console.log()
    process.exit(1)
  }

  // print a fancy Portal.js in the terminal
  console.log(
    chalk.yellow(figlet.textSync('Portal.Js', { horizontalLayout: 'full' }))
  )

  console.log()
  console.log(`Creating new portal.js app in ${chalk.cyan(projectPath)}`)
  console.log()

  //Tasks workflow
  const tasks = new Listr([
    {
      title: 'Fetching Content',
      task: () => copy(root, projectPath),
    },
    {
      title: 'Updating Content',
      task: () => replace(projectPath),
    },
    {
      title: 'Installing Dependencies',
      task: () => install(projectPath, program.useNpm),
    },
    {
      title: 'Git Init',
      task: () => initGit(projectPath),
    },
  ])

  tasks.run().then(() => {
    console.log()
    console.log(`${chalk.greenBright('Instalation Completed Successfully')}`)
    console.log()
    console.log(
      `Run ${chalk.cyan('cd ' + projectPath)} and ${chalk.green(program.useNpm ? 'npm run dev' : 'yarn dev')}`
    )
    console.log()
    console.log('Enjoy =)')
  })
}

//Main CLI execution workflow
run().catch((error) => {
  console.log(error.name)
  if (error.install) {
    console.log()
    console.log(
      `${chalk.redBright('Error on Create App :')}${chalk.yellow(
        error.message.toString()
      )}`
    )
  } else {
    console.log(`${chalk.red('Unexpected Error. Please report it as a bug')}`)
    console.log(error)
  }
  console.log()
  process.exit(1)
})
