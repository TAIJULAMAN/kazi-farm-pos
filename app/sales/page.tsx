"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import { ProductSalesView } from "@/components/dashboard/ProductSalesView";

export default function SalesPage() {
  const { products, currentUser, setSelectedProductDetail } = useApp();
  const isSuper = currentUser?.role === "SUPER_ADMIN";

  return (
    <AppShell currentView="PRODUCT_SALES">
      <ProductSalesView
        products={products}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
        isSuper={isSuper}
      />
    </AppShell>
  );
}
