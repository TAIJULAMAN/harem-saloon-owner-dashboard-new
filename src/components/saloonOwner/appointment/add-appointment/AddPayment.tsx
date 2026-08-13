"use client";

import { useEffect, useRef, useState } from "react";
import AppointmentServiceList from "../../common-component/AppointmentServiceList";
import { ServiceRow } from "@/@types/salon-owner/service.type";
import CashIcon from "../../dashboard/checkout/CashIcon";
import GiftCardIcon from "../../dashboard/checkout/GiftCardIcon";
import CardIcon from "../../dashboard/checkout/CardIcon";
import QRIcon from "../../dashboard/checkout/QRIcon";

const PAYMENT_SERVICES: ServiceRow[] = [
  {
    id: "sr1",
    name: "Haircut",
    date: "02/08/2025",
    price: "170",
    startTime: "11:00",
    duration: "15 min",
    employee: "Maria Rodriguez",
    employeeAvatar: "/images/avator.png",
  },
  {
    id: "sr2",
    name: "Makeup",
    date: "02/08/2025",
    price: "170",
    startTime: "11:15",
    duration: "45 min",
    employee: "Maria Rodriguez",
    employeeAvatar: "/images/avator.png",
  },
];

const PAYMENT_METHODS_DATA = [
  {
    key: "cash",
    label: "Cash",
    icon: <CashIcon />,
  },
  {
    key: "gift",
    label: "Gift Card",
    icon: <GiftCardIcon size={65} color="#635BFF" />,
  },
  {
    key: "card",
    label: "Card Terminal",
    icon: <CardIcon />,
  },
  {
    key: "qr",
    label: "QR Code",
    icon: <QRIcon />,
  },
];

export default function AddPayment({ onBack }: { onBack: () => void }) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const total = PAYMENT_SERVICES.reduce((a, s) => a + Number(s.price), 0);

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Payment Methods */}
        <div className="bg-white rounded-xl border border-[#E0E6EB] p-[30px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-manrope text-[#29343D]">
              Payment Methods
            </h2>

            {/* 3 dot menu */}
            <div ref={moreRef} className="relative">
              {moreOpen && (
                <div className="absolute right-0 mt-2 w-[180px] bg-white border border-[#E0E6EB] rounded-lg shadow-lg z-20">
                  <button
                    onClick={() => {
                      setMoreOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA]"
                  >
                    Send Tip
                  </button>

                  <button
                    onClick={() => {
                      setMoreOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA]"
                  >
                    Add Discount
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PAYMENT_METHODS_DATA.map((method) => (
              <button
                key={method.key}
                onClick={() => setSelectedPayment(method.key)}
                className={`flex flex-col items-center justify-center gap-3 py-6 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedPayment === method.key
                    ? "border-[#635BFF] bg-[#F0EEFF]"
                    : "border-[#E8ECF0] bg-white hover:border-[#635BFF] hover:bg-[#FAFAFE]"
                }`}
              >
                <div className="w-15 h-15 lg:h-20 lg:w-20  rounded-full bg-[#DDDBFF] flex items-center justify-center">
                  {method.icon}
                </div>

                <span className="text-lg font-semibold font-manrope text-[#29343D]">
                  {method.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Services table */}
        <AppointmentServiceList
          DEFAULT_SERVICES={PAYMENT_SERVICES}
          total={total}
        />
      </div>
    </>
  );
}
