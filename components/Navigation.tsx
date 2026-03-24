'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-8 right-8 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 bg-black text-white border-2 border-black font-normal tracking-widest hover:bg-white hover:text-black transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        MENU
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 bg-white border-2 border-black min-w-[200px]"
        >
          {navItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => {
                scrollToSection(item.href);
                setIsOpen(false);
              }}
              className="w-full px-6 py-3 text-left border-b-2 border-black last:border-b-0 hover:bg-black hover:text-white transition-colors tracking-wider"
            >
              {item.name}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
