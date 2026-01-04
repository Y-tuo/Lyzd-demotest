import { Bell, FileText, Printer, ChevronDown } from 'lucide-react';

const navItems = [
  '首页',
  '数据超市',
  '自助分析',
  '数据模型',
  '魔方学院',
  '数据知乎',
  '我的魔方',
  '系统管理',
  '指标平台'
];

interface HeaderProps {
  currentView?: string;
  setCurrentView?: (view: 'home' | 'indicator-list') => void;
}

export const Header: React.FC<HeaderProps> = ({ setCurrentView }) => {
  return (
    <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark h-14 flex items-center justify-between px-6 shadow-sm relative z-20">
      {/* Left: Logo */}
      <div
        className="flex items-center gap-2 min-w-[180px] cursor-pointer"
        onClick={() => setCurrentView?.('home')}
      >
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">D</div>
        <span className="font-bold text-lg tracking-tight text-primary">数据魔方</span>
      </div>

      {/* Center: Navigation */}
      <nav className="flex-1 flex justify-center h-full">
        <ul className="flex h-full space-x-6">
          {navItems.map((item) => (
            <li
              key={item}
              className={`
                h-full flex items-center text-sm font-medium cursor-pointer transition-colors border-b-2
                ${item === '指标平台'
                  ? 'text-primary border-primary'
                  : 'text-text-sub-light dark:text-text-sub-dark border-transparent hover:text-primary'}
              `}
              onClick={() => {
                if (item === '指标平台' && setCurrentView) setCurrentView('indicator-list');
                if (item === '首页' && setCurrentView) setCurrentView('home');
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 text-text-sub-light dark:text-text-sub-dark min-w-[180px] justify-end">
        <button className="hover:text-primary transition-colors"><Printer size={20} /></button>
        <button className="hover:text-primary transition-colors"><FileText size={20} /></button>
        <button className="relative hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
        </button>
        <div className="flex items-center gap-2 text-sm pl-4 border-l border-border-light dark:border-border-dark cursor-pointer">
          <span>欢迎您，zhanhyi</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};