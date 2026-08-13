import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ITEMS = 3;
const DROPDOWN_HEIGHT = ITEMS * 44 + 12;

export default function RowActions() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on any scroll
  useEffect(() => {
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const handleOpen = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;

      setPos({
        top:
          spaceBelow < DROPDOWN_HEIGHT
            ? rect.top - DROPDOWN_HEIGHT - 6  // flip upward
            : rect.bottom + 6,               // show below
        left: rect.right - 176,
      });
    }
    setOpen((p) => !p);
  };

  const dropdown = open ? (
    <div
      ref={dropdownRef}
      style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 }}
      className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#F0F2F5] py-1.5 w-44 overflow-hidden"
    >
      <Link href={"/dashboard/appointment/view-appointment"}>
        <button
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
        >
          <Eye size={15} className="text-[#635BFF]" />
          View Details
        </button>
      </Link>
      <button
        onClick={() => setOpen(false)}
        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
      >
        <Pencil size={15} className="text-[#526B7A]" />
        Edit
      </button>
      <button
        onClick={() => setOpen(false)}
        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#FFF5F7] transition-colors cursor-pointer"
      >
        <Trash2 size={15} className="text-[#FF6692]" />
        Delete
      </button>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        className="p-1.5 hover:bg-[#F4F6FA] rounded-lg transition-colors cursor-pointer"
      >
        <EllipsisVertical size={16} className="text-[#526B7A]" />
      </button>

      {typeof window !== "undefined" && createPortal(dropdown, document.body)}
    </>
  );
}
