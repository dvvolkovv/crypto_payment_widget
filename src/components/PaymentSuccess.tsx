import React from 'react';
import { CheckCircle, Download, ExternalLink } from 'lucide-react';
import { PaymentData, CryptoOption } from './PaymentWidget';

interface PaymentSuccessProps {
  paymentData: PaymentData;
  selectedCrypto?: CryptoOption | null;
}

export function PaymentSuccess({ paymentData, selectedCrypto }: PaymentSuccessProps) {
  const transactionId = 'tx_' + Math.random().toString(36).substr(2, 9);
  const cryptoAmount = selectedCrypto ? (paymentData.amount * selectedCrypto.rate).toFixed(8) : '0';
  const cleanAmount = selectedCrypto ? parseFloat(cryptoAmount).toString() : '0';

  return (
    <div className="p-6 text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>

      {/* Success Message */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Payment Received!
      </h2>
      <p className="text-gray-600 mb-8">
        Your payment has been successfully processed and confirmed on the blockchain.
      </p>

      {/* Transaction Details */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3 text-left">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Transaction ID</span>
          <span className="font-mono text-sm text-gray-900">{transactionId}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount Paid</span>
          <span className="font-bold text-gray-900">
            {selectedCrypto ? `${cleanAmount} ${selectedCrypto.symbol}` : `$${paymentData.amount} USD`}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">USD Value</span>
          <span className="font-medium text-gray-900">${paymentData.amount} USD</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Recipient</span>
          <span className="font-medium text-gray-900">{paymentData.recipient.name}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Purpose</span>
          <span className="font-medium text-gray-900">{paymentData.purpose}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Date</span>
          <span className="font-medium text-gray-900">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Download Receipt</span>
        </button>
        
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2">
          <ExternalLink className="w-4 h-4" />
          <span>View on Blockchain</span>
        </button>
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-green-50 rounded-xl">
        <p className="text-sm text-green-800">
          ✅ A confirmation email has been sent to your registered email address. 
          The transaction is now complete and irreversible.
        </p>
      </div>
    </div>
  );
}