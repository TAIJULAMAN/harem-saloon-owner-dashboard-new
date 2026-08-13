import { Pencil, X } from "lucide-react";

export default function ApppointNote({
  openNoteEditor,
  closeNoteEditor,
  savedNote,
  noteEditing,
  textareaRef,
  saveNote,
  setNoteDraft,
  noteDraft,
}: {
  openNoteEditor: () => void;
  closeNoteEditor: () => void;
  savedNote: string;
  noteEditing: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  saveNote: () => void;
  setNoteDraft: (draft: string) => void;
  noteDraft: string;
}) {
  return (
    <div>
      {/* NOTE CARD */}
      <div className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-bold text-[#29343D] font-manrope">
            Note
          </h2>

          {savedNote && (
            <button
              onClick={openNoteEditor}
              className="px-4 py-2.5 flex items-center justify-center bg-[#EFF4FA] rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            >
              <Pencil size={16} color="#46CAEB" />
            </button>
          )}
        </div>

        {savedNote ? (
          <p className="text-sm text-[#29343D] font-semibold leading-relaxed font-manrope">
            {savedNote}
          </p>
        ) : (
          <p
            className="text-sm text-[#98A4AE] leading-relaxed cursor-pointer hover:text-[#635BFF] transition-colors font-manrope"
            onClick={openNoteEditor}
          >
            Add a note...
          </p>
        )}
      </div>

      {/* MODAL */}
      {noteEditing && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          onClick={closeNoteEditor}
        >
          <div
            className="bg-white rounded-[14px] w-[520px] p-[30px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold text-[#29343D] font-manrope">
                Add a Note
              </h2>

              <button
                onClick={closeNoteEditor}
                className="text-[#29343D] hover:text-[#29343D] text-xl font-manrope cursor-pointer"
              >
                <X />
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Add a note"
              className="w-full border border-[#E0E6EB] rounded-[8px] p-[20px] min-h-[160px] resize-none focus:outline-none focus:border-[#635BFF] font-manrope"
            />

            <div className="flex justify-end mt-6">
              <button
                onClick={saveNote}
                className="px-6 py-2 bg-[#635BFF] text-white rounded-[8px] font-semibold hover:bg-[#564ee0] transition-colors font-manrope"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
