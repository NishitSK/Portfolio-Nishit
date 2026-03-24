'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[var(--light-bg)] text-[var(--text)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Title & Image Placeholder */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
        >
           <h2 className="font-serif text-[clamp(3rem,5vw,5rem)] leading-none mb-8">
             The <br />
             <span className="text-[var(--accent)]">Philosophy</span>
           </h2>
           
           <div className="relative w-full aspect-[3/4] bg-[var(--ink-black)] overflow-hidden group">
              <div className="absolute inset-0 opacity-20 paper-texture z-10 mix-blend-multiply pointer-events-none" />
              <Image 
                src="/portrait.png" 
                alt="Portrait of the developer"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              />
           </div>
        </motion.div>

        {/* Right Column: Content */}
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           viewport={{ once: true }}
           className="pt-12 lg:pt-32"
        >
           <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-[var(--accent)]" />
              <span className="font-sans text-sm font-bold tracking-widest uppercase opacity-60">About Me</span>
           </div>

           <h3 className="font-serif text-3xl mb-8 leading-relaxed">
             As a student of the craft, I sharpen my skills daily, building code that cuts through the noise.
           </h3>

           <div className="space-y-6 font-sans text-lg opacity-80 leading-relaxed mb-12">
              <p>
                I am a 3rd-year engineering student at Sahyadri College who believes in the intersection of discipline and creativity. In a digital world cluttered with distraction, I strive to build focused, high-performance experiences.
              </p>
              <p>
                My approach is rooted in the principles of "Kaizen" — continuous improvement. Whether it's learning a new framework or optimizing a database query, I seek perfection in the details.
              </p>
           </div>

            {/* Stats */}
           <div className="grid grid-cols-3 gap-8 border-t border-[var(--ink-black)]/10 pt-8">
              <div>
                <span className="block font-serif text-4xl text-[var(--accent)] mb-2">3rd</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Year Student</span>
              </div>
              <div>
                <span className="block font-serif text-4xl text-[var(--accent)] mb-2">10+</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Projects</span>
              </div>
              <div>
                 <span className="block font-serif text-4xl text-[var(--accent)] mb-2">100%</span>
                 <span className="text-xs font-bold uppercase tracking-widest opacity-60">Committed</span>
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
