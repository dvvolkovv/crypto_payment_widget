import React from 'react';
import { CryptoOption } from './PaymentWidget';

interface CryptoSelectorProps {
  cryptoOptions: CryptoOption[];
  onSelect: (crypto: CryptoOption) => void;
}

const getCryptoIcon = (symbol: string): string => {
  const icons: { [key: string]: string } = {
    'USDT': 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    'USDC': 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    'BTC': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    'ETH': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    'BNB': 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
  };
  return icons[symbol] || 'https://cryptologos.cc/logos/generic-crypto-logo.png';
};

const getNetworkColor = (network: string): string => {
  const colors: { [key: string]: string } = {
    'ETH': 'bg-blue-100 text-blue-800',
    'BNB': 'bg-yellow-100 text-yellow-800',
    'TRON': 'bg-red-100 text-red-800',
    'BTC': 'bg-orange-100 text-orange-800'
  };
  return colors[network] || 'bg-gray-100 text-gray-800';
};

export function CryptoSelector({ cryptoOptions, onSelect }: CryptoSelectorProps) {
  // Group cryptocurrencies to show only unique tokens
  const uniqueTokens = cryptoOptions.reduce((acc, crypto) => {
    if (!acc.find(item => item.symbol === crypto.symbol)) {
      acc.push(crypto);
    }
    return acc;
  }, [] as CryptoOption[]);

  return (
    <div className="p-6 max-h-96 overflow-y-auto">
      <div className="space-y-3">
        {uniqueTokens.map((crypto) => (
          <button
            key={crypto.id}
            onClick={() => onSelect(crypto)}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                <img 
                  src={getCryptoIcon(crypto.symbol)}
                  alt={crypto.symbol}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCAxMkwxMy4wOSAxNS43NEwxMiAyMkwxMC45MSAxNS43NEw0IDEyTDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IiM2QjczODAiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                  }}
                />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {crypto.symbol}
                  </span>
                  {(crypto.symbol === 'USDT' || crypto.symbol === 'USDC') && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      Multiple Networks
                    </span>
                  )}
                  {crypto.symbol !== 'USDT' && crypto.symbol !== 'USDC' && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNetworkColor(crypto.network)}`}>
                      {crypto.network}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{crypto.name}</p>
              </div>
            </div>
            <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}