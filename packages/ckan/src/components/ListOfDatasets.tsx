import { Dispatch, SetStateAction, useState } from 'react';
import useSWR from 'swr';
import { SWRConfig } from 'swr';
import { PackageSearchOptions } from '../interfaces';
import DatasetCard from './DatasetCard';
import Pagination from './Pagination';
import CKAN from '../lib/ckanapi';

export default function ListOfDatasets({
  ckan,
  options,
  setOptions,
  urlPrefix = '',
}: {
  ckan: CKAN;
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
  urlPrefix?: string;
}) {
  return (
    <SWRConfig>
      <ListOfDatasetsInner
        ckan={ckan}
        options={options}
        setOptions={setOptions}
        urlPrefix={urlPrefix}
      />
    </SWRConfig>
  );
}

function ListOfDatasetsInner({
  ckan,
  options,
  setOptions,
  urlPrefix = '',
}: {
  ckan: CKAN;
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
  urlPrefix?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 homepage-padding">
      <ListItems
        ckan={ckan}
        setOptions={setOptions}
        options={options}
        urlPrefix={urlPrefix}
      />
      <div style={{ display: 'none' }}>
        <ListItems
          ckan={ckan}
          setOptions={setOptions}
          options={{ ...options, offset: options.offset + 5 }}
        />
      </div>
    </div>
  );
}

function ListItems({
  ckan,
  options,
  setOptions,
  urlPrefix = '',
}: {
  ckan: CKAN;
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
  urlPrefix?: string;
}) {
  const { data, isLoading } = useSWR(['package_search', options], async () =>
    ckan.packageSearch({ ...options })
  );
  //Define which page buttons are going to be displayed in the pagination list
  const [subsetOfPages, setSubsetOfPages] = useState(0);

  return (
    <>
      {isLoading ? (
        <div className="loader mb-4 h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
      ) : (
        <>
          <h2 className="text-4xl capitalize font-bold text-zinc-900">
            {data?.count} Datasets
          </h2>
          {data?.datasets?.map((dataset) => (
            <DatasetCard
              key={dataset.id}
              dataset={dataset}
              showOrg={true}
              urlPrefix={urlPrefix}
            />
          ))}
          {data?.count && (
            <Pagination
              options={options}
              subsetOfPages={subsetOfPages}
              setSubsetOfPages={setSubsetOfPages}
              setOptions={setOptions}
              count={data.count}
            />
          )}
        </>
      )}
    </>
  );
}
