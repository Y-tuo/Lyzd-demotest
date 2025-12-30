import React from 'react';
import { Home, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tab } from '../App';

interface SubHeaderProps {
  tabs: Tab[];
  activeTabId: string;
  onSwitch: (id: string) => void;
  onClose: (id: string, e: React.MouseEvent) => void;
}

export const SubHeader: React.FC<SubHeaderProps> = ({ tabs, activeTabId, onSwitch, onClose }) => {
  return (
    <div className="h-10 bg-[#ebf1fa] flex items-center justify-between px-2 border-b border-gray-200/50 shrink-0">
      <div className="flex items-center gap-1 h-full pt-1 overflow-x-auto no-scrollbar scroll-smooth flex-1 max-w-[calc(100vw-360px)]">
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => onSwitch(tab.id)}
              className={`
                group relative h-full flex items-center gap-2 px-4 min-w-[100px] max-w-[200px] rounded-t-lg text-xs cursor-pointer transition-all duration-200 border-t border-l border-r
                ${isActive 
                  ? 'bg-white text-blue-600 shadow-sm border-white' 
                  : 'bg-transparent text-gray-500 border-transparent hover:bg-white/40 hover:text-gray-700'}
              `}
            >
              {tab.id === 'home' && <Home size={13} className={isActive ? 'text-blue-500' : 'text-gray-400'} />}
              <span className="truncate flex-1 select-none font-medium">{tab.title}</span>
              
              {tab.id !== 'home' && (
                <button
                  onClick={(e) => onClose(tab.id, e)}
                  className={`
                    p-0.5 rounded-full transition-colors
                    ${isActive ? 'hover:bg-red-50 hover:text-red-500' : 'opacity-0 group-hover:opacity-100 hover:bg-gray-200'}
                  `}
                >
                  <X size={12} />
                </button>
              )}

              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 rounded-t-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Window Controls - Visual consistency with original UI */}
      <div className="flex items-center gap-2 pr-2 shrink-0">
        <button className="w-7 h-7 bg-white rounded flex items-center justify-center text-gray-400 hover:text-blue-500 shadow-sm border border-gray-100 transition-colors">
            <ChevronLeft size={14} />
        </button>
        <button className="w-7 h-7 bg-white rounded flex items-center justify-center text-gray-400 hover:text-blue-500 shadow-sm border border-gray-100 transition-colors">
            <ChevronRight size={14} />
        </button>
        <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
        <button className="w-7 h-7 bg-white rounded flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm border border-gray-100 transition-colors">
            <X size={14} />
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
