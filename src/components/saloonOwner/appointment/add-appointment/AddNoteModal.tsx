import { X } from "lucide-react";
import { useEffect } from "react";

export default function AddNoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
      <div className="bg-white rounded-2xl shadow-2xl w-[480px] px-7 py-6 font-manrope">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-[#1A1A2E]">Add a Note</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <X size={18} className="text-[#526B7A]" />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          autoFocus
          rows={4}
          placeholder="Write a note..."
          className="w-full border border-[#E0E6EB] rounded-xl px-4 py-3 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] resize-none transition-colors mb-5"
        />

        {/* Footer */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#E0E6EB] text-sm font-semibold text-[#526B7A] rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
