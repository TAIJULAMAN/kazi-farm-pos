"use client";

import React from "react";
import { X, User } from "lucide-react";
import { Employee } from "@/types";

interface EmployeeDetailModalProps {
  employee: Employee | null;
  onClose: () => void;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({
  employee,
  onClose,
}) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-xs">
        <div className="flex justify-between items-start pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <img
              src={
                employee.photoUrl ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
              }
              alt={employee.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#E31B23]"
            />
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {employee.name}
              </h3>
              <p className="text-[#C5994A] font-bold text-xs">
                {employee.roleName}
              </p>
              <p className="text-slate-400 text-[10px]">{employee.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px]">
              মোবাইল নম্বর
            </span>
            <span className="font-bold text-slate-800 font-mono">
              {employee.phone}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px]">
              জাতীয় পরিচয়পত্র (NID)
            </span>
            <span className="font-bold text-slate-800 font-mono">
              {employee.nid}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px]">
              পিতার নাম ও এনআইডি
            </span>
            <span className="font-bold text-slate-800">
              {employee.father} ({employee.fatherNid})
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px]">মাতার নাম</span>
            <span className="font-bold text-slate-800">{employee.mother}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px]">
              রক্তের গ্রুপ
            </span>
            <span className="font-bold text-[#E31B23]">{employee.blood}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px]">
              যোগদানের তারিখ
            </span>
            <span className="font-bold text-slate-800">
              {employee.joinDateBangla}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl col-span-2">
            <span className="text-slate-400 block text-[10px]">
              জরুরি যোগাযোগ
            </span>
            <span className="font-bold text-slate-800">
              {employee.emergency}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl col-span-2">
            <span className="text-slate-400 block text-[10px]">ঠিকানা</span>
            <span className="font-bold text-slate-800">{employee.address}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition mt-2"
        >
          বন্ধ করুন
        </button>
      </div>
    </div>
  );
};
