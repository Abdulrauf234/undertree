'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden px-4 md:px-8">
      {/* Visual lighting accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#8FA93D]/5 blur-[80px] pointer-events-none" />

      <div className="w-[92%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Brand Concept Image / Styled Frame */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md aspect-[4/5] rounded-3xl relative overflow-hidden glass-panel border border-[#D8BE7A]/30 p-8 flex flex-col justify-between shadow-gold-glow"
          >
            {/* Visual tree crown pattern inside the glass card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A7C957]/10 rounded-full filter blur-2xl -z-10" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#8FA93D]/10 rounded-full filter blur-2xl -z-10" />

            <div className="text-sm font-semibold tracking-wider text-[#A7C957] uppercase">Est. 2026</div>

            <div className="space-y-4">
              <span className="text-6xl block">🌲</span>
              <h3 className="text-3xl font-playfair font-bold text-[#F7F4EB]">
                Relax. Eat.<br />
                Reconnect.
              </h3>
              <p className="text-sm text-[#F7F4EB]/70 leading-relaxed">
                In Nigeria, the shade of a large tree is where communities gather to share stories, jokes, and incredible food. We bring that exact authentic feeling straight to your table.
              </p>
            </div>

            <div className="flex gap-4 border-t border-white/10 pt-4 text-xs text-[#D8BE7A]">
              <div>🟢 Fresh Daily</div>
              <div>🟡 100% Hygienic</div>
              <div>🟢 Pure Bliss</div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-2"
          >
            <h2 className="text-[#D8BE7A] font-medium tracking-wider text-sm uppercase">Our Story</h2>
            <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#F7F4EB]">
              The Magic of Dining Under the Tree
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4 text-[#F7F4EB]/80 leading-relaxed text-sm md:text-base"
          >
            <p>
              UnderTree was born out of a desire to elevate local Nigerian street foods into a premium dining experience without losing their soulful, comforting essence. We specialize in hot, freshly fried Akara, golden-brown spiced Awara (soy curd), boiled and roasted maize, sweet premium popcorn, and cold, spiced homemade Zobo drink.
            </p>
            <p>
              Every ingredient is sourced from local farms, prepared in a highly hygienic kitchen environment, and cooked to order. Our brand is all about slowing down, relaxing in the cool &lsquo;shade&rsquo; of life, and appreciating delicious snacks with friends and family.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="glass-panel p-4 rounded-2xl border border-white/5">
                <h4 className="text-2xl font-playfair font-bold text-[#D8BE7A]">100%</h4>
                <p className="text-xs text-[#F7F4EB]/70">Fresh Ingredients Daily</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/5">
                <h4 className="text-2xl font-playfair font-bold text-[#A7C957]">5k+</h4>
                <p className="text-xs text-[#F7F4EB]/70">Happy Guests Served</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
