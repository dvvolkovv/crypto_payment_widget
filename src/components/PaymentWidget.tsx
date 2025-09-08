import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, ExternalLink, User, Mail } from 'lucide-react';
import { PaymentStep } from './PaymentStep';
import { CryptoSelector } from './CryptoSelector';
import { NetworkSelector } from './NetworkSelector';
import { PaymentConfirmation } from './PaymentConfirmation';
import { EmailInput } from './EmailInput';
import { QRPayment } from './QRPayment';
import { PaymentSuccess } from './PaymentSuccess';

export interface PaymentData {
  recipient: {
    name: string;
    username: string;
    avatar: string;
  };
  purpose: string;
  amount: number;
  currency: string;
}

export interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
  network: string;
  rate: number;
  address: string;
}

const CRYPTO_OPTIONS: CryptoOption[] = [
  { id: 'usdt-eth', name: 'Tether', symbol: 'USDT', network: 'ETH', rate: 1.0, address: '0x742d35Cc6634C0532925a3b8D34f8AB3' },
  { id: 'usdt-bnb', name: 'Tether', symbol: 'USDT', network: 'BNB', rate: 1.0, address: '0x742d35Cc6634C0532925a3b8D34f8AB3' },
  { id: 'usdt-tron', name: 'Tether', symbol: 'USDT', network: 'TRON', rate: 1.0, address: 'TRX742d35Cc6634C0532925a3b8D34f8AB3' },
  { id: 'usdc-eth', name: 'USD Coin', symbol: 'USDC', network: 'ETH', rate: 1.0, address: '0x742d35Cc6634C0532925a3b8D34f8AB4' },
  { id: 'usdc-bnb', name: 'USD Coin', symbol: 'USDC', network: 'BNB', rate: 1.0, address: '0x742d35Cc6634C0532925a3b8D34f8AB4' },
  { id: 'usdc-tron', name: 'USD Coin', symbol: 'USDC', network: 'TRON', rate: 1.0, address: 'TRX742d35Cc6634C0532925a3b8D34f8AB4' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', network: 'BTC', rate: 0.000023, address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', network: 'ETH', rate: 0.00041, address: '0x742d35Cc6634C0532925a3b8D34f8AB5' },
  { id: 'bnb', name: 'BNB', symbol: 'BNB', network: 'BNB', rate: 0.0017, address: '0x742d35Cc6634C0532925a3b8D34f8AB6' },
];

export function PaymentWidget() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'fiat' | null>(null);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption | null>(null);
  const [email, setEmail] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);

  const paymentData: PaymentData = {
    recipient: {
      name: 'Alex Johnson',
      username: '@alexjohnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    purpose: 'Consultation Services',
    amount: 150,
    currency: 'USD'
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const goNext = () => {
    setStep(step + 1);
  };

  const handlePaymentMethodSelect = (method: 'crypto' | 'fiat') => {
    setPaymentMethod(method);
    if (method === 'fiat') {
      // For now, just show a message that fiat is not implemented
      alert('Fiat payment is not implemented in this demo');
      return;
    }
    goNext();
  };

  const handleCryptoSelect = (crypto: CryptoOption) => {
    // Check if this is a multi-network token (USDT or USDC)
    if (crypto.symbol === 'USDT' || crypto.symbol === 'USDC') {
      setSelectedToken(crypto.symbol);
      goNext(); // Go to network selection step
    } else {
      setSelectedCrypto(crypto);
      setStep(4); // Skip network selection, go directly to confirmation
    }
  };

  const handleNetworkSelect = (crypto: CryptoOption) => {
    setSelectedCrypto(crypto);
    goNext();
  };

  const handleEmailSubmit = (emailValue: string) => {
    setEmail(emailValue);
    goNext();
  };

  const handlePaymentSent = () => {
    setPaymentComplete(true);
    goNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {step === 1 && (
            <PaymentStep
              paymentData={paymentData}
              onPaymentMethodSelect={handlePaymentMethodSelect}
            />
          )}
          
          {step === 2 && paymentMethod === 'crypto' && (
            <div>
              <div className="p-6 border-b border-gray-100">
                <button 
                  onClick={goBack}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <h2 className="text-xl font-semibold text-gray-900">Select Cryptocurrency</h2>
              </div>
              <CryptoSelector 
                cryptoOptions={CRYPTO_OPTIONS}
                onSelect={handleCryptoSelect}
              />
            </div>
          )}

          {step === 3 && selectedToken && (
            <div>
              <div className="p-6 border-b border-gray-100">
                <button 
                  onClick={goBack}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <h2 className="text-xl font-semibold text-gray-900">Select Network</h2>
                <p className="text-gray-600 mt-1">Choose network for {selectedToken}</p>
              </div>
              <NetworkSelector 
                token={selectedToken}
                cryptoOptions={CRYPTO_OPTIONS}
                onSelect={handleNetworkSelect}
              />
            </div>
          )}

          {step === 4 && selectedCrypto && (
            <div>
              <div className="p-6 border-b border-gray-100">
                <button 
                  onClick={goBack}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <h2 className="text-xl font-semibold text-gray-900">Confirm Payment</h2>
              </div>
              <PaymentConfirmation
                paymentData={paymentData}
                selectedCrypto={selectedCrypto}
                onConfirm={goNext}
              />
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="p-6 border-b border-gray-100">
                <button 
                  onClick={goBack}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <h2 className="text-xl font-semibold text-gray-900">Email Address</h2>
              </div>
              <EmailInput onSubmit={handleEmailSubmit} />
            </div>
          )}

          {step === 6 && selectedCrypto && (
            <div>
              <div className="p-6 border-b border-gray-100">
                <button 
                  onClick={goBack}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <h2 className="text-xl font-semibold text-gray-900">Send Payment</h2>
              </div>
              <QRPayment
                paymentData={paymentData}
                selectedCrypto={selectedCrypto}
                email={email}
                onPaymentSent={handlePaymentSent}
              />
            </div>
          )}

          {step === 7 && (
            <PaymentSuccess
              paymentData={paymentData}
              selectedCrypto={selectedCrypto}
            />
          )}
        </div>
      </div>
    </div>
  );
}