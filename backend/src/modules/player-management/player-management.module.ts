import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { PlayerManagementGateway } from './gateways/player-management.gateway';
import { PlayerManagementService } from './services/player-management.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
})
export class PlayerManagementModule {
  static forRoot(): DynamicModule {
    return {
      module: PlayerManagementModule,
      providers: [PlayerManagementGateway, PlayerManagementService],
    };
  }
}
