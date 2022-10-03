import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Guid } from '../../../models/guid';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  clusterId!: number;

  @Column({ unique: true })
  id!: Guid;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
