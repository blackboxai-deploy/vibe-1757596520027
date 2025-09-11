"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";

export function TopNavigation() {
  const { theme, setTheme } = useTheme();
  const [notifications] = useState(3); // Mock notification count

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              LineGram
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations, contacts..."
              className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-colors"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
              🔍
            </div>
          </div>
        </div>

         {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Shop Link */}
           <Link href="/shopping">
            <Button variant="ghost" size="sm" className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
              <div className="w-5 h-5">🛒</div>
            </Button>
          </Link>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            <div className="w-5 h-5">🔔</div>
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                {notifications > 9 ? '9+' : notifications}
              </div>
            )}
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            <div className="w-5 h-5">⚙️</div>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1 rounded-full">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/999c3a84-4036-4891-b4ea-e6f5d5e84aa4.png" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
                    Me
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 border-b">
                <p className="font-semibold">Current User</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">user@example.com</p>
              </div>
              
              <DropdownMenuItem>
                <div className="w-4 h-4 mr-2">👤</div>
                Profile
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <div className="w-4 h-4 mr-2">💬</div>
                My Chats
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <div className="w-4 h-4 mr-2">📊</div>
                Stories
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                <div className="w-4 h-4 mr-2">{theme === 'dark' ? '☀️' : '🌙'}</div>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <div className="w-4 h-4 mr-2">⚙️</div>
                Settings
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <div className="w-4 h-4 mr-2">❓</div>
                Help & Support
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <Link href="/" className="text-red-600 dark:text-red-400">
                  <div className="w-4 h-4 mr-2">🚪</div>
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}