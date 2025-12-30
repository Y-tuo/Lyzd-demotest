import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Check } from 'lucide-react';

// --- Type Definitions ---
interface Item {
  id: string;
  name: string;
}

interface Level3 {
  id: string;
  name: string;
  items: Item[];
}

interface Level2 {
  id: string;
  name: string;
  children: Level3[];
}

interface Level1 {
  id: string;
  name: string;
  departments: string[]; // Added for filtering
  children: Level2[];
}

interface IndicatorListProps {
  onViewDetail?: (name: string) => void;
}

// --- Mock Data ---
const INDICATOR_DATA: Level1[] = [
  {
    id: 'l1-1',
    name: '财务管理',
    departments: ['公司金融部', '计划财务部'],
    children: [
      {
        id: 'l2-1',
        name: '财务分析',
        children: [
          {
            id: 'l3-1',
            name: '利差分析',
            items: [
              { id: 'i-1', name: '净息差' },
              { id: 'i-2', name: '存贷利差' },
              { id: 'i-3', name: '净利差' },
            ]
          },
          {
            id: 'l3-2',
            name: '盈利分析',
            items: [
              { id: 'i-4', name: '生息资产收益率' },
              { id: 'i-5', name: '贷款收益率成本比' },
              { id: 'i-6', name: '加权平均净资产收益率' },
              { id: 'i-7', name: '资产收益率' },
              { id: 'i-8', name: '资本收益率' },
              { id: 'i-9', name: '市场化利差' },
              { id: 'i-10', name: '基本每股收益' },
            ]
          }
        ]
      },
      {
        id: 'l2-2',
        name: '成本分析',
        children: [
          {
            id: 'l3-3',
            name: '', // Empty L3
            items: [
              { id: 'i-11', name: '存款付息率' },
              { id: 'i-12', name: '付息负债成本率' },
              { id: 'i-13', name: '对公存款付息率' },
              { id: 'i-14', name: '个人存款付息率' },
            ]
          }
        ]
      },
      {
        id: 'l2-3',
        name: '规模分析',
        children: [
          {
            id: 'l3-4',
            name: '',
            items: [
              { id: 'i-15', name: '存款余额' },
              { id: 'i-16', name: '存款日均' },
              { id: 'i-17', name: '一般性存款余额' },
              { id: 'i-18', name: '贷款余额' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'l1-2',
    name: '损益分析',
    departments: ['零售金融部', '计划财务部'],
    children: [
      {
        id: 'l2-4',
        name: '收入类',
        children: [
          {
            id: 'l3-5',
            name: '',
            items: [
              { id: 'i-19', name: '营业收入' },
              { id: 'i-20', name: '利息收入' },
              { id: 'i-21', name: '中间业务收入' },
              { id: 'i-22', name: '手续费及佣金收入' },
            ]
          }
        ]
      }
    ]
  }
];

// --- MultiSelect Component ---
const MultiSelect = ({
  label,
  options,
  selected,
  onChange,
  placeholder
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-gray-700 font-medium">{label}</label>
      <div className="relative" ref={containerRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-48 h-9 border border-gray-200 rounded px-3 pr-8 bg-gray-50 text-gray-600 focus:outline-none focus:border-blue-400 text-left text-sm flex items-center overflow-hidden whitespace-nowrap"
        >
          {selected.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            <span className="text-gray-800">已选 {selected.length} 项</span>
          )}
          <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto p-1">
            {options.map(option => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm rounded transition-colors"
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selected.includes(option) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                  {selected.includes(option) && <Check size={10} className="text-white" />}
                </div>
                <span className="text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const IndicatorList: React.FC<IndicatorListProps> = ({ onViewDetail }) => {
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  // Derived Options
  const categoryOptions = useMemo(() => Array.from(new Set(INDICATOR_DATA.map(d => d.name))), []);
  const departmentOptions = useMemo(() => {
    const depts = new Set<string>();
    INDICATOR_DATA.forEach(d => d.departments.forEach(dept => depts.add(dept)));
    return Array.from(depts);
  }, []);

  const toggleCollapse = (id: string) => {
    setCollapsedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isCollapsed = (id: string) => collapsedIds.has(id);

  // Filter Data
  const filteredData = useMemo(() => {
    return INDICATOR_DATA.filter(l1 => {
      // Filter by Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(l1.name)) {
        return false;
      }
      // Filter by Department
      if (selectedDepartments.length > 0) {
        const hasDept = l1.departments.some(d => selectedDepartments.includes(d));
        if (!hasDept) return false;
      }
      return true;
    });
  }, [selectedCategories, selectedDepartments]);

  const countL1Items = (l1: Level1) => l1.children.reduce((acc, l2) => acc + countL2Items(l2), 0);
  const countL2Items = (l2: Level2) => l2.children.reduce((acc, l3) => acc + l3.items.length, 0);

  // Generate Table Rows
  const tableRows = useMemo(() => {
    const rows: any[] = [];

    const traverseL1 = (l1: Level1) => {
      if (isCollapsed(l1.id)) {
        rows.push({
          id: `row-${l1.id}`,
          cells: [
            { type: 'l1', content: l1, rowSpan: 1 },
            { type: 'collapsed_summary', count: countL1Items(l1), colSpan: 4 }
          ]
        });
        return;
      }

      const startIndex = rows.length;
      l1.children.forEach(l2 => traverseL2(l2));
      
      // If L1 has no children (filtered out or empty), add a placeholder row
      if (rows.length === startIndex) {
         rows.push({
            id: `row-${l1.id}`,
            cells: [
              { type: 'l1', content: l1, rowSpan: 1 },
              { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }
            ]
         });
      } else {
         // Update rowSpan for the first row of this L1 group
         rows[startIndex].cells.unshift({ type: 'l1', content: l1, rowSpan: rows.length - startIndex });
      }
    };

    const traverseL2 = (l2: Level2) => {
      if (isCollapsed(l2.id)) {
        rows.push({
          id: `row-${l2.id}`,
          cells: [
            { type: 'l2', content: l2, rowSpan: 1 },
            { type: 'collapsed_summary', count: countL2Items(l2), colSpan: 3 }
          ]
        });
        return;
      }

      const startIndex = rows.length;
      l2.children.forEach(l3 => traverseL3(l3));
      
      if (rows.length > startIndex) {
         rows[startIndex].cells.unshift({ type: 'l2', content: l2, rowSpan: rows.length - startIndex });
      }
    };

    const traverseL3 = (l3: Level3) => {
      const startIndex = rows.length;
      l3.items.forEach(item => {
        rows.push({
          id: `row-${item.id}`,
          cells: [
            { type: 'item', content: item }
          ]
        });
      });

      if (rows.length > startIndex) {
        rows[startIndex].cells.unshift({ type: 'l3', content: l3, rowSpan: rows.length - startIndex });
      }
    };

    filteredData.forEach(l1 => traverseL1(l1));

    return rows;
  }, [filteredData, collapsedIds]);

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedDepartments([]);
  };

  return (
    <div className="flex-1 bg-white m-3 rounded-lg shadow-sm p-6 flex flex-col h-[calc(100vh-120px)] overflow-hidden">
      
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-nowrap">
        <MultiSelect 
          label="指标大类筛选" 
          options={categoryOptions} 
          selected={selectedCategories} 
          onChange={setSelectedCategories} 
          placeholder="请选择指标大类"
        />
        <MultiSelect 
          label="业务归属部门筛选" 
          options={departmentOptions} 
          selected={selectedDepartments} 
          onChange={setSelectedDepartments} 
          placeholder="请选择业务归属部门"
        />
        
        <div className="ml-auto flex items-center gap-3">
          <button className="px-6 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors shadow-sm">
            查询
          </button>
          <button 
            onClick={handleReset}
            className="px-6 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded text-sm transition-colors shadow-sm"
          >
            重置
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#eff6ff] text-gray-700 font-medium sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="p-4 border-b border-r border-gray-200 w-[20%] text-center">指标一级分类</th>
              <th className="p-4 border-b border-r border-gray-200 w-[20%] text-center">指标二级分类</th>
              <th className="p-4 border-b border-r border-gray-200 w-[20%] text-center">指标三级分类</th>
              <th className="p-4 border-b border-r border-gray-200 w-[25%]">指标中文名称</th>
              <th className="p-4 border-b border-gray-200 w-[15%] text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.length > 0 ? (
              tableRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.cells.map((cell: any, idx: number) => {
                    if (cell.type === 'l1') {
                      return (
                        <td 
                          key={idx} 
                          rowSpan={cell.rowSpan} 
                          className="p-4 border-b border-r border-gray-200 bg-white align-middle text-center"
                        >
                           <div className="flex items-center justify-center gap-2">
                             <span className="font-medium text-gray-800">{cell.content.name}</span>
                             <button 
                               onClick={() => toggleCollapse(cell.content.id)}
                               className="text-blue-500 hover:text-blue-700 focus:outline-none"
                             >
                                {isCollapsed(cell.content.id) 
                                  ? <div className="bg-blue-100 rounded-full p-0.5"><ChevronRight size={14} /></div> 
                                  : <div className="bg-blue-100 rounded-full p-0.5"><ChevronDown size={14} /></div>
                                }
                             </button>
                           </div>
                        </td>
                      );
                    }
                    if (cell.type === 'l2') {
                      return (
                         <td 
                           key={idx} 
                           rowSpan={cell.rowSpan} 
                           className="p-4 border-b border-r border-gray-200 bg-white align-middle"
                         >
                           <div className="flex items-center gap-2 justify-center">
                             <span className="text-gray-700">{cell.content.name}</span>
                             {cell.content.children.length > 0 && (
                              <button 
                                onClick={() => toggleCollapse(cell.content.id)}
                                className="text-gray-400 hover:text-blue-500 focus:outline-none"
                              >
                                  {isCollapsed(cell.content.id) ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                              </button>
                             )}
                           </div>
                        </td>
                      );
                    }
                    if (cell.type === 'l3') {
                      return ( 
                        <td 
                          key={idx} 
                          rowSpan={cell.rowSpan} 
                          className="p-4 border-b border-r border-gray-200 bg-white align-middle text-center text-gray-600"
                        > 
                          {cell.content.name || '-'} 
                        </td> 
                      );
                    }
                    if (cell.type === 'item') {
                      return (
                        <React.Fragment key={idx}>
                          <td className="p-3 border-b border-r border-gray-200 text-gray-700 text-center">
                            {cell.content.name}
                          </td>
                           <td className="p-3 border-b border-gray-200 text-center">
                            <button 
                              onClick={() => onViewDetail && onViewDetail(cell.content.name)}
                              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700 text-xs px-2 py-1 rounded hover:bg-blue-50"
                            >
                              <FileText size={14} />
                              <span>规范查看</span>
                            </button>
                          </td>
                        </React.Fragment>
                      );
                    }
                    if (cell.type === 'collapsed_summary') {
                      return (
                          <td 
                            key={idx} 
                            colSpan={cell.colSpan} 
                            className="p-4 border-b border-gray-200 bg-gray-50 text-gray-500 text-sm text-center"
                          >
                             <div className="flex items-center justify-center gap-2 py-2">
                                  <div className="h-[1px] w-12 bg-gray-300"></div>
                                  <span>已折叠 <span className="text-blue-600 font-bold mx-1">{cell.count}</span> 条数据</span>
                                  <div className="h-[1px] w-12 bg-gray-300"></div>
                             </div>
                          </td>
                      );
                    }
                    if (cell.type === 'empty') return <td key={idx} className="border-b border-r border-gray-200 bg-gray-50/30"></td>;
                    return null;
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  没有找到符合条件的指标
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
