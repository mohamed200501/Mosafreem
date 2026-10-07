import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';

export const metadata: Metadata = {
  title: 'مسافرين | Masaferin - منصة خدمات السفر والطيران والشحن الجوي',
  description: 'منصة السفر الشاملة لحجز تذاكر الطيران، الشحن الجوي للأمتعة والطرود الشخصية، حجز الفنادق، توصيل المطار، وتأشيرات السفر.',
  keywords: ['حجز طيران', 'شحن جوي أمتعة', 'مسافرين', 'فنادق', 'Masaferin', 'Flight booking', 'Air Cargo', 'Egypt to Gulf flights'],
  openGraph: {
    title: 'مسافرين | Masaferin - كل خدمات سفرك في مكان واحد',
    description: 'حجوزات طيران ميسرة، شحن أمتعة وطرود للأهل، فنادق فاخرة، وتوصيل مطار.',
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-brand-sky-muted selection:text-brand-sky-dark min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
