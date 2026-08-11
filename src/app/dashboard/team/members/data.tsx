import { TrendingUp, Clock, CreditCard } from "lucide-react";

export const teamStatCardsData = [
  {
    id: 1,
    title: "Revenue per Employee",
    value: "€ 3,450",
    change: "+8% from last month",
    icon: <TrendingUp className="w-5 h-5 text-[#3B82F6]" />,
    iconBgColor: "bg-[#DBEAFE]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#3B82F6]/[13%] to-[#3B82F6]/[3%]",
  },
  {
    id: 2,
    title: "Staff Utilization",
    value: "82%",
    change: "Optimal range",
    icon: <Clock className="w-5 h-5 text-[#F59E0B]" />,
    iconBgColor: "bg-[#FEF3C7]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#F59E0B]/[13%] to-[#F59E0B]/[3%]",
  },
  {
    id: 3,
    title: "Commissions Pending",
    value: "€ 1,240",
    change: "To be paid this week",
    icon: <CreditCard className="w-5 h-5 text-[#8B5CF6]" />,
    iconBgColor: "bg-[#EDE9FE]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#8B5CF6]/[13%] to-[#8B5CF6]/[3%]",
  },
];
