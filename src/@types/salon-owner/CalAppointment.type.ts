export type AppStatus =
  | "Booked"
  | "Confirmed"
  | "Arrived"
  | "Started"
  | "Completed"
  | "Canceled";

export interface CalAppointment {
  id: string;
  clientName: string;
  service: string;
  date: Date;
  startTime: string;
  endTime: string;
  price: string;
  duration: string;
  status: AppStatus;
  employeeName: string;
  employeeId: string;
}
