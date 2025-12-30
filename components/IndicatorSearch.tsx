import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Download, FileSpreadsheet, X } from 'lucide-react';

const TABLE_DATA = [
  { id: 1, l1: '公司金融板块', l2: '对公存款业务', l3: '对公重点贷款', name: 'xxx存款余额', desc: '在我行有养老产业贷款余额...' },
  { id: 2, l1: '公司金融板块', l2: '对公存款业务', l3: '对公重点贷款', name: '对公核心活期存款余额', desc: '在我行有养老产业贷款余额...' },
  { id: 3, l1: '公司金融板块', l2: '对公存款业务', l3: '其他存款', name: '保证金类存款余额', desc: '在我行有绿色贷款余额的客...' },
  { id: 4, l1: '公司金融板块', l2: '对公存款业务', l3: '对公重点贷款', name: '公司纯贷款余额', desc: '在我行有科技型企业贷款余...' },
  { id: 5, l1: '公司金融板块', l2: '对公存款业务', l3: '对公重点贷款', name: '制造业贷款余额', desc: '对公融资有余额的客户数量...' },
  { id: 6, l1: '公司金融板块', l2: '对公存款业务', l3: '业务规模分析', name: '制造业中长期贷款余额', desc: '我行有存款余额且存款日均...' },
  { id: 7, l1: '公司金融板块', l2: '公司金融板块', l3: '业务规模分析', name: '对公存款余额', desc: '对公存款余额大于零、或货...' },
  { id: 8, l1: '公司金融板块', l2: '公司金融综合管理', l3: '业务规模分析', name: '对公存款日均', desc: '我行发放的各项贷款中投向...' },
  { id: 9, l1: '公司金融板块', l2: '公司金融综合管理', l3: '业务规模分析', name: '对公融资总量', desc: '我行发放给养老产业的贷款...' },
  { id: 10, l1: '公司金融板块', l2: '公司金融综合管理', l3: '业务规模分析', name: '科技型企业贷款余额', desc: '我行为支持环境改善、应对...' },
  { id: 11, l1: '公司金融板块', l2: '公司金融综合管理', l3: '业务规模分析', name: '绿色贷款余额', desc: '我行为对公客户提供的全部...' },
  { id: 12, l1: '公司金融板块', l2: '公司金融综合管理', l3: '业务规模分析', name: '养老产业贷款余额', desc: '我行为对公客户提供的全部...' },
  { id: 13, l1: '公司金融板块', l2: '公司金融综合管理', l3: '客户规模分析', name: '全行战略性新兴产业贷款余额', desc: '对公客户每日存款余额的平...' },
  { id: 14, l1: '公司金融板块', l2: '公司金融综合管理', l3: '客户规模分析', name: '对公客户数', desc: '我行吸收的对公客户的存款...' },
  { id: 15, l1: '公司金融板块', l2: '公司金融综合管理', l3: '客户规模分析', name: '对公有效客户数', desc: '我行发放的各项贷款中投向...' },
  { id: 16, l1: '公司金融', l2: '公司金融综合管理', l3: '客户规模分析', name: '对公融资客户数', desc: '我行发放的各项贷款中投向...' },
  { id: 17, l1: '公司金融板块', l2: '公司金融综合管理', l3: '客户规模分析', name: '科技型企业客户数', desc: '我行本币对公活期存款和外...' },
  { id: 18, l1: '公司金融板块', l2: '公司金融综合管理', l3: '客户规模分析', name: '绿色贷款企业客户数', desc: '我行本币对公活期存款和外...' },
  { id: 19, l1: '公司金融板块', l2: '公司金融综合管理', l3: '对公重点贷款', name: '养老产业贷款客户数', desc: '我行本币对公活期存款和外...' },
  { id: 20, l1: '公司金融板块', l2: '公司金融综合管理', l3: '对公重点贷款', name: '养老产业贷款客户数', desc: '在我行有养老产业贷款余额...' },
];

interface IndicatorSearchProps {
  initialSearchTerm?: string;
  onViewDetail?: (name: string) => void;
}

