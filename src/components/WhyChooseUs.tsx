'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf, ShieldCheck, Flame, Zap, Award } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: <Sparkles className="w-8 h-8 text-[#D8BE7A]" />,
      title: 'Freshly Made Daily',
      desc: 'All snacks are prepared fresh only after you place your order, guaranteeing peak hotness and crispiness.',
    },
    {
      icon: <Award className="w-8 h-8 text-[#A7C957]" />,
      title: 'Farm Fresh Ingredients',
      desc: 'Sourcing beans, maize, corn, soy, and hibiscus directly from local farmers who prioritize quality.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-[#D8BE7A]" />,
      title: 'Cold Homemade Zobo',
      desc: 'Our signature Zobo is naturally sweetened with pineapple, dates, and infused with secret spices.',
    },
    {
      icon: <Zap className="w-8 h-8 text-[#A7C957]" />,
      title: 'Premium Popcorn',
      desc: 'Popcorn cooked in small batches, glazed in sweet caramel, pure butter, or classic savory salt.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#D8BE7A]" />,
      title: 'Hygienic Preparation',
      desc: 'Strict hygiene standards, pure filtered oil, sanitised packaging, and pristine cooking tools.',
    },
    {
      icon: <Flame className="w-8 h-8 text-[#A7C957]" />,
      title: 'Fast Delivery',
      desc: 'Shipped in insulated bags to ensure your snacks arrive hot, fresh, and ready to devour.',
    },
  ];

  return (
    <section id="why-us" className="py-20 relative px-4 md:px-8">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#A7C957]/5 blur-[100px] pointer-events-none" />

      <div className="w-[92%] max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-[#D8BE7A] font-medium tracking-wider text-sm uppercase">The UnderTree Standard</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#F7F4EB]">
            Why Choose UnderTree?
          </h3>
          <p className="text-sm md:text-base text-[#F7F4EB]/70">
            We hold ourselves to a premium standard, combining the comfort of street snacks with clean preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-[#D8BE7A]/30 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8FA93D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="mb-4 p-3 rounded-2xl bg-white/5 w-fit group-hover:bg-[#8FA93D]/20 transition-colors duration-300">
                {card.icon}
              </div>

              <h4 className="text-xl font-bold text-[#F7F4EB] mb-2 font-playfair">
                {card.title}
              </h4>
              <p className="text-sm text-[#F7F4EB]/70 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
