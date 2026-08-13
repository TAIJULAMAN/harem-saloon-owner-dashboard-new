import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AddServiceModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const SERVICE_OPTIONS = [
    "Haircut",
    "Makeup",
    "Hair Color",
    "Facial",
    "Massage",
    "Manicure",
    "Pedicure",
  ];
  const [selected, setSelected] = useState(SERVICE_OPTIONS[0]);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

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
      <div className="bg-white rounded-xl shadow-2xl w-[698px] px-7 py-6 font-manrope">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h3 className="text-base font-bold text-[#1A1A2E]">Add Service</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <X size={18} className="text-[#29343D]" />
          </button>
        </div>

        {/* Service dropdown */}
        <div className="mb-28">
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
            Service <span className="text-[#29343D]">*</span>
          </label>
          <div ref={dropRef} className="relative">
            <button
              onClick={() => setDropOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-3 border border-[#E0E6EB] rounded-[4px] hover:border-[#635BFF] transition-colors cursor-pointer bg-white"
            >
              <span className="text-sm text-[#29343D]">{selected}</span>
              <ChevronDown
                size={16}
                className={`text-[#98A4AE] transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
              />
            </button>
            {dropOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0E6EB] rounded-[4px] shadow-lg z-10 py-1 overflow-hidden">
                {SERVICE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelected(opt);
                      setDropOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      selected === opt
                        ? "bg-[#F0EEFF] text-[#635BFF] font-semibold"
                        : "text-[#29343D] hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              onSave(selected);
              onClose();
            }}
            className="px-4 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
