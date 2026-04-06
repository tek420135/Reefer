import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function BookingSystem() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const times = ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:20 PM', '06:00 PM'];

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      setIsBooked(true);
      setTimeout(() => setIsBooked(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-morphism rounded-[40px] border border-white/10 overflow-hidden flex flex-col md:flex-row">
      {/* Calendar Side */}
      <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-white/10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-display font-bold flex items-center gap-2">
            <CalendarIcon className="text-money-gold" /> APRIL 2026
          </h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/5 rounded-lg"><ChevronLeft size={16} /></button>
            <button className="p-2 hover:bg-white/5 rounded-lg"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={`day-${i}`} className="text-center text-[10px] font-mono text-white/30 mb-2">{d}</div>
          ))}
          {days.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={cn(
                "aspect-square flex items-center justify-center rounded-xl text-sm transition-all",
                selectedDate === d 
                  ? "bg-money-gold text-money-green font-bold scale-110 shadow-lg" 
                  : "hover:bg-white/5 text-white/70"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Time Side */}
      <div className="w-full md:w-80 p-8 bg-black/20 flex flex-col">
        <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-2">
          <Clock className="text-cannabis-light" /> SELECT TIME
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {times.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={cn(
                "py-3 px-2 rounded-xl text-[10px] font-mono border transition-all",
                selectedTime === t 
                  ? "bg-cannabis-light border-cannabis-light text-cannabis-dark font-bold" 
                  : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-mono text-white/40 uppercase mb-1">CONSULTATION WITH</p>
            <p className="text-sm font-bold text-money-gold">THE PLUG (SENIOR GURU)</p>
          </div>
          
          <button
            onClick={handleBook}
            disabled={!selectedDate || !selectedTime}
            className={cn(
              "w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2",
              isBooked 
                ? "bg-green-500 text-white" 
                : "bg-money-gold text-money-green hover:scale-105 shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
            )}
          >
            {isBooked ? <><CheckCircle2 size={20} /> BOOKED!</> : 'SECURE THE SLOT'}
          </button>
        </div>
      </div>
    </div>
  );
}
