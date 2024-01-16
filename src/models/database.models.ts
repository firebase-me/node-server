interface User {
    userId: string;
    username: string;
    email: string;
    createdAt: Date;
  }
  
  interface SaveUserRequest {
    username: string;
    email: string;
    password: string;
  }
  
  // Example usage
  const user: User = {
    userId: 'user123',
    username: 'john_doe',
    email: 'john@example.com',
    createdAt: new Date(),
  };
  
  const saveUserRequest: SaveUserRequest = {
    username: 'new_user',
    email: 'new@example.com',
    password: 'secure_password',
  };
  