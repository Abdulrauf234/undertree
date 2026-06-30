'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

interface Member {
  name: string;
  role: string;
  avatar: string;
}

const members: Member[] = [
  { name: 'Abdulrauf Saleh', role: 'Founder & CEO', avatar: '👨‍💼' },
  { name: 'Chef Aliyu', role: 'Head Chef (Akara Master)', avatar: '👨‍🍳' },
  { name: 'Grace Benson', role: 'Kitchen Supervisor', avatar: '👩‍🍳' },
  { name: 'Musa Ibrahim', role: 'Logistics & Fast Delivery', avatar: '🚴' },
  { name: 'Zara Bello', role: 'Customer Service', avatar: '👩‍💼' },
];

const socials = [
  { icon: FiTwitter, label: 'Twitter' },
  { icon: FiInstagram, label: 'Instagram' },
  { icon: FiLinkedin, label: 'LinkedIn' },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

export default function Team() {
  return (
    <section id="team" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Background blurs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#A7C957]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#D8BE7A]/5 blur-[80px] pointer-events-none" />

      <div className="w-[92%] max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <span className="inline-block text-[#D8BE7A] font-medium tracking-[0.2em] text-xs uppercase px-4 py-1.5 rounded-full border border-[#D8BE7A]/20 bg-[#D8BE7A]/5">
            Our Team
          </span>
          <h3 className="text-3xl md:text-5xl font-playfair font-bold text-[#F7F4EB] leading-tight">
            Meet the UnderTree Squad
          </h3>
          <p className="text-sm md:text-base text-[#F7F4EB]/60 max-w-lg mx-auto leading-relaxed">
            The passionate minds behind the hot frying pans, fresh ingredients,
            and lightning-fast deliveries.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {members.map((m, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative glass-panel p-7 rounded-3xl border border-white/[0.06] hover:border-[#D8BE7A]/30 text-center flex flex-col items-center gap-5 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(216,190,122,0.12)]"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-3xl pointer-events-none">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D8BE7A]/10 to-transparent rounded-full translate-x-8 -translate-y-8 group-hover:from-[#D8BE7A]/20 transition-all duration-500" />
              </div>

              {/* Avatar with animated gradient ring */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#A7C957]/40 via-[#D8BE7A]/30 to-[#8FA93D]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#0D1F14] to-[#1a3322] border-2 border-[#8FA93D]/25 group-hover:border-[#D8BE7A]/60 flex items-center justify-center text-4xl transition-all duration-500 shadow-inner">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {m.avatar}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-[#F7F4EB] text-base font-playfair group-hover:text-[#D8BE7A] transition-colors duration-300">
                  {m.name}
                </h4>
                <p className="text-[11px] text-[#A7C957]/80 font-semibold tracking-wide uppercase">
                  {m.role}
                </p>
              </div>

              {/* Social icons — slide up on hover */}
              <div className="flex justify-center gap-2 pt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                {socials.map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    title={label}
                    className="w-8 h-8 rounded-full bg-[#F7F4EB]/[0.06] hover:bg-[#D8BE7A]/20 flex items-center justify-center text-[#F7F4EB]/50 hover:text-[#D8BE7A] transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>

              {/* Bottom glow line on hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/5 h-[2px] bg-gradient-to-r from-transparent via-[#D8BE7A]/50 to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
