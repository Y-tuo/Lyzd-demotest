
import React, { useState } from 'react';
import { Header } from './components/Header';
import { SubHeader } from './components/SubHeader';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { IndicatorList } from './components/IndicatorList';
import { IndicatorSearch } from './components/IndicatorSearch';
import { IndicatorDetail } from './components/IndicatorDetail';
import { ProductCatalog } from './components/ProductCatalog';
import { IndicatorSpace } from './components/IndicatorSpace';
import { ClientScope } from './components/ClientScope';
import { CurrencyScope } from './components/CurrencyScope';
import { OrgScope } from './components/OrgScope';
import { GLScope } from './components/GLScope';

export type ViewType =
  | 'home'
  | 'indicator-list'
  | 'indicator-search'
  | 'indicator-detail'
  | 'product-catalog'
  | 'indicator-space'
  | 'client-scope'
  | 'currency-scope'
  | 'org-scope'
  | 'gl-scope';

export interface Tab {
  id: string;
  view: ViewType;
  title: string;
  params?: any;
  returnView?: ViewType;
}

const PORTAL_VIEWS: ViewType[] = ['home', 'indicator-list', 'indicator-search'];
const ATTRIBUTE_VIEWS: ViewType[] = ['product-catalog', 'client-scope', 'currency-scope', 'org-scope', 'gl-scope'];

function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'portal', view: 'home', title: '指标平台' }
  ]);
  const [activeTabId, setActiveTabId] = useState('portal');
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0] || { id: 'portal', view: 'home', title: '指标平台' };

  const navigate = (view: ViewType, title: string, params?: any) => {
    if (view === 'indicator-space') {
      setTabs(prev => prev.map(t =>
        t.id === activeTabId
          ? { ...t, returnView: t.view, view: 'indicator-space' }
          : t
      ));
      return;
    }

    let tabId: string;
    let tabTitle = title;

    if (PORTAL_VIEWS.includes(view)) {
      tabId = 'portal';
      tabTitle = '指标平台';
    } else if (view === 'indicator-detail') {
      tabId = `detail-${params?.name || 'unknown'}`;
      tabTitle = `详情: ${params?.name || '指标'}`;
    } else if (ATTRIBUTE_VIEWS.includes(view)) {
      tabId = view;
      tabTitle = title;
    } else {
      tabId = view;
      tabTitle = title;
    }

    setTabs(prev => {
      const existingIndex = prev.findIndex(t => t.id === tabId);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], view, params, title: tabTitle };
        return updated;
      }
      return [...prev, { id: tabId, view, title: tabTitle, params }];
    });

    setActiveTabId(tabId);
  };

  const handleInnerBack = () => {
    if (activeTab.view === 'indicator-space' && activeTab.returnView) {
      setTabs(prev => prev.map(t =>
        t.id === activeTabId
          ? { ...t, view: t.returnView!, returnView: undefined }
          : t
      ));
    }
  };

  const closeTab = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (id === 'portal') return;

    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);

    if (activeTabId === id) {
      const closedIndex = tabs.findIndex(t => t.id === id);
      const nextTab = newTabs[closedIndex - 1] || newTabs[0];
      setActiveTabId(nextTab.id);
    }
  };

  const handleSearch = (term: string) => {
    if (term.trim() === '指标空间') {
      navigate('indicator-space', '指标空间');
    } else {
      setGlobalSearchTerm(term);
      navigate('indicator-search', '指标平台', { term });
    }
  };

  const hideSidebar = activeTab.view === 'indicator-detail';

  return (
    <div className="flex flex-col h-screen bg-[#f0f2f5] min-w-[1024px] overflow-hidden font-sans">
      <Header
        currentView={activeTab.id === 'portal' ? activeTab.view : activeTab.view}
        setCurrentView={(view) => {
          if (view === 'home') navigate('home', '指标平台');
          else if (view === 'indicator-list') navigate('indicator-list', '指标平台');
        }}
      />
      <SubHeader
        tabs={tabs}
        activeTabId={activeTabId}
        onSwitch={setActiveTabId}
        onClose={closeTab}
      />

      <div className="flex flex-1 overflow-hidden">
        {!hideSidebar && (
          <Sidebar
            currentView={activeTab.view}
            onChangeView={(view, title) => navigate(view, title || '新页签')}
          />
        )}

        <div className="flex-1 flex flex-col min-w-0">
          {activeTab.view === 'home' && <MainContent onSearch={handleSearch} />}

          {activeTab.view === 'indicator-list' && (
            <IndicatorList onViewDetail={(name) => navigate('indicator-detail', name, { name })} />
          )}

          {activeTab.view === 'indicator-search' && (
            <IndicatorSearch
              initialSearchTerm={activeTab.params?.term || globalSearchTerm}
              onViewDetail={(name) => navigate('indicator-detail', name, { name })}
            />
          )}

          {activeTab.view === 'indicator-detail' && (
            <IndicatorDetail
              title={activeTab.params?.name || '指标详情'}
              onViewProductCatalog={() => navigate('product-catalog', '产品目录')}
              onViewClientScope={() => navigate('client-scope', '客户范围')}
              onViewCurrencyScope={() => navigate('currency-scope', '币种范围')}
              onViewIndicatorSpace={() => navigate('indicator-space', '指标空间')}
            />
          )}

          {activeTab.view === 'product-catalog' && <ProductCatalog onBack={() => closeTab('product-catalog')} />}
          {activeTab.view === 'client-scope' && <ClientScope onBack={() => closeTab('client-scope')} />}
          {activeTab.view === 'currency-scope' && <CurrencyScope onBack={() => closeTab('currency-scope')} />}
          {activeTab.view === 'org-scope' && <OrgScope onBack={() => closeTab('org-scope')} />}
          {activeTab.view === 'gl-scope' && <GLScope onBack={() => closeTab('gl-scope')} />}

          {activeTab.view === 'indicator-space' && (
            <IndicatorSpace onBack={handleInnerBack} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
