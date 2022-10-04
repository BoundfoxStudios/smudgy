import { EntitySchema } from 'typeorm';
import { BaseEntity, BaseEntityColumnScheme } from '../../database/entities/base.entity';
import { Session } from '../../session/entities/session.entity';

export interface Player extends BaseEntity {
  name: string;
  socketId?: string;
  sessions?: Session[];
}

export const PlayerEntitySchema: EntitySchema<Player> = new EntitySchema<Player>({
  name: 'player',
  columns: {
    ...BaseEntityColumnScheme,
    name: {
      type: String,
    },
    socketId: {
      type: String,
      nullable: true,
    },
  },
});
