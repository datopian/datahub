import { FiscalDataPackage } from './datapackage.interface';
import { Project } from './project.interface';

export function loadDataPackage(
  datapackage: FiscalDataPackage,
  owner: string,
  repo: string
): Project {
  return {
    name: datapackage.name,
    owner: { name: owner },
    repo: { name: repo },
    files: datapackage.resources,
    author: datapackage.author ? datapackage.author : null,
    cityCode: datapackage.cityCode ? datapackage.cityCode : null,
    countryCode: datapackage.countryCode
      ? (datapackage.countryCode as string)
      : null,
    fiscalPeriod: datapackage.fiscalPeriod
      ? { start: datapackage.fiscalPeriod.start
            ? datapackage.fiscalPeriod.start
            : null,
          end: datapackage.fiscalPeriod.end
            ? datapackage.fiscalPeriod.end
            : null,
        }
      : null,
    readme: datapackage.readme ? datapackage.readme : '',
    datapackage
  };
}
