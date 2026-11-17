"use client";

import React from "react";
import { Product } from "@/types";

interface ProductSalesViewProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  isSuper: boolean;
}

export const ProductSalesView: React.FC<ProductSalesViewProps> = ({
  products,
  onSelectProduct,
  isSuper,
}) => {
  // Sort products by times sold descending
  const sorted = [...products].sort((a, b) => b.timesSold - a.timesSold);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            কোন পণ্য কতবার বিক্রি হয়েছে (Sales Performance)
          </h3>
          <p className="text-[11px] text-slate-400">
            সর্বোচ্চ বিক্রিত পণ্য থেকে ক্রমানুসারে সাজানো তালিকা
          </p>
        </div>
        <div className="text-xs bg-red-50/60 text-[#6D1E22] px-3.5 py-1.5 rounded-xl border border-red-200 font-semibold">
          মোট রেকর্ড: {products.length} টি পণ্য
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="p-3 text-center">র‍্যাংক</th>
              <th className="p-3">কোড</th>
              <th className="p-3">পণ্যের নাম</th>
              <th className="p-3">ক্যাটাগরি</th>
              <th className="p-3 text-right">মূল্য</th>
              <th className="p-3 text-center bg-red-50/60 text-[#6D1E22] font-bold">
                মোট কতবার বিক্রি (Times)
              </th>
              <th className="p-3 text-center font-bold text-slate-800">
                মোট পরিমাণ (Qty Sold)
              </th>
              <th className="p-3 text-right">মোট রাজস্ব আয়</th>
              {isSuper && <th className="p-3 text-right">মোট অর্জিত মুনাফা</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {sorted.map((p, idx) => {
              const totalRevenue = p.qtySold * p.price;
              const totalProfit = p.qtySold * (p.price - p.cost);

              return (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 text-center font-bold">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                        idx === 0
                          ? "bg-amber-400 text-amber-950 font-black"
                          : idx === 1
                            ? "bg-slate-300 text-slate-900 font-black"
                            : idx === 2
                              ? "bg-amber-600 text-white font-black"
                              : "text-slate-400"
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </td>
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
                  <td className="p-3 text-right text-slate-600">৳ {p.price}</td>
                  <td className="p-3 text-center bg-red-50/30 font-black text-sm text-[#E31B23]">
                    {p.timesSold} বার
                  </td>
                  <td className="p-3 text-center font-bold text-slate-800">
                    {p.qtySold} পিস
                  </td>
                  <td className="p-3 text-right font-black text-slate-900">
                    ৳ {totalRevenue.toLocaleString()}
                  </td>
                  {isSuper && (
                    <td className="p-3 text-right font-bold text-emerald-600">
                      +৳ {totalProfit.toLocaleString()}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
