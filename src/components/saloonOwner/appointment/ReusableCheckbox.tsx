export default function ReusableCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-colors ${
          checked
            ? "bg-[#635BFF] border-[#635BFF]"
            : "bg-white border-[#B9C3CC]"
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-sm font-manrope text-[#29343D]">{label}</span>
    </label>
  );
}
