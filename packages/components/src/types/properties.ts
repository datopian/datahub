/*
 * All components should use this interface for
 * its data property.
 * Based on vega.
 *
 */
export interface Data {
  url?: string;
  values?: { [key: string]: number | string }[];
  csv?: string;
}
