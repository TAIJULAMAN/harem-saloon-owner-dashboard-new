"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Client } from "@/@types/salon-owner/Client.type";
import IUser from "@/components/svg/IUser";

const RECENT_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Maria Fernandez",
    phone: "+39 345 678 9123",
    avatar: "/avatar/icon1.png",
  },
  {
    id: "c2",
    name: "Virgie Sutton",
    phone: "+39 345 678 9123",
    avatar: "/avatar/icon2.png",
  },
  {
    id: "c3",
    name: "Virgie Sutton",
    phone: "+39 345 678 9123",
    avatar: "/avatar/icon3.png",
  },
  {
    id: "c4",
    name: "Lois Gregory",
    phone: "Staff",
    avatar: "/avatar/icon1.png",
    isStaff: true,
  },
];

function WalkInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
    >
      <rect width="80" height="80" rx="40" fill="#DDDBFF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.807 19.3488C39.5947 19.3488 37.8012 21.098 37.8012 23.2558C37.8012 25.4135 39.5947 27.1627 41.807 27.1627C44.0194 27.1627 45.8129 25.4135 45.8129 23.2558C45.8129 21.098 44.0194 19.3488 41.807 19.3488ZM34.3676 23.2558C34.3676 19.2485 37.6983 16 41.807 16C45.9158 16 49.2465 19.2485 49.2465 23.2558C49.2465 27.263 45.9158 30.5116 41.807 30.5116C37.6983 30.5116 34.3676 27.263 34.3676 23.2558ZM44.1598 37.2164C44.0726 37.2103 43.9634 37.2092 43.5693 37.2092H41.0717L40.863 39.2442C40.4646 43.1298 40.3261 44.6911 40.682 46.1685C41.0379 47.6459 41.8748 48.9837 44.0057 52.2897L49.8997 61.4342C50.4043 62.2171 50.1627 63.2508 49.3599 63.743C48.5572 64.2351 47.4974 63.9994 46.9928 63.2165L41.0987 54.072C41.0427 53.985 40.9872 53.8989 40.9323 53.8138C39.0213 50.8499 37.842 49.021 37.3394 46.9345C36.8367 44.848 37.0575 42.6982 37.4153 39.2144C37.4256 39.1144 37.436 39.0133 37.4464 38.911L37.6207 37.2113C36.4735 37.217 35.6249 37.2387 34.9397 37.3198C34.0763 37.422 33.6735 37.5999 33.3883 37.823C33.103 38.0462 32.8376 38.3911 32.548 39.191C32.2428 40.0339 31.98 41.1742 31.5888 42.891L30.8931 45.9445C30.6874 46.8472 29.7703 47.4164 28.8447 47.2158C27.9192 47.0152 27.3356 46.1208 27.5412 45.218L28.2593 42.0664C28.6221 40.4738 28.9276 39.1331 29.3103 38.076C29.7165 36.9541 30.2697 35.9698 31.2398 35.2108C32.2098 34.4519 33.3151 34.1387 34.5261 33.9953C35.6672 33.8603 37.0754 33.8603 38.7481 33.8604L43.5693 33.8604C43.5883 33.8604 43.6071 33.8604 43.6257 33.8604C43.9372 33.8603 44.1791 33.8603 44.4054 33.8761C46.9554 34.0544 49.1415 35.7192 49.9374 38.0887C50.008 38.299 50.0666 38.5279 50.1421 38.8225L50.1558 38.876C50.2843 39.3772 50.3225 39.5195 50.3579 39.6189C50.8392 40.972 52.2925 41.7501 53.7213 41.4197C53.8263 41.3954 53.9699 41.3505 54.4724 41.1871L56.1431 40.644C57.0426 40.3515 58.0149 40.8256 58.3147 41.7029C58.6145 42.5802 58.1284 43.5285 57.2289 43.8209L55.5582 44.3641C55.5331 44.3722 55.5084 44.3803 55.484 44.3882C55.0903 44.5163 54.788 44.6146 54.5135 44.6781C51.3701 45.405 48.1728 43.6932 47.114 40.7165C47.0215 40.4565 46.9443 40.155 46.8437 39.7622C46.8374 39.7379 46.8311 39.7133 46.8247 39.6882C46.7291 39.3153 46.7016 39.2122 46.6744 39.1312C46.3126 38.0541 45.3189 37.2974 44.1598 37.2164ZM37.0367 50.8857C37.8256 51.3987 38.0388 52.4383 37.5128 53.2077L30.6456 63.2542C30.1197 64.0236 29.0538 64.2315 28.2649 63.7186C27.4759 63.2056 27.2628 62.166 27.7887 61.3966L34.6559 51.3501C35.1819 50.5807 36.2478 50.3728 37.0367 50.8857Z"
        fill="#635BFF"
      />
    </svg>
  );
}

