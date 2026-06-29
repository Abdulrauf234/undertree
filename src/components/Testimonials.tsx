'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export default function Testimonials() {
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Aminu Yusuf',
      location: 'Kano, Nigeria',
      rating: 5,
      text: 'The best Akara I have tasted in years. Super crispy on the outside, and incredibly soft inside. The Zobo drink is also beautifully spiced.',
      avatar: '👨‍💼',
    },
    {
      id: 2,
      name: 'Chioma Nwachukwu',
      location: 'Enugu, Nigeria',
      rating: 5,
      text: 'Extremely clean and hygienic preparation. Seeing my Pepper Awara served hot and fresh makes UnderTree my absolute go-to snack center.',
      avatar: '👩‍⚕️',
    },
    {
      id: 3,
      name: 'Babatunde Adebayo',
      location: 'Lagos, Nigeria',
      rating: 5,
      text: 'Their roasted maize has that perfect smoky charcoal flavor, and the sweet caramel popcorn is an absolute hit for the kids.',
      avatar: '👨‍💻',
    },
    {
      id: 4,
      name: 'Fatima Ibrahim',
      location: 'Abuja, Nigeria',
      rating: 5,
      text: 'Cold, fresh, and naturally sweetened Zobo delivered fast. It really evokes that feeling of relaxing under a cool shade tree.',
      avatar: '👩‍💼',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section id="testimonials" className="py-20 relative px-4 md:px-8">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#8FA93D]/5 blur-[120px] pointer-events-none" />

      <div className="w-[92%] max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-[#D8BE7A] font-medium tracking-wider text-sm uppercase">Happy Guests</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#F7F4EB]">
            What Our Customers Say
          </h3>
        </div>

        {/* Carousel Window */}
        <div className="relative glass-panel rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl flex flex-col items-center text-center space-y-6 overflow-hidden min-h-[300px] justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Avatar circle */}
              <div className="w-16 h-16 rounded-full bg-[#8FA93D]/20 border border-[#8FA93D]/40 text-3xl flex items-center justify-center mx-auto shadow-md">
                {reviews[currentIndex].avatar}
              </div>

              {/* Rating stars */}
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: reviews[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D8BE7A] text-[#D8BE7A]" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl font-medium text-[#F7F4EB] leading-relaxed italic max-w-2xl">
                &ldquo;{reviews[currentIndex].text}&rdquo;
              </blockquote>

              <div>
                <cite className="font-bold text-[#D8BE7A] not-italic block text-base">
                  {reviews[currentIndex].name}
                </cite>
                <span className="text-xs text-[#F7F4EB]/60">
                  {reviews[currentIndex].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full glass-panel border border-white/10 text-[#F7F4EB] hover:text-[#D8BE7A] transition-colors"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === currentIndex ? 'bg-[#D8BE7A]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full glass-panel border border-white/10 text-[#F7F4EB] hover:text-[#D8BE7A] transition-colors"
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
