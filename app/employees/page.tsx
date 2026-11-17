"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import { EmployeesView } from "@/components/dashboard/EmployeesView";

export default function EmployeesPage() {
  const {
    employees,
    currentUser,
    setIsAddEmployeeModalOpen,
    setSelectedViewEmployee,
  } = useApp();

  // If user is sales person, show notice or redirect
  if (currentUser?.role !== "SUPER_ADMIN") {
    return (
      <AppShell currentView="EMPLOYEES">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3 max-w-md mx-auto my-12">
          <p className="text-sm font-bold text-slate-800">অ্যাক্সেস সংরক্ষিত</p>
          <p className="text-xs text-slate-500">
            এই পৃষ্ঠাটি শুধুমাত্র সুপার অ্যাডমিনদের জন্য অনুমোদিত।
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell currentView="EMPLOYEES">
      <EmployeesView
        employees={employees}
        onOpenAddModal={() => setIsAddEmployeeModalOpen(true)}
        onSelectEmployee={(emp) => setSelectedViewEmployee(emp)}
      />
    </AppShell>
  );
}
