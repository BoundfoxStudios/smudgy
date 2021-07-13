import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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

  hasExistingSessionId$?: Observable<boolean>;

  private playerNameSubscription = Subscription.EMPTY;

  constructor(private readonly store: Store, private readonly formBuilder: FormBuilder, private readonly activatedRoute: ActivatedRoute) {}

  submit(): void {
    this.store.dispatch(playerRegister({ name: this.form.value.name }));
  }

  ngOnInit(): void {
    this.playerNameSubscription = this.store.select(selectPlayerName).subscribe(name => this.form.patchValue({ name }));
    this.hasExistingSessionId$ = this.activatedRoute.queryParamMap.pipe(map(params => params.has('sessionId')));
  }

  ngOnDestroy(): void {
    this.playerNameSubscription.unsubscribe();
  }
}
