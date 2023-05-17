/**
 * Fiscal Data Package is a simple specification for data access and delivery of fiscal data.
 */
export type FiscalDataPackage = TabularDataPackage & {
  countryCode?: ISO31661Alpha2CountryCode
  regionCode?: string
  cityCode?: string
  author?: string
  readme?: string
  granularity?: GranularityOfResources
  fiscalPeriod?: FiscalPeriodForTheBudget
  [k: string]: unknown
}
/**
 * The profile of this descriptor.
 */
export type Profile = "tabular-data-package"
/**
 * An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.
 */
export type Name = string
/**
 * A property reserved for globally unique identifiers. Examples of identifiers that are unique include UUIDs and DOIs.
 */
export type ID = string
/**
 * A human-readable title.
 */
export type Title = string
/**
 * A text description. Markdown is encouraged.
 */
export type Description = string
/**
 * The home on the web that is related to this data package.
 */
export type HomePage = string
/**
 * The datetime on which this descriptor was created.
 */
export type Created = string
/**
 * The contributors to this descriptor.
 */
export type Contributors = [Contributor, ...Contributor[]]
/**
 * A human-readable title.
 */
export type Title1 = string
/**
 * A fully qualified URL, or a POSIX file path.
 */
export type Path = string
/**
 * An email address.
 */
export type Email = string
/**
 * An organizational affiliation for this contributor.
 */
export type Organization = string
/**
 * A list of keywords that describe this package.
 */
export type Keywords = [string, ...string[]]
/**
 * A image to represent this package.
 */
export type Image = string
/**
 * The license(s) under which this package is published.
 */
export type Licenses = [License, ...License[]]
/**
 * A license for this descriptor.
 */
export type License =
  | {
      [k: string]: unknown
    }
  | {
      [k: string]: unknown
    }
/**
 * An `array` of Tabular Data Resource objects, each compliant with the [Tabular Data Resource](/tabular-data-resource/) specification.
 *
/**
 * A Tabular Data Resource.
 */
export interface TabularDataResource {
  format?: string;
  name: string;
  description?: string;
  title?: string;
  schema?: Schema;
  sample?: any[];
  profile?: string;
  key?: string;
  path?: string;
  size?: number;
}

export interface Field {
  name: string;
  type: FieldType;
}

export interface Schema {
  fields: Field[];
}

export const OptionsFields = [
  "any",
  "array",
  "boolean",
  "date",
  "datetime",
  "duration",
  "geojson",
  "geopoint",
  "integer",
  "number",
  "object",
  "string",
  "time",
  "year",
  "yearmonth",
] as const;

type FieldType = typeof OptionsFields[number];
/**
 * A human-readable title.
 */
export type Title2 = string
/**
 * A fully qualified URL, or a POSIX file path.
 */
export type Path1 = string
/**
 * An email address.
 */
export type Email1 = string
/**
 * The raw sources for this resource.
 */
export type Sources = Source[]

/**
 * A keyword that represents the direction of the spend, either expenditure or revenue.
 */
export type DirectionOfTheSpending = "expenditure" | "revenue"
/**
 * A keyword that represents the phase of the data, can be proposed for a budget proposal, approved for an approved budget, adjusted for modified budget or executed for the enacted budget
 */
export type BudgetPhase = "proposed" | "approved" | "adjusted" | "executed"
/**
 * Either an array of strings corresponding to the name attributes in a set of field objects in the fields array or a single string corresponding to one of these names. The value of primaryKey indicates the primary key or primary keys for the dimension.
 */
export type PrimaryKey = string | [string, ...string[]]
/**
 * Describes what kind of a dimension it is.
 */
export type DimensionType =
  | "datetime"
  | "entity"
  | "classification"
  | "activity"
  | "fact"
  | "location"
  | "other"
/**
 * The type of the classification.
 */
export type ClassificationType = "functional" | "administrative" | "economic"
/**
 * A valid 2-digit ISO country code (ISO 3166-1 alpha-2), or, an array of valid ISO codes.
 */
export type ISO31661Alpha2CountryCode = string | [string, ...string[]]
/**
 * A keyword that represents the type of spend data, eiter aggregated or transactional
 */
export type GranularityOfResources = "aggregated" | "transactional"

/**
 * Tabular Data Package
 */
export interface TabularDataPackage {
  profile: Profile
  name?: Name
  id?: ID
  title?: Title
  description?: Description
  homepage?: HomePage
  created?: Created
  contributors?: Contributors
  keywords?: Keywords
  image?: Image
  licenses?: Licenses
  resources: TabularDataResource[]
  sources?: Sources
  [k: string]: unknown
}
/**
 * A contributor to this descriptor.
 */
export interface Contributor {
  title: Title1
  path?: Path
  email?: Email
  organization?: Organization
  role?: string
  [k: string]: unknown
}
/**
 * A source file.
 */
export interface Source {
  title: Title2
  path?: Path1
  email?: Email1
  [k: string]: unknown
}
/**
 * Measures are numerical and correspond to financial amounts in the source data.
 */
export interface Measures {
  [k: string]: Measure
}
/**
 * Measure.
 *
 * This interface was referenced by `Measures`'s JSON-Schema definition
 * via the `patternProperty` "^\w+".
 */
export interface Measure {
  source: string
  resource?: string
  currency: string
  factor?: number
  direction?: DirectionOfTheSpending
  phase?: BudgetPhase
  [k: string]: unknown
}
/**
 * Dimensions are groups of related fields. Dimensions cover all items other than the measure.
 */
export interface Dimensions {
  [k: string]: Dimension
}
/**
 * Dimension.
 *
 * This interface was referenced by `Dimensions`'s JSON-Schema definition
 * via the `patternProperty` "^\w+".
 */
export interface Dimension {
  attributes: Attributes
  primaryKey: PrimaryKey
  dimensionType?: DimensionType
  classificationType?: ClassificationType
  [k: string]: unknown
}
/**
 * Attribute objects that make up the dimension
 */
export interface Attributes {
  /**
   * This interface was referenced by `Attributes`'s JSON-Schema definition
   * via the `patternProperty` "^\w+".
   */
  [k: string]: {
    source: string
    resource?: string
    constant?: string | number
    parent?: string
    labelfor?: string
    [k: string]: unknown
  }
}
/**
 * The fiscal period of the dataset
 */
export interface FiscalPeriodForTheBudget {
  start: string
  end?: string
  [k: string]: unknown
}

