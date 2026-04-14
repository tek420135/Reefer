import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Globe, Users, ShieldCheck, Zap, Box, Layers, Heart, Recycle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function AboutUs() {
  const team = [
    {
      name: 'THE ARCHITECT',
      role: 'Lead System Designer',
      bio: 'Visionary behind the Eco-Grid. Expert in spatial computing and sustainable architecture.',
      icon: <Layers className="text-cannabis-light" />,
      color: 'from-cannabis-light/20 to-transparent'
    },
    {
      name: 'THE PLUG',
      role: 'Head of Eco-Sourcing',
      bio: 'Master of the global supply chain. Ensures every seed and filament is 100% sustainable.',
      icon: <Globe className="text-money-gold" />,
      color: 'from-money-gold/20 to-transparent'
    },
    {
      name: 'NEURAL DEV',
      role: 'AI & Robotics Lead',
      bio: 'The brain behind the Ganja Guru. Specializes in neural-sync automation and 3DPoD logic.',
      icon: <Zap className="text-curiosity-purple" />,
      color: 'from-curiosity-purple/20 to-transparent'
    }
  ];

  const ecoFeatures = [
    {
      title: 'Biodegradable Filament',
      desc: 'Our 3DPoD systems use 100% hemp-based, biodegradable filaments, eliminating plastic waste in the grow room.',
      icon: <Recycle size={24} />
    },
    {
      title: 'Zero-Waste Manufacturing',
      desc: 'By printing on demand, we eliminate overproduction and inventory waste. We only build what you need.',
      icon: <Box size={24} />
    },
    {
      title: 'Sustainable Sourcing',
      desc: 'Every genetic strain and material is verified through our Eco-Purity protocol for minimal carbon footprint.',
      icon: <Leaf size={24} />
    },
    {
      title: 'Energy Optimization',
      desc: 'Our AI Consultant optimizes your grow room energy consumption, reducing your grid impact by up to 40%.',
      icon: <Zap size={24} />
    }
  ];

  return (
    <div className="w-full space-y-24 py-12">
      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-10 glass-morphism rounded-[40px] border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Globe size={120} />
          </div>
          <h3 className="text-4xl font-display font-black text-cannabis-light mb-6 uppercase tracking-tighter">Our Vision</h3>
          <p className="text-xl font-jazzy italic text-white/80 leading-relaxed">
            "To be the global switchboard for all things cannabis, bridging the gap between digital innovation and physical cultivation through a seamless, high-frequency grid."
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-10 glass-morphism rounded-[40px] border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck size={120} />
          </div>
          <h3 className="text-4xl font-display font-black text-money-gold mb-6 uppercase tracking-tighter">Our Mission</h3>
          <p className="text-xl font-jazzy italic text-white/80 leading-relaxed">
            "To empower the global community with sustainable, automated, and AI-driven tools that ensure every harvest is a masterpiece of eco-purity and technological precision."
          </p>
        </motion.div>
      </div>

      {/* Eco-Friendly Deep Dive */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-display font-black uppercase tracking-tighter">Sustainable by Design</h3>
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest">The Socket's Commitment to the Planet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecoFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 glass-morphism rounded-3xl border border-white/10 hover:border-cannabis-light transition-all group text-left"
            >
              <div className="w-12 h-12 bg-cannabis-light/10 rounded-2xl flex items-center justify-center text-cannabis-light mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="font-display font-bold text-xl mb-3 uppercase">{feature.title}</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The Team */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-display font-black uppercase tracking-tighter">The Council</h3>
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest">The Hackers and Growers Behind the Grid</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className={cn(
                "p-8 glass-morphism rounded-[40px] border border-white/10 h-full flex flex-col items-center text-center space-y-6 transition-all group-hover:border-white/30 bg-gradient-to-b",
                member.color
              )}>
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  {React.cloneElement(member.icon as React.ReactElement<any>, { size: 48 })}
                </div>
                <div>
                  <h4 className="text-2xl font-display font-black text-white uppercase tracking-tight">{member.name}</h4>
                  <p className="text-xs font-mono text-white/40 uppercase tracking-widest mt-1">{member.role}</p>
                </div>
                <p className="text-sm text-white/60 leading-relaxed italic">
                  "{member.bio}"
                </p>
                <div className="pt-4 flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                    <Users size={16} className="text-white/40" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                    <Heart size={16} className="text-white/40" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final Call to Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="p-12 glass-morphism rounded-[50px] border-2 border-dashed border-white/10 text-center space-y-6"
      >
        <h4 className="text-3xl font-jazzy italic text-money-gold">"We didn't just build a website. We built a grid."</h4>
        <p className="max-w-2xl mx-auto text-white/60">
          The Socket is a collective of visionaries who believe the street deserves better tech. We are committed to open-source innovation and sustainable growth.
        </p>
      </motion.div>
    </div>
  );
}
