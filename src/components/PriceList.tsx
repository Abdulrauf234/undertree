'use client';

import React from 'react';
import { Product } from './MenuCatalog';
import { ArrowUpRight } from 'lucide-react';

interface PriceListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function PriceList({ products, onAddToCart }: PriceListProps) {
  return (
    <section id="prices" className="py-20 relative px-4 md:px-8">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-[#D8BE7A]/5 blur-[100px] pointer-events-none" />

      <div className="w-[92%] max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-[#D8BE7A] font-medium tracking-wider text-sm uppercase">Quick Rates</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#F7F4EB]">
            Price Catalogue
          </h3>
          <p className="text-sm md:text-base text-[#F7F4EB]/70 max-w-md mx-auto">
            A transparent overview of prices for quick reference. Simple, affordable, premium.
          </p>
        </div>

        {/* Elegant Glass Table */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#D8BE7A]">Product</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#D8BE7A]">Category</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#D8BE7A]">Status</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#D8BE7A]">Price</th>
                  <th className="py-4 px-6 text-right text-xs font-bold uppercase tracking-wider text-[#D8BE7A]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.image}</span>
                        <div>
                          <div className="font-bold text-[#F7F4EB] flex items-center gap-2">
                            {p.name}
                            {p.badge && (
                              <span className="bg-[#D8BE7A]/25 text-[#D8BE7A] border border-[#D8BE7A]/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#F7F4EB]/60 line-clamp-1">{p.desc}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#F7F4EB]/80 capitalize">{p.category}</td>
                    <td className="py-4 px-6">
                      {p.available ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#A7C957]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A7C957] animate-pulse"></span>
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-red-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                          Sold Out
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-base font-bold text-[#D8BE7A]">
                      ₦{p.price.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onAddToCart(p)}
                        disabled={!p.available}
                        className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                          p.available
                            ? 'bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] hover:scale-105'
                            : 'bg-white/5 text-white/20 cursor-not-allowed'
                        }`}
                      >
                        Order
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
