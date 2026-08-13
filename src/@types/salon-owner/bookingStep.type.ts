
export type StepState = "done" | "active" | "todo" | "canceled";

export interface BookingStep {
  time: string;
  service: string;
  staff: string;
  state: StepState;
}