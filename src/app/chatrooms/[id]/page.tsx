'use client';

import React, { useState, use } from 'react';
import { ChevronLeft, Send, Mic, Smile, MoreVertical, UserCircle, Users } from 'lucide-react'; // Using lucide-react for icons

// Dummy data for chat messages and personas
const initialMessages: Message[] = [
  { id: '1', sender: 'user', content: 'Hey Sukuna, how are you doing?', timestamp: '10:00 AM' },
  { id: '2', sender: 'persona', personaName: 'Sukuna', avatar: '/avatars/sukuna.jpeg', content: 'Insolent brat. I am as I always am.', timestamp: '10:01 AM' },
  { id: '3', sender: 'system', content: 'Hulk joined the chat.', timestamp: '10:02 AM' },
  { id: '4', sender: 'persona', personaName: 'Hulk', avatar: '/avatars/hulk.jpeg', content: 'HULK SMASH PUNY CHAT!', timestamp: '10:03 AM' },
  { id: '5', sender: 'user', content: 'Whoa, easy there Hulk!', timestamp: '10:04 AM' },
  { id: '6', sender: 'persona', personaName: 'Sukuna', avatar: '/avatars/sukuna.jpeg', content: 'Hmph. Another noisy one.', timestamp: '10:05 AM' },
  { id: '7', sender: 'ai_typing', personaName: 'Elon Musk', avatar: '/avatars/elon.jpeg'},
];

const personasInChat = [
  { id: 'sukuna', name: 'Sukuna', avatar: '/avatars/sukuna.jpeg', status: 'active' },
  { id: 'hulk', name: 'Hulk', avatar: '/avatars/hulk.jpeg', status: 'active' },
  { id: 'elon', name: 'Elon Musk', avatar: '/avatars/elon.jpeg', status: 'busy' },
  { id: 'goku', name: 'Goku', avatar: '/avatars/goku.jpeg', status: 'active' },
  { id: 'vader', name: 'Darth Vader', avatar: '/avatars/vader.jpeg', status: 'away' },
];

interface Message {
  id: string;
  sender: 'user' | 'persona' | 'system' | 'ai_typing';
  content?: string;
  timestamp?: string;
  personaName?: string;
  avatar?: string;
}

interface Persona {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'busy' | 'away';
}

