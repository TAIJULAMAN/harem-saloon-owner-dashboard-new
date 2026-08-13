export interface Client {
  id: number | string;
  name: string;
  email?: string;
  avatar: string;
  phone: string;
  isStaff?: boolean;
}
