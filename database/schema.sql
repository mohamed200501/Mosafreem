-- ==============================================================================
-- Masaferin (مسافرين) Platform - Production Relational Database Schema
-- Target Database: PostgreSQL 15+ / Supabase
-- Description: Complete relational schema with RLS policies, indexes, and audit logs.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE user_role_enum AS ENUM ('customer', 'admin', 'partner_agent');
CREATE TYPE trip_type_enum AS ENUM ('one-way', 'round-trip', 'multi-city');
CREATE TYPE cabin_class_enum AS ENUM ('economy', 'premium_economy', 'business', 'first');
CREATE TYPE shipment_type_enum AS ENUM ('excess_baggage', 'personal_parcels', 'commercial_cargo');
CREATE TYPE transfer_vehicle_enum AS ENUM ('sedan', 'business', 'van', 'vip');
CREATE TYPE visa_category_enum AS ENUM ('tourist', 'business', 'umrah', 'work_visit');
CREATE TYPE insurance_tier_enum AS ENUM ('silver', 'gold', 'platinum');
CREATE TYPE request_status_enum AS ENUM (
  'submitted', 
  'under_review', 
  'partner_quoted', 
  'confirmed', 
  'ticketed', 
  'in_transit', 
  'delivered', 
  'completed', 
  'cancelled'
);
CREATE TYPE payment_status_enum AS ENUM ('pending', 'captured', 'failed', 'refunded');

-- 2. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role_enum DEFAULT 'customer' NOT NULL,
    nationality VARCHAR(100),
    passport_number VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. FLIGHT BOOKING REQUESTS
CREATE TABLE IF NOT EXISTS flight_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    trip_type trip_type_enum NOT NULL,
    origin_code VARCHAR(10) NOT NULL,
    origin_city VARCHAR(100) NOT NULL,
    destination_code VARCHAR(10) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    departure_date DATE NOT NULL,
    return_date DATE,
    adults INT DEFAULT 1 NOT NULL,
    children INT DEFAULT 0 NOT NULL,
    cabin_class cabin_class_enum DEFAULT 'economy' NOT NULL,
    passenger_name VARCHAR(255) NOT NULL,
    passenger_phone VARCHAR(50) NOT NULL,
    passenger_email VARCHAR(255) NOT NULL,
    status request_status_enum DEFAULT 'submitted' NOT NULL,
    quoted_amount NUMERIC(12, 2),
    currency VARCHAR(10) DEFAULT 'SAR' NOT NULL,
    partner_carrier VARCHAR(100),
    partner_pnr VARCHAR(50),
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. AIR CARGO & EXCESS BAGGAGE REQUESTS
CREATE TABLE IF NOT EXISTS cargo_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_phone VARCHAR(50) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    origin_country VARCHAR(100) NOT NULL,
    origin_city VARCHAR(100) NOT NULL,
    dest_country VARCHAR(100) NOT NULL,
    dest_city VARCHAR(100) NOT NULL,
    shipment_type shipment_type_enum NOT NULL,
    weight_kg NUMERIC(8, 2) NOT NULL,
    length_cm NUMERIC(8, 2),
    width_cm NUMERIC(8, 2),
    height_cm NUMERIC(8, 2),
    volumetric_weight_kg NUMERIC(8, 2),
    description TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    receiver_name VARCHAR(255),
    receiver_phone VARCHAR(50),
    status request_status_enum DEFAULT 'submitted' NOT NULL,
    quoted_price NUMERIC(12, 2),
    currency VARCHAR(10) DEFAULT 'SAR' NOT NULL,
    partner_carrier VARCHAR(100),
    tracking_airway_bill VARCHAR(100),
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. HOTELS INVENTORY & RESERVATIONS
CREATE TABLE IF NOT EXISTS hotels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    city_en VARCHAR(100) NOT NULL,
    city_ar VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    stars INT DEFAULT 4,
    rating NUMERIC(3, 1) DEFAULT 4.5,
    review_count INT DEFAULT 0,
    image_url TEXT,
    base_price_night NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD' NOT NULL,
    amenities JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS hotel_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    hotel_id UUID REFERENCES hotels(id) ON DELETE RESTRICT,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    rooms INT DEFAULT 1 NOT NULL,
    adults INT DEFAULT 1 NOT NULL,
    children INT DEFAULT 0 NOT NULL,
    room_type VARCHAR(100) NOT NULL,
    guest_name VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    status request_status_enum DEFAULT 'submitted' NOT NULL,
    quoted_amount NUMERIC(12, 2),
    currency VARCHAR(10) DEFAULT 'USD' NOT NULL,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. AIRPORT TRANSFERS
