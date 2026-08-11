import React, { useState } from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { Scissors, Wind, Brush, Eye, Droplets, Sparkles, Smile, Bath, Paintbrush, Pipette, Star, Heart, Syringe, Crown, Flame, Zap } from "lucide-react";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: any) => void;
}

const availableIcons = [
  Scissors, Wind, Brush, Eye, Droplets, Sparkles, Smile, Bath,
  Paintbrush, Pipette, Star, Heart, Syringe, Crown, Flame, Zap
];

export default function AddServiceModal({ isOpen, onClose, onSave }: AddServiceModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Category 1");
  const [duration, setDuration] = useState("45 min");
  const [postBreak, setPostBreak] = useState("45 min");
  const [price, setPrice] = useState("€ 270");
  const [vat, setVat] = useState("€ 70");
  const [selectedIcon, setSelectedIcon] = useState(0);

  const handleSave = () => {
    onSave({ name, category, duration, postBreak, price, vat, iconIndex: selectedIcon });
    setName("");
    setSelectedIcon(0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Service" maxWidth="max-w-xl">
      <div className="space-y-4 pt-4">
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-3 uppercase tracking-wide">Icon</label>
          <div className="flex flex-wrap gap-2.5">
            {availableIcons.map((Icon, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIcon(idx)}
                className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 ${selectedIcon === idx
                    ? "bg-[#635BFF] text-white shadow-md shadow-[#635BFF]/30 scale-105"
                    : "bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#635BFF] border border-transparent hover:border-[#E0E7FF]"
                  }`}
              >
                <Icon className="w-5 h-5 stroke-[1.5]" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Haircut"
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white"
          >
            <option>Category 1</option>
            <option>Category 2</option>
            <option>Category 3</option>
            <option>Category 4</option>
            <option>Category 5</option>
            <option>Category 6</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 45 min"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Post-break Min</label>
            <input
              type="text"
              value={postBreak}
              onChange={(e) => setPostBreak(e.target.value)}
              placeholder="e.g. 45 min"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. € 270"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">VAT</label>
            <input
              type="text"
              value={vat}
              onChange={(e) => setVat(e.target.value)}
              placeholder="e.g. € 70"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full pt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-[13px] font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-semibold rounded-lg transition-colors"
          >
            Add Service
          </button>
        </div>
      </div>
    </Modal>
  );
}
