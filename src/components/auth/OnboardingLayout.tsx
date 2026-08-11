"use client";

import React from "react";
import LogoIcon from "../svg/LogoIcon";
import Link from "next/link";
import Image from "next/image";

interface Props {
  step: number;
  totalSteps: number;
  children: React.ReactNode;
}

export default function OnboardingLayout({ step, totalSteps, children }: Props) {
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
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-[32px] shadow-2xl p-8 lg:p-12">
        <div className="mb-10 flex justify-start">
          <Link href="/" className="flex items-center">
            <div className="relative w-8 h-8">
              <LogoIcon />
            </div>
            <span className="text-[16px] font-manrope font-bold text-[#635BFF] pb-1 ml-2">
              Your logo
            </span>
          </Link>
        </div>

        <div className="mt-8 mb-10">
          <p className="text-sm font-semibold text-[#1E293B] mb-3 font-manrope">Step {step} of {totalSteps}</p>
          <div className="flex gap-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i < step ? "bg-[#635BFF]" : "bg-[#E2E8F0]"
                  }`}
              ></div>
            ))}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
