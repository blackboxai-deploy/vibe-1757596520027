"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  type: 'text' | 'image' | 'voice';
  status?: 'sent' | 'delivered' | 'read';
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="max-w-xs">
            <img 
              src={message.content}
              alt="Shared image"
              className="rounded-lg w-full h-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/90148793-7069-4633-a9ef-c2cbbc29b3cf.png";
              }}
            />
          </div>
        );
      case 'voice':
        return (
          <div className="flex items-center space-x-3 py-2">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              🎵
            </div>
            <div className="flex-1 h-2 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-1/3"></div>
            </div>
            <span className="text-xs text-gray-500">0:15</span>
          </div>
        );
      default:
        return (
          <p className="whitespace-pre-wrap break-words">
            {message.content}
          </p>
        );
    }
  };

  return (
    <div className={cn(
      "flex items-end space-x-2 max-w-[80%]",
      isOwn ? "ml-auto flex-row-reverse space-x-reverse" : ""
    )}>
      {/* Avatar - only show for others' messages */}
      {!isOwn && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9aa5e51f-4bb2-40e2-be50-adc976844adc.png}`} alt="User" />
          <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xs">
            {message.senderId.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message Bubble */}
      <div className={cn(
        "relative px-4 py-2 rounded-2xl shadow-sm",
        isOwn 
          ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white" 
          : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
      )}>
        {renderMessageContent()}
        
        {/* Message Info */}
        <div className={cn(
          "flex items-center space-x-1 mt-1",
          isOwn ? "justify-end" : "justify-start"
        )}>
          <span className={cn(
            "text-xs",
            isOwn ? "text-white/70" : "text-gray-500 dark:text-gray-400"
          )}>
            {formatTime(message.timestamp)}
          </span>
          
          {/* Message Status for own messages */}
          {isOwn && (
            <div className="flex items-center">
              {message.status === 'sent' && (
                <div className="w-3 h-3 text-white/70">✓</div>
              )}
              {message.status === 'delivered' && (
                <div className="w-3 h-3 text-white/70">✓✓</div>
              )}
              {message.status === 'read' && (
                <div className="w-3 h-3 text-blue-300">✓✓</div>
              )}
            </div>
          )}
        </div>

        {/* Message Tail */}
        <div className={cn(
          "absolute w-0 h-0 bottom-0",
          isOwn 
            ? "right-[-8px] border-l-[8px] border-l-purple-500 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"
            : "left-[-8px] border-r-[8px] border-r-white dark:border-r-gray-700 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"
        )} />
      </div>
    </div>
  );
}