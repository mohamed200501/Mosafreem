# دليل الإعداد والنشر | Setup & Deployment Guide
## منصة مسافرين (Masaferin Travel Platform)

يغطي هذا الدليل إعداد بيئة العمل محلياً، ربط قاعدة البيانات، وتهيئة المتغيرات البيئية لربط مزودي الطيران والدفع.

---

## 1. المتغيرات البيئية (Environment Variables)

أنشئ ملف `.env.local` في المجلد الرئيسي للمشروع:

```env
# بيئة التشغيل
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# إعدادات قاعدة البيانات (Supabase / PostgreSQL)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# مزود الطيران الحي (Amadeus GDS Live API)
# اتركه فارغاً للعمل في الوضع الاستعراضي التفاعلي المحاكي
AMADEUS_CLIENT_ID=
AMADEUS_CLIENT_SECRET=
AMADEUS_ENV=test # test or production

# بوابة الدفع الإلكتروني (Paymob / Tap / Stripe)
PAYMENT_GATEWAY_PROVIDER=demo # 'paymob', 'tap', 'stripe', 'demo'
PAYMOB_API_KEY=
PAYMOB_INTEGRATION_ID=
PAYMOB_HMAC_SECRET=

# خدمة الإشعارات والبريد الإلكتروني (Resend / SendGrid)
RESEND_API_KEY=
NOTIFICATION_FROM_EMAIL=support@masaferin.com
```

---

## 2. إعداد قاعدة البيانات (Database Migration)

1. افتح مشروعك في **Supabase Dashboard** أو أي خادم **PostgreSQL 15+**.
2. انتقل إلى **SQL Editor**.
3. افتح الملف `database/schema.sql` وانسخ محتواه بالكامل.
4. نفذ الاستعلام (Run SQL Query).
5. سيتم إنشاء:
   - الجداول الرئيسية (`users`, `flight_bookings`, `cargo_requests`, `hotels`, `hotel_reservations`, `airport_transfers`, `visa_requests`, `insurance_requests`, `audit_logs`).
   - سياسات الأمان على مستوى الصفوف (Row Level Security - RLS).
   - الفهارس المخصصة للبحث والسرعة.

---

## 3. تشغيل المشروع محلياً (Local Development)

```bash
# 1. تثبيت الحزم
npm install

# 2. تشغيل بيئة التطوير
npm run dev

# 3. بناء النسخة الإنتاجية
npm run build

# 4. تشغيل النسخة الإنتاجية
npm run start
```

---

## 4. النشر على Vercel (Production Deployment)

1. اربط مستودع Git بحسابك في **Vercel**.
2. قم بإضافة المتغيرات البيئية المذكورة أعلاه في إعدادات المشروع (Settings > Environment Variables).
3. اختر إعدادات البناء الافتراضية لـ Next.js.
4. انقر على **Deploy**.
5. سيتم بناء المنصة ونشرها على شبكة Vercel العالمية مع دعم كامل للغة العربية ومطابقة المتصفحات الحديثة.

---

## 5. المعاينة السريعة بدون تثبيت Node.js

إذا كنت تريد استعراض ومشاركة واجهات المنصة والتجربة التفاعلية فوراً مع فريق العمل أو أصحاب المصلحة:
- يمكنك فتح الملف `index.html` في أي متصفح ويب مباشرة.
- يتضمن الملف كافة النماذج والحاسبات وحساب العميل ولوحة الإدارة مع تخزين محلي تلقائي للبيانات.
