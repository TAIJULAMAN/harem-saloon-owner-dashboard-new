import React from "react";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";
import { InputGroup } from "@/components/common/InputGroup";
import { SelectGroup } from "@/components/common/SelectGroup";
import { TextareaGroup } from "@/components/common/TextareaGroup";

interface BasicDetailsSectionProps {
  isOnlineBooking: boolean;
  setIsOnlineBooking: (value: boolean) => void;
}

export function BasicDetailsSection({ isOnlineBooking, setIsOnlineBooking }: BasicDetailsSectionProps) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-[16px] font-bold text-[#1E293B]">Basic Details</h2>
        <CustomCheckbox
          label="Add it to online bookings"
          checked={isOnlineBooking}
          onChange={setIsOnlineBooking}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Service Name *" placeholder="Enter service name" />
        <SelectGroup label="Category *" placeholder="Select Category" options={["Category 1", "Category 2"]} />
        <SelectGroup label="Default Duration *" placeholder="Select Duration" options={["15 min", "30 min", "45 min"]} />
        <SelectGroup label="Post-break Min *" placeholder="Select Break" options={["15 min", "30 min"]} />
        <SelectGroup label="Price Type *" placeholder="Select Type" options={["Fixed", "Variable"]} />
        <InputGroup label="Price *" placeholder="Enter price" />
        <InputGroup label="VAT *" placeholder="Enter VAT" />
      </div>

      <div className="mt-6">
        <TextareaGroup label="Description (Optional)" placeholder="Enter a description" />
      </div>
    </div>
  );
}
