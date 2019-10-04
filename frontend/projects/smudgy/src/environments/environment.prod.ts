import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  gameConfiguration: {
    backendUrl: 'https://smudgy-dev.azurewebsites.net', // TODO: Correct URL
    canvasThrottleTime: 0,
    networkDrawCommandBuffer: 10,
  },
};
