import { expect, test } from 'vitest';
import { getAllProjectsFromOrg, getProjectDataPackage } from '../lib/project';
import { loadDataPackage } from '../lib/loader';
import { getProjectMetadata } from '../lib/project';
import { getCsv, parseCsv } from '../components/Table';

test(
  'Test OS-Data',
  async () => {
    const repos = await getAllProjectsFromOrg(
      'os-data',
      'main',
      process.env.VITE_GITHUB_PAT
    );
    if (repos.failed.length > 0) console.log(repos.failed);
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
    if (repos.failed.length > 0) console.log(repos.failed);
    expect(repos.failed.length).toBe(0);
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

test(
  'Test getting one section of csv from R2',
  async () => {
    const rawCsv = await getCsv(
      'https://storage.openspending.org/state-of-minas-gerais-brazil-planned-budget/__os_imported__br-mg-ppagloc.csv'
    );
    const parsedCsv = await parseCsv(rawCsv);
    expect(parsedCsv.errors.length).toBe(1);
    expect(parsedCsv.data.length).toBe(10165);
    expect(parsedCsv.meta.fields).toStrictEqual([
      'function_name',
      'function_label',
      'product_name',
      'product_label',
      'area_name',
      'area_label',
      'subaction_name',
      'subaction_label',
      'region_label_map',
      'region_reg_map',
      'region_name',
      'region_label',
      'municipality_map_id',
      'municipality_name',
      'municipality_map_code',
      'municipality_label',
      'municipality_map_name_simple',
      'municipality_map_name',
      'cofog1_label_en',
      'cofog1_name',
      'cofog1_label',
      'amount',
      'subprogramme_name',
      'subprogramme_label',
      'time_name',
      'time_year',
      'time_month',
      'time_day',
      'time_week',
      'time_yearmonth',
      'time_quarter',
      'time',
      'action_name',
      'action_label',
      'subfunction_name',
      'subfunction_label',
      'programme_name',
      'programme_label',
    ]);
  },
  { timeout: 100000 }
);
