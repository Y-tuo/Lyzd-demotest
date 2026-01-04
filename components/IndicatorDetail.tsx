
import React, { useRef, useState } from 'react';
import {
  X, FileText, FileSpreadsheet, Check, Download, LayoutGrid, LayoutDashboard
} from 'lucide-react';

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
  onViewCurrencyScope,
  onViewIndicatorSpace
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState<Set<'word' | 'excel'>>(new Set());

  const basicRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const sameScopeRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const limitRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
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
    <div className="flex-1 bg-surface-light dark:bg-surface-dark m-3 rounded-lg shadow-sm flex flex-col h-[calc(100vh-120px)] overflow-hidden relative border border-border-light dark:border-border-dark font-body">

      {/* 1. Header Actions */}
      <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex items-center justify-between shrink-0 bg-surface-light dark:bg-surface-dark z-10 rounded-t-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDownloadModal(true)}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded text-sm font-medium transition shadow-sm flex items-center gap-1.5"
          >
            <Download size={16} />
            规范下载
          </button>
          <button
            onClick={onViewIndicatorSpace}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded text-sm font-medium transition shadow-sm flex items-center gap-1.5"
          >
            <LayoutGrid size={16} />
            指标空间
          </button>
          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded text-sm font-medium transition shadow-sm flex items-center gap-1.5">
            <LayoutDashboard size={16} />
            指标看板
          </button>
        </div>
      </div>

      {/* 2. Anchor Navigation */}
      <div className="px-6 py-3 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 z-0">
        {[
          { label: '指标基础信息', ref: basicRef },
          { label: '指标统计信息', ref: statRef },
          { label: '指标业务口径信息', ref: businessRef },
          { label: '同口径其他指标', ref: sameScopeRef },
          { label: '指标技术口径信息', ref: techRef },
          { label: '限制条件', ref: limitRef },
          { label: '数据安全信息', ref: securityRef },
          { label: '管理信息', ref: manageRef },
          { label: '运营信息', ref: operateRef },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(item.ref)}
            className="px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap
                         text-text-sub-light dark:text-text-sub-dark hover:bg-gray-200 dark:hover:bg-gray-700
                         focus:bg-blue-100 dark:focus:bg-blue-900/50 focus:text-primary focus:border focus:border-blue-200 dark:focus:border-blue-800"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 3. Content */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-8 scroll-smooth bg-surface-light dark:bg-surface-dark">
        <div className="max-w-6xl mx-auto space-y-12 pb-24">

          {/* Section: Basic Info */}
          <section ref={basicRef} className="scroll-mt-36" id="basic">
            <SectionTitle title="指标基础信息" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 text-sm">
              <InfoField label="指标编号" value="GSZHYG00002" />
              <InfoField label="指标名称" value={title || "对公存款日均"} />
              <InfoField label="指标英文名称" value="Average Daily Corporate Deposit Balance" />
              <InfoField label="指标一级分类" value="公司金融板块" />
              <InfoField label="指标二级分类" value="公司金融综合管理" />
              <InfoField label="指标三级分类" value="业务规模分析" />
              <InfoField label="指标别名" value="-" />
              <InfoField label="指标度量" value="金额" />
              <InfoField label="指标维度" value="机构、时间、币种" />
              <div className="col-span-1 md:col-span-3">
                <InfoField label="指标描述" value="我们吸收的对公客户的存款余额，包含保证金类存款余额。" />
              </div>
            </div>
          </section>

          {/* Section: Stat Info */}
          <section ref={statRef} className="scroll-mt-36" id="stat">
            <SectionTitle title="指标统计信息" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-sm">
              <InfoField label="统计频率" value="每日" />
              <InfoField label="度量单位" value="亿元" />
              <InfoField label="数值属性" value="时点值" />
              <InfoField label="数据格式" value="17n (2)" />
              <InfoField label="取值范围" value="[0,+∞]" />
            </div>
          </section>

          {/* Section: Business Scope */}
          <section ref={businessRef} className="scroll-mt-36" id="business">
            <SectionTitle title="指标业务口径信息" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <InfoField label="指标类型" value="原子指标" />
              <InfoField label="产生方式" value="系统自动化" />

              <div className="col-span-1 md:col-span-2 space-y-1">
                <span className="text-text-sub-light dark:text-text-sub-dark text-xs">指标描述</span>
                <ul className="list-none space-y-2 mt-1 pl-0">
                  <li className="flex items-start">
                    <span
                      className={`text-primary font-medium mr-2 whitespace-nowrap ${onViewProductCatalog ? 'cursor-pointer hover:underline' : ''}`}
                      onClick={onViewProductCatalog}
                    >
                      产品范围限定:
                    </span>
                    <span className="text-text-main-light dark:text-text-main-dark">在xxxxxxxxx值类（ZJ）-01对公存款项下所有产品，包含活期保证金类及其他存款，</span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`text-primary font-medium mr-2 whitespace-nowrap ${onViewClientScope ? 'cursor-pointer hover:underline' : ''}`}
                      onClick={onViewClientScope}
                    >
                      客户范围限定:
                    </span>
                    <span className="text-text-main-light dark:text-text-main-dark">在“客xxxxxxxxxx企业法人,企业非法人，事业单位，非银行类金融机构。</span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`text-primary font-medium mr-2 whitespace-nowrap ${onViewCurrencyScope ? 'cursor-pointer hover:underline' : ''}`}
                      onClick={onViewCurrencyScope}
                    >
                      币种范围限定:
                    </span>
                    <span className="text-text-main-light dark:text-text-main-dark">本外币合计。</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2 whitespace-nowrap">机构范围限定:</span>
                    <span className="text-text-main-light dark:text-text-main-dark">全辖，包含香港分行。</span>
                  </li>
                </ul>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-1">
                <span className="text-text-sub-light dark:text-text-sub-dark text-xs">计算公式</span>
                <p className="font-medium text-text-main-light dark:text-text-main-dark">对公存款日均=从年初/季初/月初至统计时点的对公客户每日存款余额从年初/季初/月初至统计时点的自然日天数</p>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-1">
                <span className="text-text-sub-light dark:text-text-sub-dark text-xs">关联子指标</span>
                <div>
                  <a href="#" className="text-primary hover:underline">GSZHYG00001对公存款余额</a>
                </div>
              </div>

              <InfoField label="来源报表" value="-" />
              <InfoField label="补充说明" value="-" />
            </div>
          </section>

          {/* Section: Same Scope */}
          <section ref={sameScopeRef} className="scroll-mt-36" id="same-caliber">
            <SectionTitle title="同口径其他指标" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-sm">
              <InfoField label="监管报送" value="-" />
              <InfoField label="考核指标" value="-" />
              <InfoField label="对外披露指标" value="-" />
            </div>
          </section>

          {/* Section: Tech Scope */}
          <section ref={techRef} className="scroll-mt-36" id="tech">
            <SectionTitle title="指标技术口径信息" />
            <div className="space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-text-sub-light dark:text-text-sub-dark text-xs">指标存储数据库表名</span>
                  <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded w-fit text-text-main-light dark:text-text-main-dark">$ {'{DDMO_DATA}'}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-text-sub-light dark:text-text-sub-dark text-xs">指标存储表英文名</span>
                  <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded w-fit text-text-main-light dark:text-text-main-dark">MNG_ANLY_IDX_ANLY</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-text-sub-light dark:text-text-sub-dark text-xs">数据字段英文名</span>
                  <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded w-fit text-text-main-light dark:text-text-main-dark">IDX_BASE_VAL</span>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-text-sub-light dark:text-text-sub-dark text-xs">指标涉及系统字段</span>
                <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded w-fit text-text-main-light dark:text-text-main-dark">$lodb_data) .O_GLS_CUX_GL_BALANCES:YATD</span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/30 border border-border-light dark:border-border-dark rounded p-4">
                <h4 className="font-medium mb-2 text-text-main-light dark:text-text-main-dark">指标加工规则</h4>
                <ol className="list-decimal pl-5 space-y-2 text-text-sub-light dark:text-text-sub-dark text-xs leading-relaxed">
                  <li>加工CUST_GNL_BAL_DETL_T1客户总账余额明细表，取O_GLS_CUX_GL_BALANCES 总账日记表使用三级科目编号和账簿编号左关联O_GLS_CUX_HUB_ACCOUNT_LIST 会计科目表</li>
                  <li>加工CUST_GNL_BAL DETL_T1客户总账余额明细临时表，直取CUST_GNL_BAL_DETL 客户总账余额明细表中的数据，限制账簿编号、科目编号、开始日期、结束日期相同。</li>
                  <li>筛选条件：排除所有会计期间描述中包含ADJ的记录，排除记录的日期是12月31日且会计期间描述不包含 -12</li>
                  <li>加工存款余额（MNG_ANLY_IDX_ANLY中IDX_ENCD指标编码=CWFZ002），取CUST_GNL_BAL_DETL_T1 客户总账余额明细临时表左关联GNL_ORG_MAP_INFO 总账机构映射信息表，限制一级，二级、三级会计科目，以及币种和总，分行和香港分行的数据</li>
                  <li>加工个人存款余额（MNG_ANLY_IDX_ANLY中IDX_ENCD指标编码=CWFZ006），取CUST_GNL_BAL_DETL_T1 客户总账余额明细临时表左关联GNL_ORG_MAP_INFO 总账机构映射信息表，限制一级、二级、三级会计科目，以及币种和总，分行和香港分行的数据</li>
                  <li>加工对公存款余额 = 存款余额一个个人存款余额，取字段IDX_BASE_VAL.M.$ {'{DDMO_DATA}'} .MNG_ANLY_IDX_ANLY. 限制IDX_ENCD=CWFZ002和 IDX_ENCD=CWFZ006</li>
                </ol>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-text-sub-light dark:text-text-sub-dark text-xs">加工计算公式</span>
                  <code className="block p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
                    ROUND (SUM(CASE WHEN T1.IDX_ENCD='CWFZ003' THEN NVL (T1.IDX_BASE_VAL,0) WHEN T1.IDX_ENCD='CWFZ007' THEN NVL (-T1.IDX_BASE_VAL,0) ELSE 0 END) , 8)
                  </code>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-text-sub-light dark:text-text-sub-dark text-xs">表间关联条件</span>
                  <code className="block p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono text-gray-700 dark:text-gray-300 break-all whitespace-pre-wrap">
                    {`$ {odb_data} .O_GLS_CUX_GL_BALANCES（总账日记表）关联 $ {odb_data} .O_GLS_CUX_HUB_ACCOUNT _LIST（会计科目表）
--主要处理:
--.使用三级科目编号和账簿编号左关联
--.从总账系统获取原始余额数据
--.关联会计科目表获取科目层级信息`}
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Limit Conditions */}
          <section ref={limitRef} className="scroll-mt-36" id="limit">
            <SectionTitle title="限制条件" />
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-lg p-5 text-sm text-text-main-light dark:text-text-main-dark">
              <h4 className="font-bold mb-3 text-primary">1."存款余额" 筛选会计科目编号:</h4>
              <p className="mb-2 text-xs leading-relaxed text-text-sub-light dark:text-text-sub-dark">
                一级科目号2104存入保证金: 2202银行本票，2109特种存款，2204汇出汇款，2103信用卡存款<br />
                '2111国库定期存款'，'1002银行存款'，'2112国库集中收缴款项'<br />
                或者二级科目号'210301单位信用卡存款'，'210103单位久悬未取存款'，210101单位活期存款210601单位理财产品款<br />
                '250306受托监管资金，'210801外汇储备存款，210702单位结构性存款: "210102单位定期存款，<br />
                210104单位大额存单，'210205个人久悬未取存款",'210203电子现金存款"，'210602个人理财产品款项，<br />
                210201个人活期存款，"210204个人大额存单"，'210701个人结构性存款'，210202个人定期存款，'220502临时存款，<br />
                '200411境内金融控股公司存放"220501应解汇款<br />
                或者三级会计科目"25030703代理单位信托资金款项"21060402保险业金融机构理财产品款项，21060302单位理财托管资金（废止）: '20040801境内保险业金融机构系统内活期存放'<br />
                '20040802境内保险业金融机构系统内定期存放，'25030404单位保本（废止），21060301个人理财托管资金（废止），'25030701代理个人信托资金款项，'25030402个人保本（废止），
              </p>
              <h4 className="font-bold mt-4 mb-3 text-primary">2."个人存款余额" 筛选会计科目编号</h4>
              <p className="mb-2 text-xs leading-relaxed text-text-sub-light dark:text-text-sub-dark">
                会计科目2103信用卡存款<br />
                或者二级会计科目"210205个人久悬未取存款210203电子现金存款，210602个人理财产品款项.210201个人活期存款 ，210204个人大额存单' ，210701个人结构性存款'210202个人定期存款'<br />
                或者三级会计科目'25030606个人委托监管资金，，'21060301个人理财托管资金（废止）'，'25030701代理个人信托资金款项'，'25030402个人保本（废止）'，'21049902个人保证金'
              </p>
            </div>
          </section>

          {/* Section: Data Security Info */}
          <section ref={securityRef} className="scroll-mt-36" id="security">
            <SectionTitle title="数据安全信息" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <InfoField label="敏感性层级" value="-" />
              <InfoField label="数据安全分级" value="-" />
            </div>
          </section>

          {/* Section: Management Info */}
          <section ref={manageRef} className="scroll-mt-36" id="management">
            <SectionTitle title="管理信息" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 text-sm">
              <InfoField label="业务主管部门" value="公司业务部" />
              <InfoField label="业务联系人" value="xxx" />
              <div className="hidden lg:block"></div>
              <InfoField label="指标开发负责人" value="-" />
              <InfoField label="主数据源" value="总账系统" />
              <InfoField label="管理层级" value="金融" />
              <div className="col-span-1 md:col-span-3">
                <InfoField label="指标加工方式" value="调用总账系统数据后在数据信息中枢系统加工" />
              </div>
              <div className="col-span-1 md:col-span-3">
                <InfoField label="相关质量规则" value="-" />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-text-sub-light dark:text-text-sub-dark text-xs">指标状态</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 w-fit">已上线</span>
              </div>
              <InfoField label="生效日期" value="2025年12月31日" />
              <InfoField label="失效日期" value="2099年12月31日" />
            </div>
          </section>

          {/* Section: Operation Info */}
          <section ref={operateRef} className="scroll-mt-36" id="operation">
            <SectionTitle title="运营信息" />
            <div className="flex flex-col space-y-1 text-sm">
              <span className="text-text-sub-light dark:text-text-sub-dark text-xs">预警规则</span>
              <span className="font-medium text-text-main-light dark:text-text-main-dark">-</span>
            </div>
          </section>

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
              <button onClick={() => toggleFormat('word')} className={`relative flex flex-col items-center justify-center gap-5 p-10 border-2 rounded-3xl transition-all ${selectedFormats.has('word') ? 'border-primary bg-blue-50/50' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}>
                {selectedFormats.has('word') && (
                  <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-1 shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
                <FileText size={40} className="text-primary" />
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
              className="w-full py-5 bg-primary text-white rounded-2xl font-bold shadow-lg hover:bg-primary-dark active:scale-[0.98] transition-all disabled:bg-gray-200"
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
  <div className="flex items-center mb-4 pb-2 border-b border-border-light dark:border-border-dark">
    <div className="w-1 h-5 bg-primary rounded-full mr-3"></div>
    <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">{title}</h2>
  </div>
);

const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-text-sub-light dark:text-text-sub-dark text-xs">{label}</span>
    <span className="font-medium text-text-main-light dark:text-text-main-dark">{value}</span>
  </div>
);
