import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DATABASE_CONFIGURATION_KEY, DatabaseConfiguration } from '../database.configuration';

@Injectable()
export class DatabaseConfigurationService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const { database, type } = this.configService.getOrThrow<DatabaseConfiguration>(DATABASE_CONFIGURATION_KEY);

    if (type === 'sqlite3') {
      return {
        type: 'better-sqlite3',
        database: database,
        synchronize: true,
        entities: [],
      };
    }

    throw new Error('Only sqlite3 is currently supported.');
  }
}
