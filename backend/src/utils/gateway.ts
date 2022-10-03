import { GatewayMetadata } from '@nestjs/websockets';
import { CORS_ORIGIN } from '../constants';

export const createGatewayMetadata = (): GatewayMetadata => ({
  namespace: '/game',
  cors: {
    origin: CORS_ORIGIN,
  },
});
