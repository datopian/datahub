import Link from 'next/link';

export default function Item({ datapackage }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold">
        <Link
          href={`/@${
            datapackage.organization ? datapackage.organization.name : 'dataset'
          }/${datapackage.name}`}
        >
          <a className="text-primary">
            {datapackage.title || datapackage.name}
          </a>
        </Link>
      </h3>
      <Link
        href={`/@${
          datapackage.organization ? datapackage.organization.name : 'dataset'
        }`}
      >
        <a className="text-gray-500 block mt-1">
          {datapackage.organization
            ? datapackage.organization.title
            : 'dataset'}
        </a>
      </Link>
      <div className="leading-relaxed mt-2">{datapackage.description}</div>
    </div>
  );
}
