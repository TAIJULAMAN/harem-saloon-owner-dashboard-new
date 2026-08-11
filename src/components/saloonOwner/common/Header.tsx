"use client";

import Link from "next/link";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export default function Header() {
  const { setIsOpen } = useSidebar();

  return (
    <header className="h-[70px] md:h-[80px] bg-white flex items-center justify-between px-4 md:px-8 shrink-0 gap-4">
      <div className="flex items-center gap-3 md:gap-4 w-full max-w-md">
        <button onClick={() => setIsOpen(true)} className="md:hidden text-[#64748B] hover:text-[#1E293B] shrink-0">
          <Menu className="w-6 h-6" />
        </button>
        <div className="w-full relative">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-[#94A3B8] absolute left-3 md:left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 md:pl-11 pr-4 py-2 md:py-2.5 rounded-full border border-[#E2E8F0] bg-white text-[13px] md:text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent font-manrope transition-all placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        <Link href="/dashboard/notifications" className="relative text-[#64748B] hover:text-[#1E293B] transition-colors">
          <Bell className="w-5 h-5 md:w-6 md:h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#EF4444] border-2 border-white rounded-full"></span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
          <Link href="/dashboard/settings" className="relative block">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E2E8F0] overflow-hidden border border-[#CBD5E1]">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#10B981] border-2 border-white rounded-full"></span>
          </Link>
        </div>
      </div>
    </header>
  );
}
