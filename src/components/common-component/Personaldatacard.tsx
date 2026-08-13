"use client";

interface DataField {
  label: string;
  value: string;
  fullWidth?: boolean;
}

interface PersonalDataCardProps {
  title?: string;
  fields?: DataField[];
  onEdit?: () => void;
  editLabel?: string;
  className?: string;
}

const FieldCell = ({ label, value }: DataField) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[13px] font-manrope font-normal text-[#98A4AE]">
      {label}
    </span>
    <span className="text-[17px] font-manrope font-semibold text-[#29343D] leading-snug break-all">
      {value}
    </span>
  </div>
);

export default function PersonalDataCard({
  title = "Personal data",
  fields = [
    { label: "Date of birth", value: "November 7, 1992" },
    { label: "Age", value: "33 years old" },
    { label: "Gender", value: "Female", fullWidth: true },
    { label: "Telephone", value: "+39 336 789 012" },
    { label: "Email", value: "anna.superlongemailaddress@exampledomain.com" },
  ],
  onEdit,
  editLabel = "Edit",
  className = "",
}: PersonalDataCardProps) {
  const rows: DataField[][] = [];
  let i = 0;

  while (i < fields.length) {
    if (fields[i].fullWidth) {
      rows.push([fields[i]]);
      i++;
    } else if (fields[i + 1] && !fields[i + 1].fullWidth) {
      rows.push([fields[i], fields[i + 1]]);
      i += 2;
    } else {
      rows.push([fields[i]]);
      i++;
    }
  }

  return (
    <div
      className={[
        "font-manrope w-full bg-white rounded-xl border border-[#E0E6EB]",
        "px-6 sm:px-8 py-6 sm:py-7",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 sm:mb-7 gap-4 flex-wrap">
        <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#29343D] tracking-tight leading-tight">
          {title}
        </h2>
        <button
          onClick={onEdit}
          className="cursor-pointer bg-[#DDDBFF] hover:bg-[#E0E0F5] active:scale-[0.97] transition-all duration-150
                     text-indigo-500 text-[14px] sm:text-[15px] font-semibold rounded-[8px] px-4 py-2.5 leading-none"
        >
          {editLabel}
        </button>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-5 sm:gap-6">
        {rows.map((row, ri) => (
          <div
            key={ri}
            className={
              row.length === 2
                ? "grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
                : "grid grid-cols-1"
            }
          >
            {row.map((field) => (
              <FieldCell key={field.label} {...field} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
