import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { PlayerEntity } from '../../player/entities/player.entity';
import { SessionLanguage } from '../models';

@Entity()
export class SessionEntity extends BaseEntity {
  @OneToMany(() => PlayerEntity, player => player.sessions)
  hostPlayer!: PlayerEntity;

  language!: SessionLanguage;

  roundTimeInSeconds!: number;

  roundsToPlay!: number;

  maxPlayers!: number;

  @ManyToMany(() => PlayerEntity, player => player.sessions)
  @JoinTable()
  players!: PlayerEntity[];
}
