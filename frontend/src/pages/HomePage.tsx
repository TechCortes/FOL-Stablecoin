import { Header } from '../components/layout/Header.js';
import { Hero } from '../components/Hero.js';
import { About } from '../components/About.js';
import { Features } from '../components/Features.js';
import { HowItWorks } from '../components/HowItWorks.js';
import { Footer } from '../components/layout/Footer.js';

export function HomePage() {
  console.log('HomePage rendering...');
  
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