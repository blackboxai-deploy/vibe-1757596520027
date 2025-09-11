"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { StoriesBar } from "@/components/stories/StoriesBar";
import { MobileNavigation } from "@/components/common/MobileNavigation";
import { TopNavigation } from "@/components/common/TopNavigation";

export default function DashboardPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Top Navigation - Desktop */}
      <div className="hidden md:block">
        <TopNavigation />
      </div>

      {/* Stories Bar - Desktop */}
      <div className="hidden md:block border-b border-gray-200 dark:border-gray-700">
        <StoriesBar />
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Sidebar - Desktop always visible, Mobile togglable */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          w-80 md:w-80 flex-shrink-0 border-r border-gray-200 dark:border-gray-700
          absolute md:relative z-20 h-full bg-white dark:bg-gray-900
        `}>
          <ChatSidebar
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <ChatWindow 
              chatId={selectedChat}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <div className="text-center space-y-4 p-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Welcome to LineGram
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    Select a chat from the sidebar to start messaging, or begin a new conversation.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  Open Chats
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <MobileNavigation onOpenSidebar={() => setIsSidebarOpen(true)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}