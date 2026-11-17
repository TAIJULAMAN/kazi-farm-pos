"use client";

import React from "react";
import { Search, Bell, AlertTriangle } from "lucide-react";
import { Employee, ViewType, Product } from "@/types";

interface HeaderProps {
  currentView: ViewType;
  currentUser: Employee;
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchResults: { products: Product[]; employees: Employee[] };
  onSelectProduct: (p: Product) => void;
  lowStockProducts: Product[];
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  setCurrentView: (view: ViewType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  currentUser,
  globalSearchQuery,
  setGlobalSearchQuery,
  isSearchOpen,
  setIsSearchOpen,
  searchResults,
  onSelectProduct,
  lowStockProducts,
  isNotificationOpen,
  setIsNotificationOpen,
  setCurrentView,
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0 z-20">
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-3">
          <img
            src="/kazi-logo.jpg"
            alt="Kazi Farms Kitchen"
            className="h-8 w-auto object-contain hidden md:block rounded shadow-xs"
          />
          <h2 className="text-xl font-bold text-slate-800">
            {currentView === "DASHBOARD" && "ড্যাশবোর্ড ওভারভিউ (Analytics)"}
            {currentView === "PRODUCT_CARDS" &&
              "পণ্য স্টক কার্ড (Product Cards)"}
            {currentView === "POS" && "পয়েন্ট অফ সেল কাউন্টার (POS Billing)"}
            {currentView === "PRODUCT_SALES" &&
              "পণ্য বিক্রয় ট্র্যাকিং (Sales Times)"}
            {currentView === "INVENTORY" && "ইনভেন্টরি ও স্টক ম্যানেজমেন্ট"}
            {currentView === "EMPLOYEES" &&
              "কর্মচারী ডেটাবেজ ও এইচআর (Employees)"}
            {currentView === "PROFILE" && "আমার প্রোফাইল ও সেটিংস"}
          </h2>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Global Search Bar */}
        <div className="relative">
          <div className="flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-[#E31B23] focus-within:bg-white w-64 md:w-80 transition">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="পণ্য কোড, নাম বা কর্মী খুঁজুন..."
              value={globalSearchQuery}
              onChange={(e) => {
                setGlobalSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="bg-transparent border-none outline-none text-xs w-full text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && globalSearchQuery.trim() && (
            <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 max-h-96 overflow-y-auto z-50 text-xs">
              <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-100">
                <span className="font-bold text-slate-500 text-[11px]">
                  সার্চ ফলাফল
                </span>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Products match */}
              <div className="mb-3">
                <p className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                  পণ্যসমূহ ({searchResults.products.length})
                </p>
                {searchResults.products.length === 0 ? (
                  <p className="text-slate-400 italic">কোনো পণ্য পাওয়া যায়নি</p>
                ) : (
                  searchResults.products.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setIsSearchOpen(false);
                      }}
                      className="p-2 hover:bg-slate-50 rounded-xl cursor-pointer flex justify-between items-center transition"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">{p.name}</p>
                        <p className="text-[10px] text-slate-400">
                          কোড: {p.id} | {p.catName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#E31B23]">৳ {p.price}</p>
                        <p
                          className={`text-[10px] font-bold ${p.stock <= p.alertLimit ? "text-amber-600" : "text-emerald-600"}`}
                        >
                          স্টক: {p.stock} পিস
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Employees match (Super Admin only) */}
              {currentUser.role === "SUPER_ADMIN" && (
                <div>
                  <p className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                    কর্মচারীবৃন্দ ({searchResults.employees.length})
                  </p>
                  {searchResults.employees.length === 0 ? (
                    <p className="text-slate-400 italic">
                      কোনো কর্মচারী পাওয়া যায়নি
                    </p>
                  ) : (
                    searchResults.employees.map((emp) => (
                      <div
                        key={emp.id}
                        onClick={() => {
                          setCurrentView("EMPLOYEES");
                          setIsSearchOpen(false);
                        }}
                        className="p-2 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center space-x-2.5 transition"
                      >
                        <img
                          src={
                            emp.photoUrl ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                          }
                          alt={emp.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-slate-800">
                            {emp.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {emp.roleName} | {emp.phone}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Low Stock Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition"
            title="নোটিফিকেশন"
          >
            <Bell className="w-5 h-5" />
            {lowStockProducts.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#E31B23] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {lowStockProducts.length}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-80 z-50 text-xs">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 flex items-center">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mr-1.5" />
                  স্টক সতর্কতা ({lowStockProducts.length})
                </span>
                <button
                  onClick={() => setIsNotificationOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              {lowStockProducts.length === 0 ? (
                <p className="text-slate-500 text-center py-4">
                  বর্তমানে কোনো পণ্য সতর্কতার তালিকায় নেই। সব পণ্য পর্যাপ্ত
                  স্টকে আছে!
                </p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {lowStockProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setIsNotificationOpen(false);
                      }}
                      className="p-2.5 bg-amber-50 hover:bg-amber-100/70 border border-amber-200 rounded-xl cursor-pointer transition flex justify-between items-center"
                    >
                      <div>
                        <p className="font-bold text-slate-800">{p.name}</p>
                        <p className="text-[10px] text-amber-700">
                          সীমিত সীমা: {p.alertLimit} পিস
                        </p>
                      </div>
                      <span className="font-extrabold text-[#E31B23] text-xs">
                        {p.stock === 0 ? "স্টক শেষ!" : `মাত্র ${p.stock} পিস`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Current User Quick Badge */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800">
              {currentUser.name}
            </p>
            <p className="text-[10px] text-[#C5994A] font-semibold">
              {currentUser.roleName}
            </p>
          </div>
          <img
            src={
              currentUser.photoUrl ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            }
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-[#E31B23]"
          />
        </div>
      </div>
    </header>
  );
};
