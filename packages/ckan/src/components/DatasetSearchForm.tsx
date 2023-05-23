import { Field, Form, Formik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import {
  PackageSearchOptions,
  Group,
  Organization,
  FilterObj,
} from '../interfaces';

export default function DatasetSearchForm({
  orgs,
  groups,
  setOptions,
  options,
  filtersName,
}: {
  orgs: Array<Organization>;
  groups: Array<Group>;
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
  filtersName?: FilterObj | undefined;
}) {
  return (
    <Formik
      initialValues={{
        org: '',
        group: '',
        query: '',
      }}
      enableReinitialize={true}
      onSubmit={async (values) => {
        const org = orgs.find(
          (org) => (org.title || org.display_name) === values.org
        );
        const group = groups.find(
          (group) => group.display_name === values.group
        );
        setOptions({
          ...options,
          groups: group ? [group.name] : [],
          orgs: org ? [org.name] : [],
          query: values.query,
        });
      }}
    >
      <div className="mx-auto" style={{ width: 'min(1100px, 95vw)' }}>
        <Form className="min-h-[80px] flex flex-col lg:flex-row bg-white inline-block px-5 py-3 rounded-xl">
          <Field
            type="text"
            placeholder="Search Datasets"
            className="mx-4 grow py-4 border-0 placeholder:text-neutral-400"
            name="query"
          />
          <Field
            list="groups"
            name="group"
            placeholder={`${filtersName?.group || 'Theme'}`}
            className="lg:border-l p-4 mx-2 placeholder:text-neutral-400"
          ></Field>

          <datalist aria-label="Formats" id="groups">
            <option value="">{`${filtersName?.group || 'Theme'}`}</option>
            {groups.map((group, index) => (
              <option key={index}>{group.display_name}</option>
            ))}
          </datalist>
          <Field
            list="orgs"
            name="org"
            placeholder="Organization"
            className="lg:border-l p-4 mx-2 placeholder:text-neutral-400"
            autoComplete="off"
          ></Field>

          <datalist aria-label="Formats" id="orgs">
            <option value="">Organization</option>
            {orgs.map((org, index) => (
              <option key={index}>{org.title || org.display_name}</option>
            ))}
          </datalist>
          <button
            className="font-bold text-black px-12 py-4 rounded-lg bg-accent hover:bg-cyan-500 duration-150"
            type="submit"
          >
            SEARCH
          </button>
        </Form>
      </div>
    </Formik>
  );
}
