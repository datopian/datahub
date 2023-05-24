import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import React from 'react';
import {
  CalendarIcon,
  CloudArrowUpIcon,
  FolderOpenIcon,
  LockClosedIcon,
  MapPinIcon,
  PaperClipIcon,
  ServerIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import { CKAN } from '@portaljs/ckan';

const backend_url = getConfig().publicRuntimeConfig.DMS;

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'UTC',
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ckan = new CKAN(backend_url)
  const { dataset } = context.query;
  const _dataset = await ckan.getDatasetDetails(dataset as string)
  return {
    props: {
      dataset: _dataset,
    },
  };
};

const positions = [
  {
    id: 1,
    title: 'Back End Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 2,
    title: 'Front End Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 3,
    title: 'User Interface Designer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Design',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
  },
];

export default function DatasetPage({ dataset }) {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                {dataset.organization.title
                  ? dataset.organization.title
                  : dataset.organization.name}
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {dataset.title ? dataset.title : dataset.name}
              </p>
              <p className="mt-6 leading-8 text-gray-600">
                {dataset.notes ? dataset.notes : 'No description'}
              </p>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {dataset.tags.length > 0 && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Tags
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {dataset.tags.map((tag) => tag.display_name).join(', ')}
                      </dd>
                    </div>
                  )}
                  {dataset.url && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Url
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {dataset.url}
                      </dd>
                    </div>
                  )}
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Created
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {formatter.format(new Date(dataset.metadata_created))}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Modified
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {formatter.format(new Date(dataset.metadata_modified))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="lg:pr-8 lg:pt-4">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Resources
            </h2>
            <div className="overflow-hidden bg-white shadow sm:rounded-md mt-2">
              <ul role="list" className="divide-y divide-gray-200">
                {dataset.resources.map((resource) => (
                  <li key={resource.id}>
                    <a href={resource.url} className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-sm font-medium text-indigo-600">
                            {resource.name}
                          </p>
                          {resource.datastore_active && (
                            <div className="ml-2 flex flex-shrink-0">
                              <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                Datastore active
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <FolderOpenIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              {resource.format}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <CalendarIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              Last modified:{' '}
                              <time dateTime={resource.metadata_modified}>
                                {formatter.format(
                                  new Date(resource.metadata_modified)
                                )}
                              </time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
