'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#8FA93D', '#A7C957', '#D8BE7A'],
    });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 relative px-4 md:px-8">
      {/* Background soft glow */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-[#8FA93D]/5 blur-[100px] pointer-events-none" />

      <div className="w-[92%] max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-[#D8BE7A] font-medium tracking-wider text-sm uppercase">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#F7F4EB]">
            Connect With UnderTree
          </h3>
          <p className="text-sm text-[#F7F4EB]/70 max-w-md mx-auto">
            Have inquiries, bulk order bookings, or want to send us feedback? Drop a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Contact Information & Mock Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6 flex-grow">
              <h4 className="text-xl font-bold font-playfair text-[#D8BE7A]">Contact Info</h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 text-[#8FA93D]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#F7F4EB] text-sm">Call/WhatsApp</h5>
                    <p className="text-xs text-[#F7F4EB]/70">+234 (0) 803 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 text-[#A7C957]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#F7F4EB] text-sm">Email Address</h5>
                    <p className="text-xs text-[#F7F4EB]/70">hello@undertree.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 text-[#8FA93D]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#F7F4EB] text-sm">Main Branch</h5>
                    <p className="text-xs text-[#F7F4EB]/70">No. 12 Forest Ave, Garki, Abuja, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 text-[#A7C957]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#F7F4EB] text-sm">Opening Hours</h5>
                    <p className="text-xs text-[#F7F4EB]/70">Mon - Sat: 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map Canvas placeholder */}
              <div className="h-44 w-full rounded-2xl relative overflow-hidden border border-white/10 bg-emerald-950/20 flex flex-col justify-end p-4">
                {/* Simulated Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                
                {/* Simulated Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <span className="text-3xl animate-bounce">📍</span>
                  <span className="px-2.5 py-1 rounded bg-[#0D1F14] text-[#D8BE7A] font-bold text-[9px] border border-[#D8BE7A]/30 whitespace-nowrap shadow-lg">
                    UnderTree HQ
                  </span>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-10 w-full py-2 text-center text-xs font-bold rounded-lg bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] transition-all"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Glass Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl h-full flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-2xl font-bold font-playfair text-[#F7F4EB]">Send Us a Message</h4>
                <p className="text-xs text-[#F7F4EB]/70">Fill out this quick form and our support squad will reach you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                  <label className="block text-xs font-bold text-[#D8BE7A] uppercase mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F7F4EB] placeholder-[#F7F4EB]/30 focus:outline-none focus:border-[#D8BE7A] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#D8BE7A] uppercase mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +234..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F7F4EB] placeholder-[#F7F4EB]/30 focus:outline-none focus:border-[#D8BE7A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#D8BE7A] uppercase mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@domain.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F7F4EB] placeholder-[#F7F4EB]/30 focus:outline-none focus:border-[#D8BE7A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D8BE7A] uppercase mb-1.5">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F7F4EB] placeholder-[#F7F4EB]/30 focus:outline-none focus:border-[#D8BE7A] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-grow py-3.5 px-6 font-bold rounded-xl bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </button>
                  <a
                    href="https://wa.me/2340000000000?text=Hello%20UnderTree,%20I'd%20like%20to%20place%20an%20order"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-6 font-semibold rounded-xl glass-panel text-[#F7F4EB] hover:text-[#D8BE7A] hover:bg-white/5 border border-white/10 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Order via WhatsApp
                  </a>
                </div>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-[#8FA93D]/20 border border-[#8FA93D]/40 text-center text-sm font-semibold text-[#A7C957]"
                >
                  🎉 Message Sent Successfully! Thank you for contacting UnderTree.
                </motion.div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
