import IPayments from "@/app/account-protal/svg/IPayments";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import GiftCardIcon from "../../dashboard/checkout/GiftCardIcon";
import ICard from "./ICard";
import QRIcon from "../../dashboard/checkout/QRIcon";

export default function RequestUpfrontPaymentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const PAYMENT_METHODS = [
    {
      key: "cash",
      label: "Cash",
      icon: <IPayments size={38} color="#635BFF" />,
    },
    {
      key: "giftcard",
      label: "Gift Card",
      icon: <GiftCardIcon size={65} color="#635BFF" />,
    },
    {
      key: "card",
      label: "Card Terminal",
      icon: <ICard size={30} color="#635BFF" />,
    },
    {
      key: "qr",
      label: "QR Code",
      icon: <QRIcon />,
    },
  ];

  const [amount, setAmount] = useState("");
  const [payMethod, setPayMethod] = useState<string | null>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-[746px] px-8 py-7 font-manrope">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[#1A1A2E]">
            Request upfront payment
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <X size={24} color="#29343D" />
          </button>
        </div>

        {/* Amount input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
            Ammount <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter ammount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-[#E0E6EB] rounded-[4px] px-4 py-3.5 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] transition-colors"
          />
        </div>

        {/* Payment Methods */}
        <div className="mb-7">
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-4">
            Payment Methods <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-[30px]">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.key}
                onClick={() => setPayMethod(m.key)}
                className={`flex flex-col items-center justify-center gap-4 py-8 rounded-2xl border transition-all cursor-pointer ${
                  payMethod === m.key
                    ? "border-[#635BFF] bg-[#F0EEFF]"
                    : "border-[#E8ECF0] bg-white hover:border-[#635BFF] hover:bg-[#FAFAFE]"
                }`}
              >
                <div className="w-20 h-20 rounded-full bg-[#DDDBFF] flex items-center justify-center">
                  {m.icon}
                </div>
                <span className="text-base font-semibold text-[#1A1A2E]">
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
