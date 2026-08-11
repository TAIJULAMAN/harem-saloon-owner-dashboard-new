"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { CustomSelect } from "@/components/common/CustomSelect";
import { CustomButton } from "@/components/common/CustomButton";

interface TopHeaderProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onExport: () => void;
}

export default function TopHeader({ activeCategory, setActiveCategory, onExport }: TopHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Services</h1>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
        <CustomSelect
          value={activeCategory}
          onChange={setActiveCategory}
          options={["All", "Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6"]}
          className="w-full sm:w-auto shrink-0"
          buttonClassName="w-full sm:w-auto text-[13px] py-2 px-4 justify-between min-w-[140px]"
          align="left"
        />
        <CustomButton variant="outline" title="Import Services" onClick={() => router.push('/dashboard/services/import')} />
        <CustomButton variant="light-purple" icon={Download} title="Export Data" onClick={onExport} />
        <CustomButton variant="primary" icon={Plus} title="Add Service" onClick={() => router.push('/dashboard/services/add')} />
      </div>
    </div>
  );
}
