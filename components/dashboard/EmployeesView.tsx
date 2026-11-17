"use client";

import React from "react";
import { Plus, Users } from "lucide-react";
import { Employee } from "@/types";

interface EmployeesViewProps {
  employees: Employee[];
  onOpenAddModal: () => void;
  onSelectEmployee: (emp: Employee) => void;
}

export const EmployeesView: React.FC<EmployeesViewProps> = ({
  employees,
  onOpenAddModal,
  onSelectEmployee,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            কর্মচারী প্রোফাইল ও মানবসম্পদ (HR Data)
          </h3>
          <p className="text-[11px] text-slate-400">
            শাখার সকল কর্মীর পূর্ণাঙ্গ তথ্যাবলী ও লগইন একাউন্ট
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="px-3.5 py-1.5 bg-[#E31B23] hover:bg-[#C8151C] text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কর্মচারী যোগ</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="p-3">কর্মচারী</th>
              <th className="p-3">মোবাইল নম্বর</th>
              <th className="p-3">জাতীয় পরিচয়পত্র (NID)</th>
              <th className="p-3">যোগদানের তারিখ</th>
              <th className="p-3">রক্তের গ্রুপ</th>
              <th className="p-3">দায়িত্ব (Role)</th>
              <th className="p-3 text-right">পূর্ণ প্রোফাইল</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50 transition">
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        emp.photoUrl ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                      }
                      alt={emp.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{emp.name}</p>
                      <p className="text-[10px] text-slate-400">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 font-mono">{emp.phone}</td>
                <td className="p-3 font-mono text-slate-500">{emp.nid}</td>
                <td className="p-3">{emp.joinDateBangla}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-red-50 text-[#E31B23] rounded font-bold text-[10px]">
                    {emp.blood}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      emp.role === "SUPER_ADMIN"
                        ? "bg-red-100/70 text-[#6D1E22]"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {emp.roleName}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => onSelectEmployee(emp)}
                    className="px-3 py-1 bg-slate-100 hover:bg-[#E31B23] hover:text-white text-slate-700 rounded-lg text-[11px] font-semibold transition"
                  >
                    প্রোফাইল দেখুন
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
