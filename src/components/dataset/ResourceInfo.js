import React from 'react';
import filesize from 'filesize'
import PropTypes from 'prop-types';

/**
 * ResourceInfo component displays all resources in a data package 
 * @param {Array} resources A Frictionless datapackage resource object
 * @returns React Component
 */
const ResourcesInfo = ({ resources }) => {
    return (
        <>
            <section className="m-8" name="file-list">
                <h1 className="text-2xl font-bold mb-4">Data Files</h1>
                <div className="grid grid-cols-7 gap-4">
                    <div>
                        <h3 className="text-1xl font-bold mb-2">File</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Description</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Size</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Last Changed</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Download</h3>
                    </div>
                </div>

                {resources.map((resource, index) => {
                    return (
                        <div key={`${index}_${resource.name}`} className="grid grid-cols-7 gap-4">
                            <div>
                                <h3 className="text-1xl">{resource.name}</h3>
                            </div>
                            <div>
                                <h3 className="text-1xl">{resource.description || "No description"}</h3>
                            </div>
                            <div>
                                <h3 className="text-1xl">{filesize(resource.size, { bits: true })}</h3>
                            </div>
                            <div>
                                <h3 className="text-1xl">{resource.updated}</h3>
                            </div>
                            <div>
                                <h3 className="text-1xl">
                                    <a className="text-yellow-600" href={`/dataset/${resource.path}`}>
                                        {resource.format} ({filesize(resource.size, { bits: true })})
                                    </a>
                                </h3>
                            </div>
                        </div>
                    )
                })}
            </section>
        </>
    )
}


ResourcesInfo.propTypes = {
    resources: PropTypes.array.isRequired
}
export default ResourcesInfo