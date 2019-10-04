import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  gameConfiguration: {
    backendUrl: '',
    canvasThrottleTime: 0,
    networkDrawCommandBuffer: 10,
  },
};
