'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Plane, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  Eye, 
  EyeOff, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ARAB_COUNTRIES } from '@/lib/arabCountries';
import { validatePasswordStrength, setActiveSession } from '@/lib/auth';
import { DEMO_USERS, getStoredData, saveStoredData } from '@/lib/store';
import { User as UserType } from '@/lib/types';

export default function RegisterPage() {
  const { lang, toggleLanguage } = useLanguage();
  const router = useRouter();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCode, setPhoneCode] = useState('+20');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryOfResidence, setCountryOfResidence] = useState('مصر (Egypt)');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validations
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim()) {
      setErrorMessage(lang === 'ar' ? 'يرجى استكمال كافة الحقول الأساسية.' : 'Please fill all required fields.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage(lang === 'ar' ? 'يجب الموافقة على الشروط والأحكام وسياسة الخصوصية.' : 'You must accept the Terms and Privacy Policy.');
      return;
    }

    // Password validation
    const pwdStrength = validatePasswordStrength(password);
    if (!pwdStrength.isValid) {
      setErrorMessage(lang === 'ar' ? pwdStrength.messageAr : pwdStrength.messageEn);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(lang === 'ar' ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Create new customer account
      const newUser: UserType = {
        id: `usr_${Date.now()}`,
        name: fullName,
        email: email.toLowerCase().trim(),
        phone: `${phoneCode} ${phoneNumber.trim()}`,
        role: 'customer',
        country: countryOfResidence,
        createdAt: new Date().toISOString()
      };

      // Check duplicate
      const existingUsers = getStoredData<UserType[]>('users', DEMO_USERS);
      if (existingUsers.some(u => u.email.toLowerCase() === newUser.email)) {
        setErrorMessage(lang === 'ar' ? 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.' : 'Email is already registered. Please sign in.');
        return;
      }

      saveStoredData('users', [newUser, ...existingUsers]);

      // Set active session
      setActiveSession({
        user: newUser,
        token: `tok_${Date.now()}`,
        expiresAt: new Date(Date.now() + 86400000 * 7).toISOString()
      });

      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#060E18]">
      
      {/* Background Photography */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2200&q=85')"
        }}
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#060E18]/95 via-[#0B192C]/90 to-[#0F766E]/40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-sky/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-turquoise/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <div className="absolute top-6 start-6 end-6 flex items-center justify-between z-20 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B192C] to-[#0284C7] flex items-center justify-center text-white shadow-lg border border-white/20">
            <Plane className="w-5 h-5 transform -rotate-45" />
          </div>
          <span className="font-black text-xl text-white tracking-tight">مسافرين</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur-md"
          >
            <Globe className="w-3.5 h-3.5 text-brand-sky-light" />
            <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
          </button>
          
          <Link
            href="/login"
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur-md"
          >
            {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </Link>
        </div>
      </div>

      {/* Registration Card */}
      <div className="relative z-20 w-full max-w-lg my-20">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/40 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'عضوية مسافرين الجديدة' : 'Create Customer Account'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
              {lang === 'ar' ? 'انضم إلى مجتمع مسافرين' : 'Join Masaferin Travel'}
            </h1>

            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'أنشئ حسابك الشخصي لمتابعة حجوزات الطيران وشحن الأمتعة وإدارة طلباتك بكل سهولة.'
                : 'Create your account to manage flight reservations, cargo requests, and hotel stays.'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">
                {lang === 'ar' ? 'الاسم الكامل (كما في جواز السفر):' : 'Full Name (as in Passport):'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="محمد أحمد إبراهيم"
                  required
                  className="w-full ps-10 pe-4 py-3 rounded-xl border border-slate-200 font-semibold text-slate-900 bg-white focus:outline-none focus:border-brand-sky"
                />
                <User className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">
                {lang === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full ps-10 pe-4 py-3 rounded-xl border border-slate-200 font-semibold text-slate-900 bg-white focus:outline-none focus:border-brand-sky"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Phone & Country Code */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">
                {lang === 'ar' ? 'رقم الهاتف / واتساب:' : 'Phone Number / WhatsApp:'}
              </label>
              <div className="flex gap-2">
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="w-28 p-3 rounded-xl border border-slate-200 font-bold bg-white text-slate-900 text-xs focus:outline-none"
                >
                  {ARAB_COUNTRIES.map(c => (
                    <option key={c.id} value={c.phoneCode}>
                      {c.flagEmoji} {c.phoneCode}
                    </option>
                  ))}
                </select>
                <div className="relative flex-1">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="100 234 5678"
                    required
                    className="w-full ps-10 pe-4 py-3 rounded-xl border border-slate-200 font-semibold text-slate-900 bg-white focus:outline-none focus:border-brand-sky"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Country of Residence (22 Arab Countries) */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">
                {lang === 'ar' ? 'دولة الإقامة الحالية:' : 'Country of Residence:'}
              </label>
              <select
                value={countryOfResidence}
                onChange={(e) => setCountryOfResidence(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 font-bold bg-white text-slate-900 text-xs focus:outline-none"
              >
                {ARAB_COUNTRIES.map(c => (
                  <option key={c.id} value={`${c.nameAr} (${c.nameEn})`}>
                    {c.flagEmoji} {lang === 'ar' ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  {lang === 'ar' ? 'كلمة المرور:' : 'Password:'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full ps-9 pe-4 py-3 rounded-xl border border-slate-200 font-semibold text-slate-900 bg-white focus:outline-none focus:border-brand-sky"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  {lang === 'ar' ? 'تأكيد كلمة المرور:' : 'Confirm Password:'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full ps-9 pe-4 py-3 rounded-xl border border-slate-200 font-semibold text-slate-900 bg-white focus:outline-none focus:border-brand-sky"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-600 font-medium leading-relaxed">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded text-brand-sky focus:ring-brand-sky w-4 h-4 shrink-0"
                />
                <span>
                  {lang === 'ar' ? (
                    <>أوافق على <Link href="/legal/terms" className="text-brand-sky font-bold hover:underline">الشروط والأحكام</Link> و <Link href="/legal/privacy" className="text-brand-sky font-bold hover:underline">سياسة الخصوصية</Link> لمنصة مسافرين.</>
                  ) : (
                    <>I agree to the <Link href="/legal/terms" className="text-brand-sky font-bold hover:underline">Terms of Service</Link> and <Link href="/legal/privacy" className="text-brand-sky font-bold hover:underline">Privacy Policy</Link>.</>
                  )}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-sm btn-glow transition shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{lang === 'ar' ? 'إنشاء الحساب ومتابعة السفر' : 'Create Account & Continue'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Already have an account */}
          <div className="text-center pt-2 text-xs text-slate-600 border-t border-slate-100">
            <span>{lang === 'ar' ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}</span>
            <Link
              href="/login"
              className="font-bold text-brand-sky hover:underline"
            >
              {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </Link>
          </div>

        </div>
      </div>

      {/* Footer Credit */}
      <div className="absolute bottom-4 text-center text-slate-400 text-xs z-20">
        <span>مسافرين | Masaferin © {new Date().getFullYear()} — {lang === 'ar' ? 'تصميم وتطوير المهندس محمد سمير' : 'Designed and Developed by Engineer Mohamed Samir'}</span>
      </div>

    </div>
  );
}
