import React, { useState } from 'react';
import { ChevronDown, Sliders } from 'lucide-react';

interface ToolPanelProps {
  viewMode: 'grid' | 'chat';
  selectedDimensions: string;
  onDimensionsChange: (dimensions: string) => void;
  selectedEngine: string;
  onEngineChange: (engine: string) => void;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({
  viewMode,
  selectedDimensions,
  onDimensionsChange,
  selectedEngine,
  onEngineChange,
}) => {
  const [randomizeSeed, setRandomizeSeed] = useState(true);
  const [promptGuidance, setPromptGuidance] = useState(7.5);
  const [quality, setQuality] = useState('standard');

  const engines = [
    { id: 'stable-diffusion-xl', name: 'Stable Diffusion XL' },
    { id: 'dall-e-3', name: 'DALL-E 3' },
    { id: 'bluewillow', name: 'BlueWillow' },
  ];

  const dimensions = [
    { id: '1024x1024', name: '1024 × 1024', label: 'Square' },
    { id: '832x1216', name: '832 × 1216', label: 'Portrait' },
    { id: '1216x832', name: '1216 × 832', label: 'Landscape' },
  ];

  return (
    <div className="w-80 border-l border-gray-800 bg-gray-900 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Engine Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            AI Engine
          </label>
          <div className="relative">
            <select
              value={selectedEngine}
              onChange={(e) => onEngineChange(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 appearance-none cursor-pointer focus:outline-none focus:border-blue-500"
            >
              {engines.map((engine) => (
                <option key={engine.id} value={engine.id}>
                  {engine.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Dimensions Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dimensions
          </label>
          <div className="grid grid-cols-3 gap-2">
            {dimensions.map((dimension) => (
              <button
                key={dimension.id}
                onClick={() => onDimensionsChange(dimension.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border ${
                  selectedDimensions === dimension.id
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="text-xs font-medium whitespace-nowrap">{dimension.name}</span>
                <span className="text-xs opacity-75">{dimension.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Negative Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Negative Prompt
          </label>
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 h-20 resize-none focus:outline-none focus:border-blue-500"
            placeholder="Describe what you don't want in the image..."
          />
          <p className="text-xs text-gray-400 mt-1">
            Use this to exclude unwanted elements from your generation
          </p>
        </div>

        {/* Advanced Settings */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Sliders className="h-4 w-4" />
            Advanced Settings
          </h3>
          
          {/* Prompt Guidance */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Prompt Guidance</span>
                <span>{promptGuidance}</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={promptGuidance}
                onChange={(e) => setPromptGuidance(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="text-xs text-gray-400 mt-1">
                Higher values make the image more closely match your prompt
              </p>
            </div>

            {/* Quality Selection */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Quality
              </label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 appearance-none cursor-pointer focus:outline-none focus:border-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="standard">Standard</option>
                <option value="high">High Quality</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Higher quality increases generation time
              </p>
            </div>

            {/* Seed Settings */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Randomize Seed</span>
                <button
                  onClick={() => setRandomizeSeed(!randomizeSeed)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    randomizeSeed ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      randomizeSeed ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Generate unique results each time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;