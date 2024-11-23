import React from 'react';

interface GalleryProps {
  viewMode: 'grid' | 'chat';
}

const Gallery: React.FC<GalleryProps> = ({ viewMode }) => {
  const images = [
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538'
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-800 group relative">
              <img
                src={`${image}?auto=format&fit=crop&w=800&q=80`}
                alt={`Generated ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm">Generated Image {index + 1}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {images.map((image, index) => (
            <div key={index} className="flex gap-4 p-4 bg-gray-800 rounded-lg">
              <img
                src={`${image}?auto=format&fit=crop&w=100&h=100&q=80`}
                alt={`Generated ${index + 1}`}
                className="w-24 h-24 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="text-white font-medium">Generated Image {index + 1}</h3>
                <p className="text-gray-400 text-sm mt-1">Created with AI - Click to view details</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;