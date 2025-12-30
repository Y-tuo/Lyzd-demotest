
import React, { useState } from 'react';
import { Check, ArrowLeft, Search, Download } from 'lucide-react';

interface ProductCatalogProps {
  onBack: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const rows = [
    { id: 1, l1: '支付结算类\n(ZF)', l2: '01基础支付\n结算', l3: '支票 (ZPXX)', l4: '现金支票', code: 'ZFO1ZPXX0106', dept: '运营管理部', contact: '李昊', phone: '85237207', policy: '《票据法》第19条', channels: { counter: true } },
    { id: 2, l1: null, l2: null, l3: null, l4: '转账支票', code: 'ZFO1ZPXX0206', dept: '运营管理部', contact: '李昊', phone: '85237207', policy: '华银制〔2020〕242号', channels: { counter: true, web: true } },
    { id: 3, l1: null, l2: null, l3: '银行汇票\n(YHHP)', l4: '银行汇票', code: 'ZFO1YHHPO101', dept: '运营管理部', contact: '李昊', phone: '85237207', policy: '华银制〔2021〕12号', channels: { counter: true } },
    { id: 4, l1: '存款类\n(CK)', l2: '02单位存款', l3: '对公活期\n(DGHQ)', l4: '一般对公活期账户', code: 'CKO2DGHQ0101', dept: '公司金融部', contact: '张一', phone: '85239900', policy: '华银制〔2023〕100号', channels: { counter: true, web: true, direct: true } },
    { id: 5, l1: null, l2: null, l3: null, l4: '协定存款账户', code: 'CKO2DGHQ0102', dept: '公司金融部', contact: '张一', phone: '85239900', policy: '华银制〔2023〕101号', channels: { counter: true, web: true } },
    { id: 6, l1: null, l2: '03单位定期', l3: '对公定期\n(DGDQ)', l4: '普通对公定期', code: 'CKO3DGDQ0101', dept: '公司金融部', contact: '王五', phone: '85238811', policy: '华银制〔2022〕45号', channels: { counter: true } },
    { id: 7, l1: '贸易融资类\n(MY)', l2: '04国际结算', l3: '信用证\n(XYZX)', l4: '进口信用证', code: 'MYO4XYZX0101', dept: '贸易金融部', contact: '马焱', phone: '85237210', policy: 'UCP600国际惯例', channels: { counter: true } },
    { id: 8, l1: null, l2: null, l3: null, l4: '出口信用证', code: 'MYO4XYZX0201', dept: '贸易金融部', contact: '吕蒙', phone: '85237389', policy: '华银制〔2024〕38号', channels: { counter: true } },
    { id: 9, l1: '贷款类\n(DK)', l2: '05公司贷款', l3: '流动资金贷款\n(LDZJ)', l4: '短期流动资金贷款', code: 'DKO5LDZJ0101', dept: '授信管理部', contact: '陈诚', phone: '85236677', policy: '华银制〔2023〕50号', channels: { manager: true } },
    { id: 10, l1: null, l2: null, l3: null, l4: '中长期流贷', code: 'DKO5LDZJ0102', dept: '授信管理部', contact: '陈诚', phone: '85236677', policy: '华银制〔2023〕51号', channels: { manager: true } },
  ];

