import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { PlayerModule } from './modules/player/player.module';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
    }),
    DatabaseModule.forRoot(),
    PlayerModule.forRoot(),
    SessionModule.forRoot(),
  ],
})
export class AppModule {}