function AddClientIcon() {
  return <IUser width={40} height={40} color="#635BFF" />;
}

export default function AddAppontClinetSection({
  selectedClient,
  onSelectClient,
}: {
  selectedClient: string | null;
  onSelectClient: (id: string) => void;
}) {
  const [clientSearch, setClientSearch] = useState("");

  const filteredClients = RECENT_CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBEB] px-8 py-7 w-full font-manrope">
      {/* â”€â”€ Header row â”€â”€ */}
      <div className="flex items-center flex-wrap gap-2 justify-between mb-7">
        <h2 className="text-lg font-bold text-[#29343D] font-manrope">
          Client
        </h2>

        {/* Search bar â€” full width on right */}
        <div className="w-[316px] flex items-center gap-2.5 px-4 py-2.5 border border-[#E0E6EB] rounded-[10px] bg-white">
          <Search size={18} className="text-[#29343D] shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={clientSearch}
            onChange={(e) => setClientSearch(e.target.value)}
            className="flex-1 text-sm font-manrope text-[#29343D] placeholder-[#AFAFAF] outline-none bg-transparent"
          />
        </div>
      </div>

      {/* â”€â”€ Walk-In + Add New Client â”€â”€ */}
      <div className="flex flex-wrap gap-[30px] mb-8">
        {/* Walk-In */}
        <button className="w-full md:w-[255px] h-[174px] flex flex-col items-center justify-center gap-4 border border-[#E8ECF0] rounded-2xl hover:border-[#635BFF] hover:bg-[#FAFAFE] transition-all cursor-pointer group">
          <div className="w-20 h-20 rounded-full bg-[#DDDBFF] flex items-center justify-center group-hover:bg-[#E0DEFF] transition-colors">
            <WalkInIcon />
          </div>
          <span className="text-[18px] font-semibold text-[#29343D]">
            Walk-In
          </span>
        </button>

        {/* Add New Client */}
        <button className="w-full md:w-[255px] h-[174px] flex flex-col items-center justify-center gap-4 border border-[#E8ECF0] rounded-2xl hover:border-[#635BFF] hover:bg-[#FAFAFE] transition-all cursor-pointer group">
          <div className="w-20 h-20 rounded-full bg-[#DDDBFF] flex items-center justify-center group-hover:bg-[#E0DEFF] transition-colors">
            <AddClientIcon />
          </div>
          <span className="text-[18px] font-semibold text-[#29343D]">
            Add New Client
          </span>
        </button>
      </div>

      <div>
        <p className="text-sm font-semibold text-[#29343D] mb-4">
          Recently Scheduled Clients
        </p>

        <div className="grid gap-[30px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {filteredClients.map((client) => {
            const isSelected = selectedClient === client.id;
            return (
              <button
                key={client.id}
                onClick={() => onSelectClient(client.id as string)}
                className={`flex flex-col items-center justify-center gap-3 py-8 border-2 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#635BFF] bg-[#F1F2FE]"
                    : "border-[#EBEBEB] bg-white hover:border-[#635BFF] hover:bg-[#FAFAFE]"
                }`}
              >
                {/* Avatar */}
                <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden">
                  <Image
                    src={client.avatar}
                    alt={client.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name + phone */}
                <div className="text-center px-2">
                  <p
                    className={`text-[18px] font-bold leading-snug text-[#29343D]`}
                  >
                    {client.name}
                  </p>
                  <p className="text-sm text-[#98A4AE] mt-1 font-normal">
                    {client.phone}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
