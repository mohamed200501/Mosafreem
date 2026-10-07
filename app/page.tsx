'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SearchWidget } from '@/components/SearchWidget';
import { FeaturedDestinations } from '@/components/FeaturedDestinations';
import { CoreServices } from '@/components/CoreServices';
import { CargoSpotlight } from '@/components/CargoSpotlight';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Testimonials } from '@/components/Testimonials';
import { FaqSection } from '@/components/FaqSection';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SearchWidget />
        <FeaturedDestinations />
        <CoreServices />
        <CargoSpotlight />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <FaqSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
