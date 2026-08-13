import { Status } from "@/@types/salon-owner/Statu.type";

export default function StatusBadge({
  status,
  statusStyles,
}: {
  status: Status;
  statusStyles: Record<Status, string>;
}) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-manrope font-semibold w-fit rounded-full ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
