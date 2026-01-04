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
    <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-6 py-2 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab, idx) => {
          const isActive = activeTabId === tab.id;
          return (
            <React.Fragment key={tab.id}>
              {idx > 0 && <span className="text-gray-300 dark:text-gray-600">|</span>}
              <button
                onClick={() => onSwitch(tab.id)}
                className={`
                  px-3 py-1.5 rounded text-xs flex items-center font-medium transition-colors group
                  ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-primary border border-blue-100 dark:border-blue-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-text-sub-light dark:text-text-sub-dark'}
                `}
              >
                {tab.id === 'home' && <Home size={14} className="mr-1" />}
                {tab.title}
                {tab.id !== 'home' && (
                  <span
                    onClick={(e) => { e.stopPropagation(); onClose(tab.id, e); }}
                    className={`ml-2 hover:text-red-500 cursor-pointer ${isActive ? '' : 'opacity-0 group-hover:opacity-100'}`}
                  >
                    <X size={12} />
                  </span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex items-center space-x-1">
        <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-400 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-400 transition-colors">
          <ChevronRight size={16} />
        </button>
        <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-400 transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
