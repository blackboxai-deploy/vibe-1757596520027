// Mock data for the Line app clone

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  isOnline: boolean;
  unreadCount: number;
  isTyping: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  type: 'text' | 'image' | 'voice';
  status?: 'sent' | 'delivered' | 'read';
}

export interface Story {
  id: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  content: StoryContent[];
  viewed: boolean;
  isOnline: boolean;
}

interface StoryContent {
  type: 'image' | 'text';
  content: string;
}

// Mock chats data
export const mockChats: Chat[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fa4f9133-a6fb-4fba-a29b-5a6bebae51b8.png",
    lastMessage: "Hey! How are you doing today?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isOnline: true,
    unreadCount: 2,
    isTyping: false
  },
  {
    id: "2", 
    name: "Bob Smith",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/90724c5d-6e31-4676-8629-3768bdb1860c.png",
    lastMessage: "Thanks for the help with the project!",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isOnline: false,
    unreadCount: 0,
    isTyping: true
  },
  {
    id: "3",
    name: "Design Team",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/551a2c83-95d1-4803-963b-027406aae73e.png",
    lastMessage: "Sarah: Let's review the mockups tomorrow",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isOnline: true,
    unreadCount: 5,
    isTyping: false
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/554e4725-b2e5-48e5-81cc-ee3026ae6a24.png",
    lastMessage: "🎉 Congratulations on the promotion!",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isOnline: false,
    unreadCount: 1,
    isTyping: false
  },
  {
    id: "5",
    name: "Michael Chen",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/be79a7f3-2653-4c67-b5a0-456ba9dc01b1.png",
    lastMessage: "Voice message",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isOnline: true,
    unreadCount: 0,
    isTyping: false
  },
  {
    id: "6",
    name: "Sarah Parker",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/27782d01-ecb2-418e-bb9f-e73156b6c972.png",
    lastMessage: "Looking forward to our meeting next week",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    isOnline: false,
    unreadCount: 0,
    isTyping: false
  }
];

// Mock products for shopping with Web3 features
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  cryptoPrice?: {
    eth: string;
    usdc: string;
  };
  rating: number;
  reviews: number;
  isNFT?: boolean;
  seller?: string;
}

// Mock messages for different chats
export const mockMessages: { [chatId: string]: Message[] } = {
  "1": [
    {
      id: "m1",
      content: "Hey! How are you doing today?",
      senderId: "alice",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: "m2", 
      content: "I'm doing great! Just finished a big project at work. How about you?",
      senderId: "current-user",
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: "m3",
      content: "That's awesome! I'd love to hear more about it. Are you free for coffee this weekend?",
      senderId: "alice",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'text',
      status: 'delivered'
    },
    {
      id: "m4",
      content: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a9a20221-74cd-4391-9afe-6684d439be38.png",
      senderId: "alice",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      type: 'image',
      status: 'delivered'
    }
  ],
  "2": [
    {
      id: "m5",
      content: "Thanks for the help with the project!",
      senderId: "bob",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: "m6",
      content: "No problem at all! Always happy to help. How did the presentation go?",
      senderId: "current-user",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: "m7",
      content: "Voice message",
      senderId: "bob",
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      type: 'voice',
      status: 'read'
    }
  ]
};

