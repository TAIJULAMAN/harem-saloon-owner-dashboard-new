"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Plus, ChevronDown, Trash2 } from "lucide-react";
import AddServiceModal from "./AddServiceModal";
import RequestUpfrontPaymentModal from "./RequestUpfrontPaymentModal";
import AddNoteModal from "./AddNoteModal";
import AddBottombar from "./AddBottombar";
import IListIcon from "./IListIcon";
import ICard from "./ICard";

interface ServiceRow {
  id: string;
  name: string;
  date: string;
  price: number;
  startTime: string;
  duration: string;
  employee: string;
  employeeAvatar: string;
}

const INITIAL_SERVICES: ServiceRow[] = [
  {
    id: "sr1",
    name: "Haircut",
    date: "02/08/2025",
    price: 170,
    startTime: "11:00",
    duration: "15 min",
    employee: "Maria Rodriguez",
    employeeAvatar: "/images/avator.png",
  },
];

export default function ReviewAppointmentTable() {
  const [services, setServices] = useState<ServiceRow[]>(INITIAL_SERVICES);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [upfrontOpen, setUpfrontOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node))
        setMoreOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  function handleAddService(name: string) {
    setServices((prev) => [
      ...prev,
      {
        id: `sr${Date.now()}`,
        name,
        date: "02/08/2025",
        price: 170,
        startTime: "11:00",
        duration: "15 min",
        employee: "Maria Rodriguez",
        employeeAvatar: "/images/avator.png",
      },
    ]);
  }

  const totalTime = services.reduce((acc, s) => acc + parseInt(s.duration), 0);
  const totalPrice = services.reduce((acc, s) => acc + s.price, 0);

  return (
    <>
      {/* â”€â”€ Modals â”€â”€ */}
      <AddServiceModal
        open={addServiceOpen}
        onClose={() => setAddServiceOpen(false)}
        onSave={handleAddService}
      />
      <AddNoteModal open={addNoteOpen} onClose={() => setAddNoteOpen(false)} />
      <RequestUpfrontPaymentModal
        open={upfrontOpen}
        onClose={() => setUpfrontOpen(false)}
      />

      <div className="flex flex-col font-manrope">
        {/* â”€â”€ Table card â”€â”€ */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] px-8 py-7">
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-6">
            Review Appointment
          </h2>

          {/* â”€â”€ Scrollable table wrapper (mobile: scrolls, desktop: full width) â”€â”€ */}
          <div className="overflow-x-auto -mx-8 px-8">
            <div className="min-w-[700px]">
              {/* Table header */}
              <div className="grid grid-cols-[1.4fr_1.4fr_0.9fr_1fr_1fr_2.2fr_44px] pb-4 border-b border-[#F0F2F5]">
                {[
                  "Service",
                  "Date",
                  "Price",
                  "Start Time",
                  "Duration",
                  "Employee",
                  "",
                ].map((h, i) => (
                  <p key={i} className="text-sm font-semibold text-[#1A1A2E]">
                    {h}
                  </p>
                ))}
              </div>

              {/* Service rows */}
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="grid grid-cols-[1.4fr_1.4fr_0.9fr_1fr_1fr_2.2fr_44px] items-center py-6 border-b border-[#F0F2F5]"
                >
                  <p className="text-base text-[#29343D] font-semibold">
                    {svc.name}
                  </p>
                  <p className="text-base text-[#29343D]">{svc.date}</p>
                  <p className="text-base text-[#29343D]">â‚¬ {svc.price}</p>
                  <p className="text-base text-[#29343D]">{svc.startTime}</p>
                  <p className="text-base text-[#29343D]">{svc.duration}</p>

                  {/* Employee chip */}
                  <div className="flex items-center gap-4 p-2 rounded-xl bg-[#EFF4FA] w-fit">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#F5E8FF]">
                      <Image
                        src={svc.employeeAvatar}
                        alt={svc.employee}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-base font-semibold text-[#1A1A2E] whitespace-nowrap">
                      {svc.employee}
                    </span>
                    <ChevronDown
                      size={24}
                      className="text-[#29343D] shrink-0"
                    />
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      setServices((prev) => prev.filter((s) => s.id !== svc.id))
                    }
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 size={24} color="#FF6692" />
                  </button>
                </div>
              ))}

              {/* Add Service + Total Time row */}
              <div className="grid grid-cols-[1.4fr_1.4fr_0.9fr_1fr_1fr_2.2fr_44px] items-center pt-5">
                <button
                  onClick={() => setAddServiceOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-[#DDDBFF] hover:bg-[#E0DEFF] text-[#635BFF] text-sm font-semibold rounded-[8px] transition-colors cursor-pointer w-fit"
                >
                  <Plus size={14} strokeWidth={2.5} />
                  Add Service
                </button>

                {/* empty: date, price */}
                <div />
                <div />

                {/* Total Time */}
                <div className="col-span-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#29343D]">
                    Total Time
                  </span>
                  <span className="text-sm font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-400">
                    {totalTime} min
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* â”€â”€ end scrollable table wrapper â”€â”€ */}

          {/* â”€â”€ Total bar â”€â”€ */}
          <div className="mt-[48px] bg-white rounded-xl border border-[#EBEBEB] p-[30px] flex items-center justify-between">
            <span className="text-base font-bold text-[#1A1A2E]">Total</span>
            <span className="text-base font-bold text-[#1A1A2E]">
              â‚¬ {totalPrice}
            </span>
          </div>

          {/* â”€â”€ Bottom action bar â”€â”€ */}
          <AddBottombar
            moreRef={moreRef}
            setMoreOpen={setMoreOpen}
            moreOpen={moreOpen}
            setAddNoteOpen={setAddNoteOpen}
            setUpfrontOpen={setUpfrontOpen}
            icon={<IListIcon size={18} color="#29343D" />}
            icon2={<ICard size={16} color="#29343D" />}
            listLable={"Add a Note"}
            listLable2={"Request upfront payment"}
          />
        </div>
      </div>
    </>
  );
}
