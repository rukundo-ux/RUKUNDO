import React from 'react';
import { TrendingUp, TrendingDown, Minus, MapPin, Search } from 'lucide-react';
import { MOCK_MARKET_DATA } from '../lib/mockData';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';

const CHART_DATA = [
  { name: 'Jan', price: 3800 },
  { name: 'Feb', price: 4000 },
  { name: 'Mar', price: 4200 },
  { name: 'Apr', price: 4100 },
  { name: 'May', price: 4300 },
  { name: 'Jun', price: 4500 },
];

export const MarketHub: React.FC = () => {
  return (
    <div className="p-6 pb-32 space-y-8">
      <header>
        <h1 className="text-4xl font-serif font-bold text-earth-900">Market</h1>
        <p className="text-earth-500 font-medium mt-1">Regional commodity trends</p>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" size={20} />
        <input 
          type="text" 
          placeholder="Search crop or market..." 
          className="w-full bg-white border border-earth-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-olive-500 transition-all font-medium"
        />
      </div>

      <section className="bg-white p-6 rounded-[2.5rem] border border-earth-100 shadow-sm">
        <h3 className="font-serif font-bold text-xl mb-6">Maize Price Trend (Nairobi)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
                labelStyle={{ fontWeight: 'bold', color: '#5d473d' }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#78845f" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#78845f', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-earth-50">
          <div>
            <p className="text-xs text-earth-400 uppercase tracking-widest font-bold">Current Price</p>
            <p className="text-2xl font-bold text-earth-900">KSh 4,200</p>
          </div>
          <div className="bg-olive-100 text-olive-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold">
            <TrendingUp size={18} />
            +12%
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif font-bold">Real-time Prices</h3>
        <div className="space-y-3">
          {MOCK_MARKET_DATA.map((item, i) => (
            <motion.div 
              key={item.commodity + item.market}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-5 rounded-2xl border border-earth-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-earth-50 rounded-xl flex items-center justify-center text-olive-600 font-bold text-lg">
                  {item.commodity[0]}
                </div>
                <div>
                  <p className="font-bold text-earth-900">{item.commodity}</p>
                  <div className="flex items-center gap-1 text-xs text-earth-400 font-medium">
                    <MapPin size={12} />
                    {item.market}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-earth-900">{item.price}</p>
                <div className={cn(
                  "flex items-center justify-end gap-1 text-xs font-bold",
                  item.trend === 'up' ? "text-olive-600" : item.trend === 'down' ? "text-red-500" : "text-earth-400"
                )}>
                  {item.trend === 'up' ? <TrendingUp size={14} /> : item.trend === 'down' ? <TrendingDown size={14} /> : <Minus size={14} />}
                  {item.trend.toUpperCase()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
