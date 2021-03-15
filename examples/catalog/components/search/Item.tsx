/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

const Item: React.FC<{ datapackage: any }> = ({ datapackage }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold">
        <Link
          href={`/@${
            datapackage.organization
              ? datapackage.organization.name
              : 'dataset'
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
      <div className="leading-relaxed mt-2">
        {datapackage.description || datapackage.notes}
      </div>
    </div>
  );
};

export default Item;
