import { MousePointerClick, Tag, Users } from "lucide-react";

export const socialStatCardsData = [
  {
    id: 1,
    title: "Engagement to Booking",
    value: "4.2%",
    change: "+1.1% from last month",
    icon: <MousePointerClick className="w-5 h-5 text-[#8B5CF6]" />,
    iconBgColor: "bg-[#EDE9FE]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#8B5CF6]/[13%] to-[#8B5CF6]/[3%]",
  },
  {
    id: 2,
    title: "Promo Code Usage",
    value: "128 Uses",
    change: "SUMMER20 campaign",
    icon: <Tag className="w-5 h-5 text-[#10B981]" />,
    iconBgColor: "bg-[#D1FAE5]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#10B981]/[13%] to-[#10B981]/[3%]",
  },
  {
    id: 3,
    title: "Audience Growth",
    value: "+1,240",
    change: "New followers across platforms",
    icon: <Users className="w-5 h-5 text-[#3B82F6]" />,
    iconBgColor: "bg-[#DBEAFE]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#3B82F6]/[13%] to-[#3B82F6]/[3%]",
  },
];
