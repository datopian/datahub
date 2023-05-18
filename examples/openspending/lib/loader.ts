import { FiscalDataPackage } from './datapackage.interface';
import { Project } from './project.interface';

export function loadDataPackage(datapackage: FiscalDataPackage, repo): Project {
  return {
    name: datapackage.name,
    title: datapackage.title,
    owner: {
      name: repo.owner.login,
      logo: repo.owner.avatar_url,
      // TODO: make this title work
      title: repo.owner.login,
    },
    repo: { name: repo, full_name: repo.full_name },
    files: datapackage.resources,
    author: datapackage.author ? datapackage.author : null,
    cityCode: datapackage.cityCode ? datapackage.cityCode : null,
    countryCode: datapackage.countryCode
      ? (datapackage.countryCode as string)
      : null,
    fiscalPeriod: datapackage.fiscalPeriod
      ? {
          start: datapackage.fiscalPeriod.start
            ? datapackage.fiscalPeriod.start
            : null,
          end: datapackage.fiscalPeriod.end
            ? datapackage.fiscalPeriod.end
            : null,
        }
      : null,
    readme: datapackage.readme ? datapackage.readme : '',
    datapackage,
  };
}
