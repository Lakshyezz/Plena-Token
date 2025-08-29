import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, Plus, MoreHorizontal, X } from 'lucide-react';

const TokenPortfolio = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAddTokenModal, setShowAddTokenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [holdings, setHoldings] = useState({
    0: 0.0500,
    1: 2.5000,
    2: 2.5000,
    3: 0.0500,
    4: 2.5000,
    5: 15.0000,
  });
  const [tempHolding, setTempHolding] = useState('');
  
  const totalPages = 10;

  const trendingTokens = [
    { symbol: 'NOT', name: 'Not Coin', color: '#FFA500' },
    { symbol: 'ETH', name: 'Ethereum', color: '#627EEA' },
    { symbol: 'HYPE', name: 'Hyperliquid', color: '#7B3FF2' },
    { symbol: 'PIN', name: 'PinLink', color: '#00BFFF' },
    { symbol: 'SD', name: 'Stader', color: '#FF6B6B' },
    { symbol: 'PIN', name: 'PinLink', color: '#00BFFF' },
    { symbol: 'SD', name: 'Stader', color: '#FF6B6B' },
    { symbol: 'SD', name: 'Ethereum', color: '#627EEA' },
  ];
  
  const portfolioData = [
    { symbol: 'ETH', name: 'Ethereum', price: 43250.67, change: 2.30, sparkline: 'up', color: '#627EEA' },
    { symbol: 'BTC', name: 'Bitcoin', price: 2654.32, change: -1.20, sparkline: 'down', color: '#F7931A' },
    { symbol: 'SOL', name: 'Solana', price: 98.45, change: 4.70, sparkline: 'up', color: '#14F195' },
    { symbol: 'DOGE', name: 'Dogecoin', price: 43250.67, change: 2.30, sparkline: 'up', color: '#00D4FF' },
    { symbol: 'USDC', name: 'USDC', price: 2654.32, change: -1.20, sparkline: 'down', color: '#2775CA' },
    { symbol: 'XLM', name: 'Stellar', price: 98.45, change: 4.70, sparkline: 'up', color: '#5B6DEE' },
  ];

  const pieData = [
    { name: 'Bitcoin (BTC)', percentage: 21.0, color: '#F7931A' },
    { name: 'Ethereum (ETH)', percentage: 64.6, color: '#627EEA' },
    { name: 'Solana (SOL)', percentage: 14.4, color: '#14F195' },
    { name: 'Dogecoin (DOGE)', percentage: 14.4, color: '#00D4FF' },
    { name: 'USDC (USDC)', percentage: 14.4, color: '#2775CA' },
    { name: 'Solana (SOL)', percentage: 14.4, color: '#FF6B6B' },
  ];

  const handleEditStart = (index) => {
    setEditingIndex(index);
    setTempHolding(holdings[index].toFixed(4));
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const newValue = parseFloat(tempHolding) || 0;
      setHoldings({ ...holdings, [editingIndex]: newValue });
      setEditingIndex(null);
      setTempHolding('');
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setTempHolding('');
  };

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleEditHoldings = (index) => {
    setActiveMenu(null);
    handleEditStart(index);
  };

  const handleRemove = (index) => {
    setActiveMenu(null);
    // Handle remove logic here
    console.log('Remove token at index:', index);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.menu-container')) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggleToken = (token) => {
    setSelectedTokens(prev => {
      const exists = prev.find(t => t.symbol === token.symbol && t.name === token.name);
      if (exists) {
        return prev.filter(t => !(t.symbol === token.symbol && t.name === token.name));
      }
      return [...prev, token];
    });
  };

  const handleAddToWishlist = () => {
    // Handle adding selected tokens to wishlist
    console.log('Adding tokens to wishlist:', selectedTokens);
    setShowAddTokenModal(false);
    setSelectedTokens([]);
    setSearchQuery('');
  };

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
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#93FF00] rounded"></div>
          <h1 className="text-xl font-medium">Token Portfolio</h1>
        </div>
        <button className="bg-[#93FF00] text-black px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-[#84e600] transition-colors">
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
              {pieData.map((item, index) => (
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
            <span className="text-[#93FF00] text-2xl">⭐</span>
            <h2 className="text-xl font-medium">Watchlist</h2>
          </div>
          <div className="flex gap-3">
            <button className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
              <RefreshCw size={16} />
              Refresh Prices
            </button>
            <button className="bg-[#93FF00] text-black px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-[#84e600] transition-colors"
              onClick={() => setShowAddTokenModal(true)}>
              <Plus size={16} />
              Add Token
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-700 text-sm text-gray-400">
          <div className="col-span-3">Token</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">24h %</div>
          <div className="col-span-2">Sparkline (7d)</div>
          <div className="col-span-2">Holdings</div>
          <div className="col-span-1 text-right">Value</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-800">
          {portfolioData.map((token, index) => {
            const holding = holdings[index] || 0;
            const value = holding * token.price;
            
            return (
              <div key={index} className="grid grid-cols-12 gap-4 py-4 items-center">
                <div className="col-span-3 flex items-center gap-3">
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
                <div className="col-span-2 text-gray-300">${token.price.toLocaleString()}</div>
                <div className={`col-span-2 ${token.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {token.change > 0 ? '+' : ''}{token.change.toFixed(2)}%
                </div>
                <div className="col-span-2">
                  <Sparkline trend={token.sparkline} />
                </div>
                <div className="col-span-2">
                  {editingIndex === index ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={tempHolding}
                        onChange={(e) => setTempHolding(e.target.value)}
                        className="bg-transparent border border-[#93FF00] rounded px-2 py-1 text-sm w-24 outline-none focus:border-[#b4ff33] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        step="0.0001"
                        autoFocus
                      />
                      <button 
                        onClick={handleSave}
                        className="bg-[#93FF00] text-black px-3 py-1 rounded text-xs font-medium hover:bg-[#84e600] transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                      onClick={() => handleEditStart(index)}
                    >
                      {holding.toFixed(4)}
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex items-center justify-between">
                  <span className="text-gray-300">${value.toFixed(2)}</span>
                  <div className="relative menu-container">
                    <button 
                      className="text-gray-500 hover:text-white transition-colors ml-2 p-1"
                      onClick={() => handleMenuClick(index)}
                    >
                      <MoreHorizontal size={20} />
                    </button>
                    {activeMenu === index && (
                      <div className="absolute right-0 top-8 bg-[#2a2a2a] border border-gray-700 rounded-lg shadow-lg py-2 z-10 min-w-[160px]">
                        <button
                          onClick={() => handleEditHoldings(index)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#333333] w-full text-left transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit Holdings
                        </button>
                        <button
                          onClick={() => handleRemove(index)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[#333333] w-full text-left transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
                className="text-gray-500 hover:text-white disabled:text-gray-700 flex items-center transition-colors"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
                <span className="text-sm">Prev</span>
              </button>
              <button 
                className="text-gray-500 hover:text-white disabled:text-gray-700 flex items-center transition-colors"
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

      {/* Add Token Modal */}
      {showAddTokenModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-lg w-[500px] max-h-[600px] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-medium">Add Token</h2>
              <button 
                onClick={() => {
                  setShowAddTokenModal(false);
                  setSelectedTokens([]);
                  setSearchQuery('');
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-6 pb-4">
              <input
                type="text"
                placeholder="Search tokens (e.g., ETH, SOL)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Trending Section */}
            <div className="px-6 pb-4">
              <h3 className="text-sm text-gray-400 mb-3">Trending</h3>
              <div className="max-h-[320px] overflow-y-auto">
                <div className="space-y-2">
                  {trendingTokens.map((token, index) => {
                    const isSelected = selectedTokens.find(t => t.symbol === token.symbol && t.name === token.name);
                    return (
                      <div 
                        key={index}
                        className="flex items-center justify-between py-2 px-3 hover:bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors"
                        onClick={() => handleToggleToken(token)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: token.color }}
                          >
                            {token.symbol === 'ETH' && '⟠'}
                            {token.symbol === 'NOT' && 'N'}
                            {token.symbol === 'HYPE' && 'H'}
                            {token.symbol === 'PIN' && 'P'}
                            {token.symbol === 'SD' && 'S'}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{token.name}</div>
                            <div className="text-xs text-gray-500">({token.symbol})</div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'bg-[#93FF00] border-[#93FF00]' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}>
                          {isSelected && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setShowAddTokenModal(false);
                  setSelectedTokens([]);
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddToWishlist}
                disabled={selectedTokens.length === 0}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTokens.length > 0
                    ? 'bg-[#93FF00] text-black hover:bg-[#84e600]'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenPortfolio;