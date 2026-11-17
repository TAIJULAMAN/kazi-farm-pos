import { Employee, Product } from '@/types';

export const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'কবির হোসেন',
    email: 'admin@kazifarms.com',
    password: 'admin123',
    phone: '01711-000001',
    nid: '19902692518000941',
    father: 'মকবুল হোসেন',
    fatherNid: '19652692518000112',
    mother: 'রাশিদা বেগম',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    joinDate: '2020-01-01',
    joinDateBangla: '০১ জানুয়ারি ২০২০',
    emergency: '01912-345678 (ভাই)',
    blood: 'O+',
    address: 'প্লট-১২, রোড-৪, মিরপুর-১০, ঢাকা-১২১৬',
    role: 'SUPER_ADMIN',
    roleName: 'সুপার অ্যাডমিন'
  },
  {
    id: 2,
    name: 'সালমান আহমেদ',
    email: 'salman@kazifarms.com',
    password: 'sales123',
    phone: '01911-000003',
    nid: '19962692518000782',
    father: 'আব্দুল করিম',
    fatherNid: '19702692518000455',
    mother: 'সুফিয়া খাতুন',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    joinDate: '2023-04-15',
    joinDateBangla: '১৫ এপ্রিল ২০২৩',
    emergency: '01819-876543 (পিতা)',
    blood: 'B+',
    address: 'বাসা-৪৫, ব্লক-সি, মিরপুর-২, ঢাকা',
    role: 'SALES_PERSON',
    roleName: 'সেলস পারসন'
  },
  {
    id: 3,
    name: 'নুসরাত জাহান',
    email: 'nusrat@kazifarms.com',
    password: 'sales123',
    phone: '01611-000004',
    nid: '19982692518000419',
    father: 'রেজাউল করিম',
    fatherNid: '19722692518000889',
    mother: 'নুরুন্নাহার',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    joinDate: '2024-02-01',
    joinDateBangla: '০১ ফেব্রুয়ারি ২০২৪',
    emergency: '01715-112233 (মাতা)',
    blood: 'A+',
    address: 'রোড-৭, পল্লবী, ঢাকা-১২১৬',
    role: 'SALES_PERSON',
    roleName: 'সেলস পারসন'
  }
];

