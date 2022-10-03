import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { PlayerEntity } from '../../player/entities/player.entity';
import { SessionLanguage } from '../models';

@Entity()
export class SessionEntity extends BaseEntity {
  @ManyToOne(() => PlayerEntity, player => player.sessions)
  hostPlayer!: PlayerEntity;

  @Column()
  language!: SessionLanguage;

  @Column()
  roundTimeInSeconds!: number;

  @Column()
  roundsToPlay!: number;

  @Column()
  maxPlayers!: number;

  @ManyToMany(() => PlayerEntity, player => player.sessions)
  @JoinTable()
  players!: PlayerEntity[];
}
