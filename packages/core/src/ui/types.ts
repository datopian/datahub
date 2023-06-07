// shared types used in more than one component
// TODO find out what's the best place to put them, what's the best practice

// layout
export interface NavLink {
  name: string;
  href: string;
}

export interface AuthorConfig {
  name: string;
  url: string;
  logo: string;
}

// social
export type SocialPlatform = "github" | "discord";

export interface SocialLink {
  label: SocialPlatform;
  href: string;
}

// search
export type SearchProvider = "algolia" | "kbar";

export interface SearchProviderConfig {
  provider: SearchProvider;
  config: object;
}

// TEMP contentlayer
interface SharedFields {
  title?: string;
  description?: string;
  image?: string;
  layout: string;
  showEditLink?: boolean;
  showToc?: boolean;
  showComments?: boolean;
  isDraft?: boolean;
  data: Array<string>;
}

interface ComputedFields {
  urlPath: string;
  editUrl?: string;
  date?: string;
}

export interface Page extends SharedFields, ComputedFields {}

export interface Blog extends SharedFields, ComputedFields {
  date: string; // TODO type?
  authors?: Array<string>;
  tags?: Array<string>;
}
