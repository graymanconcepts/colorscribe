import React from 'react';
import { Compass } from 'lucide-react';

const ExplorePage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Compass className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Explore</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-4">
              <div className="aspect-square bg-gray-700 rounded-lg mb-4"></div>
              <h3 className="text-white font-medium">Featured Collection {i + 1}</h3>
              <p className="text-gray-400 text-sm mt-1">Discover amazing AI-generated artwork</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;