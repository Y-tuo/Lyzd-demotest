
import React from 'react';
import { ArrowLeft, Landmark, GitBranch, MapPin, Layers, Info } from 'lucide-react';

export const OrgScope: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex-1 bg-white m-3 rounded-lg shadow-sm flex flex-col h-[calc(100vh-120px)] overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-purple-50 rounded-xl"><Landmark className="text-purple-600" size={20} /></div>
           <h2 className="font-bold text-gray-800">全行机构层级与统计范围 (Org V2)</h2>
        </div>
        <button onClick={onBack} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-12 bg-[#fcfcfc]">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="grid grid-cols-12 gap-10">
             <div className="col-span-7 space-y-10">
                <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
                   <h3 className="font-bold text-gray-800 mb-8 flex items-center gap-3">
                     <Layers size={20} className="text-blue-500" />
                     机构归集树形结构 (Hierarchy)
                   </h3>
                   <div className="space-y-6 relative ml-4">
                      <div className="absolute left-4 top-4 bottom-4 w-1 bg-gray-50 rounded-full"></div>
                      {[
                        { level: '一级管理机构', name: '总行 (Group Head Office)', desc: '政策中心与最终合并报表主体' },
                        { level: '二级管理机构', name: '省级分行 / 计划单列市分行', desc: '区域业务决策与绩效考核主体' },
                        { level: '三级管理机构', name: '二级分行 (地级市)', desc: '营销组织与日常运营管控' },
                        { level: '基础核算单元', name: '支行网点 (Sub-Branch)', desc: '客户准入与基础核算归集单元' },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 relative z-10">
                           <div className={`w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center text-[11px] font-bold text-white shrink-0 ${i === 0 ? 'bg-blue-600' : 'bg-blue-300'}`}>
                             {i + 1}
                           </div>
                           <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex-1 flex justify-between items-center group hover:bg-white hover:border-blue-200 transition-all hover:shadow-sm">
                              <div className="space-y-1.5">
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{item.level}</span>
                                <div className="text-sm font-bold text-gray-800">{item.name}</div>
                                <div className="text-[10px] text-gray-400 italic leading-relaxed">{item.desc}</div>
                              </div>
                              <MapPin size={18} className="text-gray-200 group-hover:text-blue-500 transition-colors" />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
                   <h3 className="font-bold text-gray-800 mb-6">特殊并表原则说明</h3>
                   <div className="grid grid-cols-2 gap-6">
                      <OrgSpecialItem title="离岸金融中心 (OSA)" desc="挂靠在总行国际部，按准分行级别独立统计，不与境内分行交叉。" />
                      <OrgSpecialItem title="附属子公司 (Subs)" desc="包含理财子公司、基金公司，默认为合并口径展示。" />
                   </div>
                </div>
             </div>
             
             <div className="col-span-5 space-y-8">
                <div className="bg-blue-600 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                   <div className="relative z-10 space-y-8">
                      <div className="text-2xl font-bold tracking-tight">机构数据一致性检核</div>
                      <p className="text-xs text-blue-100 leading-relaxed opacity-90 font-medium">
                        所有指标系统底层必须强制关联唯一的 **ORG_UID**。对于由于撤并机构导致的空码，系统自动按照历史映射表归并至新机构。
                      </p>
                      <div className="pt-6 border-t border-blue-400/50 flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">1,824</div>
                          <div className="text-[9px] opacity-70 uppercase font-bold tracking-widest">物理网点总数</div>
                        </div>
                        <div className="w-[1px] h-10 bg-blue-400/50"></div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">100%</div>
                          <div className="text-[9px] opacity-70 uppercase font-bold tracking-widest">机构码对齐率</div>
                        </div>
                      </div>
                   </div>
                   <Landmark size={140} className="absolute -right-10 -bottom-10 text-white opacity-10 rotate-12" />
                </div>

                <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl flex items-start gap-4">
                   <Info size={20} className="text-amber-600 mt-1 shrink-0" />
                   <div className="space-y-2">
                      <div className="text-sm font-bold text-amber-900">变更预警提示</div>
                      <p className="text-xs text-amber-700/80 leading-relaxed">
                        当发生机构撤并（如支行降级或合并）时，历史数据将自动按照最新机构目录进行追溯，确保同比环比数据的有效性。
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrgSpecialItem = ({ title, desc }: any) => (
  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-blue-100 transition-colors">
    <div className="flex items-center gap-2 mb-2">
      <GitBranch size={14} className="text-blue-500" />
      <span className="text-xs font-bold text-gray-700 uppercase tracking-tighter">{title}</span>
    </div>
    <p className="text-[10px] text-gray-400 leading-relaxed">{desc}</p>
  </div>
);