CREATE TABLE IF NOT EXISTS airport_transfers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    pickup_location TEXT NOT NULL,
    destination TEXT NOT NULL,
    is_airport_pickup BOOLEAN DEFAULT true,
    flight_number VARCHAR(50),
    transfer_date DATE NOT NULL,
    transfer_time TIME NOT NULL,
    passengers INT DEFAULT 1 NOT NULL,
    luggage_count INT DEFAULT 2 NOT NULL,
    vehicle_type transfer_vehicle_enum DEFAULT 'sedan' NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    status request_status_enum DEFAULT 'submitted' NOT NULL,
    quoted_amount NUMERIC(10, 2),
    currency VARCHAR(10) DEFAULT 'SAR' NOT NULL,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. VISA ASSISTANCE REQUESTS
CREATE TABLE IF NOT EXISTS visa_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    destination_country VARCHAR(100) NOT NULL,
    applicant_nationality VARCHAR(100) NOT NULL,
    visa_category visa_category_enum NOT NULL,
    applicant_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    notes TEXT,
    status request_status_enum DEFAULT 'submitted' NOT NULL,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. TRAVEL INSURANCE INQUIRIES
CREATE TABLE IF NOT EXISTS insurance_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    destination VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    travelers_count INT DEFAULT 1 NOT NULL,
    policy_tier insurance_tier_enum DEFAULT 'silver' NOT NULL,
    applicant_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status request_status_enum DEFAULT 'submitted' NOT NULL,
    quoted_amount NUMERIC(10, 2),
    currency VARCHAR(10) DEFAULT 'USD' NOT NULL,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. PAYMENTS & TRANSACTIONS
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_reference VARCHAR(100) UNIQUE NOT NULL,
    booking_reference VARCHAR(50) NOT NULL,
    booking_type VARCHAR(50) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    payment_gateway VARCHAR(50) NOT NULL, -- 'paymob', 'tap', 'stripe'
    gateway_session_id VARCHAR(255),
    status payment_status_enum DEFAULT 'pending' NOT NULL,
    payment_method VARCHAR(50), -- 'card', 'mada', 'meeza', 'apple_pay'
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    settled_at TIMESTAMPTZ
);

-- 10. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title_ar VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    message_ar TEXT NOT NULL,
    message_en TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    link_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 11. AUDIT LOGS (ADMIN & STATUS CHANGE AUDITING)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 12. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_flight_ref ON flight_bookings(reference_number);
CREATE INDEX IF NOT EXISTS idx_flight_user ON flight_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_cargo_ref ON cargo_requests(reference_number);
CREATE INDEX IF NOT EXISTS idx_cargo_user ON cargo_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_hotel_ref ON hotel_reservations(reference_number);
CREATE INDEX IF NOT EXISTS idx_transfer_ref ON airport_transfers(reference_number);
CREATE INDEX IF NOT EXISTS idx_visa_ref ON visa_requests(reference_number);
CREATE INDEX IF NOT EXISTS idx_insurance_ref ON insurance_requests(reference_number);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);

-- 13. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cargo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE airport_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Customers can view only their own records; Admins can view all
CREATE POLICY "Users view own profile" ON users
  FOR SELECT USING (auth.uid() = id OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users view own flights" ON flight_bookings
  FOR ALL USING (auth.uid() = user_id OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users view own cargo" ON cargo_requests
  FOR ALL USING (auth.uid() = user_id OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users view own notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');
