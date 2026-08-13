import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SearchMemberModal({
  recentMembers,
  onClose,
}: {
  recentMembers: { name: string; phone: string; clientAvatar: string }[];
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const filtered = recentMembers.filter(
    (m) =>
      !query ||
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.phone.includes(query),
  );

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4"
    >
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-base font-bold font-manrope text-[#29343D]">
            Search a Member
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA] transition-colors cursor-pointer text-[#98A4AE] hover:text-[#29343D] text-lg leading-none"
          >
            <X />
          </button>
        </div>

        {/* Search input */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 border border-[#E0E6EB] rounded-[10px] px-3 py-2.5 focus-within:border-[#635BFF] transition-colors">
            <Search size={16} className="text-[#98A4AE]" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 text-sm font-manrope text-[#29343D] placeholder:text-[#C4CDD5] outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Recent / Results */}
        <div className="px-6 pb-5">
          <p className="text-xs font-semibold font-manrope text-[#98A4AE] mb-3">
            {query ? "Results" : "Recent research"}
          </p>
          <div className="space-y-1">
            {filtered.map((m, i) => (
              <button
                key={i}
                onClick={onClose}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-[#F4F6FA] transition-colors cursor-pointer text-left"
              >
                {m.clientAvatar && (
                  <Image
                    src={m.clientAvatar}
                    alt={m.name}
                    width={38}
                    height={38}
                    className="rounded-xl object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold font-manrope text-[#29343D]">
                    {m.name}
                  </p>
                  <p className="text-xs font-manrope text-[#98A4AE]">
                    {m.phone}
                  </p>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm font-manrope text-[#98A4AE] text-center py-4">
                No members found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
