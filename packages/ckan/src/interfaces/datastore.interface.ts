export interface TableMetadata {
  _id: string;
  name?: string;
  oid: number;
  alias_of?: string;
}

export interface ResourceInfo {
  schema: Record<string, string | boolean | number>;
  meta: Record<string, string | boolean | number>;
  alias?: string;
}
