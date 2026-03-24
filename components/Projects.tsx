'use client';

import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';

const projects = [
  {
    title: "Arogya Nabha",
    category: "Healthcare Platform",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop", 
    description: "A comprehensive healthcare platform focusing on patient management, accessibility, and telemedicine services.",
    links: { demo: "#", code: "https://github.com/NishitSK/arogya-nabha" }
  },
  {
    title: "Data Pipeline",
    category: "Big Data Infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2070&auto=format&fit=crop", 
    description: "A robust ETL pipeline using Apache Airflow and Spark, implementing the Medallion Architecture for data processing.",
    links: { demo: "#", code: "https://github.com/NishitSK/airflow-spark-medallion-pipeline" }
  },
  {
    title: "LearnPath AI",
    category: "AI Education Tool",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop", 
    description: "Personalized learning path generator powered by Artificial Intelligence to guide student currriculum and growth.",
    links: { demo: "#", code: "https://github.com/NishitSK/LearnPath-AI" }
  }
];

const Projects = () => {
  return (
    <section id="work" className="py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">
         
         <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
               <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-[2px] bg-[var(--accent)]" />
                  <span className="font-sans text-sm font-bold tracking-widest uppercase opacity-60">Works</span>
               </div>
               <h2 className="font-serif text-5xl lg:text-7xl">
                  Selected <span className="text-[var(--accent)]">Projects</span>
               </h2>
            </div>
            <a href="#" className="font-sans font-bold text-sm tracking-widest uppercase border-b border-current pb-1 hover:text-[var(--accent)] transition-colors">
               View Archives
            </a>
         </div>

         <div className="space-y-32">
            {projects.map((project, index) => (
               <ProjectCard key={index} project={project} index={index} />
            ))}
         </div>

      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
   return (
      <motion.div 
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.1 }}
         viewport={{ once: true, margin: "-100px" }}
         className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
      >
         {/* Image Side */}
         <div className="w-full lg:w-3/5 group relative overflow-hidden bg-black/5 aspect-[16/10]">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <Image 
               src={project.image} 
               alt={project.title}
               fill
               className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
            />
         </div>

         {/* Content Side */}
         <div className="w-full lg:w-2/5 flex flex-col items-start text-left">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">
               0{index + 1} / {project.category}
            </span>
            <h3 className="font-serif text-4xl lg:text-5xl mb-6 group-hover:text-[var(--accent)] transition-colors">
               {project.title}
            </h3>
            <p className="font-serif text-lg opacity-70 mb-8 leading-relaxed">
               {project.description}
            </p>
            
            <div className="flex items-center gap-8">
               <a href={project.links.demo} className="flex items-center gap-2 font-sans font-bold text-sm uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
                  Live Demo <ArrowUpRight size={16} />
               </a>
               <a href={project.links.code} className="flex items-center gap-2 font-sans font-bold text-sm uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
                  Code <Github size={16} />
               </a>
            </div>
         </div>

      </motion.div>
   )
}

export default Projects;