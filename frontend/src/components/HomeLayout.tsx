'use client';

import React from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import StatisticsSection from '@/components/home/StatisticsSection';
import RiskCalculator from '@/components/home/RiskCalculator';
import MentalHealthChart from '@/components/home/MentalHealthChart';
import ImplementationTimeline from '@/components/home/ImplementationTimeline';
import FoundersSection from '@/components/home/FoundersSection';
import CTASection from '@/components/home/CTASection';

export default function HomeLayout() {
  return (
    <main>
      <Navigation />

      <HeroSection />


      <section id="ferramentas-mentais">
        <FeaturesSection />
      </section>

      <section id="como-implementamos">
        <HowItWorksSection />
      </section>


      <StatisticsSection />



      <section>
        <MentalHealthChart />
      </section>

      <section>
        <ImplementationTimeline />
      </section>

      <section>
        <FoundersSection />
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
