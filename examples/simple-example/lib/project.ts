import * as crypto from "crypto";
import axios from "axios";

export default class Project {
  id: string;
  name: string;
  owner: string;
  github_repo: string;
  readme: string;
  metadata: any;

  constructor(owner: string, name: string) {
    this.name = name;
    this.owner = owner;
    this.github_repo = `https://github.com/${owner}/${name}`;

    //  TODO: using the GitHub repo to set the id is not a good idea
    //  since repos can be renamed and then we are going to end up with
    //  a duplicate
    const encodedGHRepo = Buffer.from(this.github_repo, "utf-8").toString();
    this.id = crypto.createHash("sha1").update(encodedGHRepo).digest("hex");
  }

  initFromGitHub = async () => {
    //  TODO: what if the repo doesn't exist?
    await this.getFileContent("README.md")
      .then((content) => (this.readme = content))
      .catch((e) => (this.readme = null));

    await this.getFileContent("datapackage.json")
      .then((content) => (this.metadata = content))
      .catch((e) => (this.metadata = {}));
  };

  getFileContent = (path, branch = "main") => {
    return axios
      .get(
        `https://raw.githubusercontent.com/${this.owner}/${this.name}/${branch}/${path}`
      )
      .then((res) => res.data);
  };

  serialize() {
    return JSON.parse(JSON.stringify(this));
  }

  static async getFromGitHub(owner: string, name: string) {
    const project = new Project(owner, name);
    await project.initFromGitHub();

    return project;
  }
}

