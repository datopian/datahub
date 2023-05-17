import { useForm } from 'react-hook-form';
import DatasetsGrid from './DatasetsGrid';
import { Project } from '../lib/project.interface';
import { Index } from 'flexsearch';

export default function DatasetsSearch({ datasets }: { datasets: Project[] }) {
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
      fiscalPeriodStart: '',
      fiscalPeriodEnd: '',
    },
  });

  const allCountries = datasets
    .map((item) => item.countryCode)
    .filter((v) => v) //  Filters false values
    .filter((v, i, a) => a.indexOf(v) === i) //  Remove duplicates
    //  TODO: title should be the full name
    .map((code) => ({ code, title: code }));

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="min-w-0 flex-auto relative">
          <input
            placeholder="Search datasets"
            aria-label="Hate speech on Twitter"
            {...register('searchTerm')}
            className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-400 sm:text-sm"
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
        <div className="sm:basis-1/6">
          {/* TODO: nicer select e.g. headlessui example */}
          <select
            className="w-full h-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-400 sm:text-sm"
            {...register('country')}
          >
            <option value="">All</option>
            {allCountries.map((country) => {
              return (
                <option key={country.code} value={country.code}>
                  {country.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="min-w-full mt-10 align-middle">
        <DatasetsGrid
          datasets={datasets
            .filter((dataset: Project) =>
              watch().searchTerm && watch().searchTerm !== ''
                ? index.search(watch().searchTerm).includes(dataset.name)
                : true
            )
            .filter((dataset) =>
              watch().country && watch().country !== ''
                ? dataset.countryCode === watch().country
                : true
            )}
        />
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
