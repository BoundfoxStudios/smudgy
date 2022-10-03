import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from '../player/entities/player.entity';
import { SessionPlayerEntity } from './entities/session-player.entity';
import { SessionEntity } from './entities/session.entity';
import { SessionGateway } from './gateways/session.gateway';
import { SessionService } from './services/session.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity, SessionPlayerEntity, PlayerEntity])],
})
export class SessionModule {
  static forRoot(): DynamicModule {
    return {
      module: SessionModule,
      providers: [SessionGateway, SessionService],
    };
  }
}
