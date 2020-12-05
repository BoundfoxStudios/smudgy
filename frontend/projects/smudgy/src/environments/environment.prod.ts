import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  gameConfiguration: {
    hubsBaseUrl: 'https://smudgy-api.herokuapp.com/hubs/', // TODO: Correct URL
    canvasThrottleTime: 0,
    networkDrawCommandBuffer: 10,
    connectionTimeout: 5000,
  },
};
