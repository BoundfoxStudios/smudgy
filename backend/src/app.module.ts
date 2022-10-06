import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './modules/database/database.module';
import { PlayerModule } from './modules/player/player.module';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
    }),
    ScheduleModule.forRoot(),
    DatabaseModule.forRoot(),
    PlayerModule.forRoot(),
    SessionModule.forRoot({
      sessionTimeoutInMinutes: 10,
    }),
  ],
})
export class AppModule {}
