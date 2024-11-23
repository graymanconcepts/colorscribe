import React from 'react';
import { Library, Filter } from 'lucide-react';

const LibraryPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Library className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-white">My Library</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-700"></div>
              <div className="p-4">
                <p className="text-gray-300">Generated Image {i + 1}</p>
                <p className="text-gray-500 text-sm mt-1">Created on March {i + 1}, 2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;