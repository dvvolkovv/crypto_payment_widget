import React from 'react';
import { CreditCard, Coins } from 'lucide-react';
import { PaymentData } from './PaymentWidget';

interface PaymentStepProps {
  paymentData: PaymentData;
  onPaymentMethodSelect: (method: 'crypto' | 'fiat') => void;
}

export function PaymentStep({ paymentData, onPaymentMethodSelect }: PaymentStepProps) {
  return (
    <div className="p-6">
      {/* Recipient Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img 
          src={paymentData.recipient.avatar}
          alt={paymentData.recipient.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {paymentData.recipient.name}
          </h3>
          <p className="text-blue-600 text-sm font-medium">
            {paymentData.recipient.username}
          </p>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Purpose</span>
          <span className="font-medium text-gray-900">{paymentData.purpose}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount</span>
          <span className="text-2xl font-bold text-blue-600">
            ${paymentData.amount} {paymentData.currency}
          </span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Choose Payment Method</h4>
        
        <button
          onClick={() => onPaymentMethodSelect('crypto')}
          className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Coins className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Cryptocurrency</p>
              <p className="text-sm text-gray-500">Pay with Bitcoin, Ethereum, USDT, etc.</p>
            </div>
          </div>
          <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </div>
        </button>

        <button
          onClick={() => onPaymentMethodSelect('fiat')}
          className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Card Payment</p>
              <p className="text-sm text-gray-500">Pay with credit or debit card</p>
            </div>
          </div>
          <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </div>
        </button>
      </div>
    </div>
  );
}