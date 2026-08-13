import { BookingStep, StepState } from "@/@types/salon-owner/bookingStep.type";
import { Status } from "@/@types/salon-owner/Statu.type";

export default function GetSteps(status: Status): BookingStep[] {
  const base = [
    { time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
    { time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
    { time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
  ];
  switch (status) {
    case "Booked":
    case "Confirmed":
      return base.map((s) => ({ ...s, state: "todo" as StepState }));
    case "Arrived":
      return [
        { ...base[0], state: "active" as StepState },
        { ...base[1], state: "todo" as StepState },
        { ...base[2], state: "todo" as StepState },
      ];
    case "Started":
      return [
        { ...base[0], state: "done" as StepState },
        { ...base[1], state: "active" as StepState },
        { ...base[2], state: "todo" as StepState },
      ];
    case "Completed":
      return base.map((s) => ({ ...s, state: "done" as StepState }));
    case "Canceled":
      return base.map((s) => ({ ...s, state: "canceled" as StepState }));
    default:
      return base.map((s) => ({ ...s, state: "todo" as StepState }));
  }
}
