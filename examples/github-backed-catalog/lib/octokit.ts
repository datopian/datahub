import { Octokit } from 'octokit';

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
    const fileContent = data.content ? data.content : '';
    if (fileContent === '') {
      return null;
    }
    const decodedContent = Buffer.from(fileContent, 'base64').toString();
    return decodedContent;
  } catch (error) {
    console.log(error);
    return null;
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
      path: readme,
      ref: branch,
    });
    return response.data[0].commit.committer.date;
  } catch (error) {
    console.log(error);
    return null;
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
    console.log(error);
    return null;
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
      const data = response.data as { download_url?: string, name: string, size: number };
      contents.push({ download_url: data.download_url, name: data.name, size: data.size});
    }
    return contents;
  } catch (error) {
    console.log(error);
    return null;
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
  if (!projectReadme) {
    return null;
  }
  const projectData = await getRepoContents(
    project.owner,
    project.repo,
    project.branch,
    project.files,
    github_pat
  );
  if (!projectData) {
    return null;
  }
  const projectBase = project.readme.split('/').length > 1
      ? project.readme.split('/').slice(0, -1).join('/')
      : '/'
  const last_updated = await getLastUpdated(
    project.owner,
    project.repo,
    project.branch,
    projectBase,
    github_pat
  );
  return { ...projectMetadata, files: projectData, readmeContent: projectReadme, last_updated, base_path: projectBase };
}
