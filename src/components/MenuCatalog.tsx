'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, MessageSquare, Star } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  desc: string;
  price: number;
  rating: number;
  image: string;
  badge?: string;
  available: boolean;
}

interface MenuCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function MenuCatalog({
  products,
  onAddToCart,
  favorites,
  onToggleFavorite,
}: MenuCatalogProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Akara', 'Awara', 'Maize', 'Popcorn', 'Drinks'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="menu" className="py-20 relative px-4 md:px-8">
      {/* Background soft lighting */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#8FA93D]/5 blur-[120px] pointer-events-none" />

      <div className="w-[92%] max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-[#D8BE7A] font-medium tracking-wider text-sm uppercase">Our Menu</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#F7F4EB]">
            Explore Fresh Delicacies
          </h3>
          <p className="text-sm md:text-base text-[#F7F4EB]/70 max-w-lg mx-auto">
            Freshly prepared, hot, authentic Nigerian street eats packed with rich flavor.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#8FA93D] text-[#0D1F14] shadow-lg scale-105'
                  : 'glass-panel text-[#F7F4EB]/80 hover:text-[#D8BE7A] border border-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid of Product Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isFav = favorites.includes(product.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-[#D8BE7A]/40 transition-all duration-300 group flex flex-col justify-between relative"
                >
                  
                  {/* Image container */}
                  <div className="relative aspect-square overflow-hidden bg-emerald-950/20">
                    {/* Placeholder colored box since we have no real backend images */}
                    <div className="absolute inset-0 flex items-center justify-center text-6xl select-none group-hover:scale-110 transition-transform duration-500 bg-gradient-to-tr from-[#0D1F14] to-[#8FA93D]/25">
                      {product.image}
                    </div>

                    {/* Top Action Icons */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      {product.badge && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#D8BE7A] text-[#0D1F14]">
                          {product.badge}
                        </span>
                      )}
                      {!product.available && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-950/80 text-red-300 border border-red-800">
                          Sold Out
                        </span>
                      )}
                      <div className="flex-grow"></div>
                      <button
                        onClick={() => onToggleFavorite(product.id)}
                        className={`p-2 rounded-full glass-panel border border-white/10 hover:scale-110 transition-transform ${
                          isFav ? 'text-red-500 fill-red-500' : 'text-[#F7F4EB]/70 hover:text-red-400'
                        }`}
                        title="Add to Favorites"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#F7F4EB]/60">
                        <span>{product.category}</span>
                        <div className="flex items-center gap-1 text-[#D8BE7A]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-[#F7F4EB] font-playfair group-hover:text-[#D8BE7A] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#F7F4EB]/70 line-clamp-2">
                        {product.desc}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xl font-bold text-[#D8BE7A]">
                        ₦{product.price.toLocaleString()}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* WhatsApp Ordering */}
                        <a
                          href={`https://wa.me/2340000000000?text=I%20would%20like%20to%20order%20${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full glass-panel border border-white/5 hover:text-[#8FA93D] hover:border-[#8FA93D]/40 transition-colors"
                          title="Order direct via WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>

                        {/* Add to Cart */}
                        <button
                          disabled={!product.available}
                          onClick={() => onAddToCart(product)}
                          className={`p-2.5 rounded-full flex items-center justify-center transition-all ${
                            product.available
                              ? 'bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] hover:scale-105'
                              : 'bg-white/5 text-white/20 cursor-not-allowed'
                          }`}
                          title="Add to Cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
