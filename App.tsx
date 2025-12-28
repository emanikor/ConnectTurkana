
import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PhoneSimulator } from './components/PhoneSimulator';
import { Sidebar } from './components/Sidebar';
import { MarketEntry } from './types';
import { INITIAL_MARKET_DATA } from './constants';
import { BarChart3, Settings, Info, AlertCircle } from 'lucide-react';

type TabType = 'dashboard' | 'simulator' | 'reports' | 'settings' | 'about';

const App: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketEntry[]>(INITIAL_MARKET_DATA);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const handleAddEntry = (newEntry: Omit<MarketEntry, 'id'>) => {
    const entry: MarketEntry = {
      ...newEntry,
      id: Math.random().toString(36).substr(2, 9),
    };
    setMarketData(prev => [entry, ...prev]);
  };

  const handleUpdateEntry = (updatedEntry: MarketEntry) => {
    setMarketData(prev => prev.map(item => item.id === updatedEntry.id ? updatedEntry : item));
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to remove this record from the network?')) {
      setMarketData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            marketData={marketData} 
            onAddEntry={handleAddEntry} 
            onUpdateEntry={handleUpdateEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        );
      case 'simulator':
        return <PhoneSimulator marketData={marketData} />;
      case 'reports':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-950">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
              <BarChart3 size={32} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Regional Market Reports</h2>
            <p className="text-slate-400 max-w-md">
              Generating aggregate data for Turkana West, South, and North. Advanced visualization module is currently syncing with the main database.
            </p>
            <div className="mt-8 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-500">
              SYNC_STATUS: 84% COMPLETE
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="text-slate-400" /> Terminal Configuration
            </h2>
            <div className="space-y-4">
              {['SMS Gateway API', 'Database Synchronization', 'User Permissions', 'Localization (Ngaturkana)'].map(setting => (
                <div key={setting} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-slate-300">{setting}</span>
                  <div className="w-10 h-5 bg-slate-700 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-slate-400 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="p-8 max-w-2xl mx-auto space-y-8">
            <div className="bg-turkana-accent/10 border border-turkana-accent/20 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-turkana-accent mb-4 flex items-center gap-2">
                <Info /> Mifugo Connect
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Mifugo Connect is a bridge between modern logistics and traditional pastoralism. 
                Built specifically for the unique environment of Turkana County, it allows Market Masters 
                in commercial hubs to broadcast prices to nomadic pastoralists using nothing but basic SMS technology.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Developed for</h4>
                  <p className="text-white font-medium">Turkana County Gov.</p>
               </div>
               <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">System Version</h4>
                  <p className="text-white font-medium">v2.4.0-Stable</p>
               </div>
            </div>
          </div>
        );
      default:
        return (
          <Dashboard 
            marketData={marketData} 
            onAddEntry={handleAddEntry} 
            onUpdateEntry={handleUpdateEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        );
    }
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden pb-16 lg:pb-0 relative">
        {renderContent()}
        
        {/* Global System Alert Banner (Decorative/Functional) */}
        <div className="absolute top-4 right-4 z-40 hidden md:flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-full shadow-2xl">
          <AlertCircle size={14} className="text-turkana-accent" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Drought Watch: Turkana North Moderate Risk</span>
        </div>
      </main>
    </div>
  );
};

export default App;