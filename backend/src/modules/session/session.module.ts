import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntitySchema } from '../player/entities/player.entity';
import { SessionEntitySchema } from './entities/session.entity';
import { SessionGateway } from './gateways/session.gateway';
import { SessionService } from './services/session.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntitySchema, PlayerEntitySchema])],
})
export class SessionModule {
  static forRoot(): DynamicModule {
    return {
      module: SessionModule,
      providers: [SessionGateway, SessionService],
    };
  }
}
