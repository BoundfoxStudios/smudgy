import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { playerRegister } from '../../player/state/player.actions';
import { selectPlayerName } from '../../player/state/player.selectors';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInformationComponent implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    name: ['', Validators.required],
  });

  private playerNameSubscription = Subscription.EMPTY;

  constructor(private readonly store: Store, private readonly formBuilder: FormBuilder) {}

  submit(): void {
    this.store.dispatch(playerRegister({ name: this.form.value.name }));
  }

  ngOnInit(): void {
    this.playerNameSubscription = this.store.select(selectPlayerName).subscribe(name => this.form.patchValue({ name }));
  }

  ngOnDestroy(): void {
    this.playerNameSubscription.unsubscribe();
  }
}
