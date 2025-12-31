
import React, { useState, useRef, useEffect } from 'react';
import { Database, Building2, Trophy, ArrowUp, Search } from 'lucide-react';
import { MetricCard } from './MetricCard';

const hotTags = ["绿色金融贷款余额", "科技型企业贷款余额", "对公客户数", "贷款余额", "净息差", "存款付息率"];

// Mock data for auto-completion
const ALL_INDICATORS = [
  "xxx存款余额", "对公核心活期存款余额", "保证金类存款余额", "公司纯贷款余额",
  "制造业贷款余额", "制造业中长期贷款余额", "对公存款余额", "对公存款日均",
  "对公融资总量", "科技型企业贷款余额", "绿色贷款余额", "养老产业贷款余额",
  "全行战略性新兴产业贷款余额", "对公客户数", "对公有效客户数", "对公融资客户数",
  "科技型企业客户数", "绿色贷款企业客户数", "养老产业贷款客户数", "指标空间"
];

interface MainContentProps {
  onSearch?: (term: string) => void;
}

export const MainContent: React.FC<MainContentProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [historyTags, setHistoryTags] = useState(["对公客户数", "贷款余额", "净息差"]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter suggestions
  const suggestions = ALL_INDICATORS.filter(item =>
    item.toLowerCase().includes(inputValue.toLowerCase()) && inputValue.trim() !== ''
  ).slice(0, 8);

  const updateHistory = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setHistoryTags(prev => {
      const filtered = prev.filter(t => t !== trimmed);
      return [trimmed, ...filtered].slice(0, 8);
    });
  };

  const handleSearchClick = () => {
    if (inputValue.trim()) {
      updateHistory(inputValue);
      if (onSearch) onSearch(inputValue);
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    updateHistory(suggestion);
    if (onSearch) onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleTagClick = (tag: string) => {
    setInputValue(tag);
    updateHistory(tag);
    if (onSearch) onSearch(tag);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') handleSearchClick();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        handleSearchClick();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase()
            ? <span key={i} className="text-blue-600 font-bold">{part}</span>
            : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  return (
    <div className="flex-1 bg-white m-3 rounded-lg shadow-sm p-8 flex flex-col h-[calc(100vh-120px)] overflow-y-auto">

      {/* Big Search Area */}
      <div className="flex justify-center mb-10 mt-4">
        <div className="w-full max-w-2xl relative" ref={wrapperRef}>
          <div className="relative flex items-center bg-blue-50/30 rounded-full border border-blue-200 p-1 shadow-[0_0_0_4px_rgba(59,130,246,0.1)] transition-all hover:shadow-[0_0_0_6px_rgba(59,130,246,0.15)] focus-within:shadow-[0_0_0_6px_rgba(59,130,246,0.2)] focus-within:border-blue-400">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
                setActiveIndex(-1);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              placeholder="输入指标名称， 点击查询后跳转指标规范页面"
              className="w-full h-12 pl-6 pr-24 bg-transparent rounded-full text-gray-700 placeholder-gray-400 focus:outline-none transition-all text-sm"
            />

            <button
              onClick={handleSearchClick}
              className="absolute right-1 top-1 bottom-1 px-8 bg-[#3b82f6] hover:bg-blue-600 text-white font-medium rounded-full shadow-sm transition-all active:scale-95 flex items-center gap-2"
            >
              搜索
            </button>
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSuggestionClick(item)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`px-6 py-2.5 cursor-pointer flex items-center gap-3 text-gray-600 text-sm transition-colors
                      ${activeIndex === idx ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}
                    `}
                >
                  <Search size={14} className={activeIndex === idx ? 'text-blue-500' : 'text-gray-400'} />
                  <div className="flex-1 truncate">
                    {highlightText(item, inputValue)}
                  </div>
                  {activeIndex === idx && <span className="text-[10px] text-blue-400 bg-blue-100/50 px-1.5 py-0.5 rounded">Enter 选择</span>}
                </div>
              ))}
              <div className="mt-1 pt-1 border-t border-gray-50 px-6 py-2 text-[10px] text-gray-400">
                找到 {suggestions.length} 个匹配项
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tags Section */}
      <div className="mb-12 space-y-4 max-w-6xl mx-auto w-full">
        {/* Hot Search */}
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-1.5 min-w-[80px] pt-1.5">
            <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">热门搜索</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {hotTags.map((tag, i) => (
              <span
                key={i}
                onClick={() => handleTagClick(tag)}
                className="px-4 py-1.5 bg-gray-50 hover:bg-gray-100 text-xs text-gray-600 rounded cursor-pointer transition-colors border border-transparent hover:border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* History Search */}
        {historyTags.length > 0 && (
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-1.5 min-w-[80px] pt-1.5">
              <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">历史搜索</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {historyTags.map((tag, i) => (
                <span
                  key={i}
                  onClick={() => handleTagClick(tag)}
                  className="px-4 py-1.5 bg-gray-50 hover:bg-gray-100 text-xs text-gray-600 rounded cursor-pointer transition-colors border border-transparent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats Header */}
      <div className="flex items-center gap-2 mb-6 max-w-6xl mx-auto w-full">
        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
        <h2 className="text-lg font-medium text-gray-800">目前关键决策类指标总量 <span className="text-2xl font-bold ml-1">136</span></h2>
        <ArrowUp size={20} className="text-gray-500 mt-1" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto w-full">
        <MetricCard
          title="公司金融板块关键指标"
          count={29}
          icon={Database}
          bgColor="bg-blue-50"
          iconColor="text-blue-400"
        />
        <MetricCard
          title="金融市场板块关键指标"
          count={8}
          icon={Building2}
          bgColor="bg-teal-50"
          iconColor="text-teal-400"
        />
        <MetricCard
          title="零售金融板块关键指标"
          count={31}
          icon={Trophy}
          bgColor="bg-amber-50"
          iconColor="text-amber-400"
        />
        <MetricCard
          title="财务管理指标"
          count={33}
          icon={Trophy}
          bgColor="bg-purple-50"
          iconColor="text-purple-400"
        />
      </div>
    </div>
  );
};
