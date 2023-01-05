import { EntitySchema } from 'typeorm';
import { BaseEntity, BaseEntityColumnScheme } from '../../database/entities/base.entity';

export interface Player extends BaseEntity {
  name: string;
  socketId?: string;
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
