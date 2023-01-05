import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from '../player/player.module';
import { SessionEntitySchema } from './entities/session.entity';
import { SessionGateway } from './gateways/session.gateway';
import { SessionCleanupService } from './services/session-cleanup.service';
import { SessionService } from './services/session.service';
import { ConfigurableModuleClass } from './session.configuration';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntitySchema]), PlayerModule],
  providers: [SessionGateway, SessionService, SessionCleanupService],
})
export class SessionModule extends ConfigurableModuleClass {}
