export type ServiceRecord = {
  id: string;
  name: string;
  category: string;
  categoryStyle: string;
  duration: string;
  postBreak: string;
  price: string;
  vat: string;
  iconIndex?: number;
};

export const categoryStyles: Record<string, string> = {
  "Category 1": "bg-[#EEF2FF] text-[#635BFF]",
  "Category 2": "bg-[#CCFBF1] text-[#14B8A6]",
  "Category 3": "bg-[#DCFCE7] text-[#22C55E]",
  "Category 4": "bg-[#FEF9C3] text-[#EAB308]",
  "Category 5": "bg-[#FCE7F3] text-[#EC4899]",
  "Category 6": "bg-[#F1F5F9] text-[#64748B]",
};

export const availableIcons = [
  "/AddServicesIcons/brushes_7429846.svg",
  "/AddServicesIcons/cosmetic_9113822.svg",
  "/AddServicesIcons/eyebrow_6215201.svg",
  "/AddServicesIcons/face-mask_11130176.svg",
  "/AddServicesIcons/face-massage_11130220.svg",
  "/AddServicesIcons/hair-comb_6275822.svg",
  "/AddServicesIcons/hair-dryer_5165414 (1).svg",
  "/AddServicesIcons/hair-dye_6275023.svg",
  "/AddServicesIcons/lotion_8536950.svg",
  "/AddServicesIcons/makeup_7429594.svg",
  "/AddServicesIcons/rf-lifting_7429746.svg",
  "/AddServicesIcons/scissors_6275622.svg",
  "/AddServicesIcons/skin-care_7429768.svg",
  "/AddServicesIcons/stone_6316765.svg",
  "/AddServicesIcons/straighten_6275474.svg",
];

export const mockMembers = [
  { id: 1, name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: 3, name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/100?img=9" },
  { id: 4, name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/100?img=2" },
];

export const initialServices: ServiceRecord[] = [
  { id: "1", name: "Haircut", category: "Category 1", categoryStyle: categoryStyles["Category 1"], duration: "45 min", postBreak: "15 min", price: "€ 35", vat: "€ 7", iconIndex: 0 },
  { id: "2", name: "Beard Trim", category: "Category 2", categoryStyle: categoryStyles["Category 2"], duration: "20 min", postBreak: "5 min", price: "€ 15", vat: "€ 3", iconIndex: 0 },
  { id: "3", name: "Hair Coloring", category: "Category 3", categoryStyle: categoryStyles["Category 3"], duration: "90 min", postBreak: "30 min", price: "€ 80", vat: "€ 16", iconIndex: 0 },
  { id: "4", name: "Wash & Blow Dry", category: "Category 4", categoryStyle: categoryStyles["Category 4"], duration: "30 min", postBreak: "10 min", price: "€ 25", vat: "€ 5", iconIndex: 0 },
  { id: "5", name: "Balayage", category: "Category 5", categoryStyle: categoryStyles["Category 5"], duration: "120 min", postBreak: "30 min", price: "€ 150", vat: "€ 30", iconIndex: 0 },
  { id: "6", name: "Ombre Hair Color", category: "Category 6", categoryStyle: categoryStyles["Category 6"], duration: "110 min", postBreak: "30 min", price: "€ 130", vat: "€ 26", iconIndex: 0 },
  { id: "7", name: "Perm", category: "Category 1", categoryStyle: categoryStyles["Category 1"], duration: "100 min", postBreak: "25 min", price: "€ 95", vat: "€ 19", iconIndex: 0 },
  { id: "8", name: "Hair Straightening", category: "Category 3", categoryStyle: categoryStyles["Category 3"], duration: "150 min", postBreak: "45 min", price: "€ 200", vat: "€ 40", iconIndex: 0 },
  { id: "9", name: "Keratin Treatment", category: "Category 5", categoryStyle: categoryStyles["Category 5"], duration: "120 min", postBreak: "30 min", price: "€ 180", vat: "€ 36", iconIndex: 0 },
  { id: "10", name: "Highlights", category: "Category 1", categoryStyle: categoryStyles["Category 1"], duration: "75 min", postBreak: "20 min", price: "€ 85", vat: "€ 17", iconIndex: 0 },
  { id: "11", name: "Scalp Massage", category: "Category 2", categoryStyle: categoryStyles["Category 2"], duration: "30 min", postBreak: "10 min", price: "€ 40", vat: "€ 8", iconIndex: 0 },
  { id: "12", name: "Hair Extensions", category: "Category 6", categoryStyle: categoryStyles["Category 6"], duration: "180 min", postBreak: "30 min", price: "€ 300", vat: "€ 60", iconIndex: 0 },
  { id: "13", name: "Manicure", category: "Category 4", categoryStyle: categoryStyles["Category 4"], duration: "45 min", postBreak: "15 min", price: "€ 25", vat: "€ 5", iconIndex: 0 },
  { id: "14", name: "Pedicure", category: "Category 4", categoryStyle: categoryStyles["Category 4"], duration: "60 min", postBreak: "15 min", price: "€ 35", vat: "€ 7", iconIndex: 0 },
  { id: "15", name: "Gel Nails", category: "Category 5", categoryStyle: categoryStyles["Category 5"], duration: "75 min", postBreak: "15 min", price: "€ 50", vat: "€ 10", iconIndex: 0 },
  { id: "16", name: "Acrylic Nails", category: "Category 5", categoryStyle: categoryStyles["Category 5"], duration: "90 min", postBreak: "20 min", price: "€ 60", vat: "€ 12", iconIndex: 0 },
  { id: "17", name: "Nail Art", category: "Category 3", categoryStyle: categoryStyles["Category 3"], duration: "30 min", postBreak: "5 min", price: "€ 15", vat: "€ 3", iconIndex: 0 },
  { id: "18", name: "Eyebrow Threading", category: "Category 1", categoryStyle: categoryStyles["Category 1"], duration: "15 min", postBreak: "5 min", price: "€ 12", vat: "€ 2", iconIndex: 0 },
  { id: "19", name: "Eyebrow Tinting", category: "Category 2", categoryStyle: categoryStyles["Category 2"], duration: "20 min", postBreak: "5 min", price: "€ 18", vat: "€ 4", iconIndex: 0 },
  { id: "20", name: "Facial", category: "Category 6", categoryStyle: categoryStyles["Category 6"], duration: "60 min", postBreak: "15 min", price: "€ 70", vat: "€ 14", iconIndex: 0 },
  { id: "21", name: "Makeup Application", category: "Category 3", categoryStyle: categoryStyles["Category 3"], duration: "45 min", postBreak: "15 min", price: "€ 60", vat: "€ 12", iconIndex: 0 },
  { id: "22", name: "Bridal Makeup", category: "Category 5", categoryStyle: categoryStyles["Category 5"], duration: "120 min", postBreak: "30 min", price: "€ 150", vat: "€ 30", iconIndex: 0 },
  { id: "23", name: "Full Body Massage", category: "Category 4", categoryStyle: categoryStyles["Category 4"], duration: "90 min", postBreak: "20 min", price: "€ 90", vat: "€ 18", iconIndex: 0 },
  { id: "24", name: "Waxing - Half Legs", category: "Category 2", categoryStyle: categoryStyles["Category 2"], duration: "30 min", postBreak: "10 min", price: "€ 25", vat: "€ 5", iconIndex: 0 },
  { id: "25", name: "Waxing - Full Body", category: "Category 6", categoryStyle: categoryStyles["Category 6"], duration: "120 min", postBreak: "30 min", price: "€ 120", vat: "€ 24", iconIndex: 0 },
];
