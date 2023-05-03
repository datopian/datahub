import { Index } from 'flexsearch';
import { useState } from 'react';
import DebouncedInput from './DebouncedInput';

export default function Catalog({ datasets }: { datasets: any[] }) {
  const [indexFilter, setIndexFilter] = useState('');
  const index = new Index({ tokenize: "full"});
  datasets.forEach((dataset) =>
    index.add(
      dataset._id,
      Object.entries(dataset.metadata).reduce(
            (acc, curr) => acc + ' ' + curr.toString(),
            ''
          ) + ' ' + dataset.url_path
    )
  );
  return (
    <>
      <DebouncedInput
        value={indexFilter ?? ''}
        onChange={(value) => setIndexFilter(String(value))}
        className="p-2 text-sm shadow border border-block"
        placeholder="Search all datasets..."
      />
      <ul>
        {datasets
          .filter((dataset) =>
            indexFilter !== ''
              ? index.search(indexFilter).includes(dataset._id)
              : true
          )
          .map((dataset) => (
            <li key={dataset.id}>
              <a href={dataset.url_path}>{dataset.metadata.title ? dataset.metadata.title : dataset.url_path}</a>
            </li>
          ))}
      </ul>
    </>
  );
}
