import { EntitySchemaOptions } from 'typeorm';
import { Guid } from '../../../models/guid';

export interface BaseEntity {
  clusterId: number;
  id: Guid;
  createdAt: Date;
  updatedAt: Date;
}

const baseEntitySchema: EntitySchemaOptions<BaseEntity> = {
  name: 'base-entity',
  columns: {
    id: {
      type: String,
      unique: true,
    },
    clusterId: {
      type: Number,
      primary: true,
      generated: true,
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    },
  },
};

export const BaseEntityColumnScheme = baseEntitySchema.columns;
