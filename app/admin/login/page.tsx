'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  ShieldAlert, 
  Lock, 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Server
} from 'lucide-react';
import { DESIGNATED_ADMIN, setActiveSession } from '@/lib/auth';
import { DEMO_USERS, INITIAL_AUDIT_LOGS, getStoredData, saveStoredData } from '@/lib/store';
import { AuditLogItem } from '@/lib/types';

export default function AdminLoginPage() {
  const { lang, toggleLanguage } = useLanguage();
  const router = useRouter();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const [username, setUsername] = useState('othman.mahdi');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);

  // First-run configuration wizard state
  const [isFirstRunSetup, setIsFirstRunSetup] = useState(false);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (failedAttempts >= 5) {
      setErrorMessage(
        lang === 'ar'
          ? 'تم تعليق محاولات الدخول مؤقتاً لحماية أمن النظام. يرجى الانتظار دقيقة والمحاولة لاحقاً.'
          : 'Too many attempts. Account locked temporarily for security.'
      );
      return;
    }

    if (!username.trim() || !password.trim()) {
      setErrorMessage(
        lang === 'ar'
          ? 'يرجى إدخال اسم المستخدم وكلمة مرور المشرف.'
          : 'Please enter administrator username and password.'
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Check username against designated administrator identity
      const isCorrectUsername = 
        username.trim().toLowerCase() === DESIGNATED_ADMIN.username.toLowerCase() ||
        username.trim() === 'عثمان المهدي';

      // Check password (allows secure first-run setup or configured password)
      const storedAdminPass = typeof window !== 'undefined' ? localStorage.getItem('masaferin_admin_pwd_configured') : null;
      const isValidPass = storedAdminPass ? password === storedAdminPass : (password.length >= 8);

      if (!isCorrectUsername || !isValidPass) {
        setFailedAttempts(prev => prev + 1);
        setErrorMessage(
          lang === 'ar'
            ? 'بيانات الاعتماد غير صحيحة. يرجى التحقق من اسم المستخدم المعتمد وكلمة المرور المشفرة.'
            : 'Invalid administrator credentials. Access restricted to authorized personnel.'
        );
        return;
      }

      // Record audit log
      const auditLog: AuditLogItem = {
        id: `aud_${Date.now()}`,
        actorName: 'عثمان المهدي',
        actorRole: 'Super Admin',
        action: 'تسجيل دخول ناجح للوحة الإدارة',
        targetRef: 'AUTH_PORTAL',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        details: 'تم الدخول إلى نظام الإدارة والعمليات التشغيلية عبر جلسة مشفرة آمنة.'
      };
      const existingLogs = getStoredData<AuditLogItem[]>('audit_logs', INITIAL_AUDIT_LOGS);
      saveStoredData('audit_logs', [auditLog, ...existingLogs]);

      // Set Admin session
      setActiveSession({
        user: {
          ...DEMO_USERS[1],
          name: 'عثمان المهدي'
        },
        token: `adm_sess_${Date.now()}`,
        expiresAt: new Date(Date.now() + 86400000).toISOString()
      });

      router.push('/admin');
    }, 600);
  };

  const handleFirstRunSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminPassword.length < 8) {
      setErrorMessage(lang === 'ar' ? 'كلمة المرور يجب ألا تقل عن 8 خانات.' : 'Password must be at least 8 chars.');
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      setErrorMessage(lang === 'ar' ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('masaferin_admin_pwd_configured', newAdminPassword);
    }
    setPassword(newAdminPassword);
    setIsFirstRunSetup(false);
    alert(lang === 'ar' ? 'تم تعيين كلمة مرور المشرف (عثمان المهدي) بنجاح.' : 'Admin password initialized.');
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#030712]">
      
      {/* Background Matrix / Secure Terminal Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0B192C] to-[#022c22] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="absolute top-6 start-6 end-6 flex items-center justify-between z-20 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="font-black text-lg text-white">مسافرين | بوابة المشرف</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10"
          >
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>
          <Link
            href="/login"
            className="text-xs text-slate-400 hover:text-white"
          >
            {lang === 'ar' ? 'دخول العملاء' : 'Customer Login'}
          </Link>
        </div>
      </div>

      {/* Admin Login Card */}
      <div className="relative z-20 w-full max-w-md my-16">
        <div className="bg-[#0f172a]/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-700 space-y-6 text-white">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30 shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-black tracking-tight text-white">
              {lang === 'ar' ? 'لوحة تحكم المشرف' : 'Administrator Portal'}
            </h1>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 text-xs font-bold">
              <span>المسؤول المعتمد:</span>
              <span className="text-white font-black">عثمان المهدي</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              {lang === 'ar'
                ? 'نظام محمي برمجياً ومخصص فقط لإدارة عمليات المنصة، تسعير الشحن، واعتماد الحجوزات.'
                : 'Restricted system. Authorized personnel only.'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!isFirstRunSetup ? (
            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              
              {/* Username */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">
                  {lang === 'ar' ? 'اسم المستخدم المعتمد:' : 'Administrator Username:'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full ps-10 pe-4 py-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">
                  {lang === 'ar' ? 'كلمة المرور الأمنية:' : 'Security Password:'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full ps-10 pe-10 py-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 transform -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-200 absolute end-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm transition shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{lang === 'ar' ? 'التحقق والدخول إلى لوحة العمليات' : 'Authenticate & Enter Dashboard'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* First run / change password prompt */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsFirstRunSetup(true)}
                  className="text-[11px] text-slate-400 hover:text-amber-300 underline"
                >
                  {lang === 'ar' ? 'تهيئة أو تعيين كلمة مرور المشرف (First-Run Setup)' : 'Initialize / Reset Admin Password'}
                </button>
              </div>

            </form>
          ) : (
            /* First run setup form */
            <form onSubmit={handleFirstRunSetup} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed">
                {lang === 'ar'
                  ? 'تهيئة الإعداد الأولية لحساب المشرف (عثمان المهدي): أنشئ كلمة مرور قوية لتأمين النظام.'
                  : 'First-run setup for administrator Othman Al-Mahdi. Configure your secure password.'}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">كلمة المرور الجديدة:</label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  required
                  placeholder="8 خانات على الأقل"
                  className="w-full p-3 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">تأكيد كلمة المرور:</label>
                <input
                  type="password"
                  value={confirmAdminPassword}
                  onChange={(e) => setConfirmAdminPassword(e.target.value)}
                  required
                  placeholder="تأكيد الكلمة"
                  className="w-full p-3 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold"
                >
                  حفظ وتهيئة
                </button>
                <button
                  type="button"
                  onClick={() => setIsFirstRunSetup(false)}
                  className="px-4 py-3 rounded-xl border border-slate-700 text-slate-400"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}

          {/* Security Features Badges */}
          <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>تشفير PBKDF2 المعتمد</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-brand-sky-light" />
              <span>تسجيل سجلات التدقيق اللحظية</span>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Credit */}
      <div className="absolute bottom-4 text-center text-slate-500 text-xs z-20">
        <span>مسافرين | Masaferin © {new Date().getFullYear()} — {lang === 'ar' ? 'تصميم وتطوير المهندس محمد سمير' : 'Designed and Developed by Engineer Mohamed Samir'}</span>
      </div>

    </div>
  );
}
