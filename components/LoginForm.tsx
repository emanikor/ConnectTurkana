import React, { useState } from 'react';
import { Phone, Lock, LogIn, ShieldCheck, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onLogin: (phone: string, password: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!phone || !password) {
      setError('Please enter both phone number and password');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(phone, password);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-turkana-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-turkana-accent rounded-2xl mb-4 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <span className="text-slate-900 font-black text-3xl italic">M</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            MIFUGO<span className="text-turkana-accent">CONNECT</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Market Terminal Access • Turkana County</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-slate-800">
            <ShieldCheck className="text-turkana-accent" size={20} />
            <h2 className="text-lg font-semibold text-white">Authorized Personnel Only</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-turkana-accent transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-turkana-accent/50 focus:ring-1 focus:ring-turkana-accent/20 transition-all"
                  placeholder="0712345678"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Access Key
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-turkana-accent transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-turkana-accent/50 focus:ring-1 focus:ring-turkana-accent/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-turkana-accent hover:bg-amber-500 text-slate-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(245,158,11,0.15)]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Establish Connection
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              Forgot your terminal access key? <br />
              <button className="text-turkana-accent hover:underline mt-1">
                Contact IT Support (Lodwar HQ)
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          <span>Secure Node: 04-LW</span>
          <div className="w-1 h-1 bg-slate-800 rounded-full" />
          <span>Encrypted Session</span>
          <div className="w-1 h-1 bg-slate-800 rounded-full" />
          <span>v2.4.0</span>
        </div>
      </div>
    </div>
  );
};