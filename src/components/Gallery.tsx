import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, MoreVertical, Copy, Wand2, Download, Share2, Trash2 } from 'lucide-react';

interface GalleryProps {
  viewMode: 'grid' | 'chat';
  searchQuery: string;
  onPromptChange: (prompt: string) => void;
  onDimensionsChange: (dimensions: string) => void;
  onEngineChange: (engine: string) => void;
}

// Mock image data with more variety
const mockImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    prompt: 'A serene landscape with mountains and a lake at sunset',
    dimensions: '1024x1024',
    engine: 'stable-diffusion-xl'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    prompt: 'Futuristic cityscape with neon lights and flying vehicles',
    dimensions: '832x1216',
    engine: 'dall-e-3'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    prompt: 'Magical forest with glowing mushrooms and fairy lights',
    dimensions: '1216x832',
    engine: 'stable-diffusion-xl'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    prompt: 'Deep space nebula with swirling colors and distant stars',
    dimensions: '1024x1024',
    engine: 'dall-e-3'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    prompt: 'Underwater scene with bioluminescent sea creatures',
    dimensions: '832x1216',
    engine: 'bluewillow'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    prompt: 'Abstract geometric patterns with vibrant colors',
    dimensions: '1216x832',
    engine: 'stable-diffusion-xl'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    prompt: 'Ancient temple ruins overgrown with tropical vegetation',
    dimensions: '1024x1024',
    engine: 'bluewillow'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    prompt: 'Cyberpunk character with glowing cybernetic enhancements',
    dimensions: '832x1216',
    engine: 'dall-e-3'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    prompt: 'Mythical creature hybrid between dragon and phoenix',
    dimensions: '1216x832',
    engine: 'bluewillow'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    prompt: 'Surreal floating islands with waterfalls flowing upwards',
    dimensions: '1024x1024',
    engine: 'stable-diffusion-xl'
  },
];

const Gallery: React.FC<GalleryProps> = ({ 
  viewMode, 
  searchQuery, 
  onPromptChange, 
  onDimensionsChange,
  onEngineChange 
}) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Filter images based on search query
  const filteredImages = mockImages.filter(image =>
    image.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateVariation = (prompt: string, dimensions: string, engine: string) => {
    if (onPromptChange) {
      onPromptChange(prompt);
      onDimensionsChange(dimensions);
      onEngineChange(engine);
    }
    setActiveMenu(null);
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeMenu !== null && 
          menuRef.current[activeMenu] && 
          !menuRef.current[activeMenu]?.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu]);

  if (viewMode === 'chat') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {filteredImages.map((image) => (
            <div key={image.id} className="flex gap-4 p-4 bg-gray-800 rounded-lg">
              <img
                src={image.url}
                alt={image.prompt}
                className="w-24 h-24 rounded object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-medium">{image.prompt}</h3>
                    <p className="text-gray-400 text-sm mt-1">Created with AI using prompt: "{image.prompt}"</p>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <div className="bg-gray-700 rounded-lg p-2 text-sm text-gray-300">
                      Can you make it more vibrant?
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="bg-blue-600 rounded-lg p-2 text-sm text-white">
                      Here's a more vibrant version of the image.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 p-4 bg-gray-900 border-t border-gray-800 mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about this image or request changes..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
            />
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-5 gap-4 max-w-[1800px] mx-auto">
        {filteredImages.map((image) => (
          <div key={image.id} className="group relative aspect-square rounded-lg overflow-hidden bg-gray-800">
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover"
            />
            {/* Menu Button */}
            <div 
              className="absolute top-2 right-2 z-20"
              ref={el => menuRef.current[image.id] = el}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveMenu(activeMenu === image.id ? null : image.id);
                }}
                className="p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              {/* Dropdown Menu */}
              {activeMenu === image.id && (
                <div 
                  className="absolute top-full right-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleCreateVariation(image.prompt, image.dimensions, image.engine)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Wand2 className="h-4 w-4" />
                    Create Variation
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Prompt
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Dimensions Display */}
            <div className="absolute bottom-2 right-2 z-10">
              <span className="px-2 py-1 rounded bg-black/50 text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {image.dimensions}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;