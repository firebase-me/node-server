interface PlayerState {
    playerId: string;
    playerName: string;
    health: number;
    position: { x: number; y: number; z: number };
  }
  
  interface PlayerJoinRoomPayload {
    room: string;
  }
  
  // Example usage
  const playerState: PlayerState = {
    playerId: 'player123',
    playerName: 'John Doe',
    health: 100,
    position: { x: 0, y: 0, z: 0 },
  };
  
  const playerJoinRoomPayload: PlayerJoinRoomPayload = {
    room: 'lobby',
  };
  