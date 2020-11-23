#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
const prompts = require('prompts')
const package = require('./package.json')

// Output path to create new portal app
let path = ''


// Commander parameters to specify CLI behavior
program.name(package.name)
  .version(package.version)
  .arguments('[dir]')
  .usage(`${chalk.yellow('[dir]')}`)
  .description({
    dir: 'Directory to be used on install Portal.js' 
  })
  .action(name => path = name)
  .allowUnknownOption()
  .parse(process.argv)


  /**
   * Method to ask a custon name if was not passed as parameter
   */
  async function promptPath(){
    return prompts({
      type: 'text',
      name: 'path',
      message: 'Choose a name to your project',
      initial: '',
      validate: name => {
        //TODO Method to validate valid path name
        return true
      }
    })
  
  }