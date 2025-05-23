"use client";

import { useState } from 'react';
import { Search, Bell, User, Send, Paperclip, Smile, MoreVertical, ArrowLeft, Phone, Video } from 'lucide-react';

// Define mock data for direct messages
const mockAIPersonas = [
  { 
    id: 1, 
    name: 'Hinata', 
    role: 'Adventure Guide',
    avatar: '/avatars/player-2.jpeg',
    online: true,
    lastMessage: "Ready for our next adventure? I've found some exciting quests!",
    timestamp: '2 min ago',
    unread: 3
  },
  { 
    id: 2, 
    name: 'Venom', 
    role: 'Strategy Master',
    avatar: '/avatars/Venom.jpeg',
    online: true,
    lastMessage: "I analyzed your last game. Let's discuss your strategy.",
    timestamp: '1 hour ago',
    unread: 0
  },
  { 
    id: 3, 
    name: 'Eren', 
    role: 'Creative Companion',
    avatar: '/avatars/eren.jpeg',
    online: false,
    lastMessage: "I wrote a short story based on our conversation yesterday.",
    timestamp: 'Yesterday',
    unread: 0
  },
  { 
    id: 4, 
    name: 'Aizen', 
    role: 'Puzzle Solver',
    avatar: '/avatars/aizen.jpeg',
    online: false,
    lastMessage: "That riddle was tricky! Want another challenge?",
    timestamp: '2 days ago',
    unread: 0
  },
];

// Mock conversation
const mockConversation = [
  {
    id: 1,
    sender: 'Nova',
    isAI: true,
    message: "Welcome back, Samuel! I've been exploring some new realms while you were away. There's an exciting adventure waiting for us in the Crystal Caverns. The locals say there's a hidden treasure guarded by a legendary creature. What do you think? Should we embark on this quest?",
    timestamp: '10:32 AM'
  },
  {
    id: 2,
    sender: 'You',
    isAI: false,
    message: "That sounds intriguing! Tell me more about this legendary creature. Is it friendly or hostile?",
    timestamp: '10:34 AM'
  },
  {
    id: 3,
    sender: 'Nova',
    isAI: true,
    message: "The creature is known as the Crystal Guardian. According to the ancient texts, it's neither friendly nor hostile by nature - it responds to the intentions of those who approach it. If we come with respect and pure intentions, it may grant us passage to the treasure. However, those seeking the treasure for selfish reasons have never returned...",
    timestamp: '10:35 AM'
  },
  {
    id: 4,
    sender: 'You',
    isAI: false,
    message: "Interesting! What kind of treasure are we talking about here? Is it worth the risk?",
    timestamp: '10:38 AM'
  },
  {
    id: 5,
    sender: 'Nova',
    isAI: true,
    message: "The legends speak of the 'Heart of the Mountain' - a crystal that's said to amplify one's innate abilities. For some, it revealed hidden talents or enhanced their existing skills. I believe it could be a powerful artifact for your journey through AI Verse! And the adventure itself would be quite thrilling. Shall we prepare for the expedition?",
    timestamp: '10:40 AM'
  }
];

export default function DirectMessages() {
  const [selectedPersona, setSelectedPersona] = useState(mockAIPersonas[0]);
  const [messageInput, setMessageInput] = useState('');

  return (
    <div className="flex h-screen bg-black text-white font-sans">
      {/* Sidebar for DM list */}
      <div className="w-80 border-r border-white border-opacity-10 bg-black bg-opacity-20 backdrop-blur-xl">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Direct Messages</h2>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search personas..."
              className="input-primary pl-10 pr-4 w-full"
            />
          </div>
          <div className="space-y-2">
            {mockAIPersonas.map((persona) => (
              <div 
                key={persona.id}
                onClick={() => setSelectedPersona(persona)}
                className={`p-3 rounded-xl flex items-center space-x-3 cursor-pointer transition-all ${
                  selectedPersona.id === persona.id 
                    ? 'bg-gradient-to-r from-cyan-600 to-cyan-400' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <div className="relative">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img src={persona.avatar} alt={persona.name} className="w-full h-full object-cover" />
                  </div>
                  {persona.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{persona.name}</h3>
                    <span className="text-xs text-gray-400">{persona.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{persona.lastMessage}</p>
                </div>
                {persona.unread > 0 && (
                  <div className="h-5 w-5 rounded-full bg-cyan-500 flex items-center justify-center">
                    <span className="text-xs">{persona.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 px-6 flex items-center justify-between bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-5">
          <div className="flex items-center space-x-3">
            <button className="md:hidden p-2 rounded-full hover:bg-white hover:bg-opacity-10">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img src={selectedPersona.avatar} alt={selectedPersona.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-medium flex items-center">
                {selectedPersona.name}
                {selectedPersona.online && (
                  <span className="ml-2 h-2 w-2 bg-green-500 rounded-full"></span>
                )}
              </h3>
              <p className="text-xs text-gray-400">{selectedPersona.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {mockConversation.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-3/4 ${
                message.isAI 
                  ? 'bg-white bg-opacity-10 rounded-t-xl rounded-br-xl' 
                  : 'bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-t-xl rounded-bl-xl'
              } p-4`}>
                <div className="flex items-center space-x-2 mb-1">
                  {message.isAI && (
                    <div className="h-6 w-6 rounded-full overflow-hidden">
                      <img src={selectedPersona.avatar} alt={selectedPersona.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <span className="font-medium text-sm">{message.sender}</span>
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black bg-opacity-20 backdrop-blur-md border-t border-white border-opacity-5">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10">
              <Paperclip className="h-5 w-5" />
            </button>
            <div className="flex-1 bg-white bg-opacity-10 rounded-full px-4 py-2 flex items-center">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="bg-transparent flex-1 focus:outline-none"
              />
              <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 ml-2">
                <Smile className="h-5 w-5" />
              </button>
            </div>
            <button className="p-3 rounded-full btn-primary">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}