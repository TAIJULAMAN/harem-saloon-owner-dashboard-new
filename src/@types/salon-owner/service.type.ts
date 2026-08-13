export interface Service {
  id?: number;
  name: string;
  date?: string;
  price?: number | string;
  startTime?: string;
  duration?: string;
  employee?: string;
  employeeAvatar: string;
}

export interface ServiceRow {
  id?: string;
  name: string;
  date?: string;
  price: number | string;
  startTime?: string;
  duration?: string;
  employee?: string;
  employeeAvatar?: string;
}
