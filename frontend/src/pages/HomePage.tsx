import * as React from 'react';
import { Header } from '../components/layout/Header.js';
import { Hero } from '../components/Hero.js';
import { Features } from '../components/Features.js';
import { About } from '../components/About.js';
import { HowItWorks } from '../components/HowItWorks.js';
import { Footer } from '../components/layout/Footer.js';

export function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
}