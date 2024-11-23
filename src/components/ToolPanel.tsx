import React from 'react';
import { Sliders, Image as ImageIcon, Type, Wand2 } from 'lucide-react';

const ToolPanel: React.FC = () => {
  return (
    <div className="w-80 border-l border-gray-800 bg-gray-900 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Model</label>
          <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200">
            <option>BlueWillow v5</option>
            <option>DreamShaper v8</option>
            <option>Stable Diffusion XL</option>
          </select>
        </div>

        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Prompt</label>
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 h-24 resize-none"
            placeholder="Describe your image..."
          />
        </div>

        {/* Negative Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Negative Prompt</label>
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 h-24 resize-none"
            placeholder="Describe what you don't want..."
          />
        </div>

        {/* Image Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Image Settings</label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Dimensions</span>
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-gray-200">
                <option>1024 x 1024</option>
                <option>832 x 1216</option>
                <option>1216 x 832</option>
              </select>
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Quality</span>
                <span>8.5</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                defaultValue="8.5"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium">
          Generate Image
        </button>
      </div>
    </div>
  );
}

export default ToolPanel;