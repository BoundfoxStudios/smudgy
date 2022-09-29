import { registerAs } from '@nestjs/config';

export interface Sqlite3Configuration {
  type: 'sqlite3';
  database: string;
}

export type DatabaseConfiguration = Sqlite3Configuration;

export const DATABASE_CONFIGURATION_KEY = 'database';

export const databaseConfigurationFromEnv = registerAs(
  DATABASE_CONFIGURATION_KEY,
  (): DatabaseConfiguration => ({
    type: (process.env.DATABASE_TYPE || '') as any,
    database: process.env.DATABASE_NAME || '',
  }),
);
