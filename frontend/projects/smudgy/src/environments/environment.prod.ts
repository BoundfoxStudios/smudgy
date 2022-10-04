import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  gameConfiguration: {
    socketBaseUrl: 'https://smudgy-api.onrender.com',
    canvasThrottleTime: 0,
    networkDrawCommandBuffer: 10,
    connectionTimeout: 5000,
  },
};
