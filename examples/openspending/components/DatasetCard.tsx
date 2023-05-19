import Link from 'next/link';
import { Project } from '../lib/project.interface';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

export default function DatasetCard({ dataset }: { dataset: Project }) {
  return (
    <div
      key={dataset.name}
      className="overflow-hidden rounded-xl border border-gray-200"
    >
      <Link
        href={`/@${dataset.owner.name}/${dataset.repo.name}`}
        className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6"
      >
        <img
          src={dataset.owner.logo || '/assets/org-icon.svg'}
          alt={dataset.owner.name}
          className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10 p-2"
        />
        <div className="text-sm font-medium leading-6">
          <div className="text-gray-900 line-clamp-1">{dataset.title}</div>
          <div className="text-gray-500 line-clamp-1">
            {dataset.owner.title}
          </div>
        </div>
      </Link>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Name</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900 line-clamp-1">
              {dataset.name}
            </div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Country</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              {dataset.countryCode}
            </div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Fiscal Period</dt>
          <dd className="text-gray-700">
            {dataset.fiscalPeriod?.start &&
              new Date(dataset.fiscalPeriod.start).getFullYear()}
            {dataset.fiscalPeriod?.end &&
              dataset.fiscalPeriod?.start !== dataset.fiscalPeriod?.end && (
                <>
                  {' - '}
                  {new Date(dataset.fiscalPeriod.end).getFullYear()}
                </>
              )}
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Metadata</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              <Link
                // TODO: this link may be incorrect for some datasets
                href={`https://github.com/${dataset.owner.name}/${dataset.repo.name}/blob/main/datapackage.json`}
                target="_blank"
                className="flex items-center hover:text-gray-700"
              >
                datapackage.json <ExternalLinkIcon className="ml-1" />
              </Link>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}
