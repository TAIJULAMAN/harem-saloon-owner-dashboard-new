export default function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      onClick={onChange}
      className={`w-9 h-5 rounded-[4px] flex items-center px-0.5 cursor-pointer transition-colors duration-200 ${
        checked ? "bg-[#DDDBFF]" : "bg-[#D1D5DB]"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-[6px] shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-4 bg-[#635BFF]" : "translate-x-0 bg-white"
        }`}
      />
    </div>
  );
}