export default function ChatroomPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const chatroomId = resolvedParams.id;
  const chatroomName = chatroomId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + "-Verse"; // Example: Anime-Verse
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(127); // Example online user count

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: String(Date.now()),
        sender: 'user',
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      // Simulate AI response
      setTimeout(() => {
        const aiPersona = personasInChat[Math.floor(Math.random() * personasInChat.length)];
        const aiTypingMessage: Message = {
          id: String(Date.now() + 1),
          sender: 'ai_typing',
          personaName: aiPersona.name,
          avatar: aiPersona.avatar,
        };
        setMessages(prev => [...prev, aiTypingMessage]);

        setTimeout(() => {
          setMessages(prev => prev.filter(msg => msg.id !== aiTypingMessage.id)); // Remove typing indicator
          const aiResponseMessage: Message = {
            id: String(Date.now() + 2),
            sender: 'persona',
            personaName: aiPersona.name,
            avatar: aiPersona.avatar,
            content: `This is a simulated response from ${aiPersona.name}.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages(prev => [...prev, aiResponseMessage]);
        }, 2000 + Math.random() * 2000);
      }, 500);
    }
  };

  const getStatusColor = (status: Persona['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-slate-100 font-sans">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-3 bg-black/30 backdrop-blur-md border-b border-slate-700/50">
        <button className="p-2 rounded-full hover:bg-slate-700/50 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-medium tracking-wider font-[Michroma,sans-serif]">{chatroomName}</h1>
          <div className="flex items-center text-xs text-cyan-400">
            <Users size={12} className="mr-1" />
            {onlineUsers} Online
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-slate-700/50 transition-colors">
          <MoreVertical size={24} />
        </button>
      </header>

      {/* Persona Avatars Bar */}
      <div className="px-3 py-2 bg-black/20 border-b border-slate-700/50 overflow-x-auto whitespace-nowrap no-scrollbar">
        <div className="flex space-x-3">
          {personasInChat.map((persona) => (
            <button key={persona.id} className="flex flex-col items-center group">
              <div className="relative">
                <img src={persona.avatar || '/avatars/default.jpeg'} alt={persona.name} className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-cyan-400 transition-all object-cover" />
                <span className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full ${getStatusColor(persona.status as Persona['status'])} border-2 border-[#050505]`}></span>
              </div>
              <span className="mt-1 text-xs text-slate-300 group-hover:text-cyan-400 transition-colors">{persona.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Message Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#050505] to-[#0a0a10]">
        {messages.map((msg, index) => {
          // Time Separator Logic (Simplified)
          let showTimeSeparator = false;
          if (index === 0) showTimeSeparator = true;
          // Add more sophisticated logic if needed, e.g., comparing dates

          return (
            <React.Fragment key={msg.id}>
              {showTimeSeparator && (
                <div className="text-center my-4">
                  <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>
              )}
            
              {msg.sender === 'system' && (
                <div className="text-center text-xs text-slate-400 italic py-1">
                  {msg.content}
                </div>
              )}

              {msg.sender === 'ai_typing' && (
                <div className="flex items-end space-x-2 mb-2 animate-fadeIn">
                  <img src={msg.avatar || '/avatars/default.jpeg'} alt={msg.personaName} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex items-center space-x-1 p-3 rounded-lg rounded-bl-none bg-slate-700/60 backdrop-blur-sm shadow-md">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-0"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-200"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-400"></div>
                  </div>
                </div>
              )}

              {msg.sender === 'user' && (
                <div className="flex justify-end items-end space-x-2 animate-fadeInUp">
                  <div className="bg-cyan-600/80 backdrop-blur-sm text-white p-3 rounded-lg rounded-br-none max-w-xs sm:max-w-md shadow-lg">
                    <p>{msg.content}</p>
                    <span className="text-xs text-cyan-200 block text-right mt-1">{msg.timestamp}</span>
                  </div>
                   {/* User avatar can be added here if needed: <UserCircle size={32} className="text-slate-400" /> */}
                </div>
              )}

              {msg.sender === 'persona' && (
                <div className="flex items-end space-x-2 animate-fadeInUp">
                  <img src={msg.avatar || '/avatars/default.jpeg'} alt={msg.personaName} className="w-10 h-10 rounded-full object-cover border-2 border-slate-600" />
                  <div className="bg-slate-700/60 backdrop-blur-sm p-3 rounded-lg rounded-bl-none max-w-xs sm:max-w-md shadow-lg">
                    <p className="font-semibold text-cyan-400 text-sm">{msg.personaName}</p>
                    <p className="mt-1">{msg.content}</p>
                    <span className="text-xs text-slate-400 block text-right mt-1">{msg.timestamp}</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
        <div id="scroll-anchor" className="h-1"></div> {/* Anchor for scrolling to bottom */}
      </main>

      {/* Input Box */}
      <footer className="sticky bottom-0 z-10 p-3 bg-black/30 backdrop-blur-md border-t border-slate-700/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <button type="button" className="p-2 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 transition-colors">
            <Smile size={22} />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 bg-slate-800/70 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none placeholder-slate-500 transition-all"
          />
          {inputValue ? (
            <button
              type="submit"
              className="p-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <Send size={22} />
            </button>
          ) : (
            <button
              type="button"
              className="p-3 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 rounded-lg transition-colors flex items-center justify-center"
            >
              <Mic size={22} />
            </button>
          )}
        </form>
      </footer>
    </div>
  );
}

// Helper for scrollbar styling if needed, or use a plugin
// For no-scrollbar: add a utility class in globals.css
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

// Add custom animations to tailwind.config.js if needed
// e.g., extend: {
//   animation: {
//     fadeIn: 'fadeIn 0.3s ease-out',
//     fadeInUp: 'fadeInUp 0.3s ease-out',
//   },
//   keyframes: {
//     fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
//     fadeInUp: { '0%': { opacity: 0, transform: 'translateY(10px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
//   }
// }
