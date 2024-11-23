import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Gallery, mockImages, GalleryImage } from '../components/Gallery';
import { ToolPanel } from '../components/ToolPanel';
import PromptPanel from '../components/PromptPanel';
import { Search } from 'lucide-react';
import ViewModeToggle from '../components/ViewModeToggle';
import UserMenu from '../components/UserMenu';
import ChatView from '../components/ChatView';

const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'chat'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedDimensions, setSelectedDimensions] = useState('1024x1024');
  const [selectedEngine, setSelectedEngine] = useState('stable-diffusion-xl');
  const [isGenerating, setIsGenerating] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
    // Initialize from localStorage if available, otherwise use mockImages
    const savedImages = localStorage.getItem('galleryImages');
    return savedImages ? JSON.parse(savedImages) : mockImages;
  });

  // Save to localStorage whenever images change
  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
  }, [galleryImages]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    const loadingToast = toast.loading('Generating your image...');

    try {
      // Mock image generation delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create mock generated image
      const newImage = {
        id: Date.now(),
        url: `https://picsum.photos/seed/colorscribe${Date.now()}/1024`,
        prompt: prompt,
        dimensions: selectedDimensions,
        engine: selectedEngine
      };

      setGalleryImages(prev => [newImage, ...prev]);
      toast.success('Image generated successfully!', { id: loadingToast });
      setPrompt('');
    } catch (error) {
      toast.error('Failed to generate image', { id: loadingToast });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <nav className="h-16 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900">
        {/* Left side with search */}
        <div className="flex-1 flex items-center gap-4 max-w-4xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={viewMode === 'grid' ? "Search your images and prompts..." : "Search chat history..."}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right side with user menu */}
        <UserMenu 
          isOpen={isUserMenuOpen}
          onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
          onLogout={handleLogout}
        />
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4">
              <div className="flex justify-end mb-4">
                <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
              </div>
            </div>
            <div className="flex-1 relative">
              {viewMode === 'chat' ? (
                <ChatView images={galleryImages} />
              ) : (
                <div className="absolute inset-0 overflow-auto">
                  <div className="p-4">
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
                </div>
              )}
            </div>
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