"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import { InventoryView } from "@/components/dashboard/InventoryView";

export default function InventoryPage() {
  const {
    products,
    currentUser,
    setStockModalProductId,
    setIsAddStockModalOpen,
    setSelectedProductDetail,
  } = useApp();

  const [inventoryCatFilter, setInventoryCatFilter] = useState("ALL");
  const [inventorySearch, setInventorySearch] = useState("");
  const isSuper = currentUser?.role === "SUPER_ADMIN";

  return (
    <AppShell currentView="INVENTORY">
      <InventoryView
        products={products}
        inventoryCatFilter={inventoryCatFilter}
        setInventoryCatFilter={setInventoryCatFilter}
        inventorySearch={inventorySearch}
        setInventorySearch={setInventorySearch}
        onOpenStockModal={(prodId) => {
          if (prodId) setStockModalProductId(prodId);
          setIsAddStockModalOpen(true);
        }}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
        isSuper={isSuper}
      />
    </AppShell>
  );
}
