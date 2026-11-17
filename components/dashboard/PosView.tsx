"use client";

import React from "react";
import {
  Search,
  Plus,
  Trash2,
  Printer,
  CreditCard,
  Smartphone,
  Check,
} from "lucide-react";
import { Product, CartItem, PaymentMethod } from "@/types";

interface PosViewProps {
  products: Product[];
  posCategoryFilter: string;
  setPosCategoryFilter: (cat: string) => void;
  posSearchQuery: string;
  setPosSearchQuery: (q: string) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQty: (productId: string, delta: number) => void;
  discountAmount: number;
  setDiscountAmount: (amt: number) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (pm: PaymentMethod) => void;
  cartSubtotal: number;
  cartGrandTotal: number;
  onCheckout: () => void;
}

export const PosView: React.FC<PosViewProps> = ({
  products,
  posCategoryFilter,
  setPosCategoryFilter,
  posSearchQuery,
  setPosSearchQuery,
  cart,
  addToCart,
  updateCartQty,
  discountAmount,
  setDiscountAmount,
  paymentMethod,
  setPaymentMethod,
  cartSubtotal,
  cartGrandTotal,
  onCheckout,
}) => {
  const categories = [
    { id: "ALL", name: "সব পণ্য" },
    { id: "FRY", name: "ফ্রাই" },
    { id: "FROZEN", name: "ফ্রোজেন" },
    { id: "ICE_CREAM", name: "আইসক্রিম" },
    { id: "DRINKS", name: "ড্রিংকস" },
    { id: "BAKERY", name: "বেকারি" },
  ];

  const filteredProducts = products.filter(
    (p) =>
      (posCategoryFilter === "ALL" || p.cat === posCategoryFilter) &&
      p.name.toLowerCase().includes(posSearchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full items-start">
      {/* Left Column: POS Product Catalog */}
      <div className="flex-1 w-full space-y-4">
        {/* Category Selector & Quick Search */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPosCategoryFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
                  posCategoryFilter === tab.id
                    ? "bg-[#E31B23] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="আইটেম খুঁজুন..."
              value={posSearchQuery}
              onChange={(e) => setPosSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#E31B23] focus:outline-none"
            />
          </div>
        </div>

        {/* POS Fast Click Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {filteredProducts.map((p) => {
            const isOut = p.stock === 0;
            return (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                className={`bg-white p-3 rounded-2xl border shadow-2xs transition flex flex-col justify-between select-none ${
                  isOut
                    ? "border-rose-200 opacity-60 cursor-not-allowed"
                    : "border-slate-200 hover:border-[#E31B23] cursor-pointer hover:shadow-md active:scale-98"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {p.catName}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isOut
                          ? "text-rose-600 bg-rose-50"
                          : "text-emerald-600 bg-emerald-50"
                      }`}
                    >
                      {isOut ? "স্টক শেষ" : `স্টক: ${p.stock}`}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs mt-1.5 leading-snug line-clamp-2">
                    {p.name}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-black text-[#E31B23]">
                    ৳ {p.price}
                  </span>
                  <button
                    disabled={isOut}
                    className="w-6 h-6 rounded-lg bg-red-50/60 hover:bg-[#E31B23] text-[#E31B23] hover:text-white flex items-center justify-center font-bold text-xs transition disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: POS Cart & Billing Panel */}
      <div className="w-full lg:w-96 bg-white rounded-2xl border border-slate-200/80 shadow-lg p-5 flex flex-col justify-between flex-shrink-0 min-h-[580px]">
        <div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                বর্তমান অর্ডার তালিকা (Cart)
              </h3>
              <p className="text-[10px] text-slate-400">
                {cart.length} টি আইটেম যোগ করা হয়েছে
              </p>
            </div>
            <span className="px-2 py-0.5 bg-red-50 text-[#E31B23] font-bold text-xs rounded-md">
              কাউন্টার #১
            </span>
          </div>

          {/* Cart Items List */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <p>কার্ট বর্তমানে খালি</p>
                <p className="text-[10px] text-slate-400 mt-1">
                  বাম পাশ থেকে পণ্য ক্লিক করে কার্টে যোগ করুন
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center"
                >
                  <div className="flex-1 mr-2">
                    <p className="font-semibold text-slate-800 text-xs line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      ৳ {item.price} × {item.qty} ={" "}
                      <span className="font-bold text-slate-700">
                        ৳ {item.price * item.qty}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => updateCartQty(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center font-bold hover:bg-slate-100 text-xs"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-xs text-slate-900">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateCartQty(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center font-bold hover:bg-slate-100 text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Payment & Summary Calculation */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          {/* Discount Input */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 font-medium">
              বিশেষ ছাড় (Discount ৳):
            </span>
            <input
              type="number"
              min="0"
              value={discountAmount}
              onChange={(e) =>
                setDiscountAmount(Math.max(0, parseInt(e.target.value) || 0))
              }
              className="w-20 p-1 text-right border border-slate-200 rounded-lg text-xs font-bold focus:ring-1 focus:ring-[#E31B23] focus:outline-none"
            />
          </div>

          {/* Subtotal & Total */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>সাবটোটাল:</span>
              <span className="font-semibold text-slate-700">
                ৳ {cartSubtotal}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>ছাড়:</span>
              <span className="font-semibold text-rose-600">
                - ৳ {discountAmount}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-1 border-t border-slate-100">
              <span className="font-extrabold text-slate-900 text-sm">
                সর্বমোট পরিশোধযোগ্য:
              </span>
              <span className="text-xl font-black text-[#E31B23]">
                ৳ {cartGrandTotal}
              </span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              পেমেন্ট মাধ্যম বেছে নিন:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("নগদ (Cash)")}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center space-x-1.5 text-xs font-bold transition ${
                  paymentMethod === "নগদ (Cash)"
                    ? "border-[#E31B23] bg-red-50/60 text-[#E31B23]"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>নগদ (Cash)</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("বিকাশ (bKash)")}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center space-x-1.5 text-xs font-bold transition ${
                  paymentMethod === "বিকাশ (bKash)"
                    ? "border-[#C5994A] bg-amber-50 text-[#C5994A]"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>বিকাশ (bKash)</span>
              </button>
            </div>
          </div>

          {/* Checkout Action Button */}
          <button
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="w-full py-3.5 bg-[#E31B23] hover:bg-[#C8151C] text-white rounded-xl font-black text-sm shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>অর্ডার কনফার্ম ও ক্যাশ রসিদ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
