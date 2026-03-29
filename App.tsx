import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { PhoneSimulator } from './components/PhoneSimulator';
import { Sidebar } from './components/Sidebar';
import { LoginForm } from './components/LoginForm';
import { useAuth } from './components/Context/AuthContext';
import { loginUser } from './components/services/auth';
import { getPrices, postPrice, deletePrice } from './components/services/prices';
import { UserProfile } from './components/UserProfile';
import { MarketEntry, User } from './types';
import { BarChart3, Settings, Info, AlertCircle } from 'lucide-react';

type TabType = 'dashboard' | 'simulator' | 'reports' | 'settings' | 'about' | 'profile';

const App: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketEntry[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [loadingPrices, setLoadingPrices] = useState(false);

  const { login, logout: authLogout, token } = useAuth();

  // Fetch prices when user logs in
  useEffect(() => {
    if (user) {
      fetchPrices();
    }
  }, [user]);

  const fetchPrices = async () => {
    setLoadingPrices(true);
    try {
      const prices = await getPrices();
      // Map MongoDB prices to MarketEntry format
      const mapped = prices.map((p: any) => ({
        id:       p._id,
        animal:   p.animal,
        market:   p.market,
        price:    p.price,
        demand:   p.demand,
        officer:  p.entered_by_name,
        date:     p.created_at
      }));
      setMarketData(mapped);
    } catch (err) {
      console.error('Failed to fetch prices:', err);
    } finally {
      setLoadingPrices(false);
    }
  };

  const handleLogin = async (phone: string, password: string) => {
    try {
      const data = await loginUser({ phone, password });

      if (data.user.role !== 'admin' && data.user.role !== 'officer') {
        alert('Access denied. This terminal is for authorized officers only.');
        return;
      }

      login(data);
      setUser(data.user);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to terminate this terminal session?')) {
      authLogout();
      setUser(null);
      setActiveTab('dashboard');
    }
  };

  const handleAddEntry = async (newEntry: Omit<MarketEntry, 'id'>) => {
    try {
      const saved = await postPrice(
        {
          animal: newEntry.animal,
          market: newEntry.market,
          price:  newEntry.price,
          demand: newEntry.demand
        },
        token!
      );
      // Add to local state immediately
      setMarketData(prev => [{
        id:      saved._id,
        animal:  saved.animal,
        market:  saved.market,
        price:   saved.price,
        demand:  saved.demand,
        officer: saved.entered_by_name,
        date:    saved.created_at
      }, ...prev]);
    } catch (err: any) {
      alert('Failed to save price: ' + err.message);
    }
  };

  const handleUpdateEntry = (updatedEntry: MarketEntry) => {
    setMarketData(prev =>
      prev.map(item => item.id === updatedEntry.id ? updatedEntry : item)
    );
  };

  const handleDeleteEntry = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this record from the network?')) {
      try {
        await deletePrice(id, token!);
        setMarketData(prev => prev.filter(item => item.id !== id));
      } catch (err: any) {
        alert('Failed to delete: ' + err.message);
      }
    }
  };

  const renderContent = () => {
    if (!user) {
      return <LoginForm onLogin={handleLogin} />;
    }

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
      case 'profile':
        return <UserProfile user={user} onLogout={handleLogout} />;
      case 'reports':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-950">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
              <BarChart3 size={32} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Regional Market Reports</h2>
            <p className="text-slate-400 max-w-md">
              Generating aggregate data for Turkana West, South, and North. Advanced visualization
              module is currently syncing with the main database.
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
      {user && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          user={user}
        />
      )}
      <main className="flex-1 h-full overflow-hidden pb-16 lg:pb-0 relative">
        {loadingPrices ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-turkana-accent/30 border-t-turkana-accent rounded-full animate-spin" />
          </div>
        ) : (
          renderContent()
        )}
        {user && (
          <div className="absolute top-4 right-4 z-40 hidden md:flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-full shadow-2xl">
            <AlertCircle size={14} className="text-turkana-accent" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Drought Watch: Turkana North Moderate Risk
            </span>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;