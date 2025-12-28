
import React, { useState } from 'react';
import { Plus, TrendingUp, DollarSign, Calendar, Activity, Database, Pencil, Trash2, X, Check } from 'lucide-react';
import { AnimalType, DemandLevel, MarketEntry, MarketLocation, ANIMALS, MARKETS, DEMAND_LEVELS } from '../types';
import { PriceChart } from './PriceChart';

interface DashboardProps {
  marketData: MarketEntry[];
  onAddEntry: (entry: Omit<MarketEntry, 'id'>) => void;
  onUpdateEntry: (entry: MarketEntry) => void;
  onDeleteEntry: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ marketData, onAddEntry, onUpdateEntry, onDeleteEntry }) => {
  const [formData, setFormData] = useState({
    id: '',
    animal: 'Goat' as AnimalType,
    market: 'Lodwar' as MarketLocation,
    price: '' as string,
    demand: 'Medium' as DemandLevel,
    date: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.price) return;

    if (isEditing) {
      onUpdateEntry({
        id: formData.id,
        animal: formData.animal,
        market: formData.market,
        price: parseInt(formData.price),
        demand: formData.demand,
        date: formData.date || new Date().toISOString().split('T')[0],
      });
      setIsEditing(false);
    } else {
      onAddEntry({
        animal: formData.animal,
        market: formData.market,
        price: parseInt(formData.price),
        demand: formData.demand,
        date: new Date().toISOString().split('T')[0],
      });
    }

    setFormData({ id: '', animal: 'Goat', market: 'Lodwar', price: '', demand: 'Medium', date: '' });
  };

  const handleEditClick = (entry: MarketEntry) => {
    setFormData({
      id: entry.id,
      animal: entry.animal,
      market: entry.market,
      price: entry.price.toString(),
      demand: entry.demand,
      date: entry.date,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({ id: '', animal: 'Goat', market: 'Lodwar', price: '', demand: 'Medium', date: '' });
  };

  const recentEntries = [...marketData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime() || b.id.localeCompare(a.id)
  ).slice(0, 10);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white overflow-y-auto scrollbar-hide">
      <div className="max-w-7xl w-full mx-auto p-4 lg:p-8 pb-20 lg:pb-8">
        <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Market Terminal</h1>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
              <Database size={14} /> Lodwar Regional Hub | Total Records: {marketData.length}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-green-500 bg-green-950/20 px-3 py-1.5 rounded-full border border-green-900/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>DATA FEED LIVE</span>
          </div>
        </header>

        {/* Analytics Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Activity size={16} className="text-turkana-accent" />
              Price Analytics
            </h2>
          </div>
          <PriceChart data={marketData} />
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Data Entry/Edit Form */}
          <div className={`xl:col-span-5 bg-slate-900 rounded-2xl p-6 border transition-all duration-300 shadow-xl relative overflow-hidden group ${
            isEditing ? 'border-turkana-accent ring-1 ring-turkana-accent/50' : 'border-slate-800'
          }`}>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               {isEditing ? <Pencil size={80} /> : <Plus size={80} />}
            </div>
            
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2 relative z-10">
              {isEditing ? (
                <><Pencil size={20} className="text-turkana-accent" /> Update Transaction</>
              ) : (
                <><Plus size={20} className="text-turkana-accent" /> Log New Transaction</>
              )}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">Livestock</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-turkana-accent focus:outline-none transition-all"
                    value={formData.animal}
                    onChange={e => setFormData({...formData, animal: e.target.value as AnimalType})}
                  >
                    {ANIMALS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">Market</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-turkana-accent focus:outline-none transition-all"
                    value={formData.market}
                    onChange={e => setFormData({...formData, market: e.target.value as MarketLocation})}
                  >
                    {MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">Price (KES)</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-3.5 text-slate-500" />
                  <input 
                    type="number" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:ring-2 focus:ring-turkana-accent focus:outline-none font-mono"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">Market Demand</label>
                <div className="flex gap-2">
                  {DEMAND_LEVELS.map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({...formData, demand: level})}
                      className={`flex-1 py-2.5 text-xs rounded-xl border transition-all ${
                        formData.demand === level 
                          ? 'bg-turkana-accent text-slate-950 border-turkana-accent font-bold shadow-lg shadow-turkana-accent/20' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={cancelEdit}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
                  >
                    <X size={18} />
                    CANCEL
                  </button>
                )}
                <button 
                  type="submit" 
                  className={`flex-[2] ${isEditing ? 'bg-turkana-accent text-slate-950' : 'bg-blue-600 text-white'} hover:opacity-90 font-bold py-4 rounded-xl transition-all shadow-xl shadow-black/30 flex justify-center items-center gap-2 active:scale-[0.98]`}
                >
                  {isEditing ? <Check size={18} /> : <TrendingUp size={18} />}
                  {isEditing ? 'SAVE CHANGES' : 'BROADCAST TO NETWORK'}
                </button>
              </div>
            </form>
          </div>

          {/* Table with CRUD Actions */}
          <div className="xl:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Calendar size={18} className="text-turkana-sky" />
                Latest Network Updates
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950/50 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Market Hub</th>
                    <th className="px-6 py-4">Livestock</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-center">Trend</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {recentEntries.map((entry) => (
                    <tr key={entry.id} className={`hover:bg-slate-800/30 transition-colors group ${formData.id === entry.id ? 'bg-turkana-accent/5' : ''}`}>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${formData.id === entry.id ? 'bg-turkana-accent border-turkana-accent text-slate-950' : 'bg-slate-800 text-turkana-sand border-slate-700'}`}>
                               {entry.market.charAt(0)}
                            </div>
                            <span className="font-medium text-slate-200">{entry.market}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{entry.animal}</td>
                      <td className="px-6 py-4 text-right font-mono text-turkana-accent font-bold">
                        {entry.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                          entry.demand === 'High' ? 'bg-green-950/50 text-green-400 border border-green-900' :
                          entry.demand === 'Medium' ? 'bg-yellow-950/50 text-yellow-400 border border-yellow-900' :
                          'bg-red-950/50 text-red-400 border border-red-900'
                        }`}>
                          {entry.demand}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 transition-opacity">
                          <button 
                            onClick={() => handleEditClick(entry)}
                            className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                            title="Edit Entry"
                          >
                            <Pencil size={14} />
                          </button>
                          <button 
                            onClick={() => onDeleteEntry(entry.id)}
                            className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Delete Entry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};