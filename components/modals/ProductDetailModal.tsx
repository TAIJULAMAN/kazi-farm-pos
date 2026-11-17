"use client";

import React from "react";
import { X, Check, Plus, AlertTriangle } from "lucide-react";
import { Product } from "@/types";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onQuickRestock: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  isSuper: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onQuickRestock,
  onAddToCart,
  isSuper,
}) => {
  if (!product) return null;

  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock <= product.alertLimit;
  const profitMargin = Math.round(
    ((product.price - product.cost) / product.cost) * 100,
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-xs">
        <div className="flex justify-between items-start pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              {product.catName}
            </span>
            <h3 className="font-bold text-slate-900 text-base mt-1">
              {product.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              আইডি কোড: {product.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stock Status Bar */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-600">
              বর্তমান স্টক পরিস্থিতি:
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                isOut
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : isLow
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {isOut ? "স্টক শেষ" : isLow ? "সীমিত স্টক" : "পর্যাপ্ত স্টক"}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-black text-slate-900">
              {product.stock}{" "}
              <span className="text-xs font-normal text-slate-400">
                পিস অবশিষ্ট
              </span>
            </span>
            <span className="text-slate-400 text-[11px]">
              অ্যালার্ট লিমিট: {product.alertLimit} পিস
            </span>
          </div>
        </div>

        {/* Commercial Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">
              খুচরা বিক্রয়মূল্য
            </span>
            <span className="text-lg font-black text-[#E31B23]">
              ৳ {product.price}
            </span>
          </div>
          {isSuper ? (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">
                আউটলেট ক্রয়মূল্য (Cost)
              </span>
              <span className="text-lg font-bold text-slate-700">
                ৳ {product.cost}
              </span>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">
                মোট বিক্রয় সংখ্যা
              </span>
              <span className="text-lg font-bold text-slate-700">
                {product.timesSold} বার
              </span>
            </div>
          )}
        </div>

        {isSuper && (
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex justify-between items-center">
            <span className="text-emerald-800 font-semibold">
              নিট মুনাফা মার্জিন:
            </span>
            <span className="font-black text-emerald-700 text-sm">
              ৳ {product.price - product.cost} ({profitMargin}%)
            </span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {isSuper && (
            <button
              onClick={() => {
                onQuickRestock(product.id);
                onClose();
              }}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition flex items-center justify-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>স্টক যোগ</span>
            </button>
          )}
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            disabled={isOut}
            className="flex-1 py-2.5 bg-[#E31B23] hover:bg-[#C8151C] text-white rounded-xl font-bold transition disabled:opacity-40 flex items-center justify-center space-x-1"
          >
            <Check className="w-4 h-4" />
            <span>কার্টে যোগ করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
