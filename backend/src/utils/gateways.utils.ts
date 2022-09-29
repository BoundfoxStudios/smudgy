import { GatewayMetadata } from '@nestjs/websockets';
import { CORS_ORIGIN } from '../constants';

export const createGatewayMetadata = (namespace: string): GatewayMetadata => ({
  namespace,
  cors: {
    origin: CORS_ORIGIN,
  },
});
