import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

/**
 * Displays a list of recent datasets
 * @param {object} props
 * datasets = {
 *    organization: {name: <some name>, title: <some title> },
 *    title: <Data package title>
 *    name:  <Data package name>
 *    description: <description of data package>
 *    notes: <Notes associated with the data package>
 * } 
 * @returns React Component
 */
const Recent = ({datasets}) => {

  return (
    <section className="my-10 mx-4 lg:my-20">
      <h1 className="text-2xl font-thin mb-4">Recent Datasets</h1>
      <div className="recent flex flex-col lg:flex-row">
        {datasets.map((dataset, index) => (
          <div
            key={index}
            className="border px-4 mb-4 mr-3 border-gray-100 w-5/6 shadow-sm"
          >
            <h1 className="text-2xl font-thin">{dataset.title}</h1>
            <p className="text-gray-500">
              {dataset.organization && dataset.organization.description}
            </p>
            <Link
              href={`/@${dataset.organization ? dataset.organization.name : 'dataset'
                }/${dataset.name}`}
            >
              <a className="pt-3 flex justify-end text-orange-500">
                View Dataset
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

Recent.propTypes = {
  datasets: PropTypes.object.isRequired
}

export default Recent;
