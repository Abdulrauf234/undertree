'use client';

import React from 'react';
import { MessageSquare, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-4 md:px-8 border-t border-white/5 bg-[#0D1F14]">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#8FA93D]/5 blur-[80px] pointer-events-none" />

      <div className="w-[92%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 relative z-10 pb-12 border-b border-white/5">
        
        {/* Column 1: Logo & Tagline */}
        <div className="lg:col-span-4 space-y-6">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8FA93D] to-[#A7C957] flex items-center justify-center text-[#0D1F14] font-bold text-xl">
              🌲
            </div>
            <span className="font-playfair font-bold text-xl tracking-wide text-[#F7F4EB]">
              UnderTree
            </span>
          </a>
          <p className="text-xs text-[#F7F4EB]/70 leading-relaxed max-w-sm">
            Elevating authentic Nigerian street snacks with fresh ingredients, clean methods, and maximum comfort. Dine under our virtual canopy.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold text-[#D8BE7A] uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-xs text-[#F7F4EB]/75">
            <li><a href="#home" className="hover:text-[#D8BE7A] transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-[#D8BE7A] transition-colors">About Us</a></li>
            <li><a href="#menu" className="hover:text-[#D8BE7A] transition-colors">Menu Catalog</a></li>
            <li><a href="#prices" className="hover:text-[#D8BE7A] transition-colors">Price List</a></li>
            <li><a href="#playground" className="hover:text-[#D8BE7A] transition-colors">Cooking Hub</a></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-bold text-[#D8BE7A] uppercase tracking-wider">Snack Categories</h4>
          <ul className="space-y-2 text-xs text-[#F7F4EB]/75">
            <li>🥣 Premium Akara (Single / Portion)</li>
            <li>🧀 Fresh Spiced & Fried Awara</li>
            <li>🌽 Charcoal Roasted & Boiled Maize</li>
            <li>🍿 Sweet, Salted, Caramel Popcorn</li>
            <li>🧃 Spiced Natural Zobo Drink</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-bold text-[#D8BE7A] uppercase tracking-wider">UnderTree Club</h4>
          <p className="text-xs text-[#F7F4EB]/60">Subscribe to get notifications on daily hot batches and discount alerts.</p>
          
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F7F4EB] focus:outline-none focus:border-[#D8BE7A] flex-grow"
            />
            <button
              type="submit"
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] transition-all"
            >
              Join
            </button>
          </form>
        </div>

      </div>

      {/* Copyright/Privacy */}
      <div className="w-[92%] max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#F7F4EB]/40">
        <p>© {new Date().getFullYear()} UnderTree Restaurant. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#D8BE7A] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#D8BE7A] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
