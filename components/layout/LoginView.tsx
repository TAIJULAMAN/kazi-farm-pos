"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Employee } from "@/types";

interface LoginViewProps {
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (pass: string) => void;
  onLoginSubmit: (e: React.FormEvent) => void;
  onQuickDemo: (email: string, pass: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  onLoginSubmit,
  onQuickDemo,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#180E10] via-[#241316] to-[#3A141A] flex items-center justify-center p-4 antialiased">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 border border-slate-100">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white p-2 rounded-2xl shadow-xl mb-1 border border-slate-200 overflow-hidden">
            <img
              src="/kazi-logo.jpg"
              alt="Kazi Farms Kitchen Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            কাজী ফার্মস কিচেন
          </h2>
          <p className="text-xs text-[#C5994A] font-semibold">
            মিরপুর-১০ আউটলেট পিওএস ও ইনভেন্টরি সিস্টেম
          </p>
          <p className="text-[11px] text-slate-500">
            আপনার নিবন্ধিত ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন
          </p>
        </div>

        <form onSubmit={onLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              ইমেইল ঠিকানা (Login Email):
            </label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#E31B23] focus:outline-none text-sm"
              placeholder="admin@kazifarms.com"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              পাসওয়ার্ড (Password):
            </label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#E31B23] focus:outline-none text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#E31B23] hover:bg-[#C8151C] text-white font-bold rounded-xl shadow-md transition text-sm flex items-center justify-center space-x-2"
          >
            <span>লগইন করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Login Chips */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
          <p className="text-slate-400 font-medium text-center">
            দ্রুত ডেমো টেস্ট লগইন:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onQuickDemo("admin@kazifarms.com", "admin123")}
              className="py-2.5 px-3 bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-300 text-slate-700 hover:text-[#6D1E22] rounded-xl text-center font-semibold transition"
            >
              <span className="block text-[10px] text-slate-400">
                সুপার অ্যাডমিন
              </span>
              <span>কবির হোসেন</span>
            </button>
            <button
              type="button"
              onClick={() => onQuickDemo("salman@kazifarms.com", "sales123")}
              className="py-2.5 px-3 bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-300 text-slate-700 hover:text-[#6D1E22] rounded-xl text-center font-semibold transition"
            >
              <span className="block text-[10px] text-slate-400">
                সেলস পারসন
              </span>
              <span>সালমান আহমেদ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
