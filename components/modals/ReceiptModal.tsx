"use client";

import React from "react";
import { X, Check, Printer } from "lucide-react";
import { CompletedOrder } from "@/types";

interface ReceiptModalProps {
  isOpen: boolean;
  order: CompletedOrder | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  order,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-xs">
        <div className="text-center pb-3 border-b border-dashed border-slate-300">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-1 border border-slate-200 p-1">
            <img
              src="/kazi-logo.jpg"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">
            কাজী ফার্মস কিচেন
          </h3>
          <p className="text-[10px] text-slate-500">
            মিরপুর-১০ গোলচত্বর শাখা, ঢাকা
          </p>
          <p className="text-[10px] text-slate-400 font-mono">
            অর্ডার: {order.orderNum} | {order.date}
          </p>
        </div>

        {/* Item Rows */}
        <div className="space-y-1.5 py-2 border-b border-dashed border-slate-300">
          {order.items.map((it) => (
            <div key={it.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800">{it.name}</p>
                <p className="text-[10px] text-slate-400">
                  ৳ {it.price} × {it.qty}
                </p>
              </div>
              <span className="font-bold text-slate-900">
                ৳ {it.price * it.qty}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-slate-500">
            <span>সাবটোটাল:</span>
            <span>৳ {order.subtotal}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>ছাড়:</span>
            <span>- ৳ {order.discount}</span>
          </div>
          <div className="flex justify-between font-black text-slate-900 text-sm pt-1 border-t border-slate-200">
            <span>পরিশোধিত মোট:</span>
            <span className="text-[#E31B23]">৳ {order.total}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-[10px] pt-1">
            <span>পেমেন্ট মাধ্যম:</span>
            <span className="font-bold text-slate-700">
              {order.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between text-slate-400 text-[10px]">
            <span>ক্যাশিয়ার:</span>
            <span>{order.salesPerson}</span>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-[10px] text-slate-400">
            কাজী ফার্মস কিচেনে আসার জন্য ধন্যবাদ! আবার আসবেন।
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-slate-700 transition"
          >
            বন্ধ করুন
          </button>
          <button
            onClick={() => {
              window.print();
              onClose();
            }}
            className="flex-1 py-2.5 bg-[#E31B23] hover:bg-[#C8151C] text-white rounded-xl font-bold transition flex items-center justify-center space-x-1"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>প্রিন্ট রসিদ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
