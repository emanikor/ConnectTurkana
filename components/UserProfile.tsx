
import React from 'react';
import { User as UserType } from '../types';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  Shield, 
  Calendar, 
  Activity, 
  Key,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface UserProfileProps {
  user: UserType;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const stats = [
    { label: 'Broadcasts', value: '142', icon: Activity, color: 'text-blue-400' },
    { label: 'Markets', value: '3', icon: MapPin, color: 'text-turkana-accent' },
    { label: 'Security', value: 'Level 2', icon: Shield, color: 'text-emerald-400' },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto h-full overflow-y-auto scrollbar-hide">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Terminal Profile</h2>
          <p className="text-slate-500 text-sm">Manage your session and credentials</p>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-sm font-medium transition-all"
        >
          <LogOut size={16} />
          Terminate Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-turkana-accent" />
            
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center overflow-hidden mx-auto shadow-2xl">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={40} className="text-slate-600" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-slate-900 rounded-full" />
            </div>

            <h3 className="text-xl font-bold text-white">{user.name}</h3>
            <p className="text-turkana-accent text-xs font-bold uppercase tracking-widest mt-1">{user.role}</p>
            
            <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-slate-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-slate-500" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Calendar size={16} className="text-slate-500" />
                <span>Joined Oct 2023</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">System Stats</h4>
            <div className="space-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-slate-800 rounded-lg ${stat.color}`}>
                      <stat.icon size={16} />
                    </div>
                    <span className="text-sm text-slate-400">{stat.label}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings & Security */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Key size={16} className="text-turkana-accent" /> Security Settings
              </h4>
            </div>
            <div className="divide-y divide-slate-800">
              {[
                { title: 'Change Access Key', desc: 'Update your terminal login password', icon: Key },
                { title: 'Two-Factor Auth', desc: 'Secure your account with SMS verification', icon: Shield, status: 'Disabled' },
                { title: 'Session History', desc: 'View recent terminal access logs', icon: Activity },
              ].map((item) => (
                <button key={item.title} className="w-full p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors group">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 group-hover:text-turkana-accent transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.status && <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-500 rounded-full uppercase tracking-widest">{item.status}</span>}
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-turkana-accent/5 border border-turkana-accent/10 rounded-3xl p-6">
            <h4 className="text-sm font-bold text-turkana-accent mb-2">Notice to Market Masters</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your terminal access is monitored by the Turkana County Logistics Department. 
              Ensure all price broadcasts are verified before transmission to the bush network. 
              Unauthorized access or data manipulation will result in immediate terminal suspension.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
