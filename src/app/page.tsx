'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LeafParticles from '../components/LeafParticles';
import Hero from '../components/Hero';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import MenuCatalog, { Product } from '../components/MenuCatalog';
import PriceList from '../components/PriceList';
import Playground from '../components/Playground';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ShoppingCart, { CartItem } from '../components/ShoppingCart';
import AdminDashboard from '../components/AdminDashboard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  // Brand initial menu products state
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'akara-single',
      name: 'Single Piece Akara',
      category: 'Akara',
      desc: 'Crispy golden bean cake fried in premium vegetable oil.',
      price: 200,
      rating: 4.8,
      image: '🥣',
      available: true,
    },
    {
      id: 'akara-half',
      name: 'Half Portion Akara',
      category: 'Akara',
      desc: '6 pieces of golden brown Akara, perfect for a light breakfast.',
      price: 1000,
      rating: 4.9,
      image: '🥣',
      badge: 'Popular',
      available: true,
    },
    {
      id: 'akara-full',
      name: 'Full Portion Akara',
      category: 'Akara',
      desc: '12 pieces of fresh fluffy Akara served hot with standard dip.',
      price: 1800,
      rating: 5.0,
      image: '🥣',
      badge: 'Best Seller',
      available: true,
    },
    {
      id: 'awara-fried',
      name: 'Fried Awara',
      category: 'Awara',
      desc: 'Freshly curded local soy cakes fried to golden precision.',
      price: 600,
      rating: 4.6,
      image: '🧀',
      available: true,
    },
    {
      id: 'awara-pepper',
      name: 'Pepper Awara',
      category: 'Awara',
      desc: 'Deep fried Awara tossed in hot local scotch bonnet spices and onion rings.',
      price: 900,
      rating: 4.8,
      image: '🌶️',
      badge: 'Hot',
      available: true,
    },
    {
      id: 'maize-roasted',
      name: 'Charcoal Roasted Maize',
      category: 'Maize',
      desc: 'Sweet local yellow corn roasted over fresh glowing charcoal embers.',
      price: 400,
      rating: 4.7,
      image: '🌽',
      available: true,
    },
    {
      id: 'maize-boiled',
      name: 'Boiled Maize',
      category: 'Maize',
      desc: 'Fresh farm maize boiled with a light pinch of sea salt.',
      price: 350,
      rating: 4.5,
      image: '🌽',
      available: true,
    },
    {
      id: 'popcorn-sweet',
      name: 'Sweet Popcorn',
      category: 'Popcorn',
      desc: 'Light, crunchy gourmet popcorn glazed with golden syrup.',
      price: 500,
      rating: 4.7,
      image: '🍿',
      available: true,
    },
    {
      id: 'popcorn-salted',
      name: 'Salted Butter Popcorn',
      category: 'Popcorn',
      desc: 'Classic buttery corn popped fresh with a dust of fine salt.',
      price: 450,
      rating: 4.6,
      image: '🍿',
      available: true,
    },
    {
      id: 'popcorn-caramel',
      name: 'Gourmet Caramel Popcorn',
      category: 'Popcorn',
      desc: 'Rich, melt-in-your-mouth double glazed sweet caramel popcorn.',
      price: 750,
      rating: 4.9,
      image: '🍿',
      badge: 'Best Seller',
      available: true,
    },
    {
      id: 'zobo-cold',
      name: 'Cold Homemade Zobo',
      category: 'Drinks',
      desc: 'Chilled natural hibiscus tea brewed with ginger, cloves, and pineapple juice.',
      price: 800,
      rating: 4.9,
      image: '🧃',
      badge: 'Best Seller',
      available: true,
    },
    {
      id: 'soft-drinks',
      name: 'Assorted Soft Drinks',
      category: 'Drinks',
      desc: 'Chilled canned Coca-Cola, Fanta, Sprite, or Malt.',
      price: 500,
      rating: 4.4,
      image: '🥤',
      available: true,
    },
  ]);

  // Loading animation state
  const [loading, setLoading] = useState(true);

  // Cart operations
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesOnly, setIsFavoritesOnly] = useState(false);

  // Admin Dashboard Mode
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Run initial logo animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Callback to allow Admin CRM to update price & availability
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const activeProducts = isFavoritesOnly
    ? products.filter((p) => favorites.includes(p.id))
    : products;

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-[#0D1F14] z-[9999] flex flex-col items-center justify-center text-center space-y-6"
          >
            {/* Logo grows from tiny seed to full tree outline */}
            <motion.div
              initial={{ scale: 0.2, rotate: -45, opacity: 0 }}
              animate={{ scale: [0.2, 1.2, 1], rotate: 0, opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="text-8xl select-none filter drop-shadow-[0_0_20px_rgba(216,190,122,0.4)]"
            >
              🌲
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className="font-playfair font-bold text-3xl tracking-widest text-[#F7F4EB]">
                UnderTree
              </h1>
              <p className="text-xs font-semibold text-[#8FA93D] tracking-wider uppercase">
                Freshly Roasted. Served with Love.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-grow flex flex-col justify-between"
          >
            {/* Global floating leaves background */}
            <LeafParticles />

            {/* Navbar */}
            <Navbar
              cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              onOpenCart={() => setIsCartOpen(true)}
              favoritesCount={favorites.length}
              onOpenFavorites={() => setIsFavoritesOnly(!isFavoritesOnly)}
              onOpenAdmin={() => setIsAdminOpen(!isAdminOpen)}
              isAdmin={isAdminOpen}
            />

            {/* Main Page Layout */}
            <main className="w-full">
              {/* Admin Panel Toggle Overlay */}
              <AnimatePresence>
                {isAdminOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative z-40 bg-black/30 backdrop-blur-md pt-20"
                  >
                    <AdminDashboard
                      products={products}
                      onUpdateProduct={handleUpdateProduct}
                      onAddProduct={handleAddProduct}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Home / Hero */}
              <Hero />

              {/* About section */}
              <About />

              {/* Why Choose Us */}
              <WhyChooseUs />

              {/* Menu Catalog */}
              <div className="border-t border-white/5 bg-black/10">
                <MenuCatalog
                  products={activeProducts}
                  onAddToCart={handleAddToCart}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>

              {/* Price List Table */}
              <PriceList products={products} onAddToCart={handleAddToCart} />

              {/* Preparation hub simulator */}
              <div className="border-t border-white/5 bg-black/10">
                <Playground />
              </div>

              {/* Testimonials */}
              <Testimonials />

              {/* Team squad */}
              <Team />

              {/* Contact section */}
              <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Sidebar Shopping Cart Drawer */}
            <ShoppingCart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
