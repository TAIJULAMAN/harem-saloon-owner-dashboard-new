import { Star, DollarSign, Clock } from "lucide-react";

export const serviceStatCardsData = [
  {
    id: 1,
    title: "Most Popular Service",
    value: "Classic Haircut",
    change: "342 bookings this month",
    icon: <Star className="w-5 h-5 text-[#8B5CF6]" />,
    iconBgColor: "bg-[#EDE9FE]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#8B5CF6]/[13%] to-[#8B5CF6]/[3%]",
  },
  {
    id: 2,
    title: "Most Profitable Service",
    value: "Balayage",
    change: "68% profit margin",
    icon: <DollarSign className="w-5 h-5 text-[#10B981]" />,
    iconBgColor: "bg-[#D1FAE5]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#10B981]/[13%] to-[#10B981]/[3%]",
  },
  {
    id: 3,
    title: "Average Service Duration",
    value: "42 mins",
    change: "-3 mins vs planned",
    icon: <Clock className="w-5 h-5 text-[#F59E0B]" />,
    iconBgColor: "bg-[#FEF3C7]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#F59E0B]/[13%] to-[#F59E0B]/[3%]",
  },
];
