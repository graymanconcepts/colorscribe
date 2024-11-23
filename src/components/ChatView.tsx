import React from 'react';
import { MessageSquare } from 'lucide-react';
import { GalleryImage } from './Gallery';

interface ChatViewProps {
  images: GalleryImage[];
}

const ChatView: React.FC<ChatViewProps> = ({ images }) => {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-4 pb-20">
          {images.map((image) => (
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
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 bg-gray-900 p-4">
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
  );
};

export default ChatView;
