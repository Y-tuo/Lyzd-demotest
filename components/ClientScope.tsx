
import React from 'react';
import { ArrowLeft, Users, ShieldCheck, Building, UserCheck, Scale, AlertTriangle } from 'lucide-react';

export const ClientScope: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex-1 bg-white m-3 rounded-lg shadow-sm flex flex-col h-[calc(100vh-120px)] overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-blue-50 rounded-xl"><Users className="text-blue-600" size={20} /></div>
           <h2 className="font-bold text-gray-800">对公客户统计口径标准 (Indicator Scope V4)</h2>
        </div>
        <button onClick={onBack} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-12 bg-[#fcfcfc]">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-8 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-base font-bold text-gray-800 mb-8 flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-500" />
                入围原则 (Inclusion Principles)
              </h3>
              <div className="bg-blue-50/50 p-6 rounded-2xl border-l-4 border-blue-500 mb-10 italic text-sm text-gray-600 leading-relaxed">
                所有在本指标内统计的“对公客户”，必须在核心系统中具备合法的17位统一社会信用代码，且完成年度KYC尽职调查。
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <CategoryItem title="企业法人主体" icon={Building} desc="包含所有类型的大中小型企业法人及其独立核算的子公司。" />
                 <CategoryItem title="非法人组织" icon={Scale} desc="合伙企业、个人独资企业、社会团体等合法经济实体。" />
                 <CategoryItem title="金融机构主体" icon={UserCheck} desc="保险、证券、基金等非银金融机构。注意：同业清算账户归类为同业板块。" />
                 <CategoryItem title="机关事业单位" icon={Scale} desc="国家权力机关、事业单位及执行特殊公共职能的组织。" />
              </div>
            </div>
            
            <div className="col-span-4 space-y-8">
              <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">关键客户标识 (Tags)</div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">战略级大客户</span>
                    <span className="font-bold text-blue-400">STRAT-A</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">普惠小微企业</span>
                    <span className="font-bold text-emerald-400">P-SME</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">高新科技企业</span>
                    <span className="font-bold text-purple-400">TECH-H</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                 <h4 className="text-xs font-bold text-gray-800 mb-4 uppercase tracking-wider">关联方识别逻辑</h4>
                 <p className="text-[10px] text-gray-500 leading-relaxed">
                   同一实际控制人下的多个分子机构，在统计“客户数”时按照母公司归集处理，防止虚假开户导致的统计冗余。
                 </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-10 flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-500" />
              明确排除口径 (Exclusions)
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <ExclusionRow 
                label="零售相关主体" 
                desc="个体工商户、小微企业主以个人名义开立的经营性账户，统一划入零售信贷板块进行管理。" 
              />
              <ExclusionRow 
                label="异常/僵尸企业" 
                desc="被法院标记为“失信被执行人”且账户余额连续六个月为0、未进行年检的存量主体。" 
              />
              <ExclusionRow 
                label="银行内部核算主体" 
                desc="包含内部过渡账号、待处理抵债资产账户等非真实业务主体。" 
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const CategoryItem = ({ title, icon: Icon, desc }: any) => (
  <div className="space-y-3 p-5 rounded-2xl border border-gray-50 bg-gray-50/20 hover:bg-white hover:border-blue-100 transition-all hover:shadow-md">
    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
      <Icon size={16} />
      {title}
    </div>
    <p className="text-[10px] text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const ExclusionRow = ({ label, desc }: any) => (
  <div className="flex items-start gap-5 p-6 rounded-2xl border border-red-50 bg-red-50/10">
    <div className="w-2.5 h-2.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
    <div className="space-y-1">
      <div className="text-xs font-bold text-red-900">{label}</div>
      <p className="text-xs text-red-700/60 leading-relaxed">{desc}</p>
    </div>
  </div>
);
