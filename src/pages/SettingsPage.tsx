import React from 'react';
import { Settings, Bell, Lock, Palette } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Settings className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-medium text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Email notifications</span>
                <input type="checkbox" className="form-checkbox" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Push notifications</span>
                <input type="checkbox" className="form-checkbox" />
              </label>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-medium text-white">Privacy</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Make profile public</span>
                <input type="checkbox" className="form-checkbox" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Show activity status</span>
                <input type="checkbox" className="form-checkbox" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;