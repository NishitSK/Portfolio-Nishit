'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import IntroOverlay from '@/components/IntroOverlay';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  // Prevent scrolling during intro
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [introComplete]);

  return (
    <main className="relative bg-[var(--background)]">
      <IntroOverlay onComplete={() => setIntroComplete(true)} />
      
      {/* 
         The main content sits underneath. 
         We delay showing it fully opaque slightly to match the reveal if needed, 
         or just let the overlay cover it.
      */}
      <div className={`transition-opacity duration-1000 ${introComplete ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
