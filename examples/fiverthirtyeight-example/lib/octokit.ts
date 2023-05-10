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
    return null;
  }
}
