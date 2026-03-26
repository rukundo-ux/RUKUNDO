import React from 'react';
import { Cloud, Camera, TrendingUp, User } from 'lucide-react';
import { cn } from '../lib/utils';

export type Tab = 'climate' | 'vision' | 'market' | 'profile';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'climate', icon: Cloud, label: 'Climate' },
    { id: 'vision', icon: Camera, label: 'Scanner' },
    { id: 'market', icon: TrendingUp, label: 'Market' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-earth-200 px-6 py-3 pb-8 flex justify-between items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as Tab)}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            activeTab === tab.id ? "text-olive-600 scale-110" : "text-earth-400"
          )}
        >
          <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
