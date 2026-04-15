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
      color: 'from-cannabis-light/10 to-transparent hover:from-cannabis-light/30',
      glow: 'group-hover:shadow-[0_0_40px_rgba(163,230,53,0.3)]',
      borderColor: 'group-hover:border-cannabis-light/50'
    },
    {
      name: 'THE PLUG',
      role: 'Head of Eco-Sourcing',
      bio: 'Master of the global supply chain. Ensures every seed and filament is 100% sustainable.',
      icon: <Globe className="text-money-gold" />,
      color: 'from-money-gold/10 to-transparent hover:from-money-gold/30',
      glow: 'group-hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]',
      borderColor: 'group-hover:border-money-gold/50'
    },
    {
      name: 'NEURAL DEV',
      role: 'AI & Robotics Lead',
      bio: 'The brain behind the Ganja Guru. Specializes in neural-sync automation and 3DPoD logic.',
      icon: <Zap className="text-curiosity-purple" />,
      color: 'from-curiosity-purple/10 to-transparent hover:from-curiosity-purple/30',
      glow: 'group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]',
      borderColor: 'group-hover:border-curiosity-purple/50'
    }
  ];

  const ecoFeatures = [
    {
      title: 'Biodegradable Filament',
      desc: 'Our 3DPoD systems use 100% hemp-based, biodegradable filaments, eliminating plastic waste in the grow room.',
      icon: <Recycle size={28} />
    },
    {
      title: 'Zero-Waste Manufacturing',
      desc: 'By printing on demand, we eliminate overproduction and inventory waste. We only build what you need.',
      icon: <Box size={28} />
    },
    {
      title: 'Sustainable Sourcing',
      desc: 'Every genetic strain and material is verified through our Eco-Purity protocol for minimal carbon footprint.',
      icon: <Leaf size={28} />
    },
    {
      title: 'Energy Optimization',
      desc: 'Our AI Consultant optimizes your grow room energy consumption, reducing your grid impact by up to 40%.',
      icon: <Zap size={28} />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  return (
    <div className="w-full space-y-32 py-12 relative">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cannabis-light/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-money-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.02, translateY: -5 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="p-10 glass-morphism rounded-[40px] border border-white/10 relative overflow-hidden group hover:border-cannabis-light/40 hover:shadow-[0_0_50px_rgba(163,230,53,0.15)] transition-all duration-500"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cannabis-light/10 rounded-full blur-[60px] group-hover:bg-cannabis-light/20 transition-colors duration-700" />
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity duration-500 text-cannabis-light"
          >
            <Globe size={160} />
          </motion.div>
          <h3 className="text-4xl font-display font-black text-cannabis-light mb-6 uppercase tracking-tighter relative z-10 drop-shadow-lg">Our Vision</h3>
          <p className="text-xl font-jazzy italic text-white/90 leading-relaxed relative z-10">
            "To be the global switchboard for all things cannabis, bridging the gap between digital innovation and physical cultivation through a seamless, high-frequency grid."
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.02, translateY: -5 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="p-10 glass-morphism rounded-[40px] border border-white/10 relative overflow-hidden group hover:border-money-gold/40 hover:shadow-[0_0_50px_rgba(251,191,36,0.15)] transition-all duration-500"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-money-gold/10 rounded-full blur-[60px] group-hover:bg-money-gold/20 transition-colors duration-700" />
          <motion.div 
            animate={{ y: [-10, 10, -10] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity duration-500 text-money-gold"
          >
            <ShieldCheck size={160} />
          </motion.div>
          <h3 className="text-4xl font-display font-black text-money-gold mb-6 uppercase tracking-tighter relative z-10 drop-shadow-lg">Our Mission</h3>
          <p className="text-xl font-jazzy italic text-white/90 leading-relaxed relative z-10">
            "To empower the global community with sustainable, automated, and AI-driven tools that ensure every harvest is a masterpiece of eco-purity and technological precision."
          </p>
        </motion.div>
      </div>

      {/* Eco-Friendly Deep Dive */}
      <div className="space-y-16 relative z-10">
        <div className="text-center space-y-4">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50"
          >
            Sustainable by Design
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cannabis-light font-mono text-sm uppercase tracking-widest"
          >
            The Socket's Commitment to the Planet
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ecoFeatures.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="p-8 glass-morphism rounded-3xl border border-white/10 hover:border-cannabis-light/50 hover:bg-white/[0.03] transition-all duration-300 group text-left relative overflow-hidden shadow-lg hover:shadow-[0_10px_40px_rgba(163,230,53,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cannabis-light/0 to-cannabis-light/0 group-hover:from-cannabis-light/5 group-hover:to-transparent transition-colors duration-500" />
              <div className="w-14 h-14 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center text-cannabis-light mb-6 group-hover:scale-110 group-hover:bg-cannabis-light/20 group-hover:border-cannabis-light/50 transition-all duration-300 relative z-10 shadow-inner">
                {feature.icon}
              </div>
              <h4 className="font-display font-bold text-xl mb-3 uppercase text-white group-hover:text-cannabis-light transition-colors relative z-10">{feature.title}</h4>
              <p className="text-sm text-white/70 leading-relaxed relative z-10 group-hover:text-white/90 transition-colors">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* The Team */}
      <div className="space-y-16 relative z-10">
        <div className="text-center space-y-4">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50"
          >
            The Council
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-money-gold font-mono text-sm uppercase tracking-widest"
          >
            The Hackers and Growers Behind the Grid
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group h-full"
            >
              <div className={cn(
                "p-8 glass-morphism rounded-[40px] border border-white/10 h-full flex flex-col items-center text-center space-y-6 transition-all duration-500 bg-gradient-to-b relative overflow-hidden",
                member.color,
                member.borderColor,
                member.glow
              )}>
                {/* Animated background pulse for avatars */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" />
                
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  className="w-28 h-28 rounded-full bg-black/50 border-2 border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/40 transition-all duration-500 shadow-2xl relative z-10 backdrop-blur-md"
                >
                  {React.cloneElement(member.icon as React.ReactElement<any>, { size: 56, className: cn((member.icon as React.ReactElement<any>).props.className, "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]") })}
                </motion.div>
                
                <div className="relative z-10">
                  <h4 className="text-2xl font-display font-black text-white uppercase tracking-tight group-hover:text-white drop-shadow-md">{member.name}</h4>
                  <p className="text-xs font-mono text-white/50 uppercase tracking-widest mt-2 bg-black/30 inline-block px-3 py-1 rounded-full border border-white/5">{member.role}</p>
                </div>
                
                <p className="text-sm text-white/70 leading-relaxed italic relative z-10 flex-grow">
                  "{member.bio}"
                </p>
                
                <div className="pt-4 flex gap-4 relative z-10">
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 cursor-pointer transition-all shadow-lg">
                    <Users size={18} className="text-white/60 group-hover:text-white transition-colors" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, rotate: -5 }} className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 cursor-pointer transition-all shadow-lg">
                    <Heart size={18} className="text-white/60 group-hover:text-white transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Final Call to Action */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.5 }}
        className="p-12 glass-morphism rounded-[50px] border-2 border-dashed border-white/20 hover:border-money-gold/50 text-center space-y-8 relative overflow-hidden group transition-colors duration-500 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-money-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        
        <h4 className="text-3xl md:text-4xl font-jazzy italic text-money-gold drop-shadow-[0_0_20px_rgba(251,191,36,0.3)] relative z-10">
          "We didn't just build a website. We built a grid."
        </h4>
        <p className="max-w-3xl mx-auto text-lg text-white/70 leading-relaxed relative z-10">
          The Socket is a collective of visionaries who believe the street deserves better tech. We are committed to open-source innovation, sustainable growth, and pushing the boundaries of what's possible in the digital canopy.
        </p>
      </motion.div>
    </div>
  );
}
