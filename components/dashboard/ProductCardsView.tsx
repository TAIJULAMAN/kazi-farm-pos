"use client";

import React from "react";
import { Search } from "lucide-react";
import { Product } from "@/types";

interface ProductCardsViewProps {
  products: Product[];
  productCardCatFilter: string;
  setProductCardCatFilter: (cat: string) => void;
  productCardSearch: string;
  setProductCardSearch: (search: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCardsView: React.FC<ProductCardsViewProps> = ({
  products,
  productCardCatFilter,
  setProductCardCatFilter,
  productCardSearch,
  setProductCardSearch,
  onSelectProduct,
}) => {
  const categories = [
    { id: "ALL", name: "সকল ক্যাটাগরি" },
    { id: "FRY", name: "ফ্রাই আইটেমস" },
    { id: "FROZEN", name: "ফ্রোজেন আইটেমস" },
    { id: "ICE_CREAM", name: "আইসক্রিম আইটেমস" },
    { id: "DRINKS", name: "কোল্ড ড্রিংকস" },
    { id: "BAKERY", name: "বেকারি আইটেমস" },
  ];

  const filteredProducts = products.filter(
    (p) =>
      (productCardCatFilter === "ALL" || p.cat === productCardCatFilter) &&
      p.name.toLowerCase().includes(productCardSearch.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Category Tabs & Filter Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setProductCardCatFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition ${
                productCardCatFilter === tab.id
                  ? "bg-[#E31B23] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="পণ্য সার্চ করুন..."
            value={productCardSearch}
            onChange={(e) => setProductCardSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#E31B23] focus:outline-none"
          />
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((p) => {
          const isOut = p.stock === 0;
          const isLow = p.stock > 0 && p.stock <= p.alertLimit;
          return (
            <div
              key={p.id}
              onClick={() => onSelectProduct(p)}
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-[#E31B23] shadow-2xs hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex justify-between items-start gap-1">
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    {p.catName}
                  </span>
                  {isOut ? (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                      স্টক শেষ
                    </span>
                  ) : isLow ? (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      সীমিত স্টক
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      স্টকে আছে
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 text-sm mt-2 leading-snug">
                  {p.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  কোড: {p.id}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[11px] text-slate-500 font-medium">
                    বর্তমান স্টক:
                  </span>
                  <span
                    className={`text-xl font-extrabold ${
                      isOut
                        ? "text-rose-600"
                        : isLow
                          ? "text-amber-600"
                          : "text-slate-900"
                    }`}
                  >
                    {p.stock}{" "}
                    <span className="text-xs font-normal text-slate-400">
                      পিস
                    </span>
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${isOut ? "bg-rose-500" : isLow ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${Math.min(100, (p.stock / 60) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    বিক্রয়মূল্য
                  </span>
                  <span className="font-bold text-[#E31B23] text-sm">
                    ৳ {p.price}
                  </span>
                </div>
                <button className="px-3 py-1.5 bg-red-50/60 hover:bg-[#E31B23] text-[#E31B23] hover:text-white rounded-xl font-semibold transition text-[11px]">
                  বিস্তারিত দেখুন ➜
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
