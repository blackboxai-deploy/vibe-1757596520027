"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";
import { mockChats } from "@/lib/mockData";
import { useChat } from "@/hooks/useChat";

interface ChatWindowProps {
  chatId: string;
  onToggleSidebar: () => void;
}

export function ChatWindow({ chatId, onToggleSidebar }: ChatWindowProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chat = mockChats.find(c => c.id === chatId);
  const { messages, sendMessage, isTyping } = useChat(chatId);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Chat not found</p>
      </div>
    );
  }

  const handleSendMessage = (content: string, type: 'text' | 'image' | 'voice' = 'text') => {
    sendMessage(content, type);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="md:hidden p-2"
          >
            ☰
          </Button>
          
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
                {chat.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {chat.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {chat.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {chat.isOnline ? (
                <span className="text-green-500">Online</span>
              ) : (
                `Last seen ${new Date(chat.timestamp).toLocaleTimeString()}`
              )}
            </p>
          </div>
        </div>

        {/* Chat Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            📞
          </Button>
          <Button variant="ghost" size="sm" className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            📹
          </Button>
          <Button variant="ghost" size="sm" className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            ℹ️
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {/* Date Separator */}
          <div className="flex items-center justify-center">
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-500 dark:text-gray-400">
              Today
            </div>
          </div>

          {/* Messages */}
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === 'current-user'}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xs">
                  {chat.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <TypingIndicator />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}