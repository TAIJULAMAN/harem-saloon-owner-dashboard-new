import { MoreVertical } from "lucide-react";

export default function AddBottombar({
  moreRef,
  setMoreOpen,
  moreOpen,
  setAddNoteOpen,
  setUpfrontOpen,
  icon,
  icon2,
  listLable,
  listLable2,
}: {
  moreRef: React.RefObject<HTMLDivElement | null>;
  setMoreOpen: React.Dispatch<React.SetStateAction<boolean>>;
  moreOpen: boolean;
  setAddNoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpfrontOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon: React.ReactNode;
  icon2: React.ReactNode;
  listLable: string;
  listLable2: string;
}) {
  return (
    <div>
      <div className="mt-5 flex items-center flex-wrap gap-4 justify-between">
        <button className="px-4 py-2.5 leading-6 bg-[#F6F7F9] hover:bg-gray-50 text-sm font-semibold text-[#29343D] rounded-[8px] transition-colors cursor-pointer">
          Back
        </button>

        <div className="flex items-center flex-wrap gap-3">
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className="w-10 h-10 flex items-center justify-center border border-[#E0E6EB] bg-white rounded-[8px] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <MoreVertical size={17} className="text-[#29343D]" />
            </button>

            {moreOpen && (
              <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl z-30 py-2 w-60 overflow-hidden">
                <button
                  onClick={() => {
                    setAddNoteOpen(true);
                    setMoreOpen(false);
                  }}
                  className="text-start w-full flex items-center gap-2.5 px-4 py-3 text-sm text-[#29343D] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {/* <IListIcon size={18} color="#29343D" />
                  Add a Note */}
                  {icon}
                  {listLable}
                </button>
                <button
                  onClick={() => {
                    setUpfrontOpen(true);
                    setMoreOpen(false);
                  }}
                  className="text-start w-full flex items-center gap-2.5 px-4 py-3 text-sm text-[#29343D] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {icon2}
                  {listLable2}
                </button>
              </div>
            )}
          </div>

          <button className="leading-6 px-4 py-2.5 bg-[#EEEEFF] hover:bg-[#E0DEFF] text-[#635BFF] text-sm font-semibold rounded-[8px] transition-colors cursor-pointer">
            Checkout
          </button>

          <button className="leading-6 px-6 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] transition-colors cursor-pointer shadow-lg">
            Save and Leave
          </button>
        </div>
      </div>
    </div>
  );
}
