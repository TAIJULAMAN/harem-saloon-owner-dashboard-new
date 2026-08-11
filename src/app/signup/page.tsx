"use client";

import { useState } from "react";
import OnboardingStep1 from "@/components/auth/OnboardingStep1";
import OnboardingStep2 from "@/components/auth/OnboardingStep2";
import OnboardingStep3 from "@/components/auth/OnboardingStep3";
import OnboardingStep4 from "@/components/auth/OnboardingStep4";
import OnboardingStep5 from "@/components/auth/OnboardingStep5";
import OnboardingStep6 from "@/components/auth/OnboardingStep6";
import SignupStep0 from "@/components/auth/SignupStep0";


export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    businessName: "",
    businessType: "",
    goals: [] as string[],
    businessDisplayName: "",
    brandColor: "#7C3AED",
    tagline: "",
    phone: "",
    contactEmail: "",
    subdomain: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <main className="min-h-screen bg-white">
      {step === 0 && (
        <SignupStep0
          onNext={nextStep}
          updateData={updateFormData}
          data={formData}
        />
      )}
      {step === 1 && (
        <OnboardingStep1
          onNext={nextStep}
          onBack={prevStep}
          updateData={updateFormData}
          data={formData}
        />
      )}
      {step === 2 && (
        <OnboardingStep2
          onNext={nextStep}
          onBack={prevStep}
          updateData={updateFormData}
          data={formData}
        />
      )}
      {step === 3 && (
        <OnboardingStep3
          onNext={nextStep}
          onBack={prevStep}
          updateData={updateFormData}
          data={formData}
        />
      )}
      {step === 4 && (
        <OnboardingStep4
          onNext={nextStep}
          onBack={prevStep}
          updateData={updateFormData}
          data={formData}
        />
      )}
      {step === 5 && (
        <OnboardingStep5
          onNext={nextStep}
          onBack={prevStep}
          updateData={updateFormData}
          data={formData}
        />
      )}
      {step === 6 && (
        <OnboardingStep6 />
      )}
    </main>
  );
}
