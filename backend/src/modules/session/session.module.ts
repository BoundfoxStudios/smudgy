import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntitySchema } from '../player/entities/player.entity';
import { SessionEntitySchema } from './entities/session.entity';
import { SessionGateway } from './gateways/session.gateway';
import { SessionCleanupService } from './services/session-cleanup.service';
import { SessionService } from './services/session.service';
import { SESSION_CONFIGURATION, SessionConfiguration } from './session.configuration';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntitySchema, PlayerEntitySchema])],
})
export class SessionModule {
  static forRoot(sessionConfiguration: SessionConfiguration): DynamicModule {
    return {
      module: SessionModule,
      providers: [
        {
          provide: SESSION_CONFIGURATION,
          useValue: sessionConfiguration,
        },
        SessionGateway,
        SessionService,
        SessionCleanupService,
      ],
    };
  }
}
