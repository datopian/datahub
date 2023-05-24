import { User } from "./user.interface";

export interface Activity {
  id: string;
  timestamp: string;
  user_id: string;
  object_id?: string;
  activity_type?: string;
  user_data?: User;
  data?: {
    package?: {
      title?: string;
    };
  };
}
