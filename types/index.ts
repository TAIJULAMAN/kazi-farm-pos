export interface Product {
  id: string;
  name: string;
  cat: string;
  catName: string;
  cost: number;
  price: number;
  stock: number;
  alertLimit: number;
  timesSold: number;
  qtySold: number;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  nid: string;
  father: string;
  fatherNid: string;
  mother: string;
  photoUrl?: string;
  joinDate: string;
  joinDateBangla: string;
  emergency: string;
  blood: string;
  address: string;
  role: 'SUPER_ADMIN' | 'SALES_PERSON';
  roleName: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface CompletedOrder {
  orderNum: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'নগদ (Cash)' | 'বিকাশ (bKash)';
  salesPerson: string;
  date: string;
}

export type ViewType =
  | 'DASHBOARD'
  | 'PRODUCT_CARDS'
  | 'POS'
  | 'INVENTORY'
  | 'PRODUCT_SALES'
  | 'EMPLOYEES'
  | 'PROFILE';

export type PaymentMethod = 'নগদ (Cash)' | 'বিকাশ (bKash)';

