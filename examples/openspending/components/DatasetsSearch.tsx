import { useForm } from 'react-hook-form';
import DatasetsGrid from './DatasetsGrid';
import { Project } from '../lib/project.interface';
import { Index } from 'flexsearch';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function DatasetsSearch({
  datasets,
  availableCountries,
}: {
  datasets: Project[];
  availableCountries;
}) {
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);

  const index = new Index({ tokenize: 'full' });

  datasets.forEach((dataset: Project) =>
    index.add(
      dataset.name,
      `${dataset.repo} ${dataset.name} ${dataset.title} ${dataset.author} ${dataset.title} ${dataset.cityCode} ${dataset.fiscalPeriod?.start} ${dataset.fiscalPeriod?.end}`
    )
  );

  const { register, watch, handleSubmit, reset, resetField } = useForm({
    defaultValues: {
      searchTerm: '',
      country: '',
      minDate: '',
      maxDate: '',
    },
  });

  const filteredDatasets = datasets
    .filter((dataset: Project) =>
      watch().searchTerm && watch().searchTerm !== ''
        ? index.search(watch().searchTerm).includes(dataset.name)
        : true
    )
    .filter((dataset) =>
      watch().country && watch().country !== ''
        ? dataset.countryCode === watch().country
        : true
    )
    // TODO: Does that really makes sense?
    // What if the fiscalPeriod is 2015-2017 and inputs are
    // set to 2015-2016. It's going to be filtered out but
    // it shouldn't.
    .filter((dataset) =>
      watch().minDate && watch().minDate !== ''
        ? dataset.fiscalPeriod?.start >= watch().minDate
        : true
    )
    .filter((dataset) =>
      watch().maxDate && watch().maxDate !== ''
        ? dataset.fiscalPeriod?.end <= watch().maxDate
        : true
    );

  const paginatedDatasets = filteredDatasets.slice(
    (page - 1) * itemsPerPage,
    (page - 1) * itemsPerPage + itemsPerPage
  );

  const pageCount = Math.ceil(filteredDatasets.length / itemsPerPage) || 1;

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="min-w-0 flex-auto">
          <br />
          <div className="relative">
            <input
              placeholder="Search datasets"
              aria-label="Search datasets"
              {...register('searchTerm', { onChange: () => setPage(1) })}
              className="h-[3em] relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-400 sm:text-sm"
            />
            {watch().searchTerm !== '' && (
              <button
                onClick={() => resetField('searchTerm')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        </div>
        <div className="sm:basis-1/6">
          {/* TODO: nicer select e.g. headlessui example */}
          <label className="text-sm text-gray-600 font-medium">Country</label>
          <select
            className="h-[3em] w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-400 sm:text-sm"
            {...register('country', { onChange: () => setPage(1) })}
          >
            <option value="">All</option>
            {availableCountries.map((country) => {
              return (
                <option key={country.code} value={country.code}>
                  {country.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="sm:basis-1/6">
          <label className="text-sm text-gray-600 font-medium">Min. date</label>
          <div className="relative">
            <input
              aria-label="Min. date"
              type="date"
              {...register('minDate', { onChange: () => setPage(1) })}
              className="h-[3em] w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-400 sm:text-sm"
            />
          </div>
        </div>
        <div className="sm:basis-1/6">
          <label className="text-sm text-gray-600 font-medium">Max. date</label>
          <div className="relative">
            <input
              aria-label="Max. date"
              type="date"
              {...register('maxDate', { onChange: () => setPage(1) })}
              className="h-[3em] w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-400 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 mb-5">
        <span className="text-lg font-medium">
          {filteredDatasets.length} datasets found
        </span>
      </div>
      <div className="min-w-full align-middle">
        <DatasetsGrid datasets={paginatedDatasets} />
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={() => setPage(1)}
            disabled={page <= 1}
            className="disabled:text-gray-400"
          >
            <ChevronDoubleLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              if (page > 1) setPage((prev) => --prev);
            }}
            disabled={page <= 1}
            className="disabled:text-gray-400"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <span className="mx-5">
            Page {page} of {pageCount}
          </span>
          <button
            onClick={() => {
              if (page < pageCount) setPage((prev) => ++prev);
            }}
            disabled={page >= pageCount}
            className="disabled:text-gray-400"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setPage(pageCount)}
            disabled={page >= pageCount}
            className="disabled:text-gray-400"
          >
            <ChevronDoubleRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
}

const CloseIcon = () => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu / Close_MD">
        <path
          id="Vector"
          d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};
