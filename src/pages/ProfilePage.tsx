import React from 'react';
import { User, Image, Star } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 bg-gray-700 rounded-full"></div>
            <div>
              <h1 className="text-2xl font-bold text-white">John Doe</h1>
              <p className="text-gray-400">AI Artist & Developer</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Image className="h-4 w-4" />
                  <span>248 Creations</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Star className="h-4 w-4" />
                  <span>1.2k Likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-700"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;