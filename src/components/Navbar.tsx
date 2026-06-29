'use client';

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Heart, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  favoritesCount,
  onOpenFavorites,
  onOpenAdmin,
  isAdmin,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Menu', href: '#menu' },
    { label: 'Prices', href: '#prices' },
    { label: 'Playground', href: '#playground' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl glass-panel rounded-full py-3 px-6 flex items-center justify-between z-50 transition-all duration-300 shadow-gold-glow">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8FA93D] to-[#A7C957] flex items-center justify-center text-[#0D1F14] font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
            🌲
          </div>
          <span className="font-playfair font-bold text-xl tracking-wide text-[#F7F4EB] group-hover:text-[#D8BE7A] transition-colors duration-300">
            UnderTree
          </span>
        </a>

        {/* Desktop Navigation Items */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#F7F4EB]/80 hover:text-[#D8BE7A] text-sm font-medium transition-colors duration-300 relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D8BE7A] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Favorite button */}
          <button
            onClick={onOpenFavorites}
            className="p-2 text-[#F7F4EB]/80 hover:text-[#D8BE7A] hover:bg-white/5 rounded-full transition-colors relative"
            title="Favorites"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A7C957] text-[#0D1F14] font-bold text-xs rounded-full flex items-center justify-center scale-90">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="p-2 text-[#F7F4EB]/80 hover:text-[#D8BE7A] hover:bg-white/5 rounded-full transition-colors relative"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D8BE7A] text-[#0D1F14] font-bold text-xs rounded-full flex items-center justify-center scale-90">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Toggle */}
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded-full transition-colors ${
              isAdmin
                ? 'text-[#D8BE7A] bg-white/10'
                : 'text-[#F7F4EB]/80 hover:text-[#D8BE7A] hover:bg-white/5'
            }`}
            title="Admin CRM Panel"
          >
            <Settings className="w-5 h-5" />
          </button>

          <a
            href="#menu"
            className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-full bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] transition-all duration-300 shadow-md hover:scale-105"
          >
            Order Now
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#F7F4EB]/80 hover:text-[#D8BE7A] rounded-full hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-[4%] w-[92%] glass-panel rounded-2xl py-6 px-4 flex flex-col gap-4 z-40 lg:hidden shadow-2xl"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold py-2 px-4 rounded-xl hover:bg-white/5 text-[#F7F4EB] hover:text-[#D8BE7A] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <hr className="border-white/10 my-2" />
            <a
              href="#menu"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 font-bold rounded-xl bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] transition-colors block"
            >
              Order Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
