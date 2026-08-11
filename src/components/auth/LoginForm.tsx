"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoIcon from "../svg/LogoIcon";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full lg:w-2/5 flex flex-col p-8 lg:p-24 bg-white">
        <div className="mb-12">
          <Link href="/" className="flex items-center">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <LogoIcon />
            </div>
            <span className="text-[18px] font-manrope font-bold text-[#635BFF] pb-1 ml-2">
              Your logo
            </span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h1 className="text-[32px] font-bold text-[#1E293B] font-manrope">Sign in</h1>
          <p className="text-[#64748B] mt-2 mb-8 font-manrope">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1E293B] mb-2 font-manrope">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold text-[#1E293B] font-manrope">
                  Password
                </label>
                <Link href="#" className="text-sm font-semibold text-[#635BFF] hover:underline font-manrope">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-[#E2E8F0] text-[#635BFF] focus:ring-[#635BFF]"
              />
              <span className="text-sm text-[#64748B] font-manrope">
                Remember me for 30 days
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#635BFF] text-white rounded-lg font-bold text-lg hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#64748B] font-manrope">or sign in with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-[#E2E8F0] rounded-lg hover:bg-gray-50 transition-all font-manrope font-semibold text-[#1E293B]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c3.15 0 5.8-1.05 7.73-2.85l-3.57-2.77c-1.08.73-2.48 1.15-4.16 1.15-3.2 0-5.92-2.16-6.88-5.06H1.54v2.92C3.49 20.3 7.51 23 12 23z" fill="#34A853" />
                <path d="M5.12 14.47c-.25-.73-.39-1.5-.39-2.3 0-.8.14-1.57.39-2.3V6.95H1.54C.56 8.9 0 11.05 0 12.3c0 1.25.56 3.4 1.54 5.35l3.58-3.18z" fill="#FBBC05" />
                <path d="M12 4.75c1.71 0 3.25.59 4.46 1.74l3.34-3.34C17.8 1.19 15.15 0 12 0 7.51 0 3.49 2.7 1.54 6.95l3.58 2.92c.96-2.9 3.68-5.06 6.88-5.06z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-[#E2E8F0] rounded-lg hover:bg-gray-50 transition-all font-manrope font-semibold text-[#1E293B]">
              <Image src="/images/facebook.png" alt="Facebook" width={20} height={20} />
              <span>Facebook</span>
            </button>
          </div>

          <p className="mt-10 text-center text-[#64748B] font-manrope">
            Don't have an account? <Link href="/signup" className="text-[#635BFF] font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex w-3/5 bg-[#635BFF] relative overflow-hidden flex-col items-start justify-center pt-20 px-15 text-left">
        <div className="z-20 max-w-2xl mb-16 text-left">
          <h2 className="text-[44px] font-bold text-white leading-tight font-manrope mb-4">
            Transform Your Salon Business
          </h2>
          <p className="text-white/90 text-[16px] font-manrope leading-relaxed max-w-lg text-left">
            One platform – booking, inventory, forms, budgeting & social media – built to simplify and scale
          </p>
        </div>

        <div className="relative w-full max-w-[850px] z-10">
          {/* Main Dashboard (Left) */}
          <div className="relative z-10 top-15 w-[100%] aspect-[1.4/1] rounded-[32px] p-2 bg-white/10 backdrop-blur-md shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] border border-white/20">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden">
              <Image
                src="/registration/Clients.jpg"
                alt="Clients Dashboard"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Secondary Dashboard (Right Overlay) */}
          <div className="absolute top-[30%] -right-65 z-20 w-[85%] aspect-[1.4/1] rounded-[32px] p-2 bg-white/10 backdrop-blur-md shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] border border-white/20">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden">
              <Image
                src="/registration/dashboard.jpg"
                alt="Appointments Dashboard"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Revenue Card - Top Right */}
          <div className="absolute -top-5 right-[-28%] z-30 w-[240px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-transform duration-500">
            <Image
              src="/registration/revenue.png"
              alt="Revenue Card"
              width={240}
              height={160}
              className="object-contain"
            />
          </div>

          {/* Average Spend Card - Bottom Left */}
          <div className="absolute -bottom-10 -left-18 z-30 w-[280px] transform hover:scale-105 transition-transform duration-500">
            <Image
              src="/registration/average.png"
              alt="Average Spend Card"
              width={280}
              height={130}
              className="object-contain"
            />
          </div>
        </div>

        {/* Decorative subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
