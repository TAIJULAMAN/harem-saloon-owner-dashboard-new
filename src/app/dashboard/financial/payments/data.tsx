import { TrendingUp, Banknote, Ticket } from "lucide-react";

export const financialStatCardsData = [
  {
    id: 1,
    title: "Net Profit Margin",
    value: "28.4%",
    change: "+2.1% from last month",
    icon: <TrendingUp className="w-5 h-5 text-[#10B981]" />,
    iconBgColor: "bg-[#D1FAE5]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#10B981]/[13%] to-[#10B981]/[3%]",
  },
  {
    id: 2,
    title: "Current Cash Flow",
    value: "+€ 4,250",
    change: "Positive trend",
    icon: <Banknote className="w-5 h-5 text-[#3B82F6]" />,
    iconBgColor: "bg-[#DBEAFE]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#3B82F6]/[13%] to-[#3B82F6]/[3%]",
  },
  {
    id: 3,
    title: "Outstanding Gift Cards",
    value: "€ 3,840",
    change: "Unredeemed liability",
    icon: <Ticket className="w-5 h-5 text-[#F59E0B]" />,
    iconBgColor: "bg-[#FEF3C7]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#F59E0B]/[13%] to-[#F59E0B]/[3%]",
  },
];
