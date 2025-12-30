
import React from 'react';
import { ArrowLeft, FileSpreadsheet, Search, Filter } from 'lucide-react';

export const GLScope: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex-1 bg-white m-3 rounded-lg shadow-sm flex flex-col h-[calc(100vh-120px)] overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-emerald-50 rounded-xl"><FileSpreadsheet className="text-emerald-600" size={20} /></div>
           <h2 className="font-bold text-gray-800">全行核心总账科目映射范围表</h2>
        </div>
        <button onClick={onBack} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-12 bg-[#fcfcfc]">
         <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-[32px] shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 p-6 border-b border-gray-100 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-800">科目对照表 (Standard GL Codes)</span>
                  <span className="text-[10px] text-gray-400 font-medium">最后同步时间: 2024-05-20 09:00</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="relative">
                   <input type="text" placeholder="搜索科目号或名称..." className="pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-full w-64 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all" />
                   <Search size={14} className="absolute left-4 top-2.5 text-gray-400" />
                 </div>
                 <button className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-blue-500 transition-all"><Filter size={16} /></button>
               </div>
            </div>
            <table className="w-full text-left text-sm">
               <thead className="bg-white text-gray-400 font-bold uppercase tracking-widest text-[9px] border-b border-gray-50">
                  <tr>
                    <th className="px-10 py-5">主科目号</th>
                    <th className="px-10 py-5">指标归属科目中文名称</th>
                    <th className="px-10 py-5">账户性质</th>
                    <th className="px-10 py-5">统计分类组</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 text-gray-700">
                  {[
                    { id: '201101', name: '单位活期存款 - 工业企业', type: '负债', group: '对公核心存款', note: '包含一般结算账户' },
                    { id: '201105', name: '单位活期存款 - 事业单位', type: '负债', group: '对公核心存款', note: '政府职能性存款' },
                    { id: '201201', name: '单位定期存款 - 企业定期', type: '负债', group: '对公定期存款', note: '锁定期限存单' },
                    { id: '201401', name: '单位通知存款', type: '负债', group: '对公活期类', note: '1天/7天通知模式' },
                    { id: '201802', name: '单位协定存款', type: '负债', group: '对公活期类', note: '超限自动转存' },
                    { id: '203101', name: '保证金存款 - 国际信用证', type: '负债', group: '贸易融资保证金', note: '专项用途质押' },
                    { id: '203105', name: '保证金存款 - 银行承兑汇票', type: '负债', group: '票据业务保证金', note: '全额/差额质押' },
                    { id: '211101', name: '离岸单位存款 - 活期', type: '负债', group: '离岸(OSA)统计', note: '非居民主体' },
                    { id: '211201', name: '离岸单位存款 - 定期', type: '负债', group: '离岸(OSA)统计', note: '非居民主体' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/20 transition-all">
                       <td className="px-10 py-6 font-mono text-blue-600 font-bold">{row.id}</td>
                       <td className="px-10 py-6">
                         <div className="font-bold text-gray-800">{row.name}</div>
                         <div className="text-[10px] text-gray-400 mt-1">{row.note}</div>
                       </td>
                       <td className="px-10 py-6"><span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-bold text-gray-500">{row.type}</span></td>
                       <td className="px-10 py-6 text-gray-500 font-medium">{row.group}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
            <div className="bg-gray-50 p-4 text-center text-[10px] text-gray-400 border-t border-gray-100">
               展示前 9 条记录，更多科目映射请联系计划财务部数据核算岗
            </div>
         </div>
      </div>
    </div>
  );
};
