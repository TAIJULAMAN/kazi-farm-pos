"use client";

import React from "react";
import { X, Plus } from "lucide-react";
import { Product } from "@/types";

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  stockModalProductId: string;
  setStockModalProductId: (id: string) => void;
  stockModalQty: number;
  setStockModalQty: (qty: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddStockModal: React.FC<AddStockModalProps> = ({
  isOpen,
  onClose,
  products,
  stockModalProductId,
  setStockModalProductId,
  stockModalQty,
  setStockModalQty,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">
            ইনভেন্টরি স্টক বৃদ্ধি করুন
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              পণ্য নির্বাচন করুন:
            </label>
            <select
              value={stockModalProductId}
              onChange={(e) => setStockModalProductId(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-semibold focus:ring-1 focus:ring-[#E31B23]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (বর্তমান: {p.stock} পিস)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              নতুন স্টক পরিমাণ (পিস):
            </label>
            <input
              type="number"
              min="1"
              value={stockModalQty}
              onChange={(e) =>
                setStockModalQty(Math.max(1, parseInt(e.target.value) || 0))
              }
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#E31B23]"
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
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
              <Plus className="w-3.5 h-3.5" />
              <span>স্টক যুক্ত করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
