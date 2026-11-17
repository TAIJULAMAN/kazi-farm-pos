"use client";

import React from "react";
import { X, UserPlus } from "lucide-react";
import { Employee } from "@/types";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newEmpName: string;
  setNewEmpName: (v: string) => void;
  newEmpPhone: string;
  setNewEmpPhone: (v: string) => void;
  newEmpEmail: string;
  setNewEmpEmail: (v: string) => void;
  newEmpPassword: string;
  setNewEmpPassword: (v: string) => void;
  newEmpNid: string;
  setNewEmpNid: (v: string) => void;
  newEmpFather: string;
  setNewEmpFather: (v: string) => void;
  newEmpFatherNid: string;
  setNewEmpFatherNid: (v: string) => void;
  newEmpMother: string;
  setNewEmpMother: (v: string) => void;
  newEmpPhotoUrl: string;
  setNewEmpPhotoUrl: (v: string) => void;
  newEmpJoinDate: string;
  setNewEmpJoinDate: (v: string) => void;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  newEmpName,
  setNewEmpName,
  newEmpPhone,
  setNewEmpPhone,
  newEmpEmail,
  setNewEmpEmail,
  newEmpPassword,
  setNewEmpPassword,
  newEmpNid,
  setNewEmpNid,
  newEmpFather,
  setNewEmpFather,
  newEmpFatherNid,
  setNewEmpFatherNid,
  newEmpMother,
  setNewEmpMother,
  newEmpPhotoUrl,
  setNewEmpPhotoUrl,
  newEmpJoinDate,
  setNewEmpJoinDate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-xs max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">
            নতুন সেলস পারসন / কর্মচারী যোগ করুন
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                পূর্ণ নাম:
              </label>
              <input
                type="text"
                required
                value={newEmpName}
                onChange={(e) => setNewEmpName(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs"
                placeholder="যেমন: মোঃ জাহিদ হাসান"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                মোবাইল নম্বর:
              </label>
              <input
                type="text"
                required
                value={newEmpPhone}
                onChange={(e) => setNewEmpPhone(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs font-mono"
                placeholder="01700-000000"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                লগইন ইমেইল:
              </label>
              <input
                type="email"
                required
                value={newEmpEmail}
                onChange={(e) => setNewEmpEmail(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs"
                placeholder="zahid@kazifarms.com"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                লগইন পাসওয়ার্ড:
              </label>
              <input
                type="password"
                required
                value={newEmpPassword}
                onChange={(e) => setNewEmpPassword(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                জাতীয় পরিচয়পত্র (NID):
              </label>
              <input
                type="text"
                required
                value={newEmpNid}
                onChange={(e) => setNewEmpNid(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs font-mono"
                placeholder="10 বা 17 ডিজিটের NID"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                পিতার নাম:
              </label>
              <input
                type="text"
                required
                value={newEmpFather}
                onChange={(e) => setNewEmpFather(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                পিতার NID:
              </label>
              <input
                type="text"
                value={newEmpFatherNid}
                onChange={(e) => setNewEmpFatherNid(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                মাতার নাম:
              </label>
              <input
                type="text"
                required
                value={newEmpMother}
                onChange={(e) => setNewEmpMother(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                যোগদানের তারিখ:
              </label>
              <input
                type="date"
                required
                value={newEmpJoinDate}
                onChange={(e) => setNewEmpJoinDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                ছবির লিংক (URL):
              </label>
              <input
                type="url"
                value={newEmpPhotoUrl}
                onChange={(e) => setNewEmpPhotoUrl(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#E31B23] hover:bg-[#C8151C] text-white rounded-xl font-bold transition flex items-center justify-center space-x-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>কর্মচারী নিবন্ধন সম্পন্ন করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
