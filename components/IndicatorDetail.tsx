
import React, { useRef, useState } from 'react';
// Fix: Added Database to the imported icons from lucide-react
import { Download, Share2, LayoutDashboard, X, FileText, FileSpreadsheet, ShieldCheck, History, Code, Zap, Info, AlertCircle, Database } from 'lucide-react';

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
  const techRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

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

      {/* 1. Header (Without Breadcrumbs) */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {title || "对公存款日均"}
            <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-tighter font-medium">已发布 (V2.4)</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 mr-2">
            <button className="px-3 py-1.5 text-xs text-gray-500 hover:text-blue-600 hover:bg-white rounded transition-all">概览</button>
            <button className="px-3 py-1.5 text-xs text-blue-600 bg-white shadow-sm rounded font-medium">完整规范说明</button>
          </div>
          <button
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs text-white bg-blue-600 rounded shadow-md hover:bg-blue-700 transition-all active:scale-95"
          >
            <Download size={14} />
            规范导出
          </button>
        </div>
      </div>

      {/* 2. Anchor Navigation (Fixed) */}
      <div className="px-6 py-2 border-b border-gray-50 flex items-center justify-between shrink-0 bg-gray-50/30">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {[
            { label: '基础信息', ref: basicRef, icon: FileText },
            { label: '统计信息', ref: statRef, icon: Zap },
            { label: '业务口径', ref: businessRef, icon: Info },
            { label: '技术口径', ref: techRef, icon: Code },
            { label: '数据质量', ref: qualityRef, icon: AlertCircle },
            { label: '安全合规', ref: securityRef, icon: ShieldCheck },
            { label: '修订记录', ref: logRef, icon: History },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(item.ref)}
              className="flex items-center gap-2 px-4 py-1.5 text-xs text-gray-500 hover:text-blue-600 hover:bg-white rounded-md whitespace-nowrap transition-all border border-transparent hover:border-blue-100"
            >
              <item.icon size={13} />
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
          <button onClick={onViewIndicatorSpace} className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
            <Share2 size={12} /> 指标空间
          </button>
          <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
            <LayoutDashboard size={12} /> 监控大盘
          </button>
        </div>
      </div>

      {/* 3. Deep Scroll Content (Enhanced with rich data) */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-12 scroll-smooth bg-[#fcfcfc]">
        <div className="max-w-5xl mx-auto space-y-24 pb-48">

          {/* Section: Basic Info */}
          <div ref={basicRef} className="scroll-mt-12 bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
            <SectionTitle title="指标基础信息" subtitle="Basic Specification" />
            <div className="grid grid-cols-3 gap-y-10 gap-x-12 text-sm">
              <InfoRow label="指标编号" value="GSZHYG00002" />
              <InfoRow label="指标名称" value={title || "对公存款日均"} />
              <InfoRow label="指标状态" value="生产中使用" />
              <InfoRow label="一级分类" value="公司金融板块" />
              <InfoRow label="二级分类" value="公司金融综合管理" />
              <InfoRow label="三级分类" value="业务规模分析" />
              <InfoRow label="指标粒度" value="日、月、季、年" />
              <InfoRow label="计量单位" value="人民币 (元)" />
              <InfoRow label="管理部门" value="公司金融部 / 数据治理办" />
              <div className="col-span-3 pt-8 border-t border-gray-50">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block mb-4">指标核心定义</span>
                <p className="text-gray-700 leading-relaxed text-sm bg-blue-50/40 p-6 rounded-2xl border border-blue-100/50 italic">
                  该指标定义为统计周期内（如月度、年度）客户在银行开立的所有对公存款账户每日余额的算术平均值。其计算公式逻辑严密，旨在平滑月末、季末存款大幅波动对真实资金实力的干扰，是反映对公业务质量和资金稳定性的关键核心决策指标。
                </p>
              </div>
            </div>
          </div>

          {/* Section: Stat Rules */}
          <div ref={statRef} className="scroll-mt-12">
            <SectionTitle title="指标统计信息" subtitle="Statistical Rules" />
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-400 mb-6 tracking-wider uppercase">统计频率与周期要求</h4>
                  <div className="space-y-4">
                    <StatItem label="日统计" status="支持 (D+1)" />
                    <StatItem label="月统计" status="支持 (M+1)" />
                    <StatItem label="季统计" status="支持 (Q+1)" />
                    <StatItem label="年累计" status="支持 (Y+1)" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-xs font-bold text-gray-400 mb-6 tracking-wider uppercase">汇总与补齐策略</h4>
                <div className="grid grid-cols-2 gap-6 text-xs">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-gray-400 mb-2">数值属性</div>
                    <div className="font-bold text-gray-800">存量平均值</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-gray-400 mb-2">空值补齐方式</div>
                    <div className="font-bold text-gray-800">向前补位填充</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-gray-400 mb-2">精度处理</div>
                    <div className="font-bold text-gray-800">保留两位小数</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Business Scope */}
          <div ref={businessRef} className="scroll-mt-12">
            <SectionTitle title="业务口径及范围定义" subtitle="Business Scopes" />
            <div className="grid grid-cols-1 gap-8">
              <ScopeCard
                title="产品包含范围 (Product Scope)"
                desc="包含所有对公活期、定期、协定及通知存款。具体涉及科目见“总账科目范围”。"
                link="点击查看详细产品目录"
                onClick={onViewProductCatalog}
                color="blue"
              />
              <ScopeCard
                title="客户范围定义 (Client Scope)"
                desc="境内外所有非自然人客户主体，包含金融机构、事业单位等。剔除零售客户。"
                link="点击查看详细客户定义"
                onClick={onViewClientScope}
                color="emerald"
              />
              <ScopeCard
                title="折算币种范围 (Currency Scope)"
                desc="涉及多币种，按央行日终中间价折算为人民币。支持原币种查询。"
                link="查看汇率折算标准"
                onClick={onViewCurrencyScope}
                color="amber"
              />
              <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-500" />
                  特殊剔除口径 (Business Exclusions)
                </h4>
                <div className="text-sm text-gray-600 space-y-4 pl-6 border-l-4 border-red-50">
                  <p>1. 剔除所有内部核算账户、过渡性存款账户、待结算利息账户；</p>
                  <p>2. 剔除法院冻结、长期不活跃且被系统标记为“睡眠”的账户余额；</p>
                  <p>3. 剔除集团内部子公司之间的关联交易存入额，防止数据虚高；</p>
                  <p>4. 剔除由于银行端操作导致的冲正差额，确保统计数据真实可信。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Tech Specs */}
          <div ref={techRef} className="scroll-mt-12">
            <SectionTitle title="技术实现规范" subtitle="Technical Logic" />
            <div className="space-y-8">
              <div className="bg-[#1e293b] rounded-3xl p-10 shadow-2xl relative">
                <div className="absolute top-6 right-10 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <pre className="text-sm font-mono text-blue-200 overflow-x-auto leading-relaxed">
                  {`/* 对公存款日均指标计算逻辑 V2.4 */
/* 计算逻辑：通过日终余额表进行全量加总后求均值 */
WITH daily_bal AS (
  SELECT 
    cust_id, 
    stat_date, 
    SUM(CASE WHEN currency = 'CNY' THEN balance_amt 
             ELSE balance_amt * exchange_rate END) as day_total
  FROM dwd_acc_balance
  WHERE subject_no LIKE '201%' -- 过滤对公存款核心科目
    AND account_status = '0'   -- 正常状态账户
  GROUP BY cust_id, stat_date
)
SELECT 
  cust_id,
  AVG(day_total) OVER (
    PARTITION BY cust_id 
    ORDER BY stat_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) as avg_daily
FROM daily_bal;`}
                </pre>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Database size={16} className="text-blue-500" /> 上游表源
                  </div>
                  <div className="space-y-3">
                    <code className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded block mb-1">DWD_ACC_BALANCE (余额宽表)</code>
                    <code className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded block">DIM_EXCHANGE_RATE (汇率维表)</code>
                  </div>
                </div>
                <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <History size={16} className="text-blue-500" /> 更新时效性
                  </div>
                  <p className="text-gray-500 text-sm">每日 T+1 跑批生成，确保在每日凌晨 03:00 前完成数据入库与聚合计算。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Data Quality */}
          <div ref={qualityRef} className="scroll-mt-12">
            <SectionTitle title="数据质量检核规则" subtitle="Quality Assurance" />
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="px-10 py-5">监控项</th>
                    <th className="px-10 py-5">质量规则描述</th>
                    <th className="px-10 py-5 text-center">严重程度</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700">
                  <tr>
                    <td className="px-10 py-6 font-bold">孤儿记录检核</td>
                    <td className="px-10 py-6 text-gray-500">存款余额记录必须能够准确关联至有效的客户主档 (CIF_ID)。</td>
                    <td className="px-10 py-6 text-center"><span className="text-red-500 font-bold">致命</span></td>
                  </tr>
                  <tr>
                    <td className="px-10 py-6 font-bold">环比异常波动</td>
                    <td className="px-10 py-6 text-gray-500">当日日均较昨日波动率不得超过 ±50%，若超限需触发业务核查流程。</td>
                    <td className="px-10 py-6 text-center"><span className="text-orange-500 font-bold">警告</span></td>
                  </tr>
                  <tr>
                    <td className="px-10 py-6 font-bold">总分核对逻辑</td>
                    <td className="px-10 py-6 text-gray-500">明细数据日均加总值与分行报送总额的差异率应控制在 0.01% 以内。</td>
                    <td className="px-10 py-6 text-center"><span className="text-red-500 font-bold">致命</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Security */}
          <div ref={securityRef} className="scroll-mt-12">
            <SectionTitle title="安全合规与分级" subtitle="Data Security" />
            <div className="grid grid-cols-2 gap-10">
              <div className="p-10 bg-gray-900 text-white rounded-3xl space-y-6 shadow-xl">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">数据安全分级标准</div>
                <div className="text-4xl font-bold text-amber-500 flex items-center gap-3">
                  L3 - 机密级 <ShieldCheck size={32} />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  本指标涉及全行核心经营数据及客户资金变动趋势，严禁在未经授权的终端导出明细。所有导出操作必须通过 DLP 系统进行审计追踪。
                </p>
              </div>
              <div className="p-10 bg-white border border-gray-200 rounded-3xl space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-800">动态脱敏保护策略</span>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold">实时生效中</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-4">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> 关联账号脱敏：首6位、尾4位可见</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> 客户主体脱敏：展示“*公司”或遮盖关键字段</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> 查看权限：仅限公司部及财会部主管职级</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Revision History */}
          <div ref={logRef} className="scroll-mt-12">
            <SectionTitle title="版本修订记录" subtitle="Revision Logs" />
            <div className="relative border-l-2 border-gray-100 ml-5 space-y-20 py-8">
              <RevisionNode
                version="V2.4" date="2024-05-12" title="优化汇率折算算法"
                desc="将离岸账户存款纳入日均统计范围，同步更新了多币种按天汇率折算公式。修订人：王建国 (数据中心)" active
              />
              <RevisionNode
                version="V2.1" date="2023-08-05" title="扩充产品目录映射"
                desc="应计划财务部要求，新增了“保证金类存款”明细科目映射逻辑。修订人：李芳 (财务部)"
              />
              <RevisionNode
                version="V1.0" date="2022-12-01" title="指标创建与上线"
                desc="指标平台上线首发版本，定义了对公核心存款基础取数逻辑与汇总规范。"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Download Modal */}
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
              <button onClick={() => toggleFormat('word')} className={`flex flex-col items-center justify-center gap-5 p-10 border-2 rounded-3xl transition-all ${selectedFormats.has('word') ? 'border-blue-500 bg-blue-50/50' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}>
                <FileText size={40} className="text-blue-600" />
                <span className="text-sm font-bold text-gray-700">Word 文档</span>
              </button>
              <button onClick={() => toggleFormat('excel')} className={`flex flex-col items-center justify-center gap-5 p-10 border-2 rounded-3xl transition-all ${selectedFormats.has('excel') ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}>
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

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="flex flex-col gap-1 mb-12">
    <div className="flex items-center gap-4">
      <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
      <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h3>
    </div>
    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.3em] ml-6">{subtitle}</span>
  </div>
);

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-2.5 group">
    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider group-hover:text-blue-500 transition-colors">{label}</span>
    <span className="text-gray-800 font-bold break-words border-b border-transparent group-hover:border-blue-100 pb-1">{value || '-'}</span>
  </div>
);

