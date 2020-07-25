import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  gameConfiguration: {
    backendUrl: 'https://smudgy-api.herokuapp.com', // TODO: Correct URL
    canvasThrottleTime: 0,
    networkDrawCommandBuffer: 10,
    connectionTimeout: 5000,
  },
};
