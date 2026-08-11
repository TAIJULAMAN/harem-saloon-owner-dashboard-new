import React from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { Scissors, Wind, Brush, Eye, Droplets, Sparkles, Smile, Bath, Paintbrush, Pipette, Star, Heart, Syringe, Crown, Flame, Zap } from "lucide-react";

interface ViewServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceData?: any;
}

const availableIcons = [
  Scissors, Wind, Brush, Eye, Droplets, Sparkles, Smile, Bath,
  Paintbrush, Pipette, Star, Heart, Syringe, Crown, Flame, Zap
];

export default function ViewServiceModal({ isOpen, onClose, serviceData }: ViewServiceModalProps) {
  if (!serviceData) return null;

  const IconComponent = availableIcons[serviceData.iconIndex || 0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Service Details" maxWidth="max-w-xl">
      <div className="space-y-4 pt-4">
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-3 uppercase tracking-wide">Icon</label>
          <div className="w-12 h-12 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-[#635BFF] stroke-[1.5]" />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Name</label>
          <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
            {serviceData.name}
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Category</label>
          <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
            {serviceData.category}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Duration</label>
            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
              {serviceData.duration}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Post-break Min</label>
            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
              {serviceData.postBreak}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Price</label>
            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
              {serviceData.price}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">VAT</label>
            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
              {serviceData.vat}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full pt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-[13px] font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
