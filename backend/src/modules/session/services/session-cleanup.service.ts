import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { In, LessThanOrEqual, Not, Repository } from 'typeorm';
import { Session, SessionEntitySchema } from '../entities/session.entity';
import { SessionState } from '../models/session-state';
import { SESSION_CONFIGURATION, SessionConfiguration } from '../session.configuration';

@Injectable()
export class SessionCleanupService {
  private readonly logger = new Logger(SessionCleanupService.name);

  constructor(
    @InjectRepository(SessionEntitySchema)
    private readonly sessionEntitiesRepository: Repository<Session>,
    @Inject(SESSION_CONFIGURATION)
    private readonly configuration: SessionConfiguration,
  ) {
    this.logger.log('Ready');
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async closeInactiveSessions(): Promise<void> {
    this.logger.verbose('Running session cleanup...');

    const timeoutDateTime = DateTime.now().minus({ minute: this.configuration.sessionTimeoutInMinutes }).toJSDate();

    const inactiveSessions = await this.sessionEntitiesRepository.find({
      where: {
        sessionState: Not(In([SessionState.Finished, SessionState.Abandoned])),
        updatedAt: LessThanOrEqual(timeoutDateTime),
      },
      take: 10,
    });

    inactiveSessions.forEach(inactiveSession => (inactiveSession.sessionState = SessionState.Abandoned));

    await this.sessionEntitiesRepository.save(inactiveSessions);
  }
}
