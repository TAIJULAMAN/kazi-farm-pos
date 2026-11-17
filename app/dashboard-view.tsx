'use client';

import React, { useState, useMemo } from 'react';
import { initialEmployees, initialProducts } from '@/data/mock-data';
import { Product, Employee, CartItem, CompletedOrder, ViewType, PaymentMethod } from '@/types';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { LoginView } from '@/components/layout/LoginView';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ProductCardsView } from '@/components/dashboard/ProductCardsView';
import { PosView } from '@/components/dashboard/PosView';
import { InventoryView } from '@/components/dashboard/InventoryView';
import { ProductSalesView } from '@/components/dashboard/ProductSalesView';
import { EmployeesView } from '@/components/dashboard/EmployeesView';
import { ProfileView } from '@/components/dashboard/ProfileView';
import { ReceiptModal } from '@/components/modals/ReceiptModal';
import { AddStockModal } from '@/components/modals/AddStockModal';
import { ProductDetailModal } from '@/components/modals/ProductDetailModal';
import { AddEmployeeModal } from '@/components/modals/AddEmployeeModal';
import { EmployeeDetailModal } from '@/components/modals/EmployeeDetailModal';

export default function DashboardView() {
  // Session & Authentication
  const [currentUser, setCurrentUser] = useState<Employee | null>(initialEmployees[0]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Routing
  const [currentView, setCurrentView] = useState<ViewType>('DASHBOARD');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Data Store
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Filters & Searches
  const [posCategoryFilter, setPosCategoryFilter] = useState('ALL');
  const [posSearchQuery, setPosSearchQuery] = useState('');
  const [productCardCatFilter, setProductCardCatFilter] = useState('ALL');
  const [productCardSearch, setProductCardSearch] = useState('');
  const [inventoryCatFilter, setInventoryCatFilter] = useState('ALL');
  const [inventorySearch, setInventorySearch] = useState('');

  // POS Checkout State
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('নগদ (Cash)');
  const [orderCounter, setOrderCounter] = useState(2482);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Modals
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [stockModalProductId, setStockModalProductId] = useState<string>('FRY-01');
  const [stockModalQty, setStockModalQty] = useState(25);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [selectedViewEmployee, setSelectedViewEmployee] = useState<Employee | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Global Search & Notification
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // New Employee Form State
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpPhone, setNewEmpPhone] = useState('');
  const [newEmpEmail, setNewEmpEmail] = useState('');
  const [newEmpPassword, setNewEmpPassword] = useState('');
  const [newEmpNid, setNewEmpNid] = useState('');
  const [newEmpFather, setNewEmpFather] = useState('');
  const [newEmpFatherNid, setNewEmpFatherNid] = useState('');
  const [newEmpMother, setNewEmpMother] = useState('');
  const [newEmpPhotoUrl, setNewEmpPhotoUrl] = useState('');
  const [newEmpJoinDate, setNewEmpJoinDate] = useState('2026-10-31');

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Login Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = employees.find(
      (emp) => emp.email.toLowerCase() === loginEmail.trim().toLowerCase() && emp.password === loginPassword
    );
    if (!user) {
      showToast('ভুল ইমেইল বা পাসওয়ার্ড! আবার চেষ্টা করুন।', 'error');
      return;
    }
    setCurrentUser(user);
    if (user.role === 'SUPER_ADMIN') {
      setCurrentView('DASHBOARD');
    } else {
      setCurrentView('POS');
    }
    showToast(`স্বাগতম, ${user.name}! (${user.roleName})`);
  };

  const handleQuickDemo = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    const user = employees.find((emp) => emp.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setCurrentView(user.role === 'SUPER_ADMIN' ? 'DASHBOARD' : 'POS');
      showToast(`স্বাগতম, ${user.name}! (${user.roleName})`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    showToast('সফলভাবে বের হয়ে গেছেন (লগআউট সম্পন্ন)');
  };

  // Cart operations
  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      showToast('দুঃখিত! এই পণ্যটির স্টক শেষ।', 'error');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.qty + 1 > product.stock) {
          showToast(`সর্বোচ্চ স্টক অবশিষ্ট আছে: ${product.stock} পিস`, 'error');
          return prev;
        }
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`কার্টে যোগ হয়েছে: ${product.name}`);
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (!item) return prev;
      const product = products.find((p) => p.id === productId);
      const newQty = item.qty + delta;

      if (newQty <= 0) {
        return prev.filter((i) => i.id !== productId);
      }
      if (product && newQty > product.stock) {
        showToast(`সর্বোচ্চ স্টক সীমা: ${product.stock} পিস`, 'error');
        return prev;
      }
      return prev.map((i) => (i.id === productId ? { ...i, qty: newQty } : i));
    });
  };

  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.qty, 0), [cart]);
  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount);

  // Complete Order
  const handleCheckout = () => {
    if (cart.length === 0) return;

    setProducts((prev) =>
      prev.map((p) => {
        const inCart = cart.find((item) => item.id === p.id);
        if (inCart) {
          return {
            ...p,
            stock: Math.max(0, p.stock - inCart.qty),
            timesSold: p.timesSold + 1,
            qtySold: p.qtySold + inCart.qty
          };
        }
        return p;
      })
    );

    const newOrder: CompletedOrder = {
      orderNum: `ORD-${orderCounter}`,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      total: cartGrandTotal,
      paymentMethod,
      salesPerson: currentUser?.name || 'সেলস পারসন',
      date: '২৯ অক্টোবর ২০২৬ | রাত ১১:৫৫'
    };

    setCompletedOrder(newOrder);
    setOrderCounter((prev) => prev + 1);
    setIsReceiptModalOpen(true);
    setCart([]);
    setDiscountAmount(0);
    showToast('অর্ডার সম্পন্ন হয়েছে ও স্টক সমন্বয় করা হয়েছে!');
  };

  // Add Stock Submit
  const handleAddStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === stockModalProductId) {
          return { ...p, stock: p.stock + stockModalQty };
        }
        return p;
      })
    );
    const prod = products.find((p) => p.id === stockModalProductId);
    setIsAddStockModalOpen(false);
    showToast(`স্টক সফলভাবে যোগ হয়েছে: +${stockModalQty} পিস (${prod?.name})`);
  };

  // Add Employee Submit
  const handleAddEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp: Employee = {
      id: employees.length + 1,
      name: newEmpName,
      phone: newEmpPhone,
      email: newEmpEmail,
      password: newEmpPassword,
      nid: newEmpNid,
      father: newEmpFather,
      fatherNid: newEmpFatherNid,
      mother: newEmpMother,
      photoUrl: newEmpPhotoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      joinDate: newEmpJoinDate,
      joinDateBangla: '৩১ অক্টোবর ২০২৬',
      emergency: '01700-112233 (পিতা)',
      blood: 'B+',
      address: 'মিরপুর, ঢাকা',
      role: 'SALES_PERSON',
      roleName: 'সেলস পারসন'
    };

    setEmployees((prev) => [...prev, newEmp]);
    setIsAddEmployeeModalOpen(false);
    setNewEmpName('');
    setNewEmpPhone('');
    setNewEmpEmail('');
    setNewEmpPassword('');
    setNewEmpNid('');
    setNewEmpFather('');
    setNewEmpFatherNid('');
    setNewEmpMother('');
    showToast(`নতুন কর্মচারী সফলভাবে নিবন্ধিত: ${newEmp.name}`);
  };

  // Low stock products
  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stock <= p.alertLimit);
  }, [products]);

  // Global search matching
  const searchResults = useMemo(() => {
    if (!globalSearchQuery.trim()) return { products: [], employees: [] };
    const q = globalSearchQuery.toLowerCase();
    return {
      products: products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.catName.toLowerCase().includes(q)
      ),
      employees: employees.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.phone.includes(q)
      )
    };
  }, [globalSearchQuery, products, employees]);

  // If not logged in, show Login
  if (!currentUser) {
    return (
      <LoginView
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        onLoginSubmit={handleLoginSubmit}
        onQuickDemo={handleQuickDemo}
      />
    );
  }

  const isSuper = currentUser.role === 'SUPER_ADMIN';

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 antialiased overflow-hidden font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-xl text-white text-xs font-bold transition flex items-center space-x-2 animate-bounce ${
            toastType === 'success' ? 'bg-[#E31B23]' : 'bg-rose-700'
          }`}
        >
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Left Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Header
          currentView={currentView}
          currentUser={currentUser}
          globalSearchQuery={globalSearchQuery}
          setGlobalSearchQuery={setGlobalSearchQuery}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchResults={searchResults}
          onSelectProduct={(p) => setSelectedProductDetail(p)}
          lowStockProducts={lowStockProducts}
          isNotificationOpen={isNotificationOpen}
          setIsNotificationOpen={setIsNotificationOpen}
          setCurrentView={setCurrentView}
        />

        {/* View Body */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-100">
          {currentView === 'DASHBOARD' && (
            <DashboardOverview
              products={products}
              lowStockProducts={lowStockProducts}
              setCurrentView={setCurrentView}
              onOpenStockModal={() => setIsAddStockModalOpen(true)}
              onSelectProduct={(p) => setSelectedProductDetail(p)}
              isSuper={isSuper}
            />
          )}

          {currentView === 'PRODUCT_CARDS' && (
            <ProductCardsView
              products={products}
              productCardCatFilter={productCardCatFilter}
              setProductCardCatFilter={setProductCardCatFilter}
              productCardSearch={productCardSearch}
              setProductCardSearch={setProductCardSearch}
              onSelectProduct={(p) => setSelectedProductDetail(p)}
            />
          )}

          {currentView === 'POS' && (
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
              onCheckout={handleCheckout}
            />
          )}

          {currentView === 'INVENTORY' && (
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
          )}

          {currentView === 'PRODUCT_SALES' && (
            <ProductSalesView
              products={products}
              onSelectProduct={(p) => setSelectedProductDetail(p)}
              isSuper={isSuper}
            />
          )}

          {currentView === 'EMPLOYEES' && isSuper && (
            <EmployeesView
              employees={employees}
              onOpenAddModal={() => setIsAddEmployeeModalOpen(true)}
              onSelectEmployee={(emp) => setSelectedViewEmployee(emp)}
            />
          )}

          {currentView === 'PROFILE' && (
            <ProfileView
              currentUser={currentUser}
              isEditingProfile={isEditingProfile}
              setIsEditingProfile={setIsEditingProfile}
              onSaveProfile={(updated) => setCurrentUser(updated)}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onQuickRestock={(prodId) => {
          setStockModalProductId(prodId);
          setIsAddStockModalOpen(true);
        }}
        onAddToCart={(p) => addToCart(p)}
        isSuper={isSuper}
      />

      <AddStockModal
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        products={products}
        stockModalProductId={stockModalProductId}
        setStockModalProductId={setStockModalProductId}
        stockModalQty={stockModalQty}
        setStockModalQty={setStockModalQty}
        onSubmit={handleAddStockSubmit}
      />

      <ReceiptModal
        isOpen={isReceiptModalOpen}
        order={completedOrder}
        onClose={() => setIsReceiptModalOpen(false)}
      />

      <AddEmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
        onSubmit={handleAddEmployeeSubmit}
        newEmpName={newEmpName}
        setNewEmpName={setNewEmpName}
        newEmpPhone={newEmpPhone}
        setNewEmpPhone={setNewEmpPhone}
        newEmpEmail={newEmpEmail}
        setNewEmpEmail={setNewEmpEmail}
        newEmpPassword={newEmpPassword}
        setNewEmpPassword={setNewEmpPassword}
        newEmpNid={newEmpNid}
        setNewEmpNid={setNewEmpNid}
        newEmpFather={newEmpFather}
        setNewEmpFather={setNewEmpFather}
        newEmpFatherNid={newEmpFatherNid}
        setNewEmpFatherNid={setNewEmpFatherNid}
        newEmpMother={newEmpMother}
        setNewEmpMother={setNewEmpMother}
        newEmpPhotoUrl={newEmpPhotoUrl}
        setNewEmpPhotoUrl={setNewEmpPhotoUrl}
        newEmpJoinDate={newEmpJoinDate}
        setNewEmpJoinDate={setNewEmpJoinDate}
      />

      <EmployeeDetailModal
        employee={selectedViewEmployee}
        onClose={() => setSelectedViewEmployee(null)}
      />
    </div>
  );
}
