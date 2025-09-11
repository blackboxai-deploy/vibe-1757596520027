"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full"></div>
              </div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Sign in to continue your conversations
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>Don't have an account?</span>
            <Link 
              href="/auth/register" 
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors"
            >
              Sign up
            </Link>
          </div>
          <Link 
            href="/" 
            className="inline-block text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}