export type LogStatus = "Delivered" | "Sent" | "Read" | "Failed";
export type SenderType = "Staff Member" | "System";
export interface logRow {
    id: number;
    channel: "Email" | "SMS" | "WhatsApp";
    message: string;
    employee: string | null;
    date: string;
    time: string;
    status: LogStatus;
    sender: SenderType;
}