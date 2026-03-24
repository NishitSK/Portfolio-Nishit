'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 px-8 py-4 backdrop-blur-md bg-[var(--bg)]/30 border border-[var(--text)]/10 text-[var(--text)] rounded-full shadow-sm transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <Link href="/" className="z-50 group">
             <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-2xl tracking-tighter group-hover:text-[var(--accent)] transition-colors">RONIN</span>
                <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
             {['Work', 'Experience', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="font-sans text-xs font-bold uppercase tracking-widest hover:text-[var(--accent)] transition-colors relative group"
                >
                   {item}
                   <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                </Link>
             ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
             onClick={toggleMenu} 
             className="md:hidden z-50 p-2 hover:text-[var(--accent)] transition-colors"
          >
             {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div
         initial={{ x: '100%' }}
         animate={{ x: isOpen ? 0 : '100%' }}
         transition={{ type: 'tween', duration: 0.4 }}
         className="fixed inset-0 bg-[#0a0a0a] z-40 md:hidden flex items-center justify-center"
      >
         <div className="flex flex-col gap-8 text-center">
            {['Work', 'Experience', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-4xl text-[var(--bg)] hover:text-[var(--accent)] transition-colors"
                >
                   {item}
                </Link>
             ))}
         </div>
      </motion.div>
    </>
  );
};

export default Navbar;