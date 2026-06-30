'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Search, User, Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ────────────────────────────────────────────────────────── */
/*  Props                                                     */
/* ────────────────────────────────────────────────────────── */
interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
}

/* ────────────────────────────────────────────────────────── */
/*  Navigation links                                          */
/* ────────────────────────────────────────────────────────── */
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Specials', href: '#prices' },
  { label: 'Gallery', href: '#playground' },
  { label: 'Contact', href: '#contact' },
];

/* ────────────────────────────────────────────────────────── */
/*  Animated hamburger icon (3-line ↔ X)                      */
/* ────────────────────────────────────────────────────────── */
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        className="block h-[2px] w-full bg-[#F7F4EB] rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.25 }}
        className="block h-[2px] w-full bg-[#F7F4EB] rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        className="block h-[2px] w-full bg-[#F7F4EB] rounded-full origin-center"
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Navbar Component                                          */
/* ────────────────────────────────────────────────────────── */
export default function Navbar({
  cartCount,
  onOpenCart,
  favoritesCount,
  onOpenFavorites,
  onOpenAdmin,
  isAdmin,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  /* ── Scroll listener: shrink + blur boost ── */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── Intersection Observer for active section ── */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════ */}
      {/*  FLOATING CAPSULE NAV                               */}
      {/* ═══════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ paddingTop: scrolled ? '10px' : '18px' }}
      >
        <div
          className="pointer-events-auto transition-all duration-500 ease-out"
          style={{
            width: scrolled ? '90%' : '88%',
            maxWidth: '1360px',
            height: scrolled ? '64px' : '76px',
            borderRadius: scrolled ? '28px' : '36px',
            /* Glassmorphism */
            background: scrolled
              ? 'rgba(13, 31, 20, 0.82)'
              : 'rgba(13, 31, 20, 0.55)',
            backdropFilter: scrolled ? 'blur(32px) saturate(1.6)' : 'blur(24px) saturate(1.4)',
            WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(1.6)' : 'blur(24px) saturate(1.4)',
            border: '1px solid rgba(216, 190, 122, 0.12)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.45), 0 1.5px 0 rgba(247,244,235,0.04) inset, 0 -1px 0 rgba(0,0,0,0.2) inset'
              : '0 12px 48px rgba(0,0,0,0.35), 0 1.5px 0 rgba(247,244,235,0.06) inset, 0 -1px 0 rgba(0,0,0,0.15) inset',
          }}
        >
          <div className="h-full flex items-center justify-between px-5 md:px-8">
            {/* ── LEFT: Logo ── */}
            <a href="#home" className="flex items-center gap-3 group shrink-0">
              <div
                className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#A7C957] via-[#8FA93D] to-[#6B8C2A] text-[#0D1F14] shadow-lg group-hover:shadow-[0_0_18px_rgba(167,201,87,0.35)] transition-all duration-400"
                style={{
                  width: scrolled ? '36px' : '42px',
                  height: scrolled ? '36px' : '42px',
                  fontSize: scrolled ? '18px' : '22px',
                }}
              >
                🌲
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span
                  className="font-playfair font-bold tracking-wide text-[#F7F4EB] group-hover:text-[#D8BE7A] transition-colors duration-300"
                  style={{ fontSize: scrolled ? '17px' : '20px' }}
                >
                  UnderTree
                </span>
                <span className="text-[9px] font-medium tracking-[0.18em] text-[#A7C957]/60 uppercase mt-0.5">
                  Street Kitchen
                </span>
              </div>
            </a>

            {/* ── CENTRE: Desktop nav links ── */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 group"
                    style={{
                      color: isActive
                        ? '#D8BE7A'
                        : 'rgba(247, 244, 235, 0.65)',
                    }}
                  >
                    <span className="relative z-10 group-hover:text-[#F7F4EB] transition-colors duration-300">
                      {link.label}
                    </span>

                    {/* Hover background glow */}
                    <span className="absolute inset-0 rounded-xl bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Active / hover underline */}
                    <motion.span
                      className="absolute bottom-0.5 left-1/2 h-[2px] rounded-full bg-[#D8BE7A]"
                      initial={false}
                      animate={{
                        width: isActive ? '60%' : '0%',
                        x: '-50%',
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      style={{ originX: 0.5 }}
                    />

                    {/* Hover underline (CSS-only, shows when not active) */}
                    {!isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-[40%] h-[2px] rounded-full bg-[#F7F4EB]/30 transition-all duration-300" />
                    )}

                    {/* Active glow dot */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D8BE7A] shadow-[0_0_6px_rgba(216,190,122,0.6)]" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* ── RIGHT: Action buttons ── */}
            <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
              {/* Search */}
              <button
                className="hidden md:flex w-9 h-9 items-center justify-center rounded-xl text-[#F7F4EB]/50 hover:text-[#F7F4EB] hover:bg-white/[0.06] transition-all duration-300"
                title="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              {/* Cart */}
              <button
                onClick={onOpenCart}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-[#F7F4EB]/50 hover:text-[#F7F4EB] hover:bg-white/[0.06] transition-all duration-300"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-gradient-to-r from-[#D8BE7A] to-[#c5a95f] text-[#0D1F14] font-bold text-[10px] shadow-[0_2px_8px_rgba(216,190,122,0.4)]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* User / Profile */}
              <button
                onClick={onOpenFavorites}
                className="hidden md:flex w-9 h-9 items-center justify-center rounded-xl text-[#F7F4EB]/50 hover:text-[#F7F4EB] hover:bg-white/[0.06] transition-all duration-300"
                title="Profile"
              >
                <User className="w-[18px] h-[18px]" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-0.5 flex items-center justify-center rounded-full bg-[#A7C957] text-[#0D1F14] font-bold text-[9px]">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Admin toggle */}
              <button
                onClick={onOpenAdmin}
                className={`hidden md:flex w-9 h-9 items-center justify-center rounded-xl transition-all duration-300 ${
                  isAdmin
                    ? 'text-[#D8BE7A] bg-[#D8BE7A]/10'
                    : 'text-[#F7F4EB]/50 hover:text-[#F7F4EB] hover:bg-white/[0.06]'
                }`}
                title="Admin Panel"
              >
                <Settings className="w-[18px] h-[18px]" />
              </button>

              {/* Divider */}
              <div className="hidden md:block w-px h-7 bg-white/[0.08] mx-1" />

              {/* Order Now CTA */}
              <a
                href="#menu"
                className="hidden md:inline-flex items-center justify-center font-semibold text-[13px] tracking-wide text-[#0D1F14] rounded-2xl transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(216,190,122,0.3)] active:translate-y-0"
                style={{
                  padding: scrolled ? '8px 22px' : '10px 28px',
                  background: 'linear-gradient(135deg, #D8BE7A 0%, #A7C957 50%, #8FA93D 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 4s ease infinite',
                }}
              >
                Order Now
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#F7F4EB] hover:bg-white/[0.06] transition-colors duration-300"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <HamburgerIcon isOpen={mobileOpen} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  FULL-SCREEN MOBILE OVERLAY                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0D1F14]/80 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-8">
              {/* Nav links — staggered */}
              <nav className="flex flex-col items-center gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.45,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className={`text-3xl sm:text-4xl font-playfair font-bold py-3 px-8 rounded-2xl transition-colors duration-300 ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-[#D8BE7A]'
                        : 'text-[#F7F4EB]/70 hover:text-[#F7F4EB]'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Mobile action row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-10 flex items-center gap-4"
              >
                <button
                  onClick={() => { onOpenFavorites(); setMobileOpen(false); }}
                  className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[#F7F4EB]/60 hover:text-[#D8BE7A] transition-colors"
                  title="Favorites"
                >
                  <User className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { onOpenCart(); setMobileOpen(false); }}
                  className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[#F7F4EB]/60 hover:text-[#D8BE7A] transition-colors relative"
                  title="Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 flex items-center justify-center rounded-full bg-[#D8BE7A] text-[#0D1F14] font-bold text-[11px]">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => { onOpenAdmin(); setMobileOpen(false); }}
                  className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[#F7F4EB]/60 hover:text-[#D8BE7A] transition-colors"
                  title="Admin"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </motion.div>

              {/* Order Now CTA */}
              <motion.a
                href="#menu"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 inline-flex items-center justify-center px-10 py-4 text-base font-bold tracking-wide text-[#0D1F14] rounded-2xl shadow-[0_6px_24px_rgba(216,190,122,0.3)]"
                style={{
                  background: 'linear-gradient(135deg, #D8BE7A 0%, #A7C957 50%, #8FA93D 100%)',
                }}
              >
                Order Now
              </motion.a>

              {/* Bottom brand */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 text-[11px] text-[#F7F4EB]/20 tracking-[0.2em] uppercase"
              >
                UnderTree • Street Kitchen
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