export const IndicatorSearch: React.FC<IndicatorSearchProps> = ({ initialSearchTerm = '', onViewDetail }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filteredData, setFilteredData] = useState(TABLE_DATA);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  // Modal state for download button
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Sync state if prop changes
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  // Filtering Logic
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(TABLE_DATA);
      return;
    }
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = TABLE_DATA.filter(row => 
      row.name.toLowerCase().includes(lowerTerm) || 
      row.l1.toLowerCase().includes(lowerTerm) ||
      row.l2.toLowerCase().includes(lowerTerm) ||
      row.l3.toLowerCase().includes(lowerTerm)
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  // Selection Helpers
  const isAllFilteredSelected = filteredData.length > 0 && filteredData.every(item => selectedIds.has(item.id));
  const isAnyFilteredSelected = filteredData.some(item => selectedIds.has(item.id));
  const isSelectionEmpty = selectedIds.size === 0;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isAnyFilteredSelected && !isAllFilteredSelected;
    }
  }, [isAnyFilteredSelected, isAllFilteredSelected]);

  const handleSelectAll = () => {
    const newSelected = new Set(selectedIds);
    filteredData.forEach(item => newSelected.add(item.id));
    setSelectedIds(newSelected);
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const toggleRowSelection = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleAllVisible = () => {
    if (isAllFilteredSelected) {
      const newSelected = new Set(selectedIds);
      filteredData.forEach(item => newSelected.delete(item.id));
      setSelectedIds(newSelected);
    } else {
      handleSelectAll();
    }
  };

  return (
    <div className="flex-1 bg-white m-3 rounded-lg shadow-sm p-6 flex flex-col h-[calc(100vh-120px)] overflow-hidden relative">
      
      {/* Top Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3">
          <div className="flex rounded border border-gray-200 overflow-hidden">
            <button 
              onClick={handleClearSelection}
              disabled={isSelectionEmpty}
              className={`px-4 py-1.5 text-sm transition-colors border-r border-gray-200
                ${isSelectionEmpty 
                  ? 'bg-gray-50 text-gray-300 cursor-not-allowed' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-red-600'}
              `}
            >
              取消全选
            </button>
            <button 
              onClick={handleSelectAll}
              className="px-4 py-1.5 text-sm text-gray-800 bg-gray-100 font-medium hover:bg-gray-200"
            >
              全选
            </button>
          </div>
          
          <button 
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
          >
            <Download size={14} />
            规范下载
          </button>
        </div>

        <div className="flex gap-2">
          <div className="relative w-80">
             <div className="absolute left-3 top-2.5 text-gray-400">
               <Search size={14} />
             </div>
             <input 
               type="text" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="请输入指标关键词搜索" 
               className="w-full h-9 pl-9 pr-4 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:border-blue-400"
             />
          </div>
          <button 
            className="px-5 py-1.5 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            搜索
          </button>
          <button 
            onClick={() => setSearchTerm('')}
            className="px-5 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            重置
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#eff6ff] text-gray-700 font-medium sticky top-0 z-10">
            <tr>
              <th className="p-3 w-10 border-b border-r border-gray-200 text-center">
                 <input 
                   type="checkbox" 
                   ref={headerCheckboxRef}
                   checked={isAllFilteredSelected}
                   onChange={toggleAllVisible}
                   className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer" 
                 />
              </th>
              <th className="p-3 border-b border-r border-gray-200 w-[12%] text-center">指标一级分类</th>
              <th className="p-3 border-b border-r border-gray-200 w-[12%] text-center">指标二级分类</th>
              <th className="p-3 border-b border-r border-gray-200 w-[12%] text-center">指标三级分类</th>
              <th className="p-3 border-b border-r border-gray-200 w-[15%] text-center">指标中文名称</th>
              <th className="p-3 border-b border-r border-gray-200 w-[35%]">指标描述</th>
              <th className="p-3 border-b border-gray-200 w-[10%] text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index} className={`transition-colors ${selectedIds.has(row.id) ? 'bg-blue-50 hover:bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <td className="p-3 border-b border-r border-gray-200 text-center">
                     <input 
                       type="checkbox" 
                       checked={selectedIds.has(row.id)}
                       onChange={() => toggleRowSelection(row.id)}
                       className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer" 
                     />
                  </td>
                  <td className="p-3 border-b border-r border-gray-200 text-center text-gray-700">{row.l1}</td>
                  <td className="p-3 border-b border-r border-gray-200 text-center text-gray-700">{row.l2}</td>
                  <td className="p-3 border-b border-r border-gray-200 text-center text-gray-700">{row.l3}</td>
                  <td className="p-3 border-b border-r border-gray-200 text-center text-gray-700">
                    <span className="font-medium text-blue-600">{row.name}</span>
                  </td>
                  <td className="p-3 border-b border-r border-gray-200 text-gray-600 truncate max-w-xs" title={row.desc}>
                    {row.desc}
                  </td>
                  <td className="p-3 border-b border-gray-200 text-center">
                    <button 
                      onClick={() => onViewDetail && onViewDetail(row.name)}
                      className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700 text-xs px-2 py-1 rounded hover:bg-blue-50"
                    >
                      <FileText size={14} />
                      <span>规范查看</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400">
                  没有找到与 "{searchTerm}" 相关的指标
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowDownloadModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-lg font-medium text-gray-800 mb-6 text-center">选择下载格式</h3>
            
            <div className="grid grid-cols-2 gap-4">
               <button 
                 className="flex flex-col items-center justify-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                 onClick={() => setShowDownloadModal(false)}
               >
                 <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <FileText size={24} className="text-blue-600" />
                 </div>
                 <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Word 文档</span>
               </button>

               <button 
                 className="flex flex-col items-center justify-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
                 onClick={() => setShowDownloadModal(false)}
               >
                 <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <FileSpreadsheet size={24} className="text-green-600" />
                 </div>
                 <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">Excel 表格</span>
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
