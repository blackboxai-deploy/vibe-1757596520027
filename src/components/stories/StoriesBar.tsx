"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StoryViewer } from "./StoryViewer";
import { mockStories } from "@/lib/mockData";

export function StoriesBar() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <ScrollArea className="w-full">
          <div className="flex items-center space-x-4 p-4">
            {/* Add Your Story */}
            <div className="flex flex-col items-center space-y-2 min-w-[64px]">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <AvatarImage src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dcbe548d-25fe-4174-ab2e-39fc0f303c5e.png" alt="Your story" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-600 dark:text-purple-400">
                    You
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-0 text-white text-xs"
                >
                  +
                </Button>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
                Your Story
              </span>
            </div>

            {/* Stories from contacts */}
            {mockStories.map((story) => (
              <div 
                key={story.id}
                className="flex flex-col items-center space-y-2 min-w-[64px] cursor-pointer"
                onClick={() => setSelectedStory(story.id)}
              >
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full p-0.5 ${
                    story.viewed 
                      ? 'bg-gray-300 dark:bg-gray-600'
                      : 'bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500'
                  }`}>
                    <Avatar className="w-full h-full">
                      <AvatarImage src={story.userAvatar} alt={story.userName} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
                        {story.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Online indicator */}
                  {story.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                  )}
                </div>
                
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center max-w-[64px] truncate">
                  {story.userName.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <StoryViewer
          storyId={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
}