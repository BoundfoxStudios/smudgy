import { Injectable, OnDestroy } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { bufferCount, bufferWhen, filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DrawCommand } from '../models/draw-command';
import { NetworkDrawCommandSerializerService } from './network-draw-command-serializer.service';

@Injectable()
export class NetworkDrawService implements OnDestroy {
  private readonly drawStream = new Subject<DrawCommand>();
  private readonly stopStream = new Subject<void>();

  constructor(private readonly networkDrawCommandSerializer: NetworkDrawCommandSerializerService) {
    this.drawStream.pipe(
      bufferWhen(() => merge(
        this.stopStream,
        this.drawStream.pipe(bufferCount(environment.gameConfiguration.networkDrawCommandBuffer)),
      )),
      filter(drawCommands => !!drawCommands.length),
    ).subscribe(drawCommands => this.send(drawCommands));
  }

  draw(drawCommand: DrawCommand): void {
    this.drawStream.next(drawCommand);
  }

  startDrawing(): void {
  }

  stopDrawing(): void {
    this.stopStream.next();
  }

  ngOnDestroy(): void {
    this.stopDrawing();
  }

  private send(drawCommands: DrawCommand[]) {
    const serializedDrawCommands = this.networkDrawCommandSerializer.serialize(drawCommands);
    // TODO: Set via network
    console.log(serializedDrawCommands);
  }
}
