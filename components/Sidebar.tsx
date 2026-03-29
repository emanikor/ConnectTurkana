
import React from 'react';
import { User as UserType } from '../types';
import { 
  LayoutDashboard, 
  Smartphone, 
  BarChart3, 
  Settings, 
  Info,
  LogOut,
  User as UserIcon
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onLogout: () => void;
  user: UserType;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, user }) => {
  const navItems = [
    { id: 'dashboard', label: 'Market Terminal', icon: LayoutDashboard },
    { id: 'simulator', label: 'Bush Link', icon: Smartphone },
    { id: 'reports', label: 'Regional Reports', icon: BarChart3 },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-full bg-slate-900 border-r border-slate-800 shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-turkana-accent rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-xl italic">M</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              MIFUGO<span className="text-turkana-accent">CONNECT</span>
            </h1>
          </div>

          <nav className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Main Menu</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  activeTab === item.id
                    ? 'bg-slate-800 text-turkana-accent shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <item.icon size={18} className={activeTab === item.id ? 'text-turkana-accent' : 'text-slate-500 group-hover:text-slate-300'} />
                {item.label}
                {activeTab === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-turkana-accent shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800/50">
          <nav className="space-y-1">
            {bottomItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'text-turkana-accent'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400/70 hover:text-red-400 transition-all mt-4"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full mt-6 p-3 bg-slate-800/40 rounded-xl border transition-all text-left ${
              activeTab === 'profile' ? 'border-turkana-accent bg-slate-800' : 'border-slate-700/50 hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <UserIcon size={16} className="text-slate-400" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{user.name}</p>
                <p className="text-[10px] text-slate-500">{user.location}</p>
              </div>
            </div>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        {[...navItems, { id: 'profile', label: 'Profile', icon: UserIcon }, { id: 'settings', label: 'Settings', icon: Settings }].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === item.id ? 'text-turkana-accent' : 'text-slate-500'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </>
  );
};
