
import os

hero_content = """'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

// Sakura Petal Component
const SakuraPetal = ({ id }: { id: number }) => {
  const randomDuration = 10 + Math.random() * 10;
  const randomDelay = Math.random() * 5;
  const startX = Math.random() * 100;
  const endX = startX + (Math.random() * 20 - 10);
  
  return (
    <motion.div
      className="absolute top-[-20px] w-3 h-3 bg-[var(--accent)]/40 rounded-full blur-[1px] pointer-events-none"
      style={{ 
        left: `${startX}%`,
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" // Diamond/petal shape
      }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{ 
        y: "110vh", 
        opacity: [0, 0.8, 0],
        rotate: 360,
        x: [`${startX}%`, `${endX}%`]
      }}
      transition={{ 
        duration: randomDuration, 
        delay: randomDelay, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    />
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Create an array of petals
  const petals = Array.from({ length: 30 }, (_, i) => i);

  return (
    <section ref={containerRef} className="h-screen relative flex items-center justify-center overflow-hidden bg-[var(--background)]">
      
      {/* Dynamic Background */}
      <motion.div 
         style={{ y }} 
         className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/japanese-pattern.png')] pointer-events-none mix-blend-overlay" />

      {/* Ink Splash Effect (Decorative) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[var(--accent)]/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

      {/* Sakura Rain */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {petals.map((id) => (
          <SakuraPetal key={id} id={id} />
        ))}
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
           <span className="inline-block py-1 px-3 border border-[var(--gray-300)] text-[var(--gray-500)] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6 rounded-full">
              Full Stack Developer | Designer
           </span>
        </motion.div>

        <motion.h1 
          className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9] tracking-tighter mix-blend-difference text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          DIGITAL <br /> 
          <span className="text-[var(--accent)] italic">RONIN</span>
        </motion.h1>

        <motion.p 
          className="font-serif text-xl md:text-2xl text-[var(--foreground)] opacity-70 max-w-2xl mx-auto mb-12 leading-relaxed mix-blend-difference"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          Crafting sharp, disciplined, and enduring digital experiences with code and blade.
        </motion.p>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8, duration: 1 }}
           className="mix-blend-difference"
        >
           <a 
             href="#work"
             className="group relative inline-flex items-center justify-center px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-sans font-bold tracking-widest uppercase text-sm overflow-hidden hover:bg-[var(--accent)] hover:text-white transition-colors duration-300"
           >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 origin-bottom" />
           </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
         className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[var(--foreground)]/50"
         animate={{ y: [0, 10, 0] }}
         transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
         <ArrowDown size={24} />
      </motion.div>
      
    </section>
  );
};

export default Hero;
"""

with open("components/Hero.tsx", 'w', encoding='utf-8') as f:
    f.write(hero_content.strip())
print("Fixed component/Hero.tsx with Sakura effects")
