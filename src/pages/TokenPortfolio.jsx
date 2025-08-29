import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, Plus, MoreHorizontal } from 'lucide-react';

const TokenPortfolio = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  
  const portfolioData = [
    { symbol: 'ETH', name: 'Ethereum', price: 43250.67, change: 2.30, holdings: 0.0500, value: 2162.53, sparkline: 'up', color: '#627EEA' },
    { symbol: 'BTC', name: 'Bitcoin', price: 2654.32, change: -1.20, holdings: 2.5000, value: 6635.80, sparkline: 'down', color: '#F7931A' },
    { symbol: 'SOL', name: 'Solana', price: 98.45, change: 4.70, holdings: 2.5000, value: 1476.75, sparkline: 'up', color: '#14F195' },
    { symbol: 'DOGE', name: 'Dogecoin', price: 43250.67, change: 2.30, holdings: 0.0500, value: 2162.53, sparkline: 'up', color: '#00D4FF' },
    { symbol: 'USDC', name: 'USDC', price: 2654.32, change: -1.20, holdings: 2.5000, value: 6635.80, sparkline: 'down', color: '#2775CA' },
    { symbol: 'XLM', name: 'Stellar', price: 98.45, change: 4.70, holdings: 15.0000, value: 1476.75, sparkline: 'up', color: '#5B6DEE' },
  ];

  const pieData = [
    { name: 'Bitcoin (BTC)', percentage: 21.0, color: '#F7931A' },
    { name: 'Ethereum (ETH)', percentage: 64.6, color: '#627EEA' },
    { name: 'Solana (SOL)', percentage: 14.4, color: '#14F195' },
    { name: 'Dogecoin (DOGE)', percentage: 14.4, color: '#00D4FF' },
    { name: 'Solana (SOL)', percentage: 14.4, color: '#9945FF' },
    { name: 'Solana (SOL)', percentage: 14.4, color: '#FF6B6B' },
  ];

  const Sparkline = ({ trend }) => {
    const points = trend === 'up' 
      ? "M0,20 L5,18 L10,15 L15,17 L20,14 L25,12 L30,10 L35,8 L40,5"
      : "M0,5 L5,7 L10,10 L15,8 L20,14 L25,17 L30,15 L35,18 L40,20";
    
    return (
      <svg width="50" height="25" className="inline-block">
        <polyline
          fill="none"
          stroke={trend === 'up' ? '#10B981' : '#EF4444'}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  const PieChart = () => {
    let cumulativePercentage = 0;
    const radius = 40;
    const strokeWidth = 15;
    
    return (
      <svg width="120" height="120" viewBox="0 0 120 120">
        {pieData.map((segment, index) => {
          const startAngle = (cumulativePercentage * 360) / 100;
          const endAngle = ((cumulativePercentage + segment.percentage) * 360) / 100;
          cumulativePercentage += segment.percentage;
          
          const startAngleRad = (startAngle * Math.PI) / 180;
          const endAngleRad = (endAngle * Math.PI) / 180;
          
          const x1 = 60 + radius * Math.cos(startAngleRad);
          const y1 = 60 + radius * Math.sin(startAngleRad);
          const x2 = 60 + radius * Math.cos(endAngleRad);
          const y2 = 60 + radius * Math.sin(endAngleRad);
          
          const largeArcFlag = segment.percentage > 50 ? 1 : 0;
          
          const pathData = [
            `M ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
          ].join(' ');
          
          return (
            <path
              key={index}
              d={pathData}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-10 rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#93FF00] rounded"></div>
          <h1 className="text-xl font-medium">Token Portfolio</h1>
        </div>
        <button className="bg-[#93FF00] text-black px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
          <span className="text-lg">🔌</span> Connect Wallet
        </button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Total Value */}
        <div>
          <h2 className="text-gray-400 text-sm mb-4">Portfolio Total</h2>
          <div className="text-5xl font-light">$10,275.08</div>
          <div className="text-gray-500 text-sm mt-4">Last updated: 3:42:12 PM</div>
        </div>

        {/* Pie Chart and Breakdown */}
        <div>
          <h2 className="text-gray-400 text-sm mb-4">Portfolio Total</h2>
          <div className="flex items-center gap-8">
            <PieChart />
            <div className="space-y-2">
              {pieData.slice(0, 6).map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-gray-400 ml-8">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Watchlist */}
      <div className="bg-[#222222] rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <h2 className="text-xl font-medium">Watchlist</h2>
          </div>
          <div className="flex gap-3">
            <button className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
              <RefreshCw size={16} />
              Refresh Prices
            </button>
            <button className="bg-[#93FF00] text-black px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
              <Plus size={16} />
              Add Token
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 pb-3 border-b border-gray-700 text-sm text-gray-400">
          <div>Token</div>
          <div>Price</div>
          <div>24h %</div>
          <div>Sparkline (7d)</div>
          <div>Holdings</div>
          <div className="text-right">Value</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-800">
          {portfolioData.map((token, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 py-4 items-center">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: token.color }}
                >
                  {token.symbol === 'ETH' && '⟠'}
                  {token.symbol === 'BTC' && '₿'}
                  {token.symbol === 'SOL' && 'S'}
                  {token.symbol === 'DOGE' && 'Ð'}
                  {token.symbol === 'USDC' && '$'}
                  {token.symbol === 'XLM' && '✦'}
                </div>
                <div>
                  <div className="font-medium">{token.name}</div>
                  <div className="text-xs text-gray-500">({token.symbol})</div>
                </div>
              </div>
              <div className="text-gray-300">${token.price.toLocaleString()}</div>
              <div className={token.change > 0 ? 'text-green-500' : 'text-red-500'}>
                {token.change > 0 ? '+' : ''}{token.change.toFixed(2)}%
              </div>
              <div>
                <Sparkline trend={token.sparkline} />
              </div>
              <div className="text-gray-300">{token.holdings.toFixed(4)}</div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">${token.value.toLocaleString()}</span>
                <button className="text-gray-500 hover:text-white">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            1 — 10 of 100 results
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">1 of {totalPages} pages</span>
            <div className="flex gap-2">
              <button 
                className="text-gray-500 hover:text-white disabled:text-gray-700"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
                <span className="text-sm">Prev</span>
              </button>
              <button 
                className="text-gray-500 hover:text-white disabled:text-gray-700"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <span className="text-sm">Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPortfolio;