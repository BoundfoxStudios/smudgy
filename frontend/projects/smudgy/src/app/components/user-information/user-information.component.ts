import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInformationComponent {
  name: string;

  constructor(
    private readonly playerService: PlayerService,
    private readonly router: Router,
  ) {
  }

  submit(): void {
    this.playerService.register$(this.name).subscribe({
      error: error => console.log('scheißdreck', error),
      complete: () => this.router.navigate(['/game/lobby']),
    });
  }
}
