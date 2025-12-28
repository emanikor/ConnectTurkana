import React, { useState, useRef, useEffect } from 'react';
import { Send, Signal, Wifi, Battery, ChevronLeft, MoreVertical, Phone } from 'lucide-react';
import { MarketEntry, ChatMessage, ANIMALS, MARKETS } from '../types';

interface PhoneSimulatorProps {
  marketData: MarketEntry[];
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({ marketData }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'system',
      text: 'Mifugo Connect SMS Service\n\nCommands:\n1. [ANIMAL] [TOWN] (e.g., "GOAT LODWAR")\n2. "DROUGHT" for alerts.',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processCommand = (text: string) => {
    const cleanText = text.toUpperCase().trim();
    let responseText = '';

    if (cleanText.includes("DROUGHT")) {
      // Analyze drought impact (mock logic based on prompt)
      responseText = "⚠️ WARNING: Surface water levels critical in Kibish & Turkana North. Pasture condition: POOR. Rec: Sell mature stock now. Buy hay.";
    } else {
      // Parse animal and market
      const foundAnimal = ANIMALS.find(a => cleanText.includes(a.toUpperCase()));
      const foundMarket = MARKETS.find(m => cleanText.includes(m.toUpperCase()));

      if (foundAnimal && foundMarket) {
        // Find latest data
        const entries = marketData.filter(
          entry => entry.animal === foundAnimal && entry.market === foundMarket
        );
        
        // Sort by date descending
        const latestEntry = entries.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];

        if (latestEntry) {
          responseText = `Leo: ${latestEntry.animal} at ${latestEntry.market} is KES ${latestEntry.price.toLocaleString()}. Demand: ${latestEntry.demand.toUpperCase()}. Date: ${latestEntry.date}`;
        } else {
          responseText = `No recent data found for ${foundAnimal} in ${foundMarket}.`;
        }
      } else if (foundAnimal && !foundMarket) {
        responseText = `Please specify a market for ${foundAnimal}. Example: "${foundAnimal.toUpperCase()} LODWAR"`;
      } else if (!foundAnimal && foundMarket) {
        responseText = `Please specify an animal for ${foundMarket}. Example: "GOAT ${foundMarket.toUpperCase()}"`;
      } else {
        responseText = "Invalid command. Try 'GOAT LODWAR' or 'DROUGHT'.";
      }
    }

    // Add system response with a slight delay to simulate network
    setTimeout(() => {
      const systemMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'system',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, systemMsg]);
    }, 600);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const command = input;
    setInput('');
    processCommand(command);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-slate-900">
      {/* Phone Frame */}
      <div className="relative w-[340px] h-[680px] bg-gray-800 rounded-[3rem] border-8 border-gray-700 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Notch/Camera Area */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-700 rounded-b-xl z-20"></div>

        {/* Status Bar */}
        <div className="bg-gray-900 text-white px-6 pt-3 pb-1 flex justify-between items-center text-xs z-10">
          <span className="font-mono">09:41</span>
          <div className="flex items-center space-x-1">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
          </div>
        </div>

        {/* App Header (Fake WhatsApp/SMS App) */}
        <div className="bg-[#075E54] p-3 flex items-center text-white shadow-md z-10">
          <ChevronLeft size={24} />
          <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-[#075E54] font-bold ml-1 mr-2">
            M
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">Mifugo Info Service</h3>
            <p className="text-[10px] text-gray-200">Online</p>
          </div>
          <div className="flex space-x-3">
            <Phone size={18} />
            <MoreVertical size={18} />
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-[#ECE5DD] overflow-y-auto p-4 flex flex-col space-y-3 relative">
          {/* Background Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" 
               style={{backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`max-w-[80%] p-2 rounded-lg text-sm shadow-sm relative ${
                msg.sender === 'user' 
                  ? 'bg-[#DCF8C6] self-end rounded-tr-none text-gray-800' 
                  : 'bg-white self-start rounded-tl-none text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'user' ? 'text-green-800' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                {msg.sender === 'user' && <span className="ml-1 text-blue-500">✓✓</span>}
              </span>
              
              {/* Message tail triangle */}
              <div className={`absolute top-0 w-0 h-0 border-[6px] border-transparent ${
                 msg.sender === 'user' 
                 ? 'right-[-6px] border-t-[#DCF8C6]' 
                 : 'left-[-6px] border-t-white'
              }`}></div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="bg-gray-100 p-2 flex items-center space-x-2 z-10">
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-800 shadow-inner flex items-center border border-gray-300">
            <input 
              type="text" 
              className="w-full bg-transparent outline-none placeholder-gray-400"
              placeholder="Type GOAT LODWAR..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="bg-[#128C7E] w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
            disabled={!input.trim()}
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </form>

        {/* Home Bar */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-500 rounded-full z-20"></div>
      </div>
      
      <p className="mt-6 text-slate-500 text-sm font-mono text-center max-w-[300px]">
        "The Bush Interface"<br/>
        Simulating pastoralist access via low-tech feature phones.
      </p>
    </div>
  );
};
