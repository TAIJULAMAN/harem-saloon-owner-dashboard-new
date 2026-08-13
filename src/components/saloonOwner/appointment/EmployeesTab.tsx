"use client";
import EmployeeCard from "./EmployeeCard";

const EMPLOYEES = [
  {
    id: 1,
    name: "Maria Rodriguez",
    avatarUrl: "/avatar/icon1.png",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    avatarUrl: "/avatar/icon2.png",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    avatarUrl: "/avatar/icon3.png",
  },
];

export default function EmployeesTab() {
  return (
    <div className="py-6 space-y-4  bg-[#F4F6FA]">
      <div className="bg-white rounded-[12px] p-4">
        <h3 className="text-sm font-semibold font-manrope text-[#29343D] mb-4">
          Employees Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {EMPLOYEES.map((emp) => (
            <EmployeeCard
              key={emp.id}
              name={emp.name}
              avatarUrl={emp.avatarUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
