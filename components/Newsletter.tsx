'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Mail, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { lang, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy to-brand-navy-subtle pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-brand-sky/20 text-brand-sky-light mx-auto flex items-center justify-center border border-brand-sky/30">
          <Mail className="w-7 h-7" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {t.newsletter.title}
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {t.newsletter.subtitle}
        </p>

        {subscribed ? (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 max-w-md mx-auto flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold">{t.newsletter.success}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-sky backdrop-blur-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-brand-sky hover:bg-brand-sky-dark text-white font-bold text-sm btn-glow transition shadow-lg shrink-0"
              >
                {t.newsletter.button}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              {t.newsletter.consent}
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
