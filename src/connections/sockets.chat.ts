import { Server, Socket, Namespace } from 'socket.io';
import { Express } from 'express';

export function initializeChatSockets(io: Server, _app: Express): Namespace {
  const ChatSockets: Namespace = io.of('/chat');

  ChatSockets.on('connection', (socket: Socket) => {
    console.log(`A user connected with id ${socket.id} for chat`);

    socket.on('chatMessage', (message: string) => {
      io.emit('chatMessage', { id: socket.id, message });
    });

    socket.on('disconnect', () => {
      console.log(`User with id ${socket.id} disconnected from chat`);
    });
  });

  return ChatSockets;
}
