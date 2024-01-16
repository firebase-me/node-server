interface ChatMessage {
    id: string;
    message: string;
    timestamp: number;
  }
  
  // Example usage
  const chatMessage: ChatMessage = {
    id: '123',
    message: 'Hello, world!',
    timestamp: Date.now(),
  };
  