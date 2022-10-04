import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntitySchema } from './entities/player.entity';
import { PlayerGateway } from './gateways/player.gateway';
import { PlayerService } from './services/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntitySchema])],
})
export class PlayerModule {
  static forRoot(): DynamicModule {
    return {
      module: PlayerModule,
      providers: [PlayerGateway, PlayerService],
    };
  }
}
