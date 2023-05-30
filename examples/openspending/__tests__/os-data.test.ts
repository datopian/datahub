import { expect, test } from 'vitest';
import { getAllProjectsFromOrg, getProjectDataPackage } from '../lib/project';
import { loadDataPackage } from '../lib/loader';
import { getProjectMetadata } from '../lib/project';
import { validate } from 'datapackage';

test(
  'Test OS-Data',
  async () => {
    const repos = await getAllProjectsFromOrg(
      'os-data',
      'main',
      process.env.VITE_GITHUB_PAT
    );
    if (repos.failed.length > 0)
      console.log('Failed to get datapackage on', repos.failed);
    let failedDatapackages = await Promise.all(
      repos.results.map(async (item) => {
        try {
          const { valid, errors } = await validate(item.datapackage);
          return errors.length > 0 ? item.repo.name : null;
        } catch {
          return item.repo.name;
        }
      })
    );
    failedDatapackages = failedDatapackages.filter((item) => item !== null);
    if (failedDatapackages.length > 0) {
      console.log('Failed to validate datapackage on ', failedDatapackages);
    } else {
      console.log('No invalid packages');
    }
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
    if (repos.failed.length > 0) console.log(repos.failed);
    let failedDatapackages = await Promise.all(
      repos.results.map(async (item) => {
        try {
          const { valid, errors } = await validate(item.datapackage);
          return errors.length > 0 ? item.repo.name : null;
        } catch {
          return item.repo.name;
        }
      })
    );
    failedDatapackages = failedDatapackages.filter((item) => item !== null);
    if (failedDatapackages.length > 0) {
      console.log('Failed to validate datapackage on ', failedDatapackages);
    } else {
      console.log('No invalid packages');
    }
  },
  { timeout: 100000 }
);

test(
  'Test getting one dataset from github',
  async () => {
    const datapackage = await getProjectDataPackage(
      'os-data',
      'berlin-berlin',
      'main',
      process.env.VITE_GITHUB_PAT
    );
    const repo = await getProjectMetadata(
      'os-data',
      'berlin-berlin',
      process.env.VITE_GITHUB_PAT
    );
    const project = loadDataPackage(datapackage, repo);
    delete project['datapackage'];
    delete project.files[0]['dialect'];
    delete project.files[0]['schema'];
    expect(project).toStrictEqual({
      name: 'berlin-berlin',
      title: 'Berlin-Berlin',
      description: null,
      owner: {
        name: 'os-data',
        logo: 'https://avatars.githubusercontent.com/u/13695166?v=4',
        title: 'os-data',
      },
      repo: {
        name: 'berlin-berlin',
        full_name: 'os-data/berlin-berlin',
        url: 'https://github.com/os-data/berlin-berlin',
      },
      files: [
        {
          name: 'berlin-gesamt',
          format: 'csv',
          path: 'https://storage.openspending.org/berlin-berlin/berlin-gesamt.csv',
          mediatype: 'text/csv',
          bytes: 81128743,
          encoding: 'utf-8',
        },
      ],
      author: 'Michael Peters <michael.peters@okfn.de>',
      cityCode: 'Berlin',
      countryCode: 'DE',
      fiscalPeriod: { start: '2014-01-01', end: '2019-12-31' },
      readme: '',
    });
  },
  { timeout: 100000 }
);
