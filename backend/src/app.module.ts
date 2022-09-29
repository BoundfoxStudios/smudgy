import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { PlayerManagementModule } from './modules/player-management/player-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
    }),
    DatabaseModule.forRoot(),
    PlayerManagementModule,
  ],
})
export class AppModule {}
