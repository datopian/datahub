import { Index } from 'flexsearch';
import { useState } from 'react';
import DebouncedInput from './DebouncedInput';
import { useForm } from 'react-hook-form';

export default function Catalog({
  datasets,
  facets,
}: {
  datasets: any[];
  facets: string[];
}) {
  const [indexFilter, setIndexFilter] = useState('');
  const index = new Index({ tokenize: 'full' });
  datasets.forEach((dataset) =>
    index.add(
      dataset._id,
      //This will join every metadata value + the url_path into one big string and index that
      Object.entries(dataset.metadata).reduce(
        (acc, curr) => acc + ' ' + curr[1].toString(),
        ''
      ) +
        ' ' +
        dataset.url_path
    )
  );

  const facetValues = facets
    ? facets.reduce((acc, facet) => {
        const possibleValues = datasets.reduce((acc, curr) => {
          const facetValue = curr.metadata[facet];
          if (facetValue) {
            return Array.isArray(facetValue)
              ? acc.concat(facetValue)
              : acc.concat([facetValue]);
          }
          return acc;
        }, []);
        acc[facet] = {
          possibleValues: [...new Set(possibleValues)],
          selectedValue: null,
        };
        return acc;
      }, {})
    : [];

  const { register, watch } = useForm(facetValues);

  const filteredDatasets = datasets
    // First filter by flex search
    .filter((dataset) =>
      indexFilter !== ''
        ? index.search(indexFilter).includes(dataset._id)
        : true
    )
    //Then check if the selectedValue for the given facet is included in the dataset metadata
    .filter((dataset) => {
      //Avoids a server rendering breakage
      if (!watch() || Object.keys(watch()).length === 0) return true
      //This will filter only the key pairs of the metadata values that were selected as facets
      const datasetFacets = Object.entries(dataset.metadata).filter((entry) =>
        facets.includes(entry[0])
      );
      //Check if the value present is included in the selected value in the form
      return datasetFacets.every((elem) =>
        watch()[elem[0]].selectedValue
          ? (elem[1] as string | string[]).includes(
              watch()[elem[0]].selectedValue
            )
          : true
      );
    });

  return (
    <>
      <DebouncedInput
        value={indexFilter ?? ''}
        onChange={(value) => setIndexFilter(String(value))}
        className="p-2 text-sm shadow border border-block mr-1"
        placeholder="Search all datasets..."
      />
      {Object.entries(facetValues).map((elem) => (
        <select
          key={elem[0]}
          defaultValue=""
          className="p-2 ml-1 text-sm shadow border border-block"
          {...register(elem[0] + '.selectedValue')}
        >
          <option value="">
            Filter by {elem[0]}
          </option>
          {(elem[1] as { possibleValues: string[] }).possibleValues.map(
            (val) => (
              <option
                key={val}
                className="dark:bg-white dark:text-black"
                value={val}
              >
                {val}
              </option>
            )
          )}
        </select>
      ))}
      <ul>
        {filteredDatasets.map((dataset) => (
          <li key={dataset._id}>
            <a href={dataset.url_path}>
              {dataset.metadata.title
                ? dataset.metadata.title
                : dataset.url_path}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

