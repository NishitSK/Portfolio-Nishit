'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send } from 'lucide-react';
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
                  <a href="mailto:nishitsk2005@gmail.com" className="font-serif text-2xl hover:text-[var(--accent)] transition-colors">nishitsk2005@gmail.com</a>
                </div>
             </div>
             
             <div className="flex items-start gap-6 group">
                <div className="p-4 border border-[var(--foreground)]/20 transition-colors group-hover:border-[var(--accent)]">
                   <Phone size={24} className="text-[var(--accent)]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-1 opacity-60">Phone</h4>
                  <a href="tel:+917483543085" className="font-serif text-2xl hover:text-[var(--accent)] transition-colors">+91 7483543085</a>
                </div>
             </div>

             <div className="flex items-start gap-6 group">
                <div className="p-4 border border-[var(--foreground)]/20 transition-colors group-hover:border-[var(--accent)]">
                   <MapPin size={24} className="text-[var(--accent)]" />
                </div>
                <div>
                   <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-1 opacity-60">Location</h4>
                   <p className="font-serif text-2xl">Mangaluru, India</p>
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