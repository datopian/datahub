---
title: "Example: simple data catalog"
authors: ['Luccas Mateus']
date: 2023-04-20
---

**See the repo:** https://github.com/datopian/portaljs/tree/main/examples/simple-example

- Creating a new project with `create-next-app` like so:

```
npx create-next-app <app-name> --example https://github.com/datopian/portaljs/tree/main/examples/simple-example
cd <app-name>
```

- This project uses the github api, which for anonymous users will cap at 50 requests per hour, so you might want to get a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and add it to a `.env` file inside the folder like so

```
GITHUB_PAT=<github token>
```

- Edit the file `datasets.json` to your liking, some examples can be found inside this [repo](https://github.com/datasets)
- Run the app using:

```
npm run dev
```

Congratulations, you now have something similar to this running on `http://localhost:3000`
![](https://i.imgur.com/jAljJ9C.png)
If yo go to any one of those pages by clicking on `More info` you will see something similar to this
![](https://i.imgur.com/AoJd4O0.png)

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdatopian%2Fportaljs%2Ftree%2Fmain%2Fexamples%2Fsimple-example)

By clicking on this button, you will be redirected to a page which will allow you to clone the content into your own github/gitlab/bitbucket account and automatically deploy everything.


## Structure of `datasets.json`

The `datasets.json` file is simply a list of datasets, below you can see a minimal example of a dataset

```json
{
  "owner": "fivethirtyeight",
  "repo": "data",
  "branch": "master",
  "files": ["nba-raptor/historical_RAPTOR_by_player.csv", "nba-raptor/historical_RAPTOR_by_team.csv"],
  "readme": "nba-raptor/README.md"
}
```

It has

- A `owner` which is going to be the github repo owner
- A `repo` which is going to be the github repo name
- A `branch` which is going to be the branch to which we need to get the files and the readme
- A list of `files` which is going to be a list of paths with files that you want to show to the world
- A `readme` which is going to be the path to your data description, it can also be a subpath eg: `example/README.md`

You can also add

- A `description` which is useful if you have more than one dataset for each repo, if not provided we are just going to use the repo description
- A `Name` which is useful if you want to give your dataset a nice name, if not provided we are going to use the junction of the `owner` the `repo` + the path of the README, in the exaple above it will be `fivethirtyeight/data/nba-raptor`

## Extra commands

You can also build the project for production with

```
npm run build
```

And run using the production build like so:

```
npm run start
```

