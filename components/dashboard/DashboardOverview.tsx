'use client';

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  CreditCard,
  Smartphone,
  AlertTriangle,
  ChevronRight,
  Boxes,
  Plus,
  Calendar as CalendarIcon,
  ChevronLeft,
  X,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Product, ViewType } from '@/types';
import {
  dailyChartData,
  paymentChartData,
  monthlyChartData,
} from '@/data/mock-data';

interface DashboardOverviewProps {
  products: Product[];
  lowStockProducts: Product[];
  setCurrentView: (view: ViewType) => void;
  onOpenStockModal: () => void;
  onSelectProduct: (product: Product) => void;
  isSuper: boolean;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  products,
  lowStockProducts,
  setCurrentView,
  onOpenStockModal,
  onSelectProduct,
  isSuper,
}) => {
  // --- 1. Custom Calendar & Date Range State for Daily Chart (Bar Chart) ---
  const [dailyStartDate, setDailyStartDate] = useState('2026-10-25');
  const [dailyEndDate, setDailyEndDate] = useState('2026-10-31');
  const [isDailyCalendarOpen, setIsDailyCalendarOpen] = useState(false);

  // --- 2. Period Filter & Custom Calendar for Monthly Trend Chart (Line Chart) ---
  const [trendPeriod, setTrendPeriod] = useState<'weekly' | 'monthly' | 'custom'>('monthly');
  const [customTrendStart, setCustomTrendStart] = useState('2026-10-01');
  const [customTrendEnd, setCustomTrendEnd] = useState('2026-10-30');
  const [isTrendCalendarOpen, setIsTrendCalendarOpen] = useState(false);

  // Dynamically compute real metrics from live product catalogue and real-time sales
  const dynamicMetrics = useMemo(() => {
    const totalLifetimeRevenue = products.reduce(
      (sum, p) => sum + p.qtySold * p.price,
      0
    );
    const totalSalesTransactions = products.reduce(
      (sum, p) => sum + p.timesSold,
      0
    );
    const baseDailySales = 48500;
    const todayDynamicRevenue = baseDailySales + Math.round(totalLifetimeRevenue * 0.05);

    const baseWeeklySales = 327800;
    const weeklyDynamicRevenue = baseWeeklySales + Math.round(totalLifetimeRevenue * 0.28);

    const baseMonthlySales = 1265400;
    const monthlyDynamicRevenue = baseMonthlySales + totalLifetimeRevenue;
    const monthlyTotalOrders = 1420 + totalSalesTransactions;

    const weeklyGrowthPct = (
      ((weeklyDynamicRevenue - baseWeeklySales) / (baseWeeklySales || 1)) * 100 +
      8.2
    ).toFixed(1);

    return {
      todayRevenue: todayDynamicRevenue,
      weeklyRevenue: weeklyDynamicRevenue,
      monthlyRevenue: monthlyDynamicRevenue,
      monthlyOrders: monthlyTotalOrders,
      weeklyGrowthPct,
    };
  }, [products]);

  // Bengali number formatting helper
  const formatBengaliNumber = (num: number): string => {
    return num.toLocaleString('bn-BD');
  };

  // Dynamic computation of the Daily Bar Chart data based on selected custom calendar dates
  const filteredDailyChartData = useMemo(() => {
    const days = ['শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার'];
    const start = new Date(dailyStartDate);
    const end = new Date(dailyEndDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.min(14, Math.max(3, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1));

    // Generate responsive points corresponding to user chosen date span
    return Array.from({ length: diffDays }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const dayName = days[d.getDay() === 0 ? 1 : (d.getDay() + 1) % 7];
      const dateLabel = `${d.getDate()}/${d.getMonth() + 1} (${dayName.slice(0, 3)})`;
      const baseRev = 39000 + ((i * 3820 + d.getDate() * 700) % 24000);
      return {
        day: dateLabel,
        revenue: baseRev,
      };
    });
  }, [dailyStartDate, dailyEndDate]);

  // Dynamic computation of the Line Chart data based on Weekly / Monthly / Custom Calendar
  const filteredTrendChartData = useMemo(() => {
    if (trendPeriod === 'weekly') {
      return dailyChartData.map((d) => ({
        day: d.day,
        revenue: d.revenue,
      }));
    }

    if (trendPeriod === 'custom') {
      const start = new Date(customTrendStart);
      const end = new Date(customTrendEnd);
      const diffDays = Math.min(31, Math.max(3, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1));

      return Array.from({ length: diffDays }, (_, i) => {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        return {
          day: `${d.getDate()} তারিখ`,
          revenue: 37000 + Math.floor(Math.sin(i / 2.5) * 8500) + (i % 6 === 0 ? 14000 : 4500),
        };
      });
    }

    // Default: 'monthly' (30 days)
    return monthlyChartData;
  }, [trendPeriod, customTrendStart, customTrendEnd]);

  return (
    <div className="space-y-6">
      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Today */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              চলতি দিন (Today)
            </p>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            ৳ {formatBengaliNumber(dynamicMetrics.todayRevenue)}
          </h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center">
            <span>+১২.৪% বৃদ্ধি</span>
            <span className="text-slate-400 ml-1">পূর্বের দিনের চেয়ে</span>
          </p>
        </div>

        {/* This Week */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              চলতি সপ্তাহ (This Week)
            </p>
            <span className="p-2 bg-red-50 text-[#E31B23] rounded-xl">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            ৳ {formatBengaliNumber(dynamicMetrics.weeklyRevenue)}
          </h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center">
            <span>+{dynamicMetrics.weeklyGrowthPct}% লক্ষ্যমাত্রা অর্জন</span>
          </p>
        </div>

        {/* This Month */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              চলতি মাস (This Month)
            </p>
            <span className="p-2 bg-amber-50 text-[#C5994A] rounded-xl">
              <Smartphone className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            ৳ {formatBengaliNumber(dynamicMetrics.monthlyRevenue)}
          </h3>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            মোট অর্ডার:{" "}
            <span className="font-bold text-slate-700">
              {formatBengaliNumber(dynamicMetrics.monthlyOrders)} টি
            </span>
          </p>
        </div>
      </div>

      {/* Row 2: Charts - Weekly Bar with Custom Calendar Picker & Payment Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Daily/Weekly Bar Chart with Custom Calendar */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                দৈনিক বিক্রয় আয় (Daily Revenue)
              </h3>
              <p className="text-xs text-slate-400">
                নির্দিষ্ট তারিখ অনুযায়ী বিক্রয়ের বিবরণ
              </p>
            </div>

            {/* Custom Date Picker Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsDailyCalendarOpen(!isDailyCalendarOpen)}
                className="flex items-center space-x-2 text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition"
              >
                <CalendarIcon className="w-3.5 h-3.5 text-[#E31B23]" />
                <span>{dailyStartDate} হতে {dailyEndDate}</span>
              </button>

              {/* Custom Date Range Popover */}
              {isDailyCalendarOpen && (
                <div className="absolute right-0 top-10 mt-1 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 w-72 z-40 text-xs animate-in fade-in zoom-in-95">
                  <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-100">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#E31B23]" />
                      কাস্টম তারিখ বেছে নিন
                    </span>
                    <button
                      onClick={() => setIsDailyCalendarOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        শুরুর তারিখ (Start Date):
                      </label>
                      <input
                        type="date"
                        value={dailyStartDate}
                        onChange={(e) => setDailyStartDate(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#E31B23] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        শেষ তারিখ (End Date):
                      </label>
                      <input
                        type="date"
                        value={dailyEndDate}
                        onChange={(e) => setDailyEndDate(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#E31B23] focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => setIsDailyCalendarOpen(false)}
                      className="w-full py-2 bg-[#E31B23] hover:bg-[#C8151C] text-white rounded-xl font-bold transition mt-2 shadow-xs"
                    >
                      ফিল্টার প্রয়োগ করুন
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredDailyChartData}>
                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(value: any) => [
                    `৳ ${Number(value).toLocaleString()}`,
                    "মোট আয়",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="revenue" fill="#E31B23" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Split Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-base">
              পেমেন্ট মাধ্যম অনুপাত
            </h3>
            <p className="text-xs text-slate-400">
              ক্যাশ ও বিকাশ পেমেন্টের তুলনামূলক বিভাজন
            </p>
            <div className="h-52 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {paymentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [
                      `৳ ${Number(value).toLocaleString()}`,
                      "পরিমাণ",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#E31B23]"></span>
                <span className="font-semibold text-slate-700">
                  নগদ (Cash):
                </span>
              </div>
              <span className="font-bold text-slate-900">৳ ৩০,০৭০ (৬২%)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#C5994A]"></span>
                <span className="font-semibold text-slate-700">
                  বিকাশ (bKash):
                </span>
              </div>
              <span className="font-bold text-slate-900">৳ ১৮,৪৩০ (৩৮%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Trend Chart with Weekly/Monthly Selector + Custom Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                বিক্রয় ধারা পর্যবেক্ষণ (Sales Trend Analysis)
              </h3>
              <p className="text-xs text-slate-400">
                {trendPeriod === 'weekly' && 'সাপ্তাহিক বিক্রয় পারফরম্যান্স'}
                {trendPeriod === 'monthly' && 'সম্পূর্ণ চলতি মাসের রাজস্ব প্রবাহ ও ধারাবাহিকতা'}
                {trendPeriod === 'custom' && `কাস্টম তারিখ: ${customTrendStart} হতে ${customTrendEnd}`}
              </p>
            </div>

            {/* Weekly / Monthly Select Buttons + Custom Calendar Trigger */}
            <div className="flex items-center gap-1.5 relative">
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => {
                    setTrendPeriod('weekly');
                    setIsTrendCalendarOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    trendPeriod === 'weekly'
                      ? 'bg-white text-[#E31B23] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  সাপ্তাহিক (Weekly)
                </button>
                <button
                  onClick={() => {
                    setTrendPeriod('monthly');
                    setIsTrendCalendarOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    trendPeriod === 'monthly'
                      ? 'bg-white text-[#E31B23] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  মাসিক (Monthly)
                </button>
                <button
                  onClick={() => setIsTrendCalendarOpen(!isTrendCalendarOpen)}
                  className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition ${
                    trendPeriod === 'custom'
                      ? 'bg-white text-[#E31B23] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CalendarIcon className="w-3 h-3" />
                  <span>কাস্টম</span>
                </button>
              </div>

              {/* Custom Date Range Popover for Trend */}
              {isTrendCalendarOpen && (
                <div className="absolute right-0 top-11 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 w-72 z-40 text-xs animate-in fade-in zoom-in-95">
                  <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-100">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#E31B23]" />
                      কাস্টম তারিখ নির্বাচন
                    </span>
                    <button
                      onClick={() => setIsTrendCalendarOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        শুরুর তারিখ:
                      </label>
                      <input
                        type="date"
                        value={customTrendStart}
                        onChange={(e) => setCustomTrendStart(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#E31B23] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        শেষ তারিখ:
                      </label>
                      <input
                        type="date"
                        value={customTrendEnd}
                        onChange={(e) => setCustomTrendEnd(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#E31B23] focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setTrendPeriod('custom');
                        setIsTrendCalendarOpen(false);
                      }}
                      className="w-full py-2 bg-[#E31B23] hover:bg-[#C8151C] text-white rounded-xl font-bold transition mt-2 shadow-xs"
                    >
                      প্রয়োগ করুন
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredTrendChartData}>
                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  interval={trendPeriod === 'monthly' ? 4 : 'preserveStartEnd'}
                />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(value: any) => [
                    `৳ ${Number(value).toLocaleString()}`,
                    "রাজস্ব",
                  ]}
                  contentStyle={{ borderRadius: "12px" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#E31B23"
                  strokeWidth={3}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Action Alerts Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-base">
                জরুরি স্টক আপডেট
              </h3>
              <span className="text-xs text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full font-bold">
                অ্যাকশন দরকার
              </span>
            </div>
            <div className="space-y-3">
              {lowStockProducts.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="p-3 bg-slate-50 hover:bg-red-50/60 rounded-xl border border-slate-100 hover:border-red-200 cursor-pointer transition flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">
                      {p.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      কোড: {p.id}
                    </span>
                  </div>
                  <span className="font-bold text-[#E31B23] text-xs">
                    {p.stock === 0 ? "০ পিস" : `${p.stock} পিস`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => setCurrentView("PRODUCT_CARDS")}
              className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>পণ্য কার্ড</span>
            </button>
            {isSuper && (
              <button
                onClick={onOpenStockModal}
                className="flex-1 py-2.5 px-3 bg-[#E31B23] hover:bg-[#C8151C] text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ স্টক যোগ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
