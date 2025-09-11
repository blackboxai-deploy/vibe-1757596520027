"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (content: string, type?: 'text' | 'image' | 'voice') => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 120); // Max 5 lines
    textarea.style.height = `${newHeight}px`;
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate image upload - in real app, you'd upload to server
      const imageUrl = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fe11a260-543d-4ad5-a8bd-d542d8686439.png}`;
      onSendMessage(imageUrl, 'image');
    }
  };

   const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage("Voice message", 'voice');
      }, 2000);
    }
  };

  const handleShareProduct = () => {
    // Simulate sharing a product from the shop
    const productMessage = "🛒 Check out this amazing product: Wireless Bluetooth Headphones - $89.99\n\nPremium quality with noise cancellation! Perfect for music lovers. \n\n👆 Tap to view in shop";
    onSendMessage(productMessage, 'text');
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Message Actions */}
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleImageUpload}
            className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
          >
            📷
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleVoiceRecord}
            disabled={isRecording}
            className={`p-2 transition-colors ${
              isRecording 
                ? 'bg-red-100 dark:bg-red-900/20 text-red-600' 
                : 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
            }`}
          >
            {isRecording ? '🔴' : '🎤'}
          </Button>

            <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleShareProduct}
            className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            title="Share product from shop"
          >
            🛒
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onSendMessage('💎 Sent 0.01 ETH ($25.00) - Transaction hash: 0x1234...abcd', 'text')}
            className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
            title="Send crypto payment"
          >
            💎
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
          >
            😊
          </Button>
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[44px] max-h-[120px] resize-none border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 rounded-2xl px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800 transition-colors"
          />
          
          {/* Emoji/Sticker Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 bottom-2 p-1 w-8 h-8 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            ➕
          </Button>
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          disabled={!message.trim()}
          className={`p-3 rounded-full transition-all duration-200 ${
            message.trim()
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <div className="w-5 h-5">
            {message.trim() ? '➤' : '➤'}
          </div>
        </Button>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </form>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center space-x-2 mt-2 text-red-600 dark:text-red-400">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Recording...</span>
        </div>
      )}
    </div>
  );
}