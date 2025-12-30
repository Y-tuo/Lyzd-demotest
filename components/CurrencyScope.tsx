
import React from 'react';
import { ArrowLeft, Coins, TrendingUp } from 'lucide-react';

export const CurrencyScope: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex-1 bg-white m-3 rounded-lg shadow-sm flex flex-col h-[calc(100vh-120px)] overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
           <Coins className="text-amber-600" size={20} />
           <h2 className="font-bold text-gray-800">币种范围与折算标准</h2>
        </div>
        <button onClick={onBack} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm px-3 py-1.5 border border-gray-200 rounded">
          <ArrowLeft size={14} /> 返回
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-10">
        <div className="max-w-4xl mx-auto space-y-12">
           <div className="grid grid-cols-3 gap-6">
              <div className="p-6 border border-amber-100 bg-amber-50/30 rounded-xl text-center">
                 <div className="text-3xl font-bold text-amber-600 mb-1">01</div>
                 <div className="text-sm font-bold text-gray-800">本币 (CNY)</div>
                 <div className="text-xs text-gray-500 mt-2">默认核算币种</div>
              </div>
              <div className="p-6 border border-blue-100 bg-blue-50/30 rounded-xl text-center">
                 <div className="text-3xl font-bold text-blue-600 mb-1">02</div>
                 <div className="text-sm font-bold text-gray-800">主要外币</div>
                 <div className="text-xs text-gray-500 mt-2">USD, EUR, HKD, JPY</div>
              </div>
              <div className="p-6 border border-gray-100 bg-gray-50 rounded-xl text-center">
                 <div className="text-3xl font-bold text-gray-400 mb-1">03</div>
                 <div className="text-sm font-bold text-gray-800">其他小币种</div>
                 <div className="text-xs text-gray-500 mt-2">按需进行折算</div>
              </div>
           </div>

           <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-500" />
                汇率折算规则 (Reporting Rules)
              </h3>
              <div className="space-y-6 text-sm text-gray-600">
                 <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold">1</div>
                    <div>
                       <div className="font-bold text-gray-800">时点折算</div>
                       <p className="mt-1">统计时点为“时点值”的指标（如存款余额），采用该统计日期外汇管理局发布的期末汇率中间价。</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold">2</div>
                    <div>
                       <div className="font-bold text-gray-800">平均折算</div>
                       <p className="mt-1">统计时点为“均值”的指标（如存款日均），采用该统计期间内每日汇率中间价的算术平均值进行计算。</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold">3</div>
                    <div>
                       <div className="font-bold text-gray-800">汇差处理</div>
                       <p className="mt-1">由汇率波动产生的折算增量需在财务报告中单独进行“汇率差异”标注，不作为经营业绩的内生增长部分。</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
