"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
        <div className="text-center space-y-6">
          {/* Logo Area */}
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              LineGram
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Beautiful messaging with Instagram vibes
            </p>
          </div>

          {/* Features Preview */}
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <span>Instagram-style Stories</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
              <span>Beautiful Chat Interface</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"></div>
              <span>Media Sharing & Stickers</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/auth/login" className="block">
              <Button className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register" className="block">
              <Button variant="outline" className="w-full border-2 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                Create Account
              </Button>
            </Link>
          </div>

          {/* Demo Access */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="block">
              <Button variant="ghost" className="w-full text-sm text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Continue as Guest →
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}