  return (
    <div className="flex-1 bg-white m-3 rounded-lg shadow-sm flex flex-col h-[calc(100vh-120px)] overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <h2 className="font-bold text-gray-800 text-lg">全行对公营销产品目录</h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索产品名称、编号..."
              className="pl-9 pr-4 py-1.5 text-xs border border-gray-200 rounded-full w-72 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-all">
            <Download size={14} /> 导出目录
          </button>
          <div className="w-[1px] h-6 bg-gray-200 mx-2"></div>
          <button onClick={onBack} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
            <ArrowLeft size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 bg-[#fcfcfc]">
        <div className="min-w-[1400px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full border-collapse text-[11px] text-center table-fixed">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th colSpan={20} className="py-4 text-sm tracking-widest uppercase">华夏银行对公营销产品分类归集表 (2024年第一版)</th>
              </tr>
              <tr className="bg-gray-100 text-gray-600 font-bold border-b border-gray-200">
                <th colSpan={10} className="border-r border-gray-200 py-3 text-left px-6">产品核心信息分类</th>
                <th colSpan={2} className="border-r border-gray-200 py-3">线下办理</th>
                <th colSpan={8} className="py-3">线上电子渠道</th>
              </tr>
              <tr className="bg-gray-50 text-gray-400 font-medium uppercase text-[9px] tracking-tighter">
                <th className="border border-gray-200 p-2 w-[40px]">序号</th>
                <th className="border border-gray-200 p-2 w-[100px]">一级分类</th><th className="border border-gray-200 p-2 w-[100px]">二级分类</th><th className="border border-gray-200 p-2 w-[100px]">三级分类</th><th className="border border-gray-200 p-2 w-[120px]">四级分类</th>
                <th className="border border-gray-200 p-2 w-[110px]">内部编号</th><th className="border border-gray-200 p-2 w-[100px]">管理部门</th><th className="border border-gray-200 p-2 w-[80px]">联系人</th><th className="border border-gray-200 p-2 w-[90px]">分机</th><th className="border border-gray-200 p-2">政策依据</th>
                <th className="border border-gray-200 p-2 w-[45px]">柜面</th><th className="border border-gray-200 p-2 w-[45px]">经办</th><th className="border border-gray-200 p-2 w-[45px]">自助</th><th className="border border-gray-200 p-2 w-[45px]">网银</th><th className="border border-gray-200 p-2 w-[45px]">直连</th>
                <th className="border border-gray-200 p-2 w-[45px]">手机</th><th className="border border-gray-200 p-2 w-[45px]">微信</th><th className="border border-gray-200 p-2 w-[45px]">电话</th><th className="border border-gray-200 p-2 w-[45px]">POS</th><th className="border border-gray-200 p-2 w-[45px]">平台</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="border border-gray-100 p-3 text-gray-400">{row.id}</td>
                  <td className="border border-gray-100 p-3 font-bold text-gray-700 whitespace-pre-line leading-relaxed">{row.l1 || '-'}</td>
                  <td className="border border-gray-100 p-3 text-gray-600 whitespace-pre-line leading-relaxed">{row.l2 || '-'}</td>
                  <td className="border border-gray-100 p-3 text-gray-600 whitespace-pre-line leading-relaxed">{row.l3 || '-'}</td>
                  <td className="border border-gray-100 p-3 text-blue-600 font-bold">{row.l4}</td>
                  <td className="border border-gray-100 p-3 font-mono text-gray-400 text-[9px]">{row.code}</td>
                  <td className="border border-gray-100 p-3 text-gray-600">{row.dept}</td>
                  <td className="border border-gray-100 p-3 text-gray-600 font-medium">{row.contact}</td>
                  <td className="border border-gray-100 p-3 text-gray-400">{row.phone}</td>
                  <td className="border border-gray-100 p-3 text-gray-400 text-left truncate italic" title={row.policy}>{row.policy}</td>
                  <td className="border border-gray-100 p-1">{row.channels.counter && <Check size={14} className="mx-auto text-emerald-500" />}</td>
                  <td className="border border-gray-100 p-1">{row.channels.manager && <Check size={14} className="mx-auto text-emerald-500" />}</td>
                  <td className="border border-gray-100 p-1"></td>
                  <td className="border border-gray-100 p-1">{row.channels.web && <Check size={14} className="mx-auto text-emerald-500" />}</td>
                  <td className="border border-gray-100 p-1">{row.channels.direct && <Check size={14} className="mx-auto text-emerald-500" />}</td>
                  <td className="border border-gray-100 p-1"></td><td className="border border-gray-100 p-1"></td><td className="border border-gray-100 p-1"></td><td className="border border-gray-100 p-1"></td><td className="border border-gray-100 p-1"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
