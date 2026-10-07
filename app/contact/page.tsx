'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { Mail, Phone, MapPin, Clock, CheckCircle2, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const { lang } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-brand-sky uppercase tracking-wider">
            {lang === 'ar' ? 'فريق خدمة المسافرين' : 'Passenger Support'}
          </span>
          <h1 className="text-3xl font-black text-brand-navy">
            {lang === 'ar' ? 'تواصل معنا في أي وقت' : 'Get in Touch with Our Concierge'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            {lang === 'ar'
              ? 'فريق الدعم الفني والمتابعة جاهز للإجابة على استفساراتكم حول حجوزات الطيران، شحنات الأمتعة، والفنادق.'
              : 'Our travel concierges are available 24/7 to assist with your bookings and cargo quotes.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-lg text-brand-navy">
                {lang === 'ar' ? 'قنوات الاتصال المباشر' : 'Direct Channels'}
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-sky-muted text-brand-sky flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-brand-navy block text-sm">{lang === 'ar' ? 'الخط الساخن للمسافرين:' : 'Travel Concierge Line:'}</span>
                    <span className="font-mono font-bold text-slate-800">19820 (أرقام استرشادية)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-brand-navy block text-sm">{lang === 'ar' ? 'الدعم عبر واتساب:' : 'WhatsApp Support:'}</span>
                    <span className="font-mono font-bold text-slate-800">+20 100 234 5678</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-brand-navy block text-sm">{lang === 'ar' ? 'البريد الإلكتروني:' : 'Email Desk:'}</span>
                    <span className="font-medium text-slate-800">support@masaferin.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-brand-navy block text-sm">{lang === 'ar' ? 'المقرات اللوجستية:' : 'Operational Hubs:'}</span>
                    <span>القاهرة: التجمع الخامس، محور التسعين • الرياض: طريق الملك فهد</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-lg text-brand-navy">
                {lang === 'ar' ? 'أرسل لنا استفسارك أو طلبك' : 'Send an Inquiry'}
              </h3>

              {sent ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-base">{lang === 'ar' ? 'تم استلام رسالتك بنجاح' : 'Message Dispatched'}</h4>
                  <p className="text-xs text-emerald-700">{lang === 'ar' ? 'سيقوم أحد ممثلي الدعم بالتواصل معك في أقرب وقت.' : 'Our team will respond shortly.'}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'الاسم الكامل:' : 'Full Name:'}</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'موضوع الرسالة أو رقم الحجز:' : 'Subject or Booking Ref:'}</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'نص الرسالة:' : 'Message:'}</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-sm btn-glow transition shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
