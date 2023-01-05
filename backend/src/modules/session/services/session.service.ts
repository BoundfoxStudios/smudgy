import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Guid } from '../../../models/guid';
import { newUuid } from '../../../utils/uuid';
import { Player } from '../../player/entities/player.entity';
import { PlayerService } from '../../player/services/player.service';
import { Session, SessionEntitySchema } from '../entities/session.entity';
import { PlayerListItem } from '../models/player-list-item';
import { SessionConfiguration } from '../models/session-configuration';
import { SessionState } from '../models/session-state';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @InjectRepository(SessionEntitySchema)
    private readonly sessionEntitiesRepository: Repository<Session>,
    private readonly playerService: PlayerService,
  ) {}

  async createSession(configuration: SessionConfiguration, hostPlayerSocketId: string): Promise<Guid> {
    this.logger.log(`Creating new session for ${hostPlayerSocketId}`);

    const hostPlayer = await this.playerService.findBySocketId(hostPlayerSocketId);

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
      sessionState: SessionState.Lobby,
      players: [],
    });

    const { id } = await this.sessionEntitiesRepository.save(session);

    this.logger.log(`Created new session ${id} for ${hostPlayer.id}`);

    return id;
  }

  async joinSession(sessionId: Guid, socketId: string): Promise<{ session: Session; player: Player } | undefined> {
    this.logger.log(`PlayerSocketId ${socketId} wants to join session ${sessionId}`);

    const session = await this.sessionEntitiesRepository.findOne({
      where: {
        id: sessionId,
      },
      relations: {
        players: true,
      },
    });

    const player = await this.playerService.findBySocketId(socketId);

    if (!session || !player) {
      this.logger.warn(`PlayerId ${socketId} can not join session ${sessionId}. Either player or session was not found.`);
      return;
    }

    if (session.players && session.players.every(player => player.id !== socketId)) {
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

  async disconnectPlayerFromAllSessions(socketId: string): Promise<{ sessions: Guid[]; player: PlayerListItem } | undefined> {
    const player = await this.playerService.findBySocketId(socketId);

    if (!player) {
      this.logger.warn(`PlayerId ${socketId} was not found.`);
      return;
    }

    const sessions = await this.findSessionWherePlayerParticipates(player);

    for (const session of sessions) {
      session.players = (session.players ?? []).filter(sessionPlayer => sessionPlayer.id !== player.id);
    }

    await this.sessionEntitiesRepository.save(sessions);

    return {
      player: {
        name: player.name,
        id: player.id,
      },
      sessions: sessions.map(session => session.id),
    };
  }

  // TODO: Change from Promise<bool> to <void> and throw an error when something is not right here.
  async updateSessionConfiguration(sessionId: Guid, socketId: string, sessionConfiguration: SessionConfiguration): Promise<boolean> {
    this.logger.log(`Receiving new session configuration from ${socketId} for ${sessionId}: ${JSON.stringify(sessionConfiguration)}`);

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

  // TODO: Change from Promise<bool> to <void> and throw an error when something is not right here.
  async startGame(sessionId: Guid, socketId: string): Promise<boolean> {
    this.logger.log(`Receiving start game request from ${socketId} for ${sessionId}`);

    const session = await this.sessionEntitiesRepository.findOne({
      where: { id: sessionId },
      relations: { hostPlayer: true },
    });

    if (!session) {
      this.logger.warn(`Session ${sessionId} not found.`);
      return false;
    }

    if (session.hostPlayer.socketId !== socketId) {
      this.logger.warn(`Player (SocketId ${socketId}) tried to start the game, but its not the host player`);
      return false;
    }

    if (session.sessionState !== SessionState.Lobby) {
      this.logger.warn(`Session ${sessionId} is not in state ${SessionState.Lobby}`);
      return false;
    }

    session.sessionState = SessionState.InGame;

    await this.sessionEntitiesRepository.save(session);

    return true;
  }

  async findSessionWherePlayerParticipates(player: Player): Promise<Session[]> {
    const sessionState = In([SessionState.Lobby, SessionState.InGame]);
    const sessions = await this.sessionEntitiesRepository.find({
      select: { id: true },
      where: { players: { id: player.id }, sessionState },
    });

    const sessionIds = sessions.map(session => session.id);

    return this.sessionEntitiesRepository.find({ where: { id: In(sessionIds) }, relations: { players: true } });
  }
}
