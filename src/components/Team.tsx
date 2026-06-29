'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

interface Member {
  name: string;
  role: string;
  avatar: string;
}

export default function Team() {
  const members: Member[] = [
    { name: 'Abdulrauf Saleh', role: 'Founder & CEO', avatar: '👨‍💼' },
    { name: 'Chef Aliyu', role: 'Head Chef (Akara Master)', avatar: '👨‍🍳' },
    { name: 'Grace Benson', role: 'Kitchen Supervisor', avatar: '👩‍🍳' },
    { name: 'Musa Ibrahim', role: 'Logistics & Fast Delivery', avatar: '🚴' },
    { name: 'Zara Bello', role: 'Customer Service Representative', avatar: '👩‍💼' },
  ];

  return (
    <section className="py-20 relative overflow-hidden px-4 md:px-8">
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-[#A7C957]/5 blur-[80px] pointer-events-none" />

      <div className="w-[92%] max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-[#D8BE7A] font-medium tracking-wider text-sm uppercase">Our Team</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#F7F4EB]">
            Meet the UnderTree Squad
          </h3>
          <p className="text-sm md:text-base text-[#F7F4EB]/70 max-w-md mx-auto">
            The passionate minds behind the hot frying pans, fresh ingredients, and lightning-fast deliveries.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {members.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-[#D8BE7A]/30 text-center space-y-4 group transition-all duration-300 shadow-lg"
            >
              {/* Circular Avatar Container */}
              <div className="w-24 h-24 rounded-full bg-[#8FA93D]/10 border-2 border-[#8FA93D]/30 flex items-center justify-center text-4xl mx-auto group-hover:border-[#D8BE7A] transition-colors duration-300">
                {m.avatar}
              </div>

              <div>
                <h4 className="font-bold text-[#F7F4EB] text-lg font-playfair">{m.name}</h4>
                <p className="text-xs text-[#A7C957] font-semibold">{m.role}</p>
              </div>

              {/* Social icons on hover */}
              <div className="flex justify-center gap-3 pt-2">
                <a
                  href="#"
                  className="text-[#F7F4EB]/60 hover:text-[#D8BE7A] transition-colors"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="text-[#F7F4EB]/60 hover:text-[#D8BE7A] transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="text-[#F7F4EB]/60 hover:text-[#D8BE7A] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
