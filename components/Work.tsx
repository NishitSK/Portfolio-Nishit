'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'Project One',
    description: 'Minimalist design with bold impact',
  },
  {
    title: 'Project Two',
    description: 'Clean lines and clear purpose',
  },
  {
    title: 'Project Three',
    description: 'Simplicity meets functionality',
  },
  {
    title: 'Project Four',
    description: 'Form follows function',
  },
];

const Work = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="min-h-screen py-20 border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-12"
        >
          Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                x: -4, 
                y: -4,
                boxShadow: '4px 4px 0 #000000',
              }}
              className="border-2 border-black p-10 cursor-pointer transition-all"
            >
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-lg opacity-80">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
