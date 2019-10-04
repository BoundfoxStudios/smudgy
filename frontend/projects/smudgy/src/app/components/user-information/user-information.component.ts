import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInformationComponent {
  name: string;

  submit(): void {
    console.log(this.name);
  }
}
