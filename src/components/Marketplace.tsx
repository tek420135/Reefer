import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Zap, Star, Loader2, Leaf, Globe, ShieldCheck, Maximize2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loadStripe } from '@stripe/stripe-js';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSocketContext } from '../context/SocketContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const products = [
  { id: 1, name: 'NEURAL SEED v1', price: '4.20', category: 'GENETICS', image: 'https://picsum.photos/seed/seed1/400/400', eco: true, sourcing: 'Global Seed Vault' },
  { id: 2, name: 'GRAVITY BONG 3000', price: '42.00', category: 'HARDWARE', image: 'https://picsum.photos/seed/bong1/400/400', eco: true, sourcing: 'Recycled Glass Engine' },
  { id: 3, name: 'HEMP BLUEPRINT', price: '0.42', category: 'DIGITAL', image: 'https://picsum.photos/seed/print1/400/400', eco: true, sourcing: 'Open-Source Hemp' },
  { id: 4, name: 'GURU ESSENCE', price: '14.20', category: 'VIBE', image: 'https://picsum.photos/seed/vibe1/400/400', eco: true, sourcing: 'Pure Vibration' },
];

export default function Marketplace() {
  const [loading, setLoading] = useState<number | null>(null);
  const { notify, triggerShake, addXp } = useSocketContext();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleBuy = async (product: typeof products[0]) => {
    setLoading(product.id);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [product] }),
      });

      const session = await response.json();
      if (session.error) throw new Error(session.error);

      // Log order attempt to Firestore if user is logged in
      if (auth.currentUser) {
        try {
          await addDoc(collection(db, 'users', auth.currentUser.uid, 'orders'), {
            uid: auth.currentUser.uid,
            productId: String(product.id),
            productName: product.name,
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
        console.log('Demo mode: Redirecting to success URL...');
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
    <div className="w-full max-w-6xl mx-auto space-y-12">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -10 }}
            className="glass-morphism rounded-3xl border border-white/10 overflow-hidden group flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[8px] font-mono text-cannabis-light border border-cannabis-light/30">
                {product.category}
              </div>
              <div className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full text-money-gold opacity-0 group-hover:opacity-100 transition-opacity">
                <Star size={14} fill="currentColor" />
              </div>
              {product.eco && (
                <div className="absolute bottom-4 left-4 p-2 bg-cannabis-light/20 backdrop-blur-md rounded-lg border border-cannabis-light/30 text-cannabis-light">
                  <Leaf size={14} />
                </div>
              )}
              <button 
                onClick={() => {
                  notify(`VISUALIZING: ${product.name}`);
                  document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute bottom-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-cannabis-light hover:text-cannabis-dark"
              >
                <Maximize2 size={14} />
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h4 className="font-display font-bold text-lg mb-1 group-hover:text-cannabis-light transition-colors">
                  {product.name}
                </h4>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{product.sourcing}</p>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Zap size={14} className="text-money-gold" />
                <span className="text-sm font-mono text-white/60">{product.price} SEEDS</span>
              </div>

              <button
                onClick={() => handleBuy(product)}
                disabled={loading !== null || !isOnline}
                className="mt-auto w-full py-3 bg-white/5 hover:bg-cannabis-light hover:text-cannabis-dark border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === product.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ShoppingCart size={16} className="group-hover/btn:scale-110 transition-transform" />
                )}
                {!isOnline ? 'OFFLINE' : (loading === product.id ? 'PLUGGING IN...' : 'PLUG IN')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
