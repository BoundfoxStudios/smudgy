import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { PlayerGateway } from './gateways/player.gateway';
import { PlayerService } from './services/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
})
export class PlayerModule {
  static forRoot(): DynamicModule {
    return {
      module: PlayerModule,
      providers: [PlayerGateway, PlayerService],
    };
  }
}
