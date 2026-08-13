import { Status } from "./Statu.type";

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  scheduledDate: string;
  price: string;
  status: Status;
}
