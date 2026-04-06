import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Zap, Star, Loader2, Leaf, Globe, ShieldCheck, Maximize2, Search, Filter, ArrowUpDown, Tag, Info, Sparkles, X, Plus, Minus, Trash2, ShoppingBag, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loadStripe } from '@stripe/stripe-js';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSocketContext } from '../context/SocketContext';
import { cn } from '@/src/lib/utils';
import { AnimatePresence } from 'motion/react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const categories = ['ALL', 'GENETICS', 'HARDWARE', 'DIGITAL', 'VIBE', 'APPAREL', 'NUTRIENTS'];

const products = [
  { id: 1, name: 'NEURAL SEED v1', price: '4.20', category: 'GENETICS', image: 'https://picsum.photos/seed/seed1/400/400', eco: true, sourcing: 'Global Seed Vault', description: 'Self-optimizing neural genetics for high-yield digital growth.', options: ['Auto-Flower', 'Feminized', 'Regular'], trending: true },
  { id: 2, name: 'GRAVITY BONG 3000', price: '42.00', category: 'HARDWARE', image: 'https://picsum.photos/seed/bong1/400/400', eco: true, sourcing: 'Recycled Glass Engine', description: 'Zero-G filtration system with haptic feedback sensors.', options: ['Clear', 'Neon', 'Stealth'], trending: false },
  { id: 3, name: 'HEMP BLUEPRINT', price: '0.42', category: 'DIGITAL', image: 'https://picsum.photos/seed/print1/400/400', eco: true, sourcing: 'Open-Source Hemp', description: '3D printable blueprints for eco-friendly grow structures.', options: ['Standard', 'Enterprise'], trending: false },
  { id: 4, name: 'GURU ESSENCE', price: '14.20', category: 'VIBE', image: 'https://picsum.photos/seed/vibe1/400/400', eco: true, sourcing: 'Pure Vibration', description: 'Aromatic digital frequency for deep meditation sessions.', options: ['Calm', 'Focus', 'Euphoria'], trending: true },
  { id: 5, name: 'SOCKET HOODIE', price: '24.20', category: 'APPAREL', image: 'https://picsum.photos/seed/hoodie1/400/400', eco: true, sourcing: 'Organic Hemp Cotton', description: 'Smart-fabric hoodie with integrated neural-link pockets.', options: ['S', 'M', 'L', 'XL'], trending: false },
  { id: 6, name: 'NANO-NUTRIENT PACK', price: '8.42', category: 'NUTRIENTS', image: 'https://picsum.photos/seed/nute1/400/400', eco: true, sourcing: 'Algae Bio-Reactor', description: 'Time-release nano-particles for optimal nutrient absorption.', options: ['Veg', 'Bloom', 'Boost'], trending: true },
  { id: 7, name: 'CYBER-TRIMMER v2', price: '18.20', category: 'HARDWARE', image: 'https://picsum.photos/seed/trim1/400/400', eco: true, sourcing: 'Precision Labs', description: 'Laser-guided trimming tool for perfect harvest aesthetics.', options: ['Standard', 'Pro'], trending: false },
  { id: 8, name: 'VIRTUAL TERPENES', price: '2.20', category: 'DIGITAL', image: 'https://picsum.photos/seed/terp1/400/400', eco: true, sourcing: 'Data Distillation', description: 'Digital scent profile for VR grow-room immersion.', options: ['Limonene', 'Myrcene', 'Pinene'], trending: false },
];

