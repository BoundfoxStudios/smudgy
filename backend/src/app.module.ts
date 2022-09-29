import { Module } from '@nestjs/common';
import { PlayerManagementModule } from './modules/player-management/player-management.module';

@Module({
  imports: [PlayerManagementModule],
})
export class AppModule {}
