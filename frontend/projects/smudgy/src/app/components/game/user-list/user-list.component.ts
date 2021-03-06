import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../../models/shared/player';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  players$: Observable<Player[]>;

  constructor(private readonly sessionService: SessionService) {}

  ngOnInit(): void {
    this.players$ = this.sessionService.players$();
  }
}
