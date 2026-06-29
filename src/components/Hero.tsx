'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 md:px-8 overflow-hidden"
    >
      {/* Background lights and tree silhouette art */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1F14] via-[#0D1F14]/90 to-[#0d1f14] z-0" />
      
      {/* Radiant glow filters simulating sunlight filters through leaves */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#8FA93D]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[500px] h-[500px] rounded-full bg-[#D8BE7A]/5 blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-[92%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Headline and Glass Card */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-light text-xs md:text-sm font-semibold text-[#D8BE7A] border border-[#D8BE7A]/25"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A7C957] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A7C957]"></span>
            </span>
            Freshly Prepared Nigerian Street Delicacies
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-[#F7F4EB] leading-tight">
              Freshly Made.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8BE7A] to-[#A7C957]">
                Perfectly Roasted.
              </span><br />
              Served with Love.
            </h1>
            <p className="text-base md:text-lg text-[#F7F4EB]/80 max-w-xl font-normal leading-relaxed">
              Enjoy premium Akara, Awara, Maize, Popcorn and refreshing cold Zobo prepared fresh every day. Experience true comfort food under our virtual tree.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 items-center w-full sm:w-auto"
          >
            <a
              href="#menu"
              className="px-8 py-4 font-semibold rounded-full bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] transition-all duration-300 shadow-md hover:scale-105 flex items-center gap-2 text-center justify-center w-full sm:w-auto"
            >
              View Menu
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/2340000000000?text=I%20would%20like%20to%20order%20from%20UnderTree"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 font-semibold rounded-full glass-panel text-[#F7F4EB] hover:text-[#D8BE7A] transition-all duration-300 hover:scale-105 flex items-center gap-2 text-center justify-center border border-white/10 hover:border-[#D8BE7A]/40 w-full sm:w-auto"
            >
              <MessageSquare className="w-5 h-5" />
              Order on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Right Side: Animated illustration of a large tree & Floating food elements */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] md:min-h-[450px]">
          {/* Glowing central orb behind tree */}
          <div className="absolute w-[280px] h-[280px] rounded-full bg-[#8FA93D]/10 filter blur-[60px]" />

          {/* Large Stylized Interactive Tree Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-72 h-72 md:w-96 md:h-96 relative flex items-center justify-center pointer-events-none"
          >
            <svg
              viewBox="0 0 200 200"
              fill="none"
              className="w-full h-full text-[#A7C957]/90 drop-shadow-[0_0_20px_rgba(167,201,87,0.2)]"
            >
              {/* Trunk */}
              <path
                d="M100 180 C95 180 92 145 92 120 C92 120 85 110 80 115 C75 120 70 120 70 120 C70 120 80 100 90 95 C90 95 90 80 100 70 C110 80 110 95 110 95 C120 100 130 120 130 120 C130 120 125 120 120 115 C115 110 108 120 108 120 C108 145 105 180 100 180 Z"
                fill="#8FA93D"
              />
              {/* Foliage Circles */}
              <circle cx="100" cy="70" r="35" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="75" cy="90" r="30" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="125" cy="90" r="30" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="100" cy="95" r="25" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
              
              {/* Inner detail leaves */}
              <path d="M100 45 Q105 55 100 65 Q95 55 100 45 Z" fill="#D8BE7A" />
              <path d="M70 70 Q78 78 70 86 Q62 78 70 70 Z" fill="#A7C957" />
              <path d="M130 70 Q138 78 130 86 Q122 78 130 70 Z" fill="#D8BE7A" />
            </svg>

            {/* Steam animation rising from tree center as if hot food is underneath */}
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
              <span className="w-1.5 h-10 bg-gradient-to-t from-transparent to-[#F7F4EB]/30 rounded-full animate-steam" style={{ animationDelay: '0.1s' }} />
              <span className="w-1.5 h-12 bg-gradient-to-t from-transparent to-[#F7F4EB]/20 rounded-full animate-steam" style={{ animationDelay: '0.7s' }} />
              <span className="w-1.5 h-8 bg-gradient-to-t from-transparent to-[#F7F4EB]/30 rounded-full animate-steam" style={{ animationDelay: '1.3s' }} />
            </div>

            {/* Floating Food Particles around tree */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute top-10 left-5 w-14 h-14 glass-panel rounded-full flex items-center justify-center text-2xl shadow-gold-glow border border-[#D8BE7A]/30"
            >
              🥣
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-40 right-2 w-12 h-12 glass-panel rounded-full flex items-center justify-center text-2xl shadow-gold-glow border border-[#D8BE7A]/30"
            >
              🧃
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-5 left-10 w-12 h-12 glass-panel rounded-full flex items-center justify-center text-2xl shadow-gold-glow border border-[#D8BE7A]/30"
            >
              🍿
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
