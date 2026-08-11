export type AppointmentStatus =
  | "Booked"
  | "Started"
  | "Canceled"
  | "Confirmed"
  | "Arrived"
  | "Completed";

export interface Appointment {
  id: string;
  client: {
    name: string;
    phone: string;
    avatarUrl?: string;
  };
  service: string;
  date: string;
  price: string;
  status: AppointmentStatus;
}

export const dummyAppointments: Appointment[] = [
  {
    id: "001",
    client: {
      name: "Maria Rodriguez",
      phone: "+39 345 678 9123",
      avatarUrl: "/avatar/icon1.png",
    },
    service: "Haircut",
    date: "5 Aug 2025 (10:00 AM - 11:00 AM)",
    price: "€170",
    status: "Booked",
  },
  {
    id: "002",
    client: {
      name: "John Smith",
      phone: "+1 234 567 8900",
      avatarUrl: "/avatar/icon2.png",
    },
    service: "Coloring",
    date: "5 Aug 2025 (11:30 AM - 01:00 PM)",
    price: "€250",
    status: "Started",
  },
  {
    id: "003",
    client: {
      name: "Emma Watson",
      phone: "+44 7700 900077",
      avatarUrl: "/avatar/icon3.png",
    },
    service: "Styling",
    date: "5 Aug 2025 (02:00 PM - 02:45 PM)",
    price: "€120",
    status: "Canceled",
  },
  {
    id: "004",
    client: {
      name: "Oliver Davis",
      phone: "+61 491 570 110",
      avatarUrl: "/avatar/icon1.png",
    },
    service: "Manicure",
    date: "6 Aug 2025 (09:00 AM - 10:00 AM)",
    price: "€50",
    status: "Confirmed",
  },
  {
    id: "005",
    client: {
      name: "Sophia Taylor",
      phone: "+33 6 12 34 56 78",
      avatarUrl: "/avatar/icon2.png",
    },
    service: "Haircut",
    date: "6 Aug 2025 (10:30 AM - 11:30 AM)",
    price: "€160",
    status: "Arrived",
  },
  {
    id: "006",
    client: {
      name: "Liam Wilson",
      phone: "+49 151 23456789",
      avatarUrl: "/avatar/icon3.png",
    },
    service: "Coloring",
    date: "6 Aug 2025 (01:00 PM - 03:00 PM)",
    price: "€280",
    status: "Completed",
  },
  {
    id: "007",
    client: {
      name: "Isabella Moore",
      phone: "+39 345 111 2222",
      avatarUrl: "/avatar/icon1.png",
    },
    service: "Styling",
    date: "7 Aug 2025 (10:00 AM - 11:00 AM)",
    price: "€130",
    status: "Arrived",
  },
  {
    id: "008",
    client: {
      name: "Mason Martin",
      phone: "+1 555 123 4567",
      avatarUrl: "/avatar/icon2.png",
    },
    service: "Haircut",
    date: "7 Aug 2025 (11:30 AM - 12:30 PM)",
    price: "€150",
    status: "Canceled",
  },
  {
    id: "009",
    client: {
      name: "Mia Jackson",
      phone: "+44 7700 111222",
      avatarUrl: "/avatar/icon3.png",
    },
    service: "Manicure",
    date: "7 Aug 2025 (02:00 PM - 03:00 PM)",
    price: "€60",
    status: "Booked",
  },
  {
    id: "010",
    client: {
      name: "James White",
      phone: "+61 491 111 222",
      avatarUrl: "/avatar/icon1.png",
    },
    service: "Haircut",
    date: "8 Aug 2025 (09:00 AM - 10:00 AM)",
    price: "€170",
    status: "Confirmed",
  },
  {
    id: "011",
    client: {
      name: "Charlotte Harris",
      phone: "+33 6 98 76 54 32",
      avatarUrl: "/avatar/icon2.png",
    },
    service: "Coloring",
    date: "8 Aug 2025 (10:30 AM - 12:30 PM)",
    price: "€260",
    status: "Started",
  },
  {
    id: "012",
    client: {
      name: "Benjamin Clark",
      phone: "+49 151 98765432",
      avatarUrl: "/avatar/icon3.png",
    },
    service: "Styling",
    date: "8 Aug 2025 (01:00 PM - 02:00 PM)",
    price: "€110",
    status: "Completed",
  },
  {
    id: "013",
    client: {
      name: "Amelia Lewis",
      phone: "+39 345 999 8888",
      avatarUrl: "/avatar/icon1.png",
    },
    service: "Manicure",
    date: "9 Aug 2025 (10:00 AM - 11:00 AM)",
    price: "€55",
    status: "Booked",
  },
  {
    id: "014",
    client: {
      name: "Lucas Walker",
      phone: "+1 555 987 6543",
      avatarUrl: "/avatar/icon1.png",
    },
    service: "Haircut",
    date: "9 Aug 2025 (11:30 AM - 12:30 PM)",
    price: "€165",
    status: "Arrived",
  },
  {
    id: "015",
    client: {
      name: "Harper Hall",
      phone: "+44 7700 333444",
      avatarUrl: "/avatar/icon3.png",
    },
    service: "Coloring",
    date: "9 Aug 2025 (02:00 PM - 04:00 PM)",
    price: "€290",
    status: "Confirmed",
  },
  {
    id: "016",
    client: {
      name: "Henry Allen",
      phone: "+61 491 333 444",
      avatarUrl: "/avatar/icon1.png",
    },
    service: "Styling",
    date: "10 Aug 2025 (09:00 AM - 10:00 AM)",
    price: "€125",
    status: "Canceled",
  },
  {
    id: "017",
    client: {
      name: "Evelyn Young",
      phone: "+33 6 11 22 33 44",
      avatarUrl: "/avatar/icon2.png",
    },
    service: "Haircut",
    date: "10 Aug 2025 (10:30 AM - 11:30 AM)",
    price: "€180",
    status: "Completed",
  },
  {
    id: "018",
    client: {
      name: "Alexander King",
      phone: "+49 151 11223344",
      avatarUrl: "/avatar/icon3.png",
    },
    service: "Manicure",
    date: "10 Aug 2025 (01:00 PM - 02:00 PM)",
    price: "€45",
    status: "Booked",
  },
  {
    id: "019",
    client: {
      name: "Abigail Wright",
      phone: "+39 345 444 5555",
      avatarUrl: "/avatar/icon2.png",
    },
    service: "Coloring",
    date: "11 Aug 2025 (10:00 AM - 12:00 PM)",
    price: "€240",
    status: "Started",
  },
  {
    id: "020",
    client: {
      name: "Sebastian Scott",
      phone: "+1 555 111 2222",
      avatarUrl: "/avatar/icon1.png",
    },
    service: "Styling",
    date: "11 Aug 2025 (01:00 PM - 02:00 PM)",
    price: "€135",
    status: "Confirmed",
  },
  {
    id: "021",
    client: {
      name: "Emily Green",
      phone: "+44 7700 555666",
      avatarUrl: "/avatar/icon2.png",
    },
    service: "Haircut",
    date: "12 Aug 2025 (09:00 AM - 10:00 AM)",
    price: "€175",
    status: "Arrived",
  },
  {
    id: "022",
    client: {
      name: "Jack Baker",
      phone: "+61 491 555 666",
      avatarUrl: "/avatar/icon1.png",
    },
    service: "Manicure",
    date: "12 Aug 2025 (10:30 AM - 11:30 AM)",
    price: "€65",
    status: "Completed",
  },
  {
    id: "023",
    client: {
      name: "Avery Adams",
      phone: "+33 6 55 66 77 88",
      avatarUrl: "/avatar/icon3.png",
    },
    service: "Coloring",
    date: "12 Aug 2025 (01:00 PM - 03:00 PM)",
    price: "€270",
    status: "Canceled",
  },
  {
    id: "024",
    client: {
      name: "Owen Nelson",
      phone: "+49 151 55667788",
      avatarUrl: "/avatar/icon2.png",
    },
    service: "Styling",
    date: "13 Aug 2025 (10:00 AM - 11:00 AM)",
    price: "€140",
    status: "Booked",
  },
  {
    id: "025",
    client: {
      name: "Chloe Carter",
      phone: "+39 345 777 8888",
      avatarUrl: "/avatar/icon1.png",
    },
    service: "Haircut",
    date: "13 Aug 2025 (11:30 AM - 12:30 PM)",
    price: "€155",
    status: "Confirmed",
  },
];

export interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
}

export const mockTeamMembers: TeamMember[] = [
  { id: "all", name: "All Team", avatarUrl: "/avatar/icon1.png" },
  { id: "1", name: "Maria Rodriguez", avatarUrl: "/avatar/icon1.png" },
  { id: "2", name: "Maria Rodriguez", avatarUrl: "/avatar/icon2.png" },
  { id: "3", name: "Maria Rodriguez", avatarUrl: "/avatar/icon3.png" },
  { id: "4", name: "Maria Rodriguez", avatarUrl: "/avatar/icon1.png" },
  { id: "5", name: "Maria Rodriguez", avatarUrl: "/avatar/icon2.png" },
  { id: "6", name: "Maria Rodriguez", avatarUrl: "/avatar/icon3.png" },
];

export interface ExceptionClient {
  id: string;
  name: string;
  phone: string;
  avatarEmoji: string;
  avatarBg: string;
}

export const mockExceptionClients: ExceptionClient[] = [
  {
    id: "c1",
    name: "Maria Fernandez",
    phone: "+39 345 678 9123",
    avatarEmoji: "/avatar/icon1.png",
    avatarBg: "bg-pink-100 border-pink-200 text-pink-600",
  },
  {
    id: "c2",
    name: "Virgie Sutton",
    phone: "+39 345 678 9123",
    avatarEmoji: "/avatar/icon2.png",
    avatarBg: "bg-purple-100 border-purple-200 text-purple-600",
  },
  {
    id: "c3",
    name: "Lois Gregory",
    phone: "+39 345 678 9123",
    avatarEmoji: "/avatar/icon3.png",
    avatarBg: "bg-teal-100 border-teal-200 text-teal-600",
  },
  {
    id: "c4",
    name: "Amelia Chen",
    phone: "+1 415 555 2671",
    avatarEmoji: "/avatar/icon1.png",
    avatarBg: "bg-amber-100 border-amber-200 text-amber-600",
  },
  {
    id: "c5",
    name: "Marcus Brody",
    phone: "+44 20 7946 0958",
    avatarEmoji: "/avatar/icon2.png",
    avatarBg: "bg-sky-100 border-sky-200 text-sky-600",
  },
];
