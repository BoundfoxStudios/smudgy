import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationFromEnv } from './database.configuration';
import { DatabaseConfigurationService } from './services/database-configuration.service';

@Module({
  imports: [ConfigModule.forFeature(databaseConfigurationFromEnv)],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: DatabaseConfigurationService,
        }),
      ],
    };
  }
}
