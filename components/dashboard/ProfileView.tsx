"use client";

import React from "react";
import { User, Edit3, Settings } from "lucide-react";
import { Employee } from "@/types";

interface ProfileViewProps {
  currentUser: Employee;
  isEditingProfile: boolean;
  setIsEditingProfile: (editing: boolean) => void;
  onSaveProfile: (updated: Employee) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  isEditingProfile,
  setIsEditingProfile,
  onSaveProfile,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Banner with Kazi Brand Gradient */}
        <div className="h-36 bg-gradient-to-r from-[#180E10] via-[#6D1E22] to-[#E31B23] relative">
          <div className="absolute right-6 top-6 opacity-20">
            <img
              src="/kazi-logo.jpg"
              alt="Watermark"
              className="h-20 w-auto object-contain rounded-xl"
            />
          </div>
        </div>

        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 mb-6 gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-3 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
              <img
                src={
                  currentUser.photoUrl ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                }
                alt={currentUser.name}
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl"
              />
              <div className="mb-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-[#C5994A] font-bold">
                  {currentUser.roleName}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  কাজী ফার্মস কিচেন - মিরপুর শাখা, ঢাকা
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-4 py-2 bg-slate-100 hover:bg-[#E31B23] hover:text-white text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>
                {isEditingProfile ? "বাতিল করুন" : "প্রোফাইল সম্পাদন"}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">
                অফিসিয়াল ইমেইল
              </span>
              <span className="font-bold text-slate-800">
                {currentUser.email}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">
                মোবাইল নম্বর
              </span>
              <span className="font-bold text-slate-800 font-mono">
                {currentUser.phone}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">
                জাতীয় পরিচয়পত্র (NID)
              </span>
              <span className="font-bold text-slate-800 font-mono">
                {currentUser.nid}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">
                রক্তের গ্রুপ
              </span>
              <span className="font-bold text-[#E31B23]">
                {currentUser.blood}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">
                পিতার নাম ও এনআইডি
              </span>
              <span className="font-bold text-slate-800">
                {currentUser.father} ({currentUser.fatherNid})
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">
                মাতার নাম
              </span>
              <span className="font-bold text-slate-800">
                {currentUser.mother}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2">
              <span className="text-slate-400 block text-[10px]">
                জরুরি যোগাযোগ
              </span>
              <span className="font-bold text-slate-800">
                {currentUser.emergency}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2">
              <span className="text-slate-400 block text-[10px]">
                স্থায়ী ঠিকানা
              </span>
              <span className="font-bold text-slate-800">
                {currentUser.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
