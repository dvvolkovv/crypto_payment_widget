import React, { useState } from 'react';
import { Copy, Check, Clock, ExternalLink } from 'lucide-react';
import { PaymentData, CryptoOption } from './PaymentWidget';

interface QRPaymentProps {
  paymentData: PaymentData;
  selectedCrypto: CryptoOption;
  email: string;
  onPaymentSent: () => void;
}

export function QRPayment({ paymentData, selectedCrypto, email, onPaymentSent }: QRPaymentProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  const cryptoAmount = (paymentData.amount * selectedCrypto.rate).toFixed(8);
  const cleanAmount = parseFloat(cryptoAmount).toString();

  // Simple QR code placeholder (in real app, you'd generate actual QR codes)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${selectedCrypto.address}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(selectedCrypto.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address');
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6">
      {/* Timer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-center space-x-2 text-amber-800">
          <Clock className="w-5 h-5" />
          <span className="font-medium">Payment expires in {formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* QR Code */}
      <div className="text-center mb-6">
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 inline-block mb-4">
          <img 
            src={qrCodeUrl} 
            alt="QR Code" 
            className="w-48 h-48 mx-auto"
          />
        </div>
        <p className="text-sm text-gray-600">
          Scan QR code with your wallet app
        </p>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount</span>
          <span className="font-mono font-bold text-gray-900">
            {cleanAmount} {selectedCrypto.symbol}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Network</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {selectedCrypto.network}
          </span>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Send to Address
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={selectedCrypto.address}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-1"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-sm">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onPaymentSent}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl transition-colors"
        >
          I've Sent the Payment
        </button>
        
        <button className="w-full flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 py-2">
          <ExternalLink className="w-4 h-4" />
          <span>Open in Wallet App</span>
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <h4 className="font-medium text-blue-900 mb-2">Important Instructions:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Send exactly {cleanAmount} {selectedCrypto.symbol}</li>
          <li>• Use {selectedCrypto.network} network only</li>
          <li>• Payment will be confirmed automatically</li>
          <li>• Receipt will be sent to {email}</li>
        </ul>
      </div>
    </div>
  );
}