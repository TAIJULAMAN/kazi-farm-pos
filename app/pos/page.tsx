"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import { PosView } from "@/components/dashboard/PosView";

export default function PosPage() {
  const {
    products,
    cart,
    addToCart,
    updateCartQty,
    discountAmount,
    setDiscountAmount,
    paymentMethod,
    setPaymentMethod,
    cartSubtotal,
    cartGrandTotal,
    checkout,
  } = useApp();

  const [posCategoryFilter, setPosCategoryFilter] = useState("ALL");
  const [posSearchQuery, setPosSearchQuery] = useState("");

  return (
    <AppShell currentView="POS">
      <PosView
        products={products}
        posCategoryFilter={posCategoryFilter}
        setPosCategoryFilter={setPosCategoryFilter}
        posSearchQuery={posSearchQuery}
        setPosSearchQuery={setPosSearchQuery}
        cart={cart}
        addToCart={addToCart}
        updateCartQty={updateCartQty}
        discountAmount={discountAmount}
        setDiscountAmount={setDiscountAmount}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cartSubtotal={cartSubtotal}
        cartGrandTotal={cartGrandTotal}
        onCheckout={checkout}
      />
    </AppShell>
  );
}
