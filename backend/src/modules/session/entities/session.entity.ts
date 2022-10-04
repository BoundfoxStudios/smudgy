import { EntitySchema } from 'typeorm';
import { BaseEntity, BaseEntityColumnScheme } from '../../database/entities/base.entity';
import { Player, PlayerEntitySchema } from '../../player/entities/player.entity';
import { SessionLanguage } from '../models';
import { SessionState } from '../models/session-state';

export interface Session extends BaseEntity {
  hostPlayer: Player;
  language: SessionLanguage;
  roundTimeInSeconds: number;
  roundsToPlay: number;
  maxPlayers: number;
  sessionState: SessionState;
  players?: Player[];
}

export const SessionEntitySchema = new EntitySchema<Session>({
  name: 'session',
  columns: {
    ...BaseEntityColumnScheme,
    language: {
      type: String,
    },
    roundsToPlay: {
      type: Number,
    },
    roundTimeInSeconds: {
      type: Number,
    },
    maxPlayers: {
      type: Number,
    },
    sessionState: {
      type: String,
    },
  },
  relations: {
    hostPlayer: {
      type: 'many-to-one',
      target: PlayerEntitySchema,
    },
    players: {
      type: 'many-to-many',
      target: PlayerEntitySchema,
      joinTable: true,
    },
  },
});
