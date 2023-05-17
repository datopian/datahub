import { FiscalDataPackage, TabularDataResource } from "./datapackage.interface";

export interface Project {
  owner: { name: string; logo?: string }; // Info about the owner of the data repo
  repo: { name: string; logo?: string }; // Info about the the data repo
  files: TabularDataResource[];
  name: string;
  title?: string;
  author?: string;
  cityCode?: string;
  countryCode?: string;
  fiscalPeriod?: {
    start: string;
    end: string;
  };
  readme?: string;
  datapackage: FiscalDataPackage
}
