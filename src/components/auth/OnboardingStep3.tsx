"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "./OnboardingLayout";

interface Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: any) => void;
  data: any;
}

export default function OnboardingStep3({ onNext, onBack, updateData, data }: Props) {
  const goals = [
    "Online bookings",
    "Manage team & shifts",
    "Automate reminders",
    "Inventory management",
    "Financial reports",
    "Grow revenue",
  ];

  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals || []);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleFinish = () => {
    updateData({ goals: selectedGoals });
    onNext();
  };

  return (
    <OnboardingLayout step={3} totalSteps={6}>
      <h2 className="text-[32px] font-bold text-[#1E293B] font-manrope leading-tight">
        What are you looking to achieve first?
      </h2>
      <p className="text-[#64748B] mt-2 mb-8 font-manrope">
        This helps us design the best experience for your business.
      </p>

      <div className="space-y-8">
        <div>
          <p className="text-sm font-semibold text-[#1E293B] mb-4 font-manrope">
            Choose the goals that are most important to you right now.
          </p>
          <div className="flex flex-wrap gap-3">
            {goals.map((goal) => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`px-6 py-3 rounded-lg border font-semibold text-sm transition-all font-manrope ${selectedGoals.includes(goal)
                    ? "bg-[#635BFF] text-white border-[#635BFF] shadow-lg shadow-[#635BFF]/20"
                    : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#635BFF] hover:text-[#635BFF]"
                  }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onBack}
            className="px-8 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] font-semibold text-sm hover:bg-gray-50 transition-all font-manrope"
          >
            Back
          </button>
          <button
            onClick={handleFinish}
            disabled={selectedGoals.length === 0}
            className="px-8 py-2.5 bg-[#635BFF] text-white rounded-lg font-semibold text-sm hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20 disabled:opacity-50 disabled:cursor-not-allowed font-manrope"
          >
            Complete Registration
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
