'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Boxes,
  ShoppingBag,
  TrendingUp,
  Users,
  User,
  LogOut,
  Layers
} from 'lucide-react';
import { Employee, ViewType } from '@/types';

interface SidebarProps {
  currentView?: ViewType;
  setCurrentView?: (view: ViewType) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  currentUser: Employee;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  currentUser,
  onLogout
}) => {
  const pathname = usePathname();
  const isSuper = currentUser.role === 'SUPER_ADMIN';

  const navItems = [
    { href: '/dashboard', label: 'বিক্রয় ড্যাশবোর্ড', icon: LayoutDashboard },
    { href: '/products', label: 'পণ্য ড্যাশবোর্ড', icon: Boxes },
    { href: '/pos', label: 'পিওএস কাউন্টার', icon: ShoppingBag },
    { href: '/inventory', label: 'ইনভেন্টরি তালিকা', icon: Layers, badge: 'লাইভ' },
    { href: '/sales', label: 'পণ্য বিক্রয় বিশ্লেষণ', icon: TrendingUp },
    ...(isSuper ? [{ href: '/employees', label: 'কর্মচারী ব্যবস্থাপনা', icon: Users }] : []),
    { href: '/profile', label: 'আমার প্রোফাইল', icon: User }
  ];

  return (
    <aside
      className={`${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      } bg-[#180E10] text-slate-200 flex flex-col flex-shrink-0 transition-all duration-300 select-none shadow-2xl border-r border-[#2C191D] z-30`}
    >
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-[#2C191D]">
        <Link href="/dashboard" className="flex items-center space-x-3 overflow-hidden">
          <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg border border-[#C5994A]/40 flex-shrink-0">
            <img src="/kazi-logo.jpg" alt="Kazi Farms Kitchen" className="w-full h-full object-contain" />
          </div>
          {!isSidebarCollapsed && (
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-white text-sm tracking-wide">KAZI FARMS</h1>
                <span className="text-[9px] font-bold bg-[#E31B23] text-white px-1.5 py-0.2 rounded">KITCHEN</span>
              </div>
              <p className="text-[11px] text-[#C5994A] font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                মিরপুর-১০ শাখা (#০৪)
              </p>
            </div>
          )}
        </Link>
        <button
          onClick={() => setIsSidebarCollapsed((prev: boolean) => !prev)}
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-[#2C191D] hidden lg:block transition"
          title="সাইডবার ছোট/বড় করুন"
        >
          ⇄
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs font-medium">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${
                isActive
                  ? 'bg-[#E31B23] text-white font-bold shadow-md'
                  : 'text-slate-300 hover:bg-[#2C191D] hover:text-white'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && (
                <div className="flex-1 flex justify-between items-center">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-[#C5994A]/20 text-[#C5994A] font-bold px-1.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer with Direct Logout */}
      <div className="p-3 border-t border-[#2C191D] bg-[#120A0C]">
        <div className="flex items-center justify-between">
          <Link href="/profile" className="flex items-center space-x-2.5 overflow-hidden">
            <img
              src={currentUser.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[#C5994A]"
            />
            {!isSidebarCollapsed && (
              <div className="truncate">
                <p className="text-xs font-semibold text-white leading-tight truncate">{currentUser.name}</p>
                <p className="text-[10px] text-[#C5994A] font-medium">{currentUser.roleName}</p>
              </div>
            )}
          </Link>
          <button
            onClick={onLogout}
            className="text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 p-1.5 rounded-lg transition"
            title="লগআউট করুন"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
