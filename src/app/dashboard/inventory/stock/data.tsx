import { AlertTriangle, Wallet, Activity } from "lucide-react";

export const inventoryStatCardsData = [
  {
    id: 1,
    title: "Low Stock Alerts",
    value: "14 Items",
    change: "Below par levels",
    icon: <AlertTriangle className="w-5 h-5 text-[#EF4444]" />,
    iconBgColor: "bg-[#FEE2E2]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#EF4444]/[13%] to-[#EF4444]/[3%]",
  },
  {
    id: 2,
    title: "Total Inventory Value",
    value: "€ 12,450",
    change: "+€ 450 since last count",
    icon: <Wallet className="w-5 h-5 text-[#3B82F6]" />,
    iconBgColor: "bg-[#DBEAFE]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#3B82F6]/[13%] to-[#3B82F6]/[3%]",
  },
  {
    id: 3,
    title: "Retail Sell-Through Rate",
    value: "42%",
    change: "+5% vs last month",
    icon: <Activity className="w-5 h-5 text-[#10B981]" />,
    iconBgColor: "bg-[#D1FAE5]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#10B981]/[13%] to-[#10B981]/[3%]",
  },
];
