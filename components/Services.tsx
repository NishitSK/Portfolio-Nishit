'use client';

import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { title: 'SERVICE ONE', description: '[Description of service offering]' },
    { title: 'SERVICE TWO', description: '[Description of service offering]' },
    { title: 'SERVICE THREE', description: '[Description of service offering]' },
  ];

  return (
    <section id="services" className="min-h-screen py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-normal mb-12 tracking-widest"
        >
          SERVICES
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-2 border-black p-8"
            >
              <h3 className="text-xl font-normal tracking-wider mb-4">{service.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
