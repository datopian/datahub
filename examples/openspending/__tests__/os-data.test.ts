import { expect, test } from 'vitest';
import { getAllProjectsFromOrg } from '../lib/project';

test(
  'Test OS-Data',
  async () => {
    const repos = await getAllProjectsFromOrg(
      'os-data',
      'main',
      process.env.VITE_GITHUB_PAT
    );
    if (repos.failed.length > 0)
      console.log(repos.failed);
    expect(repos.failed.length).toBe(0);
  },
  { timeout: 100000 }
);

test(
  'Test Gift-Data',
  async () => {
    const repos = await getAllProjectsFromOrg(
      'gift-data',
      'main',
      process.env.VITE_GITHUB_PAT
    );
    if (repos.failed.length > 0)
      console.log(repos.failed);
    expect(repos.failed.length).toBe(0);
  },
  { timeout: 100000 }
);
