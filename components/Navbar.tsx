'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Plane, 
  Package, 
  Building2, 
  Car, 
  FileText, 
  ShieldCheck, 
  Globe, 
  User, 
  Menu, 
  X, 
  LayoutDashboard, 
  ShieldAlert, 
  LogIn,
  PhoneCall
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, t, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.nav.home, icon: null },
    { href: '/flights', label: t.nav.flights, icon: Plane },
    { href: '/cargo', label: t.nav.cargo, icon: Package },
    { href: '/hotels', label: t.nav.hotels, icon: Building2 },
    { href: '/transfers', label: t.nav.transfers, icon: Car },
    { href: '/visa', label: t.nav.visa, icon: FileText },
    { href: '/insurance', label: t.nav.insurance, icon: ShieldCheck },
    { href: '/about', label: t.nav.about, icon: null },
    { href: '/contact', label: t.nav.contact, icon: null },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200 shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-[#0B192C] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{lang === 'ar' ? 'منصة مسافرين تعمل بنجاح لكافة مسارات الـ 22 دولة عربية' : 'Masaferin Active Across All 22 Arab League Nations'}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <span className="hidden md:inline-flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-brand-gold-light" />
              <span>{lang === 'ar' ? 'الخط الساخن: 19820' : 'Hotline: 19820'}</span>
            </span>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/login"
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-0.5 rounded text-[11px] border border-slate-700 transition"
              >
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                <span>{lang === 'ar' ? 'إدارة المنصة: عثمان المهدي' : 'Admin: Othman Al-Mahdi'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B192C] to-[#0284C7] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <Plane className="w-6 h-6 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-[#0B192C]">
                  {lang === 'ar' ? 'مسافرين' : 'Masaferin'}
                </span>
                <span className="text-xs font-semibold uppercase text-[#0284C7] tracking-wider">
                  {lang === 'ar' ? 'Masaferin' : 'مسافرين'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {lang === 'ar' ? 'طيران • شحن جوي • فنادق' : 'Aviation • Air Cargo • Stays'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-[#0284C7] font-semibold bg-sky-50' 
                      : 'text-slate-700 hover:text-[#0284C7] hover:bg-slate-100'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 opacity-75" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Tools (Language Switcher, Login, Dashboard, Admin) */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
              title="Toggle Arabic / English"
            >
              <Globe className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Login Link */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-[#0284C7] hover:bg-slate-100 transition border border-transparent"
            >
              <LogIn className="w-4 h-4 text-slate-400" />
              <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
            </Link>

            {/* Customer Dashboard Link */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200"
            >
              <LayoutDashboard className="w-4 h-4 text-[#0284C7]" />
              <span>{t.nav.dashboard}</span>
            </Link>

            {/* Admin Portal Link */}
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#0B192C] hover:bg-slate-800 text-white transition-colors shadow-sm"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'لوحة الإدارة' : 'Admin'}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs font-bold rounded border border-slate-300 text-slate-700"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
                >
                  {Icon && <Icon className="w-4 h-4 text-[#0284C7]" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-slate-50 border text-xs font-bold text-slate-700"
            >
              <LogIn className="w-4 h-4" />
              <span>{lang === 'ar' ? 'دخول' : 'Login'}</span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-800"
            >
              <LayoutDashboard className="w-4 h-4 text-[#0284C7]" />
              <span>{t.nav.dashboard}</span>
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#0B192C] text-xs font-bold text-white"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'الإدارة' : 'Admin'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
