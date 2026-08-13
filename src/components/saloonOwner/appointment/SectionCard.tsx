export default function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[12px] p-6 border border-[#EFF4FA]">
      <h3 className="text-[14px] font-semibold font-manrope text-[#29343D] mb-5">
        {title}
      </h3>
      {children}
    </div>
  );
}