export default function Marketplace() {
  const [loading, setLoading] = useState<number | null>(null);
  const { notify, triggerShake, addXp } = useSocketContext();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState<'price' | 'name'>('name');
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const filteredProducts = products
    .filter(p => selectedCategory === 'ALL' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return Number(a.price) - Number(b.price);
      return a.name.localeCompare(b.name);
    });

  const addToCart = (product: any) => {
    const option = selectedOptions[product.id] || product.options[0];
    const cartItem = { ...product, selectedOption: option, cartId: `${product.id}-${option}` };
    
    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartItem.cartId);
      if (existing) {
        return prev.map(item => item.cartId === cartItem.cartId ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...cartItem, quantity: 1 }];
    });
    
    notify(`ADDED TO CART: ${product.name} (${option})`);
    triggerShake(2);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Check for success/cancel parameters in URL
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#a3e635', '#fbbf24', '#7c3aed']
      });
      setCart([]);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(999); // Global loading for checkout
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.map(item => ({
          ...item,
          name: `${item.name} (${item.selectedOption})`,
          price: item.price
        })) }),
      });

      const session = await response.json();
      if (session.error) throw new Error(session.error);

      // Log order attempt to Firestore if user is logged in
      if (auth.currentUser) {
        try {
          await addDoc(collection(db, 'users', auth.currentUser.uid, 'orders'), {
            uid: auth.currentUser.uid,
            items: cart.map(item => ({
              productId: String(item.id),
              productName: item.name,
              option: item.selectedOption,
              price: Number(item.price),
              quantity: item.quantity
            })),
            total: cartTotal,
            status: session.mock ? 'completed (demo)' : 'pending',
            createdAt: serverTimestamp(),
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `users/${auth.currentUser.uid}/orders`);
        }
      }

      // Handle mock checkout
      if (session.mock) {
        notify(`DEMO MODE: CART SECURED`);
        triggerShake(10);
        addXp(200);
        window.location.href = session.url;
        return;
      }

      // Redirect to Stripe
      const result = await (stripe as any).redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error: any) {
      console.error('Checkout Error:', error.message);
      alert('Checkout failed: ' + error.message);
    } finally {
      setLoading(null);
    }
  };

  const handleBuy = async (product: typeof products[0]) => {
    const option = selectedOptions[product.id] || product.options[0];
    const itemToBuy = { ...product, selectedOption: option, quantity: 1 };
    
    setLoading(product.id);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{
          ...itemToBuy,
          name: `${itemToBuy.name} (${itemToBuy.selectedOption})`
        }] }),
      });

      const session = await response.json();
      if (session.error) throw new Error(session.error);

      // Log order attempt to Firestore if user is logged in
      if (auth.currentUser) {
        try {
          await addDoc(collection(db, 'users', auth.currentUser.uid, 'orders'), {
            uid: auth.currentUser.uid,
            productId: String(product.id),
            productName: `${product.name} (${option})`,
            price: Number(product.price),
            status: session.mock ? 'completed (demo)' : 'pending',
            createdAt: serverTimestamp(),
            eco: product.eco,
            sourcing: product.sourcing
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `users/${auth.currentUser.uid}/orders`);
        }
      }

      // Handle mock checkout
      if (session.mock) {
        notify(`DEMO MODE: ${product.name} SECURED`);
        triggerShake(10);
        addXp(100);
        window.location.href = session.url;
        return;
      }

      // Redirect to Stripe
      const result = await (stripe as any).redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error: any) {
      console.error('Checkout Error:', error.message);
      alert('Checkout failed: ' + error.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 relative">
      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-40 p-4 bg-cannabis-light text-cannabis-dark rounded-full shadow-[0_0_30px_rgba(163,230,53,0.5)] hover:scale-110 transition-all group"
      >
        <ShoppingBag size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-money-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-cannabis-dark">
            {cart.reduce((s, i) => s + i.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cannabis-dark border-l border-white/10 z-[60] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-display font-bold text-cannabis-light flex items-center gap-2">
                  <ShoppingBag /> THE CART
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <ShoppingBag size={64} />
                    <p className="font-mono text-sm uppercase tracking-widest">Your cart is empty, fam.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.cartId} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 group">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-bold text-sm uppercase">{item.name}</h4>
                        <p className="text-[10px] font-mono text-white/40 uppercase">{item.selectedOption}</p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.cartId, -1)} className="p-1 hover:text-cannabis-light"><Minus size={12} /></button>
                            <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartId, 1)} className="p-1 hover:text-cannabis-light"><Plus size={12} /></button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-money-gold">{(Number(item.price) * item.quantity).toFixed(2)} SEEDS</span>
                            <button onClick={() => removeFromCart(item.cartId)} className="text-white/20 hover:text-red-500 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-white/40 uppercase">Total Energy</span>
                  <span className="text-2xl font-display font-bold text-money-gold">{cartTotal.toFixed(2)} SEEDS</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || loading !== null}
                  className="w-full py-4 bg-cannabis-light text-cannabis-dark rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading === 999 ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
                  PLUG IN THE GRID
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-cannabis-dark rounded-[40px] border border-white/10 z-[80] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6 px-3 py-1 bg-black/60 backdrop-blur-md rounded-xl text-[10px] font-mono text-cannabis-light border border-cannabis-light/30 uppercase tracking-widest">
                  {selectedProduct.category}
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2 uppercase">{selectedProduct.name}</h3>
                    <p className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <Globe size={12} /> {selectedProduct.sourcing}
                    </p>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X />
                  </button>
                </div>

                <p className="text-sm text-white/60 leading-relaxed font-sans">
                  {selectedProduct.description}
                </p>

                <div className="space-y-4">
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Configuration Options</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.options.map((opt: string) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [selectedProduct.id]: opt }))}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-mono border transition-all",
                          (selectedOptions[selectedProduct.id] || selectedProduct.options[0]) === opt
                            ? "bg-cannabis-light text-cannabis-dark border-cannabis-light"
                            : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Energy Cost</p>
                    <p className="text-3xl font-display font-bold text-money-gold">{selectedProduct.price} SEEDS</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        notify(`AR TRY-ON: ${selectedProduct.name}`);
                        setSelectedProduct(null);
                        document.getElementById('design-studio')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="p-4 bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                      title="Try in AR"
                    >
                      <Camera size={20} />
                      <span className="text-[10px] font-mono uppercase">AR Try-on</span>
                    </button>
                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="p-4 bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <Plus />
                    </button>
                    <button
                      onClick={() => handleBuy(selectedProduct)}
                      className="px-8 py-4 bg-cannabis-light text-cannabis-dark rounded-2xl font-bold uppercase tracking-widest hover:scale-105 transition-all"
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Eco-Sourcing Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 glass-morphism rounded-[40px] border border-cannabis-light/20 bg-cannabis-light/5 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-cannabis-light/20 rounded-2xl flex items-center justify-center">
            <Globe size={32} className="text-cannabis-light animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold">AUTOMATED ECO-SOURCING</h3>
            <p className="text-sm text-white/40 font-mono">100% BIODEGRADABLE. ZERO WASTE. GLOBAL REACH.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
            <ShieldCheck size={16} className="text-money-gold" />
            <span className="text-xs font-mono">CERTIFIED GENETICS</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
            <Leaf size={16} className="text-cannabis-light" />
            <span className="text-xs font-mono">ECO-PACKAGING</span>
          </div>
        </div>
      </motion.div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-all border",
                selectedCategory === cat 
                  ? "bg-cannabis-light text-cannabis-dark border-cannabis-light shadow-[0_0_15px_rgba(163,230,53,0.3)]" 
                  : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input
              type="text"
              placeholder="SEARCH THE GRID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-mono focus:outline-none focus:border-cannabis-light transition-all"
            />
          </div>
          <button
            onClick={() => setSortBy(sortBy === 'name' ? 'price' : 'name')}
            className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white transition-all flex items-center gap-2"
          >
            <ArrowUpDown size={16} />
            <span className="text-[10px] font-mono uppercase">{sortBy}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            className="glass-morphism rounded-3xl border border-white/10 overflow-hidden group flex flex-col relative"
          >
            {/* Product Badge */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[8px] font-mono text-cannabis-light border border-cannabis-light/30 uppercase tracking-widest">
                {product.category}
              </div>
              {product.eco && (
                <div className="w-8 h-8 flex items-center justify-center bg-cannabis-light/20 backdrop-blur-md rounded-lg border border-cannabis-light/30 text-cannabis-light">
                  <Leaf size={14} />
                </div>
              )}
            </div>

            <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        notify(`VISUALIZING: ${product.name}`);
                        document.getElementById('design-studio')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-cannabis-light hover:text-cannabis-dark transition-all"
                      title="Try in AR"
                    >
                      <Camera size={14} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        notify(`ZOOMING: ${product.name}`);
                        setSelectedProduct(product);
                      }}
                      className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-money-gold hover:text-black transition-all"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
                  <div className="text-[10px] font-mono text-money-gold font-bold">
                    {product.price} SEEDS
                  </div>
                </div>
              </div>

              {product.trending && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-money-gold text-black rounded-lg text-[8px] font-mono font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <Sparkles size={10} /> TRENDING
                </div>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col space-y-4">
              <div className="cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <h4 className="font-display font-bold text-lg mb-1 group-hover:text-cannabis-light transition-colors uppercase tracking-tight">
                  {product.name}
                </h4>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Globe size={10} /> {product.sourcing}
                </p>
              </div>

              <p className="text-[10px] text-white/60 leading-relaxed font-sans line-clamp-2">
                {product.description}
              </p>

              {/* Options Selector */}
              <div className="space-y-2">
                <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Select Variant</p>
                <div className="flex flex-wrap gap-1">
                  {product.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSelectedOptions(prev => ({ ...prev, [product.id]: opt }))}
                      className={cn(
                        "px-2 py-1 rounded-md text-[8px] font-mono border transition-all",
                        (selectedOptions[product.id] || product.options[0]) === opt
                          ? "bg-white/20 border-white text-white"
                          : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  disabled={loading !== null || !isOnline}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-50"
                >
                  <Plus size={16} className="group-hover/btn:rotate-90 transition-transform" />
                  <span className="text-[10px] font-mono uppercase">ADD</span>
                </button>
                <button
                  onClick={() => handleBuy(product)}
                  disabled={loading !== null || !isOnline}
                  className="flex-[2] py-3 bg-cannabis-light text-cannabis-dark border border-cannabis-light rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-50 overflow-hidden relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"
                  />
                  {loading === product.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Zap size={16} className="group-hover/btn:scale-110 transition-transform" />
                  )}
                  <span className="relative z-10 text-[10px] font-mono uppercase">
                    {!isOnline ? 'OFFLINE' : (loading === product.id ? 'PLUGGING...' : 'PLUG IN')}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <Info className="mx-auto text-white/20" size={48} />
          <h4 className="text-xl font-display font-bold text-white/40">NO PRODUCTS FOUND IN THIS FREQUENCY</h4>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
            className="text-cannabis-light font-mono text-xs hover:underline"
          >
            RESET FILTERS
          </button>
        </div>
      )}
    </div>
  );
}
