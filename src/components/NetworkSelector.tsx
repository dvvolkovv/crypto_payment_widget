import React from 'react';
import { CryptoOption } from './PaymentWidget';

interface NetworkSelectorProps {
  token: string;
  cryptoOptions: CryptoOption[];
  onSelect: (crypto: CryptoOption) => void;
}

const getNetworkIcon = (network: string): string => {
  const icons: { [key: string]: string } = {
    'ETH': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    'BNB': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    'TRON': 'https://cryptologos.cc/logos/tron-trx-logo.png'
  };
  return icons[network] || 'https://cryptologos.cc/logos/generic-crypto-logo.png';
};

const getNetworkColor = (network: string): string => {
  const colors: { [key: string]: string } = {
    'ETH': 'bg-blue-100 text-blue-800 border-blue-200',
    'BNB': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'TRON': 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[network] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getNetworkDescription = (network: string): string => {
  const descriptions: { [key: string]: string } = {
    'ETH': 'Ethereum Network - Higher fees, most secure',
    'BNB': 'BNB Smart Chain - Lower fees, fast transactions',
    'TRON': 'TRON Network - Lowest fees, very fast'
  };
  return descriptions[network] || 'Blockchain network';
};

export function NetworkSelector({ token, cryptoOptions, onSelect }: NetworkSelectorProps) {
  // Filter options for the selected token
  const tokenOptions = cryptoOptions.filter(crypto => crypto.symbol === token);

  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-2">
          <img 
            src={token === 'USDT' ? 'https://cryptologos.cc/logos/tether-usdt-logo.png' : 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png'}
            alt={token}
            className="w-8 h-8"
          />
          <span className="text-lg font-semibold text-gray-900">{token}</span>
        </div>
        <p className="text-sm text-gray-600">
          Choose the blockchain network for your {token} payment
        </p>
      </div>

      <div className="space-y-3">
        {tokenOptions.map((crypto) => (
          <button
            key={crypto.id}
            onClick={() => onSelect(crypto)}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-gray-100 flex items-center justify-center">
                <img 
                  src={getNetworkIcon(crypto.network)}
                  alt={crypto.network}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCAxMkwxMy4wOSAxNS43NEwxMiAyMkwxMC45MSAxNS43NEw0IDEyTDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IiM2QjczODAiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                  }}
                />
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900 text-lg">
                    {crypto.network}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getNetworkColor(crypto.network)}`}>
                    {crypto.network} Network
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {getNetworkDescription(crypto.network)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Address: {crypto.address.substring(0, 10)}...{crypto.address.substring(crypto.address.length - 6)}
                </p>
              </div>
            </div>
            <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity text-xl">
              →
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-start space-x-2">
          <div className="text-amber-600 mt-0.5">⚠️</div>
          <div>
            <h4 className="font-medium text-amber-800 mb-1">Important</h4>
            <p className="text-sm text-amber-700">
              Make sure to send {token} only to the selected network. 
              Sending to wrong network may result in permanent loss of funds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}