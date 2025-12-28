export type AnimalType = 'Goat' | 'Camel' | 'Cattle' | 'Sheep';
export type MarketLocation = 'Lodwar' | 'Kakuma' | 'Lokichar';
export type DemandLevel = 'High' | 'Medium' | 'Low';

export interface MarketEntry {
  id: string;
  date: string;
  animal: AnimalType;
  market: MarketLocation;
  price: number;
  demand: DemandLevel;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'system';
  text: string;
  timestamp: Date;
}

export const ANIMALS: AnimalType[] = ['Goat', 'Camel', 'Cattle', 'Sheep'];
export const MARKETS: MarketLocation[] = ['Lodwar', 'Kakuma', 'Lokichar'];
export const DEMAND_LEVELS: DemandLevel[] = ['High', 'Medium', 'Low'];
