'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: "Sahyadri College of Engineering & Management",
    role: "Computer Science Student (3rd Year)",
    period: "2023 - Present",
    description: "Pursuing a Bachelor of Engineering. Actively involved in technical clubs, hackathons, and building real-world projects."
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2024 - Present",
    description: "Developing bespoke web solutions for clients. Specializing in modern React ecosystems and performance optimization."
  },
  {
    company: "Open Source",
    role: "Contributor",
    period: "2023 - Present",
    description: "Contributing to community-driven projects. Learning from and building with the global developer community."
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-[var(--background)] relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex items-center gap-4 mb-16">
           <span className="w-12 h-[2px] bg-[var(--accent)]" />
           <span className="font-sans text-sm font-bold tracking-widest uppercase opacity-60">Path</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-4">
              <h2 className="font-serif text-5xl lg:text-7xl leading-tight">
                 My <br /> <span className="text-[var(--accent)]">Journey</span>
              </h2>
           </div>

           <div className="lg:col-span-8 space-y-12">
              {experiences.map((exp, index) => (
                <motion.div 
                   key={index}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   viewport={{ once: true }}
                   className="group relative pl-8 border-l border-[var(--foreground)]/20 hover:border-[var(--accent)] transition-colors duration-500"
                >
                   <span className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-[var(--background)] border border-[var(--foreground)]/20 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors duration-500 rotate-45" />
                   
                   <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                      <h3 className="font-serif text-2xl group-hover:text-[var(--accent)] transition-colors">{exp.company}</h3>
                      <span className="font-sans text-sm font-bold tracking-widest opacity-40">{exp.period}</span>
                   </div>
                   
                   <h4 className="font-sans text-sm font-bold uppercase tracking-widest mb-4 opacity-80">{exp.role}</h4>
                   <p className="font-serif text-lg opacity-70 max-w-2xl leading-relaxed">
                      {exp.description}
                   </p>
                </motion.div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;