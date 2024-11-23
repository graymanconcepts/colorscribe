import React, { useEffect, useRef } from 'react';
import { MoreVertical, Wand2, Copy, Share2, Trash2 } from 'lucide-react';
import ImageModal from './ImageModal';

export interface GalleryImage {
  id: number;
  url: string;
  prompt: string;
  dimensions: string;
  engine: string;
}

export const mockImages: GalleryImage[] = [
  {
    id: 1,
    url: 'https://picsum.photos/seed/colorscribe1/1024',
    prompt: 'A beautiful sunset over mountains',
    dimensions: '1024x1024',
    engine: 'stable-diffusion-xl'
  },
  {
    id: 2,
    url: 'https://picsum.photos/seed/colorscribe2/1024',
    prompt: 'Abstract digital art with vibrant colors',
    dimensions: '1024x1024',
    engine: 'stable-diffusion-xl'
  }
];

interface GalleryProps {
  viewMode: 'grid' | 'chat';
  searchQuery: string;
  onPromptChange: (prompt: string) => void;
  onDimensionsChange: (dimensions: string) => void;
  onEngineChange: (engine: string) => void;
  images: GalleryImage[];
  onImagesChange: (images: GalleryImage[]) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  viewMode,
  searchQuery,
  onPromptChange,
  onDimensionsChange,
  onEngineChange,
  images,
  onImagesChange
}) => {
  const [activeDropdownId, setActiveDropdownId] = React.useState<number | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(null);
  const menuRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdownId !== null && 
          menuRef.current[activeDropdownId] && 
          !menuRef.current[activeDropdownId]?.contains(event.target as Node)) {
        setActiveDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdownId]);

  const handleCreateVariation = (image: GalleryImage) => {
    onPromptChange(image.prompt);
    onDimensionsChange(image.dimensions);
    onEngineChange(image.engine);
    setActiveDropdownId(null);
  };

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setActiveDropdownId(null);
  };

  const handleShare = async (image: GalleryImage) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out my AI-generated image!',
          text: `Generated using the prompt: ${image.prompt}`,
          url: image.url
        });
      } else {
        await navigator.clipboard.writeText(image.url);
        // You might want to show a toast notification here
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
    setActiveDropdownId(null);
  };

  const handleDelete = (id: number) => {
    onImagesChange(images.filter(img => img.id !== id));
    setActiveDropdownId(null);
  };

  const filteredImages = searchQuery.trim()
    ? images.filter(image => image.prompt.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    : images;

  if (viewMode === 'chat') {
    return null;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredImages.map((image) => (
          <div key={image.id} className="relative group">
            <div 
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(image);
              }}
            >
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg" />
            </div>
            {/* Dropdown Toggle */}
            <button
              onClick={() => setActiveDropdownId(activeDropdownId === image.id ? null : image.id)}
              className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <MoreVertical className="h-4 w-4 text-white" />
            </button>

            {/* Dropdown Menu */}
            {activeDropdownId === image.id && (
              <div 
                ref={el => menuRef.current[image.id] = el}
                className="absolute top-10 right-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-10 border border-gray-700"
              >
                <button
                  onClick={() => handleCreateVariation(image)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Wand2 className="h-4 w-4" />
                  Create Variation
                </button>
                <button
                  onClick={() => handleCopyPrompt(image.prompt)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                  Copy Prompt
                </button>
                <button
                  onClick={() => handleShare(image)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            )}

            {/* Dimensions Badge */}
            <div className="absolute bottom-2 right-2 z-10">
              <span className="px-2 py-1 rounded bg-black/50 text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {image.dimensions}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ImageModal 
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Gallery;