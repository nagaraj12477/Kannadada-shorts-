import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { MOCK_STOCKS } from '../constants';
import { motion } from 'motion/react';

export default function FinanceSection() {
  // Use mock data for now
  const stocks = MOCK_STOCKS;

  return (
    <div className="h-full w-full bg-slate-950 text-white flex flex-col pt-4 overflow-y-auto px-4 pb-24" id="finance-section">
      <div className="flex justify-between items-center mb-6 px-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 italic">Finance / ಹಣಕಾಸು</h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Real-time NSE/BSE Updates</p>
        </div>
        <button className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-red-500 transition-colors">
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stocks.map((stock, i) => (
          <motion.div 
            key={stock.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4"
            id={`stock-card-${stock.symbol}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-slate-100">{stock.symbol}</h3>
                <p className="text-xs text-slate-500">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-mono font-bold">₹{stock.price.toFixed(2)}</p>
                <div className={`flex items-center justify-end gap-1 text-sm ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stock.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span>{Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)</span>
                </div>
              </div>
            </div>

            {/* Micro Chart */}
            <div className="h-16 w-full opacity-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={new Array(10).fill(0).map((_, i) => ({ value: stock.price + (Math.random() * 20 - 10) }))}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={stock.change >= 0 ? "#10b981" : "#ef4444"} 
                    strokeWidth={2} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-red-950/20 border border-red-900/30 rounded-2xl">
          <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
             <TrendingUp size={16} /> Trending Market News
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            ಬ್ಯಾಂಕ್ ಆಫ್ ಬರೋಡಾ ನಿವ್ವಳ ಲಾಭದಲ್ಲಿ 20% ಏರಿಕೆ ಕಂಡುಬಂದಿದೆ. ಮುಂಬರುವ ಆರ್ಥಿಕ ನೀತಿ ಪರಾಮರ್ಶೆಯತ್ತ ಮಾರುಕಟ್ಟೆ ಕಣ್ಣು ಇಟ್ಟಿದೆ.
          </p>
      </div>
    </div>
  );
}
