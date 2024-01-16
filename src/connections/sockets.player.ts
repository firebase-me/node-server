import { Server, Socket, Namespace } from 'socket.io';
import { Express } from 'express';

export function initializePlayerSockets(io: Server, app: Express): Namespace {
  // Create a new namespace for player updates
  const PlayerSockets: Namespace = io.of('/player');

  // Event handler for when a user connects
  PlayerSockets.on('connection', (socket: Socket) => {
    console.log(`A user connected with id ${socket.id} for player updates`);

    // Event handler for when a client sends an 'updateState' message
    socket.on('updateState', (newState: any) => {
      // Update the current state in the Express app
      app.set('currentState', newState);

      // Broadcast the updated state to all connected clients in the 'player' namespace
      io.emit('stateUpdated', newState);
    });

    // Event handler for when a client wants to join a room
    socket.on('joinRoom', (room: string) => {
      // Join the specified room
      socket.join(room);

      // Log that the user has joined the room
      console.log(`User with id ${socket.id} joined room ${room}`);

      // Send a message to the client that they joined the room
      socket.emit('joinedRoom', `You joined room ${room}`);

      // Broadcast to all clients in the room except the sender that a new user joined
      socket.to(room).emit('userJoined', `User with id ${socket.id} joined the room`);
    });

    // Event handler for when a user disconnects
    socket.on('disconnect', () => {
      console.log(`User with id ${socket.id} disconnected from player updates`);
    });
  });

  return PlayerSockets;
}
