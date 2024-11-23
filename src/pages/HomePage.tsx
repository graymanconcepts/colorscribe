import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Gallery, mockImages, GalleryImage } from '../components/Gallery';
import { ToolPanel } from '../components/ToolPanel';
import PromptPanel from '../components/PromptPanel';
import { LayoutGrid, MessageSquare, Search, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

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

      // Add to gallery
      setGalleryImages(prev => [newImage, ...prev]);
      
      toast.success('Image generated successfully!', {
        id: loadingToast,
      });
    } catch (error) {
      toast.error('Failed to generate image', {
        id: loadingToast,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logging out...');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toaster configuration */}
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-800 text-blue-500' : 'text-gray-400 hover:bg-gray-800'}`}
              title="Gallery View"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('chat')}
              className={`p-2 rounded-lg ${viewMode === 'chat' ? 'bg-gray-800 text-blue-500' : 'text-gray-400 hover:bg-gray-800'}`}
              title="AI Chat View"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right side with user menu */}
        <div className="relative ml-4">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
              JD
            </div>
            <ChevronDown className="h-4 w-4" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1 z-10">
              <div className="px-4 py-2 border-b border-gray-700">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">john.doe@example.com</p>
              </div>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                My Page
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {viewMode === 'chat' ? (
        <div className="max-w-3xl mx-auto flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {galleryImages.map((image) => (
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
                <MessageSquare className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto">
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
            <PromptPanel 
              viewMode={viewMode} 
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>
          <ToolPanel 
            viewMode={viewMode} 
            selectedDimensions={selectedDimensions}
            onDimensionsChange={setSelectedDimensions}
            selectedEngine={selectedEngine}
            onEngineChange={setSelectedEngine}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;