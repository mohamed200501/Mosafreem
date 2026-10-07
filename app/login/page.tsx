'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Plane, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Globe, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { setActiveSession } from '@/lib/auth';
import { DEMO_USERS } from '@/lib/store';

export default function LoginPage() {
  const { lang, dir, toggleLanguage } = useLanguage();
  const router = useRouter();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage(
        lang === 'ar' 
          ? 'يرجى إدخال اسم المستخدم أو البريد الإلكتروني وكلمة المرور.' 
          : 'Please enter your username/email and password.'
      );
      return;
    }

    setLoading(true);

    // Simulate server-side authentication
    setTimeout(() => {
      setLoading(false);

      // Check if trying to log in as administrator
      if (identifier.toLowerCase() === 'othman.mahdi' || identifier.toLowerCase().includes('othman')) {
        setActiveSession({
          user: DEMO_USERS[1],
          token: `adm_tok_${Date.now()}`,
          expiresAt: new Date(Date.now() + 86400000).toISOString()
        });
        router.push('/admin');
        return;
      }

      // Customer login
      const matchedUser = DEMO_USERS[0];
      setActiveSession({
        user: {
          ...matchedUser,
          email: identifier.includes('@') ? identifier : matchedUser.email
        },
        token: `usr_tok_${Date.now()}`,
        expiresAt: new Date(Date.now() + 86400000 * 7).toISOString()
      });

      router.push('/dashboard');
    }, 600);
  };

  // Quick Demo Logins
  const handleQuickCustomer = () => {
    setIdentifier('ahmed.elshamy@example.com');
    setPassword('Pass@123456');
    setActiveSession({
      user: DEMO_USERS[0],
      token: `demo_tok_${Date.now()}`,
      expiresAt: new Date(Date.now() + 86400000).toISOString()
    });
    router.push('/dashboard');
  };

  const handleQuickAdmin = () => {
    setIdentifier('othman.mahdi');
    setPassword('Admin@Secure2026');
    setActiveSession({
      user: DEMO_USERS[1],
      token: `admin_tok_${Date.now()}`,
      expiresAt: new Date(Date.now() + 86400000).toISOString()
    });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#060E18]">
      
      {/* Background Travel Photography */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transform motion-safe:transition-transform duration-1000"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2200&q=85')"
        }}
      />
      
      {/* Deep Navy & Turquoise Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#060E18]/95 via-[#0B192C]/90 to-[#0F766E]/40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-sky/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-turquoise/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Controls: Logo and Language Toggle */}
      <div className="absolute top-6 start-6 end-6 flex items-center justify-between z-20 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B192C] to-[#0284C7] flex items-center justify-center text-white shadow-lg border border-white/20 group-hover:scale-105 transition-transform">
            <Plane className="w-5 h-5 transform -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl text-white tracking-tight">مسافرين</span>
            <span className="text-[10px] text-slate-300 font-semibold tracking-wider uppercase">Masaferin</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur-md transition"
          >
            <Globe className="w-3.5 h-3.5 text-brand-sky-light" />
            <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
          </button>
          
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition"
          >
            <span>{lang === 'ar' ? 'الصفحة الرئيسية' : 'Home'}</span>
          </Link>
        </div>
      </div>

      {/* Main Glassmorphism Login Card */}
      <div className="relative z-20 w-full max-w-md my-16">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/40 space-y-7">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'بوابة السفر الموحدة' : 'Unified Travel Portal'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
              {lang === 'ar' ? 'أهلاً بك في مسافرين' : 'Welcome to Masaferin'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
              {lang === 'ar'
                ? 'رحلتك القادمة تبدأ من هنا. سجّل دخولك واستمتع بتجربة سفر متكاملة.'
                : 'Your journey starts here. Sign in and enjoy seamless travel and cargo services.'}
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Identifier (Email / Username) */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                {lang === 'ar' ? 'البريد الإلكتروني أو اسم المستخدم:' : 'Email Address or Username:'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com / username"
                  required
                  className="w-full ps-10 pe-4 py-3.5 rounded-xl border border-slate-200 focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/20 font-medium text-slate-900 bg-white/80 transition focus:outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">
                  {lang === 'ar' ? 'كلمة المرور:' : 'Password:'}
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[11px] font-bold text-brand-sky hover:underline"
                >
                  {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full ps-10 pe-10 py-3.5 rounded-xl border border-slate-200 focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/20 font-medium text-slate-900 bg-white/80 transition focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 transform -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute end-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-brand-sky focus:ring-brand-sky w-4 h-4"
                />
                <span>{lang === 'ar' ? 'تذكر بيانات الدخول' : 'Remember me'}</span>
              </label>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-sm btn-glow transition shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Personas */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 block text-center uppercase tracking-wider">
              {lang === 'ar' ? 'خيارات الدخول التجريبي السريع' : 'Quick Demo Access'}
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={handleQuickCustomer}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-brand-sky" />
                <span>{lang === 'ar' ? 'دخول كعميل' : 'Customer Demo'}</span>
              </button>
              <button
                type="button"
                onClick={handleQuickAdmin}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-brand-gold-light" />
                <span>{lang === 'ar' ? 'دخول المشرف (عثمان المهدي)' : 'Admin (Othman)'}</span>
              </button>
            </div>
          </div>

          {/* New Account Link */}
          <div className="text-center pt-2 text-xs text-slate-600">
            <span>{lang === 'ar' ? 'ليس لديك حساب؟ ' : "Don't have an account? "}</span>
            <Link
              href="/register"
              className="font-bold text-brand-sky hover:underline"
            >
              {lang === 'ar' ? 'انضم إلى مسافرين الآن' : 'Join Masaferin Now'}
            </Link>
          </div>

          {/* Legal Links */}
          <div className="text-center text-[11px] text-slate-400 pt-1 flex justify-center gap-3">
            <Link href="/legal/privacy" className="hover:underline">
              {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <span>•</span>
            <Link href="/legal/terms" className="hover:underline">
              {lang === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Subtle Badge */}
      <div className="absolute bottom-4 text-center text-slate-400 text-xs z-20">
        <span>مسافرين | Masaferin © {new Date().getFullYear()} — {lang === 'ar' ? 'تصميم وتطوير المهندس محمد سمير' : 'Designed and Developed by Engineer Mohamed Samir'}</span>
      </div>

    </div>
  );
}
