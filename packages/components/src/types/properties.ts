/*
 * All components should use this interface for
 * its data property.
 * Based on vega.
 *
 */

type URL = string; // Just in case we want to transform it into an object with configurations
export interface Data {
  url?: URL;
  values?: { [key: string]: number | string }[];
  csv?: string;
}

export interface GeospatialData {
  url?: URL;
  geojson?: GeoJSON.GeoJSON;
}
