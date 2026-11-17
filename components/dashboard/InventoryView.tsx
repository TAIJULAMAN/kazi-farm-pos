"use client";

import React from "react";
import { Search, Plus, AlertTriangle } from "lucide-react";
import { Product } from "@/types";

interface InventoryViewProps {
  products: Product[];
  inventoryCatFilter: string;
  setInventoryCatFilter: (cat: string) => void;
  inventorySearch: string;
  setInventorySearch: (s: string) => void;
  onOpenStockModal: (productId?: string) => void;
  onSelectProduct: (p: Product) => void;
  isSuper: boolean;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  products,
  inventoryCatFilter,
  setInventoryCatFilter,
  inventorySearch,
  setInventorySearch,
  onOpenStockModal,
  onSelectProduct,
  isSuper,
}) => {
  const categories = [
    { id: "ALL", name: "সব" },
    { id: "FRY", name: "ফ্রাই" },
    { id: "FROZEN", name: "ফ্রোজেন" },
    { id: "ICE_CREAM", name: "আইসক্রিম" },
    { id: "DRINKS", name: "কোল্ড ড্রিংকস" },
    { id: "BAKERY", name: "বেকারি" },
  ];

  const filteredProducts = products.filter(
    (p) =>
      (inventoryCatFilter === "ALL" || p.cat === inventoryCatFilter) &&
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
      {/* Table Header Filter & Actions */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-slate-900 text-sm">
            স্টক ইনভেন্টরি তালিকা ({products.length} টি আইটেম)
          </h3>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Quick Cat Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto text-xs">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setInventoryCatFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  inventoryCatFilter === tab.id
                    ? "bg-[#E31B23] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Table Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="ইনভেন্টরি সার্চ..."
              value={inventorySearch}
              onChange={(e) => setInventorySearch(e.target.value)}
              className="pl-8 pr-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-[#E31B23] focus:outline-none"
            />
          </div>

          {isSuper && (
            <button
              onClick={() => onOpenStockModal()}
              className="px-3 py-1 bg-[#E31B23] hover:bg-[#C8151C] text-white rounded-lg text-xs font-bold transition flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>স্টক বৃদ্ধি</span>
            </button>
          )}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="p-3">কোড</th>
              <th className="p-3">পণ্যের নাম</th>
              <th className="p-3">ক্যাটাগরি</th>
              {isSuper && <th className="p-3 text-right">ক্রয়মূল্য</th>}
              <th className="p-3 text-right">বিক্রয়মূল্য</th>
              {isSuper && <th className="p-3 text-right">মুনাফা/পিস</th>}
              <th className="p-3 text-center">বর্তমান স্টক</th>
              <th className="p-3 text-center">অ্যালার্ট লিমিট</th>
              <th className="p-3 text-center">স্ট্যাটাস</th>
              <th className="p-3 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredProducts.map((p) => {
              const isOut = p.stock === 0;
              const isLow = p.stock > 0 && p.stock <= p.alertLimit;
              const profit = p.price - p.cost;

              return (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3 font-mono font-bold text-slate-700">
                    {p.id}
                  </td>
                  <td
                    className="p-3 font-semibold text-slate-900 cursor-pointer hover:text-[#E31B23]"
                    onClick={() => onSelectProduct(p)}
                  >
                    {p.name}
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {p.catName}
                    </span>
                  </td>
                  {isSuper && (
                    <td className="p-3 text-right text-slate-500">
                      ৳ {p.cost}
                    </td>
                  )}
                  <td className="p-3 text-right font-bold text-slate-900">
                    ৳ {p.price}
                  </td>
                  {isSuper && (
                    <td className="p-3 text-right font-semibold text-emerald-600">
                      +৳ {profit}
                    </td>
                  )}
                  <td className="p-3 text-center">
                    <span
                      className={`font-black text-sm ${isOut ? "text-rose-600" : isLow ? "text-amber-600" : "text-slate-800"}`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="p-3 text-center text-slate-400">
                    {p.alertLimit} পিস
                  </td>
                  <td className="p-3 text-center">
                    {isOut ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        স্টক শেষ
                      </span>
                    ) : isLow ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        সীমিত স্টক
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        পর্যাপ্ত
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={() => onSelectProduct(p)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition"
                      >
                        ডিটেইলস
                      </button>
                      {isSuper && (
                        <button
                          onClick={() => onOpenStockModal(p.id)}
                          className="px-2.5 py-1 bg-red-50/60 hover:bg-[#E31B23] text-[#E31B23] hover:text-white rounded-lg text-[11px] font-semibold transition"
                        >
                          + স্টক
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
