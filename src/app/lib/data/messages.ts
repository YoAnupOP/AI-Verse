import { Message } from '../types';

export const getMessagesForChat = (chatId: number): Message[] => {
  switch(chatId) {
    case 1: // Nova's messages
      return [
        {
          id: 1,
          sender: 'You',
          isAI: false,
          message: 'Hi Nova, I need help with a story idea.',
          timestamp: '10:15 AM',
        },
        {
          id: 2,
          sender: 'Nova',
          isAI: true,
          message: 'Hello there! Id be delighted to help with your story. What genre are you thinking of?',
          timestamp: '10:17 AM',
          avatar: '/avatars/nova.png',
        },
        // Add more messages
      ];
    case 2: // Atlas's messages
      return [
        // Messages for Atlas
      ];
    default:
      return [];
  }
};