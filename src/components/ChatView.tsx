import React from 'react';
import { MessageSquare } from 'lucide-react';
import { GalleryImage } from './Gallery';

interface ChatViewProps {
  images: GalleryImage[];
}

const ChatView: React.FC<ChatViewProps> = ({ images }) => {
  // Repeat images to create more content for scrolling
  const extendedImages = [...images, ...images, ...images].map((img, index) => ({
    ...img,
    id: `${img.id}-${index}`,
    conversations: [
      { role: 'user', message: 'Can you make it more vibrant?' },
      { role: 'assistant', message: 'Here\'s a more vibrant version of the image.' },
      { role: 'user', message: 'Could you add more contrast?' },
      { role: 'assistant', message: 'I\'ve increased the contrast while maintaining the vibrant colors.' },
      { role: 'user', message: 'Make it more dreamlike' },
      { role: 'assistant', message: 'I\'ve added a dreamy, ethereal quality to the image.' },
    ].slice(0, (index % 3 + 1) * 2) // Vary the number of messages per image
  }));

  return (
    <div className="flex-1 flex flex-col relative h-full">
      <div className="absolute inset-0 overflow-y-auto pb-[76px]">
        <div className="space-y-6 p-4">
          {extendedImages.map((image) => (
            <div key={image.id} className="flex gap-4 p-4 bg-gray-800 rounded-lg">
              <img
                src={image.url}
                alt={image.prompt}
                className="w-24 h-24 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-medium truncate">{image.prompt}</h3>
                    <p className="text-gray-400 text-sm mt-1">Created with AI using prompt: "{image.prompt}"</p>
                  </div>
                  <button className="text-gray-400 hover:text-white flex-shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {image.conversations.map((conv, idx) => (
                    <div key={idx} className={`flex gap-2 ${conv.role === 'assistant' ? 'justify-end' : ''}`}>
                      <div className={`rounded-lg p-2 text-sm max-w-[80%] ${
                        conv.role === 'assistant' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {conv.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about this image or request changes..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
          />
          <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex-shrink-0">
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
