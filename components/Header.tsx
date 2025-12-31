import React from 'react';
import { Box, Bell, FileText, HelpCircle } from 'lucide-react';

const navItems = [
  '首页',
  '数据超市',
  '自助分析',
  '指标平台',
  '数据模型',
  '魔方学院',
  '数据知乎',
  '我的魔方',
  '系统管理'
];

interface HeaderProps {
  currentView?: string;
  setCurrentView?: (view: 'home' | 'indicator-list') => void;
}

export const Header: React.FC<HeaderProps> = ({ setCurrentView }) => {
  return (
    <header className="bg-white h-14 flex items-center justify-between px-4 shadow-sm relative z-20">
      {/* Left: Logo */}
      <div
        className="flex items-center gap-2 min-w-[180px] cursor-pointer"
        onClick={() => setCurrentView?.('home')}
      >
        <div className="bg-blue-500 text-white p-1 rounded">
          <Box size={20} strokeWidth={2.5} />
        </div>
        <span className="font-bold text-lg tracking-tight text-gray-800">数据魔方</span>
      </div>

      {/* Center: Navigation */}
      <nav className="flex-1 flex justify-center h-full">
        <ul className="flex h-full">
          {navItems.map((item) => (
            <li
              key={item}
              className={`
                h-full flex items-center px-4 text-sm cursor-pointer transition-colors relative
                ${item === '指标平台' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-500'}
              `}
              onClick={() => {
                if (item === '指标平台' && setCurrentView) setCurrentView('indicator-list');
                if (item === '首页' && setCurrentView) setCurrentView('home');
              }}
            >
              {item}
              {item === '指标平台' && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600"></div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-5 text-gray-500 min-w-[180px] justify-end">
        <HelpCircle size={18} className="cursor-pointer hover:text-gray-700" />
        <FileText size={18} className="cursor-pointer hover:text-gray-700" />
        <div className="relative cursor-pointer hover:text-gray-700">
          <Bell size={18} />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white">2</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <span>欢迎您，zhanhyi</span>
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-gray-500"></div>
        </div>
      </div>
    </header>
  );
};