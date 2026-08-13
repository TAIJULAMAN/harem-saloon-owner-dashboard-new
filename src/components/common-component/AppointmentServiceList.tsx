import { ServiceRow } from "@/@types/salon-owner/service.type";
import { BadgePercent, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ITips from "./ITips";
import SendTipModal from "../saloonOwner/appointment/add-appointment/SendTipModal";
import AddDiscountModal from "../saloonOwner/appointment/add-appointment/AddDiscountModal";
import AddBottombar from "../saloonOwner/appointment/add-appointment/AddBottombar";

export default function AppointmentServiceList({
  DEFAULT_SERVICES,
  total,
}: {
  DEFAULT_SERVICES: ServiceRow[];
  total: number;
  onBack?: () => void;
  onSave?: () => void;
}) {
  const moreRef = useRef<HTMLDivElement>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [sendTipOpen, setSendTipOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node))
        setMoreOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <>
      {/* ── Modals ── */}
      <SendTipModal open={sendTipOpen} onClose={() => setSendTipOpen(false)} />
      <AddDiscountModal
        open={discountOpen}
        onClose={() => setDiscountOpen(false)}
      />

      <div className="bg-white rounded-xl p-[30px] border border-[#EFF4FA]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-semibold text-[#29343D]">Services</h3>
        </div>

        {/* ── Scrollable table wrapper — mobile scrolls, desktop stays full width ── */}
        <div className="overflow-x-auto -mx-[30px] px-[30px] mb-4">
          <div className="min-w-[640px]">
            <div className="rounded-xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-6 px-4 py-2.5 border-b border-[#EFF4FA]">
                {[
                  "Service",
                  "Date",
                  "Price",
                  "Start Time",
                  "Duration",
                  "Employee",
                ].map((h) => (
                  <span
                    key={h}
                    className="text-sm font-manrope text-[#29343D] font-semibold"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              {DEFAULT_SERVICES.map((s, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 items-center px-4 py-5 border-b border-[#EFF4FA] last:border-0"
                >
                  <span className="text-sm font-semibold font-manrope text-[#29343D]">
                    {s.name}
                  </span>
                  <span className="text-sm font-manrope font-normal text-[#29343D]">
                    {s.date ?? "—"}
                  </span>
                  <span className="text-sm font-manrope font-normal text-[#29343D]">
                    € {s.price}
                  </span>
                  <span className="text-sm font-manrope font-normal text-[#29343D]">
                    {s.startTime ?? "—"}
                  </span>
                  <span className="text-sm font-manrope font-normal text-[#29343D]">
                    {s.duration ?? "—"}
                  </span>

                  {/* Employee chip */}
                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 bg-[#F4F6FA] rounded-[10px] w-fit">
                    <Image
                      src="/avatar/icon1.png"
                      alt={s.employee ?? "Employee"}
                      width={48}
                      height={48}
                      className="rounded-[8px] object-cover"
                    />
                    <span className="text-sm flex items-center gap-4 font-semibold font-manrope text-[#29343D] truncate">
                      {s.employee ?? "—"}
                      <ChevronDown
                        strokeWidth={1.5}
                        size={20}
                        color="#29343D"
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ── end scrollable table wrapper ── */}

        {/* Order Summary */}
        <div className="border border-[#EFF4FA] rounded-xl p-4">
          <p className="text-sm font-semibold text-[#29343D] mb-3">
            Order Summary
          </p>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm text-[#526B7A]">
              <span>Tax</span>
              <span>0</span>
            </div>
            <div className="flex justify-between text-sm text-[#526B7A]">
              <span>Discount</span>
              <span>0</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#29343D] pt-2.5">
              <span>Total</span>
              <span>€ {total}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <AddBottombar
          moreRef={moreRef}
          setMoreOpen={setMoreOpen}
          moreOpen={moreOpen}
          icon={<ITips />}
          icon2={<BadgePercent size={15} color="#1C274C" />}
          listLable={"Add a Tip"}
          listLable2={"Add a Discount"}
          setAddNoteOpen={setSendTipOpen}
          setUpfrontOpen={setDiscountOpen}
        />
      </div>
    </>
  );
}
