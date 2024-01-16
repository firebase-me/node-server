interface AppConfiguration {
    appName: string;
    apiBaseUrl: string;
    maxConnections: number;
    debugMode: boolean;
  }
  
  // Example usage
  const appConfig: AppConfiguration = {
    appName: 'MyApp',
    apiBaseUrl: 'https://api.example.com',
    maxConnections: 100,
    debugMode: true,
  };
  