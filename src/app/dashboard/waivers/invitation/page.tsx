import React from "react";
import Image from "next/image";
import { Instagram, Twitter, Youtube, User } from "lucide-react";
import Link from "next/link";

export default function InvitationPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Background Purple Header */}
      <div className="bg-[#635BFF] h-[320px] w-full flex flex-col items-center pt-16 px-4">
        <div className="flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 30L20 15L27.5 30H32.5L20 5L7.5 30H12.5Z" fill="white" />
          </svg>
          <h1 className="text-white text-3xl font-bold">Your logo</h1>
        </div>
      </div>

      {/* Overlapping Card Container */}
      <div className="max-w-4xl mx-auto px-4 -mt-32 pb-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Subheader - Light Purple */}
          <div className="bg-[#EEF2FF] py-8 flex items-center justify-center">
            <h2 className="text-[#635BFF] text-2xl font-medium">Invitation to Sign</h2>
          </div>

          {/* Main Body */}
          <div className="p-12 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-[22px] font-bold text-[#1E293B]">Hello, Name!</h3>
                  <p className="text-[16px] text-[#64748B] leading-relaxed">
                    You've been invited to sign "document x".
                  </p>
                </div>

                <Link
                  href="/dashboard/waivers/sign"
                  className="inline-block bg-[#635BFF] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#524be0] transition-colors shadow-lg shadow-[#635BFF]/30"
                >
                  Complete Registration
                </Link>

                <div className="pt-12 space-y-1">
                  <p className="text-[#64748B]">Best regards,</p>
                  <p className="text-[#635BFF] font-medium">The [WebApp Name] Team</p>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <div className="relative w-full max-w-[400px] aspect-[4/3]">
                  <Image
                    src="/images/laptop_signing_illustration.png"
                    alt="Signing Document Illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Light Purple */}
          <div className="bg-[#EEF2FF] py-10 flex items-center justify-center gap-6">
            <a href="#" className="w-12 h-12 rounded-full bg-[#635BFF] flex items-center justify-center text-white hover:bg-[#524be0] transition-colors shadow-md">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-[#635BFF] flex items-center justify-center text-white hover:bg-[#524be0] transition-colors shadow-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-[#635BFF] flex items-center justify-center text-white hover:bg-[#524be0] transition-colors shadow-md">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
