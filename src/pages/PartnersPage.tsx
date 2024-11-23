import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

const PartnersPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Users className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Partner Program</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Become a Partner</h2>
            <p className="text-gray-400 mb-6">Join our partner program and earn rewards for your contributions.</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700">
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Partner Benefits</h2>
            <ul className="space-y-3">
              {['Revenue sharing', 'Early access to features', 'Priority support', 'Custom branding'].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;