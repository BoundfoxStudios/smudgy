import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';

@Entity()
export class PlayerEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  socketId?: string;
}
