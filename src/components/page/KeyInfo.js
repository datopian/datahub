import React from 'react';
import filesize from 'filesize'

/**
 * KeyInfo component receives two arguments. 
 * @param {Object} descriptor A Frictionless datapackage descriptor object with the following fields:
 * {
 *  title: "Title of the data package",
 *  length: "The number of resources present in the data package"
 *  datasetSize: The combined size of the data package resources
 *  format: The format of resources in the dataset. e.g csv, json, excel
 *  created: The date the dataset was created
 *  updated: The date the dataset was last updated
 *  licence: The licence of the dataset
 *  sources: An array of the data set sources
 * }
 * @param {Array} resources A Frictionless datapackage resource array
 * @returns React Component
 */
const KeyInfo = ({ descriptor, resources }) => {
    let datasetSize = 0
    if (resources) {
        datasetSize = resources.length == 1 ?
            resources[0].size :
            resources.reduce((accumulator, currentValue) => {
                return accumulator.size + currentValue.size
            })
    }

    return (
        <>
            <section className="m-8" name="key-info" id="key-info">
                <h1 data-testid="datasetTitle" className="text-3xl font-bold mb-8">
                    {descriptor.title}
                </h1>
                <h1 className="text-2xl font-bold mb-4">Key info</h1>
                <div className="grid grid-cols-7 gap-4">
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Files</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Size</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Format</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Created</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Updated</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Licence</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl font-bold mb-2">Source</h3>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-4">
                    <div>
                        <h3 className="text-1xl">{resources.length}</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl">{filesize(datasetSize, { bits: true })}</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl">{resources[0].format} zip</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl">{descriptor.created}</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl">{descriptor.updated}</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl">{descriptor.license}</h3>
                    </div>
                    <div>
                        <h3 className="text-1xl">
                            <a className="text-yellow-600"
                                href={descriptor.sources[0].web}>
                                {descriptor.sources[0].title}
                            </a>
                        </h3>
                    </div>
                </div>
            </section>

        </>
    )
}

export default KeyInfo