const StatItem: React.FC<{ label: string; status: string }> = ({ label, status }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-50 text-xs">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="font-bold text-gray-800">{status}</span>
  </div>
);

const ScopeCard: React.FC<{ title: string; desc: string; link: string; color: 'blue' | 'emerald' | 'amber'; onClick?: () => void }> = ({ title, desc, link, color, onClick }) => {
  const colors = {
    blue: 'border-blue-100 bg-blue-50/30 text-blue-700',
    emerald: 'border-emerald-100 bg-emerald-50/30 text-emerald-700',
    amber: 'border-amber-100 bg-amber-50/30 text-amber-700',
  };
  return (
    <div className={`p-8 border rounded-3xl flex items-center justify-between transition-all hover:shadow-lg ${colors[color]}`}>
      <div className="space-y-2">
        <h5 className="font-bold text-sm flex items-center gap-2"><ShieldCheck size={18} />{title}</h5>
        <p className="text-xs text-gray-600 leading-relaxed max-w-xl">{desc}</p>
      </div>
      <button onClick={onClick} className="text-xs font-bold underline decoration-2 underline-offset-4 whitespace-nowrap hover:opacity-70">
        {link}
      </button>
    </div>
  );
};

const RevisionNode: React.FC<{ version: string; date: string; title: string; desc: string; active?: boolean }> = ({ version, date, title, desc, active }) => (
  <div className="relative pl-12 group">
    <div className={`absolute left-[-13px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-md transition-all ${active ? 'bg-blue-600 scale-125' : 'bg-gray-200'}`}></div>
    <div className="flex items-center gap-4 mb-3">
      <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${active ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-500'}`}>{version}</span>
      <span className="text-[11px] text-gray-400 font-medium">{date}</span>
    </div>
    <div className="text-base font-bold text-gray-800 mb-2">{title}</div>
    <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">{desc}</p>
  </div>
);
