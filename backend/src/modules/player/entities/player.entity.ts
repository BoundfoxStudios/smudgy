import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { SessionEntity } from '../../session/entities/session.entity';

@Entity()
export class PlayerEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  socketId?: string;

  @ManyToMany(() => SessionEntity, session => session.players)
  sessions!: SessionEntity[];
}
