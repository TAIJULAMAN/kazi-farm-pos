"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ReceiptModal } from "@/components/modals/ReceiptModal";
import { AddStockModal } from "@/components/modals/AddStockModal";
import { ProductDetailModal } from "@/components/modals/ProductDetailModal";
import { AddEmployeeModal } from "@/components/modals/AddEmployeeModal";
import { EmployeeDetailModal } from "@/components/modals/EmployeeDetailModal";
import { ViewType } from "@/types";

interface AppShellProps {
  children: React.ReactNode;
  currentView: ViewType;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  currentView,
}) => {
  const {
    currentUser,
    logout,
    products,
    lowStockProducts,
    globalSearchQuery,
    setGlobalSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    searchResults,
    selectedProductDetail,
    setSelectedProductDetail,
    isNotificationOpen,
    setIsNotificationOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    toastMessage,
    toastType,
    isReceiptModalOpen,
    setIsReceiptModalOpen,
    completedOrder,
    isAddStockModalOpen,
    setIsAddStockModalOpen,
    stockModalProductId,
    setStockModalProductId,
    stockModalQty,
    setStockModalQty,
    addStock,
    addToCart,
    isAddEmployeeModalOpen,
    setIsAddEmployeeModalOpen,
    addEmployee,
    selectedViewEmployee,
    setSelectedViewEmployee,
  } = useApp();

  // New Employee state
  const [newEmpName, setNewEmpName] = useState("");
  const [newEmpPhone, setNewEmpPhone] = useState("");
  const [newEmpEmail, setNewEmpEmail] = useState("");
  const [newEmpPassword, setNewEmpPassword] = useState("");
  const [newEmpNid, setNewEmpNid] = useState("");
  const [newEmpFather, setNewEmpFather] = useState("");
  const [newEmpFatherNid, setNewEmpFatherNid] = useState("");
  const [newEmpMother, setNewEmpMother] = useState("");
  const [newEmpPhotoUrl, setNewEmpPhotoUrl] = useState("");
  const [newEmpJoinDate, setNewEmpJoinDate] = useState("2026-10-31");

  const isSuper = currentUser?.role === "SUPER_ADMIN";

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 antialiased overflow-hidden font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-xl text-white text-xs font-bold transition flex items-center space-x-2 animate-bounce ${
            toastType === "success" ? "bg-[#E31B23]" : "bg-rose-700"
          }`}
        >
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Left Sidebar Navigation */}
      {currentUser && (
        <Sidebar
          currentView={currentView}
          setCurrentView={() => {}}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          currentUser={currentUser}
          onLogout={logout}
        />
      )}

      {/* 2. Main Content View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {currentUser && (
          <Header
            currentView={currentView}
            currentUser={currentUser}
            globalSearchQuery={globalSearchQuery}
            setGlobalSearchQuery={setGlobalSearchQuery}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            searchResults={searchResults}
            onSelectProduct={(p) => setSelectedProductDetail(p)}
            lowStockProducts={lowStockProducts}
            isNotificationOpen={isNotificationOpen}
            setIsNotificationOpen={setIsNotificationOpen}
            setCurrentView={() => {}}
          />
        )}

        <main className="flex-1 overflow-y-auto p-6 bg-slate-100">
          {children}
        </main>
      </div>

      {/* Reusable Overlays & Modals */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onQuickRestock={(prodId) => {
          setStockModalProductId(prodId);
          setIsAddStockModalOpen(true);
        }}
        onAddToCart={(p) => addToCart(p)}
        isSuper={isSuper}
      />

      <AddStockModal
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        products={products}
        stockModalProductId={stockModalProductId}
        setStockModalProductId={setStockModalProductId}
        stockModalQty={stockModalQty}
        setStockModalQty={setStockModalQty}
        onSubmit={(e) => {
          e.preventDefault();
          addStock(stockModalProductId, stockModalQty);
        }}
      />

      <ReceiptModal
        isOpen={isReceiptModalOpen}
        order={completedOrder}
        onClose={() => setIsReceiptModalOpen(false)}
      />

      <AddEmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
        onSubmit={(e) => {
          e.preventDefault();
          addEmployee({
            name: newEmpName,
            phone: newEmpPhone,
            email: newEmpEmail,
            password: newEmpPassword,
            nid: newEmpNid,
            father: newEmpFather,
            fatherNid: newEmpFatherNid,
            mother: newEmpMother,
            photoUrl:
              newEmpPhotoUrl ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            joinDate: newEmpJoinDate,
            joinDateBangla: "৩১ অক্টোবর ২০২৬",
            emergency: "01700-112233 (পিতা)",
            blood: "B+",
            address: "মিরপুর, ঢাকা",
            role: "SALES_PERSON",
            roleName: "সেলস পারসন",
          });
          setNewEmpName("");
          setNewEmpPhone("");
          setNewEmpEmail("");
          setNewEmpPassword("");
          setNewEmpNid("");
          setNewEmpFather("");
          setNewEmpFatherNid("");
          setNewEmpMother("");
        }}
        newEmpName={newEmpName}
        setNewEmpName={setNewEmpName}
        newEmpPhone={newEmpPhone}
        setNewEmpPhone={setNewEmpPhone}
        newEmpEmail={newEmpEmail}
        setNewEmpEmail={setNewEmpEmail}
        newEmpPassword={newEmpPassword}
        setNewEmpPassword={setNewEmpPassword}
        newEmpNid={newEmpNid}
        setNewEmpNid={setNewEmpNid}
        newEmpFather={newEmpFather}
        setNewEmpFather={setNewEmpFather}
        newEmpFatherNid={newEmpFatherNid}
        setNewEmpFatherNid={setNewEmpFatherNid}
        newEmpMother={newEmpMother}
        setNewEmpMother={setNewEmpMother}
        newEmpPhotoUrl={newEmpPhotoUrl}
        setNewEmpPhotoUrl={setNewEmpPhotoUrl}
        newEmpJoinDate={newEmpJoinDate}
        setNewEmpJoinDate={setNewEmpJoinDate}
      />

      <EmployeeDetailModal
        employee={selectedViewEmployee}
        onClose={() => setSelectedViewEmployee(null)}
      />
    </div>
  );
};
