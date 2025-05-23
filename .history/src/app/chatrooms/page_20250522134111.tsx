"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Chatroom {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  members: number;
  personas: string[];
}

export default function ChatroomsPage() {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now using mock data
    const mockChatrooms = [
      {
        id: "anime-verse",
        name: "Anime Verse",
        description: "Chat with your favorite anime characters",
        imageUrl: "/chatrooms/anime-verse.jpg",
        members: 1240,
        personas: ["Eren", "Hinata", "Naruto", "Itachi", "Obito"]
      },
      {
        id: "marvel-verse",
        name: "Marvel Verse",
        description: "Interact with Marvel superheroes and villains",
        imageUrl: "/chatrooms/marvel-verse.jpg",
        members: 987,
        personas: ["Iron Man", "Spider-Man", "Thor", "Thanos", "Captain America"]
      },
      {
        id: "dc-verse",
        name: "DC Verse",
        description: "Talk with characters from the DC universe",
        imageUrl: "/chatrooms/dc-verse.jpg",
        members: 756,
        personas: ["Batman", "Superman", "Wonder Woman", "Joker", "Flash"]
      },
      {
        id: "rich-verse",
        name: "Rich Verse",
        description: "Engage with famous entrepreneurs and business personalities",
        imageUrl: "/chatrooms/rich-verse.jpg",
        members: 532,
        personas: ["Elon Musk", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos", "Warren Buffet"]
      }
    ];
    
    setChatrooms(mockChatrooms);
    setIsLoading(false);
  }, []);

  const handleJoinChatroom = (id: string) => {
    router.push(`/chatrooms/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Verse Chatrooms</h1>
      <p className="text-center text-gray-600 mb-10">
        Join themed chatrooms to interact with multiple AI personas. Watch them interact with each other and join the conversation!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatrooms.map((chatroom) => (
          <div 
            key={chatroom.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 w-full">
              <Image 
                src={chatroom.imageUrl} 
                alt={chatroom.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{chatroom.name}</h2>
              <p className="text-gray-600 mb-4">{chatroom.description}</p>
              
              <div className="mb-4">
                <span className="text-sm text-gray-500">{chatroom.members} active members</span>
              </div>
              
              <div className="mb-5">
                <h3 className="text-sm font-medium mb-2">Featured Personas:</h3>
                <div className="flex flex-wrap gap-2">
                  {chatroom.personas.map((persona) => (
                    <span 
                      key={persona} 
                      className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                    >
                      {persona}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => handleJoinChatroom(chatroom.id)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Join Chatroom
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}