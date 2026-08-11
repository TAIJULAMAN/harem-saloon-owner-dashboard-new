import { Repeat, Heart, Coins } from "lucide-react";

export type AllergyColor = "red" | "green" | "blue" | "yellow" | "purple" | "pink" | "orange";

export interface ClientData {
  id: string;
  name: string;
  email: string;
  telephone: string;
  lastAppointment: string;
  allergy: {
    name: string;
    color: AllergyColor;
  };
  createdAt: string;
  avatarUrl: string;
  avatarBg: string;
}

const generateMockClients = (): ClientData[] => {
  const clients: ClientData[] = [];
  const colors: AllergyColor[] = ["yellow", "purple", "pink"];
  const bgs = ["bg-[#FCE7F3]", "bg-[#E2E8F0]", "bg-[#CCFBF1]", "bg-[#FEE2E2]", "bg-[#E0E7FF]"];

  for (let i = 1; i <= 25; i++) {
    clients.push({
      id: `client_${i}`,
      name: "Maria Rodriguez",
      email: "maria@beautywellness.com",
      telephone: "+39 345 678 9123",
      lastAppointment: "02/09/2025",
      allergy: {
        name: "Fragrances Allergie",
        color: colors[i % 3] as AllergyColor
      },
      createdAt: "08/08/2024",
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=Maria${i}&backgroundColor=transparent`,
      avatarBg: bgs[i % 5]
    });
  }
  return clients;
};

export const dummyClientsData = generateMockClients();

export const statCardsDemoData = [
  {
    id: 1,
    title: "New vs. Returning Clients",
    value: "25% / 75%",
    change: "+5% new clients",
    icon: <Repeat className="w-5 h-5 text-[#8B5CF6]" />,
    iconBgColor: "bg-[#EDE9FE]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#8B5CF6]/[13%] to-[#8B5CF6]/[3%]",
  },
  {
    id: 2,
    title: "Average Client Lifespan",
    value: "2.4 Years",
    change: "+2 months vs last year",
    icon: <Heart className="w-5 h-5 text-[#EC4899]" />,
    iconBgColor: "bg-[#FCE7F3]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#EC4899]/[13%] to-[#EC4899]/[3%]",
  },
  {
    id: 3,
    title: "Client Acquisition Cost",
    value: "€ 15.50",
    change: "-€ 2.10 from last month",
    icon: <Coins className="w-5 h-5 text-[#10B981]" />,
    iconBgColor: "bg-[#D1FAE5]",
    iconShadowColor: "",
    cardStyle: "bg-gradient-to-b from-[#10B981]/[13%] to-[#10B981]/[3%]",
  },

]
