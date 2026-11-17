"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCardsView } from "@/components/dashboard/ProductCardsView";

export default function ProductsPage() {
  const { products, setSelectedProductDetail } = useApp();
  const [productCardCatFilter, setProductCardCatFilter] = useState("ALL");
  const [productCardSearch, setProductCardSearch] = useState("");

  return (
    <AppShell currentView="PRODUCT_CARDS">
      <ProductCardsView
        products={products}
        productCardCatFilter={productCardCatFilter}
        setProductCardCatFilter={setProductCardCatFilter}
        productCardSearch={productCardSearch}
        setProductCardSearch={setProductCardSearch}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
      />
    </AppShell>
  );
}
