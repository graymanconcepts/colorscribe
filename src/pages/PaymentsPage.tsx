import React from 'react';
import { CreditCard, Zap } from 'lucide-react';

const PaymentsPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <CreditCard className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Payments</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Current Plan</h2>
            <div className="flex items-center gap-3 text-blue-400 mb-4">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Pro Plan</span>
            </div>
            <p className="text-gray-400 text-sm">Your next billing date is April 1, 2024</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Payment Method</h2>
            <div className="flex items-center gap-3">
              <div className="h-8 w-12 bg-gray-700 rounded"></div>
              <span className="text-gray-300">•••• 4242</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;