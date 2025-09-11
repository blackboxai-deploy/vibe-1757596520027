"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface MobileNavigationProps {
  onOpenSidebar: () => void;
}

export function MobileNavigation({ onOpenSidebar }: MobileNavigationProps) {
  const [activeTab, setActiveTab] = useState("chats");

  const tabs = [
    { id: "chats", icon: "💬", label: "Chats", badge: 5, href: "/dashboard" },
     { id: "shop", icon: "🛒", label: "Shop", badge: 2, href: "/shopping" },
    { id: "stories", icon: "📖", label: "Stories", badge: 3, href: "/dashboard" },
    { id: "contacts", icon: "👥", label: "Contacts", badge: 0, href: "/dashboard" },
    { id: "profile", icon: "👤", label: "Profile", badge: 0, href: "/dashboard" }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-2 py-2">
      <div className="flex items-center justify-around">
         {tabs.map((tab) => (
          <Link key={tab.id} href={tab.href} className="block">
            <Button
              variant="ghost"
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === "chats") {
                  onOpenSidebar();
                }
              }}
              className={`w-full flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors relative ${
                activeTab === tab.id 
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="text-lg relative">
                {tab.icon}
                {tab.badge > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs flex items-center justify-center">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
              
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              )}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}