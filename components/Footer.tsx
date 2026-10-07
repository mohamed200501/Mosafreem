'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Plane, Mail, Phone, MapPin, ShieldCheck, HeartHandshake, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-brand-navy text-slate-300 border-t border-slate-800 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-sky to-brand-turquoise flex items-center justify-center text-white shadow">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                {lang === 'ar' ? 'مسافرين' : 'Masaferin'}
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold-light" />
                <span>{lang === 'ar' ? 'الخط الساخن للمسافرين: 19820 (أرقام استرشادية)' : 'Travel Hotline: 19820 (Placeholder)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-sky-light" />
                <span>support@masaferin.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'القاهرة - التجمع الخامس | الرياض - طريق الملك فهد' : 'Cairo, New Cairo | Riyadh, King Fahd Rd.'}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {t.footer.servicesLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/flights" className="hover:text-white transition-colors">
                  {t.nav.flights}
                </Link>
              </li>
              <li>
                <Link href="/cargo" className="hover:text-white transition-colors">
                  {t.nav.cargo}
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-white transition-colors">
                  {t.nav.hotels}
                </Link>
              </li>
              <li>
                <Link href="/transfers" className="hover:text-white transition-colors">
                  {t.nav.transfers}
                </Link>
              </li>
              <li>
                <Link href="/visa" className="hover:text-white transition-colors">
                  {t.nav.visa}
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-white transition-colors">
                  {t.nav.insurance}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  {t.nav.dashboard}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  {t.nav.admin}
                </Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Policies */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {t.footer.legalLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/legal/privacy" className="hover:text-white transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-white transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/legal/cancellation" className="hover:text-white transition-colors">
                  {t.footer.cancellation}
                </Link>
              </li>
              <li>
                <Link href="/legal/cargo-terms" className="hover:text-white transition-colors">
                  {t.footer.shippingTerms}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclosure & Trust Notice */}
        <div className="py-6 border-b border-slate-800/60 text-xs text-slate-400/80 leading-relaxed flex items-start gap-3">
          <Info className="w-5 h-5 text-brand-sky shrink-0 mt-0.5" />
          <p>
            {t.footer.disclaimer}
          </p>
        </div>

        {/* Bottom Bar: Copyright, Designer Credit & Attribution */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            {t.footer.rights} {new Date().getFullYear()} — مسافرين | Masaferin.
          </p>

          {/* Website Designer Credit — المهندس محمد سمير */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-sky"></span>
            <span className="font-medium">
              {lang === 'ar' ? 'تصميم وتطوير المهندس محمد سمير' : 'Designed and Developed by Engineer Mohamed Samir'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'بيانات مشفرة وآمنة' : 'Encrypted & Secure'}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span>v1.0.0 (Production Architecture)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
