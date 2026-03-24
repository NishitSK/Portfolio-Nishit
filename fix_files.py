
import os

files = {
    "components/Contact.tsx": """'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('The raven has taken your message. (Demo only)');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="min-h-screen py-24 bg-[var(--background)] relative overflow-hidden text-[var(--foreground)]">
      
      {/* Background Texture/Accent */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--accent)] rounded-full blur-[128px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 w-full">
        
        {/* Contact Info */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
             <span className="w-12 h-[2px] bg-[var(--accent)]" />
             <span className="font-sans text-sm font-bold tracking-widest uppercase opacity-60">Contact</span>
          </div>
          
          <h2 className="font-serif text-6xl lg:text-8xl mb-12 leading-none">
            Let's <br /><span className="text-[var(--accent)]">Work</span>.
          </h2>

          <div className="space-y-8 mb-12">
             <div className="flex items-start gap-6 group">
                <div className="p-4 border border-[var(--foreground)]/20 transition-colors group-hover:border-[var(--accent)]">
                   <Mail size={24} className="text-[var(--accent)]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-1 opacity-60">Email</h4>
                  <a href="mailto:hello@ronin.dev" className="font-serif text-2xl hover:text-[var(--accent)] transition-colors">hello@ronin.dev</a>
                </div>
             </div>
             
             <div className="flex items-start gap-6 group">
                <div className="p-4 border border-[var(--foreground)]/20 transition-colors group-hover:border-[var(--accent)]">
                   <MapPin size={24} className="text-[var(--accent)]" />
                </div>
                <div>
                   <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-1 opacity-60">Location</h4>
                   <p className="font-serif text-2xl">Kyoto, Japan / Remote</p>
                </div>
             </div>
          </div>

          <div className="flex gap-4">
             {[Github, Linkedin, Twitter].map((Icon, i) => (
               <a key={i} href="#" className="p-4 border border-[var(--foreground)]/20 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300">
                  <Icon size={20} />
               </a>
             ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-8 pt-12"
        >
          <div className="group relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="YOUR NAME"
              required
              className="w-full bg-transparent border-b border-[var(--foreground)]/20 text-xl py-4 focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--foreground)]/30 font-serif"
            />
          </div>
          
          <div className="group relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="YOUR EMAIL"
              required
              className="w-full bg-transparent border-b border-[var(--foreground)]/20 text-xl py-4 focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--foreground)]/30 font-serif"
            />
          </div>
          
          <div className="group relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="YOUR MESSAGE"
              rows={4}
              required
              className="w-full bg-transparent border-b border-[var(--foreground)]/20 text-xl py-4 focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--foreground)]/30 font-serif resize-none"
            />
          </div>

          <button
             type="submit"
             className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-white font-sans font-bold tracking-widest uppercase text-sm transition-all duration-300 flex items-center gap-2"
          >
             Send Message <Send size={16} />
          </button>
        </motion.form>

      </div>
    </section>
  );
};

export default Contact;
""",
    "components/Footer.tsx": """'use client';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl tracking-tighter">RONIN</span>
            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
        </div>

        <p className="font-sans text-xs uppercase tracking-widest opacity-40">
           © {new Date().getFullYear()} All Rights Reserved.
        </p>

        <div className="flex gap-6 font-sans text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-[var(--accent)] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">Github</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
""",
    "components/Experience.tsx": """'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: "Ronin Studios",
    role: "Senior Frontend Developer",
    period: "2022 - Present",
    description: "Led the development of award-winning digital experiences. Implemented advanced animation systems and 3D interactions."
  },
  {
    company: "Bushido Tech",
    role: "UI/UX Engineer",
    period: "2020 - 2022",
    description: "Crafted intuitive interfaces for enterprise applications. Focused on accessibility and performance optimization."
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2018 - 2020",
    description: "Collaborated with global clients to deliver bespoke web solutions. Mastered the art of rapid prototyping."
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
""",
    "components/Skills.tsx": """'use client';

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
""",
    "components/Projects.tsx": """'use client';

import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';

const projects = [
  {
    title: "Shadow Realm",
    category: "Immersive Web Experience",
    image: "https://images.unsplash.com/photo-1542259681-d2bf324cb4d2?q=80&w=2069&auto=format&fit=crop", // Placeholder
    description: "A 3D journey through a forgotten digital landscape, built with Three.js and WebGL.",
    links: { demo: "#", code: "#" }
  },
  {
    title: "Katana UI",
    category: "Design System",
    image: "https://images.unsplash.com/photo-1598555836489-0ae28c31e670?q=80&w=2070&auto=format&fit=crop", // Placeholder
    description: "A sharp, minimal component library for modern React applications.",
    links: { demo: "#", code: "#" }
  },
  {
    title: "Ronin Commerce",
    category: "E-commerce Platform",
    image: "https://images.unsplash.com/photo-1555616635-640a8519cc9c?q=80&w=2070&auto=format&fit=crop", // Placeholder
    description: "Headless e-commerce solution focusing on speed and conversion.",
    links: { demo: "#", code: "#" }
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
""",
    "components/Navbar.tsx": """'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.nav
        variants={{
           visible: { y: 0 },
           hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:py-8 mix-blend-difference text-white"
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
      </motion.nav>

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
""",
    "components/Hero.tsx": """'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
              Full Stack Developer
           </span>
        </motion.div>

        <motion.h1 
          className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9] tracking-tighter"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          DIGITAL <br /> 
          <span className="text-[var(--accent)] italic">RONIN</span>
        </motion.h1>

        <motion.p 
          className="font-serif text-xl md:text-2xl text-[var(--foreground)] opacity-70 max-w-2xl mx-auto mb-12 leading-relaxed"
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
        >
           <a 
             href="#work"
             className="group relative inline-flex items-center justify-center px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-sans font-bold tracking-widest uppercase text-sm overflow-hidden hover:bg-[var(--accent)] hover:text-white transition-colors duration-300"
           >
              <span>View Projects</span>
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
}

for path, content in files.items():
    # Write the content to the file
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f"Fixed {path}")
