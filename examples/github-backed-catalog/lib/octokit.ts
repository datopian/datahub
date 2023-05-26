import { Octokit } from "octokit";

export interface GithubProject {
  owner: string;
  repo: string;
  branch: string;
  files: string[];
  readme: string;
  description?: string;
  name?: string;
}

export async function getProjectReadme(
  owner: string,
  repo: string,
  branch: string,
  readme: string,
  github_pat?: string
) {
  const octokit = new Octokit({ auth: github_pat });
  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: readme,
      ref: branch,
    });
    const data = response.data as { content?: string };
    const fileContent = data.content ? data.content : "";
    if (fileContent === "") {
      return null;
    }
    const decodedContent = Buffer.from(fileContent, "base64").toString();
    return decodedContent;
  } catch (error) {
    throw new Error(
      "Couldn't get project readme please make sure that you are pointing to a valid repo and that the repo in question contains a README.md"
    );
  }
}

export async function getProjectDatapackage(
  owner: string,
  repo: string,
  branch: string,
  github_pat?: string
) {
  const octokit = new Octokit({ auth: github_pat });
  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: "datapackage.json",
      ref: branch,
    });
    const data = response.data as { content?: string };
    const fileContent = data.content ? data.content : "";
    if (fileContent === "") {
      return null;
    }
    const decodedContent = Buffer.from(fileContent, "base64").toString();
    return JSON.parse(decodedContent);
  } catch (error) {
    return null
  }
}

export async function getLastUpdated(
  owner: string,
  repo: string,
  branch: string,
  readme: string,
  github_pat?: string
) {
  const octokit = new Octokit({ auth: github_pat });
  try {
    const response = await octokit.rest.repos.listCommits({
      owner,
      repo,
      ref: branch,
    });
    return response.data[0].commit.committer.date;
  } catch (error) {
    throw new Error(
      "Couldn't get project list of commits please make sure that you are pointing to a valid repo"
    );
  }
}
export async function getProjectMetadata(
  owner: string,
  repo: string,
  github_pat?: string
) {
  const octokit = new Octokit({ auth: github_pat });
  try {
    const response = await octokit.rest.repos.get({
      owner,
      repo,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Couldn't get project metadata please make sure that you are pointing to a valid repo"
    );
  }
}

export async function getRepoContents(
  owner: string,
  repo: string,
  branch: string,
  files: string[],
  github_pat?: string
) {
  const octokit = new Octokit({ auth: github_pat });
  try {
    const contents = [];
    for (const path of files) {
      const response = await octokit.rest.repos.getContent({
        owner,
        repo,
        ref: branch,
        path: path,
      });
      const data = response.data as {
        download_url?: string;
        name: string;
        size: number;
      };
      contents.push({
        download_url: data.download_url,
        name: data.name,
        size: data.size,
      });
    }
    return contents;
  } catch (error) {
    if (
      error.message ===
      'This endpoint can only return blobs smaller than 100 MB in size. The requested blob is too large to fetch via the API, but you can always clone the repository via Git to obtain it.: {"resource":"Blob","field":"data","code":"too_large"}'
    ) {
      throw new Error(
        `The requested files ${files.join(
          ", "
        )} are too big making it impossible to fetch via Github API`
      );
    }
    throw new Error(
      "Couldn't get project contents please make sure that you are pointing to a valid repo"
    );
  }
}

export async function getProject(project: GithubProject, github_pat?: string) {
  const projectMetadata = await getProjectMetadata(
    project.owner,
    project.repo,
    github_pat
  );
  if (!projectMetadata) {
    return null;
  }
  const projectReadme = await getProjectReadme(
    project.owner,
    project.repo,
    project.branch,
    project.readme,
    github_pat
  );
  let projectData = [];
  if (project.files) {
    projectData = await getRepoContents(
      project.owner,
      project.repo,
      project.branch,
      project.files,
      github_pat
    );
  }
  const projectBase =
    project.readme && project.readme.split("/").length > 1
      ? project.readme.split("/").slice(0, -1).join("/")
      : "/";
  const last_updated = await getLastUpdated(
    project.owner,
    project.repo,
    project.branch,
    projectBase,
    github_pat
  );

  const projectDatapackage = await getProjectDatapackage(
    project.owner,
    project.repo,
    project.branch,
    github_pat
  );

  return {
    ...projectMetadata,
    files: projectData,
    readmeContent: projectReadme,
    last_updated,
    base_path: projectBase,
    datapackage: projectDatapackage
  };
}
