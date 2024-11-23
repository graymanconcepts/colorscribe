import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Gallery, mockImages, GalleryImage } from '../components/Gallery';
import { ToolPanel } from '../components/ToolPanel';
import PromptPanel from '../components/PromptPanel';
import ViewModeToggle from '../components/ViewModeToggle';
import ChatView from '../components/ChatView';

const STORAGE_KEY = 'colorscribe-gallery-images';

const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'chat'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedDimensions, setSelectedDimensions] = useState('1024x1024');
  const [selectedEngine, setSelectedEngine] = useState('stable-diffusion-xl');
  const [isGenerating, setIsGenerating] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
    // Initialize from localStorage or use mockImages as fallback
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockImages;
  });

  // Save to localStorage whenever images change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(galleryImages));
  }, [galleryImages]);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    try {
      // Mock image generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a new mock image
      const newImage: GalleryImage = {
        id: Date.now(), // Use timestamp as a unique ID
        url: `https://picsum.photos/seed/${Date.now()}/1024`, // Random image with unique seed
        prompt: prompt,
        dimensions: selectedDimensions,
        engine: selectedEngine
      };

      // Add the new image to the gallery
      setGalleryImages(prevImages => [newImage, ...prevImages]);
      setPrompt(''); // Clear the prompt
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image');
      console.error('Image generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="p-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="relative flex-1 max-w-2xl">
                <input
                  type="text"
                  placeholder="Search your images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-4 pr-10 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            {viewMode === 'chat' ? (
              <div className="flex-1 overflow-hidden">
                <ChatView 
                  images={galleryImages}
                  viewMode={viewMode}
                />
              </div>
            ) : (
              <div className="flex-1 overflow-auto p-4">
                <Gallery 
                  viewMode={viewMode} 
                  searchQuery={searchQuery}
                  onPromptChange={setPrompt}
                  onDimensionsChange={setSelectedDimensions}
                  onEngineChange={setSelectedEngine}
                  images={galleryImages}
                  onImagesChange={setGalleryImages}
                />
              </div>
            )}
          </div>
          {viewMode === 'grid' && (
            <PromptPanel 
              viewMode={viewMode} 
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}
        </div>
        <ToolPanel 
          viewMode={viewMode} 
          selectedDimensions={selectedDimensions}
          onDimensionsChange={setSelectedDimensions}
          selectedEngine={selectedEngine}
          onEngineChange={setSelectedEngine}
        />
      </div>
    </div>
  );
};

export default HomePage;