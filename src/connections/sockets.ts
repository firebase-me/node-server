import { Server, Socket } from 'socket.io';
import { Express } from 'express';
import http from 'http';

// Function to initialize Socket.IO
export function initializeSockets(_server: http.Server, app: Express): Server {
  const io = new Server(_server);

  io.on('connection', (socket: Socket) => {
    console.log(`A user connected with id ${socket.id}`);

    // Example: Handling a chat message
    socket.on('chatMessage', (message: string) => {
      // Broadcast the message to all connected clients
      io.emit('chatMessage', { id: socket.id, message });
    });

    // Example: Handling state changes
    socket.on('updateState', (newState: any) => {
      // You can handle the state change here
      // For example, update a shared state variable
      // and then broadcast the updated state to all clients
      // You may want to use a more sophisticated state management system
      // depending on your project requirements (Redux, etc.)
      app.set('currentState', newState);

      // Broadcast the updated state to all connected clients
      io.emit('stateUpdated', newState);
    });

    // Example: Joining a room
    socket.on('joinRoom', (room: string) => {
      socket.join(room);
      console.log(`User with id ${socket.id} joined room ${room}`);

      // You can emit a message to the client that just joined the room
      socket.emit('joinedRoom', `You joined room ${room}`);

      // Broadcast to all clients in the room except the sender
      socket.to(room).emit('userJoined', `User with id ${socket.id} joined the room`);
    });

    // Example: Disconnect event
    socket.on('disconnect', () => {
      console.log(`User with id ${socket.id} disconnected`);
    });
  });
  return io;
}
