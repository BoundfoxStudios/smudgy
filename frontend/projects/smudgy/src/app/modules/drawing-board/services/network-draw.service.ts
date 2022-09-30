import { Injectable, OnDestroy } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { buffer, bufferCount, filter, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DrawingBoardStore } from '../components/drawing-board/drawing-board.store';
import { DrawCommand } from '../models/draw-command';
import { DrawingBoardSocketService } from './drawing-board-socket.service';
import { NetworkDrawCommandSerializerService } from './network-draw-command-serializer.service';

@Injectable()
export class NetworkDrawService implements OnDestroy {
  private drawingStreamSubscription = Subscription.EMPTY;

  constructor(
    private readonly store: DrawingBoardStore,
    private readonly networkDrawCommandSerializer: NetworkDrawCommandSerializerService,
    private readonly drawingBoardSocketService: DrawingBoardSocketService,
  ) {}

  initialize(): void {
    this.subscribeToDrawingStream();
  }

  ngOnDestroy(): void {
    this.drawingStreamSubscription.unsubscribe();
  }

  private send(drawCommands: [DrawCommand, DrawCommand][]): void {
    const serializedDrawCommands = this.networkDrawCommandSerializer.serialize(drawCommands);

    this.drawingBoardSocketService.invoke('draw', serializedDrawCommands).subscribe();
  }

  private subscribeToDrawingStream(): void {
    const releaseBuffer$ = merge(
      this.store.drawStop$,
      this.store.drawStop$.pipe(
        switchMap(() => this.store.nextDrawCommandPair$.pipe(bufferCount(environment.gameConfiguration.networkDrawCommandBuffer))),
      ),
    );

    this.drawingStreamSubscription = this.store.nextDrawCommandPair$
      .pipe(
        buffer(releaseBuffer$),
        filter(bufferedCommandPairs => bufferedCommandPairs.length > 0),
      )
      .subscribe(bufferedCommandPairs => this.send(bufferedCommandPairs));
  }
}
