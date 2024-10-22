export interface DirectoryUser {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  first_name_status: string;
  last_name_status: string;
  phone_status: string;
  email_status: string;
  created_at: Date;
}
export enum AttributeStatus {
  WEB_VISIBLE = "WEB_VISIBLE",
  PRIVATE = "PRIVATE",
}