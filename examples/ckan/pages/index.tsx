import {
  CKAN,
  DatasetSearchForm,
  ListOfDatasets,
  PackageSearchOptions,
  Organization,
  Group,
} from '@portaljs/ckan';
import getConfig from 'next/config';
import { useState } from 'react';

const backend_url = getConfig().publicRuntimeConfig.DMS;

export async function getServerSideProps() {
  const ckan = new CKAN(backend_url);
  const groups = await ckan.getGroupsWithDetails();
  const orgs = await ckan.getOrgsWithDetails();
  return {
    props: {
      groups,
      orgs,
    },
  };
}

export default function Home({
  orgs,
  groups,
}: {
  orgs: Organization[];
  groups: Group[];
}) {
  const ckan = new CKAN(backend_url);
  const [options, setOptions] = useState<PackageSearchOptions>({
    offset: 0,
    limit: 5,
    tags: [],
    groups: [],
    orgs: [],
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-900">
      <DatasetSearchForm
        options={options}
        setOptions={setOptions}
        groups={groups}
        orgs={orgs}
      />
      <div className="bg-white p-8 my-4 rounded-lg">
        <ListOfDatasets options={options} setOptions={setOptions} ckan={ckan} />{' '}
      </div>
    </main>
  );
}
