
import React, { useRef, useState } from 'react';
import { X, FileText, FileSpreadsheet, Code, Zap, Info, Database, Check, Settings, Users, ChevronRight } from 'lucide-react';

interface IndicatorDetailProps {
  title?: string;
  onViewProductCatalog?: () => void;
  onViewClientScope?: () => void;
  onViewCurrencyScope?: () => void;
  onViewIndicatorSpace?: () => void;
}

export const IndicatorDetail: React.FC<IndicatorDetailProps> = ({
  title,
  onViewProductCatalog,
  onViewClientScope,
  onViewCurrencyScope
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState<Set<'word' | 'excel'>>(new Set());

  const basicRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const sameScopeRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const manageRef = useRef<HTMLDivElement>(null);
  const operateRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current && containerRef.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFormat = (format: 'word' | 'excel') => {
    setSelectedFormats(prev => {
      const next = new Set(prev);
      if (next.has(format)) next.delete(format);
      else next.add(format);
      return next;
    });
  };

  return (
    <div className="flex-1 bg-white m-3 rounded-lg shadow-sm flex flex-col h-[calc(100vh-120px)] overflow-hidden relative border border-gray-100">

      {/* 1. Header */}
      {/* 1. Header */}
      <div className="px-8 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDownloadModal(true)}
            className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition shadow-sm active:scale-95"
          >
            规范下载
          </button>
          <button className="bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-600 transition shadow-sm active:scale-95">指标空间</button>
          <button className="bg-blue-400 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-500 transition shadow-sm active:scale-95">指标看板</button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-sm font-medium mr-1">关联子指标:</span>
          <div className="flex items-center gap-2">
            {[
              { id: '1', name: 'GSZHYG00001对公存款余额' },
              { id: '2', name: '关联子指标二' },
              { id: '3', name: '关联子指标三' }
            ].map((sub) => (
              <button
                key={sub.id}
                className="group flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded text-xs transition-colors"
              >
                <span className="font-medium group-hover:underline">{sub.name}</span>
                <ChevronRight size={12} className="text-blue-400 group-hover:text-blue-600" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Anchor Navigation */}
      <div className="px-8 py-2 border-b border-gray-50 flex items-center justify-between shrink-0 bg-gray-50/30">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { label: '指标基础信息', ref: basicRef, icon: FileText },
            { label: '指标统计信息', ref: statRef, icon: Zap },
            { label: '指标业务口径信息', ref: businessRef, icon: Info },
            { label: '同口径其他指标', ref: sameScopeRef, icon: Database },
            { label: '指标技术口径信息', ref: techRef, icon: Code },
            { label: '管理信息', ref: manageRef, icon: Users },
            { label: '运营信息', ref: operateRef, icon: Settings },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(item.ref)}
              className="px-3 py-1.5 text-xs text-gray-500 hover:text-blue-600 hover:bg-white rounded-md whitespace-nowrap transition-all border border-transparent hover:border-blue-100 bg-white/50"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Content */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-12 scroll-smooth bg-white">
        <div className="max-w-6xl mx-auto space-y-16 pb-24">

          {/* Section: Basic Info */}
          <div ref={basicRef} className="scroll-mt-12 space-y-6">
            <SectionTitle title="指标基础信息" />
            <div className="grid grid-cols-3 gap-y-6 gap-x-12 text-xs">
              <InfoField label="指标编号" value="GSZHYG00002" />
              <InfoField label="指标名称" value={title || "对公存款日均"} />
              <InfoField label="指标英文名称" value="Average Daily Corporate Deposit Balance" />

              <InfoField label="指标一级分类" value="公司金融板块" />
              <InfoField label="指标二级分类" value="公司金融综合管理" />
              <InfoField label="指标三级分类" value="业务规模分析" />

              <InfoField label="指标别名" value="-" />
              <InfoField label="指标重要程度" value="重要" />
              <InfoField label="指标维度" value="机构、时间、币种" />

              <div className="col-span-3">
                <InfoField label="指标描述" value="我行吸收的对公客户的存款余额，包含保证金类存款余额，不包含同业存款。" fullWidth />
              </div>
            </div>
          </div>

          {/* Section: Stat Info */}
          <div ref={statRef} className="scroll-mt-12 space-y-6">
            <SectionTitle title="指标统计信息" />
            <div className="grid grid-cols-3 gap-y-6 gap-x-12 text-xs">
              <InfoField label="统计频率" value="每日" />
              <InfoField label="度量单位" value="亿元" />
              <InfoField label="数值属性" value="时点值" />
              <InfoField label="数据格式" value="17n(2)" />
              <InfoField label="取值范围" value="[0, +∞)" />
            </div>
          </div>

          {/* Section: Business Scope */}
          <div ref={businessRef} className="scroll-mt-12 space-y-6">
            <SectionTitle title="指标业务口径信息" />
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-3 gap-y-6 gap-x-12">
                <InfoField label="指标类型" value="原子指标" />
                <InfoField label="产生方式" value="系统自动化" />
              </div>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <span className="text-gray-500 font-medium whitespace-nowrap min-w-[80px]">指标描述：</span>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex gap-2">
                      <span className="text-blue-600 underline cursor-pointer" onClick={onViewProductCatalog}>产品范围限定</span>
                      <span>在 xxxxxxxxx (Z, J ...等) 对公存款项下所有产品，包含活期保证金及其他存款。</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600 underline cursor-pointer" onClick={onViewClientScope}>客户范围限定</span>
                      <span>在 xxxxxxxxx 企业法人, 企业非法人，事业单位，非银行类金融机构。</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600 underline cursor-pointer" onClick={onViewCurrencyScope}>币种范围限定</span>
                      <span>本外币合计。</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600 underline cursor-pointer">机构范围限定</span>
                      <span>全辖，包含香港分行。</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-500 font-medium whitespace-nowrap min-w-[80px]">计算公式：</span>
                <p className="text-gray-700">对公存款日均=从年初/季初/月初至统计时点的对公客户每日存款余额之和/年初/季初/月初至统计时点的自然天数</p>
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                <div className="flex gap-4 items-center">
                  <span className="text-gray-500 font-medium">关联手册：</span>
                  <span className="text-blue-600 underline cursor-pointer">GSZHYG00001对公存款手册</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                <InfoField label="来源报表" value="-" />
                <InfoField label="补充说明" value="-" />
              </div>
            </div>
          </div>

          {/* Section: Same Scope */}
          <div ref={sameScopeRef} className="scroll-mt-12 space-y-6">
            <SectionTitle title="同口径其他指标" />
            <div className="grid grid-cols-3 gap-y-6 gap-x-12 text-xs">
              <InfoField label="监管报送" value="-" />
              <InfoField label="考核指标" value="-" />
              <InfoField label="对外披露指标" value="-" />
            </div>
          </div>

          {/* Section: Tech Scope */}
          <div ref={techRef} className="scroll-mt-12 space-y-6">
            <SectionTitle title="指标技术口径信息" />
            <div className="text-xs space-y-6">
              <div className="grid grid-cols-3 gap-y-6 gap-x-12">
                <InfoField label="指标存储表英文名" value="S (DCMD_DATA)" />
                <InfoField label="指标存储字段英文名" value="MNG_ANLY_IDX_ANLY" />
                <InfoField label="路径字段英文名" value="IDX_BASE_VAL" />
              </div>
              <InfoField label="指标涉及系统字段" value="$odb_data / O_GLS_CUX_GL_BALANCES.YATD" fullWidth />

              <div className="flex gap-4">
                <span className="text-gray-500 font-medium whitespace-nowrap min-w-[80px]">指标加工规则：</span>
                <div className="text-gray-700 space-y-2 leading-relaxed">
                  <p>1.加工 CUST_GNL_BAL_DETL 客户总账余额明细表，取O_GLS_GUX_GL_BALANCES 总账日记表使用三级科目编号和核算编号左关联O_GLS_CUX_HUB_ACCOUNT_LIST (会计科目表)</p>
                  <p>2.加工 CUST_GNL_BAL_DETL_T1 客户总账余额明细临时表，直接CUST_GNL_BAL_DETL 客户总账余额明细表中的数据，限制账簿编号、科目编号、开始日期、结束日期范围。</p>
                  <p className="pl-4 text-gray-500">筛选条件：剔除所有会计期间描述中包含ADJ的记录，剔除记录的日期是12月31日且会计期间描述不包含 -12</p>
                  <p>3.加工存款余额 (MNG_ANLY_IDX_ANLY中IDX_ENCD链接编码=CWFZ002)，取CUST_GNL_BAL_DETL_T1 客户总账余额明细临时表左关联GNL_ORG_MAP_INFO 总账机构映射信息表，限制一级、二级、三级会计科目，以及币种汇总、分行和香港分行的数据</p>
                  <p>4.加工个人存款余额 (MNG_ANLY_IDX_ANLY中IDX_ENCD链接编码=CWFZ003)，取CUST_GNL_BAL_DETL_T1 客户总账余额明细临时表左关联GNL_ORG_MAP_INFO 总账机构映射信息表，限制一级、二级、三级会计科目，以及币种汇总、分行和香港分行的数据</p>
                  <p>5.加工对公存款余额+存款余额-个人存款余额。用字段IDX_BASE_VAL (S (DCMD_DATA) .MNG_ANLY_IDX.ANLY，限制IDX_DNCD=CWFZ002和IDX_ENCD=CWFZ003)</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-gray-500 font-medium whitespace-nowrap min-w-[80px]">加工计算公式：</span>
                <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded w-full">
                  ROUND (SUM(CASE WHEN T1.IDX_ENCD='CWFZ003' THEN NVL (T1.IDX_BASE_VAL,0) WHEN T1.IDX_ENCD='CWFZ007' THEN NVL (-T1.IDX_BASE_VAL,0) ELSE 0 END) , 2)
                </p>
              </div>

              <div className="flex gap-4">
                <span className="text-gray-500 font-medium whitespace-nowrap min-w-[80px]">库表依赖关联：</span>
                <div className="text-gray-700 space-y-1">
                  <p>1. "存款余额" 筛选会计科目编号：</p>
                  <p className="pl-4 text-gray-500">-一级科目号2104存入保证金：2202银行本票，2109特种存款，2204汇出汇款，2103信用卡存款</p>
                  <p className="pl-4 text-gray-500">-“2111国内定期存款”，"1002银行存款"，“2112国库集中收缴款项”</p>
                  <p className="pl-4 text-gray-500">-或者二级科目为“210301单位信用卡存款”，“210103单位久悬未取存款”，“210101单位活期存款210601单位理财产品款”</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Management Info */}
          <div ref={manageRef} className="scroll-mt-12 space-y-6">
            <SectionTitle title="管理信息" />
            <div className="grid grid-cols-3 gap-y-6 gap-x-12 text-xs">
              <InfoField label="业务主管部门" value="公司业务部" />
              <InfoField label="业务联系人" value="xxx" />
              <InfoField label="指标开发负责人" value="-" />
              <InfoField label="主数据源" value="总体系统" />
              <InfoField label="土屏展示" value="管理驾驶舱" />
              <InfoField label="指标加工方式" value="调用总账系统数据后在数据中台系统加工" fullWidth />
              <InfoField label="相关质量规则" value="-" fullWidth />
              <InfoField label="指标状态" value="已上线" />
              <InfoField label="生效日期" value="2025年12月31日" />
              <InfoField label="失效日期" value="2025年12月31日" />
            </div>
          </div>

          {/* Section: Operation Info */}
          <div ref={operateRef} className="scroll-mt-12 space-y-6">
            <SectionTitle title="运营信息" />
            <div className="text-xs">
              <InfoField label="预警规则" value="-" />
            </div>
          </div>

        </div>
      </div>

      {/* Download Modal - Preserved */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] shadow-2xl w-[480px] p-12 relative border border-gray-100 transform animate-in zoom-in-95">
            <button onClick={() => setShowDownloadModal(false)} className="absolute right-8 top-8 p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
              <X size={20} />
            </button>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-800">指标规范文档导出</h3>
              <p className="text-sm text-gray-500 mt-2">请选择导出格式，文件将包含所有章节内容</p>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <button onClick={() => toggleFormat('word')} className={`relative flex flex-col items-center justify-center gap-5 p-10 border-2 rounded-3xl transition-all ${selectedFormats.has('word') ? 'border-blue-500 bg-blue-50/50' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}>
                {selectedFormats.has('word') && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-1 shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
                <FileText size={40} className="text-blue-600" />
                <span className="text-sm font-bold text-gray-700">Word 文档</span>
              </button>
              <button onClick={() => toggleFormat('excel')} className={`relative flex flex-col items-center justify-center gap-5 p-10 border-2 rounded-3xl transition-all ${selectedFormats.has('excel') ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}>
                {selectedFormats.has('excel') && (
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white rounded-full p-1 shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
                <FileSpreadsheet size={40} className="text-emerald-600" />
                <span className="text-sm font-bold text-gray-700">Excel 表格</span>
              </button>
            </div>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all disabled:bg-gray-200"
              disabled={selectedFormats.size === 0}
            >
              立即生成
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helper Components ---

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center gap-3 mb-6 border-l-4 border-blue-600 pl-3">
    <h3 className="text-sm font-bold text-gray-800">{title}</h3>
  </div>
);

const InfoField: React.FC<{ label: string; value: string; fullWidth?: boolean }> = ({ label, value, fullWidth }) => (
  <div className={`flex gap-4 ${fullWidth ? 'col-span-3' : ''}`}>
    <span className="text-gray-500 font-medium whitespace-nowrap min-w-[80px]">{label}:</span>
    <span className="text-gray-800 font-medium break-words">{value}</span>
  </div>
);
