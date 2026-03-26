import React from 'react';
import { User, Settings, Bell, Shield, LogOut, Award, MapPin, Phone } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <div className="p-6 pb-32 space-y-8">
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 bg-olive-100 rounded-[2.5rem] flex items-center justify-center text-olive-600 border-4 border-white shadow-xl">
            <User size={64} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-olive-600 text-white p-2 rounded-2xl shadow-lg">
            <Award size={24} />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-earth-900">Emmanuel Rukundo</h1>
          <p className="text-olive-600 font-bold uppercase tracking-widest text-xs mt-1">Master Farmer • Musanze</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-earth-100 text-center">
          <p className="text-2xl font-bold text-earth-900">12</p>
          <p className="text-xs text-earth-400 font-bold uppercase tracking-wider">Scans Done</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-earth-100 text-center">
          <p className="text-2xl font-bold text-earth-900">4.8</p>
          <p className="text-xs text-earth-400 font-bold uppercase tracking-wider">Yield Score</p>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="font-serif font-bold text-xl px-2">Settings</h3>
        <div className="bg-white rounded-[2.5rem] border border-earth-100 overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 hover:bg-earth-50 transition-colors border-b border-earth-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-olive-50 rounded-xl flex items-center justify-center text-olive-600">
                <Bell size={20} />
              </div>
              <span className="font-bold text-earth-900">Notifications</span>
            </div>
            <div className="w-12 h-6 bg-olive-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </div>
          </button>
          
          <button className="w-full flex items-center justify-between p-5 hover:bg-earth-50 transition-colors border-b border-earth-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-olive-50 rounded-xl flex items-center justify-center text-olive-600">
                <Shield size={20} />
              </div>
              <span className="font-bold text-earth-900">Privacy & Security</span>
            </div>
            <Settings size={20} className="text-earth-300" />
          </button>

          <button className="w-full flex items-center justify-between p-5 hover:bg-earth-50 transition-colors border-b border-earth-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-olive-50 rounded-xl flex items-center justify-center text-olive-600">
                <MapPin size={20} />
              </div>
              <span className="font-bold text-earth-900">Farm Location</span>
            </div>
            <Settings size={20} className="text-earth-300" />
          </button>

          <button className="w-full flex items-center justify-between p-5 hover:bg-earth-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-olive-50 rounded-xl flex items-center justify-center text-olive-600">
                <Phone size={20} />
              </div>
              <span className="font-bold text-earth-900">Support Center</span>
            </div>
            <Settings size={20} className="text-earth-300" />
          </button>
        </div>
      </section>

      <button className="w-full flex items-center justify-center gap-3 py-5 bg-red-50 text-red-600 rounded-[2rem] font-bold transition-all active:scale-95">
        <LogOut size={20} />
        Log Out
      </button>
    </div>
  );
};
