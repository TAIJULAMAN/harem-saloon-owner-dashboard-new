import React from "react";
import IListIcon from "./IListIcon";
import ICalaender from "@/app/account-protal/svg/ICalaender";
import IDollar from "./IDollar";

type Step = "details" | "review" | "payment";

export default function AddAppointTabs({
  currentStep,
  onStepChange,
}: {
  currentStep: Step;
  onStepChange: (s: Step) => void;
}) {
  const STEPS: {
    key: Step;
    label: string;
    icon: (active: boolean) => React.ReactNode;
  }[] = [
    {
      key: "details",
      label: "Appointment Details",
      icon: (active) => (
        <ICalaender size={20} color={active ? "#fff" : "#29343D"} />
      ),
    },
    {
      key: "review",
      label: "Review Appointment",
      icon: (active) => <IListIcon color={active ? "#fff" : "#29343D"} />,
    },
    {
      key: "payment",
      label: "Payment",
      icon: (active) => (
        <IDollar size={22} color={active ? "#fff" : "#29343D"} />
      ),
    },
  ];

  const currentIdx = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="bg-white rounded-xl border border-[#EEF2F8] p-[30px] flex flex-wrap items-center gap-3">
      {STEPS.map((step, i) => {
        const isActive = currentStep === step.key;
        const isDone = currentIdx > i;

        return (
          <React.Fragment key={step.key}>
            <button
              onClick={() => onStepChange(step.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base leading-6 font-semibold font-manrope transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#DDDBFF] text-[#635BFF]"
                  : isDone
                    ? "text-[#635BFF]"
                    : "text-[#29343D] hover:bg-[#F4F6FA]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? "bg-[#635BFF]" : "bg-[#F4F7FB]"
                }`}
              >
                {step.icon(isActive)}
              </div>

              <span className="text-start">{step.label}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
