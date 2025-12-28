import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { MarketEntry } from '../types';

interface PriceChartProps {
  data: MarketEntry[];
}

export const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  // Filter for Goats in Lodwar (as a benchmark) and sort by date
  const chartData = data
    .filter(d => d.animal === 'Goat' && d.market === 'Lodwar')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7); // Last 7 entries

  return (
    <div className="h-64 w-full bg-slate-800/50 rounded-lg p-4 border border-slate-700">
      <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center justify-between">
        <span>Goat Price Trend (Lodwar - Last 7 Days)</span>
        <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 rounded border border-green-800">Live Data</span>
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8" 
            tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { weekday: 'short' })}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
            itemStyle={{ color: '#87CEEB' }}
            formatter={(value: number) => [`KES ${value.toLocaleString()}`, 'Price']}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#F59E0B" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
