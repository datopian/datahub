import { Project } from '../lib/project.interface';
import DatasetCard from './DatasetCard';

export default function DatasetsGrid({ datasets }: { datasets: Project[] }) {
  return (
    <ul
      className="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      role="list"
    >
      {datasets.map((dataset, idx) => {
        return (
          <li key={`datasets-grid-item-${idx}`}>
            <DatasetCard dataset={dataset} />
          </li>
        );
      })}
    </ul>
  );
}
