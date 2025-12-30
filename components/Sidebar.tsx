
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, Hash } from 'lucide-react';

interface SidebarProps {
  currentView?: string;
  onChangeView?: (view: any, title?: string) => void;
}

const SPEC_MENU = [
  {
    name: '公司金融板块',
    children: ['对公存款业务', '公司金融综合管理', '普惠金融']
  },
  {
    name: '零售金融板块',
    children: ['个人存款', '个人贷款', '信用卡业务']
  },
  {
    name: '风险管理板块',
    children: ['信用风险', '市场风险']
  }
];

const ATTR_MENU = [
  { name: '产品范围', id: 'product-catalog' },
  { name: '客户范围', id: 'client-scope' },
  { name: '币种范围', id: 'currency-scope' },
  { name: '机构范围', id: 'org-scope' },
  { name: '总账科目范围', id: 'gl-scope' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const [isSpecMenuOpen, setSpecMenuOpen] = useState(true);
  const [expandedSubMenus, setExpandedSubMenus] = useState<Set<string>>(new Set(['公司金融板块']));

  useEffect(() => {
    // If we are in an attribute view, ensure the main spec menu is open
    if (['product-catalog', 'client-scope', 'currency-scope', 'org-scope', 'gl-scope'].includes(currentView || '')) {
      setSpecMenuOpen(true);
      // Auto-expand the "Attribute Values" sub-menu if it's not already
      setExpandedSubMenus(prev => new Set([...prev, '规范属性码值']));
    } else if (currentView === 'indicator-search' || currentView === 'indicator-detail') {
      setSpecMenuOpen(true);
    }
  }, [currentView]);

  const toggleSubMenu = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSubMenus(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="w-64 bg-white m-3 mr-0 rounded-lg shadow-sm flex flex-col h-[calc(100vh-120px)] transition-all duration-300 border border-gray-100">
      <div className="p-4 flex items-center gap-2 border-b border-gray-50">
        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
        <h2 className="font-bold text-gray-800 text-sm">关键决策类指标</h2>
      </div>

      <div className="p-3">
        <div className="relative">
          <input 
            type="text" 
            placeholder="请输入主题关键字" 
            className="w-full text-xs pl-3 pr-8 py-2 border border-gray-200 rounded bg-gray-50 focus:outline-none focus:border-blue-400"
          />
          <button className="absolute right-0 top-0 h-full w-8 flex items-center justify-center bg-blue-500 rounded-r text-white">
            <Search size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <ul>
          <li>
            <div 
              onClick={() => onChangeView?.('home')}
              className={`block px-4 py-2.5 text-sm font-medium border-r-2 cursor-pointer transition-colors
                ${currentView === 'home' ? 'bg-blue-50 text-blue-600 border-blue-500' : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              总览
            </div>
          </li>
          <li>
            <div 
              onClick={() => onChangeView?.('indicator-list')}
              className={`block px-4 py-3 text-sm cursor-pointer border-r-2 transition-colors
                ${currentView === 'indicator-list' ? 'bg-blue-50 text-blue-600 border-blue-500 font-medium' : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              关键指标清单
            </div>
          </li>
          <li>
            <a href="#" className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-r-2 border-transparent">
              关键指标地图
            </a>
          </li>
          
          {/* Level 1: Key Indicator Specifications */}
          <li>
            <div 
              onClick={() => {
                // If it's just opening, we might not want to navigate away from current view unless clicked specifically
                // But for this logic, we keep the original behavior but change the visual style
                if (currentView !== 'indicator-search') onChangeView?.('indicator-search');
                setSpecMenuOpen(!isSpecMenuOpen);
              }}
              className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer border-r-2 transition-colors
                 ${currentView === 'indicator-search' 
                    ? 'bg-blue-50 text-blue-600 border-blue-500 font-medium' // Case 1: Active Page
                    : isSpecMenuOpen 
                        ? 'bg-gray-50 text-gray-900 font-semibold border-transparent' // Case 2: Just Expanded (Folder open)
                        : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900' // Case 3: Default
                 }
              `}
            >
              <span>关键指标规范</span>
              {isSpecMenuOpen ? <ChevronDown size={14} className={currentView === 'indicator-search' ? 'text-blue-500' : 'text-gray-500'} /> : <ChevronRight size={14} />}
            </div>

            {isSpecMenuOpen && (
              <ul className="bg-gray-50/30 pb-2">
                {/* Level 2 items under Specifications */}
                {SPEC_MENU.map(l2 => (
                  <li key={l2.name}>
                    <div 
                      onClick={(e) => toggleSubMenu(l2.name, e)}
                      className="flex items-center gap-2 px-6 py-2.5 text-sm text-gray-600 hover:text-blue-600 cursor-pointer select-none"
                    >
                      {expandedSubMenus.has(l2.name) 
                        ? <ChevronDown size={14} className="text-gray-400" /> 
                        : <ChevronRight size={14} className="text-gray-400" />
                      }
                      <span>{l2.name}</span>
                    </div>

                    {/* Level 3: Industry Sub-menus */}
                    {expandedSubMenus.has(l2.name) && (
                      <ul className="ml-5 border-l border-gray-200">
                        {l2.children.map(l3 => (
                          <li key={l3} className="relative">
                            <div className="flex items-center gap-2 pl-6 py-2 text-sm text-gray-500 hover:text-blue-600 cursor-pointer">
                               <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                               {l3}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}

                {/* Level 2: Standard Attribute Values (Newly moved here) */}
                <li>
                  <div 
                    onClick={(e) => toggleSubMenu('规范属性码值', e)}
                    className={`flex items-center justify-between px-6 py-2.5 text-sm cursor-pointer select-none transition-colors
                      ${expandedSubMenus.has('规范属性码值') ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-blue-600'}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {expandedSubMenus.has('规范属性码值') 
                        ? <ChevronDown size={14} className="text-gray-400" /> 
                        : <ChevronRight size={14} className="text-gray-400" />
                      }
                      <span>规范属性码值</span>
                    </div>
                  </div>

                  {/* Level 3: Attribute details */}
                  {expandedSubMenus.has('规范属性码值') && (
                    <ul className="ml-5 border-l border-gray-200">
                      {ATTR_MENU.map(item => (
                        <li key={item.id}>
                          <div 
                            onClick={() => onChangeView?.(item.id, item.name)}
                            className={`flex items-center gap-2 pl-6 py-2 text-sm cursor-pointer select-none transition-all
                              ${currentView === item.id ? 'text-blue-600 font-bold bg-blue-100/30' : 'text-gray-500 hover:text-blue-600'}
                            `}
                          >
                            <Hash size={13} className={currentView === item.id ? 'text-blue-500' : 'text-gray-300'} />
                            <span>{item.name}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
