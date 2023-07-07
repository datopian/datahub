import React, { useContext, useEffect, useState } from 'react';
export const Controls = ({ children }) => {
  return <div>{children}</div>;
};

import { FullScreen, Zoom } from 'ol/control';
import { MapContext } from './Map';

export const FullScreenControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let fullScreenControl = new FullScreen({
      className: 'ml-1 flex flex-col w-8 items-center mt-2',
      activeClassName:
        'w-full inline-flex justify-center items-center rounded-t-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 text-sm',
      inactiveClassName:
        'inline-flex w-full justify-center items-center rounded-t-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 text-sm',
    });
    let zoomControl = new Zoom({
      className: 'ml-1 flex flex-col w-8 items-center',
      zoomInClassName:
        'inline-flex w-full justify-center items-center bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 text-sm',
      zoomOutClassName:
        'inline-flex w-full justify-center items-center rounded-b-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 text-sm',
    });
    map.controls.push(fullScreenControl);
    map.controls.push(zoomControl);

    return () => {
      map.controls.remove(zoomControl);
      map.controls.remove(fullScreenControl);
    };
  }, [map]);
  return null;
};

//build a list of checkboxes in react

export const ListOfCheckboxes = ({ layers, shownLayers, setShownLayers }) => {
  //layers is an array of url and name
  function addLayer(layer) {
    setShownLayers([...shownLayers, layer.url]);
  }

  function removeLayer(layer) {
    setShownLayers(shownLayers.filter((l) => l !== layer.url));
  }

  return (
    <div>
      <h3 className="mb-4 font-semibold text-gray-900 ">Layers</h3>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
        {layers.map((layer, index) => (
          <li
            key={index}
            className="w-full border-b border-gray-200 rounded-t-lg "
          >
            <div className="flex items-center pl-3">
              <input
                id={layer.name}
                type="checkbox"
                defaultChecked={shownLayers.includes(layer.url)}
                onClick={() =>
                  shownLayers.includes(layer.url)
                    ? removeLayer(layer)
                    : addLayer(layer)
                }
                value={true}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
              ></input>
              <label
                htmlFor={layer.name}
                className="w-full py-3 ml-2 text-sm font-medium text-gray-90"
              >
                {layer.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
