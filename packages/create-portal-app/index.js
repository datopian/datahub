#!/usr/bin/env node

const Listr = require("listr");
const { program } = require("commander");
const chalk = require("chalk");
const prompts = require("prompts");
const path = require("path");
const figlet = require("figlet");
const package = require("./package.json");
const { copy, isPathInUse } = require("./helpers/copy");
const { install, initGit, checkPackageVersion } = require("./helpers/install");
const replace = require("./helpers/replace");

// Output path to create new portal app
let projectPath = "";


// Commander parameters to specify CLI behavior
program
  .name(package.name)
  .version(package.version)
  .arguments("[dir]")
  .usage(`${chalk.yellow("[dir]")}`)
  .description({
    dir: "Directory to be used on install Portal.js",
  })
  .action((name) => (projectPath = name))
  .option("--use-npm")
  .parse(process.argv);

/**
 * Method to ask a custon name if was not passed as parameter
 * returns the value passed from terminal input
 */
async function promptPath() {
  return prompts({
    type: "text",
    name: "path",
    message: "Choose a name to your project",
    initial: "",
    validate: (name) => {
      projectPath = name
      if(isPathInUse(projectPath)){
        return  `${chalk.yellow(
        "Path " +
          chalk.redBright(projectPath) +
          " is already in use and is not empty."
      )}`
      }
      return true
    },
  });
}

/**
 * Main method to start CLI and validate inputs
 */
async function run() {
  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }
  if (!projectPath) {
    const response = await promptPath();
    if (typeof response.path === "string") {
      projectPath = response.path.trim();
    }
  }
  if (!projectPath) {
    //TODO separate log methods
    console.log();
    console.log("Please choose a name to your project:");
    console.log();
    console.log("Example:");
    console.log(
      `${chalk.cyan(program.name())} ${chalk.yellow("ny-portal-app")}`
    );
    console.log();

    process.exit(1);
  }

  const root = path.join(__dirname + "/../portal");

  const parsedPath = path.resolve(projectPath);
  const project = path.basename(parsedPath);

  console.log();
  console.log(
    `Begin Instalation of new portal.js on ${chalk.cyan(projectPath)} folder`
  );
  console.log();
  //TODO Move this method to another one to keep more functional and split responsabilites
  const tasks = new Listr([
    {
      title: "Fetching Content",
      task: () => copy(root, project),
    },
    {
      title: "Updating Content",
      task: () => "",
    },
    {
      title: "Installing Dependencies",
      task: () => install(project, true),
    },
    {
      title: "Git Init",
      task: () => initGit(projectPath),
    },
  ]);

  tasks.run().then(() => {
    console.log();
    console.log(`${chalk.greenBright("Instalation Completed!")}`);
    console.log();
    console.log(
      `Run ${chalk.cyan("cd " + projectPath)} and ${chalk.green(
        "yarn dev"
      )} or ${chalk.yellow("npm run dev")}`
    );
    console.log();
    console.log("Enjoy =)");
  });
}

//Main CLI execution workflow
run()
  .then(`${chalk.greenBright("Project Installed Sucess")}`)
  .catch((error) => {
    if (error.command) {
      console.log(`${chalk.cyan("Error on Create App")}`);
    } else {
      console.log(
        `${chalk.red("Unexpected Erro. Please report it as a bug")}`
      );
      console.log(error);
    }
    console.log();
    process.exit(1);
  });
