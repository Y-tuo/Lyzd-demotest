import React from 'react';
import { LucideIcon, ArrowUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  bgColor: string; // Tailwind bg class
  iconColor: string; // Tailwind text class for icon
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, count, icon: Icon, bgColor, iconColor }) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 flex items-center justify-between relative overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer`}>
      <div className="relative z-10">
        <h3 className="text-gray-600 text-sm mb-3 font-medium">{title}</h3>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-800">{count}</span>
          <ArrowUp size={16} className="text-gray-400 mb-1.5" />
        </div>
      </div>
      
      <div className={`p-3 rounded-full bg-white/40 ${iconColor}`}>
        <Icon size={32} opacity={0.8} />
      </div>
    </div>
  );
};