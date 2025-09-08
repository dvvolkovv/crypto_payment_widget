import React from 'react';
import { PaymentData, CryptoOption } from './PaymentWidget';

interface PaymentConfirmationProps {
  paymentData: PaymentData;
  selectedCrypto: CryptoOption;
  onConfirm: () => void;
}

export function PaymentConfirmation({ paymentData, selectedCrypto, onConfirm }: PaymentConfirmationProps) {
  const cryptoAmount = (paymentData.amount * selectedCrypto.rate).toFixed(8);
  const cleanAmount = parseFloat(cryptoAmount).toString();

  return (
    <div className="p-6">
      {/* Payment Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
        <div className="text-center">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {cleanAmount} {selectedCrypto.symbol}
          </div>
          <div className="text-sm text-gray-600">
            ≈ ${paymentData.amount} USD
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Recipient</span>
          <span className="font-medium text-gray-900">{paymentData.recipient.name}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Purpose</span>
          <span className="font-medium text-gray-900">{paymentData.purpose}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Currency</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">{selectedCrypto.symbol}</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {selectedCrypto.network}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Amount</span>
          <span className="font-medium text-gray-900">{cleanAmount} {selectedCrypto.symbol}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={onConfirm}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-colors"
      >
        Continue to Email
      </button>
    </div>
  );
}