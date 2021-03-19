import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent {
  @Input() inviteUrl = '';
}
