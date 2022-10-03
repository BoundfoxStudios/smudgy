import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guid } from '../../../models/guid';
import { newUuid } from '../../../utils/uuid';
import { PlayerEntity } from '../../player/entities/player.entity';
import { SessionEntity } from '../entities/session.entity';
import { SessionConfiguration } from '../models/session-configuration';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionEntitiesRepository: Repository<SessionEntity>,
    @InjectRepository(PlayerEntity)
    private readonly playerEntitiesRepository: Repository<PlayerEntity>,
  ) {}

  async createSession(configuration: SessionConfiguration, hostPlayerSocketId: string): Promise<Guid> {
    this.logger.log(`Creating new session for ${hostPlayerSocketId}`);

    const hostPlayer = await this.playerEntitiesRepository.findOneBy({ socketId: hostPlayerSocketId });

    if (!hostPlayer) {
      // TODO: Error handling
      throw new Error(`Host player with socket id ${hostPlayerSocketId} not found`);
    }

    const session = this.sessionEntitiesRepository.create({
      id: newUuid(),
      hostPlayer,
      language: configuration.language,
      maxPlayers: configuration.maxPlayers,
      roundsToPlay: configuration.roundsToPlay,
      roundTimeInSeconds: configuration.roundTimeInSeconds,
      players: [],
    });

    const { id } = await this.sessionEntitiesRepository.save(session);

    this.logger.log(`Created new session ${id} for ${hostPlayer.id}`);

    return id;
  }
}
