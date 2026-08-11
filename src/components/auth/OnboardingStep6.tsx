"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OnboardingStep6() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 3000; // 3 seconds total
    const interval = 50; // update every 50ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Redirect to login page after completion
        setTimeout(() => {
          router.push("/login");
        }, 500); // small delay at 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-6 overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/registration/signup.png"
          alt="Onboarding Background"
          fill
          className=""
          priority
        />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-[32px] shadow-2xl p-8 lg:p-12 text-center py-16">
        <h2 className="text-[32px] font-bold text-[#1E293B] font-manrope leading-tight">
          Preparing your salon workspace
        </h2>
        <p className="text-[#64748B] mt-3 mb-12 font-manrope text-lg">
          We're creating your dashboard, branding, and client booking website.
        </p>

        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-[#64748B] tracking-wider">
              INITIALIZATION PROGRESS
            </span>
            <span className="text-sm font-semibold text-[#635BFF]">
              {progress}%
            </span>
          </div>
          
          <div className="h-3 w-full bg-[#E0E7FF] rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-[#635BFF] transition-all duration-75 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-[#64748B] italic text-sm font-manrope">
            Step into the future of salon management.
          </p>
        </div>
      </div>
    </div>
  );
}
