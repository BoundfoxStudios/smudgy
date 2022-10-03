import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guid } from '../../../models/guid';
import { newUuid } from '../../../utils/uuid';
import { PlayerEntity } from '../../player/entities/player.entity';
import { SessionEntity } from '../entities/session.entity';
import { PlayerListItem } from '../models/player-list-item';
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

  async joinSession(sessionId: Guid, socketId: string): Promise<{ session: SessionEntity; player: PlayerEntity } | undefined> {
    this.logger.log(`PlayerSocketId ${socketId} wants to join session ${sessionId}`);

    const session = await this.sessionEntitiesRepository.findOne({
      where: {
        id: sessionId,
      },
      relations: {
        players: true,
      },
    });

    const player = await this.playerEntitiesRepository.findOneBy({ socketId: socketId });

    if (!session || !player) {
      this.logger.warn(`PlayerId ${socketId} can not join session ${sessionId}. Either player or session was not found.`);
      return;
    }

    if (session.players.every(player => player.id !== socketId)) {
      session.players.push(player);
      await this.sessionEntitiesRepository.save(session);
    }

    return { session, player };
  }

  async playerList(sessionId: Guid): Promise<PlayerListItem[]> {
    const session = await this.sessionEntitiesRepository.findOne({
      where: {
        id: sessionId,
      },
      relations: {
        players: true,
      },
    });

    return (session?.players ?? []).map(player => ({ id: player.id, name: player.name }));
  }

  async updateSessionConfiguration(sessionId: Guid, socketId: string, sessionConfiguration: SessionConfiguration): Promise<boolean> {
    this.logger.log(`Receiving new session configuration from ${socketId} for ${sessionId}: ${sessionConfiguration}`);

    const session = await this.sessionEntitiesRepository.findOne({
      where: { id: sessionId },
      relations: { hostPlayer: true },
    });

    if (!session) {
      this.logger.log(`Did not find session with session id ${sessionId}`);
      return false;
    }

    if (session.hostPlayer.socketId !== socketId) {
      this.logger.log(`Player (SocketId ${socketId})) tried to change configuration where it is not host player`);
      return false;
    }

    session.language = sessionConfiguration.language;
    session.maxPlayers = sessionConfiguration.maxPlayers;
    session.roundTimeInSeconds = sessionConfiguration.roundTimeInSeconds;
    session.roundsToPlay = sessionConfiguration.roundsToPlay;

    await this.sessionEntitiesRepository.save(session);

    return true;
  }
}
