import React from 'react'
import PropTypes from 'prop-types';

/**
 * Opens a frictionless resource in data explorer. Data explorer gives you
 * an interface to interact with a resource. That means you can do things like 
 * data filtering, sorting, e.t.c
 * @param {object} resource A frictionless Data resource
 * @returns React component
 */
const DataExplorer = ({ resource }) => {
    // TODO: Add data explorer code
    return <>{JSON.stringify(resource)}</>;
};

DataExplorer.propTypes = {
    resource: PropTypes.object.isRequired
}
export default DataExplorer;
