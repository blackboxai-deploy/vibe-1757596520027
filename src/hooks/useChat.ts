"use client";

import { useState, useEffect } from 'react';
import { mockMessages, Message } from '@/lib/mockData';

export function useChat(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Load messages for the selected chat
    const chatMessages = mockMessages[chatId] || [];
    setMessages(chatMessages);

    // Simulate typing indicator randomly
    const typingInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 3 seconds
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    }, 3000);

    return () => clearInterval(typingInterval);
  }, [chatId]);

  const sendMessage = (content: string, type: 'text' | 'image' | 'voice' = 'text') => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      content,
      senderId: 'current-user',
      timestamp: new Date(),
      type,
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'read' as const }
            : msg
        )
      );
    }, 3000);

    // Simulate auto-reply from other user
    if (type === 'text' && Math.random() < 0.7) { // 70% chance of auto-reply
      setTimeout(() => {
        const replies = [
          "That's interesting!",
          "I see what you mean 🤔",
          "Absolutely! 👍",
          "Thanks for sharing that!",
          "Haha, that's funny! 😄",
          "I totally agree with you",
          "That sounds great!",
          "Really? Tell me more!"
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyMessage: Message = {
          id: `reply_${Date.now()}`,
          content: randomReply,
          senderId: 'other-user',
          timestamp: new Date(),
          type: 'text',
          status: 'read'
        };

        setMessages(prev => [...prev, replyMessage]);
      }, 2000 + Math.random() * 3000); // Random delay between 2-5 seconds
    }
  };

  return {
    messages,
    sendMessage,
    isTyping
  };
}