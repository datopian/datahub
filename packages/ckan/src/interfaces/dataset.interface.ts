import { Activity } from "./activity.interface";
import { Group } from "./group.interface";
import { Organization } from "./organization.interface";

export interface Dataset {
  author?: string;
  author_email?: string;
  creator_user_id?: string;
  id: string;
  isopen?: boolean;
  license_id?: string;
  license_title?: string;
  maintainer?: string;
  maintainer_email?: string;
  metadata_created?: string;
  metadata_modified?: string;
  name: string;
  notes?: string;
  num_resources: number;
  num_tags: number;
  owner_org?: string;
  private?: boolean;
  state?: "active" | "inactive" | "deleted";
  title?: string;
  type?: "dataset";
  url?: string;
  version?: string;
  activity_stream?: Array<Activity>;
  resources: Array<Resource>;
  organization?: Organization;
  groups?: Array<Group>;
  tags?: Array<Tag>;
  total_downloads?: number;
}

export interface Resource {
  cache_last_updated?: string;
  cache_url?: string;
  created?: string;
  datastore_active?: boolean;
  description?: string;
  format?: string;
  hash?: string;
  id: string;
  last_modified?: string;
  metadata_modified?: string;
  mimetype?: string;
  mimetype_inner?: string;
  name?: string;
  package_id?: string;
  position?: number;
  resource_type?: null;
  size?: number;
  state?: "active" | "inactive" | "deleted";
  url?: string;
  url_type?: string;
}

export interface DatasetListQueryOptions {
  offset: number;
  limit: number;
}
export interface PackageSearchOptions {
  offset: number;
  limit: number;
  groups: Array<string>;
  orgs: Array<string>;
  tags: Array<string>;
  query?: string;
  resFormat?: Array<string>;
  sort?: string;
}

export interface Tag {
  display_name?: string;
  id: string;
  name: string;
  state: "active";
  vocabulary_id?: string;
}
