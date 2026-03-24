'use client';

import { motion } from 'framer-motion';

const skills = [
  { category: "Core", items: ["React", "Next.js", "TypeScript", "Node.js"] },
  { category: "Style", items: ["Tailwind CSS", "Framer Motion", "GSAP", "WebGL"] },
  { category: "Tools", items: ["Git", "Docker", "Figma", "Vercel"] },
  { category: "Design", items: ["UI/UX", "3D Modeling", "Animation", "Branding"] }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-black text-white relative border-y border-white/10">
      
      <div className="max-w-7xl mx-auto px-6">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
               <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-[2px] bg-[var(--accent)]" />
                  <span className="font-sans text-sm font-bold tracking-widest uppercase opacity-60">Arsenal</span>
               </div>
               <h2 className="font-serif text-5xl lg:text-7xl">
                  Technical <span className="text-[var(--accent)]">Arts</span>
               </h2>
            </div>
            
            <p className="font-serif text-lg opacity-60 max-w-md text-right hidden md:block">
               Mastery of code and design, honed through discipline and relentless practice.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((group, idx) => (
               <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 p-8 border border-white/10 hover:border-[var(--accent)] transition-colors duration-500"
               >
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-6">
                     {group.category}
                  </h3>
                  <ul className="space-y-4">
                     {group.items.map((skill, i) => (
                        <li key={i} className="font-serif text-xl flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-[var(--accent)] opacity-50" />
                           {skill}
                        </li>
                     ))}
                  </ul>
               </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
};

export default Skills;