"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { ViewType } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const {
    currentUser,
    products,
    lowStockProducts,
    setIsAddStockModalOpen,
    setSelectedProductDetail,
  } = useApp();

  const isSuper = currentUser?.role === "SUPER_ADMIN";

  const handleNavigateView = (view: ViewType) => {
    switch (view) {
      case "DASHBOARD":
        router.push("/dashboard");
        break;
      case "PRODUCT_CARDS":
        router.push("/products");
        break;
      case "POS":
        router.push("/pos");
        break;
      case "INVENTORY":
        router.push("/inventory");
        break;
      case "PRODUCT_SALES":
        router.push("/sales");
        break;
      case "EMPLOYEES":
        router.push("/employees");
        break;
      case "PROFILE":
        router.push("/profile");
        break;
    }
  };

  return (
    <AppShell currentView="DASHBOARD">
      <DashboardOverview
        products={products}
        lowStockProducts={lowStockProducts}
        setCurrentView={handleNavigateView}
        onOpenStockModal={() => setIsAddStockModalOpen(true)}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
        isSuper={isSuper}
      />
    </AppShell>
  );
}
