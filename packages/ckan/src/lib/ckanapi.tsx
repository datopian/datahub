/* eslint-disable jsx-a11y/anchor-is-valid */
import { Activity } from '../interfaces/activity.interface';
import {
  Dataset,
  DatasetListQueryOptions,
  PackageSearchOptions,
  Resource,
  Tag,
} from '../interfaces/dataset.interface';
import { ResourceInfo, TableMetadata } from '../interfaces/datastore.interface';
import { Group } from '../interfaces/group.interface';
import { Organization } from '../interfaces/organization.interface';
import { User } from '../interfaces/user.interface';
import fetchRetry from './utils';

export default class CKAN {
  DMS: string;

  constructor(DMS: string) {
    this.DMS = DMS;
  }

  async getDatasetsList() {
    const response = await fetchRetry(
      `${this.DMS}/api/3/action/package_list`,
      3
    );
    const responseData = await response.json();
    return responseData.result;
  }

  async getDatasetsListWithDetails(options: DatasetListQueryOptions) {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/current_package_list_with_resources?offset=${
        options.offset
      }&limit=${options.limit}`,
      3
    );
    const responseData = await response.json();
    const datasets: Array<Dataset> = responseData.result;
    return datasets;
  }

  async packageSearch(
    options: PackageSearchOptions
  ): Promise<{ datasets: Dataset[]; count: number }> {
    function buildGroupsQuery(groups: Array<string>) {
      if (groups.length > 0) {
        return `groups:(${groups.join(' OR ')})`;
      }
      return '';
    }
    function buildOrgsQuery(orgs: Array<string>) {
      if (orgs.length > 0) {
        return `organization:(${orgs.join(' OR ')})`;
      }
      return '';
    }
    function buildTagsQuery(tags: Array<string>) {
      if (tags.length > 0) {
        return `tags:(${tags.join(' OR ')})`;
      }
      return '';
    }

    function buildResFormatQuery(resFormat: Array<string>) {
      if (resFormat?.length > 0) {
        return `res_format:(${resFormat.join(' OR ')})`;
      }
      return '';
    }

    function buildFq(
      tags: Array<string>,
      orgs: Array<string>,
      groups: Array<string>,
      resFormat: Array<string>
    ) {
      //TODO; this query builder is not very robust
      // convertToCkanSearchQuery function should be
      //copied over from the old portals utils
      const fq = [
        buildGroupsQuery(groups),
        buildOrgsQuery(orgs),
        buildTagsQuery(tags),
        buildResFormatQuery(resFormat),
      ].filter((str) => str !== '');
      if (fq.length > 0) {
        return '&fq=' + fq.join('+');
      }
      return null;
    }

    const fq = buildFq(
      options.tags,
      options.orgs,
      options.groups,
      options?.resFormat
    );
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/package_search?start=${options.offset}&rows=${
        options.limit
      }${fq ? fq : ''}${options.query ? '&q=' + options.query : ''}${
        options.sort ? '&sort=' + options.sort : ''
      }`,
      3
    );
    const responseData = await response.json();
    const datasets: Array<Dataset> = responseData.result.results;
    return { datasets, count: responseData.result.count };
  }

  async getDatasetDetails(datasetName: string) {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/package_show?id=${datasetName}`,
      1
    );
    const responseData = await response.json();
    if (responseData.success === false) {
      throw 'Could not find dataset';
    }
    const dataset: Dataset = responseData.result;
    return dataset;
  }

  async getDatasetActivityStream(datasetName: string) {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/package_activity_list?id=${datasetName}`,
      3
    );
    const responseData = await response.json();
    const activitiesWithoutUserData: Array<Activity> = responseData.result;
    const activities = await Promise.all(
      activitiesWithoutUserData.map(async (item) => {
        let user_data: User | null = await this.getUser(item.user_id);
        user_data = user_data === undefined ? null : user_data;
        return { ...item, user_data };
      })
    );
    return activities;
  }

  async getUser(userId: string) {
    try {
      const response = await fetchRetry(
        `${
          this.DMS
        }/api/3/action/user_show?id=${userId}`,
        3
      );
      const responseData = await response.json();
      const user: User | null =
        responseData.success === true ? responseData.result : null;
      return user;
    } catch {
      return null;
    }
  }

  async getGroupList() {
    const response = await fetchRetry(
      `${this.DMS}/api/3/action/group_list`,
      3
    );
    const responseData = await response.json();
    const groups: Array<string> = responseData.result;
    return groups;
  }

  async getGroupsWithDetails() {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/group_list?all_fields=True`,
      3
    );
    const responseData = await response.json();
    const groups: Array<Group> = responseData.result;
    return groups;
  }

  async getGroupDetails(groupName: string) {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/group_show?id=${groupName}&include_datasets=True`,
      3
    );
    const responseData = await response.json();
    const group: Group = responseData.result;
    return group;
  }

  async getGroupActivityStream(groupName: string) {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/group_activity_list?id=${groupName}`,
      3
    );
    const responseData = await response.json();
    const activitiesWithoutUserData: Array<Activity> = responseData.result;
    const activities = await Promise.all(
      activitiesWithoutUserData.map(async (item) => {
        const user_data = await this.getUser(item.user_id);
        return { ...item, user_data };
      })
    );
    return activities;
  }

  async getOrgList() {
    const response = await fetchRetry(
      `${this.DMS}/api/3/action/organization_list`,
      3
    );
    const responseData = await response.json();
    const organizations: Array<string> = responseData.result;
    return organizations;
  }

  async getOrgsWithDetails(accrossPages?: boolean) {
    if (!accrossPages) {
      const response = await fetchRetry(
        `${
          this.DMS
        }/api/3/action/organization_list?all_fields=True`,
        3
      );
      const responseData = await response.json();
      const organizations: Array<Organization> = responseData.result;
      return organizations;
    }

    const organizations = [];
    const orgListResponse = await fetchRetry(
      `${this.DMS}/api/3/action/organization_list`,
      3
    );
    const orgList = await orgListResponse.json();
    const orgLen = orgList.result.length;
    const pages = Math.ceil(orgLen / 25);

    for (let i = 0; i < pages; i++) {
      let allOrgListResponse = await fetchRetry(
        `${
          this.DMS
        }/api/3/action/organization_list?all_fields=True&offset=${
          i * 25
        }&limit=25`,
        3
      );
      const responseData = await allOrgListResponse.json();
      const result: Array<Organization> = responseData.result;
      organizations.push(...result);
    }
    return organizations.sort((a, b) => b.package_count - a.package_count);
  }

  async getOrgDetails(orgName: string) {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/organization_show?id=${orgName}&include_datasets=True`,
      3
    );
    const responseData = await response.json();
    const organization: Organization = responseData.result;
    return organization;
  }

  async getOrgActivityStream(orgName: string) {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/organization_activity_list?id=${orgName}`,
      3
    );
    const responseData = await response.json();
    const activitiesWithoutUserData: Array<Activity> = responseData.result;
    const activities = await Promise.all(
      activitiesWithoutUserData.map(async (item) => {
        const user_data = await this.getUser(item.user_id);
        return { ...item, user_data };
      })
    );
    return activities;
  }

  async getAllTags() {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/tag_list?all_fields=True`,
      3
    );
    const responseData = await response.json();
    const tags: Array<Tag> = responseData.result;
    return tags;
  }

  async getResourcesWithAliasList() {
    const response = await fetch(
      `${this.DMS}/api/3/action/datastore_search`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: '_table_metadata',
          limit: '32000',
        }),
      }
    );
    const responseData = await response.json();
    const tableMetadata: Array<TableMetadata> = responseData.result.records;
    return tableMetadata.filter((item) => item.alias_of);
  }

  async datastoreSearch(resourceId: string) {
    const response = await fetch(
      `${this.DMS}/api/3/action/datastore_search`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: resourceId,
          limit: '32000',
        }),
      }
    );
    const responseData = await response.json();
    return responseData.result.records;
  }

  async getResourceMetadata(resourceId: string) {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/resource_show?id=${resourceId}`,
      3
    );
    const responseData = await response.json();
    const resourceMetadata: Resource = responseData.result;
    return resourceMetadata;
  }

  async getResourceInfo(resourceId: string) {
    const response = await fetch(
      `${this.DMS}/api/3/action/datastore_info`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resource_id: resourceId }),
      }
    );
    const responseData = await response.json();
    const resourceInfo: Array<ResourceInfo> = responseData.result;
    return resourceInfo;
  }

  async getFacetFields(field: 'res_format' | 'tags') {
    const response = await fetchRetry(
      `${
        this.DMS
      }/api/3/action/package_search?facet.field=["${field}"]&rows=0`,
      3
    );
    const responseData = await response.json();
    const result = responseData.result?.facets?.[field];
    return Object.keys(result);
  }
}
