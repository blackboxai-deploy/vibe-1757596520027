"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { mockStories } from "@/lib/mockData";

interface StoryViewerProps {
  storyId: string;
  onClose: () => void;
}

export function StoryViewer({ storyId, onClose }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reply, setReply] = useState("");

  const story = mockStories.find(s => s.id === storyId);
  
  useEffect(() => {
    if (!story) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < story.content.length - 1) {
            setCurrentIndex(prev => prev + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2; // 5 seconds per story (100/2 = 50 intervals)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story, currentIndex, onClose]);

  if (!story) return null;

  const currentStory = story.content[currentIndex];

  const handleNext = () => {
    if (currentIndex < story.content.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (reply.trim()) {
      // In a real app, this would send the reply
      console.log('Reply sent:', reply);
      setReply("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md h-full max-h-[600px] bg-black rounded-lg overflow-hidden">
        {/* Progress bars */}
        <div className="absolute top-2 left-2 right-2 z-10 flex space-x-1">
          {story.content.map((_, index) => (
            <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ 
                  width: index < currentIndex ? '100%' : 
                         index === currentIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="absolute top-6 left-2 right-2 z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={story.userAvatar} alt={story.userName} />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xs">
                {story.userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white text-sm font-semibold">{story.userName}</p>
              <p className="text-white/70 text-xs">{story.timestamp}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 w-8 h-8"
          >
            ✕
          </Button>
        </div>

        {/* Story Content */}
        <div className="relative w-full h-full">
          {currentStory.type === 'image' ? (
            <img 
              src={currentStory.content}
              alt="Story"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a2df4809-edcc-48b5-8985-dfcc9638c2d4.png";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h2 className="text-2xl font-bold mb-4">Text Story</h2>
                <p className="text-lg">{currentStory.content}</p>
              </div>
            </div>
          )}

          {/* Navigation areas */}
          <button 
            onClick={handlePrevious}
            className="absolute left-0 top-0 w-1/3 h-full z-10"
          />
          <button 
            onClick={handleNext}
            className="absolute right-0 top-0 w-1/3 h-full z-10"
          />
        </div>

        {/* Story Footer - Reply */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <form onSubmit={handleSendReply} className="flex items-center space-x-2">
            <Input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Reply to story..."
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50"
            />
            <Button
              type="submit"
              disabled={!reply.trim()}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-3"
            >
              ➤
            </Button>
          </form>
        </div>

        {/* Story Actions */}
        <div className="absolute right-4 bottom-20 space-y-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
          >
            ❤️
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
          >
            📤
          </Button>
        </div>
      </div>
    </div>
  );
}