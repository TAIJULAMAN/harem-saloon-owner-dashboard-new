import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SelectGroup } from "@/components/common/SelectGroup";
import { CustomButton } from "@/components/common/CustomButton";

interface EditDurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (duration: string) => void;
  initialDuration?: string;
}

export function EditDurationModal({ isOpen, onClose, onSave, initialDuration = "15 min" }: EditDurationModalProps) {
  const [duration, setDuration] = useState(initialDuration);

  useEffect(() => {
    if (isOpen) {
      setDuration(initialDuration);
    }
  }, [isOpen, initialDuration]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[16px] font-bold text-[#1E293B]">Edit Duration</h2>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#1E293B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-8">
          <SelectGroup
            label="Duration *"
            placeholder="Select Duration"
            options={["15 min", "30 min", "45 min", "60 min", "90 min", "120 min"]}
            value={duration}
            onChange={setDuration}
          />
        </div>

        <div className="flex justify-end">
          <CustomButton
            variant="primary"
            title="Save"
            onClick={() => {
              onSave(duration);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
