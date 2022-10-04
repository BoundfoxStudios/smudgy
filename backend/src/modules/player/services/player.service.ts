import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player, PlayerEntitySchema } from '../entities/player.entity';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(
    @InjectRepository(PlayerEntitySchema)
    private readonly playersRepository: Repository<Player>,
  ) {}

  async login(id: string, name: string, socketId: string): Promise<void> {
    const existingPlayer = await this.playersRepository.findOneBy({ id });

    if (existingPlayer) {
      this.logger.log(`Player ${name} (${id}) already exists in database, updating socketId`);

      existingPlayer.socketId = socketId;

      await this.playersRepository.save(existingPlayer);

      return;
    }

    const newPlayer = this.playersRepository.create({
      id,
      name,
      socketId,
    });

    await this.playersRepository.save(newPlayer);

    this.logger.log(`Registered new player ${name} (${id})`);
  }
}