// Mock stories data
export const mockStories: Story[] = [
  {
    id: "s1",
    userName: "Alice Johnson",
    userAvatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/78595b26-18c0-439f-9b77-d3b4f51f53c6.png",
    timestamp: "2 hours ago",
    viewed: false,
    isOnline: true,
    content: [
      {
        type: 'image',
        content: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/66980f7b-6792-459e-9848-383794cff520.png'
      },
      {
        type: 'text',
        content: 'Perfect morning with amazing coffee! ☕️'
      }
    ]
  },
  {
    id: "s2",
    userName: "Bob Smith", 
    userAvatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3534dcdc-2357-4fcc-a3ce-86a7041602df.png",
    timestamp: "4 hours ago",
    viewed: true,
    isOnline: false,
    content: [
      {
        type: 'image',
        content: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/083878f1-1269-460e-9ed7-43ecb7cd5a07.png'
      }
    ]
  },
  {
    id: "s3",
    userName: "Emma Wilson",
    userAvatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/217fadf4-50ed-41ca-9e15-8d7fccc6fa93.png", 
    timestamp: "6 hours ago",
    viewed: false,
    isOnline: true,
    content: [
      {
        type: 'text',
        content: 'Just finished an amazing book! 📚 Can\'t wait to discuss it with someone.'
      },
      {
        type: 'image',
        content: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/559025b4-4ca8-47b3-bf20-bbdf3cefcb6a.png'
      }
    ]
  },
  {
    id: "s4",
    userName: "Design Team",
    userAvatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2851c310-21dd-4112-b2d2-cc78e7f550d6.png",
    timestamp: "8 hours ago", 
    viewed: false,
    isOnline: true,
    content: [
      {
        type: 'image',
        content: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fea18077-5285-4234-acdd-d68c9e862b45.png'
      },
      {
        type: 'text',
        content: 'Team brainstorming session! 🚀 Great ideas flowing today.'
      }
    ]
  },
  {
    id: "s5",
    userName: "Michael Chen",
    userAvatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/482803e3-f2fe-4369-8a05-6ac0b95a051c.png",
    timestamp: "12 hours ago",
    viewed: true,
    isOnline: false,
    content: [
      {
        type: 'image', 
        content: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/46e9974a-7a60-4d78-8ff8-2a48d47487bf.png'
      }
    ]
  }
];

