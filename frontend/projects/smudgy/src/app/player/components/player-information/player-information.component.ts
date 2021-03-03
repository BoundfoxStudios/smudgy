import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { playerRegister } from '../../state/player.actions';
import { selectPlayerName } from '../../state/player.selectors';

@Component({
  selector: 'app-player-information',
  templateUrl: './player-information.component.html',
  styleUrls: ['./player-information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInformationComponent implements OnInit, OnDestroy {
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
