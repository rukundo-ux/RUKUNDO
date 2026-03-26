import React from 'react';
import { CloudRain, Thermometer, Calendar, MapPin, Info } from 'lucide-react';
import { MOCK_WEATHER_DATA } from '../lib/mockData';
import { motion } from 'motion/react';

export const ClimateIntelligence: React.FC = () => {
  return (
    <div className="p-6 pb-32 space-y-8">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-serif font-bold text-earth-900">Climate</h1>
          <div className="flex items-center gap-1 text-olive-600 font-medium mt-1">
            <MapPin size={16} />
            <span>Musanze, Rwanda</span>
          </div>
        </div>
        <div className="bg-olive-100 p-3 rounded-2xl">
          <CloudRain className="text-olive-600" size={32} />
        </div>
      </header>

      <section className="bg-olive-600 text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-olive-100 uppercase tracking-widest text-xs font-bold mb-2">Planting Window</p>
          <h2 className="text-3xl font-serif mb-4">Optimal for Maize</h2>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
              <CloudRain size={18} />
              <span className="font-medium">Rainy Season</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
              <Calendar size={18} />
              <span className="font-medium">Next 14 Days</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif font-bold flex items-center gap-2">
          Weekly Forecast
          <Info size={16} className="text-earth-400" />
        </h3>
        <div className="space-y-3">
          {MOCK_WEATHER_DATA.map((w, i) => (
            <motion.div 
              key={w.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded-2xl border border-earth-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-earth-50 rounded-xl flex items-center justify-center text-olive-600">
                  <CloudRain size={24} />
                </div>
                <div>
                  <p className="font-bold">{w.day}</p>
                  <p className="text-xs text-earth-400 uppercase tracking-wider">{w.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{w.temp}°C</p>
                <p className="text-xs text-olive-600 font-medium">{w.rainfall}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-earth-200 p-6 rounded-3xl border border-earth-300">
        <h3 className="font-serif font-bold text-lg mb-3">Agronomist Recommendation</h3>
        <p className="text-earth-700 leading-relaxed">
          The soil moisture levels are currently at 65%. Based on the upcoming rainfall, it is advised to complete planting by Saturday evening to maximize germination.
        </p>
      </section>
    </div>
  );
};