export const mockProducts: Product[] = [
  // Electronics with Web3 pricing
  {
    id: "p1",
    name: "iPhone 15 Pro Max",
    description: "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system",
    price: 1199,
    image: "https://storage.googleapis.com/workspace-ai-images/2e6b0c85-a1dd-42a7-8ea3-aa6ea51e3d98.png",
    category: "electronics",
    cryptoPrice: { eth: "0.48", usdc: "1199.00" },
    rating: 4.8,
    reviews: 1247,
    seller: "Apple Store"
  },
  {
    id: "p2",
    name: "Samsung Galaxy Watch 6",
    description: "Advanced smartwatch with health tracking, GPS, and 40mm display",
    price: 329,
    image: "https://storage.googleapis.com/workspace-ai-images/7f5c3b2d-9e1a-4c8f-b6d3-1a2e4f5c6d7e.png",
    category: "electronics",
    cryptoPrice: { eth: "0.13", usdc: "329.00" },
    rating: 4.6,
    reviews: 892
  },
  
  // Fashion with Web3 pricing
  {
    id: "p3",
    name: "Nike Air Jordan 1 High",
    description: "Classic basketball sneaker with premium leather and iconic silhouette",
    price: 170,
    image: "https://storage.googleapis.com/workspace-ai-images/3d2c1b4a-8f9e-7c6d-5a4b-9e8f7c6d5a4b.png",
    category: "fashion",
    cryptoPrice: { eth: "0.068", usdc: "170.00" },
    rating: 4.9,
    reviews: 2156,
    seller: "Nike Official"
  },
  {
    id: "p4",
    name: "Gucci Leather Handbag",
    description: "Luxury Italian leather handbag with signature GG monogram",
    price: 2800,
    image: "https://storage.googleapis.com/workspace-ai-images/5e4d3c2b-1a9f-8e7d-6c5b-4a3f2e1d0c9b.png",
    category: "fashion",
    cryptoPrice: { eth: "1.12", usdc: "2800.00" },
    rating: 4.7,
    reviews: 423,
    seller: "Gucci"
  },

  // NFTs - Decentralized Digital Assets
  {
    id: "p5",
    name: "Cyber Punk Avatar #1337",
    description: "Rare cyberpunk-themed NFT avatar with neon aesthetic and unique traits",
    price: 850,
    image: "https://storage.googleapis.com/workspace-ai-images/8a7b6c5d-4e3f-2g1h-9i8j-7k6l5m4n3o2p.png",
    category: "nft",
    cryptoPrice: { eth: "0.34", usdc: "850.00" },
    rating: 4.5,
    reviews: 89,
    isNFT: true,
    seller: "CyberArt"
  },
  {
    id: "p6",
    name: "Digital Landscape #42",
    description: "Stunning digital landscape NFT featuring futuristic cityscape at sunset",
    price: 1200,
    image: "https://storage.googleapis.com/workspace-ai-images/1f2e3d4c-5b6a-7g8h-9i0j-1k2l3m4n5o6p.png",
    category: "nft",
    cryptoPrice: { eth: "0.48", usdc: "1200.00" },
    rating: 4.8,
    reviews: 156,
    isNFT: true,
    seller: "MetaArt"
  },

  // Gaming
  {
    id: "p7",
    name: "PlayStation 5 Console",
    description: "Next-gen gaming console with ultra-high speed SSD and ray tracing",
    price: 499,
    image: "https://storage.googleapis.com/workspace-ai-images/6g5h4i3j-2k1l-0m9n-8o7p-6q5r4s3t2u1v.png",
    category: "gaming",
    cryptoPrice: { eth: "0.20", usdc: "499.00" },
    rating: 4.7,
    reviews: 3421,
    seller: "Sony"
  },
  {
    id: "p8",
    name: "Razer Gaming Headset",
    description: "Professional gaming headset with 7.1 surround sound and noise cancellation",
    price: 149,
    image: "https://storage.googleapis.com/workspace-ai-images/7h6i5j4k-3l2m-1n0o-9p8q-7r6s5t4u3v2w.png",
    category: "gaming",
    cryptoPrice: { eth: "0.06", usdc: "149.00" },
    rating: 4.6,
    reviews: 1089
  },

  // Collectibles - Rare & Valuable Items
  {
    id: "p9",
    name: "Pokemon Charizard Card",
    description: "Rare holographic Charizard card from Base Set, mint condition",
    price: 5500,
    image: "https://storage.googleapis.com/workspace-ai-images/8i7j6k5l-4m3n-2o1p-0q9r-8s7t6u5v4w3x.png",
    category: "collectibles",
    cryptoPrice: { eth: "2.20", usdc: "5500.00" },
    rating: 4.9,
    reviews: 234,
    seller: "CardCollector"
  },
  {
    id: "p10",
    name: "Vintage Rolex Submariner",
    description: "Classic 1960s Rolex Submariner in excellent condition with original box",
    price: 15000,
    image: "https://storage.googleapis.com/workspace-ai-images/9j8k7l6m-5n4o-3p2q-1r0s-9t8u7v6w5x4y.png",
    category: "collectibles",
    cryptoPrice: { eth: "6.00", usdc: "15000.00" },
    rating: 4.8,
    reviews: 67,
    seller: "LuxuryWatches"
  },

  // More Electronics
  {
    id: "p11",
    name: "MacBook Pro 16-inch",
    description: "Powerful laptop with M3 Pro chip, 18GB RAM, and stunning Liquid Retina display",
    price: 2499,
    image: "https://storage.googleapis.com/workspace-ai-images/0k9l8m7n-6o5p-4q3r-2s1t-0u9v8w7x6y5z.png",
    category: "electronics",
    cryptoPrice: { eth: "1.00", usdc: "2499.00" },
    rating: 4.9,
    reviews: 892,
    seller: "Apple Store"
  },
  {
    id: "p12",
    name: "Dyson V15 Vacuum",
    description: "Advanced cordless vacuum with laser dust detection and powerful suction",
    price: 749,
    image: "https://storage.googleapis.com/workspace-ai-images/1l0m9n8o-7p6q-5r4s-3t2u-1v0w9x8y7z6a.png",
    category: "electronics",
    cryptoPrice: { eth: "0.30", usdc: "749.00" },
    rating: 4.7,
    reviews: 1456
  }
];