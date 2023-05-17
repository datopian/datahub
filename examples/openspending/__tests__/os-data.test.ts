import { Octokit } from 'octokit';
import { assert, expect, test } from 'vitest'
import { getProjectDataPackage } from '../lib/octokit';

export async function getAllDataPackagesFromOrg(
  org: string,
  branch?: string,
  github_pat?: string
) {
  const octokit = new Octokit({ auth: github_pat });
  const repos = await octokit.rest.repos.listForOrg({ org, type: 'public', per_page: 100 });
  let failedDataPackages = [];
  const datapackages = await Promise.all(
    repos.data.map(async (_repo) => {
      const datapackage = await getProjectDataPackage(
        org,
        _repo.name,
        branch ? branch : 'main',
        github_pat
      );
      if (!datapackage) {
        failedDataPackages.push(_repo.name)
        return null
      };
      return {...datapackage, repo: _repo.name};
    })
  );
  return {
    datapackages: datapackages.filter((item) => item !== null),
    failedDataPackages,
  };
}

test('Test OS-Data', async () => {
  const repos = await getAllDataPackagesFromOrg('os-data', 'main', process.env.VITE_GITHUB_PAT)
  if (repos.failedDataPackages.length > 0) console.log(repos.failedDataPackages)
  expect(repos.failedDataPackages.length).toBe(0)
}, {timeout: 100000})

test('Test Gift-Data', async () => {
  const repos = await getAllDataPackagesFromOrg('gift-data', 'main', process.env.VITE_GITHUB_PAT)
  if (repos.failedDataPackages.length > 0) console.log(repos.failedDataPackages)
  expect(repos.failedDataPackages.length).toBe(0)
}, {timeout: 100000})

