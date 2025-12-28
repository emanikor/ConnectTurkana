import { MarketEntry } from './types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const today = new Date();
const formatDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(today.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const INITIAL_MARKET_DATA: MarketEntry[] = [
  { id: generateId(), date: formatDate(6), animal: 'Goat', market: 'Lodwar', price: 5500, demand: 'Medium' },
  { id: generateId(), date: formatDate(5), animal: 'Goat', market: 'Lodwar', price: 5600, demand: 'High' },
  { id: generateId(), date: formatDate(4), animal: 'Goat', market: 'Lodwar', price: 5400, demand: 'Medium' },
  { id: generateId(), date: formatDate(3), animal: 'Goat', market: 'Lodwar', price: 5800, demand: 'High' },
  { id: generateId(), date: formatDate(2), animal: 'Goat', market: 'Lodwar', price: 6000, demand: 'High' },
  { id: generateId(), date: formatDate(1), animal: 'Goat', market: 'Lodwar', price: 5900, demand: 'Medium' },
  { id: generateId(), date: formatDate(0), animal: 'Goat', market: 'Lodwar', price: 6100, demand: 'High' },
  
  { id: generateId(), date: formatDate(0), animal: 'Camel', market: 'Kakuma', price: 45000, demand: 'Medium' },
  { id: generateId(), date: formatDate(0), animal: 'Cattle', market: 'Lokichar', price: 25000, demand: 'Low' },
  { id: generateId(), date: formatDate(1), animal: 'Sheep', market: 'Lodwar', price: 4000, demand: 'Medium' },
];