export const initialProducts: Product[] = [
  // 1. ফ্রাই আইটেমস (Fry Items)
  { id: 'FRY-01', name: 'ক্রিস্পি ফ্রেঞ্চ ফ্রাই (লার্জ)', cat: 'FRY', catName: 'ফ্রাই আইটেমস', cost: 60, price: 120, stock: 45, alertLimit: 15, timesSold: 124, qtySold: 185 },
  { id: 'FRY-02', name: 'চিকেন নাগেটস (৬ পিস)', cat: 'FRY', catName: 'ফ্রাই আইটেমস', cost: 90, price: 160, stock: 28, alertLimit: 10, timesSold: 96, qtySold: 132 },
  { id: 'FRY-03', name: 'স্পাইসি চিকেন উইংস (৪ পিস)', cat: 'FRY', catName: 'ফ্রাই আইটেমস', cost: 110, price: 190, stock: 12, alertLimit: 15, timesSold: 82, qtySold: 94 },
  { id: 'FRY-04', name: 'ভেজিটেবল স্প্রিং রোল (৪ পিস)', cat: 'FRY', catName: 'ফ্রাই আইটেমস', cost: 40, price: 80, stock: 0, alertLimit: 10, timesSold: 65, qtySold: 80 },
  { id: 'FRY-05', name: 'চিকেন পপকর্ন (বক্স)', cat: 'FRY', catName: 'ফ্রাই আইটেমস', cost: 80, price: 150, stock: 35, alertLimit: 12, timesSold: 74, qtySold: 89 },
  { id: 'FRY-06', name: 'পটেটো ওয়েজেস (স্পাইসি)', cat: 'FRY', catName: 'ফ্রাই আইটেমস', cost: 50, price: 110, stock: 22, alertLimit: 10, timesSold: 58, qtySold: 71 },
  { id: 'FRY-07', name: 'চিকেন স্ট্রিপস ক্রাঞ্চি (৩ পিস)', cat: 'FRY', catName: 'ফ্রাই আইটেমস', cost: 95, price: 175, stock: 30, alertLimit: 10, timesSold: 67, qtySold: 85 },
  { id: 'FRY-08', name: 'হট ড্রামস্টিক ফ্রাইড চিকেন (২ পিস)', cat: 'FRY', catName: 'ফ্রাই আইটেমস', cost: 130, price: 220, stock: 19, alertLimit: 8, timesSold: 88, qtySold: 110 },

  // 2. ফ্রোজেন আইটেমস (Frozen Packs)
  { id: 'FRZ-01', name: 'কাজী চিকেন সসেজ (৫০০ গ্রাম)', cat: 'FROZEN', catName: 'ফ্রোজেন আইটেমস', cost: 190, price: 270, stock: 18, alertLimit: 8, timesSold: 42, qtySold: 55 },
  { id: 'FRZ-02', name: 'কাজী বাটার পরোটা (১০ পিস)', cat: 'FROZEN', catName: 'ফ্রোজেন আইটেমস', cost: 130, price: 190, stock: 14, alertLimit: 6, timesSold: 38, qtySold: 48 },
  { id: 'FRZ-03', name: 'কাজী বিফ মিটবল (৪০০ গ্রাম)', cat: 'FROZEN', catName: 'ফ্রোজেন আইটেমস', cost: 240, price: 340, stock: 4, alertLimit: 6, timesSold: 29, qtySold: 34 },
  { id: 'FRZ-04', name: 'কাজী চিকেন সমোসা প্যাক (১০ পিস)', cat: 'FROZEN', catName: 'ফ্রোজেন আইটেমস', cost: 115, price: 170, stock: 25, alertLimit: 10, timesSold: 54, qtySold: 68 },
  { id: 'FRZ-05', name: 'কাজী চিকেন সিঙ্গারা প্যাক (১০ পিস)', cat: 'FROZEN', catName: 'ফ্রোজেন আইটেমস', cost: 105, price: 160, stock: 21, alertLimit: 8, timesSold: 49, qtySold: 62 },
  { id: 'FRZ-06', name: 'চিকেন পেটি ফ্রোজেন প্যাক (৬ পিস)', cat: 'FROZEN', catName: 'ফ্রোজেন আইটেমস', cost: 180, price: 260, stock: 15, alertLimit: 7, timesSold: 36, qtySold: 44 },

  // 3. বেলিসিমো ও কাজী আইসক্রিম (Bellissimo & Kazi Ice Cream)
  { id: 'ICE-01', name: 'বেলিসিমো চকলেট কোন আইসক্রিম', cat: 'ICE_CREAM', catName: 'আইসক্রিম আইটেমস', cost: 45, price: 80, stock: 40, alertLimit: 15, timesSold: 115, qtySold: 150 },
  { id: 'ICE-02', name: 'ভ্যানিলা চকলেট বার (স্টিক)', cat: 'ICE_CREAM', catName: 'আইসক্রিম আইটেমস', cost: 35, price: 60, stock: 32, alertLimit: 10, timesSold: 88, qtySold: 112 },
  { id: 'ICE-03', name: 'প্রিমিয়াম বাটারস্কচ কাপ (১০০ মিলি)', cat: 'ICE_CREAM', catName: 'আইসক্রিম আইটেমস', cost: 50, price: 90, stock: 9, alertLimit: 12, timesSold: 64, qtySold: 76 },
  { id: 'ICE-04', name: 'বেলিসিমো স্ট্রবেরি চকো ফ্যান্টাসি (৫০০ মিলি)', cat: 'ICE_CREAM', catName: 'আইসক্রিম আইটেমস', cost: 160, price: 250, stock: 14, alertLimit: 5, timesSold: 32, qtySold: 38 },
  { id: 'ICE-05', name: 'কাজী ম্যাঙ্গো কুल्फी আইসক্রিম', cat: 'ICE_CREAM', catName: 'আইসক্রিম আইটেমস', cost: 30, price: 50, stock: 26, alertLimit: 10, timesSold: 72, qtySold: 94 },

  // 4. কোল্ড ড্রিংকস ও বেভারেজ (Cold Drinks & Beverages)
  { id: 'DRK-01', name: 'কোকাকোলা (৫০০ মিলি বোতল)', cat: 'DRINKS', catName: 'কোল্ড ড্রিংকস', cost: 32, price: 45, stock: 65, alertLimit: 20, timesSold: 140, qtySold: 195 },
  { id: 'DRK-02', name: 'স্প্রাইট (২৫০ মিলি ক্যান)', cat: 'DRINKS', catName: 'কোল্ড ড্রিংকস', cost: 35, price: 50, stock: 48, alertLimit: 15, timesSold: 110, qtySold: 135 },
  { id: 'DRK-03', name: 'ম্যাঙ্গো ফ্রুট জুস (২৫০ মিলি)', cat: 'DRINKS', catName: 'কোল্ড ড্রিংকস', cost: 25, price: 40, stock: 0, alertLimit: 12, timesSold: 72, qtySold: 88 },
  { id: 'DRK-04', name: 'মিন্ট লেমোনাড রিফ্রেশার', cat: 'DRINKS', catName: 'কোল্ড ড্রিংকস', cost: 40, price: 75, stock: 30, alertLimit: 10, timesSold: 85, qtySold: 102 },
  { id: 'DRK-05', name: 'কোল্ড কফি ফ্র্যাপে স্পেশাল', cat: 'DRINKS', catName: 'কোল্ড ড্রিংকস', cost: 55, price: 110, stock: 20, alertLimit: 8, timesSold: 61, qtySold: 73 },

  // 5. বেকারি ও ফ্রেশ স্ন্যাকস (Bakery & Fresh Snacks)
  { id: 'BAK-01', name: 'চিকেন পেটিজ (তাজা ফ্রেশ)', cat: 'BAKERY', catName: 'বেকারি আইটেমস', cost: 35, price: 65, stock: 24, alertLimit: 8, timesSold: 75, qtySold: 92 },
  { id: 'BAK-02', name: 'চকলেট পেস্ট্রি পেয়ার', cat: 'BAKERY', catName: 'বেকারি আইটেমস', cost: 55, price: 95, stock: 16, alertLimit: 6, timesSold: 48, qtySold: 58 },
  { id: 'BAK-03', name: 'স্পেশাল মিল্ক ব্রেড (পাউন্ড)', cat: 'BAKERY', catName: 'বেকারি আইটেমস', cost: 50, price: 80, stock: 8, alertLimit: 10, timesSold: 35, qtySold: 42 },
  { id: 'BAK-04', name: 'চিকেন চিজ বার্গার বান', cat: 'BAKERY', catName: 'বেকারি আইটেমস', cost: 70, price: 130, stock: 18, alertLimit: 8, timesSold: 58, qtySold: 70 },
  { id: 'BAK-05', name: 'বাটার কুকিজ স্পেশাল বক্স (২৫০ গ্রাম)', cat: 'BAKERY', catName: 'বেকারি আইটেমস', cost: 90, price: 160, stock: 15, alertLimit: 6, timesSold: 30, qtySold: 36 }
];

export const dailyChartData = [
  { day: 'শনিবার', revenue: 42000 },
  { day: 'রবিবার', revenue: 38500 },
  { day: 'সোমবার', revenue: 45100 },
  { day: 'মঙ্গলবার', revenue: 41200 },
  { day: 'বুধবার', revenue: 47800 },
  { day: 'বৃহস্পতিবার', revenue: 52400 },
  { day: 'শুক্রবার', revenue: 61000 }
];

export const paymentChartData = [
  { name: 'নগদ (Cash)', value: 30070, percent: '৬২%', color: '#E31B23' },
  { name: 'বিকাশ (bKash)', value: 18430, percent: '৩৮%', color: '#C5994A' }
];

export const monthlyChartData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1} তারিখ`,
  revenue: 38000 + Math.floor(Math.sin(i / 3) * 8000) + (i % 7 === 6 ? 15000 : 5000)
}));

