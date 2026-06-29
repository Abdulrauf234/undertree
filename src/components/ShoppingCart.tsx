'use client';

import React from 'react';
import { X, Trash2, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from './MenuCatalog';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: ShoppingCartProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const generateWhatsAppLink = () => {
    let message = `Hello UnderTree! I'd like to place an order:\n\n`;
    cartItems.forEach((item) => {
      message += `• ${item.product.name} (x${item.quantity}) - ₦${(
        item.product.price * item.quantity
      ).toLocaleString()}\n`;
    });
    message += `\n*Subtotal*: ₦${subtotal.toLocaleString()}\n`;
    message += `Please confirm my order and send payment details.`;
    return `https://wa.me/2340000000000?text=${encodeURIComponent(message)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0d1f14]/80 z-50 backdrop-blur-sm"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] z-50 glass-panel border-l border-white/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛍️</span>
                <h3 className="text-xl font-bold font-playfair text-[#F7F4EB]">Your Basket</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-[#F7F4EB]/70 hover:text-[#D8BE7A] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <span className="text-5xl">🍽️</span>
                  <div>
                    <h4 className="font-bold text-lg text-[#F7F4EB]">Your basket is empty</h4>
                    <p className="text-xs text-[#F7F4EB]/60 mt-1">Browse our menu and add your favorite street eats!</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] transition-all"
                  >
                    Go Explore
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 rounded-2xl glass-panel-light border border-white/5 relative group"
                  >
                    {/* Visual food code image */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#0D1F14] to-[#8FA93D]/20 flex items-center justify-center text-3xl select-none">
                      {item.product.image}
                    </div>

                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#F7F4EB] leading-tight font-playfair">
                          {item.product.name}
                        </h4>
                        <span className="text-xs text-[#D8BE7A] font-bold">
                          ₦{item.product.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-white/10 rounded-full overflow-hidden bg-[#0D1F14]/50">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="px-2.5 py-1 text-xs hover:bg-white/5 text-[#F7F4EB]/60 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-bold text-[#F7F4EB]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="px-2.5 py-1 text-xs hover:bg-white/5 text-[#F7F4EB]/60 hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#F7F4EB]/40 hover:text-red-400 p-1.5 rounded-full hover:bg-white/5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout info */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4 bg-black/20">
                <div className="flex justify-between text-base font-bold text-[#F7F4EB]">
                  <span>Subtotal:</span>
                  <span className="text-[#D8BE7A]">₦{subtotal.toLocaleString()}</span>
                </div>
                <p className="text-[11px] text-[#F7F4EB]/50">
                  Clicking checkout compiles your basket details and launches a WhatsApp order request pre-filled to our customer service desk.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Checkout via WhatsApp
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-xl glass-panel text-xs text-[#F7F4EB]/70 hover:text-white border border-white/5 transition-all text-center"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
