export type GiftCardStatus = "Used" | "No-Used" | "Active";
export interface GiftCard {
    id: number;
    amount: string;
    code: string;
    image: string;
    statuses: GiftCardStatus[];
}