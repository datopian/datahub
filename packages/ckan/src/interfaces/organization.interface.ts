import { Activity } from "./activity.interface";
import { Dataset, Tag } from "./dataset.interface";
import { User } from "./user.interface";

export interface Organization {
  id: string;
  name: string;
  title: string;
  display_name: string;
  type: string;
  description?: string;
  image_url?: string;
  image_display_url?: string;
  created?: string;
  is_organization: boolean;
  approval_status?: "approved";
  state: "active";
  packages?: Array<Dataset>;
  activity_stream?: Array<Activity>;
  users?: Array<User>;
  tags?: Array<Tag>;
}
