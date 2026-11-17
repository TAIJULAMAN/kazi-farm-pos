"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { initialEmployees, initialProducts } from "@/data/mock-data";
import {
  Product,
  Employee,
  CartItem,
  CompletedOrder,
  PaymentMethod,
} from "@/types";

interface AppContextType {
  currentUser: Employee | null;
  setCurrentUser: (emp: Employee | null) => void;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  employees: Employee[];
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQty: (productId: string, delta: number) => void;
  cartSubtotal: number;
  cartGrandTotal: number;
  discountAmount: number;
  setDiscountAmount: (val: number) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (pm: PaymentMethod) => void;
  checkout: () => void;
  completedOrder: CompletedOrder | null;
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
  addStock: (productId: string, qty: number) => void;
  addEmployee: (empData: Omit<Employee, "id">) => void;
  toastMessage: string | null;
  toastType: "success" | "error";
  showToast: (msg: string, type?: "success" | "error") => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (p: Product | null) => void;
  isAddStockModalOpen: boolean;
  setIsAddStockModalOpen: (open: boolean) => void;
  stockModalProductId: string;
  setStockModalProductId: (id: string) => void;
  stockModalQty: number;
  setStockModalQty: (qty: number) => void;
  selectedViewEmployee: Employee | null;
  setSelectedViewEmployee: (emp: Employee | null) => void;
  isAddEmployeeModalOpen: boolean;
  setIsAddEmployeeModalOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (v: boolean | ((prev: boolean) => boolean)) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  searchResults: { products: Product[]; employees: Employee[] };
  lowStockProducts: Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Authentication & session (defaults to super admin কবির হোসেন for quick experience)
  const [currentUser, setCurrentUser] = useState<Employee | null>(
    initialEmployees[0],
  );
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("নগদ (Cash)");
  const [orderCounter, setOrderCounter] = useState(2482);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(
    null,
  );

  // Modals & Popups
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] =
    useState<Product | null>(null);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [stockModalProductId, setStockModalProductId] = useState("FRY-01");
  const [stockModalQty, setStockModalQty] = useState(25);
  const [selectedViewEmployee, setSelectedViewEmployee] =
    useState<Employee | null>(null);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  // UI state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Login action
  const login = (email: string, pass: string): boolean => {
    const user = employees.find(
      (emp) =>
        emp.email.toLowerCase() === email.trim().toLowerCase() &&
        emp.password === pass,
    );
    if (!user) {
      showToast("ভুল ইমেইল বা পাসওয়ার্ড! আবার চেষ্টা করুন।", "error");
      return false;
    }
    setCurrentUser(user);
    showToast(`স্বাগতম, ${user.name}! (${user.roleName})`);
    if (user.role === "SUPER_ADMIN") {
      router.push("/dashboard");
    } else {
      router.push("/pos");
    }
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast("লগআউট সম্পন্ন হয়েছে");
    router.push("/login");
  };

  // Cart logic
  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      showToast("দুঃখিত! এই পণ্যটির স্টক শেষ।", "error");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.qty + 1 > product.stock) {
          showToast(`সর্বোচ্চ স্টক অবশিষ্ট আছে: ${product.stock} পিস`, "error");
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
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
        showToast(`সর্বোচ্চ স্টক সীমা: ${product.stock} পিস`, "error");
        return prev;
      }
      return prev.map((i) => (i.id === productId ? { ...i, qty: newQty } : i));
    });
  };

  const cartSubtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cart],
  );
  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount);

  const checkout = () => {
    if (cart.length === 0) return;

    setProducts((prev) =>
      prev.map((p) => {
        const inCart = cart.find((item) => item.id === p.id);
        if (inCart) {
          return {
            ...p,
            stock: Math.max(0, p.stock - inCart.qty),
            timesSold: p.timesSold + 1,
            qtySold: p.qtySold + inCart.qty,
          };
        }
        return p;
      }),
    );

    const newOrder: CompletedOrder = {
      orderNum: `ORD-${orderCounter}`,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      total: cartGrandTotal,
      paymentMethod,
      salesPerson: currentUser?.name || "সেলস পারসন",
      date: "২৯ অক্টোবর ২০২৬ | রাত ১১:৫৫",
    };

    setCompletedOrder(newOrder);
    setOrderCounter((prev) => prev + 1);
    setIsReceiptModalOpen(true);
    setCart([]);
    setDiscountAmount(0);
    showToast("অর্ডার সম্পন্ন হয়েছে ও স্টক সমন্বয় করা হয়েছে!");
  };

  const addStock = (productId: string, qty: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return { ...p, stock: p.stock + qty };
        }
        return p;
      }),
    );
    const prod = products.find((p) => p.id === productId);
    setIsAddStockModalOpen(false);
    showToast(`স্টক বৃদ্ধি সম্পন্ন: +${qty} পিস (${prod?.name})`);
  };

  const addEmployee = (empData: Omit<Employee, "id">) => {
    const newEmp: Employee = {
      ...empData,
      id: employees.length + 1,
    };
    setEmployees((prev) => [...prev, newEmp]);
    setIsAddEmployeeModalOpen(false);
    showToast(`নতুন কর্মচারী নিবন্ধিত: ${newEmp.name}`);
  };

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stock <= p.alertLimit);
  }, [products]);

  const searchResults = useMemo(() => {
    if (!globalSearchQuery.trim()) return { products: [], employees: [] };
    const q = globalSearchQuery.toLowerCase();
    return {
      products: products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.catName.toLowerCase().includes(q),
      ),
      employees: employees.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.phone.includes(q),
      ),
    };
  }, [globalSearchQuery, products, employees]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
        employees,
        products,
        setProducts,
        cart,
        addToCart,
        updateCartQty,
        cartSubtotal,
        cartGrandTotal,
        discountAmount,
        setDiscountAmount,
        paymentMethod,
        setPaymentMethod,
        checkout,
        completedOrder,
        isReceiptModalOpen,
        setIsReceiptModalOpen,
        addStock,
        addEmployee,
        toastMessage,
        toastType,
        showToast,
        selectedProductDetail,
        setSelectedProductDetail,
        isAddStockModalOpen,
        setIsAddStockModalOpen,
        stockModalProductId,
        setStockModalProductId,
        stockModalQty,
        setStockModalQty,
        selectedViewEmployee,
        setSelectedViewEmployee,
        isAddEmployeeModalOpen,
        setIsAddEmployeeModalOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        globalSearchQuery,
        setGlobalSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationOpen,
        setIsNotificationOpen,
        searchResults,
        lowStockProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
