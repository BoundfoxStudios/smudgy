import { Module } from '@nestjs/common';
import { PlayerManagementGateway } from './gateways/player-management.gateway';

@Module({
  providers: [PlayerManagementGateway],
})
export class PlayerManagementModule {}
