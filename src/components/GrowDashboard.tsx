import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Thermometer, Droplets, Wind, Zap, Leaf, ShieldCheck, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSocketContext } from '../context/SocketContext';

const data = [
  { time: '00:00', temp: 72, humidity: 45, co2: 800 },
  { time: '04:00', temp: 70, humidity: 48, co2: 850 },
  { time: '08:00', temp: 75, humidity: 42, co2: 1100 },
  { time: '12:00', temp: 82, humidity: 40, co2: 1200 },
  { time: '16:00', temp: 80, humidity: 43, co2: 1150 },
  { time: '20:00', temp: 76, humidity: 46, co2: 900 },
  { time: '23:59', temp: 73, humidity: 47, co2: 820 },
];

export default function GrowDashboard() {
  const { xp, notify } = useSocketContext();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Gamified Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 glass-morphism rounded-[40px] border border-white/10 bg-gradient-to-r from-cannabis-light/5 to-curiosity-purple/5">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-cannabis-light/20 rounded-3xl flex items-center justify-center relative">
            <Leaf size={40} className="text-cannabis-light animate-pulse" />
            <div className="absolute -top-2 -right-2 bg-money-gold text-black text-[10px] font-black px-2 py-1 rounded-lg">
              LVL {Math.floor(xp / 1000)}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-display font-bold">ECO-GRID <span className="text-cannabis-light">SYNC</span></h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-money-gold" />
                <span className="text-[10px] font-mono text-white/40 uppercase">Eco-Score: 98/100</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={14} className="text-curiosity-purple" />
                <span className="text-[10px] font-mono text-white/40 uppercase">Purity: 100%</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => notify('GRID OPTIMIZATION COMPLETE: +50 XP')}
          className="px-6 py-3 bg-white/5 hover:bg-cannabis-light hover:text-cannabis-dark border border-white/10 rounded-2xl font-bold transition-all flex items-center gap-2 group"
        >
          <Zap size={16} className="group-hover:scale-125 transition-transform" />
          OPTIMIZE GRID
        </button>
      </div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'TEMP', value: '78°F', icon: <Thermometer />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
          { label: 'HUMIDITY', value: '42%', icon: <Droplets />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'CO2', value: '1150ppm', icon: <Wind />, color: 'text-cannabis-light', bg: 'bg-cannabis-light/10' },
          { label: 'POWER', value: '1.2kW', icon: <Zap />, color: 'text-money-gold', bg: 'bg-money-gold/10' },
        ].map((stat, i) => (
          <div 
            key={i} 
            className={cn(
              "p-6 glass-morphism rounded-3xl border border-white/10 flex flex-col items-center gap-2",
              stat.bg
            )}
          >            <div className={`${stat.color} mb-2`}>{stat.icon}</div>
            <span className="text-[10px] font-mono opacity-50">{stat.label}</span>
            <span className="text-2xl font-display font-bold">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Main Chart Area */}
      <div className="p-8 glass-morphism rounded-[40px] border border-white/10 bg-black/20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Activity className="text-cannabis-light" />
            <h3 className="text-xl font-display font-bold">GROW CYCLE ANALYTICS</h3>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono">LIVE FEED</span>
            <span className="px-3 py-1 bg-cannabis-light/20 text-cannabis-light rounded-full text-[10px] font-mono">OPTIMAL</span>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="time" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '12px' }}
                itemStyle={{ color: '#a3e635' }}
              />
              <Area type="monotone" dataKey="temp" stroke="#a3e635" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={3} />
              <Area type="monotone" dataKey="humidity" stroke="#fbbf24" